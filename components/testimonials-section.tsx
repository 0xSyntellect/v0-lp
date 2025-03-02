import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "United States",
      rating: 5,
      text: "Excellent service! Our driver was punctual, professional, and the vehicle was immaculate. Will definitely use Pickup Istanbul again on our next visit.",
    },
    {
      name: "Ahmed Al-Farsi",
      location: "United Arab Emirates",
      rating: 5,
      text: "The VIP service exceeded my expectations. The driver was knowledgeable about the city and made our business trip stress-free. Highly recommended!",
    },
    {
      name: "Maria Gonzalez",
      location: "Spain",
      rating: 5,
      text: "We booked a city tour with Pickup Istanbul and had an amazing experience. Our driver was friendly and showed us all the best spots in Istanbul.",
    },
    {
      name: "Hiroshi Tanaka",
      location: "Japan",
      rating: 4,
      text: "Very reliable airport transfer service. The booking process was simple, and the driver was waiting for us despite our flight delay.",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">What Our Clients Say</h2>
          <p className="text-lg text-muted-foreground">
            Read testimonials from our satisfied customers around the world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="mb-6 italic text-muted-foreground">"{testimonial.text}"</p>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

