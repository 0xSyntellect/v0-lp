// app/my-bookings/page.tsx
import { redirect } from "next/navigation";
import MyBookings from "./components/MyBookings";
import { createSupabaseServerClient } from "@/lib/createSupabaseServerClient";

export default async function MyBookingsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login?return=/my-bookings");

  /* You can call the internal API or query directly with RLS */
  const { data: bookings } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  return <MyBookings bookings={bookings ?? []} />;
}
