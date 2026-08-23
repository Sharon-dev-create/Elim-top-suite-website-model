import emailjs from "@emailjs/browser";

// Create a free account at https://www.emailjs.com, set up an Email Service
// and a Template, then drop the three IDs below (or in a .env file — see .env.example).
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

export const isEmailConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

/**
 * Sends a booking enquiry email via EmailJS. Falls back gracefully
 * (throws) if EmailJS isn't configured yet, so callers can rely on
 * the local booking store instead.
 */
export async function sendBookingEmail(booking) {
  if (!isEmailConfigured) {
    throw new Error("EmailJS is not configured yet.");
  }

  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      guest_name: booking.name,
      guest_email: booking.email,
      guest_phone: booking.phone,
      room_name: booking.roomName,
      check_in: booking.checkIn,
      check_out: booking.checkOut,
      guests: booking.guests,
      total: booking.total,
      notes: booking.notes || "—",
      booking_ref: booking.ref,
    },
    { publicKey: PUBLIC_KEY }
  );
}
