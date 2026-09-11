import React from 'react';
import { X, Scale } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 overflow-hidden my-8 max-h-[85vh] flex flex-col text-left">
        
        {/* Header */}
        <div className="bg-[#0B1B36] text-white px-6 py-4 flex items-center justify-between border-b border-brand-navy-700 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <Scale className="w-5 h-5 text-amber-400" />
            <h3 className="font-display text-lg font-bold text-white">
              Terms of Service &amp; Engagement
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p className="font-semibold text-slate-900 dark:text-white">
            Terms of Engagement — Manage With Bhairav
          </p>

          <section className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">1. Nature of Enquiry Forms</h4>
            <p>
              Submission of an online enquiry form on this website expresses an intention to seek professional services. It does not automatically establish an engagement or constitute final statutory filing until mutual verification of data and documents is completed.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">2. Client Accuracy Representation</h4>
            <p>
              Tax computation, ITR filing, and GST compliances depend fundamentally on the veracity of documents provided by the client (such as Form 16, bank statements, sales turnover, and invoices). The client certifies that figures and documents provided are genuine and complete to the best of their knowledge.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">3. Timely Information Submission</h4>
            <p>
              Tax filing authorities impose strict statutory deadlines (e.g. July 31st for individual ITR, monthly 11th/20th for GST returns). Clients are requested to share required paperwork well before deadlines to allow sufficient time for scrutiny and error prevention.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">4. Professional Ethics &amp; Confidentiality</h4>
            <p>
              Manage With Bhairav exercises due diligence and professional standard of care in all accounting and compliance assignments. Client communications and business records remain strictly confidential.
            </p>
          </section>
        </div>

        {/* Footer Action */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-end bg-slate-50 dark:bg-slate-800/50 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#0B1B36] dark:bg-amber-500 dark:text-slate-950 text-white text-xs font-bold hover:bg-brand-navy-800 dark:hover:bg-amber-400 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
