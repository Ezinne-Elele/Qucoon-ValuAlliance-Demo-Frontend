import React, { useState } from 'react';
import { useRoute, useLocation } from 'wouter';
import { AppShell } from '../components/layout/AppShell';
import { StatusBadge } from '../components/ui/StatusBadge';
import {
    mockPortfolios, mockPositions, mockClients, mockTrades,
} from '../data/mockData';
import {
    ArrowLeftIcon, TrendingUpIcon, PieChartIcon, PortfolioIcon, cn
} from '../components/icons/Icons';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { TableToolbar, TablePagination, useTableControls } from '../components/ui/TableControls';

const PIE_COLORS = ['#0E4535', '#DFA223', '#22795F', '#5BBD9A', '#3B8266'];

export default function PortfolioDetail() {
    const [, params] = useRoute('/portfolio/:id');
    const [, navigate] = useLocation();
    const portfolioId = params?.id;
    const portfolio = mockPortfolios.find(p => p.id === portfolioId);

    const [activeTab, setActiveTab] = useState('Overview');
    const tabs = ['Overview', 'Holdings', 'Trades'];

    if (!portfolio) {
        return (
            <AppShell>
                <div className="flex flex-col items-center justify-center py-32">
                    <h2 className="text-xl font-bold text-navy-900 mb-2">Portfolio Not Found</h2>
                    <p className="text-gray-500 mb-6">The requested portfolio does not exist.</p>
                    <button onClick={() => navigate('/portfolio')} className="px-6 py-2.5 bg-navy-900 text-white rounded-lg text-[13px] font-bold">
                        Back to Portfolio Operations
                    </button>
                </div>
            </AppShell>
        );
    }

    const client = mockClients.find(c => c.id === portfolio.clientId);
    const positions = mockPositions.filter(p => p.portfolioId === portfolioId);
    const trades = mockTrades.filter(t => t.portfolioId === portfolioId);

    const allocation = portfolio.allocation || {};
    const allocationData = Object.entries(allocation)
        .filter(([_, v]) => (v as number) > 0)
        .map(([key, value]) => ({
            name: key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()),
            value: value as number,
        }));

    return (
        <AppShell>
            <div className="space-y-8">
                {/* Back Button + Header */}
                <div>
                    <button
                        onClick={() => navigate('/portfolio')}
                        className="flex items-center text-gray-500 hover:text-navy-900 text-[13px] font-bold mb-4 transition-colors"
                    >
                        <ArrowLeftIcon className="w-4 h-4 mr-2" /> Back to Portfolio Operations
                    </button>
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold text-navy-900 tracking-tight">{portfolio.name}</h1>
                            <div className="flex items-center space-x-3 mt-2">
                                <span className="text-[13px] text-gray-500 font-medium">{portfolio.id}</span>
                                <span className="text-gray-300">|</span>
                                <span className="text-[13px] text-gray-500 font-medium">{portfolio.assetClass}</span>
                                <span className="text-gray-300">|</span>
                                <span className="text-[13px] text-gray-500 font-medium">PM: {portfolio.manager}</span>
                                <span className="text-gray-300">|</span>
                                <StatusBadge status={portfolio.status} />
                            </div>
                            {client && (
                                <p className="text-[13px] text-gray-400 mt-1">
                                    Client: <button onClick={() => navigate(`/client-management/${client.id}`)} className="text-navy-900 font-bold hover:underline">{client.name}</button>
                                </p>
                            )}
                        </div>
                        <div className="flex space-x-3">
                            <button className="px-4 py-2.5 bg-white border border-gray-100 rounded-lg text-gray-500 shadow-sm hover:bg-gray-50 text-[13px] font-bold">
                                Export Holdings
                            </button>
                            <button className="px-5 py-2.5 bg-navy-900 text-white rounded-lg text-[13px] font-bold shadow-lg hover:shadow-xl transition-all">
                                Rebalance
                            </button>
                        </div>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">AUM</p>
                        <p className="text-xl font-bold text-navy-900">₦{(portfolio.aum / 1e9).toFixed(2)}B</p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">YTD Return</p>
                        <p className={cn("text-xl font-bold", portfolio.ytdReturn >= 0 ? "text-success" : "text-danger")}>
                            {portfolio.ytdReturn > 0 ? '+' : ''}{portfolio.ytdReturn}%
                        </p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Holdings</p>
                        <p className="text-xl font-bold text-navy-900">{positions.length}</p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Benchmark</p>
                        <p className="text-[13px] font-bold text-navy-900">{portfolio.benchmark}</p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Inception</p>
                        <p className="text-[13px] font-bold text-navy-900">{portfolio.inceptionDate}</p>
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
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Asset Allocation Chart */}
                            {allocationData.length > 0 && (
                                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                    <h3 className="text-[12px] font-bold text-navy-900 tracking-widest uppercase mb-6">Asset Allocation</h3>
                                    <div className="h-56 relative flex items-center justify-center">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={allocationData}
                                                    innerRadius={60}
                                                    outerRadius={85}
                                                    paddingAngle={4}
                                                    dataKey="value"
                                                >
                                                    {allocationData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                        <div className="absolute flex flex-col items-center">
                                            <span className="text-2xl font-bold text-navy-900">100%</span>
                                            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Allocated</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        {allocationData.map((item, i) => (
                                            <div key={i} className="flex items-center justify-between text-[13px]">
                                                <div className="flex items-center">
                                                    <div className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                                                    <span>{item.name}</span>
                                                </div>
                                                <span className="font-bold">{item.value}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Portfolio Details */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-[12px] font-bold text-navy-900 tracking-widest uppercase mb-4">Portfolio Details</h3>
                                <div className="space-y-3">
                                    {[
                                        { label: 'Portfolio ID', value: portfolio.id },
                                        { label: 'Portfolio Name', value: portfolio.name },
                                        { label: 'Client', value: client?.name || portfolio.clientId },
                                        { label: 'Asset Class', value: portfolio.assetClass },
                                        { label: 'Currency', value: portfolio.currency },
                                        { label: 'Benchmark', value: portfolio.benchmark },
                                        { label: 'Portfolio Manager', value: portfolio.manager },
                                        { label: 'Inception Date', value: portfolio.inceptionDate },
                                        { label: 'Status', value: portfolio.status },
                                    ].map((item, i) => (
                                        <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                                            <span className="text-[13px] text-gray-500">{item.label}</span>
                                            {item.label === 'Status' ? (
                                                <StatusBadge status={item.value} />
                                            ) : (
                                                <span className="text-[13px] font-medium text-navy-900">{item.value}</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Mandate Notes */}
                        <div className="bg-navy-900/5 rounded-2xl p-6 border border-navy-900/10">
                            <h4 className="text-[12px] font-bold text-navy-900 uppercase tracking-widest mb-3">Portfolio Mandate</h4>
                            <p className="text-[13px] text-navy-800 leading-relaxed italic opacity-80">
                                "Investment mandate focuses on {portfolio.assetClass} assets with a long-term capital appreciation objective. Execution restricted to approved broker lists and risk limits. Benchmark: {portfolio.benchmark}."
                            </p>
                        </div>
                    </div>
                )}

                {activeTab === 'Holdings' && (
                    <HoldingsTab positions={positions} />
                )}

                {activeTab === 'Trades' && (
                    <PortfolioTradesTab trades={trades} />
                )}
            </div>
        </AppShell>
    );
}

function HoldingsTab({ positions }: { positions: any[] }) {
    const ctrl = useTableControls(positions, 10, ['ticker']);
    return (
        <div className="table-datagrid-container">
            <div className="p-5 border-b border-gray-100 bg-white/50 flex justify-between items-center">
                <h3 className="font-bold text-navy-900 text-sm uppercase tracking-wider">Holdings Blotter</h3>
                <TableToolbar
                    searchValue={ctrl.search}
                    onSearchChange={ctrl.setSearch}
                    onRefresh={() => { }}
                    exportData={positions}
                    exportFilename="portfolio_holdings"
                    density={ctrl.density}
                    onDensityChange={ctrl.setDensity}
                />
            </div>
            <table className={cn("table-datagrid", `density-${ctrl.density}`)}>
                <thead>
                    <tr>
                        <th>Ticker</th>
                        <th className="text-right">Quantity</th>
                        <th className="text-right">Avg Cost</th>
                        <th className="text-right">Current Price</th>
                        <th className="text-right">Market Value</th>
                        <th className="text-right">Unrealised P&L</th>
                        <th className="text-right">P&L %</th>
                        <th className="text-right">Weight %</th>
                    </tr>
                </thead>
                <tbody>
                    {ctrl.paged.length > 0 ? ctrl.paged.map((pos: any) => (
                        <tr key={pos.id}>
                            <td>{pos.ticker}</td>
                            <td className="text-right">{(pos.quantity || pos.faceValue).toLocaleString()}</td>
                            <td className="text-right">{pos.avgCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                            <td className="text-right">{pos.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                            <td className="text-right">₦{pos.marketValue.toLocaleString()}</td>
                            <td className="text-right">
                                <span className={pos.unrealisedPnL >= 0 ? "text-success" : "text-danger"}>
                                    {pos.unrealisedPnL > 0 ? '+' : ''}₦{pos.unrealisedPnL.toLocaleString()}
                                </span>
                            </td>
                            <td className="text-right">
                                <span className={pos.unrealisedPnLPct >= 0 ? "text-success" : "text-danger"}>
                                    {pos.unrealisedPnLPct > 0 ? '+' : ''}{pos.unrealisedPnLPct}%
                                </span>
                            </td>
                            <td className="text-right">{pos.weight}%</td>
                        </tr>
                    )) : (
                        <tr><td colSpan={8} className="p-8 text-center text-gray-400 italic">No active holdings found</td></tr>
                    )}
                </tbody>
            </table>
            <TablePagination currentPage={ctrl.page} totalItems={ctrl.totalItems} pageSize={ctrl.pageSize} onPageChange={ctrl.setPage} />
        </div>
    );
}

function PortfolioTradesTab({ trades }: { trades: any[] }) {
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
                    exportFilename="portfolio_trades"
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
                        <th>Side</th>
                        <th className="text-right">Quantity</th>
                        <th className="text-right">Price</th>
                        <th className="text-right">Gross Value</th>
                        <th className="text-right">Net Value</th>
                        <th>Broker</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {ctrl.paged.length > 0 ? ctrl.paged.map((t: any) => (
                        <tr key={t.id}>
                            <td>{t.id}</td>
                            <td>{t.tradeDate}</td>
                            <td>{t.ticker}</td>
                            <td>
                                <span className={cn(
                                    "px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider",
                                    t.side === 'Buy' ? "bg-success-bg text-success" : "bg-danger-bg text-danger"
                                )}>
                                    {t.side}
                                </span>
                            </td>
                            <td className="text-right">{t.quantity.toLocaleString()}</td>
                            <td className="text-right">{t.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                            <td className="text-right">₦{t.grossValue.toLocaleString()}</td>
                            <td className="text-right">₦{t.netValue.toLocaleString()}</td>
                            <td>{t.broker}</td>
                            <td><StatusBadge status={t.status} /></td>
                        </tr>
                    )) : (
                        <tr><td colSpan={10} className="p-8 text-center text-gray-400 italic">No trades found for this portfolio.</td></tr>
                    )}
                </tbody>
            </table>
            <TablePagination currentPage={ctrl.page} totalItems={ctrl.totalItems} pageSize={ctrl.pageSize} onPageChange={ctrl.setPage} />
        </div>
    );
}
