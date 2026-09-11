import React from 'react';
import { MessageSquareText, FolderKanban, Headphones, TrendingUp, CheckCircle } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const benefits = [
    {
      title: "Simple Communication",
      desc: "No confusing accounting jargon or complex tax phrases. We communicate clearly in plain language so you always understand your exact financial position.",
      icon: MessageSquareText,
      accent: "from-blue-500/10 to-indigo-500/10",
      iconColor: "text-blue-600",
    },
    {
      title: "Organized Process",
      desc: "Structured document collation, structured filing timelines, and methodical verification to ensure error-free submissions and avoid penalties.",
      icon: FolderKanban,
      accent: "from-amber-500/10 to-orange-500/10",
      iconColor: "text-amber-600",
    },
    {
      title: "Direct Assistance",
      desc: "You deal directly with dedicated professionals who understand Indian taxation nuances, rather than an anonymous automated chatbot or ticketing queue.",
      icon: Headphones,
      accent: "from-emerald-500/10 to-teal-500/10",
      iconColor: "text-emerald-600",
    },
    {
      title: "Business-Focused Support",
      desc: "Practical advice and documentation designed to safeguard your cash flow, optimize legitimate tax exemptions, and foster commercial growth.",
      icon: TrendingUp,
      accent: "from-purple-500/10 to-pink-500/10",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-3">
            Why Manage With Bhairav
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1B36] tracking-tight mb-4">
            Professional Support Without the Complexity
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            We bridge the gap between complex statutory compliances and practical business convenience.
          </p>
        </div>

        {/* 4 Clean Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-7 sm:p-8 hover:bg-white hover:shadow-xl hover:border-slate-300 transition-all duration-300 group flex flex-col sm:flex-row gap-5 items-start"
              >
                <div className={`p-4 rounded-xl bg-white shadow-sm border border-slate-200/70 group-hover:scale-105 transition-transform flex-shrink-0 ${item.iconColor}`}>
                  <Icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-[#0B1B36] mb-2.5 group-hover:text-brand-navy-800">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {item.desc}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Dependable &amp; Timely Service</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
