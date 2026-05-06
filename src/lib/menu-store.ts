import { useEffect, useState } from "react";
import teddy from "@/assets/teddy.jpg";
import cheesecake from "@/assets/cheesecake.jpg";
import custom from "@/assets/custom.jpg";

export type MenuItem = {
  id: string;
  name: string;
  price: string; 
  description: string;
  image: string;
};

const DEFAULT_MENU: MenuItem[] = [
  {
    id: "teddy",
    name: "Sleeping Teddy Dessert",
    price: "₹1600",
    description: "A dreamy fondant teddy resting on pillowy vanilla sponge — our most-loved signature.",
    image: teddy,
  },
  {
    id: "cartoon",
    name: "Cartoon Cheese Cake",
    price: "₹700",
    description: "Silky baked cheesecake topped with a hand-sculpted cartoon character — playful and rich.",
    image: cheesecake,
  },
  {
    id: "custom",
    name: "Customized Cakes",
    price: "₹800",
    description: "Bespoke creations for birthdays, weddings, and anniversaries — designed around your story.",
    image: custom,
  },
];

const KEY = "rft_menu_v1";

export function loadMenu(): MenuItem[] {
  if (typeof window === "undefined") return DEFAULT_MENU;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_MENU;
    const parsed = JSON.parse(raw) as MenuItem[];
    return parsed.length ? parsed : DEFAULT_MENU;
  } catch {
    return DEFAULT_MENU;
  }
}

export function saveMenu(items: MenuItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("menu:updated"));
}

export function resetMenu() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("menu:updated"));
}

export function useMenu() {
  const [menu, setMenu] = useState<MenuItem[]>(DEFAULT_MENU);
  useEffect(() => {
    setMenu(loadMenu());
    const handler = () => setMenu(loadMenu());
    window.addEventListener("menu:updated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("menu:updated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  return menu;
}

export { DEFAULT_MENU };
