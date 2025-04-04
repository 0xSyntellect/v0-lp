import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "United States",
      rating: 5,
      text: "Excellent service! Our driver was punctual, professional, and the vehicle was immaculate. Will definitely use Pickup Istanbul again on our next visit.",
      image: "/testimonial-1.jpg",
    },
    {
      name: "Ahmed Al-Farsi",
      location: "United Arab Emirates",
      rating: 5,
      text: "The VIP service exceeded my expectations. The driver was knowledgeable about the city and made our business trip stress-free. Highly recommended!",
      image: "/testimonial-2.jpg",
    },
    {
      name: "Maria Gonzalez",
      location: "Spain",
      rating: 5,
      text: "We booked a city tour with Pickup Istanbul and had an amazing experience. Our driver was friendly and showed us all the best spots in Istanbul.",
      image: "/testimonial-3.jpg",
    },
  ]

  return (
    <section className="py-24 bg-[var(--background)]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <div>
            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-[#C2A36C]/10">
              <span className="text-[#C2A36C] font-medium">Testimonials</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-white">
              What Our Clients Say About Us
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Don&apos;t just take our word for it. Read what our satisfied customers from around the world have to say
              about our premium transportation services.
            </p>

            {/* Featured Testimonial */}
            <div className="relative bg-white/5 border border-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg mb-8 text-white">
              <div className="absolute -top-4 -left-4 bg-[#C2A36C] rounded-full p-3 shadow-md">
                <Quote className="h-6 w-6 text-white" />
              </div>

              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <p className="text-lg italic mb-6">
                &quot;{testimonials[0].text}&quot;
              </p>

              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonials[0].image}
                    alt={testimonials[0].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold">{testimonials[0].name}</p>
                  <p className="text-sm text-gray-400">{testimonials[0].location}</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { label: "Happy Clients", value: "1000+" },
                { label: "Average Rating", value: "4.9" },
                { label: "Rides Completed", value: "5000+" },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl">
                  <p className="text-3xl font-bold text-[#C2A36C]">{stat.value}</p>
                  <p className="text-sm text-gray-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {testimonials.slice(1).map((testimonial, index) => (
              <Card key={index} className="border-none shadow-md bg-white/5 backdrop-blur-md text-white">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="italic text-gray-300 mb-6">
                    &quot;{testimonial.text}&quot;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-gray-400">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Trust Badges */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl">
              <p className="text-center font-medium mb-4 text-white">Trusted By</p>
              <div className="flex justify-around items-center">
                {["/placeholder.svg?height=40&width=100", "/placeholder.svg?height=40&width=100", "/placeholder.svg?height=40&width=100"].map((src, i) => (
                  <div key={i} className="opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition duration-300">
                    <Image src={src} alt={`Partner ${i + 1}`} width={100} height={40} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
