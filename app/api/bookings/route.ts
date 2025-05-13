// app/api/bookings/route.ts

import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/createSupabaseServerClient";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { applyFirstBookingDiscount } from "@/lib/pricing";
import { FEATURE_GUEST_FLOW } from "@/lib/flags";

export async function GET() {
  
  const supabase = await createSupabaseServerClient();


  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("bookings")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return new NextResponse(error.message, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(_req: Request) {
  
  const supabase = await createSupabaseServerClient();


  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await _req.json();
  const { selectedVehicle, serviceType, from, to, dateTime, passengers, offerId } = body;

  if (
    !selectedVehicle?.price ||
    !serviceType ||
    !from ||
    !dateTime ||
    typeof passengers !== "number"
  ) {
    return new NextResponse("Missing required fields", { status: 400 });
  }

  const { data: profile, error: profileErr } = await supabaseAdmin
    .from("profiles")
    .upsert({ id: user.id }, { onConflict: 'id' })
    .select("bookings_count")
    .maybeSingle();

  if (profileErr) { 
    return new NextResponse(profileErr.message, { status: 500 });

  }

  let totalPrice: number;
  let discountApplied: boolean;
  let discountRate: number;

  if (FEATURE_GUEST_FLOW) {
    const discount = applyFirstBookingDiscount(
      selectedVehicle.price,
      profile.bookings_count
    );
    totalPrice = discount.total;
    discountApplied = discount.discountApplied;
    discountRate = discount.discountRate;
  } else {
    totalPrice = selectedVehicle.price;
    discountApplied = false;
    discountRate = 0;
  }

  const bookingPayload = {
    user_id: user.id,
    offer_id: offerId ?? null,
    status: "pending",
    service_type: serviceType,
    from_location: from,
    to_location: to ?? null,
    date_time: dateTime,
    passengers,
    vehicle: selectedVehicle.name,
    base_price: selectedVehicle.price,
    discount_applied: discountApplied,
    discount_rate: discountRate,
    total_price: totalPrice,
  };

  const { data: booking, error: insertErr } = await supabaseAdmin
    .from("bookings")
    .insert(bookingPayload)
    .select()
    .single();

  if (insertErr) {
    return new NextResponse(insertErr.message, { status: 500 });
  }

  return NextResponse.json(booking);
}
