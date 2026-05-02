import Link from 'next/link';
import { MapPin, Clock, Phone } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Bhai Muhammad Nimko Corner & Kabab House",
    "image": "https://example.com/logo.jpg", // Update with actual image if available
    "description": "Karachi's Hidden BBQ Gem – Fresh, Juicy, Authentic",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "PECHS / Mehmoodabad",
      "addressLocality": "Karachi",
      "addressRegion": "Sindh",
      "addressCountry": "PK"
    },
    "telephone": "+923237963247",
    "servesCuisine": ["Pakistani", "Barbecue", "Fast Food"],
    "priceRange": "$",
    "openingHours": "Mo-Su 17:00-02:00"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40"
        />
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 mb-6 drop-shadow-lg">
            Karachi&apos;s Hidden BBQ Gem
          </h1>
          <p className="text-xl md:text-3xl text-orange-400 font-semibold mb-10 tracking-wide drop-shadow-md">
            Fresh, Juicy, Authentic.
          </p>
          <Link 
            href="/menu"
            className="inline-block px-10 py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold text-lg md:text-xl rounded-full transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(234,88,12,0.4)]"
          >
            Order Now / View Menu
          </Link>
        </div>
      </section>

      {/* Popular Items Section */}
      <section className="py-20 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Specialties</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Taste the authentic flavors that made us famous. Prepared fresh daily with our secret spices.
            </p>
            <div className="w-24 h-1 bg-orange-600 mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Item 1 */}
            <div className="bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-orange-600/50 transition-colors group">
              <div className="h-48 bg-neutral-800 relative">
                <Image src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop" alt="Beef Bihari Boti" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Beef Bihari Boti</h3>
                <p className="text-neutral-400 mb-4">Melt-in-your-mouth tender beef marinated in traditional bihari spices.</p>
                <div className="flex justify-between items-center">
                  <span className="text-orange-500 font-bold text-xl">Rs. 700 / Plate</span>
                  <Link href="/menu" className="text-sm font-medium text-white bg-neutral-800 px-4 py-2 rounded-full hover:bg-orange-600 transition-colors">Order</Link>
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-orange-600/50 transition-colors group">
              <div className="h-48 bg-neutral-800 relative">
                <Image src="https://images.unsplash.com/photo-1605050493019-335352cde3a6?q=80&w=800&auto=format&fit=crop" alt="Beef Dhaga Kabab" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Beef Dhaga Kabab</h3>
                <p className="text-neutral-400 mb-4">Signature kababs tied with thread to keep the juices locked in.</p>
                <div className="flex justify-between items-center">
                  <span className="text-orange-500 font-bold text-xl">Rs. 650 / Plate</span>
                  <Link href="/menu" className="text-sm font-medium text-white bg-neutral-800 px-4 py-2 rounded-full hover:bg-orange-600 transition-colors">Order</Link>
                </div>
              </div>
            </div>

            {/* Item 3 */}
            <div className="bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-orange-600/50 transition-colors group">
              <div className="h-48 bg-neutral-800 relative">
                <Image src="https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=800&auto=format&fit=crop" alt="Chicken Broast" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Chicken Broast</h3>
                <p className="text-neutral-400 mb-4">Crispy on the outside, perfectly juicy on the inside. A must-try!</p>
                <div className="flex justify-between items-center">
                  <span className="text-orange-500 font-bold text-xl">From Rs. 470</span>
                  <Link href="/menu" className="text-sm font-medium text-white bg-neutral-800 px-4 py-2 rounded-full hover:bg-orange-600 transition-colors">Order</Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/menu" className="inline-flex items-center text-orange-500 hover:text-orange-400 font-semibold text-lg transition-colors">
              Explore Full Menu 
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Location & Info Section */}
      <section id="location" className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-white mb-4">Visit Us</h2>
                <div className="w-20 h-1 bg-orange-600 rounded-full" />
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-neutral-800 p-3 rounded-full text-orange-500 shrink-0">
                  <MapPin size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">Our Location</h4>
                  <p className="text-neutral-400">Serving PECHS, Mehmoodabad, and Manzoor Colony. Find our main setup in Karachi for the best BBQ experience.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-neutral-800 p-3 rounded-full text-orange-500 shrink-0">
                  <Clock size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">Opening Hours</h4>
                  <p className="text-neutral-400">Everyday: 5:00 PM to 2:00 AM</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-neutral-800 p-3 rounded-full text-orange-500 shrink-0">
                  <Phone size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">Contact</h4>
                  <p className="text-neutral-400">
                    <a href="tel:+923237963247" className="hover:text-orange-500 transition-colors">+92 323 7963247</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl shadow-orange-900/20 border border-neutral-800">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115814.28682006769!2d67.04230005!3d24.891253450000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06651d4bbf%3A0x9cf92f44555a0c23!2sKarachi%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1701389088665!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/923237963247" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-all z-50 flex items-center justify-center group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
        </svg>
        {/* <span className="absolute right-full mr-4 bg-white text-black px-3 py-1 rounded-lg font-bold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Order on WhatsApp
        </span> */}
      </a>
    </>
  );
}
