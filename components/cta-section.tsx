import { Button } from "@/components/ui/button"
import { PhoneCall, Mail, MessageSquare } from "lucide-react"

export default function CTASection() {
  return (
    /**
     * NOTE:
     * - The entire section is now gold (#BFA15B).
     * - The text is now dark (#1F1F1F) to contrast the gold background.
     * - Inside, the "quick inquiry" form is a black/dark background, with gold text & border
     *   to maintain overall brand identity, while still standing out.
     */
    <section className="py-20 bg-[#BFA15B] text-[#1F1F1F]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left column - contact info (black text because the BG is gold) */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Ready to Book Your Transfer?
            </h2>
            <p className="text-lg mb-8">
              Contact us now to arrange your transportation in Istanbul.
              Our team is available 24/7 to assist you.
            </p>
            <div className="space-y-4">
              <div className="flex justify-center md:justify-start items-center gap-3">
                <PhoneCall className="h-5 w-5" />
                <span>+90 532 057 97 34</span>
              </div>
              <div className="flex justify-center md:justify-start items-center gap-3">
                <Mail className="h-5 w-5" />
                <span>info@pickupist.com</span>
              </div>
              <div className="flex justify-center md:justify-start items-center gap-3">
                <MessageSquare className="h-5 w-5" />
                <span>WhatsApp: +90 532 057 97 34</span>
              </div>
            </div>
          </div>

          {/* Quick Inquiry form in a dark box with gold text & border */}
          <div className="bg-[#1F1F1F] p-8 rounded-xl border border-[#BFA15B] text-[#BFA15B] shadow-lg">
            <h3 className="text-xl font-bold mb-6">Quick Inquiry</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-transparent border border-[#BFA15B] rounded-md placeholder-[#666666]"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 bg-transparent border border-[#BFA15B] rounded-md placeholder-[#666666]"
                    placeholder="Your email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Service Type</label>
                <select className="w-full px-3 py-2 bg-transparent border border-[#BFA15B] rounded-md">
                  <option>Airport Transfer</option>
                  <option>City Tour</option>
                  <option>Hourly Rental</option>
                  <option>Intercity Transfer</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <textarea
                  className="w-full px-3 py-2 bg-transparent border border-[#BFA15B] rounded-md placeholder-[#666666] min-h-[100px]"
                  placeholder="Tell us about your transportation needs"
                />
              </div>
              <Button
                className="w-full bg-transparent border border-[#BFA15B] text-[#BFA15B] hover:bg-[#BFA15B] hover:text-[#1F1F1F]"
              >
                Send Inquiry
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
