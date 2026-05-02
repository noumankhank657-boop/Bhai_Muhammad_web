'use client';

import { useState, useEffect } from 'react';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchOrders(); // Refresh orders
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  if (isLoading) return <div className="text-white">Loading orders...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Recent Orders</h1>
      
      <div className="space-y-6">
        {orders.length === 0 ? (
          <p className="text-neutral-400">No orders found.</p>
        ) : (
          orders.map(order => (
            <div key={order.id} className="bg-neutral-800 border border-neutral-700 rounded-xl p-6">
              <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    Order #{order.id}
                    <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                      order.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-500' :
                      order.status === 'Processing' ? 'bg-blue-500/20 text-blue-500' :
                      order.status === 'Delivered' ? 'bg-green-500/20 text-green-500' :
                      'bg-red-500/20 text-red-500'
                    }`}>
                      {order.status}
                    </span>
                  </h3>
                  <p className="text-neutral-400 text-sm mt-1">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                
                <div className="flex flex-col gap-2">
                  <select 
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="bg-neutral-900 border border-neutral-700 text-white px-3 py-1.5 rounded-lg text-sm"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-neutral-700 pt-4">
                <div>
                  <h4 className="font-semibold text-orange-500 mb-2">Customer Details</h4>
                  <p className="text-neutral-300"><span className="text-neutral-500">Name:</span> {order.customerName}</p>
                  <p className="text-neutral-300"><span className="text-neutral-500">Phone:</span> {order.phone}</p>
                  <p className="text-neutral-300"><span className="text-neutral-500">Address:</span> {order.address}</p>
                  <p className="text-neutral-300"><span className="text-neutral-500">Zone:</span> {order.deliveryZone}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-orange-500 mb-2">Order Items</h4>
                  <ul className="space-y-1 text-sm">
                    {order.orderItems.map(item => (
                      <li key={item.id} className="text-neutral-300 flex justify-between">
                        <span>{item.quantity}x {item.menuItem?.name || 'Unknown Item'}</span>
                        <span>Rs. {item.price * item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-3 border-t border-neutral-700 flex justify-between font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-orange-500">Rs. {order.total}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
