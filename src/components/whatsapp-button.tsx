import { whatsappLink } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  message?: string;
  className?: string;
  children?: React.ReactNode;
  variant?: "solid" | "outline";
};

export function WhatsAppButton({ message, className, children = "Order on WhatsApp", variant = "solid" }: Props) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium tracking-wide transition-all",
        variant === "solid"
          ? "bg-whatsapp text-whatsapp-foreground shadow-soft hover:opacity-95 hover:shadow-card"
          : "border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground",
        className,
      )}
    >
      <MessageCircle size={18} />
      {children}
    </a>
  );
}
