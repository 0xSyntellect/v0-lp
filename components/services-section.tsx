import { Car, Plane, Clock, Shield, Users, MapPin, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function ServicesSection() {
  const services = [
    {
      icon: <Plane className="h-12 w-12 text-[#C2A36C]" />,
      title: "Airport Transfers",
      description: "Reliable transfers to and from Istanbul Airport (IST) and Sabiha Gökçen Airport (SAW)",
      image: "/background.jpg",
    },
    {
      icon: <Car className="h-12 w-12 text-[#C2A36C]" />,
      title: "City Tours",
      description: "Explore Istanbul's historic sites and hidden gems with our professional drivers",
      image: "/city tours.png",
    },
    {
      icon: <Clock className="h-12 w-12 text-[#C2A36C]" />,
      title: "Hourly Rentals",
      description: "Flexible hourly service for business meetings or shopping trips around the city",
      image: "/hourly-rental.jpg",
    },
    {
      icon: <MapPin className="h-12 w-12 text-[#C2A36C]" />,
      title: "Intercity Transfers",
      description: "Comfortable long-distance transfers to other cities in Turkey",
      image: "/intercity-transfer.jpg",
    },
  ]

  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-1 mb-4 rounded-full bg-[#C2A36C]/10">
            <span className="text-[#C2A36C] font-medium">Our Services</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Premium Transportation Solutions</h2>
          <p className="text-lg text-gray-600">
            Comprehensive transportation services tailored to your needs in Istanbul and beyond
          </p>
        </div>

        {/* Featured Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.slice(0, 2).map((service, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              {/* Background Image with Gradient Overlay */}
              <div className="absolute inset-0">
                <Image
                  src={service.image || "/placeholder.svg?height=400&width=600"}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
              </div>

              {/* Content */}
              <div className="relative p-8 h-full flex flex-col justify-end min-h-[320px]">
                <div className="mb-4 p-3 rounded-full bg-white/10 backdrop-blur-sm w-fit">{service.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-white/80 mb-6">{service.description}</p>
                <Button
                  variant="outline"
                  className="w-fit border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-black transition-all duration-300"
                >
                  Learn More <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.slice(2, 4).map((service, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              {/* Background Image with Gradient Overlay */}
              <div className="absolute inset-0">
                <Image
                  src={service.image || "/placeholder.svg?height=400&width=600"}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
              </div>

              {/* Content */}
              <div className="relative p-8 h-full flex flex-col justify-end min-h-[320px]">
                <div className="mb-4 p-3 rounded-full bg-white/10 backdrop-blur-sm w-fit">{service.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-white/80 mb-6">{service.description}</p>
                <Button
                  variant="outline"
                  className="w-fit border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-black transition-all duration-300"
                >
                  Learn More <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-gray-50 rounded-2xl p-8 flex flex-col justify-between h-full">
            <div>
              <div className="mb-4 p-3 rounded-full bg-[#C2A36C]/10 w-fit">
                <Users className="h-8 w-8 text-[#C2A36C]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Group Transfers</h3>
              <p className="text-gray-600 mb-6">
                Spacious vehicles for group travel, corporate events, and family vacations
              </p>
            </div>
            <Button
              variant="outline"
              className="w-fit border-[#C2A36C] text-[#C2A36C] hover:bg-[#C2A36C] hover:text-white transition-all duration-300"
            >
              Learn More <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 flex flex-col justify-between h-full">
            <div>
              <div className="mb-4 p-3 rounded-full bg-[#C2A36C]/10 w-fit">
                <Shield className="h-8 w-8 text-[#C2A36C]" />
              </div>
              <h3 className="text-xl font-bold mb-2">VIP Services</h3>
              <p className="text-gray-600 mb-6">
                Premium transportation with added security and privacy for VIP clients
              </p>
            </div>
            <Button
              variant="outline"
              className="w-fit border-[#C2A36C] text-[#C2A36C] hover:bg-[#C2A36C] hover:text-white transition-all duration-300"
            >
              Learn More <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

