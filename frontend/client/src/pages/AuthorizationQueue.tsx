import React, { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { StatusBadge } from '../components/ui/StatusBadge';
import { MetricCard } from '../components/ui/MetricCard';
import { AuthorizationQueueIcon, CheckCircleIcon, AlertIcon, FilterIcon, EyeIcon, cn } from '../components/icons/Icons';
import { TableToolbar, TablePagination, useTableControls } from '../components/ui/TableControls';

interface QueueItem {
    id: string;
    type: string;
    module: string;
    description: string;
    submittedBy: string;
    submittedDate: string;
    amount?: number;
    priority: string;
    status: string;
    reference: string;
    details: string;
}

const mockQueueItems: QueueItem[] = [
    {
        id: "AQ-001", type: "Trade Entry", module: "Trades", description: "Buy 50,000 DANGCEM @ ₦510.00",
        submittedBy: "Adaeze Okonkwo", submittedDate: "2026-02-24 08:15", amount: 25500000,
        priority: "High", status: "Pending Approval", reference: "TRD-2026-0249", details: "Buy order for Dangote Cement in Growth Fund Portfolio"
    },
    {
        id: "AQ-002", type: "Portfolio Creation", module: "Portfolio", description: "New Portfolio — FSDH Pension Balanced Fund",
        submittedBy: "Adaeze Okonkwo", submittedDate: "2026-02-24 09:00", amount: 0,
        priority: "Medium", status: "Pending Approval", reference: "P006", details: "Balanced fund portfolio for FSDH Pension client"
    },
    {
        id: "AQ-003", type: "Journal Posting", module: "Fund Accounting", description: "Management fee accrual — Growth Fund — Feb 2026",
        submittedBy: "Grace Nnamdi", submittedDate: "2026-02-23 16:45", amount: 18750000,
        priority: "Medium", status: "Pending Approval", reference: "JE-2026-0006", details: "Monthly management fee accrual for ValuAlliance Growth Fund"
    },
    {
        id: "AQ-004", type: "Fee Invoice", module: "Fees & Billing", description: "Q4 2025 performance fee invoice — ARM Pensions",
        submittedBy: "Grace Nnamdi", submittedDate: "2026-02-23 14:30", amount: 45320000,
        priority: "High", status: "Pending Approval", reference: "INV-2026-0004", details: "Performance fee calculation based on Q4 2025 benchmark outperformance"
    },
    {
        id: "AQ-005", type: "User Creation", module: "User Management", description: "New user — Ngozi Eze (Risk Analyst)",
        submittedBy: "Chukwuma Adekunle", submittedDate: "2026-02-23 11:00", amount: 0,
        priority: "Low", status: "Pending Approval", reference: "U009", details: "New risk analyst for the Compliance department"
    },
    {
        id: "AQ-006", type: "Trade Entry", module: "Trades", description: "Sell 100,000 ZENITHBANK @ ₦37.20",
        submittedBy: "Adaeze Okonkwo", submittedDate: "2026-02-22 15:30", amount: 3720000,
        priority: "High", status: "Approved", reference: "TRD-2026-0250", details: "Profit-taking sell order for Zenith Bank"
    },
    {
        id: "AQ-007", type: "Period Close", module: "Fund Accounting", description: "January 2026 period close — All Funds",
        submittedBy: "Grace Nnamdi", submittedDate: "2026-02-21 17:00", amount: 0,
        priority: "High", status: "Approved", reference: "PC-2026-01", details: "Monthly period close for all four funds"
    },
    {
        id: "AQ-008", type: "Client Report", module: "Client Management", description: "Q4 2025 performance report — batch generation",
        submittedBy: "Adaeze Okonkwo", submittedDate: "2026-02-21 10:00", amount: 0,
        priority: "Medium", status: "Rejected", reference: "RPT-2026-Q4", details: "Quarterly performance reports for all institutional clients — rejected due to incomplete NAV data"
    },
];

export default function AuthorizationQueue() {
    const [activeTab, setActiveTab] = useState('All');
    const [selectedItem, setSelectedItem] = useState<QueueItem | null>(null);
    const [showApproveConfirm, setShowApproveConfirm] = useState(false);
    const [showRejectConfirm, setShowRejectConfirm] = useState(false);

    const tabs = ['All', 'Pending Approval', 'Approved', 'Rejected'];
    const filteredItems = activeTab === 'All' ? mockQueueItems : mockQueueItems.filter(i => i.status === activeTab);
    const pendingCount = mockQueueItems.filter(i => i.status === 'Pending Approval').length;
    const approvedCount = mockQueueItems.filter(i => i.status === 'Approved').length;
    const rejectedCount = mockQueueItems.filter(i => i.status === 'Rejected').length;

    const { search, setSearch, page, setPage, paged, totalItems, pageSize } = useTableControls(filteredItems, 10);
    const exportData = filteredItems.map(i => ({
        'Request ID': i.id, Type: i.type, Module: i.module, Description: i.description,
        'Submitted By': i.submittedBy, Date: i.submittedDate, 'Amount (₦)': i.amount || '', Priority: i.priority, Status: i.status,
    }));

    return (
        <AppShell>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-navy-900">Authorization Queue</h1>
                        <p className="text-sm text-gray-500 mt-1">Maker-checker workflow — all requests pending approval</p>
                    </div>
                    <div className="flex space-x-3">
                        <button className="px-3 py-2 bg-white border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 flex items-center text-sm font-medium shadow-sm">
                            <FilterIcon className="w-4 h-4 mr-2" /> Filter
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MetricCard label="Pending Approval" value={pendingCount.toString()} trend="Requires action" trendPositive={false} icon={<AlertIcon />} iconBg="bg-warning-bg" iconSize="lg" />
                    <MetricCard label="Approved (This Week)" value={approvedCount.toString()} trend="Processed successfully" icon={<CheckCircleIcon />} iconBg="bg-success-bg" iconSize="lg" />
                    <MetricCard label="Rejected" value={rejectedCount.toString()} trend="Returned to maker" trendPositive={false} icon={<AuthorizationQueueIcon />} iconBg="bg-danger-bg" iconSize="lg" />
                </div>

                <div className="flex space-x-1 border-b border-gray-200 overflow-x-auto">
                    {tabs.map(tab => {
                        const count = tab === 'All' ? mockQueueItems.length : mockQueueItems.filter(i => i.status === tab).length;
                        return (
                            <button key={tab} onClick={() => setActiveTab(tab)} className={cn(
                                "px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                                activeTab === tab ? "border-gold-500 text-navy-900" : "border-transparent text-gray-500 hover:text-navy-700"
                            )}>
                                {tab} <span className="ml-1.5 bg-gray-100 text-gray-600 py-0.5 px-2 rounded text-xs">{count}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                        <h3 className="font-semibold text-navy-900 text-sm">Authorization Requests</h3>
                        <TableToolbar searchValue={search} onSearchChange={setSearch} onRefresh={() => { }} exportData={exportData} exportFilename="authorization_queue" />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                                <tr>
                                    <th className="p-4 font-medium w-12">S/N</th>
                                    <th className="p-4 font-medium">Request ID</th>
                                    <th className="p-4 font-medium">Type</th>
                                    <th className="p-4 font-medium">Module</th>
                                    <th className="p-4 font-medium">Description</th>
                                    <th className="p-4 font-medium">Submitted By</th>
                                    <th className="p-4 font-medium">Date</th>
                                    <th className="p-4 font-medium text-right">Amount (₦)</th>
                                    <th className="p-4 font-medium">Priority</th>
                                    <th className="p-4 font-medium">Status</th>
                                    <th className="p-4 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {paged.map((item, idx) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 text-gray-400 text-xs text-center">{(page - 1) * pageSize + idx + 1}</td>
                                        <td className="p-4 text-xs font-semibold text-navy-700">{item.id}</td>
                                        <td className="p-4"><span className="bg-navy-100 text-navy-700 text-xs font-medium px-2 py-0.5 rounded">{item.type}</span></td>
                                        <td className="p-4 text-gray-600">{item.module}</td>
                                        <td className="p-4 text-gray-700 max-w-[250px] truncate">{item.description}</td>
                                        <td className="p-4 text-gray-700 whitespace-nowrap">{item.submittedBy}</td>
                                        <td className="p-4 text-xs text-gray-600 whitespace-nowrap">{item.submittedDate}</td>
                                        <td className="p-4 text-right font-medium text-navy-900">{item.amount ? item.amount.toLocaleString() : '—'}</td>
                                        <td className="p-4">
                                            <span className={cn("text-xs font-medium px-2 py-0.5 rounded",
                                                item.priority === 'High' ? 'bg-danger-bg text-danger' :
                                                    item.priority === 'Medium' ? 'bg-warning-bg text-warning' :
                                                        'bg-gray-100 text-gray-500'
                                            )}>{item.priority}</span>
                                        </td>
                                        <td className="p-4"><StatusBadge status={item.status} /></td>
                                        <td className="p-4">
                                            <div className="flex space-x-2">
                                                <button onClick={() => setSelectedItem(item)} className="p-1.5 bg-gray-100 rounded hover:bg-gray-200 transition-colors" title="View Details">
                                                    <EyeIcon className="w-3.5 h-3.5 text-gray-600" />
                                                </button>
                                                {item.status === 'Pending Approval' && (
                                                    <>
                                                        <button onClick={() => { setSelectedItem(item); setShowApproveConfirm(true); }} className="text-xs bg-success text-white px-2 py-1 rounded hover:bg-success/90">Approve</button>
                                                        <button onClick={() => { setSelectedItem(item); setShowRejectConfirm(true); }} className="text-xs bg-white border border-danger text-danger px-2 py-1 rounded hover:bg-danger-bg">Reject</button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <TablePagination currentPage={page} totalItems={totalItems} pageSize={pageSize} onPageChange={setPage} />
                </div>

                {/* Detail Side Panel */}
                {selectedItem && !showApproveConfirm && !showRejectConfirm && (
                    <div className="fixed inset-y-0 right-0 w-[480px] bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.1)] border-l border-gray-200 z-40 flex flex-col">
                        <div className="px-6 py-4 border-b border-gray-200 bg-navy-900 text-white flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold">{selectedItem.type}</h3>
                                <p className="text-xs text-gold-400">{selectedItem.id} · {selectedItem.reference}</p>
                            </div>
                            <button onClick={() => setSelectedItem(null)} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
                        </div>
                        <div className="p-6 flex-1 overflow-y-auto space-y-6">
                            <div>
                                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Request Details</h4>
                                <div className="grid grid-cols-2 gap-y-4 text-sm">
                                    <div><p className="text-gray-500 text-xs mb-1">Module</p><p className="font-medium text-navy-900">{selectedItem.module}</p></div>
                                    <div><p className="text-gray-500 text-xs mb-1">Priority</p><StatusBadge status={selectedItem.priority} /></div>
                                    <div><p className="text-gray-500 text-xs mb-1">Submitted By</p><p className="font-medium text-navy-900">{selectedItem.submittedBy}</p></div>
                                    <div><p className="text-gray-500 text-xs mb-1">Submitted Date</p><p className="text-navy-900">{selectedItem.submittedDate}</p></div>
                                    {selectedItem.amount ? <div><p className="text-gray-500 text-xs mb-1">Amount</p><p className="font-bold text-navy-900">₦{selectedItem.amount.toLocaleString()}</p></div> : null}
                                    <div><p className="text-gray-500 text-xs mb-1">Reference</p><p className="text-navy-900">{selectedItem.reference}</p></div>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Description</h4>
                                <p className="text-sm text-gray-700 bg-gray-50 p-4 rounded">{selectedItem.details}</p>
                            </div>
                            <div>
                                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Status</h4>
                                <StatusBadge status={selectedItem.status} />
                            </div>
                        </div>
                        {selectedItem.status === 'Pending Approval' && (
                            <div className="p-4 border-t border-gray-200 bg-gray-50 flex gap-3">
                                <button onClick={() => setShowApproveConfirm(true)} className="flex-1 bg-success text-white py-2 rounded shadow font-medium hover:bg-success/90 transition-colors">Approve</button>
                                <button onClick={() => setShowRejectConfirm(true)} className="flex-1 bg-white border border-danger text-danger py-2 rounded shadow-sm font-medium hover:bg-danger-bg transition-colors">Reject</button>
                            </div>
                        )}
                    </div>
                )}

                {/* Approve Confirmation Modal */}
                {showApproveConfirm && selectedItem && (
                    <div className="fixed inset-0 bg-navy-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-success-bg rounded-full flex items-center justify-center mr-4"><CheckCircleIcon className="w-6 h-6 text-success" /></div>
                                <div>
                                    <h3 className="text-lg font-bold text-navy-900">Approve Request?</h3>
                                    <p className="text-sm text-gray-500">{selectedItem.id} — {selectedItem.type}</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">{selectedItem.description}</p>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Approval Comment (Optional)</label>
                                <textarea className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none" rows={3} placeholder="Add approval notes..." />
                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => { setShowApproveConfirm(false); setSelectedItem(null); }} className="flex-1 px-4 py-2 border border-gray-300 rounded text-gray-700 text-sm font-medium hover:bg-gray-100">Cancel</button>
                                <button onClick={() => { setShowApproveConfirm(false); setSelectedItem(null); alert('Request approved successfully!'); }} className="flex-1 px-4 py-2 bg-success text-white rounded text-sm font-medium shadow hover:bg-success/90">Confirm Approval</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Reject Confirmation Modal */}
                {showRejectConfirm && selectedItem && (
                    <div className="fixed inset-0 bg-navy-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-danger-bg rounded-full flex items-center justify-center mr-4"><AlertIcon className="w-6 h-6 text-danger" /></div>
                                <div>
                                    <h3 className="text-lg font-bold text-navy-900">Reject Request?</h3>
                                    <p className="text-sm text-gray-500">{selectedItem.id} — {selectedItem.type}</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">{selectedItem.description}</p>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Rejection Reason <span className="text-danger">*</span></label>
                                <textarea className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none" rows={3} placeholder="Reason for rejection is required..." />
                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => { setShowRejectConfirm(false); setSelectedItem(null); }} className="flex-1 px-4 py-2 border border-gray-300 rounded text-gray-700 text-sm font-medium hover:bg-gray-100">Cancel</button>
                                <button onClick={() => { setShowRejectConfirm(false); setSelectedItem(null); alert('Request rejected.'); }} className="flex-1 px-4 py-2 bg-danger text-white rounded text-sm font-medium shadow hover:bg-danger/90">Confirm Rejection</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}
