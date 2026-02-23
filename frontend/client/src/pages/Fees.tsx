import React from 'react';
import { AppShell } from '../components/layout/AppShell';
import { StatusBadge } from '../components/ui/StatusBadge';
import { mockFees } from '../data/mockData';
import { FeeIcon, DownloadIcon, NairaIcon } from '../components/icons/Icons';
import { MetricCard } from '../components/ui/MetricCard';

export default function Fees() {
    const totalFeeRevenue = mockFees.reduce((s, f) => s + (f.monthlyFee || f.feeAmount || 0), 0);
    const paid = mockFees.filter(f => f.status === 'Paid').length;
    const invoiced = mockFees.filter(f => f.status === 'Invoiced').length;

    return (
        <AppShell>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-navy-900">Fee Calculation & Billing</h1>
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-navy-900 text-white rounded text-sm font-medium hover:bg-navy-800 shadow-sm">Generate Invoice</button>
                        <button className="px-3 py-2 bg-white border border-gray-200 rounded text-gray-600 hover:bg-gray-50 flex items-center text-sm shadow-sm">
                            <DownloadIcon className="w-4 h-4 mr-2" /> Export
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MetricCard label="Total Fee Revenue (YTD)" value="₦486.25M" isCurrency={false} trend="+18.4% vs prior year" icon={<NairaIcon />} iconBg="bg-gold-100 text-gold-600" />
                    <MetricCard label="Invoiced (Pending Payment)" value={invoiced.toString()} trend="₦13.13M outstanding" icon={<FeeIcon />} />
                    <MetricCard label="Paid" value={paid.toString()} trend="₦63.18M collected" icon={<FeeIcon />} iconBg="bg-success-bg" />
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50">
                        <h3 className="font-semibold text-navy-900 text-sm">Fee Records</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                                <tr>
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
                                {mockFees.map(fee => (
                                    <tr key={fee.id} className="hover:bg-gray-50 transition-colors">
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
                </div>
            </div>
        </AppShell>
    );
}
