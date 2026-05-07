import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { WhatsAppButton } from "@/components/whatsapp-button";

export const Route = createFileRoute("/desserts")({
  head: () => ({
    meta: [
      { title: "Desserts — Room For Tastebuds" },
      { name: "description", content: "Browse our handcrafted cakes & desserts: sleeping teddy cakes, cartoon cheesecakes, and fully custom celebration cakes." },
    ],
  }),
  component: DessertsPage,
});

function DessertsPage() {
  type MenuItem = {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
  };

  const [menu, setMenu] = useState<MenuItem[]>([]);

const defaultMenu = [
  {
    id: "1",
    name: "Sleeping Teddy Dessert",
    price: 1600,
    description: "A dreamy fondant teddy resting on pillowy vanilla sponge",
    image: "https://res.cloudinary.com/dbiydzqzr/image/upload/v1778081500/msj8ucpzewac2iiszsu2.jpg"
  },
  {
    id: "2",
    name: "Cartoon Cheese Cake",
    price: 700,
    description: "Silky baked cheesecake topped with a cartoon character",
    image: "https://res.cloudinary.com/dbiydzqzr/image/upload/v1778081488/vzfim3l0bvf8ycozfobj.jpg"
  },
  {
    id: "3",
    name: "Customized Cakes",
    price: 800,
    description: "Bespoke creations designed around your story",
    image: "https://res.cloudinary.com/dbiydzqzr/image/upload/v1778081473/b2tvwpzw7hwurviyhrva.jpg"
  }
];
  useEffect(() => {
  const fetchMenu = async () => {
    const querySnapshot = await getDocs(collection(db, "menu"));

    if (querySnapshot.empty) {
  setMenu(defaultMenu);
  return;
}

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
if (menu.length === 0) {
    return <p className="text-center py-20">Loading desserts...</p>;
  }
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
      <header className="mb-14 text-center">
        <span className="text-xs font-medium tracking-[0.25em] text-gold">THE MENU</span>
        <h1 className="mt-3 font-display text-5xl text-primary md:text-6xl">Our Desserts</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Handcrafted, baked-to-order, and finished by hand. Every order is made fresh.
        </p>
      </header>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {menu.map((item) => (
          <article key={item.id} className="group overflow-hidden rounded-2xl bg-card shadow-card transition-all hover:shadow-soft">
            <div className="aspect-square overflow-hidden bg-muted">
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h2 className="font-display text-2xl text-primary">{item.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              <div className="mt-5 flex items-center justify-between gap-3">
                
                <span className="font-display text-2xl text-gold">{item.price}</span>
                <WhatsAppButton
                  variant="outline"
                  className="px-5 py-2 text-xs"
                  message={`Hi! I'd like to order: ${item.name} (${item.price})`}
                >
                  Order
                </WhatsAppButton>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
