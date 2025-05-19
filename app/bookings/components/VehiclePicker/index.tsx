// app/bookings/components/VehiclePicker/index.tsx
"use client";
import { Listbox } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { useCurrency, convert, format } from "@/context/CurrencyContext";
import VehicleCard from "./VehicleCard";
import { Button } from "@/components/ui/button";

export default function VehiclePicker({
  minivan,
  sprinter,
  loading,
  error,
  selected,
  onSelect,
  onContinue,
}: {
  minivan: number | null;
  sprinter: number | null;
  loading: boolean;
  error: unknown;
  selected: { name: string; price: number } | null;
  onSelect: (name: string, price: number) => void;
  onContinue: () => void;
}) {
  const { rates, selectedCurrency, setSelectedCurrency, loading: ratesLoading } = useCurrency();

  return (
    <div className="bg-[#1F1F1F] p-4 rounded-xl border border-[#BFA15B] mb-8">
      <div className="flex items-center justify-between px-5 mb-4">
        <h3 className="text-lg font-semibold text-[#BFA15B]">Choose Your Vehicle</h3>
        <Listbox value={selectedCurrency} onChange={setSelectedCurrency}>
          <Listbox.Button className="flex items-center gap-2 bg-[#262626] border border-[#BFA15B] text-[#BFA15B] px-3 py-1 rounded-md">
            {selectedCurrency}
            <ChevronDown className="w-4 h-4" />
          </Listbox.Button>
          <Listbox.Options className="absolute right-0 mt-1 w-full bg-[#262626] border border-[#BFA15B] rounded-md z-20 overflow-auto max-h-40">
            {['USD','EUR','GBP','TRY'].map(c => (
              <Listbox.Option key={c} value={c} className={({ active, selected }) =>
                `cursor-pointer px-3 py-1 ${active ? "bg-[#BFA15B]/30" : ""} ${selected ? "font-semibold" : ""}`
              }>
                {c}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>

      {error && <p className="text-red-500 mb-4">Failed to load prices</p>}
      {loading ? (
        <p className="text-center py-8">Loading prices...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <VehicleCard
            id="minivan"
            title="Minivan"
            img="/minivan.png"
            capacity={{ pax: 6, bags: 6 }}
            price={minivan != null ? convert(minivan, rates, selectedCurrency) : null}
            selected={selected?.name === 'Minivan'}
            onSelect={() => onSelect('Minivan', minivan ?? 0)}
          />
          <VehicleCard
            id="sprinter"
            title="Sprinter"
            img="/sprinter new.png"
            capacity={{ pax: 12, bags: 12 }}
            price={sprinter != null ? convert(sprinter, rates, selectedCurrency) : null}
            selected={selected?.name === 'Sprinter'}
            onSelect={() => onSelect('Sprinter', sprinter ?? 0)}
          />
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <Button
          size="lg"
          className="w-full max-w-sm"
          disabled={!selected}
          onClick={onContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
