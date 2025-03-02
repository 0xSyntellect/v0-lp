import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PhoneCall } from "lucide-react"

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold tracking-tight text-primary">PICKUP ISTANBUL</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
            ABOUT
          </Link>
          <Link href="/services" className="text-sm font-medium transition-colors hover:text-primary">
            SERVICES
          </Link>
          <Link href="/features" className="text-sm font-medium transition-colors hover:text-primary">
            FEATURES
          </Link>
          <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
            CONTACT
          </Link>
          <Button variant="outline" size="sm" className="gap-2">
            <PhoneCall className="h-4 w-4" />
            <span>+90 555 123 4567</span>
          </Button>
        </nav>
        <Button variant="outline" size="icon" className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>
      </div>
    </header>
  )
}

