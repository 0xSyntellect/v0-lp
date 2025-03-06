// app/api/booking/confirm/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

// Log to verify that the API route is loaded and check the API key
console.log("API route /api/booking/confirm loaded. RESEND_API_KEY:", process.env.RESEND_API_KEY);

// Initialize Resend using your environment variable
const resend = new Resend(process.env.RESEND_API_KEY!);

// GET handler for testing route availability
export async function GET(request: Request) {
  return NextResponse.json({ message: "GET route is working" });
}

// POST handler for booking confirmation
export async function POST(request: Request) {
  try {
    const bookingData = await request.json();

    // Prepare email content
    const emailContent = `
New Booking Received:

From: ${bookingData.from}
To: ${bookingData.to}
Date/Time: ${bookingData.dateTime}
Passengers: ${bookingData.passengers}
Vehicle: ${
      bookingData.selectedVehicle
        ? bookingData.selectedVehicle.name + " ($" + bookingData.selectedVehicle.price + ")"
        : "N/A"
    }

Passenger Details:
${bookingData.passengerDetails
  .map(
    (
      p: { firstName: string; lastName: string; passportNumber: string; origin: string },
      i: number
    ) => `Passenger ${i + 1}:
  First Name: ${p.firstName}
  Last Name: ${p.lastName}
  Passport Number: ${p.passportNumber}
  Origin: ${p.origin}`
  )
  .join("\n\n")}

Payment Method: ${bookingData.paymentMethod}

Contact Info:
Email: ${bookingData.contactInfo.email}
Phone: ${bookingData.contactInfo.phone}
WhatsApp: ${bookingData.contactInfo.whatsapp}
    `;

    const emailResponse = await resend.emails.send({
      from: "onboarding@resend.dev", // Replace with your verified sender email
      to: "erdaltuncberk@gmail.com",           // Replace with your recipient email
      subject: "New Booking Confirmation",
      text: emailContent,
    });

    return NextResponse.json({ success: true, data: emailResponse });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Error in booking confirmation API:", error);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
