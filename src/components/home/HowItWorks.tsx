import React from 'react';
import { MousePointerClick, FileText, PhoneCall, CheckCheck } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: "01",
      title: "Choose a Service",
      description: "Select from ITR filing, GST registration, accounting, or business documentation based on your requirement.",
      icon: MousePointerClick,
    },
    {
      step: "02",
      title: "Submit Your Requirement",
      description: "Fill out a clean, concise enquiry form with your contact details and basic details in under a minute.",
      icon: FileText,
    },
    {
      step: "03",
      title: "Talk to Our Expert",
      description: "Our dedicated professional connects with you directly over phone or WhatsApp to understand and review documents.",
      icon: PhoneCall,
    },
    {
      step: "04",
      title: "Get Your Work Done",
      description: "Accurate preparation, compliance validation, and timely completion with full transparency and support.",
      icon: CheckCheck,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-slate-50/70 relative border-t border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-navy-50 border border-brand-navy-200 text-brand-navy-900 text-xs font-semibold uppercase tracking-wider mb-3">
            Streamlined Workflow
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1B36] tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            A simple, transparent four-step process designed to save your time and eliminate confusion.
          </p>
        </div>

        {/* Desktop 4-Step Horizontal Layout with Connector Lines */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6 relative">
          
          {/* Subtle Horizontal Connecting Track */}
          <div className="absolute top-1/4 left-12 right-12 h-0.5 bg-slate-200 -z-0" />

          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.step}
                className="relative z-10 bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all duration-300 flex flex-col group"
              >
                {/* Step Pill */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display text-2xl font-extrabold text-[#0B1B36] group-hover:text-amber-600 transition-colors">
                    {item.step}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-amber-500 text-slate-700 group-hover:text-white flex items-center justify-center transition-colors duration-200">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="font-display text-lg font-bold text-[#0B1B36] mb-2 group-hover:text-brand-navy-800">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed flex-grow">
                  {item.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-amber-600">
                  <span>Step {index + 1} of 4</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile & Tablet Vertical Timeline Layout */}
        <div className="lg:hidden relative pl-6 border-l-2 border-amber-400/50 space-y-8 ml-2 sm:ml-4">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="relative group">
                {/* Timeline node */}
                <div className="absolute -left-[35px] top-1 w-8 h-8 rounded-full bg-[#0B1B36] text-amber-400 font-bold text-xs flex items-center justify-center border-2 border-white shadow-md">
                  {item.step}
                </div>

                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display text-base font-bold text-[#0B1B36]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
