"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"

export default function BookingPage() {
  const searchParams = useSearchParams()

  // From the Hero section
  const fromLocation = searchParams.get("from") || ""
  const toLocation = searchParams.get("to") || ""
  const dateTime = searchParams.get("date") || ""
  const passengers = searchParams.get("passengers") || ""

  // Steps
  const [currentStep, setCurrentStep] = useState(1)

  // Step 1
  const [selectedVehicle, setSelectedVehicle] = useState("")

  // Step 2: Passenger details
  const [passengerFirstName, setPassengerFirstName] = useState("")
  const [passengerLastName, setPassengerLastName] = useState("")
  const [passportNumber, setPassportNumber] = useState("")
  const [passengerOrigin, setPassengerOrigin] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("credit-card")

  const goNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }
  const goPrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Vehicle selection => go to step 2
  const selectVehicle = (vehicle: string) => {
    setSelectedVehicle(vehicle)
    setCurrentStep(2)
  }

  // Confirm passenger details => go to step 3
  const confirmPassengerDetails = () => {
    setCurrentStep(3)
  }

  return (
    <main className="min-h-screen py-10 container">
      {/* Progress Bar */}
      <div className="flex items-center gap-4 mb-8">
        {[1, 2, 3].map((step) => {
          const stepCircleClass = `rounded-full w-10 h-10 flex items-center justify-center text-white font-bold ${
            currentStep >= step ? "bg-primary" : "bg-gray-300"
          }`

          return (
            <div key={step} className="flex flex-col items-center">
              {step === 1 ? (
                <a href="/" className="cursor-pointer">
                  <div className={stepCircleClass}>{step}</div>
                </a>
              ) : (
                <div className={stepCircleClass}>{step}</div>
              )}
              {step < 3 && (
                <div
                  className={`w-32 h-1 ${
                    currentStep >= step + 1 ? "bg-primary" : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>
          )
        })}
      </div>

      {/* Booking Details Card */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Booking Details</h2>
        <div className="text-gray-700 mb-2">
          <p><strong>From:</strong> {fromLocation}</p>
          <p><strong>To:</strong> {toLocation}</p>
          <p><strong>Date/Time:</strong> {dateTime}</p>
          <p><strong>Passengers:</strong> {passengers}</p>
          {selectedVehicle && (
            <p><strong>Vehicle:</strong> {selectedVehicle}</p>
          )}
        </div>
      </div>

      {/* Step 1: Vehicle selection */}
      {currentStep === 1 && (
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h3 className="text-lg font-semibold mb-4">Choose Your Vehicle</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-md text-center">
              <h4 className="text-base font-medium mb-2">Sedan</h4>
              <p className="text-sm text-gray-600 mb-4">Up to 3 passengers</p>
              <button
                className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
                onClick={() => selectVehicle("Sedan")}
              >
                Select
              </button>
            </div>
            <div className="p-4 border rounded-md text-center">
              <h4 className="text-base font-medium mb-2">Minivan</h4>
              <p className="text-sm text-gray-600 mb-4">Up to 6 passengers</p>
              <button
                className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
                onClick={() => selectVehicle("Minivan")}
              >
                Select
              </button>
            </div>
            <div className="p-4 border rounded-md text-center">
              <h4 className="text-base font-medium mb-2">Sprinter</h4>
              <p className="text-sm text-gray-600 mb-4">Up to 12 passengers</p>
              <button
                className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
                onClick={() => selectVehicle("Sprinter")}
              >
                Select
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Passenger details & Payment */}
      {currentStep === 2 && (
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h3 className="text-lg font-semibold mb-4">Passenger Details & Payment</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="First name"
                value={passengerFirstName}
                onChange={(e) => setPassengerFirstName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Last name"
                value={passengerLastName}
                onChange={(e) => setPassengerLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Passport Number</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Passport number"
                value={passportNumber}
                onChange={(e) => setPassportNumber(e.target.value)}
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
                value={passengerOrigin}
                onChange={(e) => setPassengerOrigin(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Payment Method</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="credit-card">Credit Card</option>
              <option value="cash">Cash</option>
            </select>
          </div>

          <button
            className="px-4 py-2 rounded-md bg-primary text-white"
            onClick={confirmPassengerDetails}
          >
            Confirm
          </button>
        </div>
      )}

      {/* Step 3: Final review */}
      {currentStep === 3 && (
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h3 className="text-lg font-semibold mb-4">Review & Confirmation</h3>
          <p className="text-gray-700 mb-4">
            This is the final step placeholder. You can add payment processing or any extra steps here.
          </p>
          <p className="text-gray-700">
            <strong>First Name:</strong> {passengerFirstName} <br />
            <strong>Last Name:</strong> {passengerLastName} <br />
            <strong>Passport Number:</strong> {passportNumber} <br />
            <strong>Origin:</strong> {passengerOrigin} <br />
            <strong>Payment:</strong> {paymentMethod}
          </p>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex gap-4">
        <button
          onClick={goPrev}
          className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
          disabled={currentStep === 1}
        >
          Previous
        </button>
        <button
          onClick={goNext}
          className="px-4 py-2 bg-primary text-white rounded-md disabled:opacity-50"
          disabled={currentStep === 3}
        >
          Next
        </button>
      </div>
    </main>
  )
}
