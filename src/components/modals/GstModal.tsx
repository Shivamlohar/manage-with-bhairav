import React, { useState } from 'react';
import { X, ShieldAlert, Send } from 'lucide-react';
import type { GstFormData } from '../../types';
import { isValidIndianMobile, isValidEmail, isValidGstin } from '../../utils/validation';

interface GstModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (enquirySummary: { name: string; phone: string; service: string; refId: string; details: any }) => void;
}

export const GstModal: React.FC<GstModalProps> = ({ isOpen, onClose, onSubmitSuccess }) => {
  const [formData, setFormData] = useState<GstFormData>({
    fullName: '',
    mobile: '',
    email: '',
    businessName: '',
    businessType: 'Sole Proprietorship',
    city: '',
    gstRegistrationRequired: 'Yes - New Registration',
    existingGstNumber: '',
    requirement: 'Monthly Return Filing (GSTR 1 & 3B)',
    message: '',
    consent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!isValidIndianMobile(formData.mobile)) newErrors.mobile = 'Enter a valid 10-digit mobile number';
    if (formData.email && !isValidEmail(formData.email)) newErrors.email = 'Enter a valid email address';
    if (!formData.businessName.trim()) newErrors.businessName = 'Business Name is required';
    if (!formData.city.trim()) newErrors.city = 'City / State is required';
    if (formData.existingGstNumber && !isValidGstin(formData.existingGstNumber)) {
      newErrors.existingGstNumber = 'Enter a valid 15-character GSTIN (e.g. 08AAAAA0000A1Z5)';
    }
    if (!formData.consent) newErrors.consent = 'Please confirm this request';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const refId = 'GST-' + Math.floor(100000 + Math.random() * 900000);
      onSubmitSuccess({
        name: formData.fullName,
        phone: formData.mobile,
        service: 'GST Services',
        refId,
        details: formData
      });
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden my-8 transform transition-all">
        
        {/* Modal Header */}
        <div className="bg-[#0B1B36] text-white px-6 py-5 flex items-center justify-between border-b border-brand-navy-700">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">GST Services</span>
            <h3 className="font-display text-xl font-bold text-white mt-0.5">
              GST Registration &amp; Return Enquiry
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

        {/* Security Alert Banner */}
        <div className="bg-amber-50 border-b border-amber-200/80 px-6 py-2.5 flex items-center gap-2.5 text-xs text-amber-900 font-medium">
          <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>Security Notice: Manage With Bhairav will never ask for your bank OTP, net banking password, or debit card PIN.</span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-left">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Suresh Patel"
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors ${
                  errors.fullName ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                }`}
              />
              {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
            </div>

            {/* Mobile Number */}
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
                  className={`w-full pl-12 pr-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors ${
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
                placeholder="business@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* Business Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Business / Enterprise Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.businessName}
                onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                placeholder="e.g. Patel Traders / Shri Ganesh Enterprises"
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors ${
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
                Business Constitution
              </label>
              <select
                value={formData.businessType}
                onChange={e => setFormData({ ...formData, businessType: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="Sole Proprietorship">Sole Proprietorship</option>
                <option value="Partnership Firm">Partnership Firm</option>
                <option value="Limited Liability Partnership (LLP)">Limited Liability Partnership (LLP)</option>
                <option value="Private Limited Company">Private Limited Company</option>
                <option value="Individual / Professional">Individual / Professional</option>
              </select>
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                City / Town <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
                placeholder="e.g. Jaipur, Ahmedabad, Mumbai, etc."
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  errors.city ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                }`}
              />
              {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* GST Registration Required? */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                GST Registration Required?
              </label>
              <select
                value={formData.gstRegistrationRequired}
                onChange={e => setFormData({ ...formData, gstRegistrationRequired: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="Yes - New Registration">Yes - Need New GST Registration</option>
                <option value="No - Already Have GST">No - Already Registered, Need Return Help</option>
                <option value="Notice / Revocation">Notice / Cancellation Revocation Help</option>
              </select>
            </div>

            {/* Existing GST Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Existing GSTIN (If already registered)
              </label>
              <input
                type="text"
                maxLength={15}
                value={formData.existingGstNumber}
                onChange={e => setFormData({ ...formData, existingGstNumber: e.target.value.toUpperCase() })}
                placeholder="08AAAAA0000A1Z5"
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  errors.existingGstNumber ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                }`}
              />
              {errors.existingGstNumber && <p className="text-xs text-red-500 mt-1">{errors.existingGstNumber}</p>}
            </div>
          </div>

          {/* Primary Requirement */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Primary GST Requirement
            </label>
            <select
              value={formData.requirement}
              onChange={e => setFormData({ ...formData, requirement: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="Monthly Return Filing (GSTR 1 & 3B)">Monthly Return Filing (GSTR-1 &amp; GSTR-3B)</option>
              <option value="Quarterly QRMP Return Filing">Quarterly QRMP Return Filing</option>
              <option value="Annual Return (GSTR 9 / 9C)">Annual Return (GSTR-9 / 9C)</option>
              <option value="New GST Registration">New GST Registration &amp; Certificate</option>
              <option value="GST Modification / Core Field Amendment">GST Amendment / Address Change</option>
              <option value="Revocation of Cancelled GST">Revocation of Cancelled GST</option>
              <option value="E-way Bill & E-invoicing Setup">E-way Bill &amp; E-invoicing Assistance</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Message / Business Details
            </label>
            <textarea
              rows={2}
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              placeholder="Provide any details regarding monthly turnover, business category (goods/services)..."
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
                I agree to be contacted by Manage With Bhairav regarding my GST requirements.
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
              <span>{isSubmitting ? 'Sending Request...' : 'Send GST Request'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
