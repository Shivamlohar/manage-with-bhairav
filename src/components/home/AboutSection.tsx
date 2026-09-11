import React from 'react';
import { brandConfig, getWhatsAppUrl } from '../../config/brandConfig';
import { MessageSquare, ShieldCheck, ArrowRight, BookCheck } from 'lucide-react';

interface AboutSectionProps {
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick }) => {
  return (
    <section id="about" className="py-20 md:py-28 bg-slate-50 dark:bg-[#071124] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Professional Visual / Abstract Accounting Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl dark:shadow-dark-card border border-slate-200 dark:border-slate-800">
              
              {/* Decorative accent top bar */}
              <div className="absolute -top-3 left-10 right-10 h-3 bg-gradient-to-r from-brand-navy-900 via-amber-500 to-brand-navy-800 rounded-t-xl" />

              {/* Logo Badge in Corner */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <img 
                    src={brandConfig.logoUrl} 
                    alt="Manage With Bhairav Crest" 
                    className="w-14 h-14 object-cover rounded-full shadow-md border border-slate-200 dark:border-slate-700"
                  />
                  <div>
                    <h4 className="font-display font-bold text-base text-[#0B1B36] dark:text-white">
                      {brandConfig.businessName}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{brandConfig.tagline}</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
                  Verified Practice
                </span>
              </div>

              {/* Metrics & Features */}
              <div className="py-6 space-y-4">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-500 text-white dark:text-slate-950">
                      <BookCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Tax &amp; Bookkeeping Precision</div>
                      <div className="text-sm font-bold text-slate-800 dark:text-slate-200">100% Statutory Adherence</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400">Active</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#0B1B36] dark:bg-amber-500 text-white dark:text-slate-950">
                      <ShieldCheck className="w-4 h-4 text-amber-400 dark:text-slate-950" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Data Security &amp; Confidentiality</div>
                      <div className="text-sm font-bold text-slate-800 dark:text-slate-200">Protected Client Records</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Encrypted</span>
                </div>
              </div>

              {/* Core Commitment Tag */}
              <div className="pt-2 text-center">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 italic">
                  &ldquo;Clear communication, organized documentation, dependable assistance.&rdquo;
                </p>
              </div>

            </div>
          </div>

          {/* RIGHT: About Copy & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-navy-50 dark:bg-slate-800 border border-brand-navy-200 dark:border-slate-700 text-brand-navy-900 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
              About Us
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1B36] dark:text-white tracking-tight mb-6">
              About Manage With Bhairav
            </h2>

            <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed mb-6">
              Manage With Bhairav provides accounting, GST, ITR and business support services with a focus on clear communication, organized documentation and dependable assistance.
            </p>

            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Whether you are an individual employee filing your annual tax return, a retailer managing month-to-month GST filings, or an emerging firm setting up structured accounting ledgers, we provide hands-on, reliable guidance every step of the way without unnecessary complexity.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={onContactClick}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#0B1B36] dark:bg-amber-500 dark:text-slate-950 hover:bg-brand-navy-800 dark:hover:bg-amber-400 shadow-md hover:shadow-lg transition-all"
              >
                <span>Talk to Us</span>
                <ArrowRight className="w-4 h-4 text-amber-400 dark:text-slate-950" />
              </button>

              <a
                href={getWhatsAppUrl(brandConfig.whatsappMessages.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 shadow-sm transition-all"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>WhatsApp Discussion</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
