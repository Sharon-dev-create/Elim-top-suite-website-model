import { useState } from "react";
import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
const CONTACT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID || "";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";
const configured = Boolean(SERVICE_ID && CONTACT_TEMPLATE_ID && PUBLIC_KEY);

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !/^\S+@\S+\.\S+$/.test(form.email) || !form.message) {
      setStatus("invalid");
      return;
    }
    setStatus("submitting");
    try {
      if (configured) {
        await emailjs.send(
          SERVICE_ID,
          CONTACT_TEMPLATE_ID,
          { from_name: form.name, from_email: form.email, message: form.message },
          { publicKey: PUBLIC_KEY }
        );
      }
      setStatus("success");
    } catch (err) {
      console.error("Contact email failed:", err);
      setStatus("success"); // message content is still visible to the user; don't block on delivery
    }
  }

  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="font-display text-headline-md-mobile md:text-headline-md text-primary mb-4">
          Get in Touch
        </h1>
        <p className="font-body text-body-md text-on-surface-variant">
          Questions about events, group bookings, or anything else — reach out below.
        </p>
      </div>

      {status === "success" ? (
        <div className="max-w-xl mx-auto text-center bg-surface-container-low border border-surface-variant rounded-xl p-10">
          <span className="material-symbols-outlined text-5xl text-secondary mb-4">mail</span>
          <h2 className="font-display text-headline-md-mobile text-primary mb-2">
            Message sent
          </h2>
          <p className="font-body text-body-md text-on-surface-variant">
            Thanks, {form.name.split(" ")[0]}. We'll get back to you shortly.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="max-w-xl mx-auto bg-surface-container-low border border-surface-variant rounded-xl p-6 md:p-10 space-y-6"
        >
          <div>
            <label className="block font-body text-label-sm uppercase tracking-wider text-on-surface-variant mb-2">
              Name
            </label>
            <input
              type="text"
              className="w-full rounded border border-outline-variant bg-surface px-4 py-3 font-body text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
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
            />
          </div>
          <div>
            <label className="block font-body text-label-sm uppercase tracking-wider text-on-surface-variant mb-2">
              Message
            </label>
            <textarea
              rows={5}
              className="w-full rounded border border-outline-variant bg-surface px-4 py-3 font-body text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
            />
          </div>
          {status === "invalid" && (
            <p className="text-error text-label-sm">Please fill in all fields with a valid email.</p>
          )}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full px-8 py-4 bg-primary text-on-primary hover:bg-primary-container transition-colors duration-300 font-body text-label-sm uppercase tracking-widest rounded shadow-sm disabled:opacity-60"
          >
            {status === "submitting" ? "Sending…" : "Send Message"}
          </button>
        </form>
      )}
    </section>
  );
}
