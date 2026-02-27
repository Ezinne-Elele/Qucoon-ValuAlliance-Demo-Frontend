import React, { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { StatusBadge } from '../components/ui/StatusBadge';
import { mockFunds, mockSecurities, mockNavHistory } from '../data/mockData';
import { DownloadIcon, CheckCircleIcon, NairaIcon, NGXLogo, FMDQLogo, CBNLogo, AlertIcon, cn } from '../components/icons/Icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TableToolbar, TablePagination, useTableControls } from '../components/ui/TableControls';
import { useLocation } from 'wouter';

const FUND_COLORS = ['#0E4535', '#DFA223', '#22795F', '#5BBD9A'];

export default function Valuation() {
    const [, navigate] = useLocation();
    const [showRunPricing, setShowRunPricing] = useState(false);
    const [showApproveNav, setShowApproveNav] = useState(false);
    const [showExport, setShowExport] = useState(false);
    const [pricingSource, setPricingSource] = useState('All Sources');
    const [pricingDate, setPricingDate] = useState('2026-02-24');
    const [selectedFundsForNav, setSelectedFundsForNav] = useState<string[]>(mockFunds.map(f => f.id));
    const [exportFormat, setExportFormat] = useState('Excel');
    const [exportScope, setExportScope] = useState('All Funds');

    const navChartData = mockNavHistory.F001.map((item, i) => ({
        date: item.date,
        'Growth Fund': item.nav,
        'Fixed Income': mockNavHistory.F002?.[i]?.nav ?? 0,
        'Money Market': mockNavHistory.F003?.[i]?.nav ?? 0,
        'Balanced Fund': mockNavHistory.F004?.[i]?.nav ?? 0,
    }));

    const toggleNavFund = (id: string) => {
        setSelectedFundsForNav(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
    };

    const { search, setSearch, page, setPage, paged, totalItems, pageSize, density, setDensity } = useTableControls(mockSecurities, 10);
    const secExport = mockSecurities.map(s => ({
        Ticker: s.ticker, Security: s.name, Source: s.exchange,
        'Price (₦)': s.price, 'Change %': s.changePct, 'Last Updated': s.priceDate,
    }));

    return (
        <AppShell>
            <div className="space-y-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-navy-900 tracking-tight">Valuation & Pricing Engine</h1>
                        <p className="text-[13px] text-gray-500 font-medium">Monitoring real-market asset pricing and Fund NAV calculations.</p>
                    </div>
                    <div className="flex space-x-3">
                        <button onClick={() => setShowRunPricing(true)} className="px-5 py-2.5 bg-navy-900 text-white rounded-lg text-[13px] font-bold hover:bg-navy-800 shadow-lg shadow-navy-900/10 transition-all">Run Pricing Run</button>
                        <button onClick={() => setShowApproveNav(true)} className="px-5 py-2.5 bg-white border border-gray-100 text-navy-900 rounded-lg text-[13px] font-bold hover:bg-gray-50 shadow-sm transition-all">Approve NAV</button>
                        <button onClick={() => setShowExport(true)} className="px-5 py-2.5 bg-white border border-gray-100 rounded-lg text-gray-500 hover:bg-gray-50 flex items-center text-[13px] font-bold shadow-sm transition-all">
                            <DownloadIcon className="w-4 h-4 mr-2" /> Export
                        </button>
                    </div>
                </div>

                {/* NAV Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {mockFunds.map(fund => (
                        <div
                            key={fund.id}
                            onClick={() => navigate(`/fund/${fund.id}`)}
                            className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all hover:translate-y-[-2px] group cursor-pointer active:scale-[0.98]"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-tight group-hover:text-navy-900 transition-colors">{fund.name.replace('ValuAlliance ', '')}</h3>
                                <StatusBadge status="Published" />
                            </div>
                            <div className="flex items-baseline mb-2">
                                <span className="text-3xl font-bold text-navy-900 font-mono tracking-tighter">₦{fund.nav.toFixed(2)}</span>
                            </div>
                            <p className="text-[10px] text-gray-400 font-mono font-medium">VALUATION AS AT: {fund.navDate}</p>
                            <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between text-[11px] font-bold">
                                <span className="text-gray-400 uppercase tracking-wider">AUM</span>
                                <span className="text-navy-900">₦{(fund.aum / 1e9).toFixed(1)}B</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Securities Pricing Table */}
                <div className="table-datagrid-container">
                    <div className="p-5 border-b border-gray-100 bg-white/50 flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-navy-900 text-sm uppercase tracking-wider">Securities Market Pricing</h3>
                            <p className="text-[11px] text-gray-400 font-medium">Live data feeds from NGX, FMDQ, and CBN</p>
                        </div>
                        <TableToolbar
                            searchValue={search}
                            onSearchChange={setSearch}
                            onRefresh={() => { }}
                            exportData={secExport}
                            exportFilename="securities_pricing"
                            density={density}
                            onDensityChange={setDensity}
                        />
                    </div>
                    <div className="overflow-x-auto">
                        <table className={cn("table-datagrid", `density-${density}`)}>
                            <thead>
                                <tr>
                                    <th className="w-12 text-center text-[10px] text-gray-300">#</th>
                                    <th className="w-28">Ticker</th>
                                    <th>Security</th>
                                    <th className="w-32">Source</th>
                                    <th className="text-right w-32">Price</th>
                                    <th className="text-right w-28">Change</th>
                                    <th className="w-40">Tolerance</th>
                                    <th className="w-32">Updated</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paged.map((s, idx) => (
                                    <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="text-center">{(page - 1) * pageSize + idx + 1}</td>
                                        <td>{s.ticker}</td>
                                        <td>{s.name}</td>
                                        <td>{s.exchange}</td>
                                        <td className="text-right font-mono">{s.price.toFixed(2)}</td>
                                        <td className="text-right font-mono">
                                            {s.changePct !== undefined ? (
                                                <span className={s.changePct >= 0 ? "text-success" : "text-danger"}>
                                                    {s.changePct > 0 ? '+' : ''}{s.changePct}%
                                                </span>
                                            ) : <span>--</span>}
                                        </td>
                                        <td>
                                            <span className="bg-success/10 text-success text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border border-success/20">Within tolerance</span>
                                        </td>
                                        <td>{s.priceDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <TablePagination currentPage={page} totalItems={totalItems} pageSize={pageSize} onPageChange={setPage} />
                </div>

                {/* NAV History Chart */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                    <h3 className="text-base font-semibold text-navy-900 mb-4">Fund NAV History — Last 6 Months</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={navChartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280', fontFamily: 'JetBrains Mono' }} />
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Legend />
                                <Line type="monotone" dataKey="Growth Fund" stroke={FUND_COLORS[0]} strokeWidth={2} dot={{ r: 3 }} />
                                <Line type="monotone" dataKey="Fixed Income" stroke={FUND_COLORS[1]} strokeWidth={2} dot={{ r: 3 }} />
                                <Line type="monotone" dataKey="Money Market" stroke={FUND_COLORS[2]} strokeWidth={2} dot={{ r: 3 }} />
                                <Line type="monotone" dataKey="Balanced Fund" stroke={FUND_COLORS[3]} strokeWidth={2} dot={{ r: 3 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Run Pricing Modal */}
            {showRunPricing && (
                <div className="fixed inset-0 bg-navy-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-navy-900">Run Pricing Engine</h3>
                            <button onClick={() => setShowRunPricing(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
                        </div>
                        <div className="p-6 space-y-5">
                            <div className="bg-warning-bg border border-warning/20 rounded p-3 flex items-start">
                                <AlertIcon className="w-4 h-4 text-warning mr-2 shrink-0 mt-0.5" />
                                <p className="text-xs text-warning-700 font-medium">This will refresh all security prices and recalculate NAV for all active funds.</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pricing Date</label>
                                <input type="date" value={pricingDate} onChange={e => setPricingDate(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none font-mono" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price Source</label>
                                <select value={pricingSource} onChange={e => setPricingSource(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none">
                                    <option>All Sources</option>
                                    <option>NGX Only</option>
                                    <option>FMDQ Only</option>
                                    <option>CBN Only</option>
                                    <option>Manual Override</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Funds to Price</label>
                                <div className="space-y-2">
                                    {mockFunds.map(fund => (
                                        <label key={fund.id} className="flex items-center text-sm text-gray-700">
                                            <input type="checkbox" checked={true} readOnly className="h-4 w-4 text-gold-500 focus:ring-gold-500 border-gray-300 rounded mr-3" />
                                            {fund.name.replace('ValuAlliance ', '')} <span className="text-gray-400 ml-auto font-mono text-xs">{fund.type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tolerance Threshold (%)</label>
                                <input type="number" defaultValue={5} step={0.5} min={0.5} max={20} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none font-mono" />
                                <p className="text-xs text-gray-400 mt-1">Securities with price changes exceeding this threshold will be flagged for review.</p>
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl flex justify-end gap-3">
                            <button onClick={() => setShowRunPricing(false)} className="px-4 py-2 border border-gray-300 rounded text-gray-700 text-sm font-medium hover:bg-gray-100">Cancel</button>
                            <button onClick={() => { setShowRunPricing(false); alert('Pricing engine run initiated for ' + pricingDate + '. Processing ' + mockSecurities.length + ' securities...'); }} className="px-4 py-2 bg-navy-900 text-white rounded text-sm font-medium shadow hover:bg-navy-800">Run Pricing</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Approve NAV Modal */}
            {showApproveNav && (
                <div className="fixed inset-0 bg-navy-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-navy-900">Approve & Publish NAV</h3>
                            <button onClick={() => setShowApproveNav(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
                        </div>
                        <div className="p-6 space-y-5">
                            <p className="text-sm text-gray-600">Select funds to approve and publish NAV values. This action will be logged in the audit trail and requires checker authorization.</p>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Select Funds for NAV Approval</label>
                                <div className="space-y-3">
                                    {mockFunds.map(fund => (
                                        <label key={fund.id} className={cn("flex items-center justify-between p-3 border rounded cursor-pointer transition-colors", selectedFundsForNav.includes(fund.id) ? "border-gold-500 bg-gold-50" : "border-gray-200 hover:border-gray-300")}>
                                            <div className="flex items-center">
                                                <input type="checkbox" checked={selectedFundsForNav.includes(fund.id)} onChange={() => toggleNavFund(fund.id)} className="h-4 w-4 text-gold-500 focus:ring-gold-500 border-gray-300 rounded mr-3" />
                                                <div>
                                                    <p className="text-sm font-medium text-navy-900">{fund.name.replace('ValuAlliance ', '')}</p>
                                                    <p className="text-xs text-gray-500">NAV Date: {fund.navDate}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-mono font-bold text-navy-900">₦{fund.nav.toFixed(2)}</p>
                                                <p className="text-xs font-mono text-gray-500">AUM: ₦{(fund.aum / 1e9).toFixed(1)}B</p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Approval Comment</label>
                                <textarea className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none" rows={2} placeholder="Optional approval notes..." />
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl flex justify-between items-center">
                            <span className="text-xs text-gray-500">{selectedFundsForNav.length} fund(s) selected</span>
                            <div className="flex gap-3">
                                <button onClick={() => setShowApproveNav(false)} className="px-4 py-2 border border-gray-300 rounded text-gray-700 text-sm font-medium hover:bg-gray-100">Cancel</button>
                                <button onClick={() => { setShowApproveNav(false); alert(selectedFundsForNav.length + ' fund NAV(s) approved and submitted for publication.'); }} className="px-4 py-2 bg-gold-500 text-navy-900 rounded text-sm font-medium shadow hover:bg-gold-400" disabled={selectedFundsForNav.length === 0}>Approve & Publish</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Export Modal */}
            {showExport && (
                <div className="fixed inset-0 bg-navy-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-navy-900">Export Valuation Data</h3>
                            <button onClick={() => setShowExport(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
                        </div>
                        <div className="p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Export Format</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['Excel', 'CSV', 'PDF'].map(fmt => (
                                        <button key={fmt} onClick={() => setExportFormat(fmt)} className={cn("py-2 px-3 rounded text-sm font-medium border transition-colors", exportFormat === fmt ? "bg-navy-900 text-white border-navy-900" : "border-gray-200 text-gray-600 hover:border-gray-300")}>{fmt}</button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Scope</label>
                                <select value={exportScope} onChange={e => setExportScope(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none">
                                    <option>All Funds</option>
                                    <option>Securities Pricing Only</option>
                                    <option>NAV Summary Only</option>
                                    <option>Full Valuation Report</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Valuation Date</label>
                                <input type="date" defaultValue="2026-02-21" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none font-mono" />
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl flex justify-end gap-3">
                            <button onClick={() => setShowExport(false)} className="px-4 py-2 border border-gray-300 rounded text-gray-700 text-sm font-medium hover:bg-gray-100">Cancel</button>
                            <button onClick={() => { setShowExport(false); alert('Exporting ' + exportScope + ' as ' + exportFormat + '...'); }} className="px-4 py-2 bg-navy-900 text-white rounded text-sm font-medium shadow hover:bg-navy-800">
                                <DownloadIcon className="w-4 h-4 mr-2 inline" /> Export
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppShell>
    );
}
