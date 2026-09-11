import React from 'react';
import { brandConfig, getWhatsAppUrl } from '../../config/brandConfig';
import { MessageSquare, ShieldCheck, ArrowRight, BookCheck } from 'lucide-react';

interface AboutSectionProps {
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick }) => {
  return (
    <section id="about" className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Professional Visual / Abstract Accounting Composition with Original Logo Accent */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
              
              {/* Decorative accent top bar */}
              <div className="absolute -top-3 left-10 right-10 h-3 bg-gradient-to-r from-brand-navy-900 via-amber-500 to-brand-navy-800 rounded-t-xl" />

              {/* Logo Badge in Corner */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <img 
                    src={brandConfig.logoUrl} 
                    alt="Manage With Bhairav Crest" 
                    className="w-14 h-14 object-cover rounded-full shadow-md border border-slate-200"
                  />
                  <div>
                    <h4 className="font-display font-bold text-base text-[#0B1B36]">
                      {brandConfig.businessName}
                    </h4>
                    <p className="text-xs text-slate-500">{brandConfig.tagline}</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  Verified Practice
                </span>
              </div>

              {/* Accounting Metrics & Features Representation */}
              <div className="py-6 space-y-4">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-500 text-white">
                      <BookCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">Tax &amp; Bookkeeping Precision</div>
                      <div className="text-sm font-bold text-slate-800">100% Statutory Adherence</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-600">Active</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#0B1B36] text-white">
                      <ShieldCheck className="w-4 h-4 text-amber-400" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">Data Security &amp; Confidentiality</div>
                      <div className="text-sm font-bold text-slate-800">Protected Client Records</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600">Encrypted</span>
                </div>
              </div>

              {/* Core Commitment Tag */}
              <div className="pt-2 text-center">
                <p className="text-xs font-medium text-slate-500 italic">
                  &ldquo;Clear communication, organized documentation, dependable assistance.&rdquo;
                </p>
              </div>

            </div>
          </div>

          {/* RIGHT: About Copy & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-navy-50 border border-brand-navy-200 text-brand-navy-900 text-xs font-semibold uppercase tracking-wider mb-4">
              About Us
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1B36] tracking-tight mb-6">
              About Manage With Bhairav
            </h2>

            {/* Exactly requested text from user prompt */}
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Manage With Bhairav provides accounting, GST, ITR and business support services with a focus on clear communication, organized documentation and dependable assistance.
            </p>

            <p className="text-base text-slate-600 leading-relaxed mb-8">
              Whether you are an individual employee filing your annual tax return, a retailer managing month-to-month GST filings, or an emerging firm setting up structured accounting ledgers, we provide hands-on, reliable guidance every step of the way without unnecessary complexity.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={onContactClick}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#0B1B36] hover:bg-brand-navy-800 shadow-md hover:shadow-lg transition-all"
              >
                <span>Talk to Us</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>

              <a
                href={getWhatsAppUrl(brandConfig.whatsappMessages.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm transition-all"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Discussion</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
