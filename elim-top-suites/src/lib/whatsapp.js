// Replace with the property's real WhatsApp-enabled number, in international
// format with no "+", spaces, or leading zeros (Nigeria country code 234).
export const WHATSAPP_NUMBER = "2340000000000";

export function buildWhatsAppLink(message) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function buildBookingWhatsAppMessage({ roomName, checkIn, checkOut, guests, nights, total }) {
  const lines = [
    `Hi Elim Top Suites, I'd like to book a room.`,
    ``,
    `Room: ${roomName}`,
    checkIn ? `Check-in: ${checkIn}` : null,
    checkOut ? `Check-out: ${checkOut}` : null,
    nights ? `Nights: ${nights}` : null,
    guests ? `Guests: ${guests}` : null,
    total ? `Estimated total: ${total}` : null,
    ``,
    `Please confirm availability. Thank you!`,
  ].filter(Boolean);
  return lines.join("\n");
}
