import React, { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { mockPortfolios, mockFunds, mockSecurities, mockClients } from '../data/mockData';
import { PlusIcon, FilterIcon, NGXLogo, FMDQLogo, CBNLogo, NairaIcon } from '../components/icons/Icons';
import { StatusBadge } from '../components/ui/StatusBadge';
import { cn } from '../components/icons/Icons';

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('Portfolios');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterAssetClass, setFilterAssetClass] = useState('All');
  const tabs = ['Portfolios', 'Funds', 'Securities Master'];

  const assetClasses = ['All', ...new Set(mockPortfolios.map(p => p.assetClass))];
  const statuses = ['All', 'Active', 'Inactive'];
  const filteredPortfolios = mockPortfolios.filter(p =>
    (filterStatus === 'All' || p.status === filterStatus) &&
    (filterAssetClass === 'All' || p.assetClass === filterAssetClass)
  );

  const [secFilter, setSecFilter] = useState('All');
  const secAssetClasses = ['All', ...new Set(mockSecurities.map(s => s.assetClass))];
  const filteredSecurities = secFilter === 'All' ? mockSecurities : mockSecurities.filter(s => s.assetClass === secFilter);

  return (
    <AppShell>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-navy-900">Portfolio Management</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-navy-900 text-white rounded-md hover:bg-navy-800 flex items-center text-sm font-medium shadow-md transition-all" onClick={() => setIsModalOpen(true)}>
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
        <>
          <div className="flex space-x-2 mb-4">
            <div className="flex items-center space-x-1">
              <span className="text-xs text-gray-500 mr-1">Status:</span>
              {statuses.map(s => (
                <button key={s} onClick={() => setFilterStatus(s)} className={cn("px-2 py-1 text-xs font-medium rounded transition-colors", filterStatus === s ? "bg-navy-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200")}>{s}</button>
              ))}
            </div>
            <div className="flex items-center space-x-1 border-l pl-3 border-gray-200">
              <span className="text-xs text-gray-500 mr-1">Asset Class:</span>
              {assetClasses.map(a => (
                <button key={a} onClick={() => setFilterAssetClass(a)} className={cn("px-2 py-1 text-xs font-medium rounded transition-colors", filterAssetClass === a ? "bg-navy-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200")}>{a}</button>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                <tr>
                  <th className="p-4 font-medium w-12">S/N</th>
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
                {filteredPortfolios.map((p, idx) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors cursor-pointer group">
                    <td className="p-4 text-gray-400 text-xs font-mono">{idx + 1}</td>
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
        </>
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
                  <p className="font-mono font-bold text-navy-900 text-sm">₦{(fund.aum / 1000000000).toFixed(2)}B</p>
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
        <>
          <div className="flex space-x-1 mb-4">
            {secAssetClasses.map(a => (
              <button key={a} onClick={() => setSecFilter(a)} className={cn("px-3 py-1 text-xs font-medium rounded transition-colors", secFilter === a ? "bg-navy-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200")}>{a}</button>
            ))}
          </div>
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                <tr>
                  <th className="p-4 font-medium w-12">S/N</th>
                  <th className="p-4 font-medium">Ticker</th>
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Exchange</th>
                  <th className="p-4 font-medium">Asset Class</th>
                  <th className="p-4 font-medium text-right">Price (₦)</th>
                  <th className="p-4 font-medium text-right">Change %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredSecurities.map((s, idx) => (
                  <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-gray-400 text-xs font-mono">{idx + 1}</td>
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
        </>
      )}

      {/* Add Portfolio Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-navy-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <h3 className="text-lg font-bold text-navy-900">New Portfolio</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 font-bold">&times;</button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio Name</label>
                  <input type="text" className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none" placeholder="e.g. Growth Portfolio — Client Name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                  <select className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none">
                    <option>Select Client...</option>
                    {mockClients.map(c => <option key={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Asset Class</label>
                  <select className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none">
                    <option>Select Asset Class...</option>
                    <option>Multi-Asset</option>
                    <option>Fixed Income</option>
                    <option>Money Market</option>
                    <option>Equities</option>
                    <option>Balanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio Manager</label>
                  <select className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none">
                    <option>Select Manager...</option>
                    <option>Adaeze Okonkwo</option>
                    <option>Emeka Nwachukwu</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Initial AUM (₦)</label>
                  <input type="number" className="w-full border border-gray-300 rounded p-2 text-sm font-mono focus:ring-gold-500 focus:border-gold-500 outline-none" placeholder="0" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Benchmark</label>
                  <select className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none">
                    <option>Select Benchmark...</option>
                    <option>NGX All-Share Index</option>
                    <option>FMDQ Bond Index</option>
                    <option>91-Day T-Bill Rate</option>
                    <option>Custom Composite</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mandate / Notes</label>
                  <textarea className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none" rows={3} placeholder="Investment mandate and restrictions..." />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Upload Mandate Document</label>
                  <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center hover:border-gold-500 transition-colors cursor-pointer">
                    <p className="text-sm text-gray-500">Drag & drop or <span className="text-gold-600 font-medium">browse</span> to upload</p>
                    <p className="text-xs text-gray-400 mt-1">PDF, DOC up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded text-gray-700 text-sm font-medium hover:bg-gray-100">Cancel</button>
              <button onClick={() => { setIsModalOpen(false); alert('Portfolio submitted for approval!'); }} className="px-4 py-2 bg-navy-900 text-white rounded text-sm font-medium shadow hover:bg-navy-800">Submit for Approval</button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
