import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Briefcase, Wifi, Snowflake } from "lucide-react"

export default function FleetSection() {
  const fleetCategories = [
    { value: "sedan", label: "Sedan" },
    { value: "van", label: "Van" },
    { value: "minibus", label: "Minibus" },
    { value: "vip", label: "VIP" },
  ]

  const fleetItems = {
    sedan: [
      {
        name: "Mercedes E-Class",
        image: "/placeholder.svg?height=300&width=500",
        passengers: 3,
        luggage: 3,
        features: ["WiFi", "Air Conditioning", "Professional Driver", "Bottled Water"],
      },
      {
        name: "BMW 5 Series",
        image: "/placeholder.svg?height=300&width=500",
        passengers: 3,
        luggage: 3,
        features: ["WiFi", "Air Conditioning", "Professional Driver", "Bottled Water"],
      },
    ],
    van: [
      {
        name: "Mercedes V-Class",
        image: "/placeholder.svg?height=300&width=500",
        passengers: 6,
        luggage: 6,
        features: ["WiFi", "Air Conditioning", "Professional Driver", "Spacious Interior"],
      },
      {
        name: "Volkswagen Caravelle",
        image: "/placeholder.svg?height=300&width=500",
        passengers: 6,
        luggage: 6,
        features: ["WiFi", "Air Conditioning", "Professional Driver", "Spacious Interior"],
      },
    ],
    minibus: [
      {
        name: "Mercedes Sprinter",
        image: "/placeholder.svg?height=300&width=500",
        passengers: 12,
        luggage: 12,
        features: ["WiFi", "Air Conditioning", "Professional Driver", "Large Luggage Space"],
      },
    ],
    vip: [
      {
        name: "Mercedes S-Class",
        image: "/placeholder.svg?height=300&width=500",
        passengers: 3,
        luggage: 3,
        features: ["WiFi", "Air Conditioning", "VIP Service", "Premium Refreshments"],
      },
    ],
  }

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Our Premium Fleet</h2>
          <p className="text-lg text-muted-foreground">
            Choose from our selection of luxury vehicles for your transportation needs
          </p>
        </div>

        <Tabs defaultValue="sedan" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-12">
            {fleetCategories.map((category) => (
              <TabsTrigger key={category.value} value={category.value}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(fleetItems).map(([category, vehicles]) => (
            <TabsContent key={category} value={category} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {vehicles.map((vehicle, index) => (
                  <Card key={index} className="overflow-hidden border-none shadow-lg">
                    <div className="relative h-64 w-full">
                      <Image
                        src={vehicle.image || "/placeholder.svg"}
                        alt={vehicle.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4">{vehicle.name}</h3>

                      <div className="flex justify-between mb-6">
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-primary" />
                          <span>{vehicle.passengers} Passengers</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-5 w-5 text-primary" />
                          <span>{vehicle.luggage} Luggage</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {vehicle.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2">
                            {feature.includes("WiFi") ? (
                              <Wifi className="h-4 w-4 text-primary" />
                            ) : feature.includes("Air") ? (
                              <Snowflake className="h-4 w-4 text-primary" />
                            ) : (
                              <div className="h-4 w-4 rounded-full bg-primary" />
                            )}
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Button className="w-full">Book This Vehicle</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

