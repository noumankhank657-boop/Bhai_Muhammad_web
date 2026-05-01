import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";

const inter = Inter({ subsets: ["latin"] });



export const metadata = {
  title: "Bhai Muhammad Nimko Corner & Kabab House",
  description: "Karachi's Hidden BBQ Gem - Fresh, Juicy, Authentic. Order online for delivery.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.className} bg-neutral-950 text-neutral-100 min-h-screen flex flex-col`}
      >
        <Navbar />
        <CartSidebar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
