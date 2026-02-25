import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { AppShell } from '../components/layout/AppShell';
import { mockPortfolios, mockFunds, mockSecurities, mockClients, mockPositions } from '../data/mockData';
import { PlusIcon, NGXLogo, FMDQLogo, CBNLogo, NairaIcon, EyeIcon, ArrowLeftIcon, PortfolioIcon, TrendingUpIcon, PieChartIcon, ChevronRightIcon } from '../components/icons/Icons';
import { StatusBadge } from '../components/ui/StatusBadge';
import { cn } from '../components/icons/Icons';
import { TableToolbar, TablePagination, useTableControls } from '../components/ui/TableControls';
import { ModuleHeader } from '../components/layout/ModuleHeader';

export default function Portfolio() {
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState('Portfolios');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterAssetClass, setFilterAssetClass] = useState('All');
  const tabs = ['Portfolios', 'Funds', 'Securities Master'];

  const assetClasses = ['All', ...Array.from(new Set(mockPortfolios.map(p => p.assetClass)))];
  const statuses = ['All', 'Active', 'Inactive'];
  const filteredPortfolios = mockPortfolios.filter(p =>
    (filterStatus === 'All' || p.status === filterStatus) &&
    (filterAssetClass === 'All' || p.assetClass === filterAssetClass)
  );

  const portCtrl = useTableControls(filteredPortfolios, 10);
  const portExport = filteredPortfolios.map(p => ({
    ID: p.id, 'Portfolio Name': p.name, 'Asset Class': p.assetClass,
    'AUM (₦)': p.aum, 'YTD %': p.ytdReturn, Manager: p.manager, Status: p.status,
  }));

  const [secFilter, setSecFilter] = useState('All');
  const secAssetClasses = ['All', ...Array.from(new Set(mockSecurities.map(s => s.assetClass)))];
  const filteredSecurities = secFilter === 'All' ? mockSecurities : mockSecurities.filter(s => s.assetClass === secFilter);

  const secCtrl = useTableControls(filteredSecurities, 10);
  const secExport = filteredSecurities.map(s => ({
    Ticker: s.ticker, Name: s.name, Exchange: s.exchange,
    'Asset Class': s.assetClass, 'Price (₦)': s.price, 'Change %': s.changePct,
  }));


  const portfolioMetrics = [
    { label: 'Total AUM', value: '₦1.2T', trend: '+4.2%', isPositive: true },
    { label: 'Active Portfolios', value: mockPortfolios.length.toString(), trend: '+2', isPositive: true },
    { label: 'Avg YTD Return', value: '14.8%', trend: '+1.2%', isPositive: true },
    { label: 'Pending Approvals', value: '3', trend: 'High Priority', isPositive: false },
  ];

  return (
    <AppShell>
      <ModuleHeader
        title="Portfolio Operations"
        description="Monitor and manage client investment mandates, unit trust funds, and securities master."
        metrics={portfolioMetrics}
        actions={
          <button className="px-5 py-2.5 bg-navy-900 text-white rounded-lg hover:bg-navy-800 flex items-center text-[13px] font-bold shadow-lg hover:shadow-xl hover:translate-y-[-1px] transition-all" onClick={() => setIsModalOpen(true)}>
            <PlusIcon className="w-4 h-4 mr-2" /> New Portfolio
          </button>
        }
      />

      <div className="flex space-x-1 border-b border-gray-100 mb-6 overflow-x-auto">
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

      {activeTab === 'Portfolios' && (
        <div className="space-y-6">
          <div className="flex bg-gray-50/50 p-1 rounded-xl border border-gray-100 w-fit self-start mb-2">
            <div className="flex items-center space-x-1 px-3 border-r border-gray-200">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight mr-2">Status</span>
              {statuses.map(s => (
                <button key={s} onClick={() => setFilterStatus(s)} className={cn("px-3 py-1 text-[10px] font-bold uppercase rounded-lg transition-all", filterStatus === s ? "bg-white text-navy-900 shadow-sm" : "text-gray-400 hover:text-navy-900")}>{s}</button>
              ))}
            </div>
            <div className="flex items-center space-x-1 px-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight mr-2">Asset Class</span>
              {assetClasses.map(a => (
                <button key={a} onClick={() => setFilterAssetClass(a)} className={cn("px-3 py-1 text-[10px] font-bold uppercase rounded-lg transition-all", filterAssetClass === a ? "bg-white text-navy-900 shadow-sm" : "text-gray-400 hover:text-navy-900")}>{a}</button>
              ))}
            </div>
          </div>

          <div className="table-datagrid-container">
            <div className="p-5 border-b border-gray-100 bg-white/50 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-navy-900 text-sm uppercase tracking-wider">Portfolio Directory</h3>
                <p className="text-[11px] text-gray-400 font-medium">Manage mandates and asset allocations</p>
              </div>
              <TableToolbar
                searchValue={portCtrl.search}
                onSearchChange={portCtrl.setSearch}
                onRefresh={() => { }}
                exportData={portExport}
                exportFilename="portfolios"
                density={portCtrl.density}
                onDensityChange={portCtrl.setDensity}
              />
            </div>
            <div className="overflow-x-auto">
              <table className={cn("table-datagrid", `density-${portCtrl.density}`)}>
                <thead>
                  <tr>
                    <th className="w-12 text-center text-[10px] text-gray-300">#</th>
                    <th className="w-28">ID</th>
                    <th>Portfolio Name</th>
                    <th className="w-32">Asset Class</th>
                    <th className="text-right w-36">AUM (₦)</th>
                    <th className="text-right w-24">YTD %</th>
                    <th className="w-40">Manager</th>
                    <th className="w-28">Status</th>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {portCtrl.paged.map((p, idx) => (
                    <tr key={p.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer group" onClick={() => navigate(`/portfolio/${p.id}`)}>
                      <td className="text-center">{(portCtrl.page - 1) * portCtrl.pageSize + idx + 1}</td>
                      <td>{p.id}</td>
                      <td>{p.name}</td>
                      <td>{p.assetClass}</td>
                      <td className="text-right font-mono">₦{(p.aum / 1e12).toFixed(2)}T</td>
                      <td className="text-right font-mono">
                        <span className={p.ytdReturn >= 0 ? "text-success" : "text-danger"}>{p.ytdReturn > 0 ? '+' : ''}{p.ytdReturn}%</span>
                      </td>
                      <td>{p.manager}</td>
                      <td><StatusBadge status={p.status} /></td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <TablePagination currentPage={portCtrl.page} totalItems={portCtrl.totalItems} pageSize={portCtrl.pageSize} onPageChange={portCtrl.setPage} />
          </div>
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
        <div className="space-y-6">
          <div className="flex space-x-1 mb-2 overflow-x-auto pb-1">
            {secAssetClasses.map(a => (
              <button key={a} onClick={() => setSecFilter(a)} className={cn("px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all", secFilter === a ? "bg-navy-900 text-white shadow-md shadow-navy-900/10" : "bg-gray-50 text-gray-400 hover:text-navy-900")}>{a}</button>
            ))}
          </div>
          <div className="table-datagrid-container">
            <div className="p-5 border-b border-gray-100 bg-white/50 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-navy-900 text-sm uppercase tracking-wider">Securities Master</h3>
                <p className="text-[11px] text-gray-400 font-medium">Real-market pricing and asset classification</p>
              </div>
              <TableToolbar
                searchValue={secCtrl.search}
                onSearchChange={secCtrl.setSearch}
                onRefresh={() => { }}
                exportData={secExport}
                exportFilename="securities_master"
                density={secCtrl.density}
                onDensityChange={secCtrl.setDensity}
              />
            </div>
            <div className="overflow-x-auto">
              <table className={cn("table-datagrid", `density-${secCtrl.density}`)}>
                <thead>
                  <tr>
                    <th className="w-12 text-center text-[10px] text-gray-300">#</th>
                    <th className="w-28">Ticker</th>
                    <th>Name</th>
                    <th className="w-32">Exchange</th>
                    <th className="w-32">Asset Class</th>
                    <th className="text-right w-32">Price</th>
                    <th className="text-right w-24">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {secCtrl.paged.map((s, idx) => (
                    <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="text-center">{(secCtrl.page - 1) * secCtrl.pageSize + idx + 1}</td>
                      <td>{s.ticker}</td>
                      <td>{s.name}</td>
                      <td>{s.exchange}</td>
                      <td>{s.assetClass}</td>
                      <td className="text-right font-mono">{s.price.toFixed(2)}</td>
                      <td className="text-right font-mono">
                        {s.changePct !== undefined ? (
                          <span className={s.changePct >= 0 ? "text-success" : "text-danger"}>
                            {s.changePct > 0 ? '+' : ''}{s.changePct}%
                          </span>
                        ) : (
                          <span>--</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <TablePagination currentPage={secCtrl.page} totalItems={secCtrl.totalItems} pageSize={secCtrl.pageSize} onPageChange={secCtrl.setPage} />
          </div>
        </div>
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
                    <option>Multi-Asset</option><option>Fixed Income</option><option>Money Market</option><option>Equities</option><option>Balanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio Manager</label>
                  <select className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none">
                    <option>Select Manager...</option><option>Adaeze Okonkwo</option><option>Emeka Nwachukwu</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Initial AUM (₦)</label>
                  <input type="number" className="w-full border border-gray-300 rounded p-2 text-sm font-mono focus:ring-gold-500 focus:border-gold-500 outline-none" placeholder="0" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Benchmark</label>
                  <select className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none">
                    <option>Select Benchmark...</option><option>NGX All-Share Index</option><option>FMDQ Bond Index</option><option>91-Day T-Bill Rate</option><option>Custom Composite</option>
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


