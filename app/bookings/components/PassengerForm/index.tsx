// app/bookings/components/PassengerForm/index.tsx
"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ContactForm from "./ContactForm";
import PassengerAccordion from "./PassengerAccordion";

type Passenger = {
  firstName: string;
  lastName: string;
  passportNumber: string;
  origin: string;
};

type Contact = {
  email: string;
  phone: string;
  whatsapp: string;
  flightNumber: string;
  notes: string;
};

export default function PassengerForm({
  passengerDetails,
  isAccordionOpen,
  contactInfo,
  onPassengerChange,
  onToggleAccordion,
  onContactChange,
  onConfirm,
}: {
  passengerDetails: Passenger[];
  isAccordionOpen: boolean[];
  contactInfo: Contact;
  onPassengerChange: (idx: number, field: keyof Passenger, value: string) => void;
  onToggleAccordion: (idx: number) => void;
  onContactChange: (field: keyof Contact, value: string) => void;
  onConfirm: () => void;
}) {
  return (
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
        <ContactForm contactInfo={contactInfo} onChange={(field, value) => onContactChange(field as keyof Contact, value)} />
        <PassengerAccordion
          passengerDetails={passengerDetails}
          isAccordionOpen={isAccordionOpen}
          onChange={(idx, field, value) =>onPassengerChange(idx, field as keyof Passenger, value)}
          onToggle={onToggleAccordion}
        />
      </div>
      <div className="flex justify-center mt-8">
        <Button
          className="w-full max-w-sm bg-[#C2A36C] hover:bg-[#b1945e] text-black h-12 text-base font-medium transition-all duration-300"
          onClick={onConfirm}
        >
          Confirm as guest
        </Button>
      </div>
    </motion.div>
  );
}
