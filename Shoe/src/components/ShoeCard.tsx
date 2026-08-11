import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Send } from 'lucide-react';
import { Shoe } from '../types';
import { formatPrice } from '../lib/config';

interface ShoeCardProps {
  shoe: Shoe;
  onSelect: (shoe: Shoe) => void;
}

export const ShoeCard: React.FC<ShoeCardProps> = ({ shoe, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(shoe)}
      className="bg-white p-6 cursor-pointer flex flex-col justify-between transition-all duration-300 relative group border border-transparent hover:border-black/5"
    >
      {/* Corner Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {shoe.bestSelling && (
          <span className="bg-[#E4002B] text-white text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 font-bold">
            BESTSELLER
          </span>
        )}
        {shoe.mostPicked && (
          <span className="bg-black text-white text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 font-bold">
            NEW DROP
          </span>
        )}
      </div>

      {/* Floating Shoe Shot Showcase */}
      <div className="relative bg-[#FAFAFA] w-full aspect-square flex items-center justify-center p-4 mb-6 overflow-hidden">
        {/* Background text decoration */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-display font-black text-8xl tracking-tight text-black/5 uppercase">
            {shoe.category[0]}
          </span>
        </div>

        {/* Floating image with micro-animation */}
        <motion.img
          whileHover={{ scale: 1.1, rotate: -4 }}
          transition={{ type: 'spring', stiffness: 260, damping: 15 }}
          src={shoe.image}
          alt={shoe.name}
          referrerPolicy="no-referrer"
          className="max-h-full max-w-full object-contain filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.12)]"
        />
      </div>

      {/* Product Information */}
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="font-display text-sm font-extrabold uppercase text-black tracking-tight group-hover:text-[#E4002B] transition-colors leading-tight">
            {shoe.name}
          </h3>
          <span className="font-mono text-xs font-bold text-gray-400 shrink-0 uppercase ml-2">
            {shoe.category}
          </span>
        </div>

        {/* Price and Color Swatches */}
        <div className="flex justify-between items-center pt-1">
          <span className="font-mono text-sm font-bold text-black">
            {formatPrice(shoe.price)}
          </span>
          
          {/* Color swatch indicator dots */}
          <div className="flex gap-1.5">
            {shoe.colors.map((color, i) => (
              <span
                key={color}
                title={color}
                className={`w-2.5 h-2.5 rounded-full border border-black/10 ${
                  i === 0 ? 'bg-[#E4002B]' : i === 1 ? 'bg-[#0D0D0D]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Direct Action buttons (prevent card selection bubble) */}
        <div className="grid grid-cols-2 gap-2 pt-4 border-t border-black/5 mt-2">
          {/* Add to Bag (black fill primary) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(shoe);
            }}
            className="bg-black hover:bg-black/90 border border-black text-white text-[10px] font-display font-bold uppercase tracking-wider py-3 flex items-center justify-center gap-1.5 transition-all duration-150"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            BUY NOW
          </button>

          {/* Quick Buy Now on WhatsApp (red outline secondary) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(shoe);
            }}
            className="bg-transparent hover:bg-[#E4002B] hover:text-white border border-[#E4002B] text-[#E4002B] text-[10px] font-display font-bold uppercase tracking-wider py-3 flex items-center justify-center gap-1.5 transition-all duration-150"
          >
            <Send className="h-3.5 w-3.5" />
            DETAILS
          </button>
        </div>
      </div>
    </div>
  );
};
