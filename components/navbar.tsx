"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PhoneCall } from "lucide-react"

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1F1F1F] shadow-md">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center space-x-2 transition-transform duration-200 hover:scale-105"
        >
          <Image
            src="/pickupist logo.png"
            alt="Pickup Istanbul Logo"
            width={68}
            height={68}
            priority
          />
          <span className="text-xl font-bold tracking-tight text-white">
            PICKUP ISTANBUL
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              const servicesSection = document.getElementById("services");
              if (servicesSection) {
                const offset = 100;
                const elementPosition = servicesSection.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
              }
            }}
            className="text-sm font-medium text-white transition-all duration-200 hover:text-[#C2A36C] hover:underline hover:scale-105"
          >
            SERVICES
          </Link>

          <Link
            href="#fleet"
            onClick={(e) => {
              e.preventDefault();
              const fleetSection = document.getElementById("fleet");
              if (fleetSection) {
                const offset = 0;
                const elementPosition = fleetSection.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
              }
            }}
            className="text-sm font-medium text-white transition-all duration-200 hover:text-[#C2A36C] hover:underline hover:scale-105"
          >
            FLEET
          </Link>

          <Link
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                const offset = 100;
                const elementPosition = contactSection.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
              }
            }}
            className="text-sm font-medium text-white transition-all duration-200 hover:text-[#C2A36C] hover:underline hover:scale-105"
          >
            CONTACT
          </Link>

          <Button
            asChild
            variant="outline"
            size="sm"
            className="gap-2 bg-[#C2A36C] text-black border-[#C2A36C] transition-all duration-200 hover:bg-[#b1945e] hover:scale-105"

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
