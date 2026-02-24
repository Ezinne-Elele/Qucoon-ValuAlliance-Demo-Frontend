import React from 'react';
import { AppShell } from '../components/layout/AppShell';
import { MetricCard } from '../components/ui/MetricCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import { formatNaira, formatPercent } from '../lib/format';
import { mockDashboardMetrics, mockAumTrend, mockFunds, mockTrades } from '../data/mockData';
import { PortfolioIcon, UsersIcon, NairaIcon, FundAccountingIcon, AlertIcon, ArrowUpIcon, cn } from '../components/icons/Icons';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TableToolbar } from '../components/ui/TableControls';

export default function Dashboard() {
  const PIE_COLORS = ['#0E4535', '#DFA223', '#22795F', '#5BBD9A'];

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            label="Assets Under Management"
            value={formatNaira(mockDashboardMetrics.totalAum)}
            isCurrency
            trend={`+₦3.30B MTD (${formatPercent(mockDashboardMetrics.aumGrowthPct)})`}
            icon={<PortfolioIcon />}
          />
          <MetricCard
            label="Active Clients"
            value={mockDashboardMetrics.totalClients.toString()}
            trend="+2 this quarter"
            icon={<UsersIcon />}
          />
          <MetricCard
            label="Year-to-Date Fee Revenue"
            value={formatNaira(mockDashboardMetrics.ytdRevenue)}
            isCurrency
            trend="+18.4% vs prior year"
            icon={<NairaIcon />}
            iconBg="bg-gold-100 text-gold-600"
          />
          <MetricCard
            label="Active Portfolios"
            value={mockDashboardMetrics.activePortfolios.toString()}
            trend="Across 4 Funds"
            trendPositive={true}
            icon={<FundAccountingIcon />}
          />
        </div>

        {/* Alerts Bar */}
        <div className="bg-warning-bg border-l-4 border-warning p-4 rounded shadow-sm flex items-center space-x-6 text-sm">
          <div className="flex items-center text-warning font-medium">
            <AlertIcon className="w-4 h-4 mr-2" />
            <a href="/settlement" className="hover:underline">1 Failed Settlement — TRD-2026-0242 (₦256M)</a>
          </div>
          <div className="flex items-center text-warning font-medium border-l border-warning/30 pl-6">
            <AlertIcon className="w-4 h-4 mr-2" />
            <a href="/reconciliation" className="hover:underline">3 Open Reconciliation Breaks</a>
          </div>
          <div className="flex items-center text-warning font-medium border-l border-warning/30 pl-6">
            <AlertIcon className="w-4 h-4 mr-2" />
            <a href="/regulatory-returns" className="hover:underline">SEC Q4 2025 Return due in 5 days</a>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-96">
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm p-5 flex flex-col">
            <h3 className="text-base font-semibold text-navy-900 mb-4">AUM Trend — Aug 2025 to Feb 2026</h3>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockAumTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAum" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22795F" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#22795F" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280', fontFamily: 'JetBrains Mono' }} />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ fontFamily: 'JetBrains Mono' }}
                  />
                  <Area type="monotone" dataKey="aum" name="AUM (₦B)" stroke="#22795F" strokeWidth={3} fillOpacity={1} fill="url(#colorAum)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 flex flex-col">
            <h3 className="text-base font-semibold text-navy-900 mb-4">AUM by Fund</h3>
            <div className="flex-1 relative min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockFunds}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={2}
                    dataKey="aum"
                    stroke="none"
                  >
                    {mockFunds.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatNaira(value as number)} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-sm text-gray-500">Total AUM</span>
                <span className="text-2xl font-bold text-navy-900 font-mono">85.4B</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              {mockFunds.map((fund, i) => (
                <div key={fund.id} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: PIE_COLORS[i] }}></div>
                  <span className="text-gray-600 truncate">{fund.name.replace('ValuAlliance ', '')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3 Panels Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel 1 */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-semibold text-navy-900 text-sm">Fund Performance — YTD</h3>
            </div>
            <div className="p-0 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white text-left text-gray-500 border-b border-gray-100">
                    <th className="p-3 font-medium w-10">S/N</th>
                    <th className="p-3 font-medium">Fund</th>
                    <th className="p-3 font-medium text-right">NAV (₦)</th>
                    <th className="p-3 font-medium text-right">YTD</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {mockFunds.map((fund, idx) => (
                    <tr key={fund.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3 text-gray-400 text-xs font-mono">{idx + 1}</td>
                      <td className="p-3 font-medium text-navy-900 truncate max-w-[150px]">{fund.name.replace('ValuAlliance ', '')}</td>
                      <td className="p-3 text-right font-mono">{fund.nav.toFixed(2)}</td>
                      <td className="p-3 text-right font-mono font-medium">
                        <span className={fund.ytdReturn >= 0 ? "text-success" : "text-danger"}>
                          {fund.ytdReturn > 0 ? '+' : ''}{fund.ytdReturn}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Panel 2 */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden lg:col-span-2">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-navy-900 text-sm">Recent Trade Activity</h3>
                <a href="/trades" className="text-xs text-gold-600 hover:underline font-medium whitespace-nowrap">View All &rarr;</a>
              </div>
              <TableToolbar searchValue="" onSearchChange={() => { }} onRefresh={() => { }} exportData={mockTrades.slice(0, 5)} exportFilename="recent_trades" />
            </div>
            <div className="p-0 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white text-left text-gray-500 border-b border-gray-100">
                    <th className="p-3 font-medium w-10">S/N</th>
                    <th className="p-3 font-medium">Trade ID</th>
                    <th className="p-3 font-medium">Security</th>
                    <th className="p-3 font-medium">Side</th>
                    <th className="p-3 font-medium text-right">Value (₦)</th>
                    <th className="p-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {mockTrades.slice(0, 5).map((trade, idx) => (
                    <tr key={trade.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3 text-gray-400 text-xs font-mono">{idx + 1}</td>
                      <td className="p-3 font-mono text-xs text-navy-700">{trade.id}</td>
                      <td className="p-3 font-medium">{trade.ticker}</td>
                      <td className="p-3">
                        <span className={cn("text-xs font-bold px-2 py-0.5 rounded", trade.side === 'Buy' ? "bg-navy-100 text-navy-700" : "bg-red-100 text-danger")}>
                          {trade.side}
                        </span>
                      </td>
                      <td className="p-3 text-right font-mono">{trade.netValue.toLocaleString()}</td>
                      <td className="p-3"><StatusBadge status={trade.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
