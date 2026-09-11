import React from 'react';
import { brandConfig, getWhatsAppUrl } from '../../config/brandConfig';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  ShieldCheck 
} from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenPortal: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onOpenPrivacy, 
  onOpenTerms, 
  onOpenPortal, 
  onOpenAdmin 
}) => {
  return (
    <footer className="bg-[#071124] text-slate-400 pt-16 pb-12 border-t border-slate-800 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Column (Original Logo + Identity) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-white p-0.5 shadow-md flex-shrink-0">
                <img 
                  src={brandConfig.logoUrl} 
                  alt="Manage With Bhairav Official Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-white text-lg sm:text-xl tracking-tight leading-tight">
                  {brandConfig.businessName}
                </h3>
                <p className="text-xs text-amber-400/90 font-medium tracking-wide">
                  {brandConfig.tagline}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-2">
              Professional, transparent, and accurate financial and taxation assistance designed for individuals, proprietors, and expanding businesses across India.
            </p>

            {/* Social Links with standard SVG icons */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href={brandConfig.socialLinks.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-white flex items-center justify-center text-slate-300 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href={brandConfig.socialLinks.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-white flex items-center justify-center text-slate-300 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
              <a 
                href={brandConfig.socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-white flex items-center justify-center text-slate-300 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                </svg>
              </a>
              <a 
                href={getWhatsAppUrl(brandConfig.whatsappMessages.general)} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><a href="#home" className="hover:text-amber-400 transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-amber-400 transition-colors">About</a></li>
              <li><a href="#how-it-works" className="hover:text-amber-400 transition-colors">How It Works</a></li>
              <li><a href="#faqs" className="hover:text-amber-400 transition-colors">FAQs</a></li>
              <li><a href="#contact" className="hover:text-amber-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Core Services Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Core Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Income Tax Return (ITR)</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">GST Registration &amp; Returns</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Accounting &amp; Bookkeeping</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Business Support &amp; MSME</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Tax &amp; Compliance Advisory</a></li>
            </ul>
          </div>

          {/* Direct Contacts Column */}
          <div className="lg:col-span-3 space-y-3 text-xs sm:text-sm">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Official Desk
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href={brandConfig.phone.telLink} className="hover:text-white transition-colors">
                  {brandConfig.phone.display}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href={brandConfig.email.mailLink} className="hover:text-white transition-colors">
                  {brandConfig.email.display}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{brandConfig.office.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{brandConfig.workingHours.weekdays}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span>&copy; {new Date().getFullYear()} {brandConfig.businessName}. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-amber-400 transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={onOpenTerms}
              className="hover:text-amber-400 transition-colors"
            >
              Terms &amp; Conditions
            </button>
            <span>•</span>
            <button
              onClick={onOpenPortal}
              className="hover:text-amber-400 transition-colors"
            >
              Client Request Tracker
            </button>
            <span>•</span>
            <button
              onClick={onOpenAdmin}
              className="hover:text-amber-400 transition-colors"
            >
              Admin
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
