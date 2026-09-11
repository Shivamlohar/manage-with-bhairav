import React, { useState } from 'react';
import { brandConfig, getWhatsAppUrl } from '../../config/brandConfig';
import { 
  Phone, 
  MessageSquare, 
  Mail, 
  MapPin, 
  Clock, 
  Navigation, 
  Send, 
  ShieldCheck,
  Building 
} from 'lucide-react';
import { isValidIndianMobile, isValidEmail } from '../../utils/validation';

interface ContactSectionProps {
  onSubmitSuccess: (summary: { name: string; phone: string; service: string; refId: string; details: any }) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onSubmitSuccess }) => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'General Consultation',
    message: '',
    consent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) newErrors.name = 'Please enter your name';
    if (!isValidIndianMobile(form.phone)) newErrors.phone = 'Please enter a valid 10-digit mobile number';
    if (form.email && !isValidEmail(form.email)) newErrors.email = 'Please enter a valid email address';
    if (!form.consent) newErrors.consent = 'Please confirm consent to be contacted';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const refId = 'CNT-' + Math.floor(100000 + Math.random() * 900000);
      onSubmitSuccess({
        name: form.name,
        phone: form.phone,
        service: form.service,
        refId,
        details: form,
      });
      setForm({
        name: '',
        phone: '',
        email: '',
        service: 'General Consultation',
        message: '',
        consent: false,
      });
    }, 600);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-slate-50 dark:bg-[#071124] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-navy-50 dark:bg-slate-800 border border-brand-navy-200 dark:border-slate-700 text-brand-navy-900 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Get In Touch
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1B36] dark:text-white tracking-tight mb-4">
            Connect With Manage With Bhairav
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Reach out via phone, WhatsApp, email, or visit our office during working hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT: Contact Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-7 shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
              <h3 className="font-display text-xl font-bold text-[#0B1B36] dark:text-white flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-slate-800">
                <Building className="w-5 h-5 text-amber-500" />
                <span>Office &amp; Contact Details</span>
              </h3>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-[#0B1B36] dark:text-amber-400 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">PHONE</div>
                  <a href={brandConfig.phone.telLink} className="text-base font-bold text-[#0B1B36] dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                    {brandConfig.phone.display}
                  </a>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Available during working hours</p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">WHATSAPP</div>
                  <a 
                    href={getWhatsAppUrl(brandConfig.whatsappMessages.general)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-base font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 transition-colors"
                  >
                    {brandConfig.whatsapp.display}
                  </a>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Fast replies for document queries</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">EMAIL</div>
                  <a href={brandConfig.email.mailLink} className="text-base font-semibold text-[#0B1B36] dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                    {brandConfig.email.display}
                  </a>
                  <p className="text-xs text-slate-500 dark:text-slate-400">For formal documentation &amp; invoices</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">OFFICE ADDRESS</div>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-snug">
                    {brandConfig.office.address}
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">WORKING HOURS</div>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    {brandConfig.workingHours.weekdays}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {brandConfig.workingHours.weekend}
                  </p>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href={brandConfig.phone.telLink}
                className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#0B1B36] dark:bg-slate-800 text-white text-xs font-bold shadow-sm hover:bg-brand-navy-800 dark:hover:bg-slate-700 transition-all text-center"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call Now</span>
              </a>

              <a
                href={getWhatsAppUrl(brandConfig.whatsappMessages.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-amber-500 text-white text-xs font-bold shadow-sm hover:bg-amber-600 transition-all text-center"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <a
                href={brandConfig.office.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all text-center"
              >
                <Navigation className="w-4 h-4 text-amber-500" />
                <span>Get Directions</span>
              </a>
            </div>

          </div>

          {/* RIGHT: Quick Consultation Message Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-7 sm:p-9 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="font-display text-xl font-bold text-[#0B1B36] dark:text-white mb-1">
              Send a Direct Message
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
              Leave your details below and our team will get back to you with guidance.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter your full name"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-slate-800 dark:text-white transition-colors ${
                      errors.name ? 'border-red-400 bg-red-50/20' : 'border-slate-300 dark:border-slate-700'
                    }`}
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-500 dark:text-slate-400">+91</span>
                    <input
                      type="tel"
                      maxLength={10}
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value.replace(/\D/g, '') })}
                      placeholder="9876543210"
                      className={`w-full pl-12 pr-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-slate-800 dark:text-white transition-colors ${
                        errors.phone ? 'border-red-400 bg-red-50/20' : 'border-slate-300 dark:border-slate-700'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Service Required
                  </label>
                  <select
                    value={form.service}
                    onChange={e => setForm({ ...form, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Income Tax Return (ITR)">Income Tax Return (ITR)</option>
                    <option value="GST Services">GST Registration / Returns</option>
                    <option value="Accounting & Bookkeeping">Accounting &amp; Bookkeeping</option>
                    <option value="Business Support">Business Support &amp; Documentation</option>
                    <option value="Tax & Compliance">Tax Compliance &amp; Notice Assistance</option>
                    <option value="General Consultation">General Financial Consultation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Your Message or Specific Questions
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="How can we assist you?"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={e => setForm({ ...form, consent: e.target.checked })}
                    className="mt-0.5 rounded text-amber-500 focus:ring-amber-400 h-4 w-4 border-slate-300 dark:border-slate-700 dark:bg-slate-800"
                  />
                  <span className="text-xs text-slate-600 dark:text-slate-400 leading-normal select-none">
                    I agree to be contacted by Manage With Bhairav regarding my enquiry.
                  </span>
                </label>
                {errors.consent && <p className="text-xs text-red-500 mt-1">{errors.consent}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-[#0B1B36] dark:bg-amber-500 dark:text-slate-950 hover:bg-brand-navy-800 dark:hover:bg-amber-400 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-amber-400 dark:text-slate-950" />
                <span>{isSubmitting ? 'Sending Enquiry...' : 'Submit Message'}</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Your information is strictly confidential and never shared with third parties.</span>
              </div>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
