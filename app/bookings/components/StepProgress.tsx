// app/bookings/components/StepProgress.tsx
"use client";
import { Fragment } from "react";

export interface WizardStep { step: number; title: string; }

export default function StepProgress({
  current,
  steps,
  onJump,
}: {
  current: number;
  steps: WizardStep[];
  onJump: (step: number) => void;
}) {
  return (
    <div className="flex items-center w-full px-4 mb-8">
      {steps.map(({ step, title }, idx) => {
        const active = current >= step;
        const circle =
          "rounded-full w-10 h-10 flex items-center justify-center font-bold";
        return (
          <Fragment key={step}>
            <div className="flex-1 flex flex-col items-center">
              {step < current ? (
                <button onClick={() => onJump(step)}>
                  <div className={`${circle} bg-[#BFA15B] text-black`}>{step}</div>
                </button>
              ) : (
                <div
                  className={`${circle} ${
                    active
                      ? "bg-[#BFA15B] text-black"
                      : "bg-[#333333] text-[#BFA15B]"
                  }`}
                >
                  {step}
                </div>
              )}
              <span className="text-sm mt-1 h-12 text-center text-[#BFA15B]">
                {title}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`h-1 flex-1 mx-2 ${
                  current >= step + 1 ? "bg-[#BFA15B]" : "bg-[#333333]"
                }`}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}