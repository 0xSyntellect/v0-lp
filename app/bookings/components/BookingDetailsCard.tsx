  // app/bookings/components/BookingDetailsCard.tsx
  "use client";

  import { Check } from "lucide-react";
  import { motion } from "framer-motion";
  import { useCurrency, convert, format } from "@/context/CurrencyContext";

  type BookingDetailsCardProps = {
    from: string;
    to: string;
    dateTime: string;
    serviceType: string;
    selectedVehicle: { name: string; price: number } | null;
  };

  export default function BookingDetailsCard({
    from,
    to,
    dateTime,
    serviceType,
    selectedVehicle,
  }: BookingDetailsCardProps) {
    const { rates, selectedCurrency } = useCurrency();

    const formattedPrice = selectedVehicle
      ? format(
          convert(selectedVehicle.price, rates, selectedCurrency),
          selectedCurrency
        )
      : "–";

    console.log("🔍 formattedPrice:", formattedPrice);
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-[#1F1F1F] p-6 rounded-xl border border-[#BFA15B] mb-8"
      >
        <h2 className="text-xl font-semibold mb-4 text-center text-[#BFA15B]">
          Your Booking Details
        </h2>

        <div className="mb-2 text-[#BFA15B] space-y-2">
          <div className="flex justify-between items-center">
            <span><strong>From:</strong> {from}</span>
            <Check className="w-5 h-5 text-green-500" />
          </div>
          {serviceType === "transfer" ? (
            <div className="flex justify-between items-center">
              <span><strong>To:</strong> {to}</span>
              <Check className="w-5 h-5 text-green-500" />
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <span><strong>Hours:</strong> {dateTime}</span>
              <Check className="w-5 h-5 text-green-500" />
            </div>
          )}
          <div className="flex justify-between items-center">
            <span><strong>Date/Time:</strong> {dateTime}</span>
            <Check className="w-5 h-5 text-green-500" />
          </div>
          <div className="flex justify-between items-center">
            <span>
              <strong>Service:</strong>{" "}
              {serviceType === "transfer"
                ? "Istanbul Transfer"
                : "Hourly Rental"}
            </span>
            <Check className="w-5 h-5 text-green-500" />
          </div>
          {selectedVehicle && (
              <div className="flex justify-between items-center">
                <span
                  className="text-[#BFA15B] font-semibold"
                  data-testid="booking-price"
                >
                  <strong>Vehicle:</strong> {selectedVehicle.name} — {formattedPrice}
                </span>
                <Check className="w-5 h-5 text-green-500" />
              </div>
            )}
        </div>
      </motion.div>
    );
  }
