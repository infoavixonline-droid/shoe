import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../lib/config';

interface FooterProps {
  setCurrentPage: (page: string) => void;
  setSelectedCategory?: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage, setSelectedCategory }) => {
  const currentYear = 2026;

  const handleCategoryClick = (category: string) => {
    if (setSelectedCategory) {
      setSelectedCategory(category);
    }
    setCurrentPage('store');
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-[#0D0D0D] text-white border-t-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <span className="font-display text-3xl font-extrabold tracking-tighter text-white uppercase block">
              FLARE<span className="text-[#E4002B]">.</span>
            </span>
            <p className="text-gray-400 text-sm font-sans max-w-xs leading-relaxed">
              Move different. Engineered to perform, designed to stand out. Our gear empowers everyday athletes to shatter records and boundaries.
            </p>
            {/* Social Links */}
            <div className="flex flex-wrap gap-3 pt-2">
              {['Instagram', 'Facebook', 'TikTok', 'WhatsApp'].map((platform) => {
                const url = platform === 'WhatsApp' 
                  ? `https://wa.me/${WHATSAPP_NUMBER}` 
                  : '#';
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="border border-white/20 px-3 py-1 text-[10px] font-mono tracking-widest uppercase hover:bg-[#E4002B] hover:border-[#E4002B] hover:text-white transition-all duration-200"
                  >
                    {platform}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold tracking-widest uppercase text-[#E4002B]">
              NAVIGATE
            </h3>
            <ul className="space-y-2 text-sm text-gray-400 font-medium">
              {[
                { name: 'Home', id: 'home' },
                { name: 'Store Catalog', id: 'store' },
                { name: 'About Us', id: 'about' },
                { name: 'Contact & Support', id: 'contact' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => { setCurrentPage(link.id); window.scrollTo(0,0); }}
                    className="hover:text-white transition-colors duration-150 uppercase tracking-wider text-xs"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Category Shortcuts */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold tracking-widest uppercase text-[#E4002B]">
              CATEGORIES
            </h3>
            <ul className="space-y-2 text-sm text-gray-400 font-medium">
              {['Running', 'Basketball', 'Lifestyle', 'Training', 'Football'].map((category) => (
                <li key={category}>
                  <button
                    onClick={() => handleCategoryClick(category)}
                    className="hover:text-white transition-colors duration-150 uppercase tracking-wider text-xs text-left"
                  >
                    {category} Gear
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold tracking-widest uppercase text-[#E4002B]">
              HEADQUARTERS
            </h3>
            <ul className="space-y-3 text-xs text-gray-400 font-mono">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#E4002B] shrink-0" />
                <span>102 Galle Road, Colombo 03, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#E4002B] shrink-0" />
                <span>+94 77 123 4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#E4002B] shrink-0" />
                <span>support@flareathletics.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider and Copyright */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono tracking-wider text-gray-500">
          <p>© {currentYear} FLARE ATHLETICS. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">TERMS OF SERVICE</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
