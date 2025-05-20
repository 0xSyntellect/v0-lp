// app/bookings/page.tsx
"use client";

import { Suspense } from "react";
import Navbar from "@/components/navbar";          // ← ❶ NEW
import BookingWizard from "./components/BookingWizard";

export default function BookingPage() {
  return (
    <>
      {/* fixed site-wide navbar */}
      <Navbar />

      {/* push wizard content below the 80 px high nav */}
      <div className="pt-24">
        <Suspense fallback={<div>Loading…</div>}>
          <BookingWizard />
        </Suspense>
      </div>
    </>
  );
}
