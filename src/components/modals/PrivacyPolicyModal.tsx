import React from 'react';
import { X, Shield, Lock } from 'lucide-react';
import { brandConfig } from '../../config/brandConfig';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 overflow-hidden my-8 max-h-[85vh] flex flex-col text-left">
        
        {/* Header */}
        <div className="bg-[#0B1B36] text-white px-6 py-4 flex items-center justify-between border-b border-brand-navy-700 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-amber-400" />
            <h3 className="font-display text-lg font-bold text-white">
              Privacy Policy — {brandConfig.businessName}
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
            Last Updated: September 2026
          </p>

          <section className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              1. Commitment to Data Confidentiality
            </h4>
            <p>
              Manage With Bhairav values the trust you place in us when sharing your personal, financial, and tax information. We treat all client records (including PAN, GSTIN, salary slips, and bank statements) with strict confidentiality.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">2. Information We Collect</h4>
            <p>
              When you submit an enquiry through this website, WhatsApp, or phone, we collect information necessary to fulfill your accounting or compliance request:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
              <li>Contact details: Name, Mobile Number, Email Address, and City.</li>
              <li>Tax &amp; business identifiers: PAN, GSTIN, Trade Name, and nature of business.</li>
              <li>Relevant documents: Form 16, invoices, ledgers, or bank transaction statements.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">3. How Your Information is Used</h4>
            <p>
              Your data is used solely for:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
              <li>Preparing and reviewing your Income Tax Returns (ITR).</li>
              <li>GST registration, return filing, and statutory reconciliation.</li>
              <li>Maintaining books of accounts and communicating filing updates.</li>
              <li>Responding directly to your service enquiries.</li>
            </ul>
            <p className="font-medium text-slate-800 dark:text-slate-200">
              We never sell, rent, or trade your contact details or financial documents to third-party telemarketers or advertisers.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">4. Critical Security Rule</h4>
            <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 p-3 rounded-xl text-amber-900 dark:text-amber-200 font-medium">
              Manage With Bhairav will <strong>never</strong> ask you for your Net Banking password, UPI PIN, Debit/Credit card CVV, or Aadhaar/Bank OTPs. Please do not share sensitive financial credentials under any circumstances.
            </div>
          </section>

          <section className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">5. Contact Regarding Privacy</h4>
            <p>
              If you have any questions about how your documents or data are handled, please contact our official desk at <span className="font-semibold text-[#0B1B36] dark:text-amber-400">{brandConfig.email.display}</span> or call <span className="font-semibold text-[#0B1B36] dark:text-amber-400">{brandConfig.phone.display}</span>.
            </p>
          </section>
        </div>

        {/* Footer Action */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-end bg-slate-50 dark:bg-slate-800/50 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#0B1B36] dark:bg-amber-500 dark:text-slate-950 text-white text-xs font-bold hover:bg-brand-navy-800 dark:hover:bg-amber-400 transition-colors"
          >
            I Understand &amp; Close
          </button>
        </div>

      </div>
    </div>
  );
};
