import React, { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { MetricCard } from '../components/ui/MetricCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import { mockSettlements } from '../data/mockData';
import { SettlementIcon, AlertIcon, CheckCircleIcon, RefreshIcon, CSCSLogo, cn } from '../components/icons/Icons';
import { TableToolbar, TablePagination, useTableControls } from '../components/ui/TableControls';

export default function Settlement() {
    const [filterStatus, setFilterStatus] = useState('All');
    const settled = mockSettlements.filter(s => s.status === 'Settled').length;
    const pending = mockSettlements.filter(s => s.status === 'Pending').length;
    const failed = mockSettlements.filter(s => s.status === 'Failed').length;

    const statuses = ['All', 'Settled', 'Pending', 'Failed'];
    const baseFiltered = filterStatus === 'All' ? mockSettlements : mockSettlements.filter(s => s.status === filterStatus);

    const { search, setSearch, page, setPage, paged, totalItems, pageSize } = useTableControls(baseFiltered, 10);

    const exportData = baseFiltered.map(s => ({
        'Settlement ID': s.id, 'Trade ID': s.tradeId, Security: s.ticker,
        Client: s.clientName, Side: s.side, 'Net Value': s.netValue,
        'Settlement Date': s.settlementDate, 'DvP Status': s.dvpStatus, Status: s.status,
    }));

    return (
        <AppShell>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-navy-900">Settlement Processing</h1>
                        <p className="text-sm text-gray-500 mt-1">Post-trade settlement with CSD integration and exception management</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <MetricCard label="Total Settlements" value={mockSettlements.length.toString()} trend="Last 7 days" icon={<SettlementIcon />} />
                    <MetricCard label="Settled" value={settled.toString()} trend="DvP Confirmed" icon={<CheckCircleIcon />} iconBg="bg-success-bg" />
                    <MetricCard label="Pending" value={pending.toString()} trend="Awaiting match" icon={<RefreshIcon />} iconBg="bg-warning-bg" />
                    <MetricCard label="Failed" value={failed.toString()} trend="Requires action" trendPositive={false} icon={<AlertIcon />} iconBg="bg-danger-bg" />
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                        <div className="flex items-center gap-4">
                            <h3 className="font-semibold text-navy-900 text-sm">Settlement Queue</h3>
                            <div className="flex space-x-1">
                                {statuses.map(s => (
                                    <button key={s} onClick={() => setFilterStatus(s)} className={cn("px-3 py-1 text-xs font-medium rounded transition-colors", filterStatus === s ? "bg-navy-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200")}>{s}</button>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2"><CSCSLogo /><span className="text-xs text-gray-500">Custodian Active</span></div>
                            <TableToolbar searchValue={search} onSearchChange={setSearch} onRefresh={() => { }} exportData={exportData} exportFilename="settlements" />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                                <tr>
                                    <th className="p-4 font-medium w-12">S/N</th>
                                    <th className="p-4 font-medium">Settlement ID</th>
                                    <th className="p-4 font-medium">Trade ID</th>
                                    <th className="p-4 font-medium">Security</th>
                                    <th className="p-4 font-medium">Client</th>
                                    <th className="p-4 font-medium">Side</th>
                                    <th className="p-4 font-medium text-right">Net Value (₦)</th>
                                    <th className="p-4 font-medium">Sett. Date</th>
                                    <th className="p-4 font-medium">DvP Status</th>
                                    <th className="p-4 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {paged.map((s, idx) => (
                                    <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 text-gray-400 text-xs font-mono">{(page - 1) * pageSize + idx + 1}</td>
                                        <td className="p-4 font-mono text-xs font-semibold text-navy-700">{s.id}</td>
                                        <td className="p-4 font-mono text-xs text-gray-600">{s.tradeId}</td>
                                        <td className="p-4 font-medium text-navy-900">{s.ticker}</td>
                                        <td className="p-4 text-gray-600 truncate max-w-[180px]">{s.clientName}</td>
                                        <td className="p-4">
                                            <span className={cn("text-xs font-bold px-2 py-0.5 rounded", s.side === 'Buy' ? "bg-navy-100 text-navy-700" : "bg-red-100 text-danger")}>{s.side}</span>
                                        </td>
                                        <td className="p-4 text-right font-mono font-medium text-navy-900">{s.netValue.toLocaleString()}</td>
                                        <td className="p-4 font-mono text-gray-600">{s.settlementDate}</td>
                                        <td className="p-4">
                                            <span className={cn("text-xs font-medium px-2 py-0.5 rounded",
                                                s.dvpStatus === 'Matched' ? "bg-success-bg text-success" :
                                                    s.dvpStatus === 'Rejected' ? "bg-danger-bg text-danger" :
                                                        "bg-warning-bg text-warning"
                                            )}>{s.dvpStatus}</span>
                                        </td>
                                        <td className="p-4"><StatusBadge status={s.status} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <TablePagination currentPage={page} totalItems={totalItems} pageSize={pageSize} onPageChange={setPage} />
                </div>

                {failed > 0 && (
                    <div className="bg-danger-bg border border-danger/20 rounded-lg p-4 flex items-start">
                        <AlertIcon className="w-5 h-5 text-danger mr-3 mt-0.5 shrink-0" />
                        <div>
                            <p className="font-semibold text-danger text-sm">Failed Settlement Requires Attention</p>
                            <p className="text-xs text-gray-600 mt-1">{mockSettlements.find(s => s.status === 'Failed')?.failureReason}</p>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}
