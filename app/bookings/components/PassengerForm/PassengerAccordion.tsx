// app/bookings/components/PassengerForm/PassengerAccordion.tsx
"use client";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function PassengerAccordion({
  passengerDetails,
  isAccordionOpen,
  onChange,
  onToggle,
}: {
  passengerDetails: Array<{ firstName: string; lastName: string; passportNumber: string; origin: string }>;
  isAccordionOpen: boolean[];
  onChange: (idx: number, field: string, value: string) => void;
  onToggle: (idx: number) => void;
}) {
  return (
    <div className="space-y-6">
      <h4 className="font-medium text-[#BFA15B] mb-4">Passenger Details</h4>
      {passengerDetails.map((p, i) => (
        <div key={i} className="rounded-xl border border-[#BFA15B]/40 p-4 bg-[#262626]">
          <button
            className="w-full flex justify-between items-center mb-4 text-[#BFA15B]"
            onClick={() => onToggle(i)}
          >
            <span className="font-medium">Passenger {i + 1}</span>
            {isAccordionOpen[i] ? <ChevronUp className="text-[#BFA15B]"/> : <ChevronDown className="text-[#BFA15B]"/>}
          </button>
          {isAccordionOpen[i] && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full px-3 py-2 border rounded-md bg-transparent text-[#BFA15B]"
                value={p.firstName}
                onChange={e => onChange(i, 'firstName', e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full px-3 py-2 border rounded-md bg-transparent text-[#BFA15B]"
                value={p.lastName}
                onChange={e => onChange(i, 'lastName', e.target.value)}
              />
              <input
                type="text"
                placeholder="Passport Number"
                className="w-full px-3 py-2 border rounded-md bg-transparent text-[#BFA15B]"
                value={p.passportNumber}
                onChange={e => onChange(i, 'passportNumber', e.target.value)}
              />
              <input
                type="text"
                placeholder="Origin"
                className="w-full px-3 py-2 border rounded-md bg-transparent text-[#BFA15B]"
                value={p.origin}
                onChange={e => onChange(i, 'origin', e.target.value)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
