import React from 'react';
import { MessageSquareText, FolderKanban, Headphones, TrendingUp, CheckCircle } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const benefits = [
    {
      title: "Simple Communication",
      desc: "No confusing accounting jargon or complex tax phrases. We communicate clearly in plain language so you always understand your exact financial position.",
      icon: MessageSquareText,
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Organized Process",
      desc: "Structured document collation, structured filing timelines, and methodical verification to ensure error-free submissions and avoid penalties.",
      icon: FolderKanban,
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
      title: "Direct Assistance",
      desc: "You deal directly with dedicated professionals who understand Indian taxation nuances, rather than an anonymous automated chatbot or ticketing queue.",
      icon: Headphones,
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Business-Focused Support",
      desc: "Practical advice and documentation designed to safeguard your cash flow, optimize legitimate tax exemptions, and foster commercial growth.",
      icon: TrendingUp,
      iconColor: "text-purple-600 dark:text-purple-400",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-[#060D1B] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-50 dark:bg-slate-800 border border-amber-200 dark:border-slate-700 text-amber-800 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Why Manage With Bhairav
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1B36] dark:text-white tracking-tight mb-4">
            Professional Support Without the Complexity
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
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
                className="bg-slate-50/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-7 sm:p-8 hover:bg-white dark:hover:bg-slate-900 hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 group flex flex-col sm:flex-row gap-5 items-start"
              >
                <div className={`p-4 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200/70 dark:border-slate-700 group-hover:scale-105 transition-transform flex-shrink-0 ${item.iconColor}`}>
                  <Icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-[#0B1B36] dark:text-white mb-2.5 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {item.desc}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
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
