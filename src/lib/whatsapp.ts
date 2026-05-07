// WhatsApp number — replace with the real one
export const WHATSAPP_NUMBER = "918143193711"; // country code + number, no +
export const PHONE_DISPLAY = "+91 81431 93711";

export function whatsappLink(message = "Hi! I'd like to place an order with Room For Tastebuds.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
