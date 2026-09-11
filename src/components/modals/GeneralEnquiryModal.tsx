import React, { useState } from 'react';
import { X, ShieldAlert, Send } from 'lucide-react';
import { isValidIndianMobile, isValidEmail } from '../../utils/validation';

interface GeneralEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  onSubmitSuccess: (enquirySummary: { name: string; phone: string; service: string; refId: string; details: any }) => void;
}

export const GeneralEnquiryModal: React.FC<GeneralEnquiryModalProps> = ({ 
  isOpen, 
  onClose, 
  defaultService = 'Business Support',
  onSubmitSuccess 
}) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [serviceCategory, setServiceCategory] = useState(defaultService);
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!isValidIndianMobile(mobile)) newErrors.mobile = 'Enter a valid 10-digit mobile number';
    if (email && !isValidEmail(email)) newErrors.email = 'Enter a valid email address';
    if (!consent) newErrors.consent = 'Please confirm this request';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const refId = 'REQ-' + Math.floor(100000 + Math.random() * 900000);
      onSubmitSuccess({
        name,
        phone: mobile,
        service: serviceCategory,
        refId,
        details: { name, mobile, email, serviceCategory, message }
      });
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden my-8 transform transition-all">
        
        {/* Header */}
        <div className="bg-[#0B1B36] text-white px-6 py-5 flex items-center justify-between border-b border-brand-navy-700">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Request Service</span>
            <h3 className="font-display text-xl font-bold text-white mt-0.5">
              {serviceCategory} Consultation
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
          <span>Security Notice: Never share passwords, PINs, or banking credentials.</span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-left">
          
          {/* Service Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Service Category
            </label>
            <select
              value={serviceCategory}
              onChange={e => setServiceCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="Business Support">Business Support &amp; Documentation</option>
              <option value="Tax & Compliance">Tax &amp; Compliance Advisory</option>
              <option value="Income Tax Return (ITR)">Income Tax Return (ITR)</option>
              <option value="GST Services">GST Services</option>
              <option value="Accounting & Bookkeeping">Accounting &amp; Bookkeeping</option>
              <option value="Other Service / Custom Inquiry">Other Custom Business Requirement</option>
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Anand Kumar"
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                errors.name ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
              }`}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Mobile Number (10 Digits) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-500">+91</span>
              <input
                type="tel"
                maxLength={10}
                value={mobile}
                onChange={e => setMobile(e.target.value.replace(/\D/g, ''))}
                placeholder="9876543210"
                className={`w-full pl-12 pr-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  errors.mobile ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                }`}
              />
            </div>
            {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address (Optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              How can we assist you?
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Briefly describe what you need assistance with..."
              className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Consent */}
          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={e => setConsent(e.target.checked)}
                className="mt-0.5 rounded text-amber-500 focus:ring-amber-400 h-4 w-4 border-slate-300"
              />
              <span className="text-xs text-slate-600 leading-normal select-none">
                I agree to be contacted by Manage With Bhairav regarding my enquiry.
              </span>
            </label>
            {errors.consent && <p className="text-xs text-red-500 mt-1">{errors.consent}</p>}
          </div>

          {/* Actions */}
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
              <span>{isSubmitting ? 'Sending...' : 'Submit Request'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
