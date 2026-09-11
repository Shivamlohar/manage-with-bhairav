import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/home/Hero';
import { TrustStrip } from './components/home/TrustStrip';
import { Services } from './components/home/Services';
import { HowItWorks } from './components/home/HowItWorks';
import { WhyChooseUs } from './components/home/WhyChooseUs';
import { AboutSection } from './components/home/AboutSection';
import { CtaSection } from './components/home/CtaSection';
import { FAQSection } from './components/home/FAQSection';
import { ContactSection } from './components/home/ContactSection';
import { Footer } from './components/layout/Footer';
import { WhatsAppFloat } from './components/layout/WhatsAppFloat';

// Modals
import { ItrModal } from './components/modals/ItrModal';
import { GstModal } from './components/modals/GstModal';
import { AccountingModal } from './components/modals/AccountingModal';
import { GeneralEnquiryModal } from './components/modals/GeneralEnquiryModal';
import { SuccessModal } from './components/modals/SuccessModal';
import { PrivacyPolicyModal } from './components/modals/PrivacyPolicyModal';
import { TermsModal } from './components/modals/TermsModal';
import { CustomerPortalModal } from './components/portal/CustomerPortalModal';
import { AdminDashboardModal } from './components/admin/AdminDashboardModal';

import type { ClientEnquiry, RequestStatus } from './types';

// Initial authentic mock entries to illustrate real business workflows
const INITIAL_ENQUIRIES: ClientEnquiry[] = [
  {
    id: 'ITR-582910',
    customerName: 'Vikram Mehta',
    serviceType: 'ITR Filing',
    phone: '9820145890',
    email: 'vikram.mehta@gmail.com',
    date: '10 Sep 2026',
    status: 'In Progress',
    details: {
      assessmentYear: 'AY 2025-26',
      employmentType: 'Salaried',
      incomeType: ['Salary', 'Bank Interest/FDs'],
      previousItrFiled: 'Yes',
      message: 'Form 16 received from MNC employer. Need Old vs New Regime calculation.'
    }
  },
  {
    id: 'GST-918234',
    customerName: 'Sunita Sharma',
    serviceType: 'GST Services',
    phone: '9711209384',
    email: 'sunita.sharma@sharmatraders.in',
    date: '09 Sep 2026',
    status: 'Contacted',
    details: {
      businessName: 'Sharma Textiles & Handlooms',
      businessType: 'Sole Proprietorship',
      city: 'Jaipur',
      requirement: 'Monthly Return Filing (GSTR 1 & 3B)',
      existingGstNumber: '08ABCDE1234F1Z5'
    }
  },
  {
    id: 'ACC-341908',
    customerName: 'Rajendra Verma',
    serviceType: 'Accounting & Bookkeeping',
    phone: '9414056782',
    email: 'accounts@vermaengineering.com',
    date: '08 Sep 2026',
    status: 'New',
    details: {
      businessName: 'Verma Precision Engineering',
      businessType: 'Manufacturing / SME',
      frequency: 'Monthly Retainer',
      accountingRequirement: 'Complete Bookkeeping & Ledger Maintenance'
    }
  }
];

export const App: React.FC = () => {
  // Modal Visibility States
  const [itrModalOpen, setItrModalOpen] = useState(false);
  const [gstModalOpen, setGstModalOpen] = useState(false);
  const [accountingModalOpen, setAccountingModalOpen] = useState(false);
  const [generalModalOpen, setGeneralModalOpen] = useState(false);
  const [defaultGeneralService, setDefaultGeneralService] = useState('Business Support');
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [portalModalOpen, setPortalModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  // Success summary
  const [successSummary, setSuccessSummary] = useState<{
    name: string;
    phone: string;
    service: string;
    refId: string;
    details?: any;
  } | null>(null);

  // Enquiries state
  const [enquiries, setEnquiries] = useState<ClientEnquiry[]>(INITIAL_ENQUIRIES);

  // Handle service card click
  const handleSelectService = (key: 'itr' | 'gst' | 'accounting' | 'business' | 'tax' | 'other') => {
    switch (key) {
      case 'itr':
        setItrModalOpen(true);
        break;
      case 'gst':
        setGstModalOpen(true);
        break;
      case 'accounting':
        setAccountingModalOpen(true);
        break;
      case 'business':
        setDefaultGeneralService('Business Support');
        setGeneralModalOpen(true);
        break;
      case 'tax':
        setDefaultGeneralService('Tax & Compliance');
        setGeneralModalOpen(true);
        break;
      case 'other':
        setDefaultGeneralService('Other Service');
        setGeneralModalOpen(true);
        break;
      default:
        setGeneralModalOpen(true);
    }
  };

  // Handle successful form submissions
  const handleFormSuccess = (summary: {
    name: string;
    phone: string;
    service: string;
    refId: string;
    details: any;
  }) => {
    const today = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    const newEnquiry: ClientEnquiry = {
      id: summary.refId,
      customerName: summary.name,
      serviceType: summary.service as any,
      phone: summary.phone,
      email: summary.details.email || '',
      date: today,
      status: 'New',
      details: summary.details,
    };

    setEnquiries(prev => [newEnquiry, ...prev]);
    setSuccessSummary(summary);
    setSuccessModalOpen(true);
  };

  // Status updates in Admin Dashboard
  const handleUpdateStatus = (id: string, newStatus: RequestStatus) => {
    setEnquiries(prev =>
      prev.map(item => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  // Archive in Admin Dashboard
  const handleArchiveRequest = (id: string) => {
    setEnquiries(prev => prev.filter(item => item.id !== id));
  };

  const handleScrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#060D1B] text-slate-900 dark:text-slate-100 selection:bg-amber-100 selection:text-amber-900 dark:selection:bg-amber-900/60 dark:selection:text-amber-200 transition-colors duration-300">
      
      {/* 1. Sticky Modern Navbar */}
      <Navbar
        onOpenPortal={() => setPortalModalOpen(true)}
        onOpenAdmin={() => setAdminModalOpen(true)}
        onOpenEnquiry={() => setGeneralModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        
        {/* 2. Hero Section with Exact Original Logo Visual */}
        <Hero
          onStartRequest={() => setItrModalOpen(true)}
        />

        {/* 3. Trust Strip Immediately Below Hero */}
        <TrustStrip />

        {/* 4. Services Section (6 Premium Cards) */}
        <Services
          onSelectService={handleSelectService}
        />

        {/* 5. How It Works (4 Steps Desktop / Timeline Mobile) */}
        <HowItWorks />

        {/* 6. Why Manage With Bhairav (4 Benefits) */}
        <WhyChooseUs />

        {/* 7. About Manage With Bhairav (Split-Screen) */}
        <AboutSection
          onContactClick={handleScrollToContact}
        />

        {/* 8. Strong Navy CTA Section */}
        <CtaSection
          onStartRequest={() => setItrModalOpen(true)}
        />

        {/* 9. Modern FAQ Accordion (7 Exact Questions) */}
        <FAQSection />

        {/* 10. Contact Section */}
        <ContactSection
          onSubmitSuccess={handleFormSuccess}
        />

      </main>

      {/* 11. Official Footer */}
      <Footer
        onOpenPrivacy={() => setPrivacyModalOpen(true)}
        onOpenTerms={() => setTermsModalOpen(true)}
        onOpenPortal={() => setPortalModalOpen(true)}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      {/* 12. Floating Direct WhatsApp Button */}
      <WhatsAppFloat />

      {/* Interactive Modals */}
      <ItrModal
        isOpen={itrModalOpen}
        onClose={() => setItrModalOpen(false)}
        onSubmitSuccess={handleFormSuccess}
      />

      <GstModal
        isOpen={gstModalOpen}
        onClose={() => setGstModalOpen(false)}
        onSubmitSuccess={handleFormSuccess}
      />

      <AccountingModal
        isOpen={accountingModalOpen}
        onClose={() => setAccountingModalOpen(false)}
        onSubmitSuccess={handleFormSuccess}
      />

      <GeneralEnquiryModal
        isOpen={generalModalOpen}
        onClose={() => setGeneralModalOpen(false)}
        defaultService={defaultGeneralService}
        onSubmitSuccess={handleFormSuccess}
      />

      <SuccessModal
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        enquirySummary={successSummary}
      />

      <PrivacyPolicyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />

      <TermsModal
        isOpen={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
      />

      <CustomerPortalModal
        isOpen={portalModalOpen}
        onClose={() => setPortalModalOpen(false)}
        enquiries={enquiries}
        onOpenEnquiry={() => setGeneralModalOpen(true)}
      />

      <AdminDashboardModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        enquiries={enquiries}
        onUpdateStatus={handleUpdateStatus}
        onArchiveRequest={handleArchiveRequest}
      />

    </div>
  );
};

export default App;
