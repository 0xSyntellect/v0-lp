"use client";
import Image from "next/image";
import { Users, Luggage, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrency, format } from "@/context/CurrencyContext";   // NEW

export default function VehicleCard({
  id,
  title,
  img,
  capacity,
  price,
  selected,
  onSelect,
}: {
  id: string;
  title: string;
  img: string;
  capacity: { pax: number; bags: number };
  price: number | null;
  selected: boolean;
  onSelect: () => void;
}) {
  const { selectedCurrency } = useCurrency();                      // NEW

  return (
    <div className="rounded-2xl border border-[#BFA15B]/60 bg-[#262626] p-6 flex flex-col">
      <div className="relative w-full h-40">
        <Image src={img} alt={title} fill className="object-cover rounded-lg" />
      </div>

      <h4 className="mt-4 text-lg font-semibold text-[#BFA15B]">{title}</h4>

      <div className="flex items-center gap-2 mt-2 text-sm text-[#BFA15B]">
        <Users className="w-4 h-4" /> Up to {capacity.pax} passengers
      </div>
      <div className="flex items-center gap-2 text-sm text-[#BFA15B]">
        <Luggage className="w-4 h-4" /> Fits {capacity.bags} suitcases
      </div>

      {/* PRICE */}
      <div className="flex items-center gap-2 mt-2">
        <Tag className="w-4 h-4 text-[#BFA15B]" />
        <span className="text-[#BFA15B] font-semibold">
          {price != null ? format(price, selectedCurrency) : "–"}
        </span>
      </div>

      <Button
        variant={selected ? "default" : "outline"}
        className="mt-4 px-6 py-2 w-full"
        onClick={onSelect}
      >
        Select
      </Button>
    </div>
  );
}
