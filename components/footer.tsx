import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">PICKUP ISTANBUL</h3>
            <p className="mb-4">
              Premium transportation services in Istanbul. Safe, reliable, and comfortable transfers for all your needs.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-white">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-white">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-white">
                  Airport Transfers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  City Tours
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Hourly Rentals
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Intercity Transfers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  VIP Services
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Fleet
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>Phone: +90 532 057 97 34</li>
              <li>Email: info@pickupistanbul.com</li>
              <li>WhatsApp: +90 532 057 97 34</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} PICKUP ISTANBUL. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

