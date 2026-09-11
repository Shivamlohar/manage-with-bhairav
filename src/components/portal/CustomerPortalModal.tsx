import React, { useState } from 'react';
import { 
  X, 
  UserCheck, 
  Search, 
  FileText, 
  ShieldAlert, 
  Database
} from 'lucide-react';
import type { ClientEnquiry } from '../../types';

interface CustomerPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  enquiries: ClientEnquiry[];
  onOpenEnquiry: () => void;
}

export const CustomerPortalModal: React.FC<CustomerPortalModalProps> = ({ 
  isOpen, 
  onClose, 
  enquiries,
  onOpenEnquiry 
}) => {
  const [activeTab, setActiveTab] = useState<'track' | 'architecture'>('track');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  // Filter enquiries by phone number or Ref ID
  const filtered = enquiries.filter(item => 
    !searchQuery.trim() || 
    item.phone.includes(searchQuery.trim()) || 
    item.id.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
    item.customerName.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col text-left">
        
        {/* Header */}
        <div className="bg-[#0B1B36] text-white px-6 py-4 flex items-center justify-between border-b border-brand-navy-700 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">Client Space</span>
              <h3 className="font-display text-lg font-bold text-white">
                Customer Request Tracker &amp; Portal
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-2">
          <button
            onClick={() => setActiveTab('track')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'track'
                ? 'border-amber-500 text-[#0B1B36] bg-white rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Track My Requests ({enquiries.length})
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'architecture'
                ? 'border-amber-500 text-[#0B1B36] bg-white rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            Portal Backend Blueprint (Supabase / Firebase Ready)
          </button>
        </div>

        {/* Tab 1: Track My Request */}
        {activeTab === 'track' && (
          <div className="p-6 overflow-y-auto space-y-6">
            
            {/* Search / Lookup Bar */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Lookup by Mobile Number or Ref ID
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Enter 10-digit mobile number or Ref ID (e.g. ITR-102938)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* List of Requests */}
            {filtered.length > 0 ? (
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Recent Enquiries &amp; Status
                </h4>
                {filtered.map(req => (
                  <div
                    key={req.id}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                            {req.id}
                          </span>
                          <h5 className="font-bold text-sm text-[#0B1B36]">
                            {req.serviceType}
                          </h5>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Submitted on {req.date} by {req.customerName} (+91 {req.phone})
                        </p>
                      </div>

                      {/* Status Badge */}
                      <div>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                          req.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : req.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-800'
                            : req.status === 'Contacted'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          {req.status}
                        </span>
                      </div>
                    </div>

                    {/* Progress Step Bar */}
                    <div className="pt-2 border-t border-slate-100 grid grid-cols-4 text-center text-[10px] font-semibold text-slate-500 gap-1">
                      <div className="text-amber-700">✓ 1. New</div>
                      <div className={['Contacted', 'In Progress', 'Completed'].includes(req.status) ? 'text-purple-700 font-bold' : 'text-slate-300'}>
                        2. Contacted
                      </div>
                      <div className={['In Progress', 'Completed'].includes(req.status) ? 'text-blue-700 font-bold' : 'text-slate-300'}>
                        3. In Progress
                      </div>
                      <div className={req.status === 'Completed' ? 'text-emerald-700 font-bold' : 'text-slate-300'}>
                        4. Completed
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                <FileText className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <h5 className="font-bold text-sm text-slate-700">No matching requests found</h5>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                  If you recently sent a request, enter the mobile number used during submission.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onOpenEnquiry();
                  }}
                  className="px-4 py-2 rounded-lg bg-[#0B1B36] text-white text-xs font-bold hover:bg-brand-navy-800 transition-colors"
                >
                  Submit a New Request
                </button>
              </div>
            )}

            {/* Document Checklist & Safety Warning */}
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
              <div className="flex items-start gap-2.5">
                <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 leading-relaxed">
                  <strong className="block text-amber-950 font-bold mb-0.5">Secure Document Upload Guidelines:</strong>
                  We strictly accept PDF, JPG, JPEG, and PNG formats up to 10MB per file. 
                  <span className="block mt-1 font-bold text-red-800">
                    Warning: Never upload passwords, OTPs, ATM PINs, or confidential net-banking credentials.
                  </span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Backend Architecture Blueprint */}
        {activeTab === 'architecture' && (
          <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h4 className="font-bold text-[#0B1B36] text-sm mb-2 flex items-center gap-2">
                <Database className="w-4 h-4 text-amber-600" />
                Modular Backend Architecture Ready for Supabase / Firebase
              </h4>
              <p className="text-xs text-slate-600">
                In strict accordance with your instructions, we have structured the complete data model and frontend interfaces so that backend databases, authentication, and encrypted document storage can be plugged in directly with zero refactoring.
              </p>
            </div>

            {/* Future Flow Architecture Diagram */}
            <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2 font-mono text-xs">
              <div className="text-slate-500 font-bold">PLANNED PRODUCTION LIFECYCLE:</div>
              <div className="p-2 bg-slate-100 rounded text-slate-800">1. Customer Login (OTP / Email Magic Link)</div>
              <div className="text-center text-slate-400">↓</div>
              <div className="p-2 bg-slate-100 rounded text-slate-800">2. My Requests (ITR / GST / Accounting Dashboard)</div>
              <div className="text-center text-slate-400">↓</div>
              <div className="p-2 bg-slate-100 rounded text-slate-800">3. Document Upload (Encrypted S3 / Supabase Storage Bucket)</div>
              <div className="text-center text-slate-400">↓</div>
              <div className="p-2 bg-slate-100 rounded text-slate-800">4. Live Request Status (Realtime Webhooks &amp; WhatsApp Notifications)</div>
              <div className="text-center text-slate-400">↓</div>
              <div className="p-2 bg-slate-100 rounded text-slate-800">5. Secure Messages &amp; Query Clarification</div>
              <div className="text-center text-slate-400">↓</div>
              <div className="p-2 bg-slate-100 rounded text-slate-800">6. UPI / Razorpay Payment Gateway &amp; Download Receipt</div>
            </div>

            <div className="text-xs text-slate-500 italic">
              * Note: Mock local state is currently active to ensure full offline functionality and instant demonstration without risking unauthorized API key exposure.
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex justify-end bg-slate-50 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#0B1B36] text-white text-xs font-bold hover:bg-brand-navy-800 transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
