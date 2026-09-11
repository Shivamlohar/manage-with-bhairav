import React from 'react';
import { brandConfig } from '../../config/brandConfig';
import { ShieldCheck, FileText, PhoneCall, Briefcase } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const trustCards = [
    {
      num: "01",
      title: "Professional Support",
      description: "Dedicated assistance tailored to your specific accounting and compliance requirements.",
      icon: ShieldCheck,
    },
    {
      num: "02",
      title: "Simple Documentation",
      description: "Clear, straightforward document checklists without needless jargon or confusing paperwork.",
      icon: FileText,
    },
    {
      num: "03",
      title: "Direct Communication",
      description: "Reach our expert team quickly via phone or WhatsApp with fast, attentive responses.",
      icon: PhoneCall,
    },
    {
      num: "04",
      title: "Business-Focused Assistance",
      description: "Practical solutions designed to help proprietors and business owners concentrate on growth.",
      icon: Briefcase,
    },
  ];

  return (
    <section className="relative z-20 -mt-6 sm:-mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Brand Sub-header strip */}
      <div className="bg-[#0B1B36] dark:bg-[#071124] rounded-2xl shadow-xl p-6 sm:p-8 text-white border border-brand-navy-700 dark:border-slate-800 transition-colors duration-300">
        <div className="text-center mb-6">
          <p className="text-xs sm:text-sm font-semibold tracking-widest text-amber-400 uppercase">
            {brandConfig.tagline}
          </p>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight mt-1 text-slate-100">
            Dependable Financial &amp; Tax Solutions You Can Count On
          </h2>
        </div>

        {/* 4 Clean Trust Cards: 01 to 04 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-2">
          {trustCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.num}
                className="bg-white/5 hover:bg-white/10 dark:bg-slate-900/60 dark:hover:bg-slate-900/90 border border-white/10 dark:border-slate-800 rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/40 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-display text-2xl font-extrabold text-amber-400 group-hover:text-amber-300">
                      {card.num}
                    </span>
                    <div className="p-2 rounded-lg bg-white/10 dark:bg-slate-800 text-amber-300 group-hover:bg-amber-400/20 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-amber-200 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
