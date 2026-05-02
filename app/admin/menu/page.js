'use client';

import { useState, useEffect } from 'react';

export default function AdminMenu() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editPrice, setEditPrice] = useState('');

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await fetch('/api/menu');
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (error) {
      console.error('Failed to fetch menu:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleStock = async (id, currentStatus) => {
    try {
      const res = await fetch('/api/menu', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isOutOfStock: !currentStatus })
      });
      if (res.ok) {
        fetchMenu();
      }
    } catch (error) {
      console.error('Failed to update stock:', error);
    }
  };

  const savePrice = async (id) => {
    try {
      const res = await fetch('/api/menu', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, price: parseFloat(editPrice) })
      });
      if (res.ok) {
        setEditingId(null);
        fetchMenu();
      }
    } catch (error) {
      console.error('Failed to update price:', error);
    }
  };

  if (isLoading) return <div className="text-white">Loading menu...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Menu Management</h1>
      
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-x-auto">
        <table className="w-full text-left text-sm text-neutral-400">
          <thead className="text-xs text-neutral-300 uppercase bg-neutral-800 border-b border-neutral-700">
            <tr>
              <th className="px-6 py-4">Item Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b border-neutral-800 hover:bg-neutral-800/50">
                <td className="px-6 py-4 font-medium text-white">{item.name}</td>
                <td className="px-6 py-4">{item.category}</td>
                <td className="px-6 py-4 text-orange-500 font-bold">
                  {editingId === item.id ? (
                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                        className="w-20 px-2 py-1 bg-neutral-950 border border-neutral-700 rounded text-white"
                      />
                      <button 
                        onClick={() => savePrice(item.id)}
                        className="text-green-500 hover:text-green-400"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <span>Rs. {item.price}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-md text-xs font-bold ${item.isOutOfStock ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
                    {item.isOutOfStock ? 'Out of Stock' : 'In Stock'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  {editingId !== item.id && (
                    <button 
                      onClick={() => {
                        setEditingId(item.id);
                        setEditPrice(item.price.toString());
                      }}
                      className="text-blue-500 hover:text-blue-400 font-medium"
                    >
                      Edit Price
                    </button>
                  )}
                  <button 
                    onClick={() => toggleStock(item.id, item.isOutOfStock)}
                    className="text-orange-500 hover:text-orange-400 font-medium"
                  >
                    Toggle Stock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
