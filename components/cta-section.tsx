"use client"

import { Button } from "@/components/ui/button"
import { PhoneCall, MessageSquare, ChevronRight } from "lucide-react"
import Image from "next/image"

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image src="/istanbul-skyline.jpg" alt="Istanbul Skyline" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e40af]/90 to-[#1e40af]/70"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-white">
            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-white/10">
              <span className="text-white font-medium">Book Your Ride Today</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Experience Premium Transportation in Istanbul
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Whether you need an airport transfer, city tour, or hourly service, our professional team is ready to
              provide you with a comfortable and luxurious experience.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-[#C2A36C]">
                    <PhoneCall className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold">Call Us</h3>
                </div>
                <p className="text-white/80 mb-4">Available 24/7 for your inquiries</p>
                <a href="tel:+905320579734" className="text-lg font-medium hover:text-[#C2A36C] transition-colors">
                  +90 532 057 97 34
                </a>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-[#C2A36C]">
                    <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold">WhatsApp</h3>
                </div>
                <p className="text-white/80 mb-4">Chat with us for quick responses</p>
                <a
                  href="https://wa.me/905320579734?text=Hello%2C%20I%20would%20like%20to%20book%20transfer%20service%20in%20Istanbul"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium hover:text-[#C2A36C] transition-colors"
                >
                  +90 532 057 97 34
                </a>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-[#C2A36C] hover:bg-[#b1945e] text-black transition-all duration-300"
              onClick={() => {
                const bookingForm = document.getElementById("booking-form")
                if (bookingForm) {
                  bookingForm.scrollIntoView({ behavior: "smooth", block: "center" })
                }
              }}
            >
              Book Now <ChevronRight className="ml-1 h-5 w-5" />
            </Button>
          </div>

          {/* Right Column - Quick Inquiry Form */}
          <div className="bg-white p-8 rounded-xl shadow-xl">
            <h3 className="text-xl font-bold mb-6">Quick Inquiry</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C2A36C]/50"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C2A36C]/50"
                    placeholder="Your email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C2A36C]/50"
                  placeholder="Your phone number"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Service Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C2A36C]/50">
                  <option>Airport Transfer</option>
                  <option>City Tour</option>
                  <option>Hourly Rental</option>
                  <option>Intercity Transfer</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#C2A36C]/50"
                  placeholder="Tell us about your transportation needs"
                ></textarea>
              </div>
              <Button className="w-full bg-[#C2A36C] hover:bg-[#b1945e] text-black transition-all duration-300">
                Send Inquiry
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

