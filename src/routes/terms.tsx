import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Room For Tastebuds" },
      { name: "description", content: "Order terms, payment, and delivery policy for Room For Tastebuds, Vijayawada." },
    ],
  }),
  component: TermsPage,
});

const terms = [
  {
    title: "Advance Payment",
    text: "All orders require advance payment to confirm and reserve your slot. Without payment, the order is not booked into our schedule.",
  },
  {
    title: "No Cancellation After Confirmation",
    text: "Once an order is confirmed, it cannot be cancelled or refunded. Ingredients are sourced fresh and preparation may begin immediately.",
  },
  {
    title: "Order Lead Time",
    text: "Please place your order at least 1 day in advance. Custom and tiered cakes may require 2–3 days depending on complexity.",
  },
  {
    title: "Delivery Charges",
    text: "Delivery is available within Vijayawada. Charges may apply based on distance and will be confirmed before payment.",
  },
  {
    title: "Pickup",
    text: "Self-pickup from our kitchen is welcome. Pickup time will be coordinated when your order is confirmed.",
  },
  {
    title: "Allergens",
    text: "Our kitchen handles dairy, eggs, gluten, and nuts. Please inform us about any allergies at the time of ordering.",
  },
];

function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 lg:py-24">
      <header className="mb-12 text-center">
        <span className="text-xs font-medium tracking-[0.25em] text-gold">THE FINE PRINT</span>
        <h1 className="mt-3 font-display text-5xl text-primary md:text-6xl">Terms & Conditions</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          A few simple notes so every order goes smoothly.
        </p>
      </header>
      <div className="space-y-6">
        {terms.map((t, i) => (
          <section key={t.title} className="rounded-2xl border border-border/60 bg-card p-7 shadow-card">
            <div className="flex items-baseline gap-4">
              <span className="font-display text-3xl text-gold">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="font-display text-2xl text-primary">{t.title}</h2>
            </div>
            <p className="mt-3 pl-12 leading-relaxed text-muted-foreground">{t.text}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
