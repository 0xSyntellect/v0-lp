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
  // Added state to track active tab ("transfer" or "hourly")
  const [activeTab, setActiveTab] = useState("transfer")

  const [transferFrom, setTransferFrom] = useState("Istanbul Airport (IST)")
  const [transferTo, setTransferTo] = useState("")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState("15:00")
  // Use same state for both passengers (transfer) and hours (hourly)
  const [passengers, setPassengers] = useState(1)

  // Build the date & time string
  const getDateTimeString = () => {
    if (!date) return ""
    const datePart = format(date, "yyyy-MM-dd")
    return `${datePart} ${time}`
  }

  // Updated to include the activeTab as serviceType
  const handleBookNowClick = () => {
    const dateTime = getDateTimeString()
    // If hourly service, omit the "to" field
    const toParam = activeTab === "hourly" ? "" : transferTo
    window.location.href = `/booking?from=${encodeURIComponent(transferFrom)}&to=${encodeURIComponent(
      toParam
    )}&date=${encodeURIComponent(dateTime)}&passengers=${passengers}&serviceType=${activeTab}`
  }

  return (
    <section className="relative min-h-screen pt-16 overflow-hidden">
      {/* Background Image with Vibrant Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/background.jpg')",
          backgroundPosition: "center 30%",
        }}
      >
        {/* Vibrant gradient overlay, uncomment*/}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-70"></div> */}
      </div>

      <div className="relative z-10 pt-20 md:pt-24 pb-20">
        {/* Centered Hero Text */}
        <div className="max-w-3xl mx-auto text-center text-white mb-12 md:mb-16">
          {/* <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 drop-shadow-lg">
            Premium Transport Services in Istanbul
          </h1>
          <p className="text-xl md:text-2xl text-indigo-700 mb-8 drop-shadow-sm">
            Secure, reliable and luxurious transfer services for business and leisure travelers
          </p> */}
          {/* <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
              onClick={handleBookNowClick}
            >
              Book Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-yellow-600 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            >
              Our Fleet
            </Button>
          </div> */}
        </div>

        {/* Centered Booking Form with service tabs */}
        <div id="booking-form" className="max-w-4xl mx-auto bg-white/80 rounded-xl shadow-2xl p-6">

        <h2 className="text-2xl font-bold text-center mb-4 text-black-500">
            Book Your Ride
          </h2>
          <h2 className="text-50 font-bold text-center mb-4 text-gray-600">
          Secure, reliable and luxurious transfer services for business and leisure travelers
          </h2>
          <Tabs defaultValue="transfer" onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="transfer" className="text-base">
                Istanbul Transfer
              </TabsTrigger>
              <TabsTrigger value="hourly" className="text-base">
                Hourly Service
              </TabsTrigger>
            </TabsList>

            {/* TRANSFER TAB */}
            <TabsContent value="transfer" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">From</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Airport, Hotel or Address"
                      className="pl-10"
                      value={transferFrom}
                      onChange={(e) => setTransferFrom(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">To</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Airport, Hotel or Address"
                      className="pl-10"
                      value={transferTo}
                      onChange={(e) => setTransferTo(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date & Time</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") + `, ${time}` : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      <div className="p-3 border-t">
                        <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Passengers</label>
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-r-none h-10"
                      onClick={() => setPassengers(Math.max(1, passengers - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="flex-1 text-center font-medium">{passengers}</div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-l-none h-10"
                      onClick={() => setPassengers(Math.min(10, passengers + 1))}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white h-10 mt-auto"
                  onClick={handleBookNowClick}
                >
                  BOOK NOW
                </Button>
              </div>
            </TabsContent>

            {/* HOURLY TAB */}
            <TabsContent value="hourly" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Pickup Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Airport, Hotel or Address"
                      className="pl-10"
                      value={transferFrom}
                      onChange={(e) => setTransferFrom(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Hours</label>
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-r-none h-10"
                      onClick={() => setPassengers(Math.max(1, passengers - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="flex-1 text-center font-medium">{passengers}</div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-l-none h-10"
                      onClick={() => setPassengers(Math.min(10, passengers + 1))}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2 lg:col-span-1">
                  <label className="text-sm font-medium">Date & Time</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") + `, ${time}` : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      <div className="p-3 border-t">
                        <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2 lg:col-span-1">
                  <label className="text-sm font-medium">Hours</label>
                  <div className="flex items-center border rounded-md h-10">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-r-none h-full"
                      onClick={() => setPassengers(Math.max(1, passengers - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="flex-1 text-center font-medium">{passengers}</div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-l-none h-full"
                      onClick={() => setPassengers(Math.min(10, passengers + 1))}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-1 flex items-end">
                  <Button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white h-10 w-full"
                    onClick={handleBookNowClick}
                  >
                    BOOK NOW
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
