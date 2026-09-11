import React from 'react';
import { MessageSquare } from 'lucide-react';
import { brandConfig, getWhatsAppUrl } from '../../config/brandConfig';

export const WhatsAppFloat: React.FC = () => {
  return (
    <aside aria-label="WhatsApp Quick Support" className="fixed bottom-5 right-5 z-40">
      <a
        href={getWhatsAppUrl(brandConfig.whatsappMessages.general)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Manage With Bhairav"
        className="group relative flex items-center bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
      >
        {/* Glowing Pulse Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none opacity-75" />

        {/* WhatsApp Icon */}
        <MessageSquare className="w-6 h-6 fill-white relative z-10 flex-shrink-0" />

        {/* Desktop Label: "Chat on WhatsApp" */}
        <div className="hidden sm:flex flex-col text-left pl-2.5 relative z-10">
          <span className="text-xs font-bold leading-tight tracking-wide uppercase text-emerald-950/80">Instant Help</span>
          <span className="text-sm font-extrabold leading-tight">Chat on WhatsApp</span>
        </div>
      </a>
    </aside>
  );
};
