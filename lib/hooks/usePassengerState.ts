// lib/hooks/usePassengerState.ts
import { useState } from "react";

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

export default function usePassengerState(count: number) {
  const [passengerDetails, setPassengerDetails] = useState<Passenger[]>(
    Array.from({ length: count }, () => ({ firstName: "", lastName: "", passportNumber: "", origin: "" }))
  );
  const [isAccordionOpen, setAccordionOpen] = useState<boolean[]>(
    Array.from({ length: count }, () => false)
  );
  const [contactInfo, setContactInfo] = useState<Contact>({
    email: "",
    phone: "",
    whatsapp: "",
    flightNumber: "",
    notes: "",
  });

  const updatePassengerField = (
    idx: number,
    field: keyof Passenger,
    value: string
  ) => {
    setPassengerDetails(prev => {
      const copy = [...prev];
      copy[idx][field] = value;
      return copy;
    });
  };

  const toggleAccordion = (idx: number) => {
    setAccordionOpen(prev => prev.map((open, i) => (i === idx ? !open : open)));
  };

  const updateContactInfo = (field: keyof Contact, value: string) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
  };

  return {
    passengerDetails,
    isAccordionOpen,
    contactInfo,
    updatePassengerField,
    toggleAccordion,
    updateContactInfo,
  };
}
