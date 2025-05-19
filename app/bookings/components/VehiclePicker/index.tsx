// app/bookings/components/VehiclePicker/index.tsx
"use client";
import { Listbox, ListboxButton, ListboxOptions } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { useCurrency, convert } from "@/context/CurrencyContext";
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
  error: string | Error | null;        // ← add
  selected: { name: string; price: number } | null;
  onSelect: (name: string, price: number) => void;
  onContinue: () => void;
}) {
  const { rates, selectedCurrency, setSelectedCurrency} = useCurrency();

  return (
    <div className="bg-[#1F1F1F] p-4 rounded-xl border border-[#BFA15B] mb-8">
      <div className="flex items-center justify-between px-5 mb-4">
        <h3 className="text-lg font-semibold text-[#BFA15B]">Choose Your Vehicle</h3>
        <Listbox value={selectedCurrency} onChange={setSelectedCurrency}>
          <ListboxButton className="flex items-center gap-2 bg-[#262626] border border-[#BFA15B] text-[#BFA15B] px-3 py-1 rounded-md w-20">
            {selectedCurrency}
            <ChevronDown className="w-4 h-4" />
          </ListboxButton>
          <ListboxOptions className="absolute right-106 mt-24 w-20 bg-[#262626] border border-[#BFA15B] rounded-md z-20 overflow-auto max-h-40">
            {['USD','EUR','GBP','TRY'].map(c => (
              <Listbox.Option key={c} value={c} className={({ active, selected }) =>
                `cursor-pointer px-3 py-1 ${active ? "bg-[#BFA15B]/30" : ""} ${selected ? "font-semibold" : ""}`
              }>
                {c}
              </Listbox.Option>
            ))}
          </ListboxOptions>
        </Listbox>
      </div>

      {!!error && <p className="text-red-500 mb-4">Failed to load prices</p>}
      {loading ? (
        <p className="text-center py-8">Loading prices...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <VehicleCard
            
            title="Minivan"
            img="/minivan.png"
            capacity={{ pax: 6, bags: 6 }}
            price={minivan != null ? convert(minivan, rates, selectedCurrency) : null}
            selected={selected?.name === 'Minivan'}
            onSelect={() => onSelect('Minivan', minivan ?? 0)}
          />
          <VehicleCard
            
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
              className="w-full max-w-sm bg-[#C2A36C] hover:bg-[#b1945e] text-black h-12 text-base font-medium transition-all duration-300"
              disabled={!selected}
              onClick={onContinue}
              >
              Continue as guest
            </Button>

      </div>
    </div>
  );
}
