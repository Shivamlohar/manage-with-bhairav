import React, { useState } from 'react';
import { X, ShieldAlert, Send } from 'lucide-react';
import type { AccountingFormData } from '../../types';
import { isValidIndianMobile, isValidEmail } from '../../utils/validation';

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

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Your name is required';
    if (!isValidIndianMobile(formData.mobile)) newErrors.mobile = 'Enter a valid 10-digit mobile number';
    if (formData.email && !isValidEmail(formData.email)) newErrors.email = 'Enter a valid email address';
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
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
        name: formData.name,
        phone: formData.mobile,
        service: 'Accounting & Bookkeeping',
        refId,
        details: formData
      });
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden my-8 transform transition-all">
        
        {/* Header */}
        <div className="bg-[#0B1B36] text-white px-6 py-5 flex items-center justify-between border-b border-brand-navy-700">
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
        <div className="bg-amber-50 border-b border-amber-200/80 px-6 py-2.5 flex items-center gap-2.5 text-xs text-amber-900 font-medium">
          <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>Security Notice: Never share bank login passwords, ATM PINs, or confidential credentials.</span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-left">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Rajesh Gupta"
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  errors.name ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                }`}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-500">+91</span>
                <input
                  type="tel"
                  maxLength={10}
                  value={formData.mobile}
                  onChange={e => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })}
                  placeholder="9876543210"
                  className={`w-full pl-12 pr-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    errors.mobile ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                  }`}
                />
              </div>
              {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="accounts@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* Business Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Business Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.businessName}
                onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                placeholder="e.g. Gupta Cloth Store / Apex LogiTech"
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  errors.businessName ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                }`}
              />
              {errors.businessName && <p className="text-xs text-red-500 mt-1">{errors.businessName}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Business Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Business Type
              </label>
              <select
                value={formData.businessType}
                onChange={e => setFormData({ ...formData, businessType: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
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
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Support Frequency
              </label>
              <select
                value={formData.frequency}
                onChange={e => setFormData({ ...formData, frequency: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
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
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Primary Accounting Requirement
            </label>
            <select
              value={formData.accountingRequirement}
              onChange={e => setFormData({ ...formData, accountingRequirement: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
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
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Message / Notes
            </label>
            <textarea
              rows={2}
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your estimated monthly transactions or accounting software..."
              className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Consent */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.consent}
                onChange={e => setFormData({ ...formData, consent: e.target.checked })}
                className="mt-0.5 rounded text-amber-500 focus:ring-amber-400 h-4 w-4 border-slate-300"
              />
              <span className="text-xs text-slate-600 leading-normal select-none">
                I agree to be contacted by Manage With Bhairav regarding my accounting requirements.
              </span>
            </label>
            {errors.consent && <p className="text-xs text-red-500 mt-1">{errors.consent}</p>}
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#0B1B36] hover:bg-brand-navy-800 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5 text-amber-400" />
              <span>{isSubmitting ? 'Sending Request...' : 'Request Accounting Support'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
