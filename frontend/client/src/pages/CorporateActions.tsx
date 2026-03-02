import React, { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { StatusBadge } from '../components/ui/StatusBadge';
import { mockCorporateActions } from '../data/mockData';
import { cn } from '../components/icons/Icons';
import { TableToolbar, TablePagination, useTableControls } from '../components/ui/TableControls';

export default function CorporateActions() {
    const [filter, setFilter] = useState('All');
    const tabs = ['All', 'Upcoming', 'Processed'];
    const baseFiltered = filter === 'All' ? mockCorporateActions :
        filter === 'Upcoming' ? mockCorporateActions.filter(a => a.status === 'Upcoming') :
            mockCorporateActions.filter(a => a.status === 'Processed');

    const { search, setSearch, page, setPage, paged, totalItems, pageSize } = useTableControls(baseFiltered, 10);

    const exportData = baseFiltered.map(ca => ({
        'Action ID': ca.id, Security: ca.ticker, Type: ca.type,
        'Ex-Date': ca.exDate || ca.couponDate || '', 'Pay Date': ca.payDate,
        Details: ca.perUnit || ca.ratio || (ca.rate ? `${ca.rate}% coupon` : ''),
        'Affected Portfolios': ca.affectedPortfolios.join(', '), Status: ca.status,
    }));

    return (
        <AppShell>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-navy-900">Corporate Actions</h1>
                </div>

                <div className="flex space-x-1 border-b border-gray-200 overflow-x-auto">
                    {tabs.map(tab => (
                        <button key={tab} onClick={() => setFilter(tab)} className={cn("px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap", filter === tab ? "border-gold-500 text-navy-900" : "border-transparent text-gray-500 hover:text-navy-700")}>{tab}
                            <span className="ml-1.5 bg-gray-100 text-gray-600 py-0.5 px-2 rounded text-xs">
                                {tab === 'All' ? mockCorporateActions.length : tab === 'Upcoming' ? mockCorporateActions.filter(a => a.status === 'Upcoming').length : mockCorporateActions.filter(a => a.status === 'Processed').length}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                        <h3 className="font-semibold text-navy-900 text-sm">Actions Register</h3>
                        <TableToolbar searchValue={search} onSearchChange={setSearch} onRefresh={() => { }} exportData={exportData} exportFilename="corporate_actions" />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                                <tr>
                                    <th className="p-4 font-medium w-12">S/N</th>
                                    <th className="p-4 font-medium">Action ID</th>
                                    <th className="p-4 font-medium">Security</th>
                                    <th className="p-4 font-medium">Type</th>
                                    <th className="p-4 font-medium">Ex-Date</th>
                                    <th className="p-4 font-medium">Pay Date</th>
                                    <th className="p-4 font-medium">Details</th>
                                    <th className="p-4 font-medium">Affected Portfolios</th>
                                    <th className="p-4 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {paged.map((ca, idx) => (
                                    <tr key={ca.id} className={cn("hover:bg-gray-50 transition-colors", ca.status === 'Upcoming' ? "bg-gold-100/50" : "")}>
                                        <td className="p-4 text-gray-400 text-xs text-center">{(page - 1) * pageSize + idx + 1}</td>
                                        <td className="p-4 text-xs font-semibold text-navy-700">{ca.id}</td>
                                        <td className="p-4 font-bold text-navy-900">{ca.ticker}</td>
                                        <td className="p-4"><span className="bg-navy-100 text-navy-700 text-xs font-medium px-2 py-0.5 rounded">{ca.type}</span></td>
                                        <td className="p-4 text-gray-600">{ca.exDate || ca.couponDate || '—'}</td>
                                        <td className="p-4 text-gray-600">{ca.payDate}</td>
                                        <td className="p-4 text-gray-700">{ca.perUnit || ca.ratio || `${ca.rate}% coupon` || '—'}</td>
                                        <td className="p-4">
                                            <div className="flex flex-wrap gap-1">
                                                {ca.affectedPortfolios.map(p => (
                                                    <span key={p} className="bg-gray-100 text-gray-600 text-xs px-1.5 py-0.5 rounded">{p}</span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="p-4"><StatusBadge status={ca.status} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <TablePagination currentPage={page} totalItems={totalItems} pageSize={pageSize} onPageChange={setPage} />
                </div>
            </div>
        </AppShell>
    );
}
