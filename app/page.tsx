import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import FleetSection from "@/components/fleet-section"
import TestimonialsSection from "@/components/testimonials-section"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"

/*
  Hero and Footer remain full width,
  CTA is now also full width,
  while Services, Fleet, and Testimonials are wrapped in a centered container.
*/
export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Full-width hero */}
      <HeroSection />

      {/* Centered container for these sections */}
      <div className="max-w-5xl mx-auto px-4">
        <ServicesSection />
        <FleetSection />
        <TestimonialsSection />
      </div>

      {/* Full-width CTA */}
      <CTASection />

      {/* Full-width footer */}
      <Footer />
    </main>
  )
}
