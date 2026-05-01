'use client';

import { useState, useEffect } from 'react';

export default function AdminAuth({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const auth = localStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple hardcoded password as requested by the user
    if (password === 'admin123') {
      localStorage.setItem('admin_auth', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
  };

  if (!isClient) return null; // Avoid hydration mismatch

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-4">
        <div className="bg-neutral-900 p-8 rounded-2xl shadow-2xl border border-neutral-800 w-full max-w-md">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Access</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-white"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button 
              type="submit"
              className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold transition-colors"
            >
              Login
            </button>
          </form>
          <p className="text-neutral-500 text-xs text-center mt-4">Hint: admin123</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="bg-neutral-900 border-b border-neutral-800 p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-orange-500">Admin Panel</h2>
        <div className="flex space-x-4">
          <a href="/admin" className="text-neutral-300 hover:text-white">Orders</a>
          <a href="/admin/menu" className="text-neutral-300 hover:text-white">Menu</a>
          <button onClick={handleLogout} className="text-red-500 hover:text-red-400 font-medium">Logout</button>
        </div>
      </div>
      <div className="p-4 sm:p-8">
        {children}
      </div>
    </div>
  );
}
