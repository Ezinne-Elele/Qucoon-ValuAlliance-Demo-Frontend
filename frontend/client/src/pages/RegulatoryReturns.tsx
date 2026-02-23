import React from 'react';
import { AppShell } from '../components/layout/AppShell';
import { StatusBadge } from '../components/ui/StatusBadge';
import { MetricCard } from '../components/ui/MetricCard';
import { mockRegulatorySubmissions } from '../data/mockData';
import { RegulatoryIcon, AlertIcon, CheckCircleIcon, DownloadIcon, SECLogo } from '../components/icons/Icons';

export default function RegulatoryReturns() {
    const inProgress = mockRegulatorySubmissions.filter(s => s.status === 'In Progress').length;
    const submitted = mockRegulatorySubmissions.filter(s => s.status === 'Submitted').length;
    const notStarted = mockRegulatorySubmissions.filter(s => s.status === 'Not Started').length;

    return (
        <AppShell>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-navy-900">Regulatory Returns</h1>
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-navy-900 text-white rounded text-sm font-medium hover:bg-navy-800 shadow-sm">New Submission</button>
                        <button className="px-3 py-2 bg-white border border-gray-200 rounded text-gray-600 hover:bg-gray-50 flex items-center text-sm shadow-sm">
                            <DownloadIcon className="w-4 h-4 mr-2" /> Export
                        </button>
                    </div>
                </div>

                {/* Deadline Banner */}
                <div className="bg-danger-bg border-l-4 border-danger p-4 rounded shadow-sm flex items-center justify-between">
                    <div className="flex items-center">
                        <AlertIcon className="w-5 h-5 text-danger mr-3" />
                        <div>
                            <p className="font-semibold text-danger text-sm">Upcoming Deadline: SEC Q4 2025 Return</p>
                            <p className="text-xs text-gray-600 mt-0.5">Due: 28 February 2026 — 5 days remaining</p>
                        </div>
                    </div>
                    <button className="px-4 py-2 bg-danger text-white rounded text-sm font-medium hover:bg-red-700 shadow-sm">View Submission</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MetricCard label="In Progress" value={inProgress.toString()} trend="Requires completion" trendPositive={false} icon={<RegulatoryIcon />} iconBg="bg-warning-bg" />
                    <MetricCard label="Submitted" value={submitted.toString()} trend="On time" icon={<CheckCircleIcon />} iconBg="bg-success-bg" />
                    <MetricCard label="Not Started" value={notStarted.toString()} trend="Schedule pending" trendPositive={false} icon={<AlertIcon />} iconBg="bg-danger-bg" />
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                                <tr>
                                    <th className="p-4 font-medium">Return ID</th>
                                    <th className="p-4 font-medium">Report Name</th>
                                    <th className="p-4 font-medium">Regulator</th>
                                    <th className="p-4 font-medium">Period</th>
                                    <th className="p-4 font-medium">Due Date</th>
                                    <th className="p-4 font-medium">Submitted</th>
                                    <th className="p-4 font-medium">Prepared By</th>
                                    <th className="p-4 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {mockRegulatorySubmissions.map(rs => (
                                    <tr key={rs.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 font-mono text-xs font-semibold text-navy-700">{rs.id}</td>
                                        <td className="p-4 font-medium text-navy-900">{rs.name}</td>
                                        <td className="p-4">
                                            {rs.regulator === 'SEC Nigeria' && <SECLogo />}
                                            {rs.regulator === 'NFIU' && <span className="bg-[#8B0000] text-white px-2 py-0.5 font-bold text-[10px] tracking-wider rounded-sm inline-flex items-center">NFIU</span>}
                                            {rs.regulator === 'NITDA' && <span className="bg-[#2E8B57] text-white px-2 py-0.5 font-bold text-[10px] tracking-wider rounded-sm inline-flex items-center">NITDA</span>}
                                        </td>
                                        <td className="p-4 text-gray-600">{rs.period}</td>
                                        <td className="p-4 font-mono text-gray-600">{rs.dueDate}</td>
                                        <td className="p-4 font-mono text-gray-600">{rs.submittedDate || '—'}</td>
                                        <td className="p-4 text-gray-600">{rs.preparedBy || '—'}</td>
                                        <td className="p-4"><StatusBadge status={rs.status} /></td>
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
