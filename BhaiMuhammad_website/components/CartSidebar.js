'use client';

import { useCartStore } from '@/store/cartStore';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function CartSidebar() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, getTotal } = useCartStore();

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
        onClick={closeCart}
      />
      
      <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-neutral-900 border-l border-orange-600/30 shadow-2xl z-50 flex flex-col transform transition-transform duration-300">
        
        <div className="flex items-center justify-between p-4 border-b border-orange-600/30">
          <h2 className="text-xl font-bold text-orange-500">Your Cart</h2>
          <button onClick={closeCart} className="p-2 text-neutral-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-neutral-400 space-y-4">
              <p>Your cart is empty</p>
              <button 
                onClick={closeCart}
                className="px-6 py-2 bg-orange-600 text-white rounded-full font-medium hover:bg-orange-700 transition-colors"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-neutral-800 p-3 rounded-xl border border-neutral-700">
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-100">{item.name}</h3>
                  <p className="text-orange-500 font-medium">Rs. {item.price}</p>
                  
                  <div className="flex items-center mt-3 space-x-3">
                    <div className="flex items-center bg-neutral-900 rounded-lg border border-neutral-700">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 text-neutral-400 hover:text-white"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 text-neutral-400 hover:text-white"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-400 p-1.5"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="text-right flex flex-col justify-between">
                  <span className="font-bold text-neutral-100">Rs. {item.price * item.quantity}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t border-orange-600/30 bg-neutral-900">
            <div className="flex justify-between mb-4 text-lg font-bold">
              <span>Subtotal</span>
              <span className="text-orange-500">Rs. {getTotal()}</span>
            </div>
            <Link 
              href="/checkout"
              onClick={closeCart}
              className="w-full block text-center bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-xl font-bold text-lg hover:from-orange-500 hover:to-red-500 transition-colors shadow-lg shadow-orange-600/20"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
