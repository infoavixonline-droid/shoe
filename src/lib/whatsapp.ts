import { WHATSAPP_NUMBER, formatPrice } from "./config";
import { CartItem } from "../types";

export const getWhatsAppBuyNowLink = (name: string, size: string, quantity: number, price: number): string => {
  const itemTotal = price * quantity;
  const message = `Hi! I'd like to order:\n\n- ${name} (Size ${size}) x${quantity} - ${formatPrice(price)}\n\nTotal: ${formatPrice(itemTotal)}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const getWhatsAppBuyAllLink = (items: CartItem[], total: number): string => {
  const itemsText = items
    .map(item => `- ${item.name} (Size ${item.size}) x${item.quantity} - ${formatPrice(item.price * item.quantity)}`)
    .join("\n");
  
  const message = `Hi! I'd like to order the following:\n\n${itemsText}\n\nTotal: ${formatPrice(total)}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};
