// app/bookings/components/ReviewSummary.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useCurrency, convert, format } from "@/context/CurrencyContext";

type ContactInfo = {
  email: string;
  phone: string;
  whatsapp: string;
  flightNumber: string;
  notes: string;
};

export default function ReviewSummary({
  contactInfo,
  selectedVehicle,
  paymentMethod,
  passengerDetails,
  onConfirm,
}: {
  contactInfo: ContactInfo;
  selectedVehicle: { name: string; price: number } | null;
  paymentMethod: string;
  passengerDetails: {
        firstName: string;
        lastName: string;
        passportNumber: string;
        origin: string;
      }[];  
  onConfirm: () => void;
}) {
  const { selectedCurrency, rates } = useCurrency();

  return (
    <div className="bg-[#262626] p-8 rounded-2xl border border-[#BFA15B]/60 shadow-lg mb-12">
      <h3 className="text-2xl font-semibold text-[#BFA15B] mb-6">
        Review & Confirm
      </h3>

      <div className="space-y-4 text-sm">
        {selectedVehicle && (
          <p>
            <span className="font-semibold">Vehicle:</span> {selectedVehicle.name} —{" "}
            {format(
              convert(selectedVehicle.price, rates, selectedCurrency),
              selectedCurrency
            )}
          </p>
        )}

        <p>
          <span className="font-semibold">Payment:</span> {paymentMethod}
        </p>
{/* ↓↓↓ Passenger info block ↓↓↓ */}
<div className="border-t border-[#BFA15B]/20 pt-4">
  <p className="font-medium text-[#BFA15B] mb-2">Passenger Information</p>
  {passengerDetails.map((p, i) => (
    <p key={i}>
      FirstName: {p.firstName} LastName: {p.lastName} &mdash; Passport: {p.passportNumber}, Origin: {p.origin}
    </p>
  ))}
</div>


        <div className="border-t border-[#BFA15B]/20 pt-4">
          <p className="font-medium text-[#BFA15B] mb-2">Contact</p>
          <p>Email: {contactInfo.email}</p>
          <p>Phone: {contactInfo.phone}</p>
          {contactInfo.whatsapp && <p>WhatsApp: {contactInfo.whatsapp}</p>}
          {contactInfo.flightNumber && <p>Flight No.: {contactInfo.flightNumber}</p>}
          {contactInfo.notes && <p>Notes: {contactInfo.notes}</p>}
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <Button
          className="w-full max-w-sm bg-[#C2A36C] hover:bg-[#b1945e] text-black h-12 text-base font-medium transition-all duration-300"
          onClick={onConfirm}
        >
          Confirm Booking
        </Button>
      </div>
      <p className="mt-4 text-center text-sm text-[#BFA15B]">
        First time here? <span className="underline">Sign up</span> before
        checkout and enjoy <strong>5 % off</strong> your first ride!
      </p>
    </div>
  );
}
