// lib/hooks/useBookingStepper.ts
import { useState, useMemo } from "react";
import type { WizardStep } from "@/app/bookings/components/StepProgress";

export default function useBookingStepper() {
  const steps: WizardStep[] = useMemo(
    () => [
      { step: 1, title: "Location & Date" },
      { step: 2, title: "Vehicle" },
      { step: 3, title: "Passenger Information" },
      { step: 4, title: "Payment" },
    ],
    []
  );

  const [current, setCurrent] = useState<number>(2);

  const next = () => setCurrent(prev => Math.min(prev + 1, steps.length));
  const prev = () => setCurrent(prev => Math.max(prev - 1, 1));
  const jump = (step: number) => {
    if (step >= 1 && step <= steps.length) setCurrent(step);
  };

  return { current, steps, next, prev, jump };
}
