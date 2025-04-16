"use client";
console.log("AutoCompleteInput has mounted in production");

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, MapPin, Minus, Plus, ChevronRight } from "lucide-react"
import { format } from "date-fns"

// Define the GooglePrediction interface to type the predictions from the Google Places API
interface GooglePrediction {
  description: string;
  place_id: string;
}

// Define a type for the suggestion items from Nominatim
interface Suggestion {
  display_name: string
  // You can add more fields if needed
}

// Simple auto-complete input for free location suggestions via OpenStreetMap Nominatim
function AutoCompleteInput({
  placeholder,
  value,
  onChange,
  className,
}: {
  placeholder: string
  value: string
  onChange: (val: string) => void
  className?: string
}) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Fetch suggestions from Nominatim

  const fetchSuggestions = async (val: string) => {
    if (!val) {
      setSuggestions([]);
      return;
    }
    console.log("Fetching suggestions for:", val); // Log the input value
    try {
      console.log("fetchSuggestions called with:", val);
      const response = await fetch(`/api/google-places?q=${encodeURIComponent(val)}`);
      console.log("fetch response: ", response);
      const data = await response.json();
      console.log("Received suggestions data:", data); // Log what is returned
  
      if (data.predictions) {
        const parsed: Suggestion[] = data.predictions.map((pred: GooglePrediction) => ({
          display_name: pred.description, // Fixes rendering issue
        }));
        setSuggestions(parsed);
      }
       else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching Google Places:", error);
      setSuggestions([]);
    }
  };
  console.log("AutoCompleteInput component has mounted!");

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
    console.log("Running useEffect – all set?");
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <Input
        placeholder={placeholder}
        className={className}
        value={value}
        onChange={(e) => {
          console.log("Input changed:", e.target.value);
          onChange(e.target.value)
          fetchSuggestions(e.target.value)
          setShowSuggestions(true)
        }}
        onFocus={() => setShowSuggestions(true)}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border border-gray-200 mt-1 rounded shadow-md max-h-48 overflow-y-auto z-50">
          {suggestions.map((item, i) => (
            <li
              key={i}
              onClick={() => {
                onChange(item.display_name)
                setShowSuggestions(false)
              }}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm text-black"
            >
              {item.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState("transfer")
  const [transferFrom, setTransferFrom] = useState("Istanbul Airport (IST), Tayakadın, Terminal Caddesi, Arnavutköy/İstanbul, Türkiye")
  const [transferTo, setTransferTo] = useState("Taksim Square, Kocatepe, Beyoğlu/İstanbul, Türkiye")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState("15:00")
  const [passengers, setPassengers] = useState(1)
  const [errorMessage, setErrorMessage] = useState("")

  const getDateTimeString = () => {
    if (!date) return ""
    const datePart = format(date, "yyyy-MM-dd")
    return `${datePart} ${time}`
  }

  const handleSearchClick = () => {
    if (activeTab === "transfer") {
      if (!transferFrom.trim() || !transferTo.trim() || !date || !time.trim() || !passengers) {
        setErrorMessage("Please fill in all required fields.")
        return
      }
    } else if (activeTab === "hourly") {
      if (!transferFrom.trim() || !date || !time.trim() || !passengers) {
        setErrorMessage("Please fill in all required fields.")
        return
      }
    }
    setErrorMessage("")
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
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/background2.png')",
          backgroundPosition: "center center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-20 md:pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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

          <div
            id="booking-form"
            className="bg-white/10 backdrop-filter backdrop-blur-md rounded-xl shadow-2xl p-6 border border-white/20"
          >
            <h3 className="text-white text-xl font-semibold mb-6 text-center">Book Your Ride</h3>
            {errorMessage && (
              <div className="mb-4 text-red-500 text-center">
                {errorMessage}
              </div>
            )}

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

              <TabsContent value="transfer" className="mt-6 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-white text-sm font-medium">From</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-[#C2A36C]" />
                      <AutoCompleteInput
                        placeholder="Airport, Hotel or Address"
                        value={transferFrom}
                        onChange={setTransferFrom}
                        className="pl-10 bg-white/10 text-white border border-white/20 placeholder-white/50 focus-visible:ring-[#C2A36C]/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-white text-sm font-medium">To</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-[#C2A36C]" />
                      <AutoCompleteInput
                        placeholder="Airport, Hotel or Address"
                        value={transferTo}
                        onChange={setTransferTo}
                        className="pl-10 bg-white/10 text-white border border-white/20 placeholder-white/50 focus-visible:ring-[#C2A36C]/50"
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

              <TabsContent value="hourly" className="mt-6 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-white text-sm font-medium">Pickup Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-[#C2A36C]" />
                      <AutoCompleteInput
                        placeholder="Airport, Hotel or Address"
                        value={transferFrom}
                        onChange={setTransferFrom}
                        className="pl-10 bg-white/10 text-white border border-white/20 placeholder-white/50 focus-visible:ring-[#C2A36C]/50"
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
