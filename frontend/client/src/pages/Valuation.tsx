import React from 'react';
import { AppShell } from '../components/layout/AppShell';
import { StatusBadge } from '../components/ui/StatusBadge';
import { mockFunds, mockSecurities, mockNavHistory } from '../data/mockData';
import { DownloadIcon, CheckCircleIcon, NairaIcon, NGXLogo, FMDQLogo, CBNLogo, cn } from '../components/icons/Icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const FUND_COLORS = ['#0C1E35', '#C9A84C', '#254D7A', '#6B7A94'];

export default function Valuation() {
    // Build combined NAV chart data
    const navChartData = mockNavHistory.F001.map((item, i) => ({
        date: item.date,
        'Growth Fund': item.nav,
        'Fixed Income': mockNavHistory.F002?.[i]?.nav ?? 0,
        'Money Market': mockNavHistory.F003?.[i]?.nav ?? 0,
        'Balanced Fund': mockNavHistory.F004?.[i]?.nav ?? 0,
    }));

    return (
        <AppShell>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-navy-900">Valuation & Pricing Engine</h1>
                        <p className="text-sm text-gray-500 mt-1">Prices as at: 21 February 2026 | Next pricing run: 24 February 2026</p>
                    </div>
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-navy-900 text-white rounded text-sm font-medium hover:bg-navy-800 shadow-sm">Run Pricing</button>
                        <button className="px-4 py-2 bg-gold-500 text-navy-900 rounded text-sm font-medium hover:bg-gold-400 shadow-sm">Approve NAV</button>
                        <button className="px-3 py-2 bg-white border border-gray-200 rounded text-gray-600 hover:bg-gray-50 flex items-center text-sm shadow-sm">
                            <DownloadIcon className="w-4 h-4 mr-2" /> Export
                        </button>
                    </div>
                </div>

                {/* NAV Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {mockFunds.map(fund => (
                        <div key={fund.id} className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-sm font-semibold text-navy-900 leading-tight">{fund.name.replace('ValuAlliance ', '')}</h3>
                                <StatusBadge status="Published" />
                            </div>
                            <div className="flex items-baseline mb-1">
                                <NairaIcon className="w-5 h-5 text-navy-900 mr-1" />
                                <span className="text-2xl font-bold text-navy-900 font-mono">{fund.nav.toFixed(2)}</span>
                            </div>
                            <p className="text-xs text-gray-500 font-mono">NAV Date: {fund.navDate}</p>
                            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-xs">
                                <span className="text-gray-500">AUM</span>
                                <span className="font-mono font-medium text-navy-900">₦{(fund.aum / 1000000000).toFixed(1)}B</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Securities Pricing Table */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50">
                        <h3 className="font-semibold text-navy-900 text-sm">Securities Pricing</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                                <tr>
                                    <th className="p-4 font-medium">Ticker</th>
                                    <th className="p-4 font-medium">Security</th>
                                    <th className="p-4 font-medium">Source</th>
                                    <th className="p-4 font-medium text-right">Price (₦)</th>
                                    <th className="p-4 font-medium text-right">Change %</th>
                                    <th className="p-4 font-medium">Tolerance</th>
                                    <th className="p-4 font-medium">Last Updated</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {mockSecurities.map(s => (
                                    <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 font-bold text-navy-900">{s.ticker}</td>
                                        <td className="p-4 text-gray-700">{s.name}</td>
                                        <td className="p-4">
                                            {s.exchange === 'NGX' && <NGXLogo />}
                                            {s.exchange === 'FMDQ' && <FMDQLogo />}
                                            {s.exchange === 'CBN' && <CBNLogo />}
                                        </td>
                                        <td className="p-4 text-right font-mono font-medium text-navy-900">{s.price.toFixed(2)}</td>
                                        <td className="p-4 text-right font-mono font-medium">
                                            {s.changePct !== undefined ? (
                                                <span className={s.changePct >= 0 ? "text-success" : "text-danger"}>
                                                    {s.changePct > 0 ? '+' : ''}{s.changePct}%
                                                </span>
                                            ) : <span className="text-gray-400">--</span>}
                                        </td>
                                        <td className="p-4">
                                            <span className="bg-success-bg text-success border border-success/20 text-xs font-medium px-2 py-0.5 rounded-full">Within Tolerance</span>
                                        </td>
                                        <td className="p-4 font-mono text-xs text-gray-500">{s.priceDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
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
        </AppShell>
    );
}
