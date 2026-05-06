import { whatsappLink } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-soft transition-transform hover:scale-105"
    >
      <MessageCircle size={26} />
    </a>
  );
}
