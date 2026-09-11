export type EnquiryType = 'itr' | 'gst' | 'accounting' | 'business' | 'tax' | 'other' | 'general';

export interface ItrFormData {
  fullName: string;
  mobile: string;
  email: string;
  panNumber: string;
  assessmentYear: string;
  employmentType: string;
  incomeType: string[];
  previousItrFiled: 'Yes' | 'No' | '';
  message: string;
  consent: boolean;
}

export interface GstFormData {
  fullName: string;
  mobile: string;
  email: string;
  businessName: string;
  businessType: string;
  city: string;
  gstRegistrationRequired: string;
  existingGstNumber?: string;
  requirement: string;
  message: string;
  consent: boolean;
}

export interface AccountingFormData {
  name: string;
  mobile: string;
  email: string;
  businessName: string;
  businessType: string;
  accountingRequirement: string;
  frequency: string;
  message: string;
  consent: boolean;
}

export interface GeneralFormData {
  name: string;
  mobile: string;
  email: string;
  serviceCategory: string;
  message: string;
  consent: boolean;
}

export type RequestStatus = 'New' | 'Contacted' | 'In Progress' | 'Completed';

export interface ClientEnquiry {
  id: string;
  customerName: string;
  serviceType: 'ITR Filing' | 'GST Services' | 'Accounting & Bookkeeping' | 'Business Support' | 'Tax & Compliance' | 'Other Service';
  phone: string;
  email: string;
  date: string;
  status: RequestStatus;
  notes?: string;
  details: Record<string, any>;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}
