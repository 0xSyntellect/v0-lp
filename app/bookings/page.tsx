// app/bookings/page.tsx
"use client";
import { Suspense } from "react";
import BookingWizard from "./components/BookingWizard";

export default function BookingPage() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <BookingWizard />
    </Suspense>
  );
}
