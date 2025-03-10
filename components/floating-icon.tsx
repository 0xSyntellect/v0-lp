"use client";

import Link from "next/link";

// Inline WhatsApp SVG icon component with increased size
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`h-10 w-10 ${props.className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>WhatsApp</title>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.149-.67.15-.198.297-.767.967-.94 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.058-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.297.297-.495.099-.198.05-.371-.025-.52-.074-.149-.67-1.612-.92-2.206-.242-.579-.487-.5-.67-.51l-.57-.01c-.198 0-.52.074-.792.371-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.412.248-.694.248-1.287.173-1.412-.074-.124-.273-.198-.57-.347z" />
    <path d="M24 12.073C24 5.405 18.627 0 12 0 5.373 0 0 5.405 0 12.073c0 2.123.557 4.116 1.616 5.94L0 24l6.022-1.58C7.959 23.393 9.93 24 12 24c6.627 0 12-5.405 12-11.927zM12 21.54c-2.285 0-4.43-.623-6.267-1.698l-.448-.264-3.581.94.955-3.496-.29-.467C3.226 15.187 2.67 13.187 2.67 11.073 2.67 6.805 6.306 3.3 12 3.3c5.694 0 9.33 3.505 9.33 7.773 0 4.268-3.636 7.472-9.33 7.472z" />
  </svg>
);

export default function FloatingIcon() {
  return (
    <Link
      href="https://wa.me/905320579734?text=Hello%2C%20I%20would%20like%20to%20book%20transfer%20service%20in%20Istanbul"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50"
    >
      <div className="relative">
        {/* Ping effect for a shining animation */}
        <span className="absolute inline-flex h-12 w-12 rounded-full bg-green-500 opacity-75 animate-ping"></span>
        <span className="relative inline-flex items-center justify-center p-3 rounded-full bg-green-600 hover:bg-green-700 text-white">
          <WhatsAppIcon />
        </span>
      </div>
    </Link>
  );
}
