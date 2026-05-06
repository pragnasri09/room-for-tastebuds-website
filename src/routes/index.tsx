import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import gallery1 from "@/assets/gallery1.jpg";
import gallery2 from "@/assets/gallery2.jpg";
import gallery3 from "@/assets/gallery3.jpg";
import gallery4 from "@/assets/gallery4.jpg";
import teddy from "@/assets/teddy.jpg";
import cheesecake from "@/assets/cheesecake.jpg";
import custom from "@/assets/custom.jpg";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Truck, Store, CalendarClock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Room For Tastebuds — Handcrafted Cakes in Vijayawada" },
      { name: "description", content: "Premium handcrafted cakes & desserts. Teddy cakes, cartoon cheesecakes, and custom celebration cakes — baked in small batches in Vijayawada." },
    ],
  }),
  component: HomePage,
});

const categories = [
  { title: "Teddy Cakes", image: teddy },
  { title: "Emoji / Cartoon Cakes", image: cheesecake },
  { title: "Custom Cakes", image: custom },
];

function HomePage() {
  type MenuItem = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
};

const [menu, setMenu] = useState<MenuItem[]>([]);

useEffect(() => {
  const fetchMenu = async () => {
    const querySnapshot = await getDocs(collection(db, "menu"));

    const data = querySnapshot.docs.map((docSnap) => {
      const d = docSnap.data();

      return {
        id: docSnap.id,
        name: d.name || "",
        price: d.price || 0,
        description: d.description || "",
        image: d.image || "",
      };
    });

    setMenu(data);
  };

  fetchMenu();
}, []);
  return (
    <div>
      {/* HERO */}
      <section className="relative h-[88vh] min-h-[600px] w-full overflow-hidden">
        <img
          src={heroImg}
          alt="Handcrafted cake on a rustic table"
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/70" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-5 text-center text-white lg:px-8">
          <span className="mb-5 inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-medium tracking-[0.2em] backdrop-blur-md">
            VIJAYAWADA · SINCE FOREVER, FRESHLY BAKED
          </span>
          <h1 className="text-balance font-display text-5xl leading-[1.05] md:text-7xl lg:text-[5.5rem]">
            Room For Tastebuds
          </h1>
          <p className="mt-4 font-display text-xl italic text-white/90 md:text-2xl">
            Handcrafted Cakes & Desserts
          </p>
          <p className="mt-6 max-w-xl text-balance text-sm leading-relaxed text-white/85 md:text-base">
            Small batches. Premium ingredients. Every bite, baked to leave a little room for joy.
          </p>
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <Link
              to="/desserts"
              className="inline-flex items-center gap-2 rounded-full bg-cream px-7 py-3 text-sm font-medium tracking-wide text-primary shadow-soft transition-all hover:bg-white"
            >
              View Desserts <ArrowRight size={16} />
            </Link>
            <WhatsAppButton />
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="text-xs font-medium tracking-[0.25em] text-gold">SIGNATURE COLLECTION</span>
          <h2 className="mt-3 font-display text-4xl text-primary md:text-5xl">Featured Desserts</h2>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            Our most-loved creations — each one designed, sculpted, and finished by hand.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {menu.slice(0, 3).map((item) => (
            <article key={item.id} className="group overflow-hidden rounded-2xl bg-card shadow-card transition-all hover:shadow-soft">
              <div className="aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-2xl text-primary">{item.name}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-secondary/50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-12 flex flex-col items-center text-center">
            <span className="text-xs font-medium tracking-[0.25em] text-gold">EXPLORE</span>
            <h2 className="mt-3 font-display text-4xl text-primary md:text-5xl">Categories</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {categories.map((c) => (
              <Link
                key={c.title}
                to="/desserts"
                className="group relative block aspect-[4/5] overflow-hidden rounded-2xl shadow-card"
              >
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-2xl text-white">{c.title}</h3>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs tracking-widest text-white/80">
                    EXPLORE <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="text-xs font-medium tracking-[0.25em] text-gold">FROM OUR KITCHEN</span>
          <h2 className="mt-3 font-display text-4xl text-primary md:text-5xl">Gallery</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {[gallery1, gallery2, gallery3, gallery4, custom, teddy, cheesecake, gallery1].map((src, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-xl bg-muted">
              <img
                src={src}
                alt="Bakery creation"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-gradient-warm py-20 lg:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2 lg:px-8">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-soft">
            <img src={gallery4} alt="Baker piping buttercream" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div>
            <span className="text-xs font-medium tracking-[0.25em] text-gold">OUR STORY</span>
            <h2 className="mt-3 font-display text-4xl leading-tight text-primary md:text-5xl">
              Baked with heart in Vijayawada
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              What began as a passion in a small home kitchen has grown into a tiny bakery loved across Vijayawada.
              We believe in slow, careful baking — real butter, fresh cream, and ingredients you can pronounce.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Every cake leaves our kitchen the same day it's made. Whether it's a sleeping teddy for a baby
              shower or a tiered custom cake for a wedding, we treat your celebration like our own.
            </p>
          </div>
        </div>
      </section>

      {/* PICKUP & DELIVERY */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="mb-12 text-center">
          <span className="text-xs font-medium tracking-[0.25em] text-gold">HOW IT WORKS</span>
          <h2 className="mt-3 font-display text-4xl text-primary md:text-5xl">Pickup & Delivery</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Store, title: "Pickup", text: "Collect your order fresh from our Cloud kitchen." },
            { icon: Truck, title: "City Delivery", text: "Doorstep delivery available within Vijayawada." },
            { icon: CalendarClock, title: "Lead Time", text: "Please order at least 1 day in advance." },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-border/60 bg-card p-8 text-center shadow-card">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-primary">
                <c.icon size={24} />
              </div>
              <h3 className="font-display text-2xl text-primary">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHATSAPP CTA */}
      <section className="bg-primary py-20 text-primary-foreground lg:py-24">
        <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
          <h2 className="font-display text-4xl md:text-5xl">Ready for something sweet?</h2>
          <p className="mt-4 text-primary-foreground/80">
            Tell us your idea on WhatsApp — we'll bake it to perfection.
          </p>
          <div className="mt-8 flex justify-center">
            <WhatsAppButton className="px-9 py-4 text-base">Order on WhatsApp</WhatsAppButton>
          </div>
        </div>
      </section>
    </div>
  );
}
