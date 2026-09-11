import React from 'react';
import { 
  FileSpreadsheet, 
  Receipt, 
  BookOpenCheck, 
  BriefcaseBusiness, 
  Scale, 
  PlusCircle, 
  ArrowRight, 
  MessageSquare 
} from 'lucide-react';
import { getWhatsAppUrl, brandConfig } from '../../config/brandConfig';

interface ServicesProps {
  onSelectService: (serviceKey: 'itr' | 'gst' | 'accounting' | 'business' | 'tax' | 'other') => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const serviceList = [
    {
      key: 'itr' as const,
      title: "Income Tax Return (ITR)",
      badge: "Salaried & Business",
      icon: FileSpreadsheet,
      text: "Assistance with ITR filing and related tax documentation.",
      buttonText: "Start ITR",
      whatsappMessage: brandConfig.whatsappMessages.itr,
      featured: true,
      features: [
        "Form 16 / Salaried filing",
        "Business / Presumptive tax (44AD/44ADA)",
        "Capital gains & other income",
        "Notice verification & past year review",
      ]
    },
    {
      key: 'gst' as const,
      title: "GST Services",
      badge: "Registration & Returns",
      icon: Receipt,
      text: "GST registration and return-related compliance assistance.",
      buttonText: "Get GST Help",
      whatsappMessage: brandConfig.whatsappMessages.gst,
      featured: false,
      features: [
        "New GST Registration",
        "Monthly / Quarterly GST returns (GSTR-1, 3B)",
        "GST cancellation / revocation",
        "Input Tax Credit (ITC) reconciliation",
      ]
    },
    {
      key: 'accounting' as const,
      title: "Accounting & Bookkeeping",
      badge: "SME & Traders",
      icon: BookOpenCheck,
      text: "Organized accounting and bookkeeping support for businesses.",
      buttonText: "Get Accounting Help",
      whatsappMessage: brandConfig.whatsappMessages.accounting,
      featured: false,
      features: [
        "Day-to-day ledger & voucher entry",
        "Bank reconciliation & statements",
        "Financial reporting & P&L statements",
        "Monthly / quarterly bookkeeping plans",
      ]
    },
    {
      key: 'business' as const,
      title: "Business Support",
      badge: "Operational Assistance",
      icon: BriefcaseBusiness,
      text: "Practical documentation and financial support for growing businesses.",
      buttonText: "Discuss Your Requirement",
      whatsappMessage: brandConfig.whatsappMessages.businessSupport,
      featured: false,
      features: [
        "Proprietorship setup assistance",
        "MSME / Udyam registration support",
        "Invoicing & bill template setup",
        "Banking & loan document preparation",
      ]
    },
    {
      key: 'tax' as const,
      title: "Tax & Compliance",
      badge: "Regulatory Adherence",
      icon: Scale,
      text: "Support for tax-related documentation and compliance requirements.",
      buttonText: "Talk to Us",
      whatsappMessage: brandConfig.whatsappMessages.compliance,
      featured: false,
      features: [
        "Advance tax planning guidance",
        "TDS / TCS documentation help",
        "Tax compliance health checks",
        "Official notice drafting assistance",
      ]
    },
    {
      key: 'other' as const,
      title: "Other Services",
      badge: "Custom Solutions",
      icon: PlusCircle,
      text: "Specialized documentation and custom accounting requirements for your unique business needs.",
      buttonText: "Inquire Now",
      whatsappMessage: brandConfig.whatsappMessages.general,
      featured: false,
      features: [
        "Digital Signature Certificate (DSC)",
        "Custom financial summary reports",
        "Tax record retrieval & rectification",
        "Ongoing retainer consultations",
      ]
    },
  ];

  return (
    <section id="services" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-3">
            Core Expertise
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1B36] tracking-tight mb-4">
            Services That Keep Your Business Moving
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            From tax filing to everyday accounting support, get professional assistance in one place.
          </p>
        </div>

        {/* 6 Premium Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceList.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.key}
                className={`rounded-2xl p-7 sm:p-8 transition-all duration-300 flex flex-col justify-between relative group ${
                  service.featured 
                    ? 'bg-gradient-to-b from-white via-amber-50/20 to-white border-2 border-amber-400 shadow-xl shadow-amber-500/5' 
                    : 'bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300'
                }`}
              >
                {service.featured && (
                  <div className="absolute -top-3.5 right-6 bg-amber-500 text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full shadow-sm">
                    Most Requested
                  </div>
                )}

                <div>
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-13 h-13 p-3.5 rounded-xl bg-brand-navy-50 text-[#0B1B36] group-hover:bg-amber-500 group-hover:text-white transition-colors duration-200">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-display text-xl font-bold text-[#0B1B36] mb-3 group-hover:text-brand-navy-800 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {service.text}
                  </p>

                  {/* Feature Checkpoints */}
                  <ul className="space-y-2 mb-8 border-t border-slate-100 pt-4">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="text-xs text-slate-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA Actions */}
                <div className="space-y-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => onSelectService(service.key)}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
                      service.featured
                        ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-md hover:shadow-gold-glow'
                        : 'bg-[#0B1B36] hover:bg-brand-navy-800 text-white'
                    }`}
                  >
                    <span>{service.buttonText}</span>
                    <ArrowRight className="w-4 h-4 text-amber-300" />
                  </button>

                  <a
                    href={getWhatsAppUrl(service.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-lg text-xs font-medium text-slate-600 hover:text-amber-700 bg-slate-50 hover:bg-amber-50 border border-slate-200/80 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
                    <span>Quick WhatsApp Enquiry</span>
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
