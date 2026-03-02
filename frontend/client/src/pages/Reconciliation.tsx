import React, { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { MetricCard } from '../components/ui/MetricCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import { mockReconciliationBreaks, mockReconSummary } from '../data/mockData';
import { ReconciliationIcon, CheckCircleIcon, AlertIcon, RefreshIcon, cn } from '../components/icons/Icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TableToolbar, TablePagination, useTableControls } from '../components/ui/TableControls';

export default function Reconciliation() {
    const [filterStatus, setFilterStatus] = useState('All');
    const open = mockReconciliationBreaks.filter(b => b.status === 'Open').length;
    const investigating = mockReconciliationBreaks.filter(b => b.status === 'Under Investigation').length;
    const resolved = mockReconciliationBreaks.filter(b => b.status === 'Resolved').length;

    const statuses = ['All', 'Open', 'Under Investigation', 'Resolved'];
    const baseFiltered = filterStatus === 'All' ? mockReconciliationBreaks : mockReconciliationBreaks.filter(b => b.status === filterStatus);

    const { search, setSearch, page, setPage, paged, totalItems, pageSize } = useTableControls(baseFiltered, 10);

    const exportData = baseFiltered.map(b => ({
        'Break ID': b.id, Date: b.date, Portfolio: b.portfolioId, Security: b.security,
        'Break Type': b.breakType, Difference: b.difference, 'Assigned To': b.assignedTo,
        'Age (days)': b.ageDays, Priority: b.priority, Status: b.status,
    }));

    return (
        <AppShell>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-navy-900">Reconciliation Engine</h1>
                        <p className="text-sm text-gray-500 mt-1">Last reconciliation run: 23 Feb 2026 06:00 | Next run: 24 Feb 2026 06:00</p>
                    </div>
                    <button className="px-4 py-2 bg-navy-900 text-white rounded text-sm font-medium hover:bg-navy-800 flex items-center shadow-sm">
                        <RefreshIcon className="w-4 h-4 mr-2" /> Run Reconciliation
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <MetricCard label="Total Positions Reconciled" value="48" trend="Today" icon={<ReconciliationIcon />} />
                    <MetricCard label="Matched" value="45" trend="93.75% match rate" icon={<CheckCircleIcon />} iconBg="bg-success-bg" />
                    <MetricCard label="Open Breaks" value={(open + investigating).toString()} trend="Requires attention" trendPositive={false} icon={<AlertIcon />} iconBg="bg-danger-bg" />
                    <MetricCard label="Resolved Today" value={resolved.toString()} trend="Auto-resolved" icon={<CheckCircleIcon />} iconBg="bg-success-bg" />
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                        <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-navy-900 text-sm">Reconciliation Breaks</h3>
                            <div className="flex space-x-1">
                                {statuses.map(s => (
                                    <button key={s} onClick={() => setFilterStatus(s)} className={cn("px-3 py-1 text-xs font-medium rounded transition-colors", filterStatus === s ? "bg-navy-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200")}>{s}</button>
                                ))}
                            </div>
                        </div>
                        <TableToolbar searchValue={search} onSearchChange={setSearch} onRefresh={() => { }} exportData={exportData} exportFilename="reconciliation_breaks" />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                                <tr>
                                    <th className="p-4 font-medium w-12">S/N</th>
                                    <th className="p-4 font-medium">Break ID</th>
                                    <th className="p-4 font-medium">Date</th>
                                    <th className="p-4 font-medium">Portfolio</th>
                                    <th className="p-4 font-medium">Security</th>
                                    <th className="p-4 font-medium">Break Type</th>
                                    <th className="p-4 font-medium text-right">Difference</th>
                                    <th className="p-4 font-medium">Assigned To</th>
                                    <th className="p-4 font-medium text-right">Age</th>
                                    <th className="p-4 font-medium">Priority</th>
                                    <th className="p-4 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {paged.map((b, idx) => (
                                    <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 text-gray-400 text-xs text-center">{(page - 1) * pageSize + idx + 1}</td>
                                        <td className="p-4 text-xs font-semibold text-navy-700">{b.id}</td>
                                        <td className="p-4 text-gray-600">{b.date}</td>
                                        <td className="p-4 text-gray-700">{b.portfolioId}</td>
                                        <td className="p-4 font-medium text-navy-900">{b.security}</td>
                                        <td className="p-4"><span className="bg-navy-100 text-navy-700 text-xs font-medium px-2 py-0.5 rounded">{b.breakType}</span></td>
                                        <td className="p-4 text-right font-medium text-navy-900">{typeof b.difference === 'number' ? b.difference.toLocaleString() : b.difference}</td>
                                        <td className="p-4 text-gray-700">{b.assignedTo}</td>
                                        <td className="p-4 text-right">{b.ageDays}d</td>
                                        <td className="p-4">
                                            <span className={cn("text-xs font-medium px-2 py-0.5 rounded",
                                                b.priority === 'High' ? 'bg-danger-bg text-danger' :
                                                    b.priority === 'Medium' ? 'bg-warning-bg text-warning' :
                                                        'bg-gray-100 text-gray-500'
                                            )}>{b.priority}</span>
                                        </td>
                                        <td className="p-4"><StatusBadge status={b.status} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <TablePagination currentPage={page} totalItems={totalItems} pageSize={pageSize} onPageChange={setPage} />
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                    <h3 className="text-base font-semibold text-navy-900 mb-4">Reconciliation Summary — Last 7 Days</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={mockReconSummary} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="matched" name="Matched" fill="#059669" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="open" name="Open" fill="#D97706" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="resolved" name="Resolved" fill="#0E4535" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}
