"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Briefcase, Check } from "lucide-react"
import { useState } from "react"

export default function FleetSection() {
  const [selectedVehicle, setSelectedVehicle] = useState(0)

  const fleetCategories = [
    { value: "minivan", label: "Minivan" },
    { value: "minibus", label: "Minibus" },
    { value: "vip", label: "VIP" },
  ]

  const fleetItems = {
    minivan: [
      {
        name: "Mercedes V-Class",
        image: "/minivan.jpeg",
        passengers: 6,
        luggage: 6,
        features: ["WiFi", "Air Conditioning", "Professional Driver", "Spacious Interior"],
        price: "$40",
      },
      {
        name: "Maybach",
        image: "/maybach.jpeg",
        passengers: 6,
        luggage: 6,
        features: ["WiFi", "Air Conditioning", "Professional Driver", "Spacious Interior"],
        price: "$60",
      },
    ],
    minibus: [
      {
        name: "Mercedes Sprinter",
        image: "/sprinter2.jpeg",
        passengers: 12,
        luggage: 12,
        features: ["WiFi", "Air Conditioning", "Professional Driver", "Large Luggage Space"],
        price: "$80",
      },
    ],
    vip: [
      {
        name: "Mercedes S-Class",
        image: "/placeholder.svg?height=300&width=500",
        passengers: 3,
        luggage: 3,
        features: ["WiFi", "Air Conditioning", "VIP Service", "Premium Refreshments"],
        price: "$100",
      },
    ],
  }

  return (
    <section id="fleet" className="py-24 bg-[var(--background)]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-1 mb-4 rounded-full bg-[#C2A36C]/10">
            <span className="text-[#C2A36C] font-medium">Our Fleet</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Premium Vehicles for Your Journey</h2>
          <p className="text-lg text-gray-600">
            Choose from our selection of luxury vehicles for your transportation needs
          </p>
        </div>

        <Tabs defaultValue="minivan" className="w-full">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-12 bg-gray-200">
            {fleetCategories.map((category) => (
              <TabsTrigger
                key={category.value}
                value={category.value}
                className="data-[state=active]:bg-[#C2A36C] data-[state=active]:text-white"
              >
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(fleetItems).map(([category, vehicles]) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left side - Vehicle Image Showcase */}
                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={vehicles[selectedVehicle]?.image || "/placeholder.svg?height=400&width=600"}
                    alt={vehicles[selectedVehicle]?.name || "Vehicle"}
                    fill
                    className="object-cover"
                  />

                  {/* Price Tag */}
                  <div className="absolute top-6 right-6 bg-[#C2A36C] text-black px-4 py-2 rounded-full font-bold">
                    {vehicles[selectedVehicle]?.price || "$40"} / ride
                  </div>
                </div>

                {/* Right side - Vehicle Details */}
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-bold mb-6">{vehicles[selectedVehicle]?.name || "Vehicle"}</h3>

                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-[#C2A36C]/10">
                        <Users className="h-6 w-6 text-[#C2A36C]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Passengers</p>
                        <p className="font-medium">{vehicles[selectedVehicle]?.passengers || 0}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-[#C2A36C]/10">
                        <Briefcase className="h-6 w-6 text-[#C2A36C]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Luggage</p>
                        <p className="font-medium">{vehicles[selectedVehicle]?.luggage || 0}</p>
                      </div>
                    </div>
                  </div>

                  <h4 className="font-medium mb-4">Features</h4>
                  <div className="grid grid-cols-2 gap-y-3 mb-8">
                    {vehicles[selectedVehicle]?.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-[#C2A36C]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className="w-full bg-[#C2A36C] hover:bg-[#b1945e] text-black transition-all duration-300"
                    onClick={() => {
                      const bookingForm = document.getElementById("booking-form")
                      if (bookingForm) {
                        bookingForm.scrollIntoView({ behavior: "smooth", block: "center" })
                      }
                    }}
                  >
                    Book This Vehicle
                  </Button>

                  {/* Vehicle Selection Thumbnails */}
                  {vehicles.length > 1 && (
                    <div className="mt-8">
                      <p className="text-sm text-gray-500 mb-3">Other vehicles in this category:</p>
                      <div className="flex gap-3">
                        {vehicles.map((vehicle, index) => (
                          <div
                            key={index}
                            className={`relative w-20 h-20 rounded-md overflow-hidden cursor-pointer transition-all duration-300 ${selectedVehicle === index ? "ring-2 ring-[#C2A36C]" : "opacity-70"}`}
                            onClick={() => setSelectedVehicle(index)}
                          >
                            <Image
                              src={vehicle.image || "/placeholder.svg?height=80&width=80"}
                              alt={vehicle.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

