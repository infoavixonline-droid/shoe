import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, ArrowRight, ShoppingBag, Send, ShieldCheck } from 'lucide-react';
import { formatPrice } from '../lib/config';
import { getWhatsAppBuyAllLink } from '../lib/whatsapp';

interface CartProps {
  setCurrentPage: (page: string) => void;
}

export const Cart: React.FC<CartProps> = ({ setCurrentPage }) => {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const subtotal = getCartTotal();

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const link = getWhatsAppBuyAllLink(cart, subtotal);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* 1. Page Header */}
      <div className="border-b-3 border-black pb-6">
        <span className="font-mono text-xs font-bold tracking-widest text-[#E4002B] uppercase">
          YOUR SELECTIONS
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold uppercase text-black tracking-tight mt-1 animate-fadeIn">
          YOUR BAG
        </h1>
      </div>

      {/* 2. Cart Content */}
      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List (8 Columns) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="border-b border-black/10 pb-2 flex justify-between font-display text-xs font-bold tracking-widest text-black uppercase">
              <span>SNEAKER DETAIL</span>
              <span>SUBTOTAL</span>
            </div>

            <div className="divide-y divide-black/10">
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}`} className="py-6 flex gap-4 sm:gap-6 justify-between items-stretch">
                  {/* Left block (Image + description) */}
                  <div className="flex gap-4 sm:gap-6">
                    {/* Floating image cutout thumbnail */}
                    <div className="bg-[#FAFAFA] border border-black/5 w-20 h-20 sm:w-28 sm:h-28 shrink-0 flex items-center justify-center p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="max-h-full max-w-full object-contain filter drop-shadow-md"
                      />
                    </div>

                    {/* Sizing, color specs details */}
                    <div className="flex flex-col justify-between py-1">
                      <div>
                        <h3 className="font-display text-sm sm:text-base font-extrabold uppercase text-black leading-tight">
                          {item.name}
                        </h3>
                        <p className="font-mono text-[10px] sm:text-xs text-gray-400 uppercase font-bold tracking-wider mt-1.5">
                          SIZE: US {item.size} <span className="mx-1">•</span> COLOR: {item.color}
                        </p>
                      </div>

                      {/* Quantity Controls and Remove */}
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center border border-black">
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            className="px-2.5 py-0.5 font-mono text-xs font-bold text-black hover:bg-gray-100 border-r border-black"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-mono text-[11px] font-bold text-black">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            className="px-2.5 py-0.5 font-mono text-xs font-bold text-black hover:bg-gray-100 border-l border-black"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="text-gray-400 hover:text-[#E4002B] p-1.5 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right block: Subtotal price value */}
                  <div className="flex flex-col justify-between items-end py-1 shrink-0">
                    <span className="font-mono text-xs sm:text-sm font-bold text-black">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                    <span className="font-mono text-[10px] text-gray-400 uppercase">
                      {formatPrice(item.price)} EACH
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Clear Cart control */}
            <div className="pt-4 text-left">
              <button
                onClick={clearCart}
                className="font-mono text-[10px] font-bold text-gray-400 hover:text-black uppercase tracking-widest border-b border-transparent hover:border-black transition-all pb-0.5"
              >
                EMPTY ENTIRE BAG
              </button>
            </div>
          </div>

          {/* Checkout Order Summary (4 Columns) */}
          <div className="lg:col-span-4 bg-white border-2 border-black p-6 sm:p-8 space-y-6">
            <h2 className="font-display text-sm font-bold tracking-widest uppercase text-black border-b border-black/10 pb-3">
              ORDER SUMMARY
            </h2>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between text-gray-500">
                <span>BAG SUB-TOTAL</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>ATHLETIC DISPATCH</span>
                <span className="text-green-600 font-semibold uppercase">FREE SHIP</span>
              </div>
              <div className="border-t border-black/10 pt-3 flex justify-between font-display text-base font-bold text-black">
                <span>GRAND TOTAL</span>
                <span className="text-[#E4002B]">{formatPrice(subtotal)}</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {/* Buy All button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-[#0D0D0D] border-2 border-[#0D0D0D] text-white hover:bg-white hover:text-black py-4 font-display font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-2 transition-all duration-200"
              >
                <Send className="h-4 w-4 shrink-0" />
                CONSOLIDATE & ORDER (WHATSAPP)
              </button>

              <button
                onClick={() => { setCurrentPage('store'); window.scrollTo(0,0); }}
                className="w-full bg-white border-2 border-black text-black hover:bg-gray-50 py-4 font-display font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-1 transition-all duration-150"
              >
                CONTINUE SHOPPING
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="bg-[#FAFAFA] p-4 border border-black/5 flex gap-3 items-start">
              <ShieldCheck className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-display text-[10px] font-bold text-black uppercase tracking-wider">
                  SECURE WHATSAPP ORDER
                </h4>
                <p className="text-[10px] text-gray-400 leading-normal">
                  No payment cards required. Click checkout to open a secure direct chat with our Colombo depot to confirm sizing and delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Empty state */
        <div className="border-3 border-dashed border-black/10 py-24 text-center space-y-5">
          <div className="w-16 h-16 bg-gray-50 border border-black/10 rounded-full flex items-center justify-center mx-auto text-gray-400">
            <ShoppingBag className="h-6 w-6 stroke-[1.5]" />
          </div>
          <h2 className="font-display text-lg font-bold uppercase text-black">
            YOUR BAG IS EMPTY
          </h2>
          <p className="text-gray-500 text-sm max-w-sm mx-auto">
            Nothing here yet. Let's find your pair of elite athletic sneakers.
          </p>
          <button
            onClick={() => { setCurrentPage('store'); window.scrollTo(0,0); }}
            className="bg-black hover:bg-[#E4002B] text-white py-4 px-8 font-display text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2 transition-all duration-150"
          >
            DISCOVER THE STORE
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};
