import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { rooms, getRoomById, formatNaira } from "../data/rooms";
import { useBookings } from "../context/BookingContext";
import { sendBookingEmail, isEmailConfigured } from "../lib/emailjs";
import { buildWhatsAppLink, buildBookingWhatsAppMessage } from "../lib/whatsapp";

function nightsBetween(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  const a = new Date(checkIn);
  const b = new Date(checkOut);
  const diff = Math.round((b - a) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}

export default function Booking() {
  const [params] = useSearchParams();
  const { addBooking } = useBookings();

  const initialRoomId = params.get("room") || rooms[0].id;

  const [form, setForm] = useState({
    roomId: initialRoomId,
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [confirmation, setConfirmation] = useState(null);

  const room = getRoomById(form.roomId) || rooms[0];
  const nights = nightsBetween(form.checkIn, form.checkOut);
  const total = nights * room.price;

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!/^[0-9+()\-\s]{7,}$/.test(form.phone)) e.phone = "Enter a valid phone number.";
    if (!form.checkIn) e.checkIn = "Pick a check-in date.";
    if (!form.checkOut) e.checkOut = "Pick a check-out date.";
    if (form.checkIn && form.checkOut && nights <= 0)
      e.checkOut = "Check-out must be after check-in.";
    if (!form.guests || form.guests < 1) e.guests = "At least 1 guest.";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const eObj = validate();
    setErrors(eObj);
    if (Object.keys(eObj).length > 0) return;

    setStatus("submitting");

    const booking = {
      roomId: room.id,
      roomName: room.name,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      nights,
      guests: Number(form.guests),
      notes: form.notes.trim(),
      total,
    };

    // Always persist locally — this is the source of truth the property
    // can check even if email delivery isn't configured yet.
    const record = addBooking(booking);

    try {
      if (isEmailConfigured) {
        await sendBookingEmail(record);
      }
      setStatus("success");
      setConfirmation(record);
    } catch (err) {
      // Booking is still saved locally even if the email failed to send.
      console.error("Booking email failed:", err);
      setStatus("success");
      setConfirmation(record);
    }
  }

  if (status === "success" && confirmation) {
    return (
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto min-h-[60vh] flex items-center">
        <div className="max-w-xl mx-auto text-center bg-surface-container-low border border-surface-variant rounded-xl p-10 w-full">
          <span className="material-symbols-outlined text-5xl text-secondary mb-4">
            check_circle
          </span>
          <h1 className="font-display text-headline-md text-primary mb-2">Request received</h1>
          <p className="font-body text-body-md text-on-surface-variant mb-6">
            Thanks, {confirmation.name.split(" ")[0]}. We've logged your request for the{" "}
            <strong>{confirmation.roomName}</strong> and will confirm by phone or email shortly.
          </p>
          <div className="text-left bg-surface rounded-lg border border-surface-variant p-6 mb-6">
            <dl className="space-y-2 font-body text-body-md">
              <div className="flex justify-between">
                <dt className="text-on-surface-variant">Reference</dt>
                <dd className="text-primary font-medium">{confirmation.ref}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-on-surface-variant">Check-in</dt>
                <dd>{confirmation.checkIn}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-on-surface-variant">Check-out</dt>
                <dd>{confirmation.checkOut}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-on-surface-variant">Nights</dt>
                <dd>{confirmation.nights}</dd>
              </div>
              <div className="flex justify-between border-t border-surface-variant pt-2 mt-2">
                <dt className="text-on-surface-variant">Estimated total</dt>
                <dd className="text-primary font-semibold">{formatNaira(confirmation.total)}</dd>
              </div>
            </dl>
          </div>
          {!isEmailConfigured && (
            <p className="text-label-sm text-on-surface-variant/80 mb-6">
              Note: email delivery isn't configured yet, so this request was saved locally only.
              See the README for EmailJS setup.
            </p>
          )}
          <a
            href="/"
            className="inline-block px-6 py-3 bg-primary text-on-primary hover:bg-primary-container transition-colors duration-300 font-body text-label-sm rounded uppercase tracking-wider"
          >
            Back to Home
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="font-display text-headline-md-mobile md:text-headline-md text-primary mb-4">
          Book Your Stay
        </h1>
        <p className="font-body text-body-md text-on-surface-variant">
          Tell us your dates and details — we'll confirm availability and follow up to finalize
          payment.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="max-w-2xl mx-auto bg-surface-container-low border border-surface-variant rounded-xl p-6 md:p-10 space-y-6"
      >
        <div>
          <label className="block font-body text-label-sm uppercase tracking-wider text-on-surface-variant mb-2">
            Room
          </label>
          <select
            className="w-full rounded border border-outline-variant bg-surface px-4 py-3 font-body text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={form.roomId}
            onChange={(e) => update("roomId", e.target.value)}
          >
            {rooms.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name} — {formatNaira(r.price)}/night
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-body text-label-sm uppercase tracking-wider text-on-surface-variant mb-2">
              Check-in
            </label>
            <input
              type="date"
              min={today}
              className="w-full rounded border border-outline-variant bg-surface px-4 py-3 font-body text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={form.checkIn}
              onChange={(e) => update("checkIn", e.target.value)}
            />
            {errors.checkIn && <p className="text-error text-label-sm mt-1">{errors.checkIn}</p>}
          </div>
          <div>
            <label className="block font-body text-label-sm uppercase tracking-wider text-on-surface-variant mb-2">
              Check-out
            </label>
            <input
              type="date"
              min={form.checkIn || today}
              className="w-full rounded border border-outline-variant bg-surface px-4 py-3 font-body text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={form.checkOut}
              onChange={(e) => update("checkOut", e.target.value)}
            />
            {errors.checkOut && <p className="text-error text-label-sm mt-1">{errors.checkOut}</p>}
          </div>
        </div>

        <div>
          <label className="block font-body text-label-sm uppercase tracking-wider text-on-surface-variant mb-2">
            Guests
          </label>
          <input
            type="number"
            min={1}
            max={8}
            className="w-full rounded border border-outline-variant bg-surface px-4 py-3 font-body text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={form.guests}
            onChange={(e) => update("guests", e.target.value)}
          />
          {errors.guests && <p className="text-error text-label-sm mt-1">{errors.guests}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-body text-label-sm uppercase tracking-wider text-on-surface-variant mb-2">
              Full name
            </label>
            <input
              type="text"
              className="w-full rounded border border-outline-variant bg-surface px-4 py-3 font-body text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Sharon Emmanuel"
            />
            {errors.name && <p className="text-error text-label-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block font-body text-label-sm uppercase tracking-wider text-on-surface-variant mb-2">
              Phone
            </label>
            <input
              type="tel"
              className="w-full rounded border border-outline-variant bg-surface px-4 py-3 font-body text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="+234 800 000 0000"
            />
            {errors.phone && <p className="text-error text-label-sm mt-1">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <label className="block font-body text-label-sm uppercase tracking-wider text-on-surface-variant mb-2">
            Email
          </label>
          <input
            type="email"
            className="w-full rounded border border-outline-variant bg-surface px-4 py-3 font-body text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
          />
          {errors.email && <p className="text-error text-label-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block font-body text-label-sm uppercase tracking-wider text-on-surface-variant mb-2">
            Notes (optional)
          </label>
          <textarea
            rows={3}
            className="w-full rounded border border-outline-variant bg-surface px-4 py-3 font-body text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            placeholder="Early check-in, airport pickup, etc."
          />
        </div>

        <div className="border-t border-surface-variant pt-6 flex items-center justify-between">
          <div>
            <p className="font-body text-label-sm uppercase tracking-wider text-on-surface-variant">
              Estimated total{nights > 0 ? ` · ${nights} night${nights > 1 ? "s" : ""}` : ""}
            </p>
            <p className="font-display text-headline-md-mobile text-primary">
              {formatNaira(total)}
            </p>
          </div>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="px-8 py-4 bg-primary text-on-primary hover:bg-primary-container transition-colors duration-300 font-body text-label-sm uppercase tracking-widest rounded shadow-sm disabled:opacity-60"
          >
            {status === "submitting" ? "Sending…" : "Request Booking"}
          </button>
        </div>

        <div className="flex items-center gap-3 text-on-surface-variant">
          <div className="flex-1 h-px bg-surface-variant" />
          <span className="font-body text-label-sm uppercase tracking-wider">or</span>
          <div className="flex-1 h-px bg-surface-variant" />
        </div>

        <a
          href={buildWhatsAppLink(
            buildBookingWhatsAppMessage({
              roomName: room.name,
              checkIn: form.checkIn,
              checkOut: form.checkOut,
              guests: form.guests,
              nights,
              total: nights > 0 ? formatNaira(total) : null,
            })
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white hover:bg-[#1ebe57] transition-colors duration-300 font-body text-label-sm uppercase tracking-widest rounded shadow-sm"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.47 3.55 1.36 5.1L2 22l5.13-1.44a9.9 9.9 0 0 0 4.91 1.31h.01c5.46 0 9.9-4.45 9.9-9.9C21.96 6.45 17.5 2 12.04 2Zm5.83 14.05c-.24.68-1.4 1.32-1.93 1.36-.5.05-1.02.24-3.43-.72-2.9-1.16-4.77-4.13-4.92-4.32-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.42.27-.29.58-.36.78-.36.2 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.82 2 .9 2.15.07.14.12.31.02.5-.1.2-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.3.77 1.27 1.65 2.06 1.13 1.01 2.09 1.32 2.38 1.47.29.15.46.13.63-.08.17-.2.72-.84.92-1.13.19-.29.39-.24.65-.15.27.1 1.7.8 1.99.95.29.14.48.22.55.34.07.13.07.72-.17 1.4Z" />
          </svg>
          Book via WhatsApp Instead
        </a>
      </form>
    </section>
  );
}
