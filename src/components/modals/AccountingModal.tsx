import React, { useState } from 'react';
import { X, ShieldAlert, Send } from 'lucide-react';
import type { AccountingFormData } from '../../types';
import { isValidIndianMobile, isValidEmail } from '../../utils/validation';
import { sanitizeText, checkRateLimit } from '../../utils/security';

interface AccountingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (enquirySummary: { name: string; phone: string; service: string; refId: string; details: any }) => void;
}

export const AccountingModal: React.FC<AccountingModalProps> = ({ isOpen, onClose, onSubmitSuccess }) => {
  const [formData, setFormData] = useState<AccountingFormData>({
    name: '',
    mobile: '',
    email: '',
    businessName: '',
    businessType: 'Sole Proprietor / Retailer',
    accountingRequirement: 'Complete Bookkeeping & Ledger Maintenance',
    frequency: 'Monthly Retainer',
    message: '',
    consent: false,
  });

  const [botHoneypot, setBotHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (botHoneypot) return;

    const rateCheck = checkRateLimit('acc_request', 3, 60);
    if (!rateCheck.allowed) {
      setErrors({ form: `Rate limit: Please wait ${rateCheck.waitSeconds}s before submitting again.` });
      return;
    }

    const cleanName = sanitizeText(formData.name);
    const cleanMobile = formData.mobile.replace(/\D/g, '');
    const cleanEmail = sanitizeText(formData.email);
    const cleanBusinessName = sanitizeText(formData.businessName);
    const cleanMessage = sanitizeText(formData.message);

    const newErrors: Record<string, string> = {};

    if (!cleanName) newErrors.name = 'Your name is required';
    if (!isValidIndianMobile(cleanMobile)) newErrors.mobile = 'Enter a valid 10-digit mobile number';
    if (cleanEmail && !isValidEmail(cleanEmail)) newErrors.email = 'Enter a valid email address';
    if (!cleanBusinessName) newErrors.businessName = 'Business name is required';
    if (!formData.consent) newErrors.consent = 'Please confirm this request';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const refId = 'ACC-' + Math.floor(100000 + Math.random() * 900000);
      onSubmitSuccess({
        name: cleanName,
        phone: cleanMobile,
        service: 'Accounting & Bookkeeping',
        refId,
        details: {
          ...formData,
          name: cleanName,
          mobile: cleanMobile,
          email: cleanEmail,
          businessName: cleanBusinessName,
          message: cleanMessage
        }
      });
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 overflow-hidden my-8 transform transition-all text-left">
        
        {/* Header */}
        <div className="bg-[#0B1B36] dark:bg-[#071124] text-white px-6 py-5 flex items-center justify-between border-b border-brand-navy-700 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Accounting Support</span>
            <h3 className="font-display text-xl font-bold text-white mt-0.5">
              Accounting &amp; Bookkeeping Assistance
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security Banner */}
        <div className="bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200/80 dark:border-amber-800/60 px-6 py-2.5 flex items-center gap-2.5 text-xs text-amber-900 dark:text-amber-200 font-medium">
          <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
          <span>Security Notice: Never share bank login passwords, ATM PINs, or confidential credentials.</span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Invisible Anti-bot Honeypot */}
          <div style={{ display: 'none' }} aria-hidden="true">
            <input
              type="text"
              name="acc_hp_protection"
              value={botHoneypot}
              onChange={e => setBotHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {errors.form && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-semibold border border-red-200 dark:border-red-800">
              {errors.form}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Rajesh Gupta"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-slate-800 dark:text-white ${
                  errors.name ? 'border-red-400 bg-red-50/20' : 'border-slate-300 dark:border-slate-700'
                }`}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-500 dark:text-slate-400">+91</span>
                <input
                  type="tel"
                  maxLength={10}
                  value={formData.mobile}
                  onChange={e => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })}
                  placeholder="9876543210"
                  className={`w-full pl-12 pr-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-slate-800 dark:text-white ${
                    errors.mobile ? 'border-red-400 bg-red-50/20' : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
              </div>
              {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="accounts@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* Business Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Business Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.businessName}
                onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                placeholder="e.g. Gupta Cloth Store"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-slate-800 dark:text-white ${
                  errors.businessName ? 'border-red-400 bg-red-50/20' : 'border-slate-300 dark:border-slate-700'
                }`}
              />
              {errors.businessName && <p className="text-xs text-red-500 mt-1">{errors.businessName}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Business Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Business Type
              </label>
              <select
                value={formData.businessType}
                onChange={e => setFormData({ ...formData, businessType: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="Sole Proprietor / Retailer">Sole Proprietor / Retailer</option>
                <option value="Wholesaler / Trader">Wholesaler / Trader</option>
                <option value="Manufacturing / SME">Manufacturing / SME</option>
                <option value="Service Provider / Agency">Service Provider / Agency</option>
                <option value="Freelancer / Consultant">Freelancer / Consultant</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Frequency */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Support Frequency
              </label>
              <select
                value={formData.frequency}
                onChange={e => setFormData({ ...formData, frequency: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="Monthly Retainer">Monthly Retainer (Regular)</option>
                <option value="Quarterly Review">Quarterly Review</option>
                <option value="Annual Finalization">Annual Finalization &amp; P&amp;L</option>
                <option value="One-Time Backlog Clean-up">One-Time Backlog / Catch-up</option>
              </select>
            </div>
          </div>

          {/* Accounting Requirement */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Primary Accounting Requirement
            </label>
            <select
              value={formData.accountingRequirement}
              onChange={e => setFormData({ ...formData, accountingRequirement: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="Complete Bookkeeping & Ledger Maintenance">Complete Bookkeeping &amp; Ledger Maintenance</option>
              <option value="Bank Reconciliation & Sales/Purchase Entry">Bank Reconciliation &amp; Sales/Purchase Entry</option>
              <option value="Balance Sheet & P&L Statement Preparation">Balance Sheet &amp; P&amp;L Statement Preparation</option>
              <option value="Tally / Busy Accounting Entry">Tally / Accounting Software Entry Support</option>
              <option value="Payroll & Staff Attendance Documentation">Basic Payroll &amp; Wage Documentation</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Message / Notes
            </label>
            <textarea
              rows={2}
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your estimated monthly transactions or accounting software..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Consent */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.consent}
                onChange={e => setFormData({ ...formData, consent: e.target.checked })}
                className="mt-0.5 rounded text-amber-500 focus:ring-amber-400 h-4 w-4 border-slate-300 dark:border-slate-700 dark:bg-slate-800"
              />
              <span className="text-xs text-slate-600 dark:text-slate-400 leading-normal select-none">
                I agree to be contacted by Manage With Bhairav regarding my accounting requirements.
              </span>
            </label>
            {errors.consent && <p className="text-xs text-red-500 mt-1">{errors.consent}</p>}
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0B1B36] dark:bg-amber-500 dark:text-slate-950 hover:bg-brand-navy-800 dark:hover:bg-amber-400 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5 text-amber-400 dark:text-slate-950" />
              <span>{isSubmitting ? 'Sending Request...' : 'Request Accounting Support'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
