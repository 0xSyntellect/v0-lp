"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, MapPin, Minus, Plus, ChevronRight } from "lucide-react"
import { useState } from "react"
import { format } from "date-fns"

export default function HeroSection() {
  // State for tab switching
  const [activeTab, setActiveTab] = useState("transfer")

  // Form fields
  const [transferFrom, setTransferFrom] = useState("Istanbul Airport (IST)")
  const [transferTo, setTransferTo] = useState("")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState("15:00")
  const [passengers, setPassengers] = useState(1)

  // Build date/time string
  const getDateTimeString = () => {
    if (!date) return ""
    const datePart = format(date, "yyyy-MM-dd")
    return `${datePart} ${time}`
  }

  // Handle search action
  const handleSearchClick = () => {
    const dateTime = getDateTimeString()
    const toParam = activeTab === "hourly" ? "" : transferTo
    window.location.href = `/booking?from=${encodeURIComponent(
      transferFrom,
    )}&to=${encodeURIComponent(toParam)}&date=${encodeURIComponent(
      dateTime,
    )}&passengers=${passengers}&serviceType=${activeTab}`
  }

  return (
    <section className="relative min-h-screen pt-16 overflow-hidden">
      {/* Background Image + Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/background2.png')",
          backgroundPosition: "center center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20 md:pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-white max-w-xl">
            <div className="inline-block px-4 py-1 mb-6 rounded-full bg-[#C2A36C]/20 border border-[#C2A36C]/30">
              <span className="text-[#C2A36C] font-medium">Premium Transportation in Istanbul</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Your <span className="text-[#C2A36C]">Luxury Ride</span> in Istanbul Awaits
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Experience safe, reliable, and luxurious transportation services tailored for business and leisure
              travelers throughout Istanbul.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="text-base bg-[#C2A36C] text-black border border-[#C2A36C] transition-all duration-300 hover:bg-[#b1945e] hover:scale-105 px-8"
              >
                Book Now <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-white/10 transition-all duration-300 px-8"
              >
                Our Fleet
              </Button>
            </div>

            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#C2A36C] flex items-center justify-center text-black font-bold">
                  5
                </div>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black font-bold">
                  ★
                </div>
              </div>
              <div>
                <p className="font-medium">Trusted by 1000+ travelers</p>
                <p className="text-sm text-white/70">5-star rated service</p>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div
            id="booking-form"
            className="bg-white/10 backdrop-filter backdrop-blur-md rounded-xl shadow-2xl p-6 border border-white/20"
          >
            <h3 className="text-white text-xl font-semibold mb-6 text-center">Book Your Ride</h3>

            {/* Redesigned Tabs */}
            <Tabs defaultValue="transfer" onValueChange={setActiveTab} className="mb-6">
              <TabsList className="w-full grid grid-cols-2 h-12 bg-white/10">
                <TabsTrigger
                  value="transfer"
                  className="text-sm font-medium text-white data-[state=active]:bg-[#C2A36C] data-[state=active]:text-black transition-all duration-200"
                >
                  Airport Transfer
                </TabsTrigger>
                <TabsTrigger
                  value="hourly"
                  className="text-sm font-medium text-white data-[state=active]:bg-[#C2A36C] data-[state=active]:text-black transition-all duration-200"
                >
                  Hourly Service
                </TabsTrigger>
              </TabsList>

              {/* Transfer Tab Content */}
              <TabsContent value="transfer" className="mt-6 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-white text-sm font-medium">From</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-[#C2A36C]" />
                      <Input
                        placeholder="Airport, Hotel or Address"
                        className="pl-10 bg-white/10 text-white border border-white/20 placeholder-white/50 focus-visible:ring-[#C2A36C]/50"
                        value={transferFrom}
                        onChange={(e) => setTransferFrom(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-white text-sm font-medium">To</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-[#C2A36C]" />
                      <Input
                        placeholder="Airport, Hotel or Address"
                        className="pl-10 bg-white/10 text-white border border-white/20 placeholder-white/50 focus-visible:ring-[#C2A36C]/50"
                        value={transferTo}
                        onChange={(e) => setTransferTo(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-white text-sm font-medium">Date & Time</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-white/10 text-white border border-white/20"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4 text-[#C2A36C]" />
                            {date ? format(date, "MMM dd, yyyy") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <label className="text-white text-sm font-medium">Time</label>
                      <Input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="bg-white/10 text-white border border-white/20 focus-visible:ring-[#C2A36C]/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-white text-sm font-medium">Passengers</label>
                    <div className="flex items-center border border-white/20 rounded-md bg-white/10">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-r-none h-10 text-white"
                        onClick={() => setPassengers(Math.max(1, passengers - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <div className="flex-1 text-center font-medium text-white">{passengers}</div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-l-none h-10 text-white"
                        onClick={() => setPassengers(Math.min(10, passengers + 1))}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-[#C2A36C] hover:bg-[#b1945e] text-black h-12 text-base font-medium transition-all duration-300"
                  onClick={handleSearchClick}
                >
                  Book Now
                </Button>
              </TabsContent>

              {/* Hourly Tab Content */}
              <TabsContent value="hourly" className="mt-6 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-white text-sm font-medium">Pickup Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-[#C2A36C]" />
                      <Input
                        placeholder="Airport, Hotel or Address"
                        className="pl-10 bg-white/10 text-white border border-white/20 placeholder-white/50 focus-visible:ring-[#C2A36C]/50"
                        value={transferFrom}
                        onChange={(e) => setTransferFrom(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-white text-sm font-medium">Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-white/10 text-white border border-white/20"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4 text-[#C2A36C]" />
                            {date ? format(date, "MMM dd, yyyy") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <label className="text-white text-sm font-medium">Time</label>
                      <Input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="bg-white/10 text-white border border-white/20 focus-visible:ring-[#C2A36C]/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-white text-sm font-medium">Hours</label>
                    <div className="flex items-center border border-white/20 rounded-md bg-white/10">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-r-none h-10 text-white"
                        onClick={() => setPassengers(Math.max(1, passengers - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <div className="flex-1 text-center font-medium text-white">{passengers}</div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-l-none h-10 text-white"
                        onClick={() => setPassengers(Math.min(10, passengers + 1))}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-[#C2A36C] hover:bg-[#b1945e] text-black h-12 text-base font-medium transition-all duration-300"
                  onClick={handleSearchClick}
                >
                  Book Now
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Floating Features Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-filter backdrop-blur-md border-t border-white/20 py-4 hidden lg:block">
        <div className="container mx-auto">
          <div className="grid grid-cols-4 gap-4">
            {[
              { icon: "🚘", text: "Professional Drivers" },
              { icon: "🕒", text: "24/7 Service" },
              { icon: "💰", text: "No Hidden Fees" },
              { icon: "✅", text: "Free Cancellation" },
            ].map((feature, index) => (
              <div key={index} className="flex items-center justify-center gap-3 text-white">
                <span className="text-2xl">{feature.icon}</span>
                <span className="font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

