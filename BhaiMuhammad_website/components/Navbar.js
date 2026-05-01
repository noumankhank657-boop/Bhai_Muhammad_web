'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items, openCart } = useCartStore();
  
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-neutral-900 border-b border-orange-600/30 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
              Bhai Muhammad
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-neutral-300 hover:text-orange-500 transition-colors">Home</Link>
            <Link href="/menu" className="text-neutral-300 hover:text-orange-500 transition-colors">Menu</Link>
            <Link href="/#about" className="text-neutral-300 hover:text-orange-500 transition-colors">About Us</Link>
            <Link href="/#location" className="text-neutral-300 hover:text-orange-500 transition-colors">Location</Link>
            
            <button 
              onClick={openCart}
              className="relative p-2 text-neutral-300 hover:text-orange-500 transition-colors"
            >
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={openCart}
              className="relative p-2 text-neutral-300 hover:text-orange-500 transition-colors"
            >
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-neutral-300 hover:text-orange-500 p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-neutral-800 border-b border-orange-600/30">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-neutral-300 hover:text-orange-500 hover:bg-neutral-700 rounded-md">Home</Link>
            <Link href="/menu" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-neutral-300 hover:text-orange-500 hover:bg-neutral-700 rounded-md">Menu</Link>
            <Link href="/#about" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-neutral-300 hover:text-orange-500 hover:bg-neutral-700 rounded-md">About Us</Link>
            <Link href="/#location" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-neutral-300 hover:text-orange-500 hover:bg-neutral-700 rounded-md">Location</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
