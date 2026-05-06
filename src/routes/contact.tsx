import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { PHONE_DISPLAY, whatsappLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Room For Tastebuds" },
      { name: "description", content: "Get in touch with Room For Tastebuds in Vijayawada. WhatsApp, phone, and contact form." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim().slice(0, 80);
    const trimmedMsg = message.trim().slice(0, 800);
    if (!trimmedName || !trimmedMsg) return;
    const text = `Hi, I'm ${trimmedName}. ${trimmedMsg}`;
    window.open(whatsappLink(text), "_blank");
    setSent(true);
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-24">
      <header className="mb-14 text-center">
        <span className="text-xs font-medium tracking-[0.25em] text-gold">SAY HELLO</span>
        <h1 className="mt-3 font-display text-5xl text-primary md:text-6xl">Contact Us</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Tell us about your celebration — we'll design something perfect.
        </p>
      </header>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-2xl border border-border/60 bg-card p-7 shadow-card">
            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-primary">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Phone</p>
                  <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`} className="font-display text-xl text-primary">{PHONE_DISPLAY}</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-primary">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Location</p>
                  <p className="font-display text-xl text-primary">Vijayawada, Andhra Pradesh</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-primary">
                  <Clock size={16} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Hours</p>
                  <p className="font-display text-xl text-primary">10:00 AM – 8:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-primary">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">WhatsApp</p>
                  <p className="font-display text-xl text-primary">Fastest way to reach us</p>
                </div>
              </div>
            </div>
            <div className="mt-7">
              <WhatsAppButton className="w-full">Chat on WhatsApp</WhatsAppButton>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="rounded-2xl border border-border/60 bg-card p-7 shadow-card">
          <h2 className="font-display text-2xl text-primary">Send a message</h2>
          <p className="mt-1 text-sm text-muted-foreground">We'll continue the conversation on WhatsApp.</p>
          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">Your name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={80}
                required
                className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={800}
                rows={5}
                required
                className="w-full resize-none rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
                placeholder="Tell us about your order or occasion…"
              />
            </div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Send via WhatsApp
            </button>
            {sent && <p className="text-center text-xs text-muted-foreground">Opening WhatsApp…</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
