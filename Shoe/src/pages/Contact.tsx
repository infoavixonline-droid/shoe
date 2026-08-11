import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ShieldAlert } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../lib/config';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all requested fields.');
      return;
    }

    // Client-side confirmation flow
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* 1. Header block */}
      <div className="border-b-3 border-black pb-6">
        <span className="font-mono text-xs font-bold tracking-widest text-[#E4002B] uppercase">
          GET IN TOUCH
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold uppercase text-black tracking-tight mt-1">
          CONTACT US
        </h1>
        <p className="text-gray-500 text-sm mt-2 max-w-xl">
          Have questions about fit, custom orders, or delivery speeds? Our elite athletic customer support crew is standing by.
        </p>
      </div>

      {/* 2. Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Form (7 columns on large) */}
        <div className="lg:col-span-7 bg-white border-2 border-black p-8 relative">
          <h2 className="font-display text-xl font-bold uppercase text-black tracking-wider mb-6">
            SEND A DIRECT INQUIRY
          </h2>

          {isSubmitted ? (
            <div className="bg-green-50 border-2 border-green-600 p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left transition-all">
              <CheckCircle2 className="h-10 w-10 text-green-600 shrink-0" />
              <div>
                <h3 className="font-display text-sm font-bold text-green-800 uppercase tracking-wider">
                  MESSAGE TRANSMITTED SUCCESSFULLY
                </h3>
                <p className="text-xs text-green-700 font-medium mt-1">
                  Thank you for reaching out to FLARE. Our support athletes will reply to your email within 24 business hours.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-300 p-4 text-xs font-medium text-red-600 flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="font-display text-xs font-bold tracking-wider text-black uppercase block">
                  YOUR NAME
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full bg-[#FAFAFA] border border-black/20 focus:border-black p-3 font-sans text-xs focus:outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-display text-xs font-bold tracking-wider text-black uppercase block">
                  YOUR EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. johndoe@example.com"
                  className="w-full bg-[#FAFAFA] border border-black/20 focus:border-black p-3 font-sans text-xs focus:outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-display text-xs font-bold tracking-wider text-black uppercase block">
                  YOUR MESSAGE
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your inquiry, sizing concerns, or feedback in detail..."
                  rows={5}
                  className="w-full bg-[#FAFAFA] border border-black/20 focus:border-black p-3 font-sans text-xs focus:outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="bg-black hover:bg-[#E4002B] text-white py-4 px-8 font-display text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-200"
              >
                <Send className="h-4 w-4" />
                TRANSMIT MESSAGE
              </button>
            </form>
          )}
        </div>

        {/* Right Info Details (5 columns on large) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-black text-white p-8 border-3 border-black space-y-6">
            <h2 className="font-display text-lg font-bold uppercase text-[#E4002B] tracking-widest border-b border-white/15 pb-3">
              ATHLETICS DISPATCH
            </h2>

            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-[#E4002B] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-display text-xs font-bold tracking-wider uppercase block text-white">
                    PHYSICAL DEPOT
                  </span>
                  <span className="text-gray-400 text-xs">
                    102 Galle Road, Colombo 03, Sri Lanka
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <Phone className="h-5 w-5 text-[#E4002B] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-display text-xs font-bold tracking-wider uppercase block text-white">
                    WHATSAPP ORDERLINE
                  </span>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-400 text-xs hover:text-[#E4002B] transition-colors font-mono"
                  >
                    +94 77 123 4567 (Tap to Message)
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <Mail className="h-5 w-5 text-[#E4002B] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-display text-xs font-bold tracking-wider uppercase block text-white">
                    EMAIL DISPATCH
                  </span>
                  <span className="text-gray-400 text-xs font-mono">
                    support@flareathletics.com
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <Clock className="h-5 w-5 text-[#E4002B] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-display text-xs font-bold tracking-wider uppercase block text-white">
                    DEPOT HOURS
                  </span>
                  <span className="text-gray-400 text-xs leading-relaxed block">
                    Mon - Sat: 9:00 AM - 8:00 PM<br />
                    Sun & Holidays: 10:00 AM - 6:00 PM LKR
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Social icons block */}
          <div className="bg-white border border-black/10 p-8 space-y-4">
            <h3 className="font-display text-xs font-bold tracking-widest uppercase text-black">
              FOLLOW THE MOVEMENT
            </h3>
            <p className="text-gray-500 text-xs leading-relaxed">
              Stay updated on fresh sneaker drops, custom speed laboratory testing results, and seasonal sales campaigns.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-2">
              {['Instagram', 'Facebook', 'TikTok', 'WhatsApp'].map((social) => {
                const href = social === 'WhatsApp' ? `https://wa.me/${WHATSAPP_NUMBER}` : '#';
                return (
                  <a
                    key={social}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-center py-2.5 border border-black/20 font-display text-[10px] font-bold uppercase tracking-widest text-black hover:bg-[#E4002B] hover:border-[#E4002B] hover:text-white transition-all duration-150"
                  >
                    {social}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
