import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Send, AlertTriangle } from 'lucide-react';
import { Shoe } from '../types';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/config';
import { getWhatsAppBuyNowLink } from '../lib/whatsapp';

interface ShoeDetailModalProps {
  shoe: Shoe | null;
  onClose: () => void;
}

export const ShoeDetailModal: React.FC<ShoeDetailModalProps> = ({ shoe, onClose }) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [showSizeWarning, setShowSizeWarning] = useState<boolean>(false);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  // Reset states when a new shoe is selected
  useEffect(() => {
    if (shoe) {
      setSelectedSize('');
      setSelectedColor(shoe.colors[0] || '');
      setQuantity(1);
      setShowSizeWarning(false);
      setIsAdded(false);
      // Prevent body scrolling
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [shoe]);

  if (!shoe) return null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowSizeWarning(true);
      return;
    }
    addToCart(shoe, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1500);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setShowSizeWarning(true);
      return;
    }
    const link = getWhatsAppBuyNowLink(shoe.name, selectedSize, quantity, shoe.price);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-100 overflow-y-auto flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0D0D0D]"
        />

        {/* Modal container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="relative bg-white w-full max-w-4xl rounded-none shadow-2xl border-3 border-black overflow-hidden z-10 grid grid-cols-1 md:grid-cols-2"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 bg-black text-white hover:bg-[#E4002B] transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Left Column: Interactive Image Gallery/Showcase */}
          <div className="relative bg-[#FAFAFA] flex flex-col justify-center items-center p-8 md:p-12 border-b-3 md:border-b-0 md:border-r-3 border-black group">
            {/* Athletic Background Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
              <span className="font-display font-black text-[120px] md:text-[150px] tracking-tighter sport-outline-text opacity-15 transform uppercase -rotate-12">
                {shoe.category}
              </span>
            </div>

            {/* Product Tag */}
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-black text-white text-[10px] font-mono tracking-widest uppercase px-3 py-1 font-bold">
                {shoe.category} GEAR
              </span>
            </div>

            {/* Floating Shoe Photo */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: -3 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative w-full max-w-[320px] aspect-square flex items-center justify-center drop-shadow-[0_20px_25px_rgba(0,0,0,0.15)] z-10"
            >
              <img
                src={shoe.image}
                alt={shoe.name}
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain filter"
              />
            </motion.div>

            {/* Price badge under shoe */}
            <div className="z-10 bg-black text-white py-1.5 px-4 font-mono text-base font-bold tracking-wider uppercase mt-4">
              {formatPrice(shoe.price)}
            </div>
          </div>

          {/* Right Column: Custom Configuration & Details */}
          <div className="p-8 md:p-10 flex flex-col justify-between space-y-8">
            {/* Section 1: Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {shoe.bestSelling && (
                  <span className="text-[#E4002B] text-[10px] font-mono tracking-widest uppercase font-bold">
                    BEST SELLER
                  </span>
                )}
                {shoe.mostPicked && (
                  <span className="text-black text-[10px] font-mono tracking-widest uppercase font-bold bg-gray-100 px-2 py-0.5">
                    MOST PICKED
                  </span>
                )}
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight uppercase text-black">
                {shoe.name}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mt-4">
                {shoe.description}
              </p>
            </div>

            {/* Section 2: Config Selectors */}
            <div className="space-y-5">
              {/* Size Selectors */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="font-display text-xs font-bold tracking-widest uppercase text-black">
                    SELECT SIZE (US)
                  </label>
                  {showSizeWarning && !selectedSize && (
                    <span className="text-[#E4002B] text-xs font-semibold flex items-center gap-1 animate-bounce">
                      <AlertTriangle className="h-3.5 w-3.5" /> REQUIRED
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {shoe.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => {
                          setSelectedSize(size);
                          setShowSizeWarning(false);
                        }}
                        className={`py-2 text-center font-mono text-xs font-bold border transition-all duration-150 ${
                          isSelected
                            ? 'bg-black border-black text-white'
                            : 'border-black/20 text-black hover:border-black'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Color Swatch Selectors */}
              <div>
                <label className="font-display text-xs font-bold tracking-widest uppercase text-black block mb-2">
                  COLORWAY: <span className="font-sans font-medium text-gray-500 normal-case">{selectedColor}</span>
                </label>
                <div className="flex gap-2">
                  {shoe.colors.map((color) => {
                    const isSelected = selectedColor === color;
                    return (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 text-xs font-medium border uppercase tracking-wider transition-all duration-150 ${
                          isSelected
                            ? 'bg-black border-black text-white'
                            : 'border-black/20 text-gray-600 hover:border-black'
                        }`}
                      >
                        {color}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="font-display text-xs font-bold tracking-widest uppercase text-black block mb-2">
                  QUANTITY
                </label>
                <div className="flex items-center w-28 border border-black">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 font-mono text-sm font-bold text-black hover:bg-gray-100 border-r border-black"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-mono text-xs font-bold text-black">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 font-mono text-sm font-bold text-black hover:bg-gray-100 border-l border-black"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Section 3: Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-black/10">
              <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`w-full py-4 font-display font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-2 border-2 transition-all duration-200 ${
                  isAdded
                    ? 'bg-green-600 border-green-600 text-white cursor-default'
                    : 'bg-black border-black text-white hover:bg-white hover:text-black'
                }`}
              >
                <ShoppingBag className="h-4 w-4" />
                {isAdded ? 'ADDED TO BAG' : 'ADD TO BAG'}
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full bg-[#E4002B] border-2 border-[#E4002B] text-white py-4 font-display font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-transparent hover:text-[#E4002B] transition-all duration-200"
              >
                <Send className="h-4 w-4" />
                BUY NOW (WHATSAPP)
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
