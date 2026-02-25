import React from 'react';
import { AppShell } from '../components/layout/AppShell';
import { StatusBadge } from '../components/ui/StatusBadge';
import { formatNaira } from '../lib/format';
import { TableToolbar, useTableControls } from '../components/ui/TableControls';
import { ModuleHeader } from '../components/layout/ModuleHeader';
import { mockAumTrend, mockFunds, mockTrades } from '../data/mockData';
import {
  TrendingUpIcon, TrendingDownIcon, NairaIcon, RefreshIcon,
  MoreVerticalIcon, ChevronRightIcon, PieChartIcon, cn
} from '../components/icons/Icons';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

export default function Dashboard() {
  const PIE_COLORS = ['#0E4535', '#DFA223', '#22795F', '#5BBD9A'];
  const { search, setSearch, paged, density, setDensity } = useTableControls(mockTrades, 5, ['ticker', 'clientName']);

  // ... (metrics and allocationData same)

  return (
    <AppShell>
      <ModuleHeader
        title="Executive Dashboard"
        description="Core analytics overview for all mandates and funds."
        metrics={[
          { label: 'Total AUM', value: '₦40.2T', trend: '+4.2%', isPositive: true },
          { label: 'Total Clients', value: '1,248', trend: '+12', isPositive: true },
          { label: 'Avg Fund NAV', value: '184.20', trend: '+2.1%', isPositive: true },
          { label: 'Pending Auth', value: '8', trend: 'Needs Action', isPositive: false },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* AUM Growth Chart */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-[12px] font-bold text-navy-900 tracking-widest uppercase">AUM Growth Momentum</h3>
                <p className="text-[11px] text-gray-400 font-medium mt-1">Aggregated asset valuation across all mandates</p>
              </div>
              <div className="flex items-center bg-success/5 px-3 py-1.5 rounded-lg border border-success/10">
                <TrendingUpIcon className="text-success w-3.5 h-3.5 mr-2" />
                <span className="text-xs font-bold text-success">+₦2.4T this year</span>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockAumTrend}>
                  <defs>
                    <linearGradient id="colorAum" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22795F" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#22795F" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f3f5" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9AA1AE', fontWeight: 600 }} dy={10} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="aum" stroke="#22795F" strokeWidth={3} fillOpacity={1} fill="url(#colorAum)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card rounded-2xl p-6 shadow-lg border-white/40">
              <h3 className="text-[12px] font-bold text-navy-900 tracking-widest uppercase mb-6">Asset Allocation</h3>
              <div className="h-48 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Equities', value: 45 },
                        { name: 'Fixed Income', value: 35 },
                        { name: 'Money Market', value: 15 },
                        { name: 'Cash', value: 5 },
                      ]}
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {PIE_COLORS.map((color, index) => <Cell key={index} fill={color} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute flex flex-col items-center">
                  <span className="text-xl font-bold text-navy-900">₦40T</span>
                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Total</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <h3 className="text-[12px] font-bold text-navy-900 tracking-widest uppercase mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">Active Fund NAV</span>
                    <span className="text-sm font-mono text-navy-900">125.48</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">Daily Turnover</span>
                    <span className="text-sm font-mono text-navy-900">₦1.2B</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">System Status</span>
                    <span className="text-[9px] font-bold bg-success/10 text-success px-2 py-0.5 rounded-full border border-success/20">OPERATIONAL</span>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 py-2.5 bg-gray-50 text-gray-500 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors">
                View Reports
              </button>
            </div>
          </div>

          {/* Recent Trades Table */}
          <div className="table-datagrid-container">
            <div className="p-5 border-b border-gray-100 bg-white/50 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-navy-900 text-sm">Recent Trade Execution</h3>
                <p className="text-[11px] text-gray-400 font-medium">Historical audit of recent market activities</p>
              </div>
              <TableToolbar
                searchValue={search}
                onSearchChange={setSearch}
                onRefresh={() => { }}
                exportData={mockTrades}
                exportFilename="recent_trades"
                density={density}
                onDensityChange={setDensity}
              />
            </div>
            <div className="overflow-x-auto">
              <table className={cn("table-datagrid", `density-${density}`)}>
                <thead>
                  <tr>
                    <th className="w-24">Ticker</th>
                    <th>Client</th>
                    <th className="w-28">Side</th>
                    <th className="text-right w-24">Quantity</th>
                    <th className="text-right w-32">Price</th>
                    <th className="w-28">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.map((trade, i) => (
                    <tr key={i} className="hover:bg-gray-50/50">
                      <td>{trade.ticker}</td>
                      <td>{trade.clientName || trade.clientId}</td>
                      <td>
                        <span className={cn(
                          "px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider",
                          trade.side === 'Buy' ? "bg-success-bg text-success" : "bg-danger-bg text-danger"
                        )}>
                          {trade.side}
                        </span>
                      </td>
                      <td className="text-right font-mono">{trade.quantity.toLocaleString()}</td>
                      <td className="text-right font-mono">{formatNaira(trade.price)}</td>
                      <td><StatusBadge status={trade.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar Analytics */}
        <div className="space-y-8">
          {/* Market Overview */}
          <div className="glass-card rounded-2xl p-6 shadow-lg border-white/40">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[12px] font-bold text-navy-900 tracking-widest uppercase">Market Pulse</h3>
              <MoreVerticalIcon className="text-gray-400 w-4 h-4" />
            </div>
            <div className="space-y-5">
              {[
                { name: 'NGX All-Share', price: '102,401.50', change: '+0.45%', isUp: true },
                { name: 'USD/NGN Spot', price: '1,504.20', change: '-1.20%', isUp: false },
                { name: 'Brent Crude', price: '$82.45', change: '+2.10%', isUp: true },
                { name: '10Y FGN Bond', price: '18.45%', change: '+0.05%', isUp: true },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center hover:bg-white/40 p-2 -mx-2 rounded-lg transition-colors cursor-pointer group">
                  <div>
                    <p className="text-xs font-bold text-navy-900 group-hover:text-gold-600 transition-colors uppercase tracking-tight">{item.name}</p>
                    <p className="text-[9px] text-gray-400 font-bold uppercase">Delayed 15m</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-mono font-bold text-navy-900">{item.price}</p>
                    <div className={cn(
                      "flex items-center justify-end text-[10px] font-bold",
                      item.isUp ? "text-success" : "text-danger"
                    )}>
                      {item.isUp ? <TrendingUpIcon className="w-2.5 h-2.5 mr-0.5" /> : <TrendingDownIcon className="w-2.5 h-2.5 mr-0.5" />}
                      {item.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 bg-navy-900 text-white text-[11px] font-bold uppercase tracking-widest rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center">
              Market Explorer <ChevronRightIcon className="w-3.5 h-3.5 ml-2" />
            </button>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-navy-900 rounded-2xl p-6 shadow-xl text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-sm font-bold mb-2">Internal Portfolio Review</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">The quarterly review for equity mandates is due in 3 days. Ensure all compliance logs are updated.</p>
              <button className="px-4 py-2 bg-gold-500 text-navy-900 rounded-lg text-xs font-bold hover:bg-gold-400 transition-colors">
                Start Review
              </button>
            </div>
            {/* Abstract Background SVG Pattern */}
            <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-10">
              <NairaIcon className="w-32 h-32 transform rotate-12" />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
