// app/bookings/page.tsx

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function BookingsPage() {
  // 1) Initialize Supabase in a Server Component
  const supabase = createServerComponentClient({ cookies });

  // 2) Check auth
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    // not logged in → redirect to login page
    redirect("/login");
  }

  // 3) Fetch the user's bookings
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
        <p className="text-center text-[#BFA15B]">You have no bookings yet.</p>
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
