import React from 'react';
import { AppShell } from '../components/layout/AppShell';
import { mockPerformance } from '../data/mockData';
import { DownloadIcon, cn } from '../components/icons/Icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function Performance() {
    const benchmarkChartData = mockPerformance.map(p => ({
        name: p.portfolioName.replace('ARM Pensions — ', ''),
        'Portfolio MTD': p.returns.mtd.portfolio,
        'Benchmark MTD': p.returns.mtd.benchmark,
        'Portfolio YTD': p.returns.ytd.portfolio,
        'Benchmark YTD': p.returns.ytd.benchmark,
    }));

    return (
        <AppShell>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-navy-900">Performance Measurement</h1>
                    <button className="px-3 py-2 bg-white border border-gray-200 rounded text-gray-600 hover:bg-gray-50 flex items-center text-sm shadow-sm">
                        <DownloadIcon className="w-4 h-4 mr-2" /> Export Report
                    </button>
                </div>

                {/* Performance Table */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                                <tr>
                                    <th className="p-4 font-medium" rowSpan={2}>Portfolio</th>
                                    <th className="p-4 font-medium text-center border-l border-gray-200" colSpan={2}>MTD</th>
                                    <th className="p-4 font-medium text-center border-l border-gray-200" colSpan={2}>QTD</th>
                                    <th className="p-4 font-medium text-center border-l border-gray-200" colSpan={2}>YTD</th>
                                    <th className="p-4 font-medium text-center border-l border-gray-200" colSpan={2}>1 Year</th>
                                    <th className="p-4 font-medium text-center border-l border-gray-200" colSpan={2}>3 Year</th>
                                </tr>
                                <tr>
                                    {['MTD', 'QTD', 'YTD', '1Y', '3Y'].map(p => (
                                        <React.Fragment key={p}>
                                            <th className="p-3 font-medium text-center text-xs border-l border-gray-200">Port.</th>
                                            <th className="p-3 font-medium text-center text-xs">Bench.</th>
                                        </React.Fragment>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {mockPerformance.map(p => (
                                    <tr key={p.portfolioId} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 font-medium text-navy-900">{p.portfolioName}</td>
                                        {Object.values(p.returns).map((ret, i) => (
                                            <React.Fragment key={i}>
                                                <td className="p-3 text-center font-mono font-medium border-l border-gray-100">
                                                    <span className={ret.portfolio >= ret.benchmark ? 'text-success' : 'text-danger'}>
                                                        {ret.portfolio > 0 ? '+' : ''}{ret.portfolio.toFixed(2)}%
                                                    </span>
                                                </td>
                                                <td className="p-3 text-center font-mono text-gray-500">{ret.benchmark > 0 ? '+' : ''}{ret.benchmark.toFixed(2)}%</td>
                                            </React.Fragment>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Benchmark Comparison Chart */}
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                        <h3 className="text-base font-semibold text-navy-900 mb-4">Portfolio vs Benchmark — YTD Returns</h3>
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={benchmarkChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6B7280' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} tickFormatter={v => `${v}%`} />
                                    <Tooltip formatter={(v: number) => `${v.toFixed(2)}%`} />
                                    <Legend />
                                    <Bar dataKey="Portfolio YTD" fill="#0C1E35" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="Benchmark YTD" fill="#C9A84C" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Attribution Breakdown */}
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                        <h3 className="text-base font-semibold text-navy-900 mb-4">Performance Attribution</h3>
                        <div className="space-y-6">
                            {mockPerformance.map(p => (
                                <div key={p.portfolioId} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                                    <h4 className="font-semibold text-navy-900 text-sm mb-3">{p.portfolioName}</h4>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="bg-gray-50 rounded p-3 text-center">
                                            <p className="text-xs text-gray-500 mb-1">Allocation Effect</p>
                                            <p className="font-mono font-bold text-success">+{p.attribution.allocation}%</p>
                                        </div>
                                        <div className="bg-gray-50 rounded p-3 text-center">
                                            <p className="text-xs text-gray-500 mb-1">Selection Effect</p>
                                            <p className="font-mono font-bold text-success">+{p.attribution.selection}%</p>
                                        </div>
                                        <div className="bg-gray-50 rounded p-3 text-center">
                                            <p className="text-xs text-gray-500 mb-1">Interaction</p>
                                            <p className="font-mono font-bold text-navy-900">+{p.attribution.interaction}%</p>
                                        </div>
                                    </div>
                                    <div className="mt-3 flex justify-between text-sm">
                                        <span className="text-gray-500">Total Alpha</span>
                                        <span className="font-mono font-bold text-success">+{(p.attribution.allocation + p.attribution.selection + p.attribution.interaction).toFixed(2)}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}
