import React from 'react';
import { brandConfig, getWhatsAppUrl } from '../../config/brandConfig';
import { CheckCircle2, ArrowRight, MessageSquare, Shield, TrendingUp, Sparkles } from 'lucide-react';

interface HeroProps {
  onStartRequest: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartRequest }) => {
  return (
    <section id="home" className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 dark:from-[#060D1B] dark:via-[#08152B] dark:to-[#060D1B] transition-colors duration-300">
      
      {/* Background Accent Gradients & Geometric Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-200/20 dark:bg-amber-500/10 rounded-full blur-3xl animate-pulse-subtle" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-brand-navy-100/30 dark:bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 pattern-grid opacity-30 dark:opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Value Proposition & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-navy-50 dark:bg-slate-800/80 border border-brand-navy-200 dark:border-slate-700 text-brand-navy-900 dark:text-slate-200 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-ping" />
              <Shield className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Professional Accounting &amp; Business Support</span>
            </div>

            {/* Large Heading */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0B1B36] dark:text-white tracking-tight leading-[1.12] mb-6">
              Manage Your Finances.{' '}
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600">
                Grow Your Business.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mb-8">
              Reliable support for ITR, GST, accounting and essential business requirements — made simple.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                type="button"
                onClick={onStartRequest}
                className="liquid-pill inline-flex items-center justify-center gap-3 px-8 py-4 font-black text-base text-slate-950 shadow-xl group"
              >
                <span>Start Your Request</span>
                <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <a
                href={getWhatsAppUrl(brandConfig.whatsappMessages.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-bold text-base text-slate-900 dark:text-white bg-white/70 dark:bg-white/10 backdrop-blur-xl border border-slate-300 dark:border-white/20 hover:bg-white dark:hover:bg-white/20 shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <MessageSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* 3 Core Trust Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-slate-200/80 dark:border-slate-800 w-full">
              <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300 font-semibold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span>Professional Assistance</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300 font-semibold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span>Simple Process</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300 font-semibold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span>Direct Support</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Premium Visual Composition with ORIGINAL LOGO */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
              
              {/* Concentric Glow & Orbital Rings */}
              <div className="absolute inset-0 rounded-full border border-slate-200/80 dark:border-slate-700/50 pointer-events-none" />
              <div className="absolute inset-6 rounded-full border border-amber-300/30 dark:border-amber-400/20 border-dashed pointer-events-none" />
              <div className="absolute inset-12 rounded-full bg-gradient-to-tr from-brand-navy-900/5 via-amber-500/10 to-transparent dark:from-amber-500/10 dark:via-blue-600/10 blur-xl pointer-events-none" />

              {/* Central Logo Container Housing The Exact Official Logo */}
              <div className="relative z-10 w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-white dark:bg-slate-900 p-3 shadow-2xl dark:shadow-dark-glow border-4 border-slate-100 dark:border-slate-800 flex items-center justify-center transform hover:scale-[1.02] transition-transform duration-500">
                <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center relative shadow-inner">
                  {/* The exact uploaded logo without filters or alteration */}
                  <img 
                    src={brandConfig.logoUrl} 
                    alt="Manage With Bhairav Official Logo - Shield, Gear, Rupee, Arrow, Handshake" 
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />
                </div>
              </div>

              {/* Floating Badge 1: GST */}
              <div className="absolute top-2 left-4 z-20 animate-float-badge bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg border border-slate-100 dark:border-slate-700 flex items-center gap-1.5 text-xs font-bold text-[#0B1B36] dark:text-white">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>GST</span>
              </div>

              {/* Floating Badge 2: ITR */}
              <div className="absolute top-6 right-2 z-20 animate-float-badge-delayed bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg border border-slate-100 dark:border-slate-700 flex items-center gap-1.5 text-xs font-bold text-[#0B1B36] dark:text-white">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                <span>ITR</span>
              </div>

              {/* Floating Badge 3: ₹ (Rupee Symbol) */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 animate-float-badge bg-brand-navy-900 dark:bg-amber-500 text-white dark:text-slate-950 px-3 py-1.5 rounded-full shadow-lg border border-brand-navy-700 dark:border-amber-400 flex items-center gap-1 text-sm font-extrabold">
                <span className="text-amber-400 dark:text-slate-950 font-display">₹</span>
                <span className="text-xs font-semibold text-slate-200 dark:text-slate-900">Finance</span>
              </div>

              {/* Floating Badge 4: Accounting */}
              <div className="absolute bottom-6 left-0 z-20 animate-float-badge-delayed bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg border border-slate-100 dark:border-slate-700 flex items-center gap-1.5 text-xs font-bold text-[#0B1B36] dark:text-white">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Accounting</span>
              </div>

              {/* Floating Badge 5: Business Growth */}
              <div className="absolute bottom-4 right-4 z-20 animate-float-badge bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg border border-amber-200/80 dark:border-amber-500/40 flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400">
                <TrendingUp className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Business Growth</span>
              </div>

              {/* Floating Badge 6: Tax Compliance */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 animate-float-badge bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-1 rounded-full shadow-md border border-slate-100 dark:border-slate-700 text-[11px] font-bold text-slate-700 dark:text-slate-300">
                <span>Tax Compliance</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
