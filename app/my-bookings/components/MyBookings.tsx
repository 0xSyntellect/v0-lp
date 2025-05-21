"use client";

import { format } from "date-fns";

interface Location {
  address: string;
}

interface Booking {
  id: string;
  service_type: string;
  date_time: string; // ISO string
  from_location: Location;
  to_location?: Location | null;
  status: string;
}

interface MyBookingsProps {
  bookings: Booking[];
}

export default function MyBookings({ bookings }: MyBookingsProps) {
  if (!bookings?.length) {
    return (
      <p className="py-12 text-center">
        You haven’t created any bookings yet.
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      {bookings.map((b) => (
        <div
          key={b.id}
          className="border border-[#BFA15B]/40 rounded-xl p-6"
        >
          <div className="flex justify-between items-center">
            <span className="font-medium">
              {b.service_type.toUpperCase()}
            </span>
            <span>
              {format(new Date(b.date_time), "dd MMM yyyy HH:mm")}
            </span>
          </div>
          <p className="text-sm opacity-80">
            {b.from_location.address}
            {b.to_location ? ` ➜ ${b.to_location.address}` : ""}
          </p>
          <p className="mt-1 text-sm">Status: {b.status}</p>
        </div>
      ))}
    </div>
  );
}
