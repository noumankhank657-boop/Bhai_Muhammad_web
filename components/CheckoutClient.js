'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';

const DELIVERY_ZONES = [
  { id: 'zone1', name: 'Zone 1 (PECHS)', fee: 50 },
  { id: 'zone2', name: 'Zone 2 (Mehmoodabad)', fee: 100 },
  { id: 'zone3', name: 'Zone 3 (Manzoor Colony)', fee: 150 },
];

export default function CheckoutClient() {
  const { items, getTotal, clearCart } = useCartStore();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    zone: DELIVERY_ZONES[0].id,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = getTotal();
  const selectedZone = DELIVERY_ZONES.find(z => z.id === formData.zone);
  const deliveryFee = selectedZone ? selectedZone.fee : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) return alert('Your cart is empty!');

    setIsSubmitting(true);

    try {
      // Create order in DB
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name,
          phone: formData.phone,
          address: formData.address,
          deliveryZone: selectedZone.name,
          deliveryFee,
          total: grandTotal,
          items: items.map(item => ({
            id: item.id,
            quantity: item.quantity,
            price: item.price
          }))
        })
      });

      if (!res.ok) throw new Error('Failed to create order');
      
      const order = await res.json();
      
      // Format WhatsApp Message
      let message = `*NEW ORDER (ID: #${order.id})*\n\n`;
      message += `*Customer Details:*\n`;
      message += `Name: ${formData.name}\n`;
      message += `Phone: ${formData.phone}\n`;
      message += `Address: ${formData.address}\n`;
      message += `Zone: ${selectedZone.name}\n\n`;
      message += `*Order Items:*\n`;
      
      items.forEach(item => {
        message += `- ${item.quantity}x ${item.name} (Rs. ${item.price})\n`;
      });
      
      message += `\n*Subtotal:* Rs. ${subtotal}\n`;
      message += `*Delivery Fee:* Rs. ${deliveryFee}\n`;
      message += `*Grand Total:* Rs. ${grandTotal}\n`;
      message += `*Payment:* Cash on Delivery\n`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/923237963247?text=${encodedMessage}`;

      clearCart();
      
      // Redirect to WhatsApp
      window.location.href = whatsappUrl;

    } catch (error) {
      console.error(error);
      alert('There was an error placing your order. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-neutral-400 mb-8">Add some delicious food to your cart to proceed to checkout.</p>
        <button 
          onClick={() => router.push('/menu')}
          className="px-8 py-3 bg-orange-600 text-white rounded-full font-bold hover:bg-orange-700 transition-colors"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-white mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="bg-neutral-900 rounded-2xl p-6 md:p-8 border border-neutral-800 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-orange-500 border-b border-neutral-800 pb-4">Delivery Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-white"
                  placeholder="Ali Khan"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-white"
                  placeholder="0300 1234567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Delivery Zone</label>
                <select 
                  value={formData.zone}
                  onChange={(e) => setFormData({...formData, zone: e.target.value})}
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-white"
                >
                  {DELIVERY_ZONES.map(zone => (
                    <option key={zone.id} value={zone.id}>
                      {zone.name} - Rs. {zone.fee}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Full Address</label>
                <textarea 
                  required
                  rows="3"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-white resize-none"
                  placeholder="House #, Street, Block..."
                ></textarea>
              </div>

            </div>

            <div className="mt-8 pt-6 border-t border-neutral-800">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-orange-600/20 disabled:opacity-50 flex justify-center items-center"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Processing...</span>
                ) : (
                  'Place Order via WhatsApp'
                )}
              </button>
              <p className="text-center text-sm text-neutral-500 mt-4">
                Payment Method: Cash on Delivery ONLY
              </p>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-neutral-900 rounded-2xl p-6 md:p-8 border border-neutral-800 shadow-xl sticky top-24">
            <h2 className="text-2xl font-bold mb-6 text-white border-b border-neutral-800 pb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-center text-neutral-300">
                  <div className="flex items-center">
                    <span className="font-bold text-orange-500 mr-3">{item.quantity}x</span>
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">Rs. {item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-neutral-800 pt-4 space-y-3">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span>Rs. {subtotal}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Delivery Fee ({selectedZone.name})</span>
                <span>Rs. {deliveryFee}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-white pt-4 border-t border-neutral-800">
                <span>Grand Total</span>
                <span className="text-orange-500">Rs. {grandTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
