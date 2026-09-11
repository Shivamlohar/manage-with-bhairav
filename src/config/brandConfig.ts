/**
 * CENTRAL BRAND & BUSINESS CONFIGURATION
 * Manage With Bhairav - Official Settings
 * 
 * Edit contact numbers, addresses, social handles, and WhatsApp messages here.
 */

export const brandConfig = {
  // Brand Identity
  businessName: "MANAGE WITH BHAIRAV",
  shortName: "Manage With Bhairav",
  tagline: "Accounting • GST • ITR • Business Support",
  logoUrl: `${import.meta.env.BASE_URL}brand/manage-with-bhairav-logo.jpg`,
  establishedYear: "2024",

  // Contact Information (Easy to modify)
  phone: {
    display: "+91 98765 43210",
    raw: "+919876543210",
    telLink: "tel:+919876543210",
  },

  whatsapp: {
    display: "+91 98765 43210",
    // International format digits without + or spaces for wa.me links
    number: "919876543210", 
  },

  email: {
    display: "contact@managewithbhairav.com",
    mailLink: "mailto:contact@managewithbhairav.com",
  },

  office: {
    address: "Office No. 102, Commercial Complex, Main Road, India",
    city: "India",
    googleMapsUrl: "https://maps.google.com/?q=Manage+With+Bhairav+Accounting+Services",
  },

  workingHours: {
    weekdays: "Monday – Saturday: 9:30 AM – 7:30 PM",
    weekend: "Sunday: Closed (Available for emergency queries on WhatsApp)",
  },

  socialLinks: {
    instagram: "https://instagram.com/managewithbhairav",
    facebook: "https://facebook.com/managewithbhairav",
    linkedin: "https://linkedin.com/company/managewithbhairav",
  },

  // WhatsApp Pre-filled templates (as explicitly requested)
  whatsappMessages: {
    itr: "Hello Manage With Bhairav, I need assistance with my Income Tax Return. Please let me know the required documents and process.",
    gst: "Hello Manage With Bhairav, I need assistance regarding GST. Please let me know the process and required documents.",
    accounting: "Hello Manage With Bhairav, I am looking for accounting/bookkeeping support for my business.",
    general: "Hello Manage With Bhairav, I would like to discuss a business/accounting requirement.",
    businessSupport: "Hello Manage With Bhairav, I would like to discuss practical business support & documentation for my business.",
    compliance: "Hello Manage With Bhairav, I need assistance with tax compliance and documentation requirements.",
  },

  // Color System Reference
  colors: {
    primaryNavy: "#0B1B36",
    secondaryGold: "#E58A1F",
    lightBackground: "#F8FAFC",
    darkText: "#0F172A",
  },
};

/**
 * Generate a validated WhatsApp link with a custom or pre-filled message
 */
export function getWhatsAppUrl(message?: string): string {
  const text = encodeURIComponent(message || brandConfig.whatsappMessages.general);
  return `https://wa.me/${brandConfig.whatsapp.number}?text=${text}`;
}
