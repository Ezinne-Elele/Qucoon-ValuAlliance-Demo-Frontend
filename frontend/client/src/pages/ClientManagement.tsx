import React, { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { StatusBadge } from '../components/ui/StatusBadge';
import {
    mockClients, mockAumTrend, mockClientContacts, mockClientMandates, mockClientAumHistory,
    getClientPortfolios, getClientTrades, getClientPositions, getClientFees, getClientDocuments,
} from '../data/mockData';
import {
    ClientManagementIcon, UsersIcon, NairaIcon, DownloadIcon,
    PortfolioIcon, TradeIcon, FeeIcon, DocumentIcon, EyeIcon,
    MoreVerticalIcon, ChevronRightIcon, TrendingUpIcon, PieChartIcon, cn
} from '../components/icons/Icons';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TableToolbar, TablePagination, useTableControls } from '../components/ui/TableControls';
import { ModuleHeader } from '../components/layout/ModuleHeader';

const PIE_COLORS = ['#0E4535', '#DFA223', '#22795F', '#5BBD9A', '#3B8266'];

export default function ClientManagement() {
    const [filterType, setFilterType] = useState('All');
    const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
    const totalAum = mockClients.reduce((s, c) => s + c.aum, 0);
    const types = ['All', 'Institutional', 'Corporate', 'Individual'];
    const baseFiltered = filterType === 'All' ? mockClients : mockClients.filter(c => c.type === filterType);

    const { search, setSearch, page, setPage, paged, totalItems, pageSize, density, setDensity } = useTableControls(baseFiltered, 10);
    const clientExport = baseFiltered.map(c => ({
        Client: c.name, Type: c.type, Category: c.category,
        'AUM (₦)': c.aum, KYC: c.kyc, Location: `${c.city}, ${c.state}`, Relationship: c.relationship,
    }));

    const selectedClient = mockClients.find(c => c.id === selectedClientId);

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
                                        className={cn(
                                            "cursor-pointer group hover:bg-gray-50/50 transition-colors",
                                            selectedClientId === c.id && "bg-navy-50/40 is-selected"
                                        )}
                                        onClick={() => setSelectedClientId(c.id)}
                                    >
                                        <td className="text-center">{(page - 1) * pageSize + idx + 1}</td>
                                        <td>
                                            <div>
                                                <p>{c.name}</p>
                                                <p className="text-[10px] text-gray-400">{c.id}</p>
                                            </div>
                                        </td>
                                        <td>{c.type}</td>
                                        <td>{c.category}</td>
                                        <td className="text-right font-mono">{(c.aum / 1e9).toFixed(1)}B</td>
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

            {/* Client Detail Drawer */}
            {selectedClient && (
                <ClientDetailDrawer
                    client={selectedClient}
                    onClose={() => setSelectedClientId(null)}
                />
            )}
        </AppShell>
    );
}

function ClientDetailDrawer({ client, onClose }: { client: any, onClose: () => void }) {
    const [detailTab, setDetailTab] = useState('Overview');
    const tabs = ['Overview', 'Portfolios', 'Activity', 'Documents'];

    const portfolios = getClientPortfolios(client.id);
    const trades = getClientTrades(client.id);
    const positions = getClientPositions(client.id);
    const docs = getClientDocuments(client.id);
    const contacts = mockClientContacts[client.id] || [];

    return (
        <div className="fixed inset-y-0 right-0 w-[720px] glass-panel shadow-2xl border-l border-white/20 z-50 flex flex-col animate-in slide-in-from-right duration-500">
            <div className="px-8 py-6 border-b border-gray-100 bg-white/40 backdrop-blur-xl flex justify-between items-center shrink-0">
                <div className="flex items-center">
                    <div className="w-12 h-12 rounded-xl bg-navy-900 text-white flex items-center justify-center font-bold text-sm mr-4 shadow-lg">{client.name.split(' ').map((n: string) => n[0]).slice(0, 2).join('')}</div>
                    <div>
                        <h3 className="text-xl font-bold text-navy-900 tracking-tight uppercase">{client.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                            <span className="text-[10px] font-bold text-gold-600 bg-gold-50 px-1.5 py-0.5 rounded">{client.id}</span>
                            <span className="text-gray-300 text-[10px]">|</span>
                            <span className="text-[10px] font-bold text-navy-700 uppercase">{client.type}</span>
                            <span className="text-gray-300 text-[10px]">|</span>
                            <StatusBadge status={client.relationship} />
                        </div>
                    </div>
                </div>
                <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-navy-900 transition-all text-2xl font-light">&times;</button>
            </div>

            <div className="flex space-x-8 px-8 border-b border-gray-100 bg-white/30 backdrop-blur-md shrink-0">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setDetailTab(tab)}
                        className={cn(
                            "py-4 text-[11px] font-bold uppercase tracking-widest transition-all border-b-2",
                            detailTab === tab ? "border-navy-900 text-navy-900" : "border-transparent text-gray-400 hover:text-navy-700"
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                {detailTab === 'Overview' && (
                    <div className="space-y-8">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/60 p-5 rounded-2xl border border-white/40 shadow-sm backdrop-blur-sm">
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-3 flex items-center"><PortfolioIcon className="w-3.5 h-3.5 mr-2" /> Financial Status</p>
                                <div className="space-y-2">
                                    <div className="flex justify-between"><span className="text-xs text-gray-500 font-medium">Aggregate AUM</span><span className="font-mono text-navy-900">₦{(client.aum / 1e9).toFixed(2)}B</span></div>
                                    <div className="flex justify-between"><span className="text-xs text-gray-500 font-medium">YTD Contribution</span><span className="font-mono text-success">+₦245M</span></div>
                                    <div className="flex justify-between"><span className="text-xs text-gray-500 font-medium">Mandates</span><span className="text-navy-900">{portfolios.length} Active</span></div>
                                </div>
                            </div>
                            <div className="bg-white/60 p-5 rounded-2xl border border-white/40 shadow-sm backdrop-blur-sm">
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-3 flex items-center"><ClientManagementIcon className="w-3.5 h-3.5 mr-2" /> Risk Profile</p>
                                <div className="space-y-2">
                                    <div className="flex justify-between"><span className="text-xs text-gray-500 font-medium">Risk Rating</span><StatusBadge status={client.riskRating} /></div>
                                    <div className="flex justify-between"><span className="text-xs text-gray-500 font-medium">KYC Status</span><StatusBadge status={client.kyc} /></div>
                                    <div className="flex justify-between"><span className="text-xs text-gray-500 font-medium">PEP Check</span><span className="text-[10px] font-bold text-success-bg px-1.5 py-0.5 rounded text-success">CLEARED</span></div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-[12px] font-bold text-navy-900 uppercase tracking-widest">Key Contacts</h4>
                            <div className="grid grid-cols-2 gap-4">
                                {contacts.slice(0, 2).map((c: any, i: number) => (
                                    <div key={i} className="bg-navy-900 text-white rounded-2xl p-5 shadow-lg relative overflow-hidden group">
                                        <div className="relative z-10">
                                            <p className="font-bold text-sm mb-1">{c.name}</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight mb-4">{c.role}</p>
                                            <p className="text-[11px] font-mono opacity-80">{c.email}</p>
                                        </div>
                                        <div className="absolute right-0 bottom-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
                                            <UsersIcon className="w-12 h-12" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white/40 p-6 rounded-2xl border border-white/40 backdrop-blur-md">
                            <h4 className="text-[12px] font-bold text-navy-900 uppercase tracking-widest mb-4">AUM Attribution</h4>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={portfolios.map(p => ({ name: p.name, value: p.aum }))}
                                            innerRadius={70}
                                            outerRadius={90}
                                            paddingAngle={4}
                                            dataKey="value"
                                        >
                                            {portfolios.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                )}

                {detailTab === 'Portfolios' && (
                    <div className="space-y-6">
                        <h4 className="text-[12px] font-bold text-navy-900 uppercase tracking-widest">Client Portfolios</h4>
                        <div className="table-datagrid-container border-white/20 bg-white/20">
                            <table className="table-datagrid density-compact">
                                <thead>
                                    <tr>
                                        <th>Portfolio Name</th>
                                        <th>Asset Class</th>
                                        <th className="text-right">AUM (₦)</th>
                                        <th className="text-right">Return</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {portfolios.map((p, i) => (
                                        <tr key={i} className="hover:bg-white/40">
                                            <td>{p.name}</td>
                                            <td>{p.assetClass}</td>
                                            <td className="text-right font-mono">{(p.aum / 1e9).toFixed(2)}B</td>
                                            <td className="text-right font-mono">
                                                <span className="text-success">+{p.ytdReturn}%</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {detailTab === 'Documents' && (
                    <div className="grid grid-cols-1 gap-3">
                        {docs.map((d, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white/60 rounded-xl border border-white/60 hover:border-gold-500/50 transition-all group">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-navy-900/5 rounded-lg flex items-center justify-center mr-4 group-hover:bg-navy-900 transition-colors">
                                        <DocumentIcon className="w-5 h-5 text-navy-900 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-navy-900 uppercase tracking-tight">{d.name}</p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase">{d.type} · Ver {d.version}</p>
                                    </div>
                                </div>
                                <button className="p-2 text-gray-400 hover:text-navy-900 transition-colors">
                                    <DownloadIcon className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="p-8 border-t border-gray-100 bg-white/40 backdrop-blur-xl flex justify-between items-center shrink-0">
                <button className="text-danger text-xs font-bold uppercase tracking-widest hover:underline transition-all">Suspend Mandate</button>
                <div className="flex space-x-3">
                    <button onClick={onClose} className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-all">Close</button>
                    <button className="px-8 py-3 bg-navy-900 text-white rounded-xl text-[11px] font-bold uppercase tracking-widest shadow-xl hover:shadow-2xl transition-all">Modify Relationship</button>
                </div>
            </div>
        </div>
    );
}
