import React from 'react';
import { Shoe } from '../types';
import { ShoeCard } from '../components/ShoeCard';
import { ArrowRight, Sparkles, Flame, Trophy } from 'lucide-react';
import shoesData from '../data/shoes.json';

interface HomeProps {
  setCurrentPage: (page: string) => void;
  onSelectShoe: (shoe: Shoe) => void;
}

export const Home: React.FC<HomeProps> = ({ setCurrentPage, onSelectShoe }) => {
  const shoes = shoesData as Shoe[];

  // 1. Most Picked
  const mostPickedShoes = shoes.filter((s) => s.mostPicked);

  // 2. Latest Drops - sorted by dateAdded, newest first
  const latestDrops = [...shoes]
    .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
    .slice(0, 3);

  // 3. Best Sellers
  const bestSellers = shoes.filter((s) => s.bestSelling);

  // Use the first shoe as the massive Hero centerpiece
  const heroShoe = shoes[0];

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#FAFAFA] border-b-3 border-black overflow-hidden pt-12 pb-24 md:py-32">
        {/* Massive Background Logo Accent */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="font-display font-black text-[150px] sm:text-[250px] md:text-[350px] text-black/5 tracking-tighter transform -rotate-6 uppercase">
            FLARE
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Left Hero Details */}
          <div className="md:col-span-6 space-y-6 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 border border-black/10 bg-white font-mono text-[10px] font-bold tracking-widest text-[#E4002B] uppercase">
              <Flame className="h-3.5 w-3.5 animate-pulse" /> RUN THE STREETS
            </span>
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-black uppercase leading-none">
              STEP <span className="text-[#E4002B]">UP.</span>
            </h1>
            <p className="text-gray-500 font-sans text-base sm:text-lg max-w-lg leading-relaxed mx-auto md:mx-0">
              Break rules. Set records. The brand-new <strong className="text-black font-semibold">Velocity Runner X</strong> is engineered with adaptive carbon plate performance to propel you forward with zero lag.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <button
                onClick={() => { setCurrentPage('store'); window.scrollTo(0,0); }}
                className="bg-black hover:bg-white border-2 border-black text-white hover:text-black font-display text-xs font-bold tracking-widest uppercase px-8 py-5 flex items-center justify-center gap-2 transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
              >
                SHOP THE COLLECTION
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => onSelectShoe(heroShoe)}
                className="bg-white hover:bg-gray-50 border-2 border-black text-black font-display text-xs font-bold tracking-widest uppercase px-8 py-5 transition-all duration-200"
              >
                DISCOVER {heroShoe.name}
              </button>
            </div>
          </div>

          {/* Right Hero Giant Shoe Shot */}
          <div className="md:col-span-6 flex justify-center items-center relative py-8">
            {/* Subtle glow circle backdrop */}
            <div className="absolute w-72 sm:w-96 aspect-square bg-gradient-to-tr from-[#E4002B]/10 to-transparent rounded-full filter blur-3xl" />
            <img
              src={heroShoe.image}
              alt={heroShoe.name}
              referrerPolicy="no-referrer"
              className="max-h-[300px] sm:max-h-[420px] md:max-h-[480px] object-contain transform -rotate-12 hover:rotate-0 hover:scale-105 transition-all duration-500 ease-out filter drop-shadow-[0_25px_30px_rgba(0,0,0,0.18)]"
            />
          </div>
        </div>
      </section>

      {/* 2. JUST LANDED TICKER STRIP */}
      <div className="bg-[#0D0D0D] py-4 overflow-hidden border-y-2 border-black select-none pointer-events-none">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array(8).fill("").map((_, i) => (
            <span key={i} className="font-display text-xs sm:text-sm font-extrabold tracking-widest text-white uppercase mx-8 flex items-center gap-3">
              <Sparkles className="h-4 w-4 text-[#E4002B] shrink-0" /> JUST LANDED
              <span className="text-gray-500">•</span>
              <Flame className="h-4 w-4 text-[#E4002B] shrink-0" /> PREMIUM SELECTIONS
              <span className="text-gray-500">•</span>
              <Trophy className="h-4 w-4 text-[#E4002B] shrink-0" /> ALL ATHLETES WELCOME
            </span>
          ))}
        </div>
      </div>

      {/* 3. MOST PICKED SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b-3 border-black pb-4 mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <span className="font-mono text-xs font-bold tracking-widest text-[#E4002B] uppercase">
              TOP PERFORMERS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-black tracking-tight mt-1">
              MOST PICKED GEAR
            </h2>
          </div>
          <button
            onClick={() => { setCurrentPage('store'); window.scrollTo(0,0); }}
            className="group font-display text-xs font-bold tracking-widest uppercase text-black hover:text-[#E4002B] flex items-center gap-1.5 transition-colors"
          >
            SEE ALL PRODUCTS
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mostPickedShoes.map((shoe) => (
            <ShoeCard key={shoe.id} shoe={shoe} onSelect={onSelectShoe} />
          ))}
        </div>
      </section>

      {/* 4. HIGH-IMPACT PROMOTIONAL BOX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-black text-white p-8 sm:p-12 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border-3 border-black">
          {/* Decorative background stripes */}
          <div className="absolute inset-y-0 right-0 w-1/2 opacity-10 bg-grid-pattern pointer-events-none" />

          <div className="space-y-4 max-w-xl text-center md:text-left">
            <span className="bg-[#E4002B] text-white text-[10px] font-mono tracking-widest uppercase px-3 py-1 font-bold">
              SEASONAL CAMPAIGN
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight leading-none text-white">
              ENGINEERED FOR THE UNSTOPPABLE
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              We stand for the dreamers, the run-until-sundown warriors, and the speed seekers. Our premium athletic materials are designed to cushion impact and return boundless explosive energy.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => { setCurrentPage('store'); window.scrollTo(0,0); }}
              className="bg-white hover:bg-[#E4002B] hover:text-white text-black font-display text-xs font-bold tracking-widest uppercase px-8 py-5 transition-all duration-200"
            >
              EXPLORE STORE
            </button>
          </div>
        </div>
      </section>

      {/* 5. LATEST DROPS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b-3 border-black pb-4 mb-10">
          <span className="font-mono text-xs font-bold tracking-widest text-[#E4002B] uppercase">
            FRESH CUTOUTS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-black tracking-tight mt-1">
            LATEST DROPS
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestDrops.map((shoe) => (
            <ShoeCard key={shoe.id} shoe={shoe} onSelect={onSelectShoe} />
          ))}
        </div>
      </section>

      {/* 6. BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b-3 border-black pb-4 mb-10">
          <span className="font-mono text-xs font-bold tracking-widest text-[#E4002B] uppercase">
            GOLD STANDARDS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-black tracking-tight mt-1">
            BEST SELLING SNEAKERS
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bestSellers.map((shoe) => (
            <ShoeCard key={shoe.id} shoe={shoe} onSelect={onSelectShoe} />
          ))}
        </div>
      </section>

      {/* 7. MOTIVATIONAL FOOTER BAND */}
      <section className="bg-black py-20 border-y-3 border-black">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="font-display text-4xl sm:text-6xl font-black tracking-tight text-white uppercase leading-none">
            CRAFTED FOR SPEED.<br />
            <span className="text-[#E4002B]">DESIGNED FOR POWER.</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
            Every sole is loaded with dynamic responsive compounds. Experience maximum lockdown, elite stability, and absolute comfort.
          </p>
          <div className="pt-4">
            <button
              onClick={() => { setCurrentPage('store'); window.scrollTo(0,0); }}
              className="bg-[#E4002B] hover:bg-white text-white hover:text-black font-display text-xs font-bold tracking-widest uppercase px-8 py-4 transition-all duration-200 border-2 border-[#E4002B] hover:border-white"
            >
              SHOP CATALOG NOW
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
