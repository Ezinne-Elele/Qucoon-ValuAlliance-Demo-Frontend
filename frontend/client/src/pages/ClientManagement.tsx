import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { AppShell } from '../components/layout/AppShell';
import { StatusBadge } from '../components/ui/StatusBadge';
import { mockClients, mockAumTrend } from '../data/mockData';
import {
    TrendingUpIcon, cn
} from '../components/icons/Icons';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TableToolbar, TablePagination, useTableControls } from '../components/ui/TableControls';
import { ModuleHeader } from '../components/layout/ModuleHeader';

export default function ClientManagement() {
    const [, navigate] = useLocation();
    const [filterType, setFilterType] = useState('All');
    const totalAum = mockClients.reduce((s, c) => s + c.aum, 0);
    const types = ['All', 'Institutional', 'Corporate', 'Individual'];
    const baseFiltered = filterType === 'All' ? mockClients : mockClients.filter(c => c.type === filterType);

    const { search, setSearch, page, setPage, paged, totalItems, pageSize, density, setDensity } = useTableControls(baseFiltered, 10);
    const clientExport = baseFiltered.map(c => ({
        Client: c.name, Type: c.type, Category: c.category,
        'AUM (₦)': c.aum, KYC: c.kyc, Location: `${c.city}, ${c.state}`, Relationship: c.relationship,
    }));

    const clientMetrics = [
        { label: 'Total Clients', value: mockClients.length.toString(), trend: '+2', isPositive: true },
        { label: 'Total Client AUM', value: `₦${(totalAum / 1e12).toFixed(1)}T`, trend: '+4.2%', isPositive: true },
        { label: 'High Risk Clients', value: '2', trend: 'Stable', isPositive: true },
        { label: 'Pending KYC', value: '5', trend: 'Needs Action', isPositive: false },
    ];

    return (
        <AppShell>
            <ModuleHeader
                title="Relationship Management"
                description="Monitor institutional and HNI client relationships, KYC, and AUM growth."
                metrics={clientMetrics}
                actions={
                    <>
                        <button className="px-4 py-2.5 bg-white border border-gray-100 rounded-lg text-gray-500 shadow-sm hover:bg-gray-50 transition-colors text-[13px] font-bold">
                            Batch Export
                        </button>
                        <button className="px-5 py-2.5 bg-navy-900 text-white rounded-lg text-[13px] font-bold shadow-lg hover:shadow-xl transition-all">
                            Onboard New Client
                        </button>
                    </>
                }
            />

            <div className="space-y-12">
                {/* Growth Insights — Charts on Top */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* AUM Aggregate Chart */}
                    <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="text-[12px] font-bold text-navy-900 tracking-widest uppercase">AUM Aggregate Trend</h3>
                                <p className="text-[11px] text-gray-400 font-medium mt-1">Institutional and individual asset growth overview</p>
                            </div>
                            <div className="flex items-center bg-success/5 px-3 py-1.5 rounded-lg border border-success/10">
                                <TrendingUpIcon className="text-success w-3.5 h-3.5 mr-2" />
                                <span className="text-xs font-bold text-success">+4.02% MoM</span>
                            </div>
                        </div>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={mockAumTrend}>
                                    <defs>
                                        <linearGradient id="colorClientAum" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#22795F" stopOpacity={0.15} />
                                            <stop offset="95%" stopColor="#22795F" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F3F5" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9AA1AE', fontWeight: 600 }} dy={10} />
                                    <YAxis hide />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                    />
                                    <Area type="monotone" dataKey="aum" stroke="#22795F" strokeWidth={3} fillOpacity={1} fill="url(#colorClientAum)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Client Distribution Chart */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-[12px] font-bold text-navy-900 tracking-widest uppercase mb-2">Segment Distribution</h3>
                            <p className="text-[11px] text-gray-400 font-medium mb-8">Client mix by entity type</p>
                            <div className="h-48 relative flex items-center justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={[
                                            { name: 'Institutional', value: 65 },
                                            { name: 'Corporate', value: 25 },
                                            { name: 'Individual', value: 10 },
                                        ]} innerRadius={55} outerRadius={75} paddingAngle={8} dataKey="value">
                                            <Cell fill="#0E4535" />
                                            <Cell fill="#DFA223" />
                                            <Cell fill="#3B8266" />
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute flex flex-col items-center">
                                    <span className="text-2xl font-bold text-navy-900">10</span>
                                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Entities</span>
                                </div>
                            </div>
                            <div className="mt-6 space-y-2">
                                <div className="flex items-center justify-between text-[11px] font-bold">
                                    <div className="flex items-center text-navy-900">
                                        <div className="w-2 h-2 rounded-full bg-navy-950 mr-2" /> Institutional
                                    </div>
                                    <span className="text-gray-400">65%</span>
                                </div>
                                <div className="flex items-center justify-between text-[11px] font-bold">
                                    <div className="flex items-center text-navy-900">
                                        <div className="w-2 h-2 rounded-full bg-gold-500 mr-2" /> Corporate
                                    </div>
                                    <span className="text-gray-400">25%</span>
                                </div>
                                <div className="flex items-center justify-between text-[11px] font-bold">
                                    <div className="flex items-center text-navy-900">
                                        <div className="w-2 h-2 rounded-full bg-teal-500 mr-2" /> Individual
                                    </div>
                                    <span className="text-gray-400">10%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Directory Table — Beneath the Charts */}
                <div className="table-datagrid-container shadow-lg">
                    <div className="p-6 border-b border-gray-100 bg-white/50 flex justify-between items-center">
                        <div className="flex items-center space-x-6">
                            <div>
                                <h3 className="font-bold text-navy-900 text-sm uppercase tracking-wider">Client Directory</h3>
                                <p className="text-[11px] text-gray-400 font-medium tracking-tight">Search and manage relationship mandates</p>
                            </div>
                            <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
                                {types.map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setFilterType(type)}
                                        className={cn(
                                            "px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all",
                                            filterType === type ? "bg-white text-navy-900 shadow-sm border border-gray-100/50" : "text-gray-400 hover:text-navy-700"
                                        )}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <TableToolbar
                            searchValue={search}
                            onSearchChange={setSearch}
                            onRefresh={() => { }}
                            exportData={clientExport}
                            exportFilename="clients"
                            density={density}
                            onDensityChange={setDensity}
                        />
                    </div>
                    <div className="overflow-x-auto">
                        <table className={cn("table-datagrid", `density-${density}`)}>
                            <thead>
                                <tr>
                                    <th className="w-12 text-center">#</th>
                                    <th>Client Name</th>
                                    <th>Type</th>
                                    <th>Category</th>
                                    <th className="text-right w-36">AUM (₦)</th>
                                    <th>Location</th>
                                    <th className="w-32">Relationship</th>
                                    <th className="w-28">KYC</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paged.map((c, idx) => (
                                    <tr
                                        key={c.id}
                                        className="cursor-pointer group hover:bg-gray-50/50 transition-colors"
                                        onClick={() => navigate(`/client-management/${c.id}`)}
                                    >
                                        <td className="text-center">{(page - 1) * pageSize + idx + 1}</td>
                                        <td>{c.name}</td>
                                        <td>{c.type}</td>
                                        <td>{c.category}</td>
                                        <td className="text-right">{(c.aum / 1e9).toFixed(1)}B</td>
                                        <td>{c.city}, {c.state}</td>
                                        <td><StatusBadge status={c.relationship} /></td>
                                        <td><StatusBadge status={c.kyc} /></td>
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
