import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { brandConfig, getWhatsAppUrl } from '../../config/brandConfig';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What documents are required for ITR filing?",
      a: "For salaried individuals, Form 16 issued by your employer, PAN Card, Aadhaar Card, and bank statements/interest certificates are the primary documents. If you have capital gains from shares or mutual funds, a broker statement is needed. For business or professional returns, bank statements, sales turnover details, and expense summaries are required. We provide a customized checklist once you reach out."
    },
    {
      q: "Do you assist salaried employees with ITR?",
      a: "Yes, definitely. We assist salaried individuals across various sectors with Form 16 filing, claiming eligible deductions (such as under 80C, 80D, HRA, home loan interest), reconciling AIS/TIS with 26AS, and filing under the Old or New Tax Regime based on whichever saves you more tax."
    },
    {
      q: "Can you help with GST registration?",
      a: "Yes. We manage end-to-end GST registration for sole proprietors, partnerships, LLPs, and companies. We assist with document collection (PAN, Aadhaar, electricity bill/rent agreement, bank proof), portal submission, and following up until the official GST Certificate is granted."
    },
    {
      q: "Do you provide accounting support for small businesses?",
      a: "Yes. Small business owners, traders, and service providers often struggle with keeping daily books in order. We provide periodic bookkeeping, sales and purchase entry, bank reconciliation, expense categorization, and financial statement preparation on monthly or quarterly schedules."
    },
    {
      q: "How can I contact Manage With Bhairav?",
      a: `You can reach us directly via WhatsApp at ${brandConfig.whatsapp.display}, call us at ${brandConfig.phone.display}, or submit an online request through our website forms. We promptly respond during our working hours (${brandConfig.workingHours.weekdays}).`
    },
    {
      q: "How can I submit my documents?",
      a: "You can securely share documents directly over WhatsApp, send them via email to our official address, or upload them through our enquiry forms in PDF/JPG format. We strictly adhere to privacy standards and never ask for passwords, OTPs, or banking PINs."
    },
    {
      q: "How does the enquiry process work?",
      a: "Once you submit your enquiry form or send us a WhatsApp message, our professional team reviews your requirement, verifies the scope of work, provides a clear document checklist, and connects with you to complete the work accurately and transparently."
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-3">
            Common Inquiries
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1B36] tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Clear answers to common questions about ITR filing, GST compliances, and accounting support.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-amber-400/80 bg-amber-50/10 shadow-md'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-base sm:text-lg text-[#0B1B36] flex items-center gap-3">
                    <HelpCircle className={`w-5 h-5 flex-shrink-0 transition-colors ${isOpen ? 'text-amber-600' : 'text-slate-400'}`} />
                    <span>{faq.q}</span>
                  </span>
                  <div className={`p-1.5 rounded-full bg-slate-100 text-slate-700 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180 bg-amber-100 text-amber-800' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100">
                    <p className="pl-8">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-12 text-center p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-display font-bold text-base text-[#0B1B36]">
              Have a specific taxation question not covered here?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Speak with Manage With Bhairav directly on WhatsApp for tailored clarification.
            </p>
          </div>
          <a
            href={getWhatsAppUrl(brandConfig.whatsappMessages.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-amber-500 hover:bg-amber-600 shadow-sm transition-colors whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Ask on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
