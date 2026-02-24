import React, { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { mockPortfolios, mockFunds, mockSecurities, mockClients, mockPositions } from '../data/mockData';
import { PlusIcon, NGXLogo, FMDQLogo, CBNLogo, NairaIcon, EyeIcon, ArrowLeftIcon, PortfolioIcon, TrendingUpIcon, PieChartIcon } from '../components/icons/Icons';
import { StatusBadge } from '../components/ui/StatusBadge';
import { cn } from '../components/icons/Icons';
import { TableToolbar, TablePagination, useTableControls } from '../components/ui/TableControls';

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('Portfolios');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterAssetClass, setFilterAssetClass] = useState('All');
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string | null>(null);
  const tabs = ['Portfolios', 'Funds', 'Securities Master'];

  const selectedPortfolio = mockPortfolios.find(p => p.id === selectedPortfolioId);
  const portfolioPositions = selectedPortfolioId ? mockPositions.filter(pos => pos.portfolioId === selectedPortfolioId) : [];

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
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="font-semibold text-navy-900 text-sm">Portfolios</h3>
              <TableToolbar searchValue={portCtrl.search} onSearchChange={portCtrl.setSearch} onRefresh={() => { }} exportData={portExport} exportFilename="portfolios" />
            </div>
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
                  <th className="p-4 font-medium text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {portCtrl.paged.map((p, idx) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors cursor-pointer group" onClick={() => setSelectedPortfolioId(p.id)}>
                    <td className="p-4 text-gray-400 text-xs font-mono">{(portCtrl.page - 1) * portCtrl.pageSize + idx + 1}</td>
                    <td className="p-4 font-mono text-xs font-semibold text-navy-700">{p.id}</td>
                    <td className="p-4 font-medium text-navy-900">{p.name}</td>
                    <td className="p-4 text-gray-600">{p.assetClass}</td>
                    <td className="p-4 text-right font-mono font-medium text-navy-900">{p.aum.toLocaleString()}</td>
                    <td className="p-4 text-right font-mono font-medium">
                      <span className={p.ytdReturn >= 0 ? "text-success" : "text-danger"}>{p.ytdReturn > 0 ? '+' : ''}{p.ytdReturn}%</span>
                    </td>
                    <td className="p-4 text-gray-600">{p.manager}</td>
                    <td className="p-4"><StatusBadge status={p.status} /></td>
                    <td className="p-4">
                      <div className="flex justify-center">
                        <button className="p-1.5 bg-gray-100 rounded hover:bg-gray-200 transition-colors" title="View Holdings">
                          <EyeIcon className="w-3.5 h-3.5 text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <TablePagination currentPage={portCtrl.page} totalItems={portCtrl.totalItems} pageSize={portCtrl.pageSize} onPageChange={portCtrl.setPage} />
          </div>
        </>
      )}

      {/* Portfolio Assets Side Panel */}
      {selectedPortfolio && (
        <PortfolioAssetPanel
          portfolio={selectedPortfolio}
          positions={portfolioPositions}
          onClose={() => setSelectedPortfolioId(null)}
        />
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
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="font-semibold text-navy-900 text-sm">Securities Master</h3>
              <TableToolbar searchValue={secCtrl.search} onSearchChange={secCtrl.setSearch} onRefresh={() => { }} exportData={secExport} exportFilename="securities_master" />
            </div>
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
                {secCtrl.paged.map((s, idx) => (
                  <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-gray-400 text-xs font-mono">{(secCtrl.page - 1) * secCtrl.pageSize + idx + 1}</td>
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
            <TablePagination currentPage={secCtrl.page} totalItems={secCtrl.totalItems} pageSize={secCtrl.pageSize} onPageChange={secCtrl.setPage} />
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

// =================================================================
// PORTFOLIO ASSET PANEL
// =================================================================
function PortfolioAssetPanel({ portfolio, positions, onClose }: { portfolio: any, positions: any[], onClose: () => void }) {
  const { search, setSearch, page, setPage, paged, totalItems, pageSize } = useTableControls(positions, 8, ['ticker']);
  const exportData = positions.map(p => ({
    Ticker: p.ticker, Quantity: p.quantity || p.faceValue, 'Avg Cost': p.avgCost, 'Curr Price': p.currentPrice,
    'Market Value': p.marketValue, 'Unrealised PnL': p.unrealisedPnL, 'Weight %': p.weight
  }));

  return (
    <div className="fixed inset-y-0 right-0 w-[640px] bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.1)] border-l border-gray-200 z-40 flex flex-col animate-in slide-in-from-right duration-300">
      <div className="px-6 py-4 border-b border-gray-200 bg-navy-900 text-white flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold">{portfolio.name}</h3>
          <p className="text-xs text-gold-400 font-mono">{portfolio.id} · {portfolio.assetClass} · {portfolio.manager}</p>
        </div>
        <button onClick={onClose} className="text-white hover:text-gold-500 text-2xl leading-none">&times;</button>
      </div>

      <div className="p-6 overflow-y-auto flex-1 space-y-6">
        {/* Summary Mini Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-50 p-3 rounded border border-gray-100">
            <p className="text-[10px] text-gray-500 uppercase font-bold mb-1 flex items-center"><PortfolioIcon className="w-3 h-3 mr-1" /> Total AUM</p>
            <p className="font-mono font-bold text-navy-900">₦{portfolio.aum.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded border border-gray-100">
            <p className="text-[10px] text-gray-500 uppercase font-bold mb-1 flex items-center"><TrendingUpIcon className="w-3 h-3 mr-1" /> YTD Return</p>
            <p className={cn("font-mono font-bold", portfolio.ytdReturn >= 0 ? "text-success" : "text-danger")}>
              {portfolio.ytdReturn > 0 ? '+' : ''}{portfolio.ytdReturn}%
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded border border-gray-100">
            <p className="text-[10px] text-gray-500 uppercase font-bold mb-1 flex items-center"><PieChartIcon className="w-3 h-3 mr-1" /> Asset Class</p>
            <p className="font-semibold text-navy-900 text-sm">{portfolio.assetClass}</p>
          </div>
        </div>

        {/* Assets Table */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-bold text-navy-900">Portfolio Holdings</h4>
            <TableToolbar
              searchValue={search}
              onSearchChange={setSearch}
              onRefresh={() => { }}
              exportData={exportData}
              exportFilename={`${portfolio.id}_holdings`}
            />
          </div>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <table className="w-full text-xs text-left">
              <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                <tr>
                  <th className="p-3 font-semibold">Asset</th>
                  <th className="p-3 font-semibold text-right">Quantity / Face</th>
                  <th className="p-3 font-semibold text-right">Market Value (₦)</th>
                  <th className="p-3 font-semibold text-right">PnL (₦)</th>
                  <th className="p-3 font-semibold text-right">Weight %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paged.length > 0 ? paged.map((pos) => (
                  <tr key={pos.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3 font-bold text-navy-900">{pos.ticker}</td>
                    <td className="p-3 text-right font-mono">{(pos.quantity || pos.faceValue).toLocaleString()}</td>
                    <td className="p-3 text-right font-mono font-medium">{pos.marketValue.toLocaleString()}</td>
                    <td className="p-3 text-right font-mono">
                      <span className={pos.unrealisedPnL >= 0 ? "text-success" : "text-danger"}>
                        {pos.unrealisedPnL > 0 ? '+' : ''}{pos.unrealisedPnL.toLocaleString()}
                      </span>
                    </td>
                    <td className="p-3 text-right font-mono">
                      <div className="flex items-center justify-end">
                        <span className="mr-2">{pos.weight}%</span>
                        <div className="w-12 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-navy-900 h-full" style={{ width: `${pos.weight}%` }}></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={5} className="p-8 text-center text-gray-400 italic">No holdings found for this portfolio</td></tr>
                )}
              </tbody>
            </table>
            <TablePagination currentPage={page} totalItems={totalItems} pageSize={pageSize} onPageChange={setPage} />
          </div>
        </div>

        {/* Mandate Notes */}
        <div className="bg-navy-50 rounded-lg p-4 border border-navy-100">
          <h4 className="text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">Mandate / Strategy</h4>
          <p className="text-xs text-navy-800 leading-relaxed italic">"Investment mandate focuses on {portfolio.assetClass} assets with a long-term capital appreciation objective. Benchmark: {portfolio.benchmark}."</p>
        </div>
      </div>

      <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
        <button onClick={onClose} className="px-4 py-2 bg-navy-900 text-white rounded text-sm font-medium">Close Details</button>
      </div>
    </div>
  );
}
