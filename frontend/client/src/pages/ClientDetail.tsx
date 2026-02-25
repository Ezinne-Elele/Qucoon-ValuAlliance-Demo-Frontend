import React, { useState } from 'react';
import { useRoute, useLocation } from 'wouter';
import { AppShell } from '../components/layout/AppShell';
import { StatusBadge } from '../components/ui/StatusBadge';
import {
    mockClients, mockClientContacts, mockClientMandates, mockClientAumHistory,
    getClientPortfolios, getClientTrades, getClientPositions, getClientDocuments,
} from '../data/mockData';
import {
    ArrowLeftIcon, PortfolioIcon, TradeIcon, DocumentIcon, DownloadIcon,
    TrendingUpIcon, PieChartIcon, UsersIcon, ClientManagementIcon, cn
} from '../components/icons/Icons';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TableToolbar, TablePagination, useTableControls } from '../components/ui/TableControls';

const PIE_COLORS = ['#0E4535', '#DFA223', '#22795F', '#5BBD9A', '#3B8266'];

export default function ClientDetail() {
    const [, params] = useRoute('/client-management/:id');
    const [, navigate] = useLocation();
    const clientId = params?.id;
    const client = mockClients.find(c => c.id === clientId);

    const [activeTab, setActiveTab] = useState('Overview');
    const tabs = ['Overview', 'Portfolios', 'Trades', 'Documents'];

    if (!client) {
        return (
            <AppShell>
                <div className="flex flex-col items-center justify-center py-32">
                    <h2 className="text-xl font-bold text-navy-900 mb-2">Client Not Found</h2>
                    <p className="text-gray-500 mb-6">The requested client does not exist.</p>
                    <button onClick={() => navigate('/client-management')} className="px-6 py-2.5 bg-navy-900 text-white rounded-lg text-[13px] font-bold">
                        Back to Client Directory
                    </button>
                </div>
            </AppShell>
        );
    }

    const portfolios = getClientPortfolios(client.id);
    const trades = getClientTrades(client.id);
    const positions = getClientPositions(client.id);
    const docs = getClientDocuments(client.id);
    const contacts = mockClientContacts[client.id] || [];
    const mandates = mockClientMandates[client.id] || [];
    const aumHistory = mockClientAumHistory[client.id] || [];

    const totalPortfolioAum = portfolios.reduce((s, p) => s + p.aum, 0);

    return (
        <AppShell>
            <div className="space-y-8">
                {/* Back Button + Header */}
                <div>
                    <button
                        onClick={() => navigate('/client-management')}
                        className="flex items-center text-gray-500 hover:text-navy-900 text-[13px] font-bold mb-4 transition-colors"
                    >
                        <ArrowLeftIcon className="w-4 h-4 mr-2" /> Back to Client Directory
                    </button>
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold text-navy-900 tracking-tight">{client.name}</h1>
                            <div className="flex items-center space-x-3 mt-2">
                                <span className="text-[13px] text-gray-500 font-medium">{client.id}</span>
                                <span className="text-gray-300">|</span>
                                <span className="text-[13px] text-gray-500 font-medium">{client.type} — {client.category}</span>
                                <span className="text-gray-300">|</span>
                                <StatusBadge status={client.relationship} />
                                <StatusBadge status={client.kyc} />
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            <button className="px-4 py-2.5 bg-white border border-gray-100 rounded-lg text-gray-500 shadow-sm hover:bg-gray-50 text-[13px] font-bold">
                                Export Report
                            </button>
                            <button className="px-5 py-2.5 bg-navy-900 text-white rounded-lg text-[13px] font-bold shadow-lg hover:shadow-xl transition-all">
                                Modify Relationship
                            </button>
                        </div>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Aggregate AUM</p>
                        <p className="text-2xl font-bold text-navy-900 font-mono">₦{(client.aum / 1e9).toFixed(2)}B</p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Active Portfolios</p>
                        <p className="text-2xl font-bold text-navy-900">{portfolios.length}</p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Risk Rating</p>
                        <StatusBadge status={client.riskRating} />
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Onboarded</p>
                        <p className="text-lg font-bold text-navy-900 font-mono">{client.onboardedDate}</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex space-x-1 border-b border-gray-100 overflow-x-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "px-5 py-3 text-[11px] font-bold uppercase tracking-widest transition-all border-b-2 whitespace-nowrap",
                                activeTab === tab
                                    ? "border-navy-900 text-navy-900"
                                    : "border-transparent text-gray-400 hover:text-navy-700"
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                {activeTab === 'Overview' && (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* AUM Trend */}
                            {aumHistory.length > 0 && (
                                <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                    <h3 className="text-[12px] font-bold text-navy-900 tracking-widest uppercase mb-6">AUM Trend</h3>
                                    <div className="h-64">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={aumHistory}>
                                                <defs>
                                                    <linearGradient id="colorClientAumDetail" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#22795F" stopOpacity={0.15} />
                                                        <stop offset="95%" stopColor="#22795F" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F3F5" />
                                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9AA1AE', fontWeight: 600 }} />
                                                <YAxis hide />
                                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                                                <Area type="monotone" dataKey="aum" stroke="#22795F" strokeWidth={3} fillOpacity={1} fill="url(#colorClientAumDetail)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            )}

                            {/* AUM Attribution */}
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                <h3 className="text-[12px] font-bold text-navy-900 tracking-widest uppercase mb-6">AUM Attribution</h3>
                                <div className="h-48 relative flex items-center justify-center">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={portfolios.map(p => ({ name: p.name, value: p.aum }))}
                                                innerRadius={55}
                                                outerRadius={75}
                                                paddingAngle={4}
                                                dataKey="value"
                                            >
                                                {portfolios.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute flex flex-col items-center">
                                        <span className="text-xl font-bold text-navy-900 font-mono">₦{(totalPortfolioAum / 1e9).toFixed(1)}B</span>
                                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Total</span>
                                    </div>
                                </div>
                                <div className="mt-4 space-y-2">
                                    {portfolios.map((p, i) => (
                                        <div key={p.id} className="flex items-center justify-between text-[12px]">
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                                                <span className="truncate">{p.name}</span>
                                            </div>
                                            <span className="font-mono">₦{(p.aum / 1e9).toFixed(1)}B</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Client Information */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* General Information */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-[12px] font-bold text-navy-900 tracking-widest uppercase mb-4">General Information</h3>
                                <div className="space-y-3">
                                    {[
                                        { label: 'Client ID', value: client.id },
                                        { label: 'Entity Type', value: client.type },
                                        { label: 'Category', value: client.category },
                                        { label: 'Location', value: `${client.city}, ${client.state}` },
                                        { label: 'Contact Person', value: client.contactPerson },
                                        { label: 'Email', value: client.email },
                                        { label: 'Phone', value: client.phone },
                                        { label: 'Onboarded', value: client.onboardedDate },
                                    ].map((item, i) => (
                                        <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                                            <span className="text-[13px] text-gray-500">{item.label}</span>
                                            <span className="text-[13px] font-medium text-navy-900">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Risk & Compliance */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-[12px] font-bold text-navy-900 tracking-widest uppercase mb-4">Risk & Compliance</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                        <span className="text-[13px] text-gray-500">Risk Rating</span>
                                        <StatusBadge status={client.riskRating} />
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                        <span className="text-[13px] text-gray-500">KYC Status</span>
                                        <StatusBadge status={client.kyc} />
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                        <span className="text-[13px] text-gray-500">Relationship Status</span>
                                        <StatusBadge status={client.relationship} />
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-[13px] text-gray-500">PEP Check</span>
                                        <span className="text-[10px] font-bold bg-success/10 text-success px-2 py-0.5 rounded border border-success/20">CLEARED</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Key Contacts */}
                        {contacts.length > 0 && (
                            <div>
                                <h3 className="text-[12px] font-bold text-navy-900 tracking-widest uppercase mb-4">Key Contacts</h3>
                                <div className="table-datagrid-container">
                                    <table className="table-datagrid">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Role</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th>Primary</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {contacts.map((c: any, i: number) => (
                                                <tr key={i}>
                                                    <td>{c.name}</td>
                                                    <td>{c.role}</td>
                                                    <td>{c.email}</td>
                                                    <td>{c.phone}</td>
                                                    <td>{c.primary ? <StatusBadge status="Active" /> : <span className="text-gray-400">—</span>}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Mandates */}
                        {mandates.length > 0 && (
                            <div>
                                <h3 className="text-[12px] font-bold text-navy-900 tracking-widest uppercase mb-4">Investment Mandates</h3>
                                <div className="table-datagrid-container">
                                    <table className="table-datagrid">
                                        <thead>
                                            <tr>
                                                <th>Mandate ID</th>
                                                <th>Name</th>
                                                <th>Asset Class</th>
                                                <th>Benchmark</th>
                                                <th>Restrictions</th>
                                                <th>Inception</th>
                                                <th>Mgt Fee</th>
                                                <th>Perf Fee</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {mandates.map((m: any, i: number) => (
                                                <tr key={i}>
                                                    <td>{m.id}</td>
                                                    <td>{m.name}</td>
                                                    <td>{m.assetClass}</td>
                                                    <td>{m.benchmark}</td>
                                                    <td>{m.restrictions}</td>
                                                    <td>{m.inceptionDate}</td>
                                                    <td>{m.managementFee}</td>
                                                    <td>{m.performanceFee}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'Portfolios' && (
                    <PortfoliosTab portfolios={portfolios} positions={positions} navigate={navigate} />
                )}

                {activeTab === 'Trades' && (
                    <TradesTab trades={trades} />
                )}

                {activeTab === 'Documents' && (
                    <div className="grid grid-cols-1 gap-3">
                        {docs.length > 0 ? docs.map((d: any, i: number) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-navy-900/5 rounded-lg flex items-center justify-center mr-4 group-hover:bg-navy-900 transition-colors">
                                        <DocumentIcon className="w-5 h-5 text-navy-900 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-bold text-navy-900">{d.name}</p>
                                        <p className="text-[11px] text-gray-400">{d.type} · Version {d.version}</p>
                                    </div>
                                </div>
                                <button className="p-2 text-gray-400 hover:text-navy-900 transition-colors">
                                    <DownloadIcon className="w-5 h-5" />
                                </button>
                            </div>
                        )) : (
                            <div className="text-center py-12 text-gray-400 italic">No documents found for this client.</div>
                        )}
                    </div>
                )}
            </div>
        </AppShell>
    );
}

function PortfoliosTab({ portfolios, positions, navigate }: { portfolios: any[], positions: any[], navigate: (path: string) => void }) {
    return (
        <div className="space-y-6">
            <div className="table-datagrid-container">
                <div className="p-5 border-b border-gray-100 bg-white/50">
                    <h3 className="font-bold text-navy-900 text-sm uppercase tracking-wider">Client Portfolios</h3>
                </div>
                <table className="table-datagrid">
                    <thead>
                        <tr>
                            <th>Portfolio ID</th>
                            <th>Portfolio Name</th>
                            <th>Asset Class</th>
                            <th className="text-right">AUM (₦)</th>
                            <th className="text-right">YTD Return</th>
                            <th>Manager</th>
                            <th>Benchmark</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {portfolios.map(p => (
                            <tr key={p.id} className="hover:bg-gray-50/50 cursor-pointer" onClick={() => navigate(`/portfolio/${p.id}`)}>
                                <td>{p.id}</td>
                                <td>{p.name}</td>
                                <td>{p.assetClass}</td>
                                <td className="text-right font-mono">₦{(p.aum / 1e9).toFixed(2)}B</td>
                                <td className="text-right font-mono">
                                    <span className={p.ytdReturn >= 0 ? "text-success" : "text-danger"}>{p.ytdReturn > 0 ? '+' : ''}{p.ytdReturn}%</span>
                                </td>
                                <td>{p.manager}</td>
                                <td>{p.benchmark}</td>
                                <td><StatusBadge status={p.status} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Holdings */}
            {positions.length > 0 && (
                <div className="table-datagrid-container">
                    <div className="p-5 border-b border-gray-100 bg-white/50">
                        <h3 className="font-bold text-navy-900 text-sm uppercase tracking-wider">Aggregate Holdings</h3>
                    </div>
                    <table className="table-datagrid">
                        <thead>
                            <tr>
                                <th>Ticker</th>
                                <th>Portfolio</th>
                                <th className="text-right">Quantity</th>
                                <th className="text-right">Market Value</th>
                                <th className="text-right">Unrealised P&L</th>
                                <th className="text-right">Weight %</th>
                            </tr>
                        </thead>
                        <tbody>
                            {positions.map(pos => (
                                <tr key={pos.id}>
                                    <td>{pos.ticker}</td>
                                    <td>{pos.portfolioId}</td>
                                    <td className="text-right font-mono">{(pos.quantity || pos.faceValue).toLocaleString()}</td>
                                    <td className="text-right font-mono">₦{pos.marketValue.toLocaleString()}</td>
                                    <td className="text-right font-mono">
                                        <span className={pos.unrealisedPnL >= 0 ? "text-success" : "text-danger"}>
                                            {pos.unrealisedPnL > 0 ? '+' : ''}₦{pos.unrealisedPnL.toLocaleString()}
                                        </span>
                                    </td>
                                    <td className="text-right font-mono">{pos.weight}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

function TradesTab({ trades }: { trades: any[] }) {
    const ctrl = useTableControls(trades, 10, ['ticker', 'id']);
    return (
        <div className="table-datagrid-container">
            <div className="p-5 border-b border-gray-100 bg-white/50 flex justify-between items-center">
                <h3 className="font-bold text-navy-900 text-sm uppercase tracking-wider">Trade Activity</h3>
                <TableToolbar
                    searchValue={ctrl.search}
                    onSearchChange={ctrl.setSearch}
                    onRefresh={() => { }}
                    exportData={trades}
                    exportFilename="client_trades"
                    density={ctrl.density}
                    onDensityChange={ctrl.setDensity}
                />
            </div>
            <table className={cn("table-datagrid", `density-${ctrl.density}`)}>
                <thead>
                    <tr>
                        <th>Trade ID</th>
                        <th>Date</th>
                        <th>Security</th>
                        <th>Portfolio</th>
                        <th>Side</th>
                        <th className="text-right">Quantity</th>
                        <th className="text-right">Price</th>
                        <th className="text-right">Gross Value</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {ctrl.paged.map((t: any) => (
                        <tr key={t.id}>
                            <td>{t.id}</td>
                            <td>{t.tradeDate}</td>
                            <td>{t.ticker}</td>
                            <td>{t.portfolioId}</td>
                            <td>
                                <span className={cn(
                                    "px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider",
                                    t.side === 'Buy' ? "bg-success-bg text-success" : "bg-danger-bg text-danger"
                                )}>
                                    {t.side}
                                </span>
                            </td>
                            <td className="text-right font-mono">{t.quantity.toLocaleString()}</td>
                            <td className="text-right font-mono">{t.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                            <td className="text-right font-mono">₦{t.grossValue.toLocaleString()}</td>
                            <td><StatusBadge status={t.status} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <TablePagination currentPage={ctrl.page} totalItems={ctrl.totalItems} pageSize={ctrl.pageSize} onPageChange={ctrl.setPage} />
        </div>
    );
}
