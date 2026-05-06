import { Link } from "@tanstack/react-router";
import { MapPin, Clock, Phone } from "lucide-react";
import { PHONE_DISPLAY, whatsappLink } from "@/lib/whatsapp";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3 lg:px-8">
        <div>
          <h3 className="font-display text-2xl text-primary">Room For Tastebuds</h3>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Handcrafted cakes & desserts, baked in small batches with love in Vijayawada.
          </p>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3 text-muted-foreground">
            <MapPin size={16} className="mt-0.5 text-gold" />
            <span>Vijayawada, Andhra Pradesh</span>
          </div>
          <div className="flex items-start gap-3 text-muted-foreground">
            <Clock size={16} className="mt-0.5 text-gold" />
            <span>Open daily 10:00 AM – 8:00 PM</span>
          </div>
          <div className="flex items-start gap-3 text-muted-foreground">
            <Phone size={16} className="mt-0.5 text-gold" />
            <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`} className="hover:text-primary">
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <span className="font-medium text-primary">Explore</span>
          <Link to="/desserts" className="text-muted-foreground hover:text-primary">Desserts</Link>
          <Link to="/reviews" className="text-muted-foreground hover:text-primary">Reviews</Link>
          <Link to="/contact" className="text-muted-foreground hover:text-primary">Contact</Link>
          <Link to="/terms" className="text-muted-foreground hover:text-primary">Terms & Conditions</Link>
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary">Order on WhatsApp</a>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Room For Tastebuds · Made with butter, sugar & care
      </div>
    </footer>
  );
}
