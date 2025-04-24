"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { getMinivanPrice, getSprinterPrice } from "@/lib/pricing";
import { calculateHourlyPrice } from "@/lib/hourlyPricing";
import { Check } from 'lucide-react';
import { motion } from 'framer-motion'


type VehicleInfo = {
  name: string;
  price: number;
};

function BookingContent() {
  const searchParams = useSearchParams();

  const [minivanPrice,  setMinivanPrice]  = useState<number | null>(null);
  const [sprinterPrice, setSprinterPrice] = useState<number | null>(null);

  // Read query parameters including serviceType
  const fromLocation = searchParams.get("from") || "";
  const toLocation = searchParams.get("to") || "";
  const dateTime = searchParams.get("date") || "";
  const passengersParam = searchParams.get("passengers") || "1";
  const passengersCount = parseInt(passengersParam, 10) || 1;
  const serviceType = searchParams.get("serviceType") || "transfer";

  // Steps: 1 = Form, 2 = Vehicle, 3 = Passenger, 4 = Review
  const [currentStep, setCurrentStep] = useState(2);

   // Compute hourly price
     // Hourly prices (separate rates)
  const hourlyPriceMinivan = calculateHourlyPrice("minivan", passengersCount);
  const hourlyPriceSprinter = calculateHourlyPrice("sprinter", passengersCount);

  // Step 2: Vehicle selection
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleInfo | null>(null);

  // Step 3: Passenger details
  const [passengerDetails, setPassengerDetails] = useState(
    Array.from({ length: passengersCount }, () => ({
      firstName: "",
      lastName: "",
      passportNumber: "",
      origin: "",
      flightNumber: "",
    }))
  );

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState("");

  // Each passenger's accordion open state
  const [isAccordionOpen, setIsAccordionOpen] = useState(
    Array.from({ length: passengersCount }, () => false)
  );

  // Contact Info
  const [contactInfo, setContactInfo] = useState({
    email: "",
    phone: "",
    whatsapp: "",
  });

    /* ────────────────────────────────────────────────────────────
     1. CALCULATE DISTANCE  ➜  2. SET PRICE
     (runs whenever locations or serviceType change)
  ───────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (serviceType !== "transfer" || !fromLocation || !toLocation) return;

    (async () => {
      try {
        const [mv, sp] = await Promise.all([
          getMinivanPrice(fromLocation, toLocation),
          getSprinterPrice(fromLocation, toLocation),
        ]);
        console.log(`Prices → minivan: $${mv}, sprinter: $${sp}`);
        setMinivanPrice(mv);
        setSprinterPrice(sp);
      } catch (e) {
        console.error("pricing failed:", e);
      }
    })();
  }, [fromLocation, toLocation, serviceType]);
  

    /* ── helpers ──────────────────────────────────────────────── */

  // Step 2: Vehicle selection handler
  const selectVehicle = (vehicleName: string, vehiclePrice: number) => {
    setSelectedVehicle({ name: vehicleName, price: vehiclePrice });
    setCurrentStep(3);
  };

  // If user tries to select a vehicle but paymentMethod is not chosen
  const handleSelectClick = (vehicleName: string, vehiclePrice: number) => {
    if (!paymentMethod) {
      window.alert("Please choose a payment method first.");
      return;
    }
    selectVehicle(vehicleName, vehiclePrice);
  };

  // Toggle passenger accordion
  const toggleAccordion = (index: number) => {
    setIsAccordionOpen((prev) =>
      prev.map((open, i) => (i === index ? !open : open))
    );
  };

  // Handle typed passenger fields
  const handlePassengerChange = (
    index: number,
    field: "firstName" | "lastName" | "passportNumber" | "origin" | "flightNumber",
    value: string
  ) => {
    setPassengerDetails((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Check all fields in Step 3 are filled
  function allFieldsFilled(): boolean {
    // Contact fields
    if (
      !contactInfo.email.trim() ||
      !contactInfo.phone.trim() ||
      !contactInfo.whatsapp.trim()
    ) {
      return false;
    }
  
    // Passenger fields (including flightNumber)
    for (const p of passengerDetails) {
      if (
        !p.firstName.trim() ||
        !p.lastName.trim() ||
        !p.passportNumber.trim() ||
        !p.origin.trim() ||
        !p.flightNumber.trim()    // <- make sure this matches `p` exactly
      ) {
        return false;
      }
    }
  
    return true;
  }
  

  // Step 3 => Step 4
  const confirmPassengerDetails = () => {
    if (!allFieldsFilled()) {
      window.alert("Please fill in all required fields before continuing.");
      return;
    }
    setCurrentStep(4);
  };

  // Step 4 => Confirm booking
  const confirmBooking = async () => {
    const bookingData = {
      from: fromLocation,
      to: toLocation,
      dateTime,
      passengers: passengersCount,
      selectedVehicle,
      passengerDetails,
      paymentMethod,
      contactInfo,
      serviceType,
    };

    try {
      const response = await fetch("/api/booking/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });
      if (!response.ok) {
        throw new Error("Failed to confirm booking");
      }
      window.alert("Booking confirmed! Confirmation email sent.");
    } catch (error) {
      console.error("Error confirming booking:", error);
      window.alert(
        "There was an error confirming your booking. Please try again."
      );
    }
  };

  // Steps for progress bar
  const steps = [
    { step: 1, title: "Location & Date" },
    { step: 2, title: "Vehicle & Payment" },
    { step: 3, title: "Passenger Information" },
    { step: 4, title: "Review" },
  ];

  return (
    <main className="min-h-screen py-10 bg-[#1F1F1F] text-[#BFA15B]">
      <div className="max-w-3xl mx-auto px-4">
        {/* Logo at the top */}
        <div className="flex justify-center mb-6">
          <Image src="/pickupist logo.png" alt="Brand Logo" width={150} height={50} />
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-center mb-8">
          {steps.map(({ step, title }, index) => {
            const circleClass = `rounded-full w-10 h-10 flex items-center justify-center font-bold ${
              currentStep >= step
                ? "bg-[#BFA15B] text-black"
                : "bg-[#333333] text-[#BFA15B]"
            }`;

            let circleContent;
            if (step === 1) {
              // Link to "/" if they want to go back
              circleContent = (
                <Link href="/" className="cursor-pointer">
                  <div className={circleClass}>{step}</div>
                </Link>
              );
            } else if (step < currentStep) {
              circleContent = (
                <div
                  className="cursor-pointer"
                  onClick={() => setCurrentStep(step)}
                >
                  <div className={circleClass}>{step}</div>
                </div>
              );
            } else {
              circleContent = <div className={circleClass}>{step}</div>;
            }

            return (
              <div key={step} className="flex items-center">
                <div className="flex flex-col items-center">
                  {circleContent}
                  <span className="text-sm mt-1 text-[#BFA15B]">{title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 w-16 mx-2 ${
                      currentStep >= step + 1
                        ? "bg-[#BFA15B]"
                        : "bg-[#333333]"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Booking Details Card */}
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
  className="bg-[#1F1F1F] p-6 rounded-xl border border-[#BFA15B] mb-8"
>
  <h2 className="text-xl font-semibold mb-4 text-center text-[#BFA15B]">
    Your Booking Details
  </h2>
  <div className="mb-2 text-[#BFA15B] space-y-2">
    <div className="flex justify-between items-center">
      <span><strong>From:</strong> {fromLocation}</span>
      <Check className="w-5 h-5 text-green-500" />
    </div>
    {serviceType === 'transfer' ? (
      <div className="flex justify-between items-center">
        <span><strong>To:</strong> {toLocation}</span>
        <Check className="w-5 h-5 text-green-500" />
      </div>
    ) : (
      <div className="flex justify-between items-center">
        <span><strong>Hours:</strong> {passengersCount}</span>
        <Check className="w-5 h-5 text-green-500" />
      </div>
    )}
    <div className="flex justify-between items-center">
      <span><strong>Date/Time:</strong> {dateTime}</span>
      <Check className="w-5 h-5 text-green-500" />
    </div>
    <div className="flex justify-between items-center">
      <span>
        <strong>Service:</strong>{' '}
        {serviceType === 'transfer' ? 'Istanbul Transfer' : 'Hourly Rental'}
      </span>
      <Check className="w-5 h-5 text-green-500" />
    </div>
    {selectedVehicle && (
      <div className="flex justify-between items-center">
        <span>
          <strong>Vehicle:</strong> {selectedVehicle.name} — $
          {selectedVehicle.price}
        </span>
        <Check className="w-5 h-5 text-green-500" />
      </div>
    )}
  </div>
</motion.div>

        {/* STEP 2 => Vehicle Selection */}
        {currentStep === 2 && (
          <div className="bg-[#1F1F1F] p-6 rounded-xl border border-[#BFA15B] mb-8">
            <h3 className="text-lg font-semibold mb-4 text-center text-[#BFA15B]">
              Choose Your Vehicle
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Minivan */}
              <div className="p-4 border border-[#BFA15B] rounded-md text-center bg-transparent">
                <div className="relative w-[300px] h-[160px] mx-auto">
                  <Image
                    src="/minivan.png"
                    alt="Minivan"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <h4 className="text-base font-medium mb-1 mt-2">Minivan</h4>
                <p className="text-sm mb-1">Up to 6 passengers</p>
                <p className="text-sm font-semibold mb-4">{serviceType === "transfer"
                  ? (minivanPrice != null ? `$${minivanPrice}` : "Calculating…")
                  : `$${hourlyPriceMinivan}`}</p>
                <button
                  onClick={() => handleSelectClick("Minivan", serviceType === "transfer" ? (minivanPrice ?? 0) : hourlyPriceMinivan)}
                  className={
                    paymentMethod
                      ? "px-4 py-2 rounded-md border border-[#BFA15B] text-[#BFA15B] bg-transparent hover:bg-[#BFA15B] hover:text-black transition-colors duration-300"
                      : "px-4 py-2 rounded-md bg-[#333333] text-[#BFA15B] cursor-not-allowed"
                  }
                >
                  Select
                </button>
              </div>

              {/* Sprinter */}
              <div className="p-4 border border-[#BFA15B] rounded-md text-center bg-transparent">
                <div className="relative w-[300px] h-[160px] mx-auto">
                  <Image
                    src="/sprinter new.png"
                    alt="Sprinter"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <h4 className="text-base font-medium mb-1 mt-2">Sprinter</h4>
                <p className="text-sm mb-1">Up to 12 passengers</p>
                <p className="text-sm font-semibold mb-4">{serviceType === "transfer"
                  ? (sprinterPrice != null ? `$${sprinterPrice}` : "Calculating…")
                  : `$${hourlyPriceSprinter}`}</p>
                <button
                  onClick={() => handleSelectClick("Sprinter", serviceType === "transfer" ? (sprinterPrice ?? 0) : hourlyPriceSprinter)}
                  className={
                    paymentMethod
                      ? "px-4 py-2 rounded-md border border-[#BFA15B] text-[#BFA15B] bg-transparent hover:bg-[#BFA15B] hover:text-black transition-colors duration-300"
                      : "px-4 py-2 rounded-md bg-[#333333] text-[#BFA15B] cursor-not-allowed"
                  }
                >
                  Select
                </button>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium mb-2 text-center">
                Payment Method
              </label>
              <select
                className="w-full px-4 py-3 border border-[#BFA15B] rounded-md bg-transparent text-[#BFA15B] text-center"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="">Choose Payment Method</option>
                <option value="credit-card">Credit Card</option>
                <option value="cash">Cash</option>
              </select>
            </div>
          </div>
        )}

        {/* STEP 3 => Passenger & Contact Information */}
        {currentStep === 3 && (
          <div className="bg-[#1F1F1F] p-6 rounded-xl border border-[#BFA15B] mb-8 text-center">
            <h3 className="text-lg font-semibold mb-8 text-[#BFA15B]">
              Passenger & Contact Details
            </h3>

            {/* Contact Information Form */}
            <div className="mb-6 p-4 border border-[#BFA15B] rounded-md inline-block text-left">
              <h4 className="font-medium mb-4 text-center text-[#BFA15B]">
                Contact Information
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-64 px-3 py-2 border border-[#BFA15B] rounded-md bg-transparent text-[#BFA15B] placeholder-[#666666]"
                    placeholder="Enter your email"
                    value={contactInfo.email}
                    onChange={(e) =>
                      setContactInfo({ ...contactInfo, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-64 px-3 py-2 border border-[#BFA15B] rounded-md bg-transparent text-[#BFA15B] placeholder-[#666666]"
                    placeholder="Enter your phone number"
                    value={contactInfo.phone}
                    onChange={(e) =>
                      setContactInfo({ ...contactInfo, phone: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    WhatsApp
                  </label>
                  <input
                    type="text"
                    className="w-64 px-3 py-2 border border-[#BFA15B] rounded-md bg-transparent text-[#BFA15B] placeholder-[#666666]"
                    placeholder="Enter your WhatsApp number"
                    value={contactInfo.whatsapp}
                    onChange={(e) =>
                      setContactInfo({
                        ...contactInfo,
                        whatsapp: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Passenger Details */}
            <h4 className="font-medium mb-4 text-[#BFA15B]">Passenger Details</h4>
            {passengerDetails.map((passenger, i) => {
              const open = isAccordionOpen[i];
              return (
                <div
                  key={i}
                  className="border border-[#BFA15B] rounded-md mb-4 inline-block text-left w-full max-w-md"
                >
                  <button
                    type="button"
                    className="w-full flex justify-between items-center px-4 py-3 bg-[#333333] hover:bg-[#444444] text-[#BFA15B]"
                    onClick={() => toggleAccordion(i)}
                  >
                    <span className="font-medium">Passenger #{i + 1}</span>
                    {open ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                  {open && (
                    <div className="px-4 py-4 space-y-4 bg-[#1F1F1F]">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            First Name
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-[#BFA15B] rounded-md bg-transparent text-[#BFA15B] placeholder-[#666666]"
                            placeholder="First name"
                            value={passenger.firstName}
                            onChange={(e) =>
                              handlePassengerChange(i, "firstName", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Last Name
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-[#BFA15B] rounded-md bg-transparent text-[#BFA15B] placeholder-[#666666]"
                            placeholder="Last name"
                            value={passenger.lastName}
                            onChange={(e) =>
                              handlePassengerChange(i, "lastName", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Passport Number
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-[#BFA15B] rounded-md bg-transparent text-[#BFA15B] placeholder-[#666666]"
                            placeholder="Passport number"
                            value={passenger.passportNumber}
                            onChange={(e) =>
                              handlePassengerChange(
                                i,
                                "passportNumber",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Where are you from?
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-[#BFA15B] rounded-md bg-transparent text-[#BFA15B] placeholder-[#666666]"
                            placeholder="Your country/origin"
                            value={passenger.origin}
                            onChange={(e) =>
                              handlePassengerChange(i, "origin", e.target.value)
                            }
                          />
                        </div>
                        + <div>
                            <label className="block text-sm font-medium mb-1">
                              Flight Number
                            </label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-[#BFA15B] rounded-md bg-transparent text-[#BFA15B] placeholder-[#666666]"
                              placeholder="e.g. TK2021"
                              value={passenger.flightNumber}
                              onChange={(e) =>
                                handlePassengerChange(i, "flightNumber", e.target.value)
                              }
                            />
                          + </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Single Confirm button for Step 3 */}
            <div className="flex justify-center mt-6">
              <button
                className="px-40 py-2 rounded-md border border-[#BFA15B] text-[#BFA15B] bg-transparent hover:bg-[#BFA15B] hover:text-black transition-colors duration-300"
                onClick={confirmPassengerDetails}
              >
                Confirm
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 => Final Review & Confirmation */}
        {currentStep === 4 && (
          <div className="bg-[#1F1F1F] p-6 rounded-xl border border-[#BFA15B] mb-8">
            <h3 className="text-lg font-semibold mb-4 text-center text-[#BFA15B]">
              Review & Confirmation
            </h3>
            <p className="mb-4 text-center text-[#BFA15B]">
              Please review your booking details.
            </p>

            {passengerDetails.map((p, i) => (
              <div
                key={i}
                className="mb-4 p-4 border border-[#BFA15B] rounded-md text-center"
              >
                <p className="font-medium mb-2 text-center text-[#BFA15B]">
                  Passenger #{i + 1}
                </p>
                <p>
                  <strong>First Name:</strong> {p.firstName}
                </p>
                <p>
                  <strong>Last Name:</strong> {p.lastName}
                </p>
                <p>
                  <strong>Passport Number:</strong> {p.passportNumber}
                </p>
                <p>
                  <strong>Origin:</strong> {p.origin}
                </p>
                <p>
                <strong>Flight Number:</strong> {p.flightNumber}
                </p>
              </div>
            ))}

            <p className="mb-2 text-center text-[#BFA15B]">
              <strong>Payment Method:</strong> {paymentMethod}
            </p>
            {selectedVehicle && (
              <p className="mb-6 text-center text-[#BFA15B]">
                <strong>Vehicle:</strong> {selectedVehicle.name} — $
                {selectedVehicle.price}
              </p>
            )}

            {/* Contact Summary */}
            <div className="mb-4 p-4 border border-[#BFA15B] rounded-md text-center">
              <p className="font-medium mb-2 text-center text-[#BFA15B]">
                Summary of Contact Info
              </p>
              <p>
                <strong>Email:</strong> {contactInfo.email || "N/A"}
              </p>
              <p>
                <strong>Phone:</strong> {contactInfo.phone || "N/A"}
              </p>
              <p>
                <strong>WhatsApp:</strong> {contactInfo.whatsapp || "N/A"}
              </p>
            </div>

            <div className="flex justify-center mt-6">
              <button
                className="px-40 py-2 rounded-md border border-[#BFA15B] text-[#BFA15B] bg-transparent hover:bg-[#BFA15B] hover:text-black transition-colors duration-300"
                onClick={confirmBooking}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#1F1F1F] text-[#BFA15B]">
          Loading booking information...
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
