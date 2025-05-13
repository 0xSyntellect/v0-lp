"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PhoneCall, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"


export default function Navbar() {
  const { session, signOut } = useAuth()

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false)
    const section = document.getElementById(sectionId)
    if (section) {
      const offset = 80
      const top = section.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: top - offset, behavior: "smooth" })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#1F1F1F]/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
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
            className="h-12 w-auto"
          />
          <span className="text-xl font-bold tracking-tight text-white">
            PICKUP ISTANBUL
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="#services"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("services")
            }}
            className="text-sm font-medium text-white transition-all duration-200 hover:text-[#C2A36C]"
          >
            SERVICES
          </Link>
          <Link
            href="#fleet"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("fleet")
            }}
            className="text-sm font-medium text-white transition-all duration-200 hover:text-[#C2A36C]"
          >
            FLEET
          </Link>
          <Link
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("contact")
            }}
            className="text-sm font-medium text-white transition-all duration-200 hover:text-[#C2A36C]"
          >
            CONTACT
          </Link>

          <Button
            asChild
            variant="outline"
            size="sm"
            className="gap-2 bg-[#C2A36C] text-black border-[#C2A36C] transition-all duration-200 hover:bg-[#b1945e]"
          >
            <a href="tel:+905320579734">
              <PhoneCall className="h-4 w-4" />
              <span>+90 532 057 97 34</span>
            </a>
          </Button>

                    {session ? (
            <>
              <Link
                href="/bookings"
                className="text-sm font-medium text-white transition-all duration-200 hover:text-[#C2A36C]"
              >
                My Bookings
              </Link>
              <button
                type="button"
                onClick={() => signOut()}
                className="text-sm font-medium text-white transition-all duration-200 hover:text-[#C2A36C]"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-white transition-all duration-200 hover:text-[#C2A36C]"
              >
                Log In
              </Link>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-white text-white transition-all duration-200 hover:bg-white/10"
              >
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white hover:bg-white/10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#1F1F1F]/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            <Link
              href="#services"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("services")
              }}
              className="text-white py-2 px-4 hover:bg-white/10 rounded-md"
            >
              SERVICES
            </Link>
            <Link
              href="#fleet"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("fleet")
              }}
              className="text-white py-2 px-4 hover:bg-white/10 rounded-md"
            >
              FLEET
            </Link>
            <Link
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("contact")
              }}
              className="text-white py-2 px-4 hover:bg-white/10 rounded-md"
            >
              CONTACT
            </Link>

            <Button
              asChild
              className="gap-2 bg-[#C2A36C] text-black border-[#C2A36C] w-full justify-center"
            >
              <a href="tel:+905320579734">
                <PhoneCall className="h-4 w-4" />
                <span>+90 532 057 97 34</span>
              </a>
            </Button>

            {!session && (
              <>
                <Link
                  href="/login"
                  className="text-white py-2 px-4 hover:bg-white/10 rounded-md"
                >
                  Log In
                </Link>
                <Button asChild className="w-full">
                  <Link href="/signup" className="block py-2 px-4 bg-[#C2A36C] text-black rounded-md hover:bg-[#b1945e] text-center">
                    Sign Up
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
