import React, { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { mockPortfolios, mockFunds, mockSecurities } from '../data/mockData';
import { PlusIcon, FilterIcon, NGXLogo, FMDQLogo, CBNLogo, NairaIcon } from '../components/icons/Icons';
import { StatusBadge } from '../components/ui/StatusBadge';
import { cn } from '../components/icons/Icons';

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('Portfolios');
  const tabs = ['Portfolios', 'Funds', 'Securities Master'];

  return (
    <AppShell>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-navy-900">Portfolio Management</h1>
        <div className="flex space-x-3">
          <button className="px-3 py-2 bg-white border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 flex items-center text-sm font-medium shadow-sm transition-all">
            <FilterIcon className="w-4 h-4 mr-2" /> Filter
          </button>
          <button className="px-4 py-2 bg-navy-900 text-white rounded-md hover:bg-navy-800 flex items-center text-sm font-medium shadow-md transition-all">
            <PlusIcon className="w-4 h-4 mr-2" /> New Portfolio
          </button>
        </div>
      </div>

      <div className="flex space-x-6 border-b border-gray-200 mb-6">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "pb-3 text-sm font-semibold transition-colors border-b-2",
              activeTab === tab 
                ? "border-gold-500 text-navy-900" 
                : "border-transparent text-gray-500 hover:text-navy-700"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Portfolios' && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
              <tr>
                <th className="p-4 font-medium">ID</th>
                <th className="p-4 font-medium">Portfolio Name</th>
                <th className="p-4 font-medium">Asset Class</th>
                <th className="p-4 font-medium text-right">AUM (₦)</th>
                <th className="p-4 font-medium text-right">YTD %</th>
                <th className="p-4 font-medium">Manager</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockPortfolios.map(p => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors cursor-pointer group">
                  <td className="p-4 font-mono text-xs font-semibold text-navy-700">{p.id}</td>
                  <td className="p-4 font-medium text-navy-900">{p.name}</td>
                  <td className="p-4 text-gray-600">{p.assetClass}</td>
                  <td className="p-4 text-right font-mono font-medium text-navy-900">{p.aum.toLocaleString()}</td>
                  <td className="p-4 text-right font-mono font-medium">
                    <span className={p.ytdReturn >= 0 ? "text-success" : "text-danger"}>{p.ytdReturn > 0 ? '+' : ''}{p.ytdReturn}%</span>
                  </td>
                  <td className="p-4 text-gray-600">{p.manager}</td>
                  <td className="p-4"><StatusBadge status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'Funds' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockFunds.map(fund => (
            <div key={fund.id} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg text-navy-900 mb-1">{fund.name}</h3>
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded font-medium">{fund.type}</span>
                </div>
                <StatusBadge status={fund.status} />
              </div>
              
              <div className="flex items-baseline mb-6">
                <NairaIcon className="w-6 h-6 text-navy-900 mr-1" />
                <span className="text-3xl font-bold text-navy-900 font-mono tracking-tight">{fund.nav.toFixed(2)}</span>
                <span className="ml-2 text-sm text-gray-500">NAV / Unit</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded p-3">
                  <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-semibold">AUM</p>
                  <p className="font-mono font-bold text-navy-900 text-sm">₦{(fund.aum/1000000000).toFixed(2)}B</p>
                </div>
                <div className="bg-gray-50 rounded p-3">
                  <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-semibold">YTD Return</p>
                  <p className={cn("font-mono font-bold text-sm", fund.ytdReturn >= 0 ? "text-success" : "text-danger")}>
                    {fund.ytdReturn > 0 ? '+' : ''}{fund.ytdReturn}%
                  </p>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-4 flex justify-between text-xs text-gray-500">
                <span>Mgt Fee: {fund.managementFee}%</span>
                <span>Perf Fee: {fund.performanceFee}%</span>
                <span className="font-mono">Inception: {fund.inceptionDate}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'Securities Master' && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
              <tr>
                <th className="p-4 font-medium">Ticker</th>
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Exchange</th>
                <th className="p-4 font-medium">Asset Class</th>
                <th className="p-4 font-medium text-right">Price (₦)</th>
                <th className="p-4 font-medium text-right">Change %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockSecurities.map(s => (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-bold text-navy-900">{s.ticker}</td>
                  <td className="p-4 font-medium text-gray-700">{s.name}</td>
                  <td className="p-4">
                    {s.exchange === 'NGX' && <NGXLogo />}
                    {s.exchange === 'FMDQ' && <FMDQLogo />}
                    {s.exchange === 'CBN' && <CBNLogo />}
                  </td>
                  <td className="p-4 text-gray-600">{s.assetClass}</td>
                  <td className="p-4 text-right font-mono font-medium text-navy-900">{s.price.toFixed(2)}</td>
                  <td className="p-4 text-right font-mono font-medium">
                    {s.changePct !== undefined ? (
                      <span className={s.changePct >= 0 ? "text-success" : "text-danger"}>
                        {s.changePct > 0 ? '+' : ''}{s.changePct}%
                      </span>
                    ) : (
                      <span className="text-gray-400">--</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AppShell>
  );
}
