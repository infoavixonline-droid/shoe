import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage }) => {
  const { cartCount } = useCart();
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Store', id: 'store' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-3 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo Wordmark */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => { setCurrentPage('home'); window.scrollTo(0,0); }}>
            <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tighter text-black uppercase block">
              FLARE<span className="text-[#E4002B]">.</span>
            </span>
            <span className="font-mono text-[9px] tracking-[0.25em] text-gray-400 block -mt-1 font-bold">
              ATHLETIC DEPT.
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 lg:space-x-12">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => { setCurrentPage(link.id); window.scrollTo(0,0); }}
                  className={`relative py-2 text-sm font-display font-bold uppercase tracking-widest text-black transition-colors duration-200 hover:text-[#E4002B] ${
                    isActive ? 'text-black' : 'text-black/70'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#E4002B]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Cart Icon and Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => { setCurrentPage('cart'); window.scrollTo(0,0); }}
              className="relative p-2 text-black hover:text-[#E4002B] transition-colors duration-200"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="h-6 w-6 stroke-[2]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#E4002B] text-white font-mono text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-black hover:text-[#E4002B] transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6 stroke-[2.5]" /> : <Menu className="h-6 w-6 stroke-[2.5]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {isOpen && (
        <div className="md:hidden bg-white border-t-2 border-black/10 py-4 px-4 space-y-3">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setCurrentPage(link.id);
                  setIsOpen(false);
                  window.scrollTo(0,0);
                }}
                className={`block w-full text-left px-4 py-3 text-base font-display font-bold uppercase tracking-widest border-l-4 transition-all ${
                  isActive
                    ? 'border-[#E4002B] bg-gray-50 text-black'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-black'
                }`}
              >
                {link.name}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
};
