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
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Heading and Featured Testimonial */}
          <div>
            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-[#C2A36C]/10">
              <span className="text-[#C2A36C] font-medium">Testimonials</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">What Our Clients Say About Us</h2>
            <p className="text-lg text-gray-600 mb-8">
              Don't just take our word for it. Read what our satisfied customers from around the world have to say about
              our premium transportation services.
            </p>

            {/* Featured Testimonial */}
            <div className="relative bg-gray-50 p-8 rounded-2xl shadow-lg mb-8">
              <div className="absolute -top-4 -left-4 bg-[#C2A36C] rounded-full p-3">
                <Quote className="h-6 w-6 text-white" />
              </div>

              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <p className="text-lg italic mb-6">"{testimonials[0].text}"</p>

              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonials[0].image || "/placeholder.svg?height=48&width=48"}
                    alt={testimonials[0].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold">{testimonials[0].name}</p>
                  <p className="text-sm text-gray-500">{testimonials[0].location}</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-3xl font-bold text-[#C2A36C]">1000+</p>
                <p className="text-sm text-gray-600">Happy Clients</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-3xl font-bold text-[#C2A36C]">4.9</p>
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-3xl font-bold text-[#C2A36C]">5000+</p>
                <p className="text-sm text-gray-600">Rides Completed</p>
              </div>
            </div>
          </div>

          {/* Right Column - More Testimonials */}
          <div className="space-y-6">
            {testimonials.slice(1).map((testimonial, index) => (
              <Card key={index} className="border-none shadow-lg overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>

                  <p className="italic text-gray-700 mb-6">"{testimonial.text}"</p>

                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image || "/placeholder.svg?height=48&width=48"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Trust Badges */}
            <div className="bg-gray-50 p-6 rounded-2xl">
              <p className="text-center font-medium mb-4">Trusted By</p>
              <div className="flex justify-around items-center">
                <div className="opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                  <Image src="/placeholder.svg?height=40&width=100" alt="Partner 1" width={100} height={40} />
                </div>
                <div className="opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                  <Image src="/placeholder.svg?height=40&width=100" alt="Partner 2" width={100} height={40} />
                </div>
                <div className="opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                  <Image src="/placeholder.svg?height=40&width=100" alt="Partner 3" width={100} height={40} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

