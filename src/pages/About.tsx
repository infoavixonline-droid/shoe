import React from 'react';
import { ShieldCheck, Zap, HeartHandshake } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="space-y-20 pb-20">
      {/* 1. Header Banner */}
      <section className="bg-black text-white py-20 border-b-3 border-black relative overflow-hidden">
        {/* Abstract design elements */}
        <div className="absolute inset-y-0 right-0 w-1/3 bg-[#E4002B]/10 skew-x-12 transform origin-bottom-right" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <span className="font-mono text-xs font-bold tracking-widest text-[#E4002B] uppercase">
            WHO WE ARE
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-black tracking-tighter uppercase leading-none">
            MOVE <span className="text-[#E4002B]">DIFFERENT.</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            We exist to fuel progress. Born on the tracks and bred for the streets, we craft elite athletic gear for those who reject the ordinary.
          </p>
        </div>
      </section>

      {/* 2. Bold Brand Story Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Brand Story Details */}
          <div className="space-y-6">
            <span className="font-mono text-xs font-bold tracking-widest text-[#E4002B] uppercase">
              OUR MISSION
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-black tracking-tight leading-tight">
              REDEFINING APEX COMFORT AND SPEED
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              At FLARE, we believe that every human is an athlete. Our obsession with research, premium materials, and responsive foam technology drives us to design sneakers that absorb maximum impact while feeding explosive kinetic energy right back to your stride.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Founded in 2020, we started as a small, specialized speed-testing laboratory in Colombo. Today, we supply runners, ballers, and creators across the island with high-caliber, head-turning athletic footwear. We don't just sell shoes—we forge the vehicles of your personal momentum.
            </p>
          </div>

          {/* Graphic Side Card */}
          <div className="bg-black text-white p-8 sm:p-12 border-3 border-black relative overflow-hidden flex flex-col justify-between h-96">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E4002B]/20 rounded-full filter blur-3xl pointer-events-none" />
            <div>
              <span className="text-[#E4002B] text-xs font-mono font-bold tracking-widest block mb-4">
                THE MANIFESTO
              </span>
              <p className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight leading-tight">
                "THE ONLY INCORRECT MOVE IS STANDING STILL."
              </p>
            </div>
            <p className="text-xs font-mono text-gray-400 tracking-wider">
              — FLARE ATHLETICS DESIGN LABS
            </p>
          </div>
        </div>
      </section>

      {/* 3. Stat Strip (Red values on athletic Black band) */}
      <section className="bg-[#0D0D0D] text-white py-12 border-y-3 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: '200+', label: 'Premium Styles' },
              { num: '50,000+', label: 'Active Runners' },
              { num: '100%', label: 'LKR Pricing' },
              { num: '2020', label: 'Est. Year' },
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="font-display text-3xl sm:text-5xl font-extrabold tracking-tighter text-[#E4002B]">
                  {stat.num}
                </div>
                <div className="font-mono text-[10px] tracking-widest text-gray-400 uppercase font-bold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Core Values Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b-3 border-black pb-4 mb-12 text-center">
          <span className="font-mono text-xs font-bold tracking-widest text-[#E4002B] uppercase">
            FLARE STANDARDS
          </span>
          <h2 className="font-display text-3xl font-extrabold uppercase text-black tracking-tight mt-1">
            WHY WE ARE DIFFERENT
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="h-8 w-8 text-[#E4002B] shrink-0" />,
              title: 'ENERGY RETURN TECH',
              desc: 'Our proprietary foam cells compact on foot strike and expand instantly, returning over 85% of kinetic energy to propel your next stride forward.'
            },
            {
              icon: <ShieldCheck className="h-8 w-8 text-[#E4002B] shrink-0" />,
              title: 'MAX ACCURACY SIZING',
              desc: 'Engineered true-to-size. Designed with precise digital templates mapping the anatomical dynamics of high-friction foot movements.'
            },
            {
              icon: <HeartHandshake className="h-8 w-8 text-[#E4002B] shrink-0" />,
              title: 'COMMUNITY CONNECTED',
              desc: 'Direct order flow via WhatsApp connects you to a real human shoe expert. We check size specs personally to ensure your absolute fit.'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 border border-black/10 hover:border-black transition-colors space-y-4">
              <div className="p-3 bg-gray-50 border border-black/5 w-fit">
                {item.icon}
              </div>
              <h3 className="font-display text-sm font-extrabold tracking-wider text-black uppercase">
                {item.title}
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
