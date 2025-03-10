import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-gray-300">
      <div className="container py-12 mx-auto flex flex-col items-center">
        {/* Centered Grid Wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl w-full">
          {/* Logo + Text Section */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-white text-lg font-bold mb-4">PICKUP ISTANBUL</h3>
            <p className="mb-4 max-w-xs">
              Premium transportation services in Istanbul. Safe, reliable, and comfortable transfers for all your needs.
            </p>

          </div>

          {/* Services */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-white text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-white">Airport Transfers</Link></li>
              <li><Link href="#" className="hover:text-white">City Tours</Link></li>
              <li><Link href="#" className="hover:text-white">Hourly Rentals</Link></li>
              <li><Link href="#" className="hover:text-white">Intercity Transfers</Link></li>
              <li><Link href="#" className="hover:text-white">VIP Services</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-white">About Us</Link></li>
              <li><Link href="#" className="hover:text-white">Fleet</Link></li>
              <li><Link href="#" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-white text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>Phone: +90 532 057 97 34</li>
              <li>Email: info@pickupist.com</li>
              <li>WhatsApp: +90 532 057 97 34</li>
            </ul>
          </div>
        </div>

        {/* Centered Copyright Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center w-full max-w-5xl">
          <p>&copy; {new Date().getFullYear()} PICKUP ISTANBUL. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
