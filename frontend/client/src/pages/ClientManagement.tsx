import React, { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { MetricCard } from '../components/ui/MetricCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import {
    mockClients, mockAumTrend, mockClientContacts, mockClientMandates, mockClientAumHistory,
    getClientPortfolios, getClientTrades, getClientPositions, getClientFees, getClientDocuments,
} from '../data/mockData';
import {
    ClientManagementIcon, UsersIcon, NairaIcon, DownloadIcon, FilterIcon,
    PortfolioIcon, TradeIcon, FeeIcon, DocumentIcon, EyeIcon, cn,
} from '../components/icons/Icons';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TableToolbar, TablePagination, useTableControls } from '../components/ui/TableControls';

const PIE_COLORS = ['#0E4535', '#DFA223', '#22795F', '#5BBD9A', '#3B8266'];

export default function ClientManagement() {
    const [filterType, setFilterType] = useState('All');
    const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
    const [detailTab, setDetailTab] = useState('Overview');
    const totalAum = mockClients.reduce((s, c) => s + c.aum, 0);
    const types = ['All', 'Institutional', 'Corporate', 'Individual'];
    const baseFiltered = filterType === 'All' ? mockClients : mockClients.filter(c => c.type === filterType);

    const { search, setSearch, page, setPage, paged, totalItems, pageSize } = useTableControls(baseFiltered, 10);
    const clientExport = baseFiltered.map(c => ({
        Client: c.name, Type: c.type, Category: c.category,
        'AUM (₦)': c.aum, KYC: c.kyc, Location: `${c.city}, ${c.state}`, Relationship: c.relationship,
    }));

    const selectedClient = mockClients.find(c => c.id === selectedClientId);

    if (selectedClient) {
        return <ClientDetail client={selectedClient} detailTab={detailTab} setDetailTab={setDetailTab} onBack={() => { setSelectedClientId(null); setDetailTab('Overview'); }} />;
    }

    return (
        <AppShell>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-navy-900">Client Management</h1>
                    <div className="flex space-x-3">
                        <button className="px-3 py-2 bg-white border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 flex items-center text-sm font-medium shadow-sm">
                            <FilterIcon className="w-4 h-4 mr-2" /> Filter
                        </button>
                        <button className="px-4 py-2 bg-navy-900 text-white rounded text-sm font-medium hover:bg-navy-800 shadow-sm">Generate Reports</button>
                        <button className="px-3 py-2 bg-white border border-gray-200 rounded text-gray-600 hover:bg-gray-50 flex items-center text-sm shadow-sm">
                            <DownloadIcon className="w-4 h-4 mr-2" /> Batch Export
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MetricCard label="Total Clients" value={mockClients.length.toString()} trend="+2 this quarter" icon={<UsersIcon />} />
                    <MetricCard label="Total AUM" value={`₦${(totalAum / 1e9).toFixed(1)}B`} isCurrency={false} trend="+4.02% MTD" icon={<NairaIcon />} iconBg="bg-gold-100 text-gold-600" />
                    <MetricCard label="Reports Generated (MTD)" value="24" trend="8 pending distribution" icon={<ClientManagementIcon />} />
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                    <h3 className="text-base font-semibold text-navy-900 mb-4">Total AUM Trend</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={mockAumTrend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorAumClient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22795F" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#22795F" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280', fontFamily: 'JetBrains Mono' }} tickFormatter={v => `₦${v}B`} />
                                <Tooltip formatter={(value: number) => `₦${value}B`} />
                                <Area type="monotone" dataKey="aum" stroke="#22795F" strokeWidth={3} fillOpacity={1} fill="url(#colorAumClient)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                        <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-navy-900 text-sm">Client Directory</h3>
                            <div className="flex space-x-1">
                                {types.map(type => (
                                    <button key={type} onClick={() => setFilterType(type)} className={cn("px-3 py-1 text-xs font-medium rounded transition-colors", filterType === type ? "bg-navy-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200")}>{type}</button>
                                ))}
                            </div>
                        </div>
                        <TableToolbar searchValue={search} onSearchChange={setSearch} onRefresh={() => { }} exportData={clientExport} exportFilename="clients" />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                                <tr>
                                    <th className="p-4 font-medium w-12">S/N</th>
                                    <th className="p-4 font-medium">Client</th>
                                    <th className="p-4 font-medium">Type</th>
                                    <th className="p-4 font-medium">Category</th>
                                    <th className="p-4 font-medium text-right">AUM (₦)</th>
                                    <th className="p-4 font-medium">KYC</th>
                                    <th className="p-4 font-medium">Location</th>
                                    <th className="p-4 font-medium">Relationship</th>
                                    <th className="p-4 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {paged.map((c, idx) => (
                                    <tr key={c.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setSelectedClientId(c.id)}>
                                        <td className="p-4 text-gray-400 text-xs font-mono">{(page - 1) * pageSize + idx + 1}</td>
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
                                        <td className="p-4 text-right font-mono font-medium text-navy-900">{(c.aum / 1e9).toFixed(1)}B</td>
                                        <td className="p-4"><StatusBadge status={c.kyc} /></td>
                                        <td className="p-4 text-gray-600">{c.city}, {c.state}</td>
                                        <td className="p-4"><StatusBadge status={c.relationship} /></td>
                                        <td className="p-4">
                                            <button onClick={e => { e.stopPropagation(); setSelectedClientId(c.id); }} className="p-1.5 bg-gray-100 rounded hover:bg-gray-200 transition-colors" title="View Details">
                                                <EyeIcon className="w-3.5 h-3.5 text-gray-600" />
                                            </button>
                                        </td>
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

// =================================================================
// CLIENT DETAIL VIEW
// =================================================================
function ClientDetail({ client, detailTab, setDetailTab, onBack }: {
    client: typeof mockClients[0]; detailTab: string; setDetailTab: (t: string) => void; onBack: () => void;
}) {
    const tabs = ['Overview', 'Portfolios & Holdings', 'Trade History', 'Fees & Billing', 'Documents', 'Contacts'];
    const portfolios = getClientPortfolios(client.id);
    const trades = getClientTrades(client.id);
    const positions = getClientPositions(client.id);
    const fees = getClientFees(client.id);
    const docs = getClientDocuments(client.id);
    const contacts = mockClientContacts[client.id] || [];
    const mandates = mockClientMandates[client.id] || [];
    const aumHistory = mockClientAumHistory[client.id] || [];

    // Allocation data for pie chart
    const allocationData = portfolios.length > 0
        ? portfolios.map(p => ({ name: p.name.split('—')[1]?.trim() || p.name, value: p.aum }))
        : [{ name: 'Unallocated', value: client.aum }];

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <button onClick={onBack} className="mr-4 p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors text-gray-600">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <div className="w-12 h-12 rounded-full bg-navy-900 text-white flex items-center justify-center font-bold text-lg mr-4">{client.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</div>
                        <div>
                            <h1 className="text-2xl font-bold text-navy-900">{client.name}</h1>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="bg-navy-100 text-navy-700 text-xs font-medium px-2 py-0.5 rounded">{client.type}</span>
                                <span className="text-xs text-gray-500">{client.category}</span>
                                <span className="text-xs text-gray-400">·</span>
                                <StatusBadge status={client.relationship} />
                                <StatusBadge status={client.kyc} />
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-navy-900 text-white rounded text-sm font-medium hover:bg-navy-800 shadow-sm">Generate Report</button>
                        <button className="px-3 py-2 bg-white border border-gray-200 rounded text-gray-600 hover:bg-gray-50 flex items-center text-sm shadow-sm">
                            <DownloadIcon className="w-4 h-4 mr-2" /> Export
                        </button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <MetricCard label="Assets Under Management" value={`₦${(client.aum / 1e9).toFixed(1)}B`} isCurrency={false} trend={`${portfolios.length} portfolio(s)`} icon={<NairaIcon />} iconBg="bg-gold-100 text-gold-600" />
                    <MetricCard label="Active Portfolios" value={portfolios.length.toString()} trend={`${mandates.length} mandate(s)`} icon={<PortfolioIcon />} />
                    <MetricCard label="Recent Trades" value={trades.length.toString()} trend="Last 30 days" icon={<TradeIcon />} />
                    <MetricCard label="Fee Revenue (YTD)" value={`₦${(fees.reduce((s, f) => s + (f.monthlyFee || f.feeAmount || 0), 0) / 1e6).toFixed(1)}M`} isCurrency={false} trend={`${fees.length} fee record(s)`} icon={<FeeIcon />} iconBg="bg-gold-100 text-gold-600" />
                </div>

                {/* Tab Navigation */}
                <div className="flex space-x-6 border-b border-gray-200 overflow-x-auto">
                    {tabs.map(tab => (
                        <button key={tab} onClick={() => setDetailTab(tab)} className={cn("pb-3 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap", detailTab === tab ? "border-gold-500 text-navy-900" : "border-transparent text-gray-500 hover:text-navy-700")}>{tab}</button>
                    ))}
                </div>

                {/* Tab Content */}
                {detailTab === 'Overview' && <OverviewTab client={client} portfolios={portfolios} positions={positions} mandates={mandates} aumHistory={aumHistory} allocationData={allocationData} contacts={contacts} />}
                {detailTab === 'Portfolios & Holdings' && <PortfoliosTab portfolios={portfolios} positions={positions} />}
                {detailTab === 'Trade History' && <TradesTab trades={trades} />}
                {detailTab === 'Fees & Billing' && <FeesTab fees={fees} />}
                {detailTab === 'Documents' && <DocumentsTab docs={docs} />}
                {detailTab === 'Contacts' && <ContactsTab contacts={contacts} client={client} />}
            </div>
        </AppShell>
    );
}

// ========= TAB COMPONENTS =========

function OverviewTab({ client, portfolios, positions, mandates, aumHistory, allocationData, contacts }: any) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Client Info Card */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                    <h3 className="text-base font-semibold text-navy-900 mb-4">Client Information</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between"><span className="text-gray-500">Client ID</span><span className="font-mono text-navy-700 font-medium">{client.id}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">Type</span><span className="text-navy-900 font-medium">{client.type}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">Category</span><span className="text-navy-900">{client.category}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">Risk Rating</span><StatusBadge status={client.riskRating} /></div>
                        <div className="flex justify-between"><span className="text-gray-500">KYC Status</span><StatusBadge status={client.kyc} /></div>
                        <div className="flex justify-between"><span className="text-gray-500">Location</span><span className="text-navy-900">{client.city}, {client.state}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">Onboarded</span><span className="font-mono text-gray-700">{client.onboardedDate}</span></div>
                    </div>
                    {contacts.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <p className="text-xs text-gray-500 mb-2">Primary Contact</p>
                            <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-gold-100 text-gold-700 flex items-center justify-center font-bold text-xs mr-3">{contacts[0].name.split(' ').map((n: string) => n[0]).slice(0, 2).join('')}</div>
                                <div>
                                    <p className="font-medium text-navy-900 text-sm">{contacts[0].name}</p>
                                    <p className="text-xs text-gray-500">{contacts[0].role}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* AUM Trend Chart */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 lg:col-span-2">
                    <h3 className="text-base font-semibold text-navy-900 mb-4">AUM Trend — Last 7 Months</h3>
                    <div className="h-56">
                        {aumHistory.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={aumHistory} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorClientAum" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#22795F" stopOpacity={0.25} />
                                            <stop offset="95%" stopColor="#22795F" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280', fontFamily: 'JetBrains Mono' }} tickFormatter={v => `₦${v}B`} />
                                    <Tooltip formatter={(value: number) => `₦${value}B`} />
                                    <Area type="monotone" dataKey="aum" stroke="#22795F" strokeWidth={3} fillOpacity={1} fill="url(#colorClientAum)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        ) : <p className="text-gray-400 text-sm flex items-center justify-center h-full">AUM History not available for this client.</p>}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Portfolio Allocation */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                    <h3 className="text-base font-semibold text-navy-900 mb-4">Portfolio Allocation</h3>
                    <div className="h-52 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={allocationData} cx="50%" cy="50%" innerRadius={65} outerRadius={90} paddingAngle={2} dataKey="value" stroke="none">
                                    {allocationData.map((_: any, i: number) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                                </Pie>
                                <Tooltip formatter={(value: number) => `₦${(value / 1e9).toFixed(1)}B`} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-xs text-gray-500">Total</span>
                            <span className="text-lg font-bold text-navy-900 font-mono">₦{(client.aum / 1e9).toFixed(1)}B</span>
                        </div>
                    </div>
                    <div className="mt-4 space-y-2">
                        {allocationData.map((d: any, i: number) => (
                            <div key={i} className="flex items-center justify-between text-xs">
                                <div className="flex items-center"><div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}></div><span className="text-gray-600 truncate max-w-[160px]">{d.name}</span></div>
                                <span className="font-mono font-medium text-navy-900">₦{(d.value / 1e9).toFixed(1)}B</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mandates */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 lg:col-span-2">
                    <h3 className="text-base font-semibold text-navy-900 mb-4">Investment Mandates</h3>
                    {mandates.length > 0 ? (
                        <div className="space-y-4">
                            {mandates.map((m: any, idx: number) => (
                                <div key={m.id} className="border border-gray-100 rounded-lg p-4 hover:border-gray-200 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 className="font-semibold text-navy-900 text-sm">{m.name}</h4>
                                            <span className="bg-navy-100 text-navy-700 text-xs font-medium px-2 py-0.5 rounded mt-1 inline-block">{m.assetClass}</span>
                                        </div>
                                        <span className="font-mono text-xs text-gray-500">Since {m.inceptionDate}</span>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 text-xs">
                                        <div><p className="text-gray-500">Benchmark</p><p className="font-medium text-navy-900">{m.benchmark}</p></div>
                                        <div><p className="text-gray-500">Mgmt Fee</p><p className="font-mono font-medium text-navy-900">{m.managementFee}</p></div>
                                        <div><p className="text-gray-500">Perf Fee</p><p className="font-mono font-medium text-navy-900">{m.performanceFee}</p></div>
                                        <div><p className="text-gray-500">Restrictions</p><p className="text-gray-700">{m.restrictions}</p></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : <p className="text-gray-400 text-sm">No mandate details available for this client.</p>}
                </div>
            </div>

            {/* Recent Holdings Preview */}
            {positions.length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50">
                        <h3 className="font-semibold text-navy-900 text-sm">Top Holdings</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                                <tr>
                                    <th className="p-4 font-medium w-12">S/N</th>
                                    <th className="p-4 font-medium">Security</th>
                                    <th className="p-4 font-medium">Portfolio</th>
                                    <th className="p-4 font-medium text-right">Quantity</th>
                                    <th className="p-4 font-medium text-right">Market Value (₦)</th>
                                    <th className="p-4 font-medium text-right">P&L (%)</th>
                                    <th className="p-4 font-medium text-right">Weight</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {positions.slice(0, 6).map((p: any, idx: number) => (
                                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 text-gray-400 text-xs font-mono">{idx + 1}</td>
                                        <td className="p-4 font-bold text-navy-900">{p.ticker}</td>
                                        <td className="p-4 text-gray-600">{p.portfolioId}</td>
                                        <td className="p-4 text-right font-mono">{(p.quantity || p.faceValue || 0).toLocaleString()}</td>
                                        <td className="p-4 text-right font-mono font-medium text-navy-900">{p.marketValue.toLocaleString()}</td>
                                        <td className="p-4 text-right font-mono font-medium">
                                            <span className={p.unrealisedPnLPct >= 0 ? "text-success" : "text-danger"}>{p.unrealisedPnLPct > 0 ? '+' : ''}{p.unrealisedPnLPct.toFixed(2)}%</span>
                                        </td>
                                        <td className="p-4 text-right font-mono text-gray-600">{p.weight.toFixed(2)}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

function PortfoliosTab({ portfolios, positions }: any) {
    return (
        <div className="space-y-6">
            {/* Portfolios */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <h3 className="font-semibold text-navy-900 text-sm">Portfolios</h3>
                    <TableToolbar searchValue="" onSearchChange={() => { }} onRefresh={() => { }} exportData={portfolios} exportFilename="client_portfolios" />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                            <tr>
                                <th className="p-4 font-medium w-12">S/N</th>
                                <th className="p-4 font-medium">Portfolio</th>
                                <th className="p-4 font-medium">Asset Class</th>
                                <th className="p-4 font-medium">Benchmark</th>
                                <th className="p-4 font-medium text-right">AUM (₦)</th>
                                <th className="p-4 font-medium text-right">YTD Return</th>
                                <th className="p-4 font-medium">Manager</th>
                                <th className="p-4 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {portfolios.map((p: any, idx: number) => (
                                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 text-gray-400 text-xs font-mono">{idx + 1}</td>
                                    <td className="p-4"><p className="font-medium text-navy-900">{p.name}</p><p className="text-xs text-gray-500 font-mono">{p.id}</p></td>
                                    <td className="p-4"><span className="bg-navy-100 text-navy-700 text-xs font-medium px-2 py-0.5 rounded">{p.assetClass}</span></td>
                                    <td className="p-4 text-gray-600 text-xs">{p.benchmark}</td>
                                    <td className="p-4 text-right font-mono font-medium text-navy-900">{(p.aum / 1e9).toFixed(1)}B</td>
                                    <td className="p-4 text-right font-mono font-medium"><span className={p.ytdReturn >= 0 ? "text-success" : "text-danger"}>{p.ytdReturn > 0 ? '+' : ''}{p.ytdReturn}%</span></td>
                                    <td className="p-4 text-gray-700">{p.manager}</td>
                                    <td className="p-4"><StatusBadge status={p.status} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Holdings */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <h3 className="font-semibold text-navy-900 text-sm">Holdings</h3>
                    <TableToolbar searchValue="" onSearchChange={() => { }} onRefresh={() => { }} exportData={positions} exportFilename="client_holdings" />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                            <tr>
                                <th className="p-4 font-medium w-12">S/N</th>
                                <th className="p-4 font-medium">Security</th>
                                <th className="p-4 font-medium">Portfolio</th>
                                <th className="p-4 font-medium text-right">Quantity</th>
                                <th className="p-4 font-medium text-right">Avg Cost</th>
                                <th className="p-4 font-medium text-right">Current Price</th>
                                <th className="p-4 font-medium text-right">Market Value (₦)</th>
                                <th className="p-4 font-medium text-right">Unrealised P&L</th>
                                <th className="p-4 font-medium text-right">Weight</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {positions.map((p: any, idx: number) => (
                                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 text-gray-400 text-xs font-mono">{idx + 1}</td>
                                    <td className="p-4 font-bold text-navy-900">{p.ticker}</td>
                                    <td className="p-4 font-mono text-xs text-gray-600">{p.portfolioId}</td>
                                    <td className="p-4 text-right font-mono">{(p.quantity || p.faceValue || 0).toLocaleString()}</td>
                                    <td className="p-4 text-right font-mono text-gray-600">{p.avgCost.toFixed(2)}</td>
                                    <td className="p-4 text-right font-mono font-medium">{p.currentPrice.toFixed(2)}</td>
                                    <td className="p-4 text-right font-mono font-medium text-navy-900">{p.marketValue.toLocaleString()}</td>
                                    <td className="p-4 text-right font-mono font-medium">
                                        <span className={p.unrealisedPnL >= 0 ? "text-success" : "text-danger"}>
                                            {p.unrealisedPnL >= 0 ? '+' : ''}₦{p.unrealisedPnL.toLocaleString()} ({p.unrealisedPnLPct.toFixed(2)}%)
                                        </span>
                                    </td>
                                    <td className="p-4 text-right font-mono text-gray-600">{p.weight.toFixed(2)}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function TradesTab({ trades }: any) {
    const { search, setSearch, page, setPage, paged, totalItems, pageSize } = useTableControls(trades, 10, ['ticker', 'id']);

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="font-semibold text-navy-900 text-sm">Trade History</h3>
                <TableToolbar searchValue={search} onSearchChange={setSearch} onRefresh={() => { }} exportData={trades} exportFilename="client_trades" />
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                        <tr>
                            <th className="p-4 font-medium w-12">S/N</th>
                            <th className="p-4 font-medium">Trade ID</th>
                            <th className="p-4 font-medium">Date</th>
                            <th className="p-4 font-medium">Security</th>
                            <th className="p-4 font-medium">Side</th>
                            <th className="p-4 font-medium text-right">Quantity</th>
                            <th className="p-4 font-medium text-right">Price (₦)</th>
                            <th className="p-4 font-medium text-right">Net Value (₦)</th>
                            <th className="p-4 font-medium">Broker</th>
                            <th className="p-4 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {paged.map((t: any, idx: number) => (
                            <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 text-gray-400 text-xs font-mono">{(page - 1) * pageSize + idx + 1}</td>
                                <td className="p-4 font-mono text-xs font-semibold text-navy-700">{t.id}</td>
                                <td className="p-4 font-mono text-gray-600">{t.tradeDate}</td>
                                <td className="p-4 font-bold text-navy-900">{t.ticker}</td>
                                <td className="p-4"><span className={cn("text-xs font-bold px-2 py-0.5 rounded", t.side === 'Buy' ? "bg-navy-100 text-navy-700" : "bg-red-100 text-danger")}>{t.side}</span></td>
                                <td className="p-4 text-right font-mono">{t.quantity.toLocaleString()}</td>
                                <td className="p-4 text-right font-mono">{t.price.toFixed(2)}</td>
                                <td className="p-4 text-right font-mono font-medium text-navy-900">{t.netValue.toLocaleString()}</td>
                                <td className="p-4 text-gray-600 text-xs truncate max-w-[160px]">{t.broker}</td>
                                <td className="p-4"><StatusBadge status={t.status} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {trades.length > 0 && <TablePagination currentPage={page} totalItems={totalItems} pageSize={pageSize} onPageChange={setPage} />}
            {trades.length === 0 && <p className="text-gray-400 text-sm p-8 text-center">No trades found for this client.</p>}
        </div>
    );
}

function FeesTab({ fees }: any) {
    const { search, setSearch, page, setPage, paged, totalItems, pageSize } = useTableControls(fees, 10, ['fundName', 'id', 'invoiceNo']);

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="font-semibold text-navy-900 text-sm">Fee Records</h3>
                <TableToolbar searchValue={search} onSearchChange={setSearch} onRefresh={() => { }} exportData={fees} exportFilename="client_fees" />
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                        <tr>
                            <th className="p-4 font-medium w-12">S/N</th>
                            <th className="p-4 font-medium">Fee ID</th>
                            <th className="p-4 font-medium">Fund</th>
                            <th className="p-4 font-medium">Fee Type</th>
                            <th className="p-4 font-medium">Period</th>
                            <th className="p-4 font-medium text-right">Rate (%)</th>
                            <th className="p-4 font-medium text-right">Amount (₦)</th>
                            <th className="p-4 font-medium">Invoice</th>
                            <th className="p-4 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {paged.map((f: any, idx: number) => (
                            <tr key={f.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 text-gray-400 text-xs font-mono">{(page - 1) * pageSize + idx + 1}</td>
                                <td className="p-4 font-mono text-xs font-semibold text-navy-700">{f.id}</td>
                                <td className="p-4 text-gray-700">{f.fundName.replace('ValuAlliance ', '')}</td>
                                <td className="p-4"><span className="bg-navy-100 text-navy-700 text-xs font-medium px-2 py-0.5 rounded">{f.feeType}</span></td>
                                <td className="p-4 text-gray-600">{f.period}</td>
                                <td className="p-4 text-right font-mono">{f.rate}%</td>
                                <td className="p-4 text-right font-mono font-medium text-navy-900">{(f.monthlyFee || f.feeAmount || 0).toLocaleString()}</td>
                                <td className="p-4 font-mono text-xs text-gray-600">{f.invoiceNo}</td>
                                <td className="p-4"><StatusBadge status={f.status} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {fees.length > 0 && <TablePagination currentPage={page} totalItems={totalItems} pageSize={pageSize} onPageChange={setPage} />}
            {fees.length === 0 && <p className="text-gray-400 text-sm p-8 text-center">No fee records found for this client.</p>}
        </div>
    );
}

function DocumentsTab({ docs }: any) {
    const { search, setSearch, page, setPage, paged, totalItems, pageSize } = useTableControls(docs, 10, ['name']);

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="font-semibold text-navy-900 text-sm">Client Documents</h3>
                <TableToolbar searchValue={search} onSearchChange={setSearch} onRefresh={() => { }} exportData={docs} exportFilename="client_documents" />
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                        <tr>
                            <th className="p-4 font-medium w-12">S/N</th>
                            <th className="p-4 font-medium">Document</th>
                            <th className="p-4 font-medium">Type</th>
                            <th className="p-4 font-medium">Version</th>
                            <th className="p-4 font-medium">Uploaded By</th>
                            <th className="p-4 font-medium">Date</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {paged.map((d: any, idx: number) => (
                            <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 text-gray-400 text-xs font-mono">{(page - 1) * pageSize + idx + 1}</td>
                                <td className="p-4">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-navy-100 rounded flex items-center justify-center mr-3 shrink-0"><DocumentIcon className="w-4 h-4 text-navy-700" /></div>
                                        <span className="font-medium text-navy-900 truncate max-w-[280px]">{d.name}</span>
                                    </div>
                                </td>
                                <td className="p-4"><span className="bg-navy-100 text-navy-700 text-xs font-medium px-2 py-0.5 rounded">{d.type}</span></td>
                                <td className="p-4 font-mono text-xs text-gray-600">{d.version}</td>
                                <td className="p-4 text-gray-700">{d.uploadedBy}</td>
                                <td className="p-4 font-mono text-xs text-gray-600">{d.uploadedDate}</td>
                                <td className="p-4"><StatusBadge status={d.status} /></td>
                                <td className="p-4">
                                    <div className="flex space-x-2">
                                        <button className="p-1.5 bg-gray-100 rounded hover:bg-gray-200 transition-colors"><EyeIcon className="w-3.5 h-3.5 text-gray-600" /></button>
                                        <button className="p-1.5 bg-gray-100 rounded hover:bg-gray-200 transition-colors"><DownloadIcon className="w-3.5 h-3.5 text-gray-600" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {docs.length > 0 && <TablePagination currentPage={page} totalItems={totalItems} pageSize={pageSize} onPageChange={setPage} />}
            {docs.length === 0 && <p className="text-gray-400 text-sm p-8 text-center">No documents found for this client.</p>}
        </div>
    );
}

function ContactsTab({ contacts, client }: any) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contacts.map((c: any, idx: number) => (
                    <div key={idx} className={cn("bg-white rounded-lg border shadow-sm p-6 hover:shadow-md transition-shadow", c.primary ? "border-gold-500/50" : "border-gray-200")}>
                        {c.primary && <span className="bg-gold-100 text-gold-700 text-xs font-medium px-2 py-0.5 rounded mb-3 inline-block">Primary Contact</span>}
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 rounded-full bg-navy-900 text-white flex items-center justify-center font-bold text-sm mr-4 shrink-0">{c.name.split(' ').map((n: string) => n[0]).slice(0, 2).join('')}</div>
                            <div>
                                <h4 className="font-semibold text-navy-900">{c.name}</h4>
                                <p className="text-xs text-gray-500">{c.role}</p>
                            </div>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center text-gray-600">
                                <svg className="w-4 h-4 mr-2 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                <span className="text-xs truncate">{c.email}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <svg className="w-4 h-4 mr-2 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                <span className="text-xs">{c.phone}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Organization Info */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h3 className="text-base font-semibold text-navy-900 mb-4">Organization Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                    <div><p className="text-gray-500 mb-1">Registered Name</p><p className="font-medium text-navy-900">{client.name}</p></div>
                    <div><p className="text-gray-500 mb-1">Type</p><p className="font-medium text-navy-900">{client.type} — {client.category}</p></div>
                    <div><p className="text-gray-500 mb-1">Location</p><p className="font-medium text-navy-900">{client.city}, {client.state}</p></div>
                    <div><p className="text-gray-500 mb-1">Client Since</p><p className="font-mono font-medium text-navy-900">{client.onboardedDate}</p></div>
                </div>
            </div>
        </div>
    );
}
