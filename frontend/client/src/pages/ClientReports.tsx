import React from 'react';
import { AppShell } from '../components/layout/AppShell';
import { MetricCard } from '../components/ui/MetricCard';
import { mockClients, mockAumTrend } from '../data/mockData';
import { ReportingIcon, UsersIcon, NairaIcon, DownloadIcon, cn } from '../components/icons/Icons';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TableToolbar, useTableControls } from '../components/ui/TableControls';

export default function ClientReports() {
    const totalAum = mockClients.reduce((s, c) => s + c.aum, 0);
    const { search, setSearch, paged } = useTableControls(mockClients, 10, ['name', 'id']);

    return (
        <AppShell>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-navy-900">Client Reporting & Analytics</h1>
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-navy-900 text-white rounded text-sm font-medium hover:bg-navy-800 shadow-sm">Generate Reports</button>
                        <button className="px-3 py-2 bg-white border border-gray-200 rounded text-gray-600 hover:bg-gray-50 flex items-center text-sm shadow-sm">
                            <DownloadIcon className="w-4 h-4 mr-2" /> Batch Export
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MetricCard label="Total Clients" value={mockClients.length.toString()} trend="+2 this quarter" icon={<UsersIcon />} />
                    <MetricCard label="Total AUM" value={`₦${(totalAum / 1e9).toFixed(1)}B`} isCurrency={false} trend="+4.02% MTD" icon={<NairaIcon />} iconBg="bg-gold-100 text-gold-600" />
                    <MetricCard label="Reports Generated (MTD)" value="24" trend="8 pending distribution" icon={<ReportingIcon />} />
                </div>

                {/* AUM Trend Chart */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                    <h3 className="text-base font-semibold text-navy-900 mb-4">Total AUM Trend</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={mockAumTrend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorAumClient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#C9A84C" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} tickFormatter={v => `₦${v}B`} />
                                <Tooltip formatter={(value: number) => `₦${value}B`} />
                                <Area type="monotone" dataKey="aum" stroke="#C9A84C" strokeWidth={3} fillOpacity={1} fill="url(#colorAumClient)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Client Directory */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                        <h3 className="font-semibold text-navy-900 text-sm">Client Directory</h3>
                        <TableToolbar searchValue={search} onSearchChange={setSearch} onRefresh={() => { }} exportData={mockClients} exportFilename="client_directory" />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                                <tr>
                                    <th className="p-4 font-medium">Client</th>
                                    <th className="p-4 font-medium">Type</th>
                                    <th className="p-4 font-medium">Category</th>
                                    <th className="p-4 font-medium text-right">AUM (₦)</th>
                                    <th className="p-4 font-medium">KYC</th>
                                    <th className="p-4 font-medium">Location</th>
                                    <th className="p-4 font-medium">Relationship</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {paged.map(c => (
                                    <tr key={c.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                                        <td className="p-4">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 rounded-full bg-navy-900 text-white flex items-center justify-center font-bold text-xs mr-3 shrink-0">{c.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</div>
                                                <div>
                                                    <p className="font-medium text-navy-900">{c.name}</p>
                                                    <p className="text-xs text-gray-500">{c.contactPerson}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4"><span className="bg-navy-100 text-navy-700 text-xs font-medium px-2 py-0.5 rounded">{c.type}</span></td>
                                        <td className="p-4 text-gray-600 text-xs">{c.category}</td>
                                        <td className="p-4 text-right font-medium text-navy-900">{(c.aum / 1e9).toFixed(1)}B</td>
                                        <td className="p-4"><span className="bg-success-bg text-success border border-success/20 text-xs font-medium px-2 py-0.5 rounded-full">{c.kyc}</span></td>
                                        <td className="p-4 text-gray-600">{c.city}, {c.state}</td>
                                        <td className="p-4"><span className="bg-success-bg text-success border border-success/20 text-xs font-medium px-2 py-0.5 rounded-full">{c.relationship}</span></td>
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
