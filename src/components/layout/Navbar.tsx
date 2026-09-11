import React, { useState, useEffect } from 'react';
import { brandConfig, getWhatsAppUrl } from '../../config/brandConfig';
import { MessageSquare, Phone, Menu, X, ShieldCheck, UserCheck } from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';

interface NavbarProps {
  onOpenPortal: () => void;
  onOpenAdmin: () => void;
  onOpenEnquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPortal, onOpenAdmin, onOpenEnquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'FAQs', href: '#faqs' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-[#071124]/95 backdrop-blur-md shadow-md py-2.5 border-b border-slate-200/80 dark:border-slate-800' 
          : 'bg-white/80 dark:bg-[#071124]/80 backdrop-blur-sm py-4 border-b border-slate-200/50 dark:border-slate-800/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* LEFT: Original Manage With Bhairav Logo & Identity */}
          <a 
            href="#home" 
            className="flex items-center gap-3.5 group focus:outline-none focus:ring-2 focus:ring-amber-500/50 rounded-lg p-1"
            aria-label="Manage With Bhairav - Home"
          >
            <div className="relative flex-shrink-0">
              <img 
                src={brandConfig.logoUrl} 
                alt="Manage With Bhairav Official Logo" 
                className={`w-auto object-contain rounded-full transition-all duration-300 shadow-sm ${
                  isScrolled ? 'h-11 sm:h-12' : 'h-12 sm:h-14'
                }`}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-[#0B1B36] dark:text-white tracking-tight leading-tight text-base sm:text-lg lg:text-xl group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {brandConfig.businessName}
              </span>
              <span className="text-[11px] sm:text-xs font-medium text-slate-600 dark:text-slate-400 tracking-wide">
                {brandConfig.tagline}
              </span>
            </div>
          </a>

          {/* CENTER: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-2 rounded-lg text-[14px] xl:text-[15px] font-medium text-slate-700 dark:text-slate-300 hover:text-[#0B1B36] dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/70 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* RIGHT: Actions (Theme Toggle, Portal & WhatsApp Us) */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Theme Toggle (Dark / Bright Mode) */}
            <ThemeToggle />

            {/* Quick Portal Trigger */}
            <button
              onClick={onOpenPortal}
              className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-brand-navy-900 dark:hover:text-white px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all flex items-center gap-1.5"
              title="Client Request Tracker"
            >
              <UserCheck className="w-3.5 h-3.5 text-amber-500" />
              <span>Client Portal</span>
            </button>

            {/* WhatsApp Us CTA Button (Brand Orange/Gold) */}
            <a
              href={getWhatsAppUrl(brandConfig.whatsappMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-700 hover:to-amber-700 shadow-sm hover:shadow-gold-glow transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <MessageSquare className="w-4 h-4 fill-white/20" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Mobile Actions: Theme Toggle + Menu Button */}
          <div className="flex items-center gap-2 sm:hidden">
            <ThemeToggle />

            <a
              href={getWhatsAppUrl(brandConfig.whatsappMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Us"
              className="p-2 rounded-xl bg-amber-500 text-white shadow-sm hover:bg-amber-600 transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:text-[#0B1B36] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-white dark:bg-[#071124] border-b border-slate-200 dark:border-slate-800 shadow-2xl transition-all duration-300 px-4 pt-3 pb-6">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-base font-medium text-slate-800 dark:text-slate-200 hover:text-brand-navy-900 dark:hover:text-amber-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
              >
                {link.label}
              </a>
            ))}
            
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2.5">
              
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPortal();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <UserCheck className="w-4 h-4 text-amber-500" />
                Track My Request / Client Portal
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0B1B36] dark:bg-amber-500 text-white text-sm font-semibold hover:bg-brand-navy-800 dark:hover:bg-amber-600 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400 dark:text-white" />
                Start Your Request
              </button>

              <a
                href={brandConfig.phone.telLink}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Now: {brandConfig.phone.display}
              </a>

              <a
                href={getWhatsAppUrl(brandConfig.whatsappMessages.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 transition-colors shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                Chat on WhatsApp
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="text-xs text-slate-500 dark:text-slate-400 text-center hover:text-amber-500 py-1"
              >
                Staff / Admin Desk Access
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
