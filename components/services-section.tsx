import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Plane, Clock, Shield, Users, MapPin } from "lucide-react"

export default function ServicesSection() {
  const services = [
    {
      icon: <Plane className="h-10 w-10 text-primary" />,
      title: "Airport Transfers",
      description: "Reliable transfers to and from Istanbul Airport (IST) and Sabiha Gökçen Airport (SAW)",
    },
    {
      icon: <Car className="h-10 w-10 text-primary" />,
      title: "City Tours",
      description: "Explore Istanbul's historic sites and hidden gems with our professional drivers",
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "Hourly Rentals",
      description: "Flexible hourly service for business meetings or shopping trips around the city",
    },
    {
      icon: <MapPin className="h-10 w-10 text-primary" />,
      title: "Intercity Transfers",
      description: "Comfortable long-distance transfers to other cities in Turkey",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Group Transfers",
      description: "Spacious vehicles for group travel, corporate events, and family vacations",
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "VIP Services",
      description: "Premium transportation with added security and privacy for VIP clients",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive transportation solutions tailored to your needs in Istanbul and beyond
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="mb-4">{service.icon}</div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

