import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/desserts", label: "Desserts" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
  { to: "/terms", label: "Terms" },
  { to: "/admin", label: "Admin" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-xl tracking-tight text-primary md:text-2xl">
            Room <span className="text-gold">For</span> Tastebuds
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-primary" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-primary" }}
              className="text-sm font-medium tracking-wide transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          aria-label="Toggle menu"
          className="md:hidden text-primary"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <nav className="md:hidden border-t border-border/60 bg-background">
          <div className="mx-auto flex max-w-7xl flex-col px-5 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-primary" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="py-2.5 text-sm font-medium"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
