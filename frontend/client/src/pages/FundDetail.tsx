import React, { useState } from 'react';
import { useRoute, useLocation } from 'wouter';
import { AppShell } from '../components/layout/AppShell';
import { StatusBadge } from '../components/ui/StatusBadge';
import {
    mockFunds, mockNavHistory, mockPerformance, mockTrades, mockFees,
    mockComplianceEvents, mockDocuments, getFundHoldings, getFundUnitHolders,
    getFundTransactions, getFundNavComputations, mockAumTrend, mockUnitHistory
} from '../data/mockData';
import {
    ArrowLeftIcon, TrendingUpIcon, TrendingDownIcon, PieChartIcon,
    DownloadIcon, UsersIcon, NairaIcon,
    RefreshIcon, CheckCircleIcon, PlusIcon, AlertIcon, cn
} from '../components/icons/Icons';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Legend, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { TableToolbar, TablePagination, useTableControls } from '../components/ui/TableControls';

// Custom icons that might be missing from the provided set
const ShieldIconLocal = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

const PIE_COLORS = ['#0E4535', '#DFA223', '#22795F', '#5BBD9A', '#3B8266'];

export default function FundDetail() {
    const [, params] = useRoute('/fund/:id');
    const [, navigate] = useLocation();
    const fundId = params?.id || '';
    const fund = mockFunds.find(f => f.id === fundId);

    const [activeTab, setActiveTab] = useState('Overview');
    const [selectedNavRun, setSelectedNavRun] = useState<any>(null); // For NAV Breakdown modal

    const tabs = [
        'Overview', 'Holdings', 'Unit Holders', 'Performance',
        'Liquidity', 'Fees', 'Transactions', 'Compliance', 'Documents', 'NAV Engine'
    ];

    if (!fund) {
        return (
            <AppShell>
                <div className="flex flex-col items-center justify-center py-32">
                    <h2 className="text-xl font-bold text-navy-900 mb-2">Fund Not Found</h2>
                    <p className="text-gray-500 mb-6 font-medium">The requested fund does not exist in the register.</p>
                    <button onClick={() => navigate('/valuation')} className="px-6 py-2.5 bg-navy-900 text-white rounded-lg text-[13px] font-bold shadow-lg">
                        Return to Valuation
                    </button>
                </div>
            </AppShell>
        );
    }

    // Load related data
    const holdings = getFundHoldings(fundId);
    const unitHolders = getFundUnitHolders(fundId);
    const transactions = getFundTransactions(fundId);
    const navComputations = getFundNavComputations(fundId);
    const fundFees = mockFees.filter(f => f.fundId === fundId);
    const fundCompliance = mockComplianceEvents.filter(e => (e as any).portfolioId?.includes(fundId) || !(e as any).portfolioId);
    const navHistory = mockNavHistory[fundId] || [];
    const perfData = mockPerformance.find(p => p.portfolioId === fundId) || mockPerformance[0];

    // Asset allocation for pie chart
    const allocationData = holdings.reduce((acc: any[], h) => {
        const existing = acc.find(item => item.name === h.assetClass);
        if (existing) {
            existing.value += h.percentOfNav;
        } else {
            acc.push({ name: h.assetClass, value: h.percentOfNav });
        }
        return acc;
    }, []);

    return (
        <AppShell>
            <div className="space-y-8 animate-in fade-in duration-500">
                {/* Header Section */}
                <div>
                    <button
                        onClick={() => navigate('/valuation')}
                        className="flex items-center text-gray-500 hover:text-navy-900 text-[13px] font-bold mb-4 transition-all hover:translate-x-[-4px]"
                    >
                        <ArrowLeftIcon className="w-4 h-4 mr-2" /> Back to Fund Universe
                    </button>
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center space-x-3 mb-1">
                                <h1 className="text-2xl font-bold text-navy-900 tracking-tight">{fund.name}</h1>
                                <StatusBadge status={fund.status} />
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-[13px] text-gray-500 font-bold bg-gray-100 px-2 py-0.5 rounded uppercase">{fund.id}</span>
                                <span className="text-gray-300">•</span>
                                <span className="text-[13px] text-gray-500 font-semibold">{fund.type} Fund</span>
                                <span className="text-gray-300">•</span>
                                <span className="text-[13px] text-gray-500 font-semibold">Inception: {fund.inceptionDate}</span>
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            <button className="px-5 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-600 shadow-sm hover:bg-gray-50 text-[13px] font-bold transition-all">
                                Download Factsheet
                            </button>
                            <button className="px-5 py-2.5 bg-navy-900 text-white rounded-lg text-[13px] font-bold shadow-lg hover:shadow-xl hover:translate-y-[-1px] transition-all">
                                Run NAV Run
                            </button>
                        </div>
                    </div>
                </div>

                {/* Top Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <MetricCard
                        label="Current NAV"
                        value={`₦${fund.nav.toFixed(2)}`}
                        subValue={`As at ${fund.navDate}`}
                        trend={`${fund.ytdReturn}% YTD`}
                        trendUp={fund.ytdReturn >= 0}
                    />
                    <MetricCard
                        label="Total AUM"
                        value={`₦${(fund.aum / 1e9).toFixed(2)}B`}
                        subValue={`${fund.currency} Base Currency`}
                        trend="+₦1.2B (MTD)"
                        trendUp={true}
                    />
                    <MetricCard
                        label="Unit Holders"
                        value={unitHolders.length.toString()}
                        subValue={`${unitHolders.filter(h => h.isLargeHolder).length} Institutional Accounts`}
                        icon={<UsersIcon className="w-4 h-4 text-gold-500" />}
                    />
                    <MetricCard
                        label="Units Outstanding"
                        value={(fund.totalUnitsOutstanding || fund.units).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        subValue={`Updated: ${new Date(fund.totalUnitsOutstandingAsOf || fund.navDate).toLocaleDateString()}`}
                        icon={<PieChartIcon className="w-4 h-4 text-gold-500" />}
                    />
                </div>

                {/* Main Tabs Navigation */}
                <div className="flex space-x-1 border-b border-gray-100 overflow-x-auto no-scrollbar scroll-smooth">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "px-6 py-3 text-[11px] font-bold uppercase tracking-widest transition-all border-b-2 whitespace-nowrap",
                                activeTab === tab
                                    ? "border-navy-900 text-navy-900 bg-navy-50/30"
                                    : "border-transparent text-gray-400 hover:text-navy-700 hover:bg-gray-50"
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Tab Content Area */}
                <div className="min-h-[500px]">
                    {activeTab === 'Overview' && <OverviewTab fund={fund} navHistory={navHistory} allocationData={allocationData} />}
                    {activeTab === 'Holdings' && <HoldingsTab holdings={holdings} />}
                    {activeTab === 'Unit Holders' && <UnitHoldersTab holders={unitHolders} fundId={fundId} />}
                    {activeTab === 'Performance' && <PerformanceTab perf={perfData} navHistory={navHistory} />}
                    {activeTab === 'Liquidity' && <LiquidityTab fund={fund} holdings={holdings} transactions={transactions} />}
                    {activeTab === 'Fees' && <FeesTab fees={fundFees} fund={fund} />}
                    {activeTab === 'Transactions' && <TransactionsTab txns={transactions} />}
                    {activeTab === 'Compliance' && <ComplianceTab events={fundCompliance} />}
                    {activeTab === 'Documents' && <DocumentsTab docs={mockDocuments.filter(d => (d as any).fundId === fundId || d.clientId === (fund as any).clientId)} />}
                    {activeTab === 'NAV Engine' && <NavEngineTab fund={fund} computations={navComputations} onViewBreakdown={setSelectedNavRun} />}
                </div>

                {/* NAV Breakdown Modal */}
                {selectedNavRun && <NavBreakdownModal run={selectedNavRun} onClose={() => setSelectedNavRun(null)} />}
            </div>
        </AppShell>
    );
}

// --- Sub-Components ---

function MetricCard({ label, value, subValue, trend, trendUp, icon }: any) {
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all group overflow-hidden relative">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                {icon || <TrendingUpIcon className="w-8 h-8" />}
            </div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 relative z-10">{label}</p>
            <p className="text-2xl font-bold text-navy-900 tracking-tight font-mono mb-1 relative z-10">{value}</p>
            <div className="flex items-center justify-between relative z-10">
                <span className="text-[12px] text-gray-500 font-medium">{subValue}</span>
                {trend && (
                    <span className={cn(
                        "text-[11px] font-bold px-1.5 py-0.5 rounded-md",
                        trendUp ? "text-success bg-success-bg" : "text-danger bg-danger-bg"
                    )}>
                        {trend}
                    </span>
                )}
            </div>
        </div>
    );
}

function OverviewTab({ fund, navHistory, allocationData }: any) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                {/* NAV Growth Chart */}
                <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-base font-bold text-navy-900 mb-1">NAV Performance History</h3>
                            <p className="text-[13px] text-gray-500 font-medium">Daily net asset value progression over time</p>
                        </div>
                        <div className="flex space-x-2">
                            {['1M', '3M', '6M', 'YTD', 'ALL'].map(p => (
                                <button key={p} className={cn("px-3 py-1.5 rounded-lg text-[11px] font-bold", p === '6M' ? "bg-navy-900 text-white" : "text-gray-500 hover:bg-gray-50")}>{p}</button>
                            ))}
                        </div>
                    </div>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={navHistory}>
                                <defs>
                                    <linearGradient id="colorNav" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0E4535" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#0E4535" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af', fontWeight: 600 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af', fontWeight: 600, fontFamily: 'JetBrains Mono' }} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }} />
                                <Area type="monotone" dataKey="nav" stroke="#0E4535" strokeWidth={3} fillOpacity={1} fill="url(#colorNav)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Fund Master Card */}
                    <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
                        <h3 className="text-[12px] font-bold text-navy-900 tracking-widest uppercase mb-4 opacity-50">Fund Register Details</h3>
                        <div className="space-y-3">
                            {[
                                { label: 'Official Name', value: fund.name },
                                { label: 'Fund Category', value: fund.type },
                                { label: 'ISIN / SEC Reg No', value: `NG-${fund.id}-SEC` },
                                { label: 'Management Fee', value: `${fund.managementFee}% p.a.` },
                                { label: 'Performance Fee', value: fund.performanceFee ? `${fund.performanceFee}% above hurdle` : 'None' },
                                { label: 'Pricing Frequency', value: 'Daily' },
                                { label: 'Redemption Period', value: 'T+3' },
                                { label: 'Custodian', value: 'CSCS / Citibank' },
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                                    <span className="text-[13px] text-gray-500 font-medium">{item.label}</span>
                                    <span className="text-[13px] font-bold text-navy-900">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-navy-900 rounded-lg p-6 text-white shadow-xl relative overflow-hidden">
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gold-500/10 rounded-full blur-3xl"></div>
                        <h3 className="text-[11px] font-bold text-gold-500 tracking-widest uppercase mb-6">Investment Strategy</h3>
                        <p className="text-[14px] leading-relaxed font-medium opacity-90 italic">
                            "The {fund.name} seeks long-term capital preservation and growth by investing primarily in high-yield {fund.type.toLowerCase()} instruments. The fund maintains a risk-managed approach to diversification per SEC guidelines."
                        </p>
                        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[10px] text-white/50 font-bold uppercase mb-1">Benchmark</p>
                                <p className="text-[12px] font-bold">{fund.benchmark}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-white/50 font-bold uppercase mb-1">Fund Manager</p>
                                <p className="text-[12px] font-bold">ValuAlliance Asset Mgmt</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Side Column */}
            <div className="space-y-8">
                {/* Allocation Pie */}
                <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 overflow-hidden">
                    <h3 className="text-[12px] font-bold text-navy-900 tracking-widest uppercase mb-6 text-center">Current Allocation</h3>
                    <div className="h-56 relative flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={allocationData}
                                    innerRadius={65}
                                    outerRadius={85}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {allocationData.map((_: any, i: number) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-2xl font-bold text-navy-900 font-mono">100%</span>
                            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Allocated</span>
                        </div>
                    </div>
                    <div className="mt-6 space-y-2.5">
                        {allocationData.map((item: any, i: number) => (
                            <div key={i} className="flex items-center justify-between text-[12px]">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                                    <span className="font-semibold text-gray-700">{item.name}</span>
                                </div>
                                <span className="font-mono font-bold text-navy-900">{item.value.toFixed(1)}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Performance Box */}
                <div className="bg-success/5 border border-success/10 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                        <div className="p-2 bg-success-bg rounded-lg mr-3">
                            <TrendingUpIcon className="w-5 h-5 text-success" />
                        </div>
                        <h3 className="text-[13px] font-bold text-navy-900 uppercase">Return Summary</h3>
                    </div>
                    <div className="space-y-4">
                        {[
                            { label: 'MTD Return', value: '+4.8%' },
                            { label: 'YTD Return', value: `${fund.ytdReturn}%` },
                            { label: '12 Month Trailing', value: `${fund.oneYearReturn}%` },
                            { label: 'Since Inception', value: '142.5%' },
                        ].map((item, i) => (
                            <div key={i} className="flex justify-between items-center group">
                                <span className="text-[13px] text-gray-500 font-medium">{item.label}</span>
                                <span className="text-[13px] font-bold text-success font-mono">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function HoldingsTab({ holdings }: any) {
    const ctrl = useTableControls(holdings, 10, ['ticker', 'name']);
    return (
        <div className="table-datagrid-container">
            <div className="p-6 border-b border-gray-100 bg-white flex justify-between items-center">
                <div>
                    <h3 className="font-bold text-navy-900 text-sm uppercase tracking-wider">Holdings Register</h3>
                    <p className="text-[11px] text-gray-400 font-bold uppercase mt-1">Live valuation and weighting report</p>
                </div>
                <TableToolbar searchValue={ctrl.search} onSearchChange={ctrl.setSearch} onRefresh={() => { }} exportData={holdings} exportFilename="fund_holdings" />
            </div>
            <table className="table-datagrid">
                <thead>
                    <tr>
                        <th>Asset Class</th>
                        <th>Ticker</th>
                        <th>Security Name</th>
                        <th className="text-right">Quantity / Face Value</th>
                        <th className="text-right">Market Price</th>
                        <th className="text-right">Market Value</th>
                        <th className="text-right">Weight (%)</th>
                        <th className="text-right">PnL (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {ctrl.paged.map((h: any) => (
                        <tr key={h.id}>
                            <td><span className="text-[11px] font-bold text-navy-700 bg-navy-50 px-2 py-0.5 rounded">{h.assetClass}</span></td>
                            <td className="font-bold text-navy-900">{h.ticker}</td>
                            <td className="text-gray-600 font-medium">{h.name}</td>
                            <td className="text-right font-mono">{(h.quantity || h.faceValue).toLocaleString()}</td>
                            <td className="text-right font-mono">₦{h.currentPrice.toLocaleString()}</td>
                            <td className="text-right font-mono font-bold">₦{h.marketValue.toLocaleString()}</td>
                            <td className="text-right font-mono text-navy-900">{h.percentOfNav}%</td>
                            <td className="text-right font-mono">
                                <span className={cn(h.unrealisedPnLPct >= 0 ? "text-success" : "text-danger")}>
                                    {h.unrealisedPnLPct >= 0 ? '+' : ''}{h.unrealisedPnLPct}%
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <TablePagination currentPage={ctrl.page} totalItems={ctrl.totalItems} pageSize={ctrl.pageSize} onPageChange={ctrl.setPage} />
        </div>
    );
}

function UnitHoldersTab({ holders, fundId }: { holders: any[], fundId: string }) {
    const ctrl = useTableControls(holders, 10, ['name', 'id']);
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-navy-900 rounded-lg p-6 text-white text-center shadow-lg">
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-2 opacity-50">Total Capital Base</p>
                    <p className="text-2xl font-bold font-mono">₦{holders.reduce((s: number, h: any) => s + h.holdingValue, 0).toLocaleString()}</p>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-100 text-center shadow-sm">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Institutional Share</p>
                    <p className="text-2xl font-bold text-navy-900">72.4%</p>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-100 text-center shadow-sm">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">KYC Compliance</p>
                    <p className="text-2xl font-bold text-success">100%</p>
                </div>
            </div>

            <div className="table-datagrid-container overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-white flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-navy-900 text-sm uppercase tracking-wider">Unit Holder Register</h3>
                        <p className="text-[11px] text-gray-400 font-bold uppercase mt-1">Beneficial ownership and unitholding status</p>
                    </div>
                    <TableToolbar searchValue={ctrl.search} onSearchChange={ctrl.setSearch} onRefresh={() => { }} exportData={holders} exportFilename="unit_holders" />
                </div>
                <table className="table-datagrid">
                    <thead>
                        <tr>
                            <th>Holder Name</th>
                            <th>Type</th>
                            <th>KYC Status</th>
                            <th className="text-right">Units Held</th>
                            <th className="text-right">Balance Value (₦)</th>
                            <th className="text-right">Share (%)</th>
                            <th className="text-right">Last Trans.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ctrl.paged.map((h: any) => (
                            <tr key={h.id}>
                                <td className="font-bold text-navy-900">
                                    <div className="flex items-center">
                                        {h.id} — {h.name}
                                        {h.isLargeHolder && <span className="ml-2 text-[8px] bg-gold-500 text-navy-900 px-1 rounded uppercase font-bold">Strategic</span>}
                                    </div>
                                </td>
                                <td className="text-gray-500 text-[12px] font-semibold">{h.type}</td>
                                <td><StatusBadge status={h.kycStatus} /></td>
                                <td className="text-right font-mono">{h.unitsHeld.toLocaleString()}</td>
                                <td className="text-right font-mono font-bold">₦{h.holdingValue.toLocaleString()}</td>
                                <td className="text-right font-mono font-bold text-navy-900">{h.percentOfFund}%</td>
                                <td className="text-right font-mono text-gray-400 text-[11px]">{h.lastTransactionDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <TablePagination currentPage={ctrl.page} totalItems={ctrl.totalItems} pageSize={ctrl.pageSize} onPageChange={ctrl.setPage} />
            </div>

            {/* Unit History Timeline */}
            <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-sm font-bold text-navy-900 uppercase tracking-widest">Unit History & Capital Events</h3>
                        <p className="text-[11px] text-gray-400 font-bold uppercase mt-1 italic">Approved unit changes and net capital flows</p>
                    </div>
                    <div className="px-3 py-1 bg-navy-50 rounded text-[9px] font-bold text-navy-900 uppercase tracking-tighter shadow-sm border border-navy-100 flex items-center">
                        <AlertIcon className="w-3 h-3 mr-1.5 text-gold-600" />
                        Updated daily at 4:00 PM WAT
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-50">
                                <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date</th>
                                <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Type</th>
                                <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Units Change</th>
                                <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">New Total Units</th>
                                <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Approved By</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {(mockUnitHistory[fundId] || []).map((h, i) => (
                                <tr key={i} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 text-[11px] font-bold text-navy-900 font-mono">{h.date}</td>
                                    <td className="py-4">
                                        <span className={cn(
                                            "text-[9px] font-bold px-2 py-0.5 rounded uppercase",
                                            h.type === 'Subscription' ? "bg-success-bg text-success" : "bg-danger-bg text-danger"
                                        )}>
                                            {h.type}
                                        </span>
                                    </td>
                                    <td className={cn(
                                        "py-4 text-[11px] font-mono font-bold text-right",
                                        h.netChange >= 0 ? "text-success" : "text-danger"
                                    )}>
                                        {h.netChange >= 0 ? '+' : ''}{h.units.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </td>
                                    <td className="py-4 text-[11px] font-mono font-bold text-navy-900 text-right">{h.newTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                    <td className="py-4 text-[10px] font-bold text-gray-500 text-right uppercase tracking-tighter">{h.approvedBy}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function TransactionsTab({ txns }: any) {
    const ctrl = useTableControls(txns, 10);
    return (
        <div className="table-datagrid-container">
            <div className="p-6 border-b border-gray-100 bg-white flex justify-between items-center">
                <h3 className="font-bold text-navy-900 text-sm uppercase tracking-wider">Fund Flows & Activity</h3>
                <TableToolbar searchValue={ctrl.search} onSearchChange={ctrl.setSearch} onRefresh={() => { }} exportData={txns} exportFilename="fund_transactions" />
            </div>
            <table className="table-datagrid">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Transaction ID</th>
                        <th>Unit Holder</th>
                        <th>Type</th>
                        <th className="text-right">Units</th>
                        <th className="text-right">NAV per Unit</th>
                        <th className="text-right">Amount (₦)</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {ctrl.paged.map((t: any) => (
                        <tr key={t.id}>
                            <td className="font-mono text-gray-400 text-[11px]">{t.date}</td>
                            <td className="font-bold text-navy-900 text-[12px]">{t.id}</td>
                            <td className="text-gray-700 font-medium text-[13px]">{t.holderName}</td>
                            <td>
                                <span className={cn(
                                    "px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider",
                                    t.type === 'Subscription' ? "bg-success-bg text-success" :
                                        t.type === 'Redemption' ? "bg-danger-bg text-danger" : "bg-navy-50 text-navy-700"
                                )}>
                                    {t.type}
                                </span>
                            </td>
                            <td className="text-right font-mono">{t.units.toLocaleString()}</td>
                            <td className="text-right font-mono">₦{t.navPerUnit.toFixed(2)}</td>
                            <td className="text-right font-mono font-bold">₦{t.amount.toLocaleString()}</td>
                            <td><StatusBadge status={t.status} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <TablePagination currentPage={ctrl.page} totalItems={ctrl.totalItems} pageSize={ctrl.pageSize} onPageChange={ctrl.setPage} />
        </div>
    );
}

function NavEngineTab({ fund, computations, onViewBreakdown }: any) {
    return (
        <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
            {/* Run Engine Card */}
            <div className="bg-navy-900 rounded-xl p-10 text-white relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center gap-10">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <NairaIcon className="w-64 h-64" />
                </div>
                <div className="flex-1 space-y-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-gold-500 rounded-full animate-pulse" />
                        <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-gold-500">Official Computation Engine</span>
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight">Net Asset Value (NAV) Calculation</h2>
                    <p className="text-lg opacity-70 font-medium max-w-xl">
                        Submit a daily valuation run to calculate the NAV per unit. Our engine follows SEC Nigeria CIS rules with automated asset pricing and liability accruals.
                    </p>
                    <div className="flex space-x-4 pt-4">
                        <button className="px-8 py-4 bg-gold-500 text-navy-900 rounded-lg font-bold text-[14px] hover:bg-gold-400 transition-all flex items-center group">
                            Compute Daily NAV <RefreshIcon className="ml-2 w-5 h-5 group-hover:rotate-180 transition-all duration-700" />
                        </button>
                    </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/10 min-w-[300px] text-center">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-gold-500 mb-4">Latest Computation</p>
                    <p className="text-5xl font-bold font-mono mb-2">₦{fund.nav.toFixed(2)}</p>
                    <p className="text-[12px] opacity-60 font-bold mb-6">Status: PUBLISHED</p>
                    <div className="flex justify-between text-[11px] font-bold opacity-80 pt-4 border-t border-white/10 uppercase">
                        <span>Computed: Babatunde</span>
                        <span className="text-gold-500">Approved: Emeka</span>
                    </div>
                </div>
            </div>

            {/* Computation History */}
            <div className="table-datagrid-container overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-white flex justify-between items-center">
                    <h3 className="font-bold text-navy-900 text-sm uppercase tracking-wider">NAV Computation Log (SEC Compliant)</h3>
                </div>
                <table className="table-datagrid">
                    <thead>
                        <tr>
                            <th>Valuation Date</th>
                            <th>Computation ID</th>
                            <th className="text-right">Total Assets (₦)</th>
                            <th className="text-right">Total Liabilities (₦)</th>
                            <th className="text-right">Net Asset Value (₦)</th>
                            <th className="text-right">NAV per Unit</th>
                            <th className="text-right">Change (%)</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {computations.map((c: any) => (
                            <tr key={c.id}>
                                <td className="font-bold text-navy-900">{c.date}</td>
                                <td className="font-mono text-gray-500 text-[11px]">{c.id}</td>
                                <td className="text-right font-mono">₦{c.totalAssets.toLocaleString()}</td>
                                <td className="text-right font-mono">₦{c.totalLiabilities.toLocaleString()}</td>
                                <td className="text-right font-mono font-bold">₦{c.totalNav.toLocaleString()}</td>
                                <td className="text-right font-mono text-navy-900 font-bold">₦{c.navPerUnit.toFixed(4)}</td>
                                <td className="text-right font-mono">
                                    <span className={cn(c.navChangePct >= 0 ? "text-success" : "text-danger")}>
                                        {c.navChangePct > 0 ? '+' : ''}{c.navChangePct.toFixed(3)}%
                                    </span>
                                </td>
                                <td><StatusBadge status={c.status} /></td>
                                <td>
                                    <button
                                        onClick={() => onViewBreakdown(c)}
                                        className="text-navy-900 font-bold text-[10px] uppercase hover:underline"
                                    >
                                        View Breakdown
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function NavBreakdownModal({ run, onClose }: any) {
    const assetEntries = Object.entries(run.assetBreakdown || {
        "Equity": 24300000000,
        "Fixed Income": 2953500000,
        "T-Bills": 1887200000,
        "Cash": 3259100000,
        "Accrued Income": 65000000
    });

    const liabilityEntries = Object.entries(run.liabilityBreakdown || {
        "Accrued Management Fee": 40125000,
        "Accrued Trustee Fee": 4012500,
        "Other Payables": 16200000,
        "Redemptions Payable": 4462500
    });

    return (
        <div className="fixed inset-0 bg-navy-900/40 backdrop-blur-md z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-navy-900 uppercase tracking-tight">NAV Computation Breakdown</h2>
                        <p className="text-[11px] text-gray-500 font-bold uppercase mt-1">Computation ID: {run.id} • VAL DATE: {run.date}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors font-bold text-lg">&times;</button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Assets Side */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-bold text-navy-900 uppercase tracking-widest border-l-4 border-success pl-3">Total Assets</h3>
                                <span className="font-mono font-bold text-navy-900">₦{run.totalAssets.toLocaleString()}</span>
                            </div>
                            <div className="space-y-3">
                                {assetEntries.map(([key, val]: any, i) => (
                                    <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <span className="text-[12px] font-bold text-gray-600">{key}</span>
                                        <span className="text-[13px] font-mono font-bold text-navy-900">₦{val.toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Liabilities Side */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-bold text-navy-900 uppercase tracking-widest border-l-4 border-danger pl-3">Total Liabilities</h3>
                                <span className="font-mono font-bold text-navy-900">₦{run.totalLiabilities.toLocaleString()}</span>
                            </div>
                            <div className="space-y-3">
                                {liabilityEntries.map(([key, val]: any, i) => (
                                    <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <span className="text-[12px] font-bold text-gray-600">{key}</span>
                                        <span className="text-[13px] font-mono font-bold text-navy-900">₦{val.toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 pt-8 border-t border-gray-100 bg-navy-50/50 p-6 rounded-lg">
                                <div className="mt-8 pt-6 border-t border-gray-100">
                                    <div className="bg-navy-900 rounded-lg p-6 text-white overflow-hidden relative group">
                                        <div className="relative z-10">
                                            <div className="flex justify-between items-center mb-6">
                                                <span className="text-[10px] font-bold text-gold-500 uppercase tracking-[0.2em]">NAV Per Unit Formula</span>
                                                <div className="group/tip relative cursor-help">
                                                    <AlertIcon className="w-3.5 h-3.5 text-gold-500/50" />
                                                    <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-white text-navy-900 text-[10px] font-bold rounded-xl shadow-2xl invisible group-hover/tip:visible transform transition-all duration-200 uppercase tracking-wider leading-relaxed border border-gray-100 z-50">
                                                        Total units outstanding is dynamically updated daily based on approved subscriptions and redemptions.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-[11px] font-bold text-navy-200 uppercase mb-4 tracking-wider leading-relaxed italic opacity-80">
                                                NAV Per Unit = (Total Assets - Total Liabilities) ÷ Units Outstanding
                                            </div>
                                            <div className="space-y-3 font-mono">
                                                <div className="flex justify-between text-[11px] opacity-70">
                                                    <span>(₦{run.totalAssets.toLocaleString()} - ₦{run.totalLiabilities.toLocaleString()})</span>
                                                    <span>= ₦{run.totalNav.toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between items-center pt-3 border-t border-white/10">
                                                    <span className="text-[10px] font-bold uppercase text-gold-400">÷ Units Outstanding</span>
                                                    <span className="text-sm font-bold">{(run.unitsOutstanding || 680512345.67).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                                </div>
                                                <div className="flex justify-between items-center pt-4 border-t border-gold-500/30">
                                                    <span className="text-xs font-bold uppercase text-gold-500">Resulting NAV</span>
                                                    <span className="text-2xl font-bold text-white">₦{run.navPerUnit.toFixed(4)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-gold-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-gold-500/20 transition-all duration-500" />
                                    </div>

                                    <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start">
                                        <AlertIcon className="w-3.5 h-3.5 text-amber-600 mr-2.5 shrink-0 mt-0.5" />
                                        <p className="text-[10px] leading-relaxed text-amber-900 font-bold uppercase tracking-tight">
                                            Subscriptions & redemptions received before 4:00 PM WAT are included in today's calculation. Units update only after approval.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-8 py-6 border-t border-gray-100 bg-gray-50/50 flex justify-end space-x-4">
                    <button className="px-6 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-600 font-bold text-[12px] uppercase shadow-sm">Audit Trail</button>
                    <button onClick={onClose} className="px-6 py-2.5 bg-navy-900 text-white rounded-lg font-bold text-[12px] uppercase shadow-lg">Confirm & Close</button>
                </div>
            </div>
        </div>
    );
}

// --- Implementation for previously empty tabs ---

function PerformanceTab({ perf, navHistory }: any) {
    const annualReturns = [
        { year: "2023", fund: 14.8, bench: 12.4 },
        { year: "2024", fund: 22.5, bench: 18.2 },
        { year: "2025", fund: 31.8, bench: 26.4 },
        { year: "2026 (YTD)", fund: 18.4, bench: 15.7 },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard label="Sharpe Ratio" value="2.45" subValue="Risk-Adjusted Return" trend="+0.12" trendUp={true} icon={<TrendingUpIcon className="w-5 h-5 text-gold-500" />} />
                <MetricCard label="Alpha" value="4.82%" subValue="vs Benchmark Excess" trend="Strong" trendUp={true} icon={<CheckCircleIcon className="w-5 h-5 text-success" />} />
                <MetricCard label="Tracking Error" value="1.15%" subValue="Annualised Volatility" trend="Low" trendUp={true} icon={<ShieldIconLocal className="w-5 h-5 text-navy-400" />} />
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
                <h3 className="text-base font-bold text-navy-900 uppercase mb-8">Calendar Year Performance (%)</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={annualReturns}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af', fontWeight: 600 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af', fontWeight: 600, fontFamily: 'JetBrains Mono' }} />
                            <Tooltip />
                            <Legend verticalAlign="top" align="right" />
                            <Line type="monotone" name="ValuAlliance Fund" dataKey="fund" stroke="#0E4535" strokeWidth={3} dot={{ r: 6, fill: '#0E4535' }} activeDot={{ r: 8 }} />
                            <Line type="monotone" name="Benchmark" dataKey="bench" stroke="#DFA223" strokeWidth={2} strokeDasharray="5 5" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="table-datagrid-container">
                <div className="p-6 border-b border-gray-100 bg-white">
                    <h3 className="font-bold text-navy-900 text-sm uppercase tracking-wider">Performance Attribution</h3>
                </div>
                <table className="table-datagrid">
                    <thead>
                        <tr>
                            <th>Period</th>
                            <th className="text-right">Fund Return (%)</th>
                            <th className="text-right">Benchmark (%)</th>
                            <th className="text-right">Rel. Performance</th>
                            <th>Status Bonus</th>
                        </tr>
                    </thead>
                    <tbody>
                        {['MTD', 'QTD', 'YTD', '1 Year', '3 Year'].map(p => (
                            <tr key={p}>
                                <td className="font-bold text-navy-900">{p}</td>
                                <td className="text-right font-mono text-navy-900">{(Math.random() * 20).toFixed(2)}%</td>
                                <td className="text-right font-mono text-gray-500">{(Math.random() * 15).toFixed(2)}%</td>
                                <td className="text-right font-mono">
                                    <span className="text-success font-bold">+{(Math.random() * 5).toFixed(2)}%</span>
                                </td>
                                <td><StatusBadge status="Outperforming" /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function LiquidityTab({ fund, holdings, transactions }: any) {
    const liquidAssets = holdings.filter((h: any) => ['T-Bill', 'Money Market', 'Cash'].includes(h.assetClass));
    const totalLiquid = liquidAssets.reduce((s: number, h: any) => s + h.marketValue, 0);
    const liquidRatio = (totalLiquid / fund.aum) * 100;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
                    <h3 className="text-[12px] font-bold text-navy-900 uppercase tracking-widest mb-6">Liquidity Profile</h3>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-[13px] font-bold text-gray-600">Liquid Assets Ratio</span>
                                <span className="text-lg font-bold text-navy-900">{liquidRatio.toFixed(1)}%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-success rounded-full" style={{ width: `${liquidRatio}%` }} />
                            </div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase mt-2">Required: Min 5.0% (SEC)</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                            <div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Cash & Equiv.</p>
                                <p className="text-sm font-bold text-navy-900">₦{(totalLiquid / 1e9).toFixed(2)}B</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Average Payout (30D)</p>
                                <p className="text-sm font-bold text-navy-900">₦420.5M</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-navy-900 rounded-xl p-8 text-white relative overflow-hidden shadow-lg">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <ClockIcon className="w-24 h-24" />
                    </div>
                    <h3 className="text-[11px] font-bold text-gold-500 uppercase tracking-widest mb-6">Settlement Readiness</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                            <span className="text-[13px] opacity-70">Redemption Notice Period</span>
                            <span className="text-[13px] font-bold">24 Hours</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                            <span className="text-[13px] opacity-70">Payment Turnaround (T)</span>
                            <span className="text-[13px] font-bold text-gold-500">T + 3 Days</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-[13px] opacity-70">Redemption Gate Level</span>
                            <span className="text-[13px] font-bold">10% of Fund</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="table-datagrid-container">
                <div className="p-6 border-b border-gray-100 bg-white">
                    <h3 className="font-bold text-navy-900 text-sm uppercase tracking-wider">Uninvested Cash Accounts</h3>
                </div>
                <table className="table-datagrid">
                    <thead>
                        <tr>
                            <th>Bank Account</th>
                            <th>Custodian / Bank</th>
                            <th className="text-right">Balance (₦)</th>
                            <th className="text-right">Allocation (%)</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="font-bold text-navy-900">Fund Settlement Account</td>
                            <td className="text-gray-600 font-medium">Citibank Nigeria Ltd</td>
                            <td className="text-right font-mono font-bold">₦1,425,600,000</td>
                            <td className="text-right font-mono">4.4%</td>
                            <td><StatusBadge status="Reconciled" /></td>
                        </tr>
                        <tr>
                            <td className="font-bold text-navy-900">Subscription Account</td>
                            <td className="text-gray-600 font-medium">Stanbic IBTC Bank</td>
                            <td className="text-right font-mono font-bold">₦850,240,000</td>
                            <td className="text-right font-mono">2.6%</td>
                            <td><StatusBadge status="Reconciled" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function FeesTab({ fees, fund }: any) {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Management Fee Rate</p>
                    <p className="text-2xl font-bold text-navy-900">{fund.managementFee}% <span className="text-[10px] font-medium text-gray-400">p.a.</span></p>
                </div>
                <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">MTD Accrued Fee</p>
                    <p className="text-2xl font-bold text-navy-900">₦40.1M</p>
                </div>
                <div className="bg-navy-900 rounded-lg p-6 shadow-lg text-white">
                    <p className="text-[10px] text-gold-500 font-bold uppercase tracking-widest mb-2">Total Paid (YTD)</p>
                    <p className="text-2xl font-bold">₦486.2M</p>
                </div>
            </div>

            <div className="table-datagrid-container">
                <div className="p-6 border-b border-gray-100 bg-white">
                    <h3 className="font-bold text-navy-900 text-sm uppercase tracking-wider">Fee Invoices & Accruals</h3>
                </div>
                <table className="table-datagrid">
                    <thead>
                        <tr>
                            <th>Invoice ID</th>
                            <th>Period</th>
                            <th>Type</th>
                            <th className="text-right">Fund AUM (₦)</th>
                            <th className="text-right">Fee Amount (₦)</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fees.map((f: any) => (
                            <tr key={f.id}>
                                <td className="font-bold text-navy-900">{f.invoiceNo}</td>
                                <td className="text-gray-500 font-semibold">{f.period}</td>
                                <td><span className="text-[10px] font-bold uppercase tracking-tight bg-gray-100 px-2 py-0.5 rounded text-gray-600">{f.feeType}</span></td>
                                <td className="text-right font-mono">₦{f.aum.toLocaleString()}</td>
                                <td className="text-right font-mono font-bold text-navy-900">₦{f.monthlyFee ? f.monthlyFee.toLocaleString() : f.feeAmount.toLocaleString()}</td>
                                <td><StatusBadge status={f.status} /></td>
                                <td><button className="text-navy-900 font-bold hover:underline"><DownloadIcon className="w-4 h-4" /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function ComplianceTab({ events }: any) {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
                    <h3 className="text-[12px] font-bold text-navy-900 uppercase tracking-widest mb-8">Asset Concentration Monitor</h3>
                    <div className="space-y-6">
                        {[
                            { label: 'Single Issuer (Max 10%)', val: 7.2, ticker: 'DANGCEM' },
                            { label: 'Sector Limit - Financials (Max 40%)', val: 28.5, ticker: 'NGX:FIN' },
                            { label: 'Fixed Income Floor (Min 20%)', val: 32.4, ticker: 'SOVEREIGN' },
                        ].map((rule, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-[12px] font-bold text-gray-500">{rule.label}</span>
                                    <span className="font-mono text-xs font-bold text-navy-900">{rule.val}%</span>
                                </div>
                                <div className="h-1.5 bg-gray-100 rounded-full">
                                    <div
                                        className={cn("h-full rounded-full", rule.val > 35 ? "bg-danger" : rule.val > 25 ? "bg-warning" : "bg-success")}
                                        style={{ width: `${rule.val * 2.5}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-success/5 border border-success/10 rounded-xl p-8 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mb-6 shadow-lg shadow-success/20 animate-pulse">
                        <CheckCircleIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-navy-900 uppercase">Audit Verified</h3>
                    <p className="text-[13px] text-gray-500 font-medium max-w-sm mt-3">
                        The fund's holdings and valuations have been cross-checked against independent pricing sources. No critical rule breaches detected in the last 24 hours.
                    </p>
                </div>
            </div>

            <div className="table-datagrid-container">
                <div className="p-6 border-b border-gray-100 bg-white">
                    <h3 className="font-bold text-navy-900 text-sm uppercase tracking-wider">Compliance Event History</h3>
                </div>
                <table className="table-datagrid">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Rule Checked</th>
                            <th className="text-right">Threshold</th>
                            <th className="text-right">Actual</th>
                            <th>Severity</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((e: any) => (
                            <tr key={e.id}>
                                <td className="font-mono text-gray-400 text-[11px]">{e.date}</td>
                                <td className="font-bold text-navy-900 uppercase text-[10px] tracking-tight">{e.type}</td>
                                <td className="text-gray-600 font-medium text-[12px]">{e.rule}</td>
                                <td className="text-right font-mono">{e.limit ? `${e.limit}%` : '--'}</td>
                                <td className="text-right font-mono font-bold">{e.actual ? `${e.actual}%` : '--'}</td>
                                <td><StatusBadge status={e.severity} /></td>
                                <td><StatusBadge status={e.status} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function DocumentsTab({ docs }: { docs: any[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
            {docs.map((doc: any) => (
                <div key={doc.id} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all group overflow-hidden">
                    <div className="flex items-start justify-between mb-6">
                        <div className="p-4 bg-navy-50 rounded-lg group-hover:bg-gold-50 transition-colors">
                            <FileIcon className="w-8 h-8 text-navy-900 group-hover:text-gold-600 transition-colors" />
                        </div>
                        <StatusBadge status={doc.status} />
                    </div>
                    <h3 className="font-bold text-navy-900 text-sm mb-1 leading-tight group-hover:text-gold-600 transition-colors">{doc.name}</h3>
                    <div className="flex items-center space-x-3 mt-3 mb-6">
                        <span className="text-[10px] font-bold uppercase opacity-40">{doc.format}</span>
                        <span className="text-[10px] font-bold uppercase opacity-40">•</span>
                        <span className="text-[10px] font-bold uppercase opacity-40">{doc.fileSize}</span>
                    </div>
                    <div className="pt-6 border-t border-gray-50 flex justify-between items-center mt-auto">
                        <div>
                            <p className="text-[9px] font-bold uppercase text-gray-400">Modified</p>
                            <p className="text-[11px] font-bold text-navy-700">{doc.uploadedDate}</p>
                        </div>
                        <button className="p-2.5 bg-navy-900 text-white rounded-xl shadow-lg hover:bg-gold-500 hover:text-navy-900 transition-all">
                            <DownloadIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            ))}

            {/* Template Add Box */}
            <div className="bg-gray-50/50 rounded-xl border-2 border-dashed border-gray-200 p-6 flex flex-col items-center justify-center text-center group hover:border-navy-200 transition-all cursor-pointer">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                    <PlusIcon className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-[11px] font-bold uppercase text-gray-400 group-hover:text-navy-900 transition-colors">Upload New Document</p>
                <p className="text-[9px] text-gray-400 mt-1">Factsheets, Reports, Mandates</p>
            </div>
        </div>
    );
}

// Missing Icon placeholders
function ShieldIcon(props: any) { return <ShieldIconLocal {...props} />; }
function FileIcon(props: any) { return <FileIconLocal {...props} />; }
const FileIconLocal = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
    </svg>
);
function ClockIcon(props: any) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
}
function ChevronRightIcon(props: any) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="9 18 15 12 9 6" /></svg>;
}
