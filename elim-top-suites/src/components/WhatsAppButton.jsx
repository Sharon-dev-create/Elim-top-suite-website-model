import { buildWhatsAppLink } from "../lib/whatsapp";

/**
 * Floating WhatsApp action button, shown on every page. For a generic
 * "I have a question" entry point — the booking-specific one lives on
 * the Booking page and pre-fills room/date details.
 */
export default function WhatsAppButton() {
  const link = buildWhatsAppLink(
    "Hi Elim Top Suites, I'd like to ask about a booking."
  );

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.47 3.55 1.36 5.1L2 22l5.13-1.44a9.9 9.9 0 0 0 4.91 1.31h.01c5.46 0 9.9-4.45 9.9-9.9C21.96 6.45 17.5 2 12.04 2Zm5.83 14.05c-.24.68-1.4 1.32-1.93 1.36-.5.05-1.02.24-3.43-.72-2.9-1.16-4.77-4.13-4.92-4.32-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.42.27-.29.58-.36.78-.36.2 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.82 2 .9 2.15.07.14.12.31.02.5-.1.2-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.3.77 1.27 1.65 2.06 1.13 1.01 2.09 1.32 2.38 1.47.29.15.46.13.63-.08.17-.2.72-.84.92-1.13.19-.29.39-.24.65-.15.27.1 1.7.8 1.99.95.29.14.48.22.55.34.07.13.07.72-.17 1.4Z" />
      </svg>
    </a>
  );
}
