import { createFileRoute } from "@tanstack/react-router";
import { Star, Quote } from "lucide-react";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Room For Tastebuds" },
      { name: "description", content: "Read what our customers in Vijayawada say about our handcrafted cakes & desserts." },
    ],
  }),
  component: ReviewsPage,
});

const reviews = [
  {
    text: "Thank you for the handmade chocolates — beautifully packed and tasty!",
    name: "Customer",
    rating: 5,
  },
  {
    text: "Cake sickles and cupcakes tasted amazing! Kids loved them especially.",
    name: "Customer",
    rating: 5,
  },
  {
    text: "Deliciousness jumping into the mouth 😄",
    name: "Customer",
    rating: 5,
  },
  {
    text: "Black forest cake was really awesome. Made the birthday special!",
    name: "Customer",
    rating: 5,
  },
  {
    text: "Cake decoration was perfect and matched our theme so well.",
    name: "Customer",
    rating: 5,
  },
  {
    text: "Wonderful and yummy cake. Every detail was perfect!",
    name: "Customer",
    rating: 5,
  },
  {
    text: "Cheesecake was too good ❤️ Loved it!",
    name: "Customer",
    rating: 5,
  }
];

function ReviewsPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
      <header className="mb-14 text-center">
        <span className="text-xs font-medium tracking-[0.25em] text-gold">KIND WORDS</span>
        <h1 className="mt-3 font-display text-5xl text-primary md:text-6xl">Reviews</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Real notes from the people we bake for.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <article key={r.name} className="rounded-2xl border border-border/60 bg-card p-7 shadow-card">
            <Quote className="text-gold" size={28} />
            <p className="mt-4 leading-relaxed text-foreground">"{r.text}"</p>
            <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
              <div>
                <p className="font-display text-lg text-primary">{r.name}</p>
                
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-gold text-gold" />
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
