"use client"

import Link from "next/link"
import Image from "next/image" // for images if you prefer next/image
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

/* 
  We now store vehicle info (name, price) in selectedVehicle, 
  and display the chosen vehicle + price in the final review.
*/

type VehicleInfo = {
  name: string
  price: number
}

export default function BookingPage() {
  const searchParams = useSearchParams()

  // Booking data from landing page form (Step 1)
  const fromLocation = searchParams.get("from") || ""
  const toLocation = searchParams.get("to") || ""
  const dateTime = searchParams.get("date") || ""
  const passengersParam = searchParams.get("passengers") || "1"
  const passengersCount = parseInt(passengersParam, 10) || 1

  // 4-step flow: Step 1 = Form, Step 2 = Vehicle, Step 3 = Passenger, Step 4 = Review
  const [currentStep, setCurrentStep] = useState(2) // Start from Step 2

  // selectedVehicle now stores both name & price
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleInfo | null>(null)

  // Step 3: Each passenger has their own data
  const [passengerDetails, setPassengerDetails] = useState(
    Array.from({ length: passengersCount }, () => ({
      firstName: "",
      lastName: "",
      passportNumber: "",
      origin: "",
    }))
  )

  // Payment method for entire booking
  const [paymentMethod, setPaymentMethod] = useState("credit-card")

  // Accordion open states for passenger forms
  const [isAccordionOpen, setIsAccordionOpen] = useState(
    Array.from({ length: passengersCount }, () => false)
  )

  // Navigation between steps
  const goNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }
  const goPrev = () => {
    if (currentStep > 2) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Step 2: select vehicle => store name & price => move to step 3
  const selectVehicle = (vehicleName: string, vehiclePrice: number) => {
    setSelectedVehicle({ name: vehicleName, price: vehiclePrice })
    setCurrentStep(3)
  }

  // Step 3: toggling passenger accordion
  const toggleAccordion = (index: number) => {
    setIsAccordionOpen((prev) =>
      prev.map((open, i) => (i === index ? !open : open))
    )
  }

  // Step 3: handle passenger field changes
  const handlePassengerChange = (
    index: number,
    field: "firstName" | "lastName" | "passportNumber" | "origin",
    value: string
  ) => {
    setPassengerDetails((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  // Step 3 => Step 4
  const confirmPassengerDetails = () => {
    setCurrentStep(4)
  }

  // Steps for progress bar
  const steps = [
    { step: 1, title: "Form" },
    { step: 2, title: "Vehicle" },
    { step: 3, title: "Passenger" },
    { step: 4, title: "Review" },
  ]

  return (
    <main className="min-h-screen py-10 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="flex items-center justify-center mb-8">
          {steps.map(({ step, title }, index) => {
            const circleClass = `rounded-full w-10 h-10 flex items-center justify-center text-white font-bold ${
              currentStep >= step ? "bg-primary" : "bg-gray-300"
            }`

            let circleContent
            if (step === 1) {
              circleContent = (
                <Link href="/" className="cursor-pointer">
                  <div className={circleClass}>{step}</div>
                </Link>
              )
            } else if (step < currentStep) {
              circleContent = (
                <div
                  className="cursor-pointer"
                  onClick={() => setCurrentStep(step)}
                >
                  <div className={circleClass}>{step}</div>
                </div>
              )
            } else {
              circleContent = <div className={circleClass}>{step}</div>
            }

            return (
              <div key={step} className="flex items-center">
                <div className="flex flex-col items-center">
                  {circleContent}
                  <span className="text-sm mt-1 text-gray-600">{title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 w-16 mx-2 ${
                      currentStep >= step + 1 ? "bg-primary" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* Booking Details Card */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Booking Details</h2>
          <div className="text-gray-700 mb-2">
            <p>
              <strong>From:</strong> {fromLocation}
            </p>
            <p>
              <strong>To:</strong> {toLocation}
            </p>
            <p>
              <strong>Date/Time:</strong> {dateTime}
            </p>
            <p>
              <strong>Passengers:</strong> {passengersCount}
            </p>
            {/* Show chosen vehicle + price if selected */}
            {selectedVehicle && (
              <p>
                <strong>Vehicle:</strong> {selectedVehicle.name} — $
                {selectedVehicle.price}
              </p>
            )}
          </div>
        </div>

        {/* STEP 2 => Vehicle Selection */}
        {currentStep === 2 && (
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <h3 className="text-lg font-semibold mb-4">Choose Your Vehicle</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Sedan */}
              <div className="p-4 border rounded-md text-center">
                {/* If you prefer next/image, use <Image src="/sedan.jpeg" ... /> */}
                <Image
                  src="/sedan.jpeg"
                  alt="Sedan"
                  className="object-cover mb-2"
                  width={400} // adjust width as needed
                  height={160} // adjust height as needed
                />
                <h4 className="text-base font-medium mb-1">Sedan</h4>
                <p className="text-sm text-gray-600 mb-1">Up to 3 passengers</p>
                <p className="text-sm text-gray-800 font-semibold mb-4">
                  $25 / ride
                </p>
                <button
                  className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
                  onClick={() => selectVehicle("Sedan", 25)}
                >
                  Select
                </button>
              </div>

              {/* Minivan */}
              <div className="p-4 border rounded-md text-center">
                <Image
                  src="/minivan.jpeg"
                  alt="Minivan"
                  className="object-cover mb-2"
                  width={400} // adjust width as needed
                  height={160} // adjust height as needed

                />
                <h4 className="text-base font-medium mb-1">Minivan</h4>
                <p className="text-sm text-gray-600 mb-1">Up to 6 passengers</p>
                <p className="text-sm text-gray-800 font-semibold mb-4">
                  $40 / ride
                </p>
                <button
                  className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
                  onClick={() => selectVehicle("Minivan", 40)}
                >
                  Select
                </button>
              </div>

              {/* Sprinter */}
              <div className="p-4 border rounded-md text-center">
                <Image
                  src="/sprinter.jpeg"
                  alt="Sprinter"
                  className="object-cover mb-2"
                  width={400} // adjust width as needed
                  height={160} // adjust height as needed

                />
                <h4 className="text-base font-medium mb-1">Sprinter</h4>
                <p className="text-sm text-gray-600 mb-1">Up to 12 passengers</p>
                <p className="text-sm text-gray-800 font-semibold mb-4">
                  $60 / ride
                </p>
                <button
                  className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
                  onClick={() => selectVehicle("Sprinter", 60)}
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3 => Passenger details in Accordion */}
        {currentStep === 3 && (
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <h3 className="text-lg font-semibold mb-4">
              Passenger Details & Payment
            </h3>

            {/* Accordion for each passenger */}
            {passengerDetails.map((passenger, i) => {
              const open = isAccordionOpen[i]
              return (
                <div key={i} className="border rounded-md mb-4">
                  {/* Accordion Header */}
                  <button
                    type="button"
                    className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 hover:bg-gray-200"
                    onClick={() => toggleAccordion(i)}
                  >
                    <span className="font-medium">Passenger #{i + 1}</span>
                    {open ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>

                  {/* Accordion Content */}
                  {open && (
                    <div className="px-4 py-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            First Name
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="Passport number"
                            value={passenger.passportNumber}
                            onChange={(e) =>
                              handlePassengerChange(i, "passportNumber", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Where are you from?
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="Your country/origin"
                            value={passenger.origin}
                            onChange={(e) =>
                              handlePassengerChange(i, "origin", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}

            {/* Payment method (one per entire booking, not per passenger) */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Payment Method
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="credit-card">Credit Card</option>
                <option value="cash">Cash</option>
              </select>
            </div>

            {/* Confirm => Step 4 */}
            <button
              className="px-4 py-2 rounded-md bg-primary text-white"
              onClick={confirmPassengerDetails}
            >
              Confirm
            </button>
          </div>
        )}

        {/* STEP 4 => Final Review */}
        {currentStep === 4 && (
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <h3 className="text-lg font-semibold mb-4">Review & Confirmation</h3>
            <p className="text-gray-700 mb-4">
              This is the final step placeholder. You can add payment processing
              or any extra steps here.
            </p>

            {/* Show all passenger details */}
            {passengerDetails.map((p, i) => (
              <div key={i} className="mb-4 p-4 border rounded-md">
                <p className="font-medium mb-2">Passenger #{i + 1}</p>
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
              </div>
            ))}
            <p className="text-gray-700 mb-2">
              <strong>Payment Method:</strong> {paymentMethod}
            </p>
            {/* Show chosen vehicle + price */}
            {selectedVehicle && (
              <p className="text-gray-700">
                <strong>Vehicle:</strong> {selectedVehicle.name} — $
                {selectedVehicle.price}
              </p>
            )}
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex gap-4">
          <button
            onClick={goPrev}
            className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
            disabled={currentStep <= 2}
          >
            Previous
          </button>
          <button
            onClick={goNext}
            className="px-4 py-2 bg-primary text-white rounded-md disabled:opacity-50"
            disabled={currentStep === 4}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  )
}
