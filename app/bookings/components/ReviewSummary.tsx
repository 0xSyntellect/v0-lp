// app/bookings/components/ReviewSummary.tsx
"use client";
import { Button } from "@/components/ui/button";
import { useCurrency, convert, format } from "@/context/CurrencyContext";

type Passenger = {
  firstName: string;
  lastName: string;
  passportNumber: string;
  origin: string;
};

type ContactInfo = {
  email: string;
  phone: string;
  whatsapp: string;
  flightNumber: string;
  notes: string;
};

export default function ReviewSummary({
  passengerDetails,
  contactInfo,
  selectedVehicle,
  paymentMethod,
  onConfirm,
}: {
  passengerDetails: Passenger[];
  contactInfo: ContactInfo;
  selectedVehicle: { name: string; price: number } | null;
  paymentMethod: string;
  onConfirm: () => void;
}) {
  return (
    <div className="bg-[#1F1F1F] p-8 rounded-2xl border border-[#BFA15B]/60 shadow-lg backdrop-blur-sm mb-12">
      <h3 className="text-2xl font-semibold text-center mb-6 tracking-wide text-[#BFA15B]">
        Final Review
      </h3>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          {passengerDetails.map((p, i) => (
            <div
              key={i}
              className="rounded-xl border border-[#BFA15B]/40 p-4 bg-[#262626] text-[#BFA15B]"
            >
              <p className="font-medium mb-2">Passenger {i + 1}</p>
              <ul className="text-sm space-y-1">
                <li><span className="font-semibold">First:</span> {p.firstName}</li>
                <li><span className="font-semibold">Last:</span> {p.lastName}</li>
                <li><span className="font-semibold">Passport:</span> {p.passportNumber}</li>
                <li><span className="font-semibold">Origin:</span> {p.origin}</li>
              </ul>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-[#BFA15B]/40 p-6 bg-[#262626] flex flex-col justify-between text-[#BFA15B]">
          <div className="space-y-4 text-sm">
            <p><span className="font-semibold">Payment:</span> {paymentMethod}</p>
            {selectedVehicle && (
              <p>
                <span className="font-semibold">Vehicle:</span> {selectedVehicle.name} — {selectedVehicle.price.toFixed(2)}
              </p>
            )}
            <div className="border-t border-[#BFA15B]/20 pt-4">
              <p className="font-medium text-[#BFA15B] mb-2">Contact</p>
              <p><span className="font-semibold">Email:</span> {contactInfo.email || "N/A"}</p>
              <p><span className="font-semibold">Phone:</span> {contactInfo.phone || "N/A"}</p>
              <p><span className="font-semibold">WhatsApp:</span> {contactInfo.whatsapp || "N/A"}</p>
              {contactInfo.flightNumber && (
                <p><span className="font-semibold">Flight #:</span> {contactInfo.flightNumber}</p>
              )}
              {contactInfo.notes && (
                <p><span className="font-semibold">Notes:</span> {contactInfo.notes}</p>
              )}
            </div>
          </div>
          <Button className="mt-8 w-full" onClick={onConfirm}>
            Confirm Booking
          </Button>
        </div>
      </div>
    </div>
  );
}
