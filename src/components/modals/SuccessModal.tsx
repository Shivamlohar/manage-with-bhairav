import React from 'react';
import { CheckCircle2, MessageSquare, Phone, X, ShieldCheck } from 'lucide-react';
import { brandConfig, getWhatsAppUrl } from '../../config/brandConfig';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  enquirySummary: {
    name: string;
    phone: string;
    service: string;
    refId: string;
    details?: any;
  } | null;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, enquirySummary }) => {
  if (!isOpen || !enquirySummary) return null;

  const prefilledWhatsappMsg = `Hello Manage With Bhairav, I have submitted an enquiry for ${enquirySummary.service} (Ref ID: ${enquirySummary.refId}). My name is ${enquirySummary.name}.`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 dark:border-slate-800 overflow-hidden text-center p-6 sm:p-8 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200 dark:border-emerald-800 shadow-sm">
          <CheckCircle2 className="w-9 h-9 text-emerald-600 dark:text-emerald-400" />
        </div>

        {/* Reference Tag */}
        <div className="inline-block bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono font-bold px-3 py-1 rounded-full mb-3 border border-slate-200 dark:border-slate-700">
          Ref ID: {enquirySummary.refId}
        </div>

        {/* Title & Message */}
        <h3 className="font-display text-2xl font-extrabold text-[#0B1B36] dark:text-white mb-2">
          Request Received
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
          Thank you, <strong className="text-slate-900 dark:text-white">{enquirySummary.name}</strong>. Manage With Bhairav has logged your requirement for <strong className="text-[#0B1B36] dark:text-amber-400">{enquirySummary.service}</strong> and will contact you shortly on <strong>+91 {enquirySummary.phone}</strong>.
        </p>

        {/* Instant Follow-up Options */}
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 mb-6 border border-slate-200/80 dark:border-slate-700/80 text-left">
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Need immediate discussion? Connect directly:</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <a
              href={getWhatsAppUrl(prefilledWhatsappMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 shadow-sm transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
            <a
              href={brandConfig.phone.telLink}
              className="inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold text-white bg-[#0B1B36] dark:bg-slate-700 hover:bg-brand-navy-800 dark:hover:bg-slate-600 transition-colors shadow-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </a>
          </div>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="w-full py-2.5 px-4 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          Close
        </button>

      </div>
    </div>
  );
};
