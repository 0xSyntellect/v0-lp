import Link from "next/link"
import Image from "next/image"
import { PhoneCall, Mail, MessageSquare, MapPin, Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#1F1F1F] text-white">
      <div className="container mx-auto py-16 px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1 - About */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/pickupist logo.png"
                alt="Pickup Istanbul Logo"
                width={60}
                height={60}
                className="h-12 w-auto"
              />
              <h3 className="text-xl font-bold">PICKUP ISTANBUL</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Premium transportation services in Istanbul. Safe, reliable, and comfortable transfers for all your needs.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="bg-white/10 hover:bg-[#C2A36C] p-2 rounded-full transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="bg-white/10 hover:bg-[#C2A36C] p-2 rounded-full transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="bg-white/10 hover:bg-[#C2A36C] p-2 rounded-full transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Column 2 - Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative">
              <span className="relative z-10">Our Services</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-[#C2A36C]"></span>
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-[#C2A36C] transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-[#C2A36C] rounded-full"></span>
                  Airport Transfers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-[#C2A36C] transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-[#C2A36C] rounded-full"></span>
                  City Tours
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-[#C2A36C] transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-[#C2A36C] rounded-full"></span>
                  Hourly Rentals
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-[#C2A36C] transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-[#C2A36C] rounded-full"></span>
                  Intercity Transfers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-[#C2A36C] transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-[#C2A36C] rounded-full"></span>
                  VIP Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative">
              <span className="relative z-10">Quick Links</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-[#C2A36C]"></span>
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-[#C2A36C] transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-[#C2A36C] rounded-full"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-[#C2A36C] transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-[#C2A36C] rounded-full"></span>
                  Our Fleet
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-[#C2A36C] transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-[#C2A36C] rounded-full"></span>
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-[#C2A36C] transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-[#C2A36C] rounded-full"></span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-[#C2A36C] transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-[#C2A36C] rounded-full"></span>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative">
              <span className="relative z-10">Contact Us</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-[#C2A36C]"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#C2A36C] mt-0.5" />
                <span className="text-gray-400">Istanbul, Turkey</span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneCall className="h-5 w-5 text-[#C2A36C]" />
                <a
                  href="tel:+905320579734"
                  className="text-gray-400 hover:text-[#C2A36C] transition-colors duration-200"
                >
                  +90 532 057 97 34
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#C2A36C]" />
                <a
                  href="mailto:info@pickupist.com"
                  className="text-gray-400 hover:text-[#C2A36C] transition-colors duration-200"
                >
                  info@pickupist.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-[#C2A36C]" />
                <a
                  href="https://wa.me/905320579734"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#C2A36C] transition-colors duration-200"
                >
                  WhatsApp: +90 532 057 97 34
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} PICKUP ISTANBUL. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="text-gray-400 hover:text-[#C2A36C] text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-[#C2A36C] text-sm">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-400 hover:text-[#C2A36C] text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

