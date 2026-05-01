'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { Plus, Search } from 'lucide-react';

export default function MenuClient({ initialItems }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const { addItem, openCart } = useCartStore();

  const categories = ['All', ...new Set(initialItems.map(item => item.category))];

  const filteredItems = initialItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (item) => {
    addItem(item);
    openCart();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 mb-4">
          Our Full Menu
        </h1>
        <p className="text-neutral-400 max-w-2xl mx-auto">
          From smoky BBQ to crispy Broast and juicy Burgers. Freshly prepared to order.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-12">
        {/* Search */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-neutral-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-neutral-700 rounded-xl leading-5 bg-neutral-900 text-neutral-300 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            placeholder="Search menu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-6 py-3 rounded-xl font-medium transition-colors ${
                activeCategory === category 
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' 
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <div 
            key={item.id} 
            className={`bg-neutral-900 rounded-2xl p-5 border border-neutral-800 flex flex-col justify-between transition-all hover:border-orange-600/50 hover:shadow-xl hover:shadow-orange-900/10 ${
              item.isOutOfStock ? 'opacity-60 grayscale' : ''
            }`}
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-neutral-100 pr-4">{item.name}</h3>
                <span className="bg-neutral-800 text-orange-500 text-xs px-2 py-1 rounded-md font-bold shrink-0">
                  {item.category}
                </span>
              </div>
              <p className="text-2xl font-black text-orange-500 mb-6">Rs. {item.price}</p>
            </div>
            
            <button
              onClick={() => handleAddToCart(item)}
              disabled={item.isOutOfStock}
              className={`w-full flex items-center justify-center py-3 rounded-xl font-bold transition-all ${
                item.isOutOfStock 
                  ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                  : 'bg-neutral-800 text-white hover:bg-gradient-to-r hover:from-orange-600 hover:to-red-600 shadow-md hover:shadow-orange-600/20'
              }`}
            >
              {item.isOutOfStock ? (
                'Out of Stock'
              ) : (
                <>
                  <Plus size={20} className="mr-2" />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        ))}
      </div>
      
      {filteredItems.length === 0 && (
        <div className="text-center py-20 text-neutral-500">
          <p className="text-xl">No items found matching your search.</p>
        </div>
      )}

    </div>
  );
}
