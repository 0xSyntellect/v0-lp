// app/bookings/components/BookingWizard.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { FEATURE_GUEST_FLOW } from "@/lib/flags";

import useBookingQuery from "@/lib/hooks/useBookingQuery";
import useVehiclePricing from "@/lib/hooks/useVehiclePricing";
import usePassengerState from "@/lib/hooks/usePassengerState";
import useBookingStepper from "@/lib/hooks/useBookingStepper";

import StepProgress from "./StepProgress";
import BookingDetailsCard from "./BookingDetailsCard";
import VehiclePicker from "./VehiclePicker";
import PassengerForm from "./PassengerForm";
import PaymentSelect from "./PaymentSelect";
import ReviewSummary from "./ReviewSummary";
import AuthPromptModal from "@/components/ui/AuthPromptModal";

export default function BookingWizard() {
  const router = useRouter();
  const { session } = useAuth();

  // 1. Query params
  const { from, to, dateTime, passengersCount, serviceType } = useBookingQuery();

  // 2. Pricing hook
  const {
    minivan,
    sprinter,
    loading: pricingLoading,
    error: pricingError,
  } = useVehiclePricing(from, to, serviceType === "transfer");

  // 3. Passenger & contact state
  const {
    passengerDetails,
    isAccordionOpen,
    contactInfo,
    updatePassengerField,
    toggleAccordion,
    updateContactInfo,
  } = usePassengerState(passengersCount);

  // 4. Stepper state
  const { current, steps, next, jump } = useBookingStepper();

  // 5. Local UI state
  const [selectedVehicle, setSelectedVehicle] = useState<{
    name: string;
    price: number;
  } | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Final booking API call
  const confirmBooking = async () => {
    const bookingData = {
      from,
      to,
      dateTime,
      passengers: passengersCount,
      serviceType,
      selectedVehicle,
      passengerDetails,
      contactInfo,
      paymentMethod,
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      if (!res.ok) throw new Error("Booking failed");

      // optional: send confirmation email
      await fetch("/api/booking/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      alert("Booking confirmed!");
      router.push("/bookings");
    } catch (err) {
      console.error(err);
      alert("Error confirming booking. Please try again.");
    }
  };

  // Handler for the final confirm button
  const handleFinalConfirm = () => {
    if (!paymentMethod) {
      alert("Please choose a payment method before continuing.");
      document
        .getElementById("payment-method-select")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    if (FEATURE_GUEST_FLOW && !session) {
      setShowAuthModal(true);
    } else {
      confirmBooking();
    }
  };

  return (
    <main className="min-h-screen py-10 bg-[#1F1F1F] text-[#BFA15B]">
      <div className="max-w-3xl mx-auto px-4">
        {/* Progress bar */}
        <StepProgress current={current} steps={steps} onJump={jump} />

        {/* Booking summary */}
        <BookingDetailsCard
          from={from}
          to={to}
          dateTime={dateTime}
          serviceType={serviceType}
          selectedVehicle={selectedVehicle}
        />

        {/* Step 2: Vehicle selection */}
        {current === 2 && (
          <VehiclePicker
            minivan={minivan}
            sprinter={sprinter}
            loading={pricingLoading}
            error={pricingError as string | Error | null}
            selected={selectedVehicle}
            onSelect={(name: string, price: number) =>
              setSelectedVehicle({ name, price })
            }
            onContinue={next}
          />
        )}

        {/* Step 3: Passenger & contact */}
        {current === 3 && (
          <PassengerForm
            passengerDetails={passengerDetails}
            isAccordionOpen={isAccordionOpen}
            contactInfo={contactInfo}
            onPassengerChange={updatePassengerField}
            onToggleAccordion={toggleAccordion}
            onContactChange={updateContactInfo}
            onConfirm={next}
          />
        )}

        {/* Step 4: Payment & review */}
        {current === 4 && (
          <>
            <PaymentSelect value={paymentMethod} onChange={setPaymentMethod} />
            <ReviewSummary
              contactInfo={contactInfo}
              selectedVehicle={selectedVehicle}
              paymentMethod={paymentMethod}
              onConfirm={handleFinalConfirm}
            />
          </>
        )}

        {/* Guest flow auth modal */}
        {showAuthModal && (
          <AuthPromptModal
            open
            onClose={() => setShowAuthModal(false)}
            onSuccess={() => {
              setShowAuthModal(false);
              confirmBooking();
            }}
          />
        )}
      </div>
    </main>
  );
}
