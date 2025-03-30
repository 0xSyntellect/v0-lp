"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, MapPin, Minus, Plus } from "lucide-react"
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
      transferFrom
    )}&to=${encodeURIComponent(toParam)}&date=${encodeURIComponent(
      dateTime
    )}&passengers=${passengers}&serviceType=${activeTab}`
  }

  return (
    <section className="relative min-h-screen pt-16 overflow-hidden">
      {/* Background Image + Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero background img.png')",
          backgroundPosition: "center center",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 pt-20 md:pt-24 pb-20">
        {/* Centered Hero Text */}
        <div className="max-w-3xl mx-auto text-center text-white mb-12 md:mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 drop-shadow-lg">
            Premium Transport Services in Istanbul
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-sm">
            Secure, reliable and luxurious transfer services for business and leisure travelers
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              className="text-base bg-[#C2A36C] text-black border border-[#C2A36C] transition-all duration-200 hover:bg-[#b1945e] hover:scale-105"
            >
              Book Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            >
              Our Fleet
            </Button>
          </div>
        </div>

        {/* Booking Form */}
        <div
          id="booking-form"
          className="max-w-4xl mx-auto rounded-xl shadow-2xl p-3 bg-[#1F1F1F]"
        >
          {/* Redesigned Tabs: no extra white space at the top */}
          <Tabs defaultValue="transfer" onValueChange={setActiveTab}>
            <TabsList className="flex w-full h-12 m-0 p-0">
              <TabsTrigger
                value="transfer"
                className="w-1/2 h-full flex items-center justify-center text-sm font-semibold text-white bg-[#2C2C2C] border border-[#444] transition-all duration-200 data-[state=active]:bg-[#C2A36C] data-[state=active]:text-black"
              >
                Istanbul Transfer
              </TabsTrigger>
              <TabsTrigger
                value="hourly"
                className="w-1/2 h-full flex items-center justify-center text-sm font-semibold text-white bg-[#2C2C2C] border border-[#444] transition-all duration-200 data-[state=active]:bg-[#C2A36C] data-[state=active]:text-black"
              >
                Hourly Service
              </TabsTrigger>
            </TabsList>

            {/* Transfer Tab Content */}
            <TabsContent value="transfer" className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* "From" Field */}
                <div className="space-y-2">
                  <label className="text-white text-sm">From</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Airport, Hotel or Address"
                      className="pl-10 bg-[#2C2C2C] text-white border border-[#444] placeholder-gray-400 focus:ring-0"
                      value={transferFrom}
                      onChange={(e) => setTransferFrom(e.target.value)}
                    />
                  </div>
                </div>
                {/* "To" Field */}
                <div className="space-y-2">
                  <label className="text-white text-sm">To</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Airport, Hotel or Address"
                      className="pl-10 bg-[#2C2C2C] text-white border border-[#444] placeholder-gray-400 focus:ring-0"
                      value={transferTo}
                      onChange={(e) => setTransferTo(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {/* Date & Time */}
                <div className="space-y-2">
                  <label className="text-white text-sm">Date & Time</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-[#2C2C2C] text-white border border-[#444]">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") + `, ${time}` : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      <div className="p-3 border-t">
                        <Input
                          type="time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Passengers */}
                <div className="space-y-2">
                  <label className="text-white text-sm">Passengers</label>
                  <div className="flex items-center border border-[#444] rounded-md bg-[#2C2C2C]">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-r-none h-10 text-white"
                      onClick={() => setPassengers(Math.max(1, passengers - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="flex-1 text-center font-medium text-white">
                      {passengers}
                    </div>
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

                {/* Search Button */}
                <div className="flex items-end">
                  <Button
                    className="bg-[#C2A36C] hover:bg-[#b1945e] text-black h-10 w-full"
                    onClick={handleSearchClick}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Hourly Tab Content */}
            <TabsContent value="hourly" className="p-4">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="text-white text-sm">Pickup Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Airport, Hotel or Address"
                      className="pl-10 bg-[#2C2C2C] text-white border border-[#444] placeholder-gray-400 focus:ring-0"
                      value={transferFrom}
                      onChange={(e) => setTransferFrom(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-2">
                    <label className="text-white text-sm">Date & Time</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-[#2C2C2C] text-white border border-[#444]">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") + `, ${time}` : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                        <div className="p-3 border-t">
                          <Input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <label className="text-white text-sm">Hours</label>
                    <div className="flex items-center border border-[#444] rounded-md bg-[#2C2C2C]">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-r-none h-10 text-white"
                        onClick={() => setPassengers(Math.max(1, passengers - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <div className="flex-1 text-center font-medium text-white">
                        {passengers}
                      </div>
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
                <div className="flex items-end mt-6">
                  <Button
                    className="bg-[#C2A36C] hover:bg-[#b1945e] text-black h-10 w-full"
                    onClick={handleSearchClick}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
