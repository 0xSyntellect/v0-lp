// app/bookings/page.tsx

import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/createSupabaseServerClient";

export default async function BookingsPage() {
  // initialize Supabase with getAll/setAll cookie handlers
  const supabase = await createSupabaseServerClient();

  // check auth
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    redirect("/login");
  }

  // fetch bookings
  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("id, service_type, date_time, vehicle, total_price, status")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Failed to load bookings: " + error.message);
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-[#BFA15B]">My Bookings</h1>

      {(!bookings || bookings.length === 0) ? (
        <p className="text-center text-[#BFA15B]">
          You have no bookings yet.{" "}
          <Link href="/" className="underline hover:text-white">
            Book your first ride now!
          </Link>
        </p>
      ) : (
        <table className="min-w-full table-auto border-collapse bg-[#1F1F1F] text-[#BFA15B]">
          <thead>
            <tr className="bg-[#333333]">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Service</th>
              <th className="p-3 text-left">Date/Time</th>
              <th className="p-3 text-left">Vehicle</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-t border-[#444]">
                <td className="p-3">{b.id}</td>
                <td className="p-3">{b.service_type}</td>
                <td className="p-3">
                  {new Date(b.date_time).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
                <td className="p-3">{b.vehicle}</td>
                <td className="p-3">{b.total_price}</td>
                <td className="p-3">{b.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
