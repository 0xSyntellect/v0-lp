"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PhoneCall } from "lucide-react"

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-800 to-purple-800/90 backdrop-blur-sm shadow-md">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center space-x-2 transition-transform duration-200 hover:scale-105"
        >
          {/* Logo Image */}
          <Image
            src="/pickupist-logo.png" // <-- Make sure file is in /public folder
            alt="Pickup Istanbul Logo"
            width={48} // adjust as needed
            height={48} // adjust as needed
            priority // optional: improves loading for main logo
          />
          {/* Optional: Keep or remove the text next to logo */}
          <span className="text-xl font-bold tracking-tight text-white">
            PICKUP ISTANBUL
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
        <Link
          href="#services"
          onClick={(e) => {
            e.preventDefault(); // Prevent default link navigation
            const servicesSection = document.getElementById("services");
            if (servicesSection) {
              const offset = 100; // Adjust this value to stop earlier if needed
              const elementPosition = servicesSection.getBoundingClientRect().top + window.scrollY;
              window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
            }
          }}
          className="text-sm font-medium text-white transition-all duration-200 hover:text-yellow-300 hover:underline hover:scale-105"
        >
          SERVICES
        </Link>

          <Link
            href="/features"
            className="text-sm font-medium text-white transition-all duration-200 hover:text-yellow-300 hover:underline hover:scale-105"
          >
            FEATURES
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-white transition-all duration-200 hover:text-yellow-300 hover:underline hover:scale-105"
          >
            CONTACT
          </Link>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="gap-2 border-black-300 text-black-300 transition-all duration-200 hover:bg-white hover:text-indigo-800 hover:scale-105"
          >
            <a href="tel:+905320579734">
              <PhoneCall className="h-4 w-4" />
              <span>+90 532 057 97 34</span>
            </a>
          </Button>
        </nav>

        <Button variant="outline" size="icon" className="md:hidden border-white text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>
      </div>
    </header>
  )
}
