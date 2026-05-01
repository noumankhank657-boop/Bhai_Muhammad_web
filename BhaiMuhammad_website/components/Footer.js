import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-orange-600/30 pt-12 pb-8 text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 mb-4">
              Bhai Muhammad
            </h3>
            <p className="text-sm">
              Karachi&apos;s Hidden BBQ Gem. Serving the finest, juiciest, and most authentic BBQ, Rolls, and Broast.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-orange-500 transition-colors">Home</Link></li>
              <li><Link href="/menu" className="hover:text-orange-500 transition-colors">Full Menu</Link></li>
              <li><Link href="/checkout" className="hover:text-orange-500 transition-colors">Checkout</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li>Phone: <a href="tel:+923237963247" className="hover:text-orange-500 transition-colors">+92 323 7963247</a></li>
              <li>Location: PECHS, Mehmoodabad, Manzoor Colony (Delivery Zones)</li>
              <li>Open Daily: 5:00 PM to 2:00 AM</li>
            </ul>
          </div>

        </div>
        
        <div className="mt-12 pt-8 border-t border-neutral-800 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Bhai Muhammad Nimko Corner & Kabab House. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
