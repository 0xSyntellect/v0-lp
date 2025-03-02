import { Button } from "@/components/ui/button"
import { PhoneCall, Mail, MessageSquare } from "lucide-react"

export default function CTASection() {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Ready to Book Your Transfer?</h2>
            <p className="text-lg text-white/90 mb-8">
              Contact us now to arrange your transportation in Istanbul. Our team is available 24/7 to assist you.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <PhoneCall className="h-5 w-5" />
                <span>+90 555 123 4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5" />
                <span>info@pickupistanbul.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5" />
                <span>WhatsApp: +90 555 123 4567</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg text-gray-900">
            <h3 className="text-xl font-bold mb-6">Quick Inquiry</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Your email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Service Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option>Airport Transfer</option>
                  <option>City Tour</option>
                  <option>Hourly Rental</option>
                  <option>Intercity Transfer</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md min-h-[100px]"
                  placeholder="Tell us about your transportation needs"
                ></textarea>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white">Send Inquiry</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

