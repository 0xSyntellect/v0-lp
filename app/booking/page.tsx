"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense, Fragment } from "react";
import { ChevronDown, ChevronUp, Check, Users, Luggage, Tag } from "lucide-react";
import { getMinivanPrice, getSprinterPrice } from "@/lib/pricing";
import { calculateHourlyPrice } from "@/lib/hourlyPricing";
import { motion } from "framer-motion";
import { useCurrency, convert, format } from "@/context/CurrencyContext";
import { Listbox } from "@headlessui/react";
import { useAuth } from "@/context/AuthContext";
import AuthPromptModal from "@/components/ui/AuthPromptModal";
import { FEATURE_GUEST_FLOW } from "@/lib/flags";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation"; 



type VehicleInfo = {
  name: string;
  price: number;
};

function BookingContent() {
  
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null)
  const { rates, selectedCurrency, setSelectedCurrency, loading: ratesLoading } = useCurrency();
  const { session } = useAuth()
  const router = useRouter();
  const [showAuthModal, setShowAuthModal] = useState(false)
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
    flightNumber: "",
    notes:"",
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
    field: "firstName" | "lastName" | "passportNumber" | "origin",
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
        !p.origin.trim()
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
      const insertRes = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });
      if (!insertRes.ok) {
        throw new Error("Failed to confirm booking");
      }
           // 2) Send notification email (optional)
      await fetch("/api/booking/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      window.alert("Booking confirmed!");

      // 3) Redirect to the My Bookings page
      router.push("/bookings");
    } catch (error) {
      console.error("Error confirming booking:", error);
      window.alert(
        "There was an error confirming your booking. Please try again."
      );
    }
  };
  const handleConfirmBooking = () => {
    if (!paymentMethod) {
      window.alert("Please choose a payment method before confirming your booking.");
      const el = document.getElementById("payment-method-select");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    confirmBooking();
  };
  {/* Currency selector */}
<div className="flex justify-end mb-4">
  <select
    value={selectedCurrency}
    onChange={e => setSelectedCurrency(e.target.value)}
    disabled={ratesLoading}
    className="bg-[#262626] border border-[#BFA15B] text-[#BFA15B] px-3 py-1 rounded-md"
  >
    {['USD','EUR','GBP','TRY'].map(c => (
      <option key={c} value={c}>{c}</option>
    ))}
  </select>
</div>


  // Steps for progress bar
  const steps = [
    { step: 1, title: "Location & Date" },
    { step: 2, title: "Vehicle" },
    { step: 3, title: "Passenger Information" },
    { step: 4, title: "Payment" },
  ];

  return (
    <main className="min-h-screen py-10 bg-[#1F1F1F] text-[#BFA15B]">
      <div className="max-w-3xl mx-auto px-4">
      {FEATURE_GUEST_FLOW && !session && (
  <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
    <p className="text-yellow-700">
      Save your booking for later —{" "}
      <Link href="/login" className="underline">Log In</Link>{" "}
      or{" "}
      <Link href="/signup" className="underline">Sign Up</Link>
    </p>
  </div>
)}

        {/* Logo at the top */}
        <div className="flex justify-center mb-6">
          <Image src="/pickupist logo.png" alt="Brand Logo" width={150} height={50} />
        </div>

        {/* Progress Bar */}
<div className="flex items-center w-full px-4 mb-8">
  {steps.map(({ step, title }, index) => {
    const circleClass = `rounded-full w-10 h-10 flex items-center justify-center font-bold ${
      currentStep >= step
        ? "bg-[#BFA15B] text-black"
        : "bg-[#333333] text-[#BFA15B]"
    }`;

    let circleContent;
    if (step === 1) {
      circleContent = (
        <Link href="/" className="cursor-pointer">
          <div className={circleClass}>{step}</div>
        </Link>
      );
    } else if (step < currentStep) {
      circleContent = (
        <div className="cursor-pointer" onClick={() => setCurrentStep(step)}>
          <div className={circleClass}>{step}</div>
        </div>
      );
    } else {
      circleContent = <div className={circleClass}>{step}</div>;
    }

    return (
      <Fragment key={step}>
        <div className="flex-1 flex flex-col items-center">
          {circleContent}
          <span className="text-sm leading-tight mt-1 text-[#BFA15B] h-12 text-center">
            {title}
          </span>
        </div>
        {index < steps.length - 1 && (
          <div
            className={`h-1 flex-1 mx-2 ${
              currentStep >= step + 1 ? "bg-[#BFA15B]" : "bg-[#333333]"
            }`}
          />
        )}
       </Fragment>
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
      <Check className="shrink-0 w-5 h-5 text-green-500" />
    </div>
    {serviceType === 'transfer' ? (
      <div className="flex justify-between items-center">
        <span><strong>To:</strong> {toLocation}</span>
        <Check className="shrink-0 w-5 h-5 text-green-500" />
      </div>
    ) : (
      <div className="flex justify-between items-center">
        <span><strong>Hours:</strong> {passengersCount}</span>
        <Check className="shrink-0 w-5 h-5 text-green-500" />
      </div>
    )}
    <div className="flex justify-between items-center">
      <span><strong>Date/Time:</strong> {dateTime}</span>
      <Check className="shrink-0 w-5 h-5 text-green-500" />
    </div>
    <div className="flex justify-between items-center">
      <span>
        <strong>Service:</strong>{' '}
        {serviceType === 'transfer' ? 'Istanbul Transfer' : 'Hourly Rental'}
      </span>
      <Check className="shrink-0 w-5 h-5 text-green-500" />
    </div>
    {selectedVehicle && (
  <div className="flex justify-between items-center">
    <span>
      <strong>Vehicle:</strong> {selectedVehicle.name} —{' '}
      {format(
        convert(selectedVehicle.price, rates, selectedCurrency),
        selectedCurrency
      )}
    </span>
    <Check className="shrink-0 w-5 h-5 text-green-500" />
  </div>
)}

  </div>
</motion.div>

{currentStep === 2 && (
  <div className="bg-[#1F1F1F] p-4 rounded-xl border border-[#BFA15B] mb-8">
    {/* Header + Currency selector */}
    <div className="flex items-center justify-between px-5 mb-4">
      <h3 className="text-lg font-semibold text-[#BFA15B]">
        Choose Your Vehicle
      </h3>
      <div className="relative inline-block">
        <Listbox value={selectedCurrency} onChange={setSelectedCurrency}>
          <Listbox.Button className="flex items-center gap-2 bg-[#262626] border border-[#BFA15B] text-[#BFA15B] px-3 py-1 rounded-md">
            {selectedCurrency}
            <ChevronDown className="w-4 h-4" />
          </Listbox.Button>
          <Listbox.Options className="absolute right-0 mt-1 w-full bg-[#262626] border border-[#BFA15B] rounded-md z-20 overflow-auto max-h-40">
            {["USD","EUR","GBP","TRY"].map((c) => (
              <Listbox.Option
                key={c}
                value={c}
                className={({ active, selected }) =>
                  `cursor-pointer px-3 py-1 ${
                    active ? "bg-[#BFA15B]/30" : ""
                  } ${selected ? "font-semibold" : ""}`
                }
              >
                {c}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>
    </div>

    {/* Vehicle cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Minivan */}
      <Card
        key="minivan"
        className={
          `rounded-2xl border border-[#BFA15B]/60 bg-[#262626] p-6 flex flex-col gap-4 items-center ` +
          (selectedOfferId === "minivan" ? "ring-2 ring-indigo-500" : "")
        }
      >
        <div className="relative w-[300px] h-[160px]">
          <Image
            src="/minivan.png"
            alt="Minivan"
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-2 text-sm w-full">
          <h4 className="text-lg font-semibold text-[#BFA15B]">Minivan</h4>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#BFA15B]" />
            <span className="text-[#BFA15B]/90">Up to 6 passengers</span>
          </div>
          <div className="flex items-center gap-2">
            <Luggage className="w-4 h-4 text-[#BFA15B]" />
            <span className="text-[#BFA15B]/90">
              Fits 6 medium-sized suitcases
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-[#BFA15B]" />
            {serviceType === "transfer" ? (
              <>
                <span className="line-through text-[#BFA15B]/60">
                  {format(
                    convert((minivanPrice ?? 0) * 1.1, rates, selectedCurrency),
                    selectedCurrency
                  )}
                </span>
                <span className="text-[#BFA15B] font-semibold">
                  {minivanPrice != null
                    ? format(
                        convert(minivanPrice, rates, selectedCurrency),
                        selectedCurrency
                      )
                    : "–"}
                </span>
              </>
            ) : (
              <>
                <span className="line-through text-[#BFA15B]/60">
                  {format(
                    convert(hourlyPriceMinivan * 1.1, rates, selectedCurrency),
                    selectedCurrency
                  )}
                </span>
                <span className="text-[#BFA15B] font-semibold">
                  {format(
                    convert(hourlyPriceMinivan, rates, selectedCurrency),
                    selectedCurrency
                  )}
                </span>
                <span className="text-xs text-[#BFA15B]/80 ml-1">/hour</span>
              </>
            )}
          </div>
        </div>
        <Button
          variant={selectedOfferId === "minivan" ? "default" : "outline"}
          className="px-6 py-2 rounded-full w-full"
          onClick={() => setSelectedOfferId("minivan")}
        >
          Select
        </Button>
      </Card>

      {/* Sprinter */}
      <Card
        key="sprinter"
        className={
          `rounded-2xl border border-[#BFA15B]/60 bg-[#262626] p-6 flex flex-col gap-4 items-center ` +
          (selectedOfferId === "sprinter" ? "ring-2 ring-indigo-500" : "")
        }
      >
        <div className="relative w-[300px] h-[160px]">
          <Image
            src="/sprinter new.png"
            alt="Sprinter"
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-2 text-sm w-full">
          <h4 className="text-lg font-semibold text-[#BFA15B]">Sprinter</h4>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#BFA15B]" />
            <span className="text-[#BFA15B]/90">
              Up to 12 passengers
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Luggage className="w-4 h-4 text-[#BFA15B]" />
            <span className="text-[#BFA15B]/90">
              Fits 12 medium-sized suitcases
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-[#BFA15B]" />
            {serviceType === "transfer" ? (
              <>
                <span className="line-through text-[#BFA15B]/60">
                  {format(
                    convert((sprinterPrice ?? 0) * 1.1, rates, selectedCurrency),
                    selectedCurrency
                  )}
                </span>
                <span className="text-[#BFA15B] font-semibold">
                  {sprinterPrice != null
                    ? format(
                        convert(sprinterPrice, rates, selectedCurrency),
                        selectedCurrency
                      )
                    : "–"}
                </span>
              </>
            ) : (
              <>
                <span className="line-through text-[#BFA15B]/60">
                  {format(
                    convert(hourlyPriceSprinter * 1.1, rates, selectedCurrency),
                    selectedCurrency
                  )}
                </span>
                <span className="text-[#BFA15B] font-semibold">
                  {format(
                    convert(hourlyPriceSprinter, rates, selectedCurrency),
                    selectedCurrency
                  )}
                </span>
                <span className="text-xs text-[#BFA15B]/80 ml-1">/hour</span>
              </>
            )}
          </div>
        </div>
        <Button
          variant={selectedOfferId === "sprinter" ? "default" : "outline"}
          className="px-6 py-2 rounded-full w-full"
          onClick={() => setSelectedOfferId("sprinter")}
        >
          Select
        </Button>
      </Card>
    </div>

    {/* Continue / Login buttons */}
{/* Continue / Login buttons */}
<div className="mt-6 flex flex-col items-center space-y-3">
  {session ? (
    <Button
      size="lg"
      className="w-full max-w-sm"
      disabled={!selectedOfferId}
      onClick={() => {
        if (selectedOfferId === "minivan") {
          handleSelectClick(
            "Minivan",
            serviceType === "transfer" ? (minivanPrice ?? 0) : hourlyPriceMinivan
          );
        } else if (selectedOfferId === "sprinter") {
          handleSelectClick(
            "Sprinter",
            serviceType === "transfer" ? (sprinterPrice ?? 0) : hourlyPriceSprinter
          );
        }
      }}
    >
      Continue
    </Button>
  ) : (
    <>
      <Button
        size="lg"
        className="w-full max-w-sm"
        disabled={!selectedOfferId}
        onClick={() => {
          if (selectedOfferId === "minivan") {
            handleSelectClick(
              "Minivan",
              serviceType === "transfer" ? (minivanPrice ?? 0) : hourlyPriceMinivan
            );
          } else if (selectedOfferId === "sprinter") {
            handleSelectClick(
              "Sprinter",
              serviceType === "transfer" ? (sprinterPrice ?? 0) : hourlyPriceSprinter
            );
          }
        }}
      >
        Continue as guest
      </Button>

      <Link href="/login" className="w-full max-w-sm">
        <Button variant="link" size="sm" className="w-full">
          Login / Sign up
        </Button>
      </Link>
    </>
  )}
    </div>
  </div>
)}




        {/* STEP 3 => Passenger & Contact Information */}
        {currentStep === 3 && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-[#1F1F1F] p-8 rounded-2xl border border-[#BFA15B]/60 shadow-lg backdrop-blur-sm mb-12"
  >
    <h3 className="text-2xl font-semibold text-center mb-6 tracking-wide text-[#BFA15B]">
      Passenger & Contact Details
    </h3>

    <div className="grid gap-6 md:grid-cols-2">
      {/* CONTACT COLUMN */}
      <div className="space-y-4">
        <h4 className="font-medium text-[#BFA15B] mb-4">Contact Information</h4>
        <input
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 border rounded-md bg-transparent"
          value={contactInfo.email}
          onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full px-3 py-2 border rounded-md bg-transparent"
          value={contactInfo.phone}
          onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="WhatsApp"
          className="w-full px-3 py-2 border rounded-md bg-transparent"
          value={contactInfo.whatsapp}
          onChange={(e) => setContactInfo({ ...contactInfo, whatsapp: e.target.value })}
        />
        <input
          type="text"
          placeholder="Flight Number"
          className="w-full px-3 py-2 border rounded-md bg-transparent"
          value={contactInfo.flightNumber}
          onChange={(e) => setContactInfo({ ...contactInfo, flightNumber: e.target.value })}
        />
        <textarea
          rows={3}
          placeholder="Notes"
          className="w-full px-3 py-2 border rounded-md bg-transparent resize-none"
          value={contactInfo.notes}
          onChange={(e) => setContactInfo({ ...contactInfo, notes: e.target.value })}
        />
      </div>

      {/* PASSENGER COLUMN */}
      <div className="space-y-6">
        <h4 className="font-medium text-[#BFA15B] mb-4">Passenger Details</h4>
        {passengerDetails.map((p, i) => (
          <div
            key={i}
            className="rounded-xl border border-[#BFA15B]/40 p-4 bg-[#262626]"
          >
            <button
              className="w-full flex justify-between items-center mb-4"
              onClick={() => toggleAccordion(i)}
            >
              <span className="font-medium text-[#BFA15B]">Passenger {i + 1}</span>
              {isAccordionOpen[i] ? <ChevronUp /> : <ChevronDown />}
            </button>
            {isAccordionOpen[i] && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="w-full px-3 py-2 border rounded-md bg-transparent text-[#BFA15B]"
                      value={p.firstName}
                      onChange={(e) => handlePassengerChange(i, "firstName", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="w-full px-3 py-2 border rounded-md bg-transparent text-[#BFA15B]"
                      value={p.lastName}
                      onChange={(e) => handlePassengerChange(i, "lastName", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Passport Number"
                      className="w-full px-3 py-2 border rounded-md bg-transparent text-[#BFA15B]"
                      value={p.passportNumber}
                      onChange={(e) => handlePassengerChange(i, "passportNumber", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Origin"
                      className="w-full px-3 py-2 border rounded-md bg-transparent text-[#BFA15B]"
                      value={p.origin}
                      onChange={(e) => handlePassengerChange(i, "origin", e.target.value)}
                    />
                  </div>
                )}
          </div>
        ))}
      </div>
    </div>

    <div className="flex justify-center mt-8">
      <button
        className="w-40 py-3 rounded-lg border border-[#BFA15B] bg-[#BFA15B] text-[#1F1F1F] hover:bg-transparent hover:text-[#BFA15B]"
        onClick={confirmPassengerDetails}
      >
        Confirm
      </button>
    </div>
  </motion.div>
)}


        
        {/* STEP 4 ⇒ Modern Review & Confirm */}
        {currentStep === 4 && (
          
          <motion.div
          
          
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#1F1F1F] p-8 rounded-2xl border border-[#BFA15B]/60 shadow-lg backdrop-blur-sm mb-12"
          >
            <div className="bg-[#262626] p-4 rounded-xl border border-[#BFA15B] mb-6 max-w-3xl mx-auto">
    <h4 className="text-lg font-semibold mb-2 text-[#BFA15B]">
      Payment Method
    </h4>
    <select
  id="payment-method-select"
  className="w-full px-4 py-2 border border-[#BFA15B] rounded-md bg-transparent text-[#BFA15B]"
  value={paymentMethod}
  onChange={(e) => setPaymentMethod(e.target.value)}
>
      <option value="">Choose Payment Method</option>
      <option value="credit-card">Credit Card</option>
      <option value="cash">Cash</option>
    </select>
  </div>
            <h3 className="text-2xl font-semibold text-center mb-6 tracking-wide text-[#BFA15B]">
              Final Review
            </h3>
            <div className="grid gap-6 md:grid-cols-2">


              <div className="space-y-6">
                {passengerDetails.map((p, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-[#BFA15B]/40 p-4 bg-[#262626]"
                  >
                    <p className="font-medium mb-2 text-[#BFA15B]">Passenger {i + 1}</p>
                    <ul className="text-sm space-y-1">
                      <li><span className="font-semibold">First:</span> {p.firstName}</li>
                      <li><span className="font-semibold">Last:</span> {p.lastName}</li>
                      <li><span className="font-semibold">Passport:</span> {p.passportNumber}</li>
                      <li><span className="font-semibold">Origin:</span> {p.origin}</li>
                    </ul>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-[#BFA15B]/40 p-6 bg-[#262626] flex flex-col justify-between">
                <div className="space-y-4 text-sm">
                  <p><span className="font-semibold">Payment:</span> {paymentMethod}</p>
                  {selectedVehicle && (
                    <p>
                    <span className="font-semibold">Vehicle:</span> {selectedVehicle.name} —{' '}
                    {format(
                      convert(selectedVehicle.price, rates, selectedCurrency),
                      selectedCurrency
                    )}
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
                {FEATURE_GUEST_FLOW && !session ? (
  <button
    className="mt-8 w-full py-3 rounded-lg border border-[#BFA15B] bg-[#BFA15B] text-[#1F1F1F] hover:bg-transparent hover:text-[#BFA15B]"
    onClick={() => setShowAuthModal(true)}
  >
    Confirm Booking
  </button>
) : (
  <button
    className="mt-8 w-full py-3 rounded-lg border border-[#BFA15B] bg-[#BFA15B] text-[#1F1F1F] hover:bg-transparent hover:text-[#BFA15B]"
    onClick={handleConfirmBooking}
  >
    Confirm Booking
  </button>
)}


              </div>
            </div>
          </motion.div>
        )}
        
      </div>
      {FEATURE_GUEST_FLOW && (
      <AuthPromptModal
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false)
          handleConfirmBooking()
        }}
      />
    )}
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
