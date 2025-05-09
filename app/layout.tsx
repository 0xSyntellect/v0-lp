import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import FloatingIcon from "@/components/floating-icon";
import GoTopButton from "@/components/go-top-button";
import { CurrencyProvider } from '@/context/CurrencyContext';
import { AuthProvider } from '@/context/AuthContext';



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Istanbul Transfer Service | Premium Rides",
  description:
    "Secure, reliable, and luxurious transport services in Istanbul. Book airport transfers, hourly rentals, and more.",
  openGraph: {
    title: "Istanbul Transfer Service | Premium Rides",
    description:
      "Secure, reliable, and luxurious transport services in Istanbul. Book airport transfers, hourly rentals, and more.",
    url: "https://pickupist.com",
    siteName: "Pickup Istanbul",
    images: [
      {
        url: "https://pickupist.com/pickupist-logo.png", // Replace with your image URL
        width: 1200,
        height: 630,
        alt: "Istanbul Transfer Service",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Istanbul Transfer Service | Premium Rides",
    description:
      "Secure, reliable, and luxurious transport services in Istanbul.",
    images: ["https://pickupist.com/pickupist-logo.png"], // Replace accordingly
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        {/* iOS Safari meta */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <AuthProvider>
        <CurrencyProvider>
          {children}
          <Analytics />
          <FloatingIcon />
          <GoTopButton />
        </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  );

}
