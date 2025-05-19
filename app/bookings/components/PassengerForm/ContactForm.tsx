// app/bookings/components/PassengerForm/ContactForm.tsx
"use client";
import { ChangeEvent } from "react";

export default function ContactForm({
  contactInfo,
  onChange,
}: {
  contactInfo: { email: string; phone: string; whatsapp: string; flightNumber: string; notes: string };
  onChange: (field: string, value: string) => void;
}) {
  return (
    <div className="space-y-4">
      <h4 className="font-medium text-[#BFA15B] mb-4">Contact Information</h4>
      <input
        type="email"
        placeholder="Email"
        className="w-full px-3 py-2 border rounded-md bg-transparent text-[#BFA15B]"
        value={contactInfo.email}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('email', e.target.value)}
      />
      <input
        type="tel"
        placeholder="Phone Number"
        className="w-full px-3 py-2 border rounded-md bg-transparent text-[#BFA15B]"
        value={contactInfo.phone}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('phone', e.target.value)}
      />
      <input
        type="text"
        placeholder="WhatsApp"
        className="w-full px-3 py-2 border rounded-md bg-transparent text-[#BFA15B]"
        value={contactInfo.whatsapp}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('whatsapp', e.target.value)}
      />
      <input
        type="text"
        placeholder="Flight Number"
        className="w-full px-3 py-2 border rounded-md bg-transparent text-[#BFA15B]"
        value={contactInfo.flightNumber}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('flightNumber', e.target.value)}
      />
      <textarea
        rows={3}
        placeholder="Notes"
        className="w-full px-3 py-2 border rounded-md bg-transparent resize-none text-[#BFA15B]"
        value={contactInfo.notes}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange('notes', e.target.value)}
      />
    </div>
  );
}
