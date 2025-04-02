import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Plane, Clock, Shield, Users, MapPin } from "lucide-react"

export default function ServicesSection() {
  const services = [
    {
      icon: <Plane className="h-10 w-10 text-[#C19A53]" />,
      title: "Airport Transfers",
      description: "Reliable transfers to and from Istanbul Airport (IST) and Sabiha Gökçen Airport (SAW)",
    },
    {
      icon: <Car className="h-10 w-10 text-[#C19A53]" />,
      title: "City Tours",
      description: "Explore Istanbul's historic sites and hidden gems with our professional drivers",
    },
    {
      icon: <Clock className="h-10 w-10 text-[#C19A53]" />,
      title: "Hourly Rentals",
      description: "Flexible hourly service for business meetings or shopping trips around the city",
    },
    {
      icon: <MapPin className="h-10 w-10 text-[#C19A53]" />,
      title: "Intercity Transfers",
      description: "Comfortable long-distance transfers to other cities in Turkey",
    },
    {
      icon: <Users className="h-10 w-10 text-[#C19A53]" />,
      title: "Group Transfers",
      description: "Spacious vehicles for group travel, corporate events, and family vacations",
    },
    {
      icon: <Shield className="h-10 w-10 text-[#C19A53]" />,
      title: "VIP Services",
      description: "Premium transportation with added security and privacy for VIP clients",
    },
  ]

  return (
    <section
      id="services"
      className="w-full py-20 bg-[#1F1F1F]"
    >
      {/* Centered Content Container */}
      <div className="max-w-5xl mx-auto px-4">
        {/* Heading / Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-black">
            Our Services
          </h2>
          <p className="text-lg text-gray-900">
            Comprehensive transportation solutions tailored to your needs in Istanbul and beyond
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="border-none shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-1 bg-white"
            >
              <CardHeader className="pb-2 flex flex-col items-center text-center">
                <div className="mb-4">{service.icon}</div>
                <CardTitle className="text-xl text-gray-800">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base text-gray-600">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
