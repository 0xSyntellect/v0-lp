// app/api/booking/confirm/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with your API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY!);


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
    (p: any, i: number) => `Passenger ${i + 1}:
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

    // Send email using Resend
    const emailResponse = await resend.emails.send({
      from: "onboarding@resend.dev", // Replace with your verified sender email
      to: "erdaltuncberk@gmail.com",           // Replace with your recipient email
      subject: "New Booking Confirmation",
      text: emailContent,
    });

    return NextResponse.json({ success: true, data: emailResponse });
  } catch (error: any) {
    console.error("Error in booking confirmation API:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
