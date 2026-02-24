import React, { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { StatusBadge } from '../components/ui/StatusBadge';
import { mockFees, mockFunds, mockClients } from '../data/mockData';
import { FeeIcon, NairaIcon, PlusIcon } from '../components/icons/Icons';
import { MetricCard } from '../components/ui/MetricCard';
import { cn } from '../components/icons/Icons';
import { TableToolbar, TablePagination, useTableControls } from '../components/ui/TableControls';

export default function Fees() {
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
    const [filterStatus, setFilterStatus] = useState('All');
    const paid = mockFees.filter(f => f.status === 'Paid').length;
    const invoiced = mockFees.filter(f => f.status === 'Invoiced').length;

    const statuses = ['All', 'Paid', 'Invoiced', 'Calculated'];
    const baseFiltered = filterStatus === 'All' ? mockFees : mockFees.filter(f => f.status === filterStatus);

    const { search, setSearch, page, setPage, paged, totalItems, pageSize } = useTableControls(baseFiltered, 10);

    const exportData = baseFiltered.map(f => ({
        'Fee ID': f.id, Fund: f.fundName, Client: f.clientName, 'Fee Type': f.feeType,
        Period: f.period, 'Rate (%)': f.rate,
        'Fee Amount (₦)': f.monthlyFee || f.feeAmount || 0,
        Invoice: f.invoiceNo, Status: f.status,
    }));

    return (
        <AppShell>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-navy-900">Fee Calculation & Billing</h1>
                    <div className="flex space-x-3">
                        <button onClick={() => setIsInvoiceModalOpen(true)} className="px-4 py-2 bg-navy-900 text-white rounded text-sm font-medium hover:bg-navy-800 shadow-sm flex items-center">
                            <PlusIcon className="w-4 h-4 mr-2" /> Generate Invoice
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MetricCard label="Total Fee Revenue (YTD)" value="₦486.25M" isCurrency={false} trend="+18.4% vs prior year" icon={<NairaIcon />} iconBg="bg-gold-100 text-gold-600" />
                    <MetricCard label="Invoiced (Pending Payment)" value={invoiced.toString()} trend="₦13.13M outstanding" icon={<FeeIcon />} />
                    <MetricCard label="Paid" value={paid.toString()} trend="₦63.18M collected" icon={<FeeIcon />} iconBg="bg-success-bg" />
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                        <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-navy-900 text-sm">Fee Records</h3>
                            <div className="flex space-x-1">
                                {statuses.map(s => (
                                    <button key={s} onClick={() => setFilterStatus(s)} className={cn("px-3 py-1 text-xs font-medium rounded transition-colors", filterStatus === s ? "bg-navy-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200")}>{s}</button>
                                ))}
                            </div>
                        </div>
                        <TableToolbar searchValue={search} onSearchChange={setSearch} onRefresh={() => { }} exportData={exportData} exportFilename="fee_records" />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                                <tr>
                                    <th className="p-4 font-medium w-12">S/N</th>
                                    <th className="p-4 font-medium">Fee ID</th>
                                    <th className="p-4 font-medium">Fund</th>
                                    <th className="p-4 font-medium">Client</th>
                                    <th className="p-4 font-medium">Fee Type</th>
                                    <th className="p-4 font-medium">Period</th>
                                    <th className="p-4 font-medium text-right">Rate (%)</th>
                                    <th className="p-4 font-medium text-right">Fee Amount (₦)</th>
                                    <th className="p-4 font-medium">Invoice</th>
                                    <th className="p-4 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {paged.map((fee, idx) => (
                                    <tr key={fee.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 text-gray-400 text-xs font-mono">{(page - 1) * pageSize + idx + 1}</td>
                                        <td className="p-4 font-mono text-xs font-semibold text-navy-700">{fee.id}</td>
                                        <td className="p-4 text-gray-700 truncate max-w-[160px]">{fee.fundName.replace('ValuAlliance ', '')}</td>
                                        <td className="p-4 text-gray-700 truncate max-w-[160px]">{fee.clientName}</td>
                                        <td className="p-4">
                                            <span className="bg-navy-100 text-navy-700 text-xs font-medium px-2 py-0.5 rounded">{fee.feeType}</span>
                                        </td>
                                        <td className="p-4 text-gray-600">{fee.period}</td>
                                        <td className="p-4 text-right font-mono">{fee.rate}%</td>
                                        <td className="p-4 text-right font-mono font-medium text-navy-900">{(fee.monthlyFee || fee.feeAmount || 0).toLocaleString()}</td>
                                        <td className="p-4 font-mono text-xs text-gray-600">{fee.invoiceNo}</td>
                                        <td className="p-4"><StatusBadge status={fee.status} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <TablePagination currentPage={page} totalItems={totalItems} pageSize={pageSize} onPageChange={setPage} />
                </div>
            </div>

            {/* Generate Invoice Modal */}
            {isInvoiceModalOpen && (
                <div className="fixed inset-0 bg-navy-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-navy-900">Generate Invoice</h3>
                            <button onClick={() => setIsInvoiceModalOpen(false)} className="text-gray-400 hover:text-gray-600 font-bold">&times;</button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Client *</label>
                                <select className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none">
                                    <option>Select Client...</option>
                                    {mockClients.map(c => <option key={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Fund *</label>
                                <select className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none">
                                    <option>Select Fund...</option>
                                    {mockFunds.map(f => <option key={f.id}>{f.name}</option>)}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Fee Type</label>
                                    <select className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none">
                                        <option>Management Fee</option><option>Performance Fee</option><option>Custody Fee</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
                                    <select className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none">
                                        <option>Feb 2026</option><option>Jan 2026</option><option>Q4 2025</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Date</label>
                                <input type="date" className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none" defaultValue="2026-02-24" />
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
                            <button onClick={() => setIsInvoiceModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded text-gray-700 text-sm font-medium hover:bg-gray-100">Cancel</button>
                            <button onClick={() => { setIsInvoiceModalOpen(false); alert('Invoice generated and submitted for approval!'); }} className="px-4 py-2 bg-navy-900 text-white rounded text-sm font-medium shadow hover:bg-navy-800">Generate & Submit</button>
                        </div>
                    </div>
                </div>
            )}
        </AppShell>
    );
}
