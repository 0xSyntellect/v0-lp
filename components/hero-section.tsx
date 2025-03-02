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
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [passengers, setPassengers] = useState(1)

  return (
    <section className="relative min-h-screen pt-16 overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          backgroundPosition: "center 30%",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
      </div>

      <div className="container relative z-10 pt-20 md:pt-32 pb-20">
        <div className="max-w-3xl text-white mb-12 md:mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Premium Transport Services in Istanbul</h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Secure, reliable and luxurious transfer services for business and leisure travelers
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
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
        <div className="bg-white rounded-xl shadow-2xl p-6 max-w-4xl mx-auto">
          <Tabs defaultValue="transfer" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="transfer" className="text-base">
                Istanbul Transfer
              </TabsTrigger>
              <TabsTrigger value="hourly" className="text-base">
                Hourly Service
              </TabsTrigger>
            </TabsList>
            <TabsContent value="transfer" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">From</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Airport, Hotel or Address"
                      className="pl-10"
                      defaultValue="Istanbul Airport (IST)"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">To</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input placeholder="Airport, Hotel or Address" className="pl-10" />
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
                        {date ? format(date, "PPP, HH:mm") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      <div className="p-3 border-t">
                        <Input type="time" defaultValue="15:00" />
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

                <Button className="bg-primary hover:bg-primary/90 text-white h-10 mt-auto">BOOK NOW</Button>
              </div>
            </TabsContent>

            <TabsContent value="hourly" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Pickup Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input placeholder="Airport, Hotel or Address" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Hours</label>
                  <div className="flex items-center border rounded-md">
                    <Button variant="ghost" size="icon" className="rounded-r-none h-10">
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="flex-1 text-center font-medium">4</div>
                    <Button variant="ghost" size="icon" className="rounded-l-none h-10">
                      <Plus className="h-4 w-4" />
                    </Button>
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
                        {date ? format(date, "PPP, HH:mm") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      <div className="p-3 border-t">
                        <Input type="time" defaultValue="15:00" />
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

                <Button className="bg-primary hover:bg-primary/90 text-white h-10 mt-auto">BOOK NOW</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

