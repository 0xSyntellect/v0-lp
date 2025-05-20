// app/bookings/components/PaymentSelect.tsx
"use client";
import { ChangeEvent } from "react";

type PaymentSelectProps = {
  value: string;
  onChange: (val: string) => void;
};

export default function PaymentSelect({ value, onChange }: PaymentSelectProps) {
  return (
    <div className="bg-[#262626] p-4 rounded-xl border border-[#BFA15B] mb-6">
      <h4 className="text-lg font-semibold mb-2 text-[#BFA15B]">Payment Method</h4>
      <select
        id="payment-method-select"
        className="w-full px-4 py-2 border border-[#BFA15B] rounded-md bg-transparent text-[#BFA15B]"
        value={value}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
      >
        <option value="">Choose Payment Method</option>
        <option value="Credit Card">Credit Card</option>
        <option value="cash">Cash</option>
      </select>
    </div>
  );
}