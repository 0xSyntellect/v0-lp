import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import FleetSection from "@/components/fleet-section"
import TestimonialsSection from "@/components/testimonials-section"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <FleetSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  )
}

