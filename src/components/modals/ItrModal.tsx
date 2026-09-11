import React, { useState } from 'react';
import { X, ShieldAlert, Send, UploadCloud, AlertCircle } from 'lucide-react';
import type { ItrFormData } from '../../types';
import { isValidIndianMobile, isValidEmail, isValidPan } from '../../utils/validation';

interface ItrModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (enquirySummary: { name: string; phone: string; service: string; refId: string; details: any }) => void;
}

export const ItrModal: React.FC<ItrModalProps> = ({ isOpen, onClose, onSubmitSuccess }) => {
  const [formData, setFormData] = useState<ItrFormData>({
    fullName: '',
    mobile: '',
    email: '',
    panNumber: '',
    assessmentYear: 'AY 2025-26',
    employmentType: 'Salaried',
    incomeType: ['Salary'],
    previousItrFiled: 'Yes',
    message: '',
    consent: false,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleIncomeTypeToggle = (type: string) => {
    setFormData(prev => {
      const exists = prev.incomeType.includes(type);
      return {
        ...prev,
        incomeType: exists 
          ? prev.incomeType.filter(t => t !== type)
          : [...prev.incomeType, type]
      };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Security validation
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      setFileError('Only PDF, JPG, JPEG, or PNG files are permitted.');
      setSelectedFile(null);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setFileError('File size exceeds the 10MB limit.');
      setSelectedFile(null);
      return;
    }

    setFileError(null);
    setSelectedFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!isValidIndianMobile(formData.mobile)) newErrors.mobile = 'Enter a valid 10-digit mobile number';
    if (formData.email && !isValidEmail(formData.email)) newErrors.email = 'Enter a valid email address';
    if (formData.panNumber && !isValidPan(formData.panNumber)) newErrors.panNumber = 'Enter a valid PAN (e.g. ABCDE1234F)';
    if (!formData.consent) newErrors.consent = 'You must agree to the enquiry declaration';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable submission and trigger success dialog
    setTimeout(() => {
      setIsSubmitting(false);
      const refId = 'ITR-' + Math.floor(100000 + Math.random() * 900000);
      onSubmitSuccess({
        name: formData.fullName,
        phone: formData.mobile,
        service: 'Income Tax Return (ITR)',
        refId,
        details: { ...formData, fileName: selectedFile?.name }
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
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Enquiry Form</span>
            <h3 className="font-display text-xl font-bold text-white mt-0.5">
              Income Tax Return (ITR) Assistance
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
          <span>Security Notice: Never upload or share passwords, OTPs, ATM PINs, or confidential banking credentials.</span>
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
                placeholder="e.g. Ramesh Sharma"
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors ${
                  errors.fullName ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                }`}
              />
              {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mobile Number (10 Digits) <span className="text-red-500">*</span>
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
                placeholder="name@example.com"
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors ${
                  errors.email ? 'border-red-400' : 'border-slate-300'
                }`}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* PAN Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                PAN Number (Optional / For Records)
              </label>
              <input
                type="text"
                maxLength={10}
                value={formData.panNumber}
                onChange={e => setFormData({ ...formData, panNumber: e.target.value.toUpperCase() })}
                placeholder="ABCDE1234F"
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors ${
                  errors.panNumber ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                }`}
              />
              {errors.panNumber && <p className="text-xs text-red-500 mt-1">{errors.panNumber}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Assessment Year */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Assessment Year
              </label>
              <select
                value={formData.assessmentYear}
                onChange={e => setFormData({ ...formData, assessmentYear: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="AY 2025-26">AY 2025-26 (FY 2024-25)</option>
                <option value="AY 2024-25">AY 2024-25 (FY 2023-24)</option>
                <option value="AY 2026-27">AY 2026-27 (Upcoming)</option>
                <option value="Earlier Year / Notice">Earlier Year / Notice</option>
              </select>
            </div>

            {/* Employment Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Employment Type
              </label>
              <select
                value={formData.employmentType}
                onChange={e => setFormData({ ...formData, employmentType: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="Salaried">Salaried (Form 16)</option>
                <option value="Self-Employed / Business">Self-Employed / Business</option>
                <option value="Professional (Doctor, CA, etc.)">Professional / Freelance</option>
                <option value="Senior Citizen">Senior Citizen / Pensioner</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Previous ITR Filed */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Previous ITR Filed?
              </label>
              <select
                value={formData.previousItrFiled}
                onChange={e => setFormData({ ...formData, previousItrFiled: e.target.value as 'Yes' | 'No' })}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="Yes">Yes, previously filed</option>
                <option value="No">No, first time filing</option>
              </select>
            </div>
          </div>

          {/* Income Sources Multi-select */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Income Type(s) (Select all that apply)
            </label>
            <div className="flex flex-wrap gap-2">
              {['Salary', 'Business/Profession', 'Rental Income', 'Capital Gains (Shares/Property)', 'Bank Interest/FDs', 'Other'].map(type => {
                const isSelected = formData.incomeType.includes(type);
                return (
                  <button
                    type="button"
                    key={type}
                    onClick={() => handleIncomeTypeToggle(type)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
                      isSelected
                        ? 'bg-amber-500 text-white border-amber-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}{type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Document Upload (Optional) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Attach Document / Form 16 (Optional - PDF, JPG, PNG under 10MB)
            </label>
            <div className="border border-dashed border-slate-300 rounded-lg p-3 bg-slate-50 text-center hover:bg-slate-100 transition-colors">
              <input
                type="file"
                id="itr-file-upload"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
              />
              <label htmlFor="itr-file-upload" className="cursor-pointer flex items-center justify-center gap-2 text-xs font-semibold text-brand-navy-800">
                <UploadCloud className="w-4 h-4 text-amber-600" />
                {selectedFile ? (
                  <span className="text-emerald-700 font-bold">{selectedFile.name} ({(selectedFile.size / 1024).toFixed(0)} KB)</span>
                ) : (
                  <span>Click to browse and attach Form 16 / Tax Summary</span>
                )}
              </label>
            </div>
            {fileError && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{fileError}</p>}
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Message / Specific Questions (Optional)
            </label>
            <textarea
              rows={2}
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              placeholder="Provide any additional details or deductions you would like to discuss..."
              className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Mandatory Statutory Disclaimer & Consent */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.consent}
                onChange={e => setFormData({ ...formData, consent: e.target.checked })}
                className="mt-0.5 rounded text-amber-500 focus:ring-amber-400 h-4 w-4 border-slate-300"
              />
              <span className="text-xs text-slate-600 leading-normal select-none">
                <strong className="text-slate-800">Important Disclaimer:</strong> I understand that this form is an enquiry/request and does not itself constitute filing of an ITR. Manage With Bhairav will connect with me to verify records before any official filing.
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
              <span>{isSubmitting ? 'Sending Request...' : 'Send ITR Request'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
