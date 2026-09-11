import React from 'react';
import { brandConfig, getWhatsAppUrl } from '../../config/brandConfig';
import { ArrowRight, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';

interface CtaSectionProps {
  onStartRequest: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onStartRequest }) => {
  return (
    <section className="py-20 md:py-24 bg-[#0B1B36] relative overflow-hidden text-white">
      
      {/* Background Financial Graph Pattern & Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20 pattern-financial-grid" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* SVG Financial Trend Line Accent */}
      <div className="absolute inset-x-0 bottom-0 h-28 pointer-events-none opacity-15 overflow-hidden">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full text-amber-400 fill-none stroke-current stroke-2">
          <path d="M0,100 Q150,20 300,70 T600,30 T900,60 T1200,10" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-amber-400 text-xs font-bold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Prompt Assistance Guaranteed</span>
        </div>

        {/* Heading */}
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Need Help With ITR, GST or Accounting?
        </h2>

        {/* Text */}
        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Tell us what you need and our team will get in touch.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onStartRequest}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-base text-[#0B1B36] bg-amber-400 hover:bg-amber-300 shadow-lg hover:shadow-gold-glow hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <span>Start Your Request</span>
            <ArrowRight className="w-4 h-4 text-[#0B1B36]" />
          </button>

          <a
            href={getWhatsAppUrl(brandConfig.whatsappMessages.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-base text-white bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-sm shadow-md transition-all duration-200"
          >
            <MessageSquare className="w-5 h-5 fill-white/20" />
            <span>WhatsApp Us</span>
          </a>
        </div>

        {/* Trust Reminder */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs font-medium text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Zero spam. No unsolicited promotional calls. Direct professional response.</span>
        </div>

      </div>
    </section>
  );
};
