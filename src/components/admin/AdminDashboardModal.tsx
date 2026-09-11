import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Search, 
  Filter, 
  MessageSquare, 
  Archive,
  Eye,
  LogOut
} from 'lucide-react';
import type { ClientEnquiry, RequestStatus } from '../../types';
import { getWhatsAppUrl } from '../../config/brandConfig';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  enquiries: ClientEnquiry[];
  onUpdateStatus: (id: string, newStatus: RequestStatus) => void;
  onArchiveRequest: (id: string) => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  enquiries,
  onUpdateStatus,
  onArchiveRequest,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [selectedRequest, setSelectedRequest] = useState<ClientEnquiry | null>(null);

  if (!isOpen) return null;

  // Simple client-side demo PIN (never hardcoding real production secrets)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === '1234' || passcode === 'admin') {
      setIsAuthenticated(true);
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasscode('');
    setSelectedRequest(null);
  };

  // Metrics
  const totalCount = enquiries.length;
  const newCount = enquiries.filter(e => e.status === 'New').length;
  const inProgressCount = enquiries.filter(e => e.status === 'In Progress').length;
  const completedCount = enquiries.filter(e => e.status === 'Completed').length;

  // Filtered list
  const filteredList = enquiries.filter(item => {
    const matchesSearch = 
      item.customerName.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.includes(search) ||
      item.serviceType.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col text-left">
        
        {/* Header */}
        <div className="bg-[#0B1B36] text-white px-6 py-4 flex items-center justify-between border-b border-brand-navy-700 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">Internal Management</span>
              <h3 className="font-display text-lg font-bold text-white">
                Admin Desk — Manage With Bhairav
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="text-xs text-slate-300 hover:text-white px-2.5 py-1 rounded bg-white/10 flex items-center gap-1.5 transition-colors"
                title="Lock Session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Lock</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PIN Authentication Gate */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto">
            <div className="w-14 h-14 bg-brand-navy-50 text-brand-navy-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-navy-200 shadow-sm">
              <Lock className="w-7 h-7 text-amber-500" />
            </div>
            <h4 className="font-display text-xl font-bold text-[#0B1B36] mb-1">
              Admin Authentication
            </h4>
            <p className="text-xs text-slate-500 mb-6">
              Enter your access PIN to inspect incoming client tax &amp; business enquiries.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={passcode}
                  onChange={e => setPasscode(e.target.value)}
                  placeholder="Enter PIN (Default demo PIN: 1234)"
                  className="w-full text-center tracking-widest text-lg font-mono px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  autoFocus
                />
                {passcodeError && (
                  <p className="text-xs text-red-500 mt-2 font-medium">
                    Incorrect PIN. Please enter 1234 or contact administrator.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-[#0B1B36] text-white text-xs font-bold hover:bg-brand-navy-800 transition-colors shadow-sm"
              >
                Access Dashboard
              </button>

              <div className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                🔒 Security Note: Demo authentication mode active. Backend integration point ready for Supabase Auth / JWT.
              </div>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div className="p-6 overflow-y-auto space-y-6 flex-grow">
            
            {/* Top Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Requests</div>
                <div className="text-2xl font-bold text-[#0B1B36] mt-1">{totalCount}</div>
              </div>

              <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200/80">
                <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider">New Requests</div>
                <div className="text-2xl font-bold text-amber-900 mt-1">{newCount}</div>
              </div>

              <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-200/80">
                <div className="text-xs font-semibold text-blue-800 uppercase tracking-wider">In Progress</div>
                <div className="text-2xl font-bold text-blue-900 mt-1">{inProgressCount}</div>
              </div>

              <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200/80">
                <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">Completed</div>
                <div className="text-2xl font-bold text-emerald-900 mt-1">{completedCount}</div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search customer, phone, ID..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-3.5 h-3.5 text-slate-500" />
                <select
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="All">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Requests Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100/90 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3">Ref ID &amp; Date</th>
                      <th className="px-4 py-3">Customer</th>
                      <th className="px-4 py-3">Service</th>
                      <th className="px-4 py-3">Phone</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {filteredList.map(req => {
                      const whatsappFollowup = `Hello ${req.customerName}, this is Manage With Bhairav regarding your recent ${req.serviceType} enquiry (Ref: ${req.id}). How may we assist you today?`;
                      return (
                        <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className="font-mono font-bold text-slate-800">{req.id}</span>
                            <div className="text-[11px] text-slate-600">{req.date}</div>
                          </td>

                          <td className="px-4 py-3 font-semibold text-slate-900 whitespace-nowrap">
                            {req.customerName}
                          </td>

                          <td className="px-4 py-3 text-slate-700 whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded bg-slate-100 font-medium">
                              {req.serviceType}
                            </span>
                          </td>

                          <td className="px-4 py-3 whitespace-nowrap">
                            <a href={`tel:+91${req.phone}`} className="text-brand-navy-900 font-mono hover:underline">
                              +91 {req.phone}
                            </a>
                          </td>

                          <td className="px-4 py-3 whitespace-nowrap">
                            <select
                              value={req.status}
                              onChange={e => onUpdateStatus(req.id, e.target.value as RequestStatus)}
                              className={`text-[11px] font-bold px-2 py-1 rounded-md border focus:outline-none ${
                                req.status === 'Completed'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : req.status === 'In Progress'
                                  ? 'bg-blue-50 text-blue-800 border-blue-300'
                                  : req.status === 'Contacted'
                                  ? 'bg-purple-50 text-purple-800 border-purple-300'
                                  : 'bg-amber-50 text-amber-800 border-amber-300'
                              }`}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </td>

                          <td className="px-4 py-3 text-right whitespace-nowrap space-x-2">
                            <button
                              onClick={() => setSelectedRequest(req)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                              title="View Full Details"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>

                            <a
                              href={getWhatsAppUrl(whatsappFollowup)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors inline-block"
                              title="Message on WhatsApp"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </a>

                            <button
                              onClick={() => onArchiveRequest(req.id)}
                              className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                              title="Archive Request"
                            >
                              <Archive className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Detail Modal Overlay if View is clicked */}
            {selectedRequest && (
              <div className="fixed inset-0 z-60 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl p-6 max-w-lg w-full border border-slate-200 shadow-2xl text-left space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <span className="font-mono text-xs font-bold text-amber-600">{selectedRequest.id}</span>
                      <h4 className="font-display font-bold text-base text-[#0B1B36]">
                        {selectedRequest.serviceType} Details
                      </h4>
                    </div>
                    <button
                      onClick={() => setSelectedRequest(null)}
                      className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2 text-xs text-slate-700">
                    <div><strong>Customer Name:</strong> {selectedRequest.customerName}</div>
                    <div><strong>Mobile:</strong> +91 {selectedRequest.phone}</div>
                    <div><strong>Email:</strong> {selectedRequest.email || 'Not provided'}</div>
                    <div><strong>Date Received:</strong> {selectedRequest.date}</div>
                    <div><strong>Current Status:</strong> {selectedRequest.status}</div>
                    
                    <div className="pt-2 border-t border-slate-100">
                      <strong>Submitted Information:</strong>
                      <pre className="mt-1 p-3 bg-slate-50 rounded-lg text-[11px] text-slate-800 overflow-x-auto whitespace-pre-wrap font-sans">
                        {JSON.stringify(selectedRequest.details, null, 2)}
                      </pre>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                    <button
                      onClick={() => setSelectedRequest(null)}
                      className="px-4 py-2 rounded-lg bg-[#0B1B36] text-white text-xs font-bold hover:bg-brand-navy-800"
                    >
                      Close Details
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex justify-end bg-slate-50 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors"
          >
            Close Panel
          </button>
        </div>

      </div>
    </div>
  );
};
