import React, { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { StatusBadge } from '../components/ui/StatusBadge';
import { mockTrades, mockPortfolios, mockSecurities } from '../data/mockData';
import { PlusIcon, AlertIcon } from '../components/icons/Icons';
import { cn } from '../components/icons/Icons';
import { TableToolbar, TablePagination, useTableControls } from '../components/ui/TableControls';

export default function Trades() {
  const [activeTab, setActiveTab] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState<typeof mockTrades[0] | null>(null);
  const [tradeSide, setTradeSide] = useState('Buy');
  const [tradeQty, setTradeQty] = useState('');
  const [tradePrice, setTradePrice] = useState('');
  const [selectedPortfolio, setSelectedPortfolio] = useState('');
  const [selectedSecurity, setSelectedSecurity] = useState('');

  const tabs = ['All', 'Draft', 'Submitted', 'Approved', 'Executed', 'Settled', 'Failed'];
  const baseFiltered = activeTab === 'All' ? mockTrades : mockTrades.filter(t => t.status === activeTab);

  const { search, setSearch, page, setPage, paged, totalItems, pageSize, density, setDensity } = useTableControls(baseFiltered, 10);

  const grossValue = (parseFloat(tradeQty) || 0) * (parseFloat(tradePrice) || 0);

  const exportData = baseFiltered.map(t => ({
    'Trade ID': t.id, Date: t.tradeDate, Security: t.ticker, Portfolio: t.portfolioId,
    Side: t.side, Quantity: t.quantity, 'Price (₦)': t.price,
    'Gross Value (₦)': t.grossValue, 'Net Value (₦)': t.netValue, Status: t.status,
  }));

  const handleSubmitTrade = () => {
    if (!selectedPortfolio || !selectedSecurity || !tradeQty || !tradePrice) {
      alert('Please fill all required fields.');
      return;
    }
    setIsModalOpen(false);
    setTradeQty(''); setTradePrice(''); setSelectedPortfolio(''); setSelectedSecurity('');
    alert('Trade submitted for approval! Check the Authorization Queue.');
  };

  return (
    <AppShell>
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-navy-900 tracking-tight">Trade Execution</h1>
            <p className="text-[13px] text-gray-500 font-medium">Capture mandates, monitor lifecycle, and manage settlement blotters.</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 bg-navy-900 text-white rounded-lg hover:bg-navy-800 flex items-center text-[13px] font-bold shadow-lg shadow-navy-900/10 hover:shadow-xl hover:translate-y-[-1px] transition-all"
            >
              <PlusIcon className="w-4 h-4 mr-2" /> New Trade mandate
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 border-b border-gray-100 mb-6 overflow-x-auto">
          {tabs.map(tab => {
            const count = tab === 'All' ? mockTrades.length : mockTrades.filter(t => t.status === tab).length;
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-5 py-3 text-[11px] font-bold uppercase tracking-widest border-b-2 transition-all whitespace-nowrap",
                  isActive
                    ? "border-navy-900 text-navy-900"
                    : "border-transparent text-gray-400 hover:text-navy-700 hover:border-gray-200"
                )}
              >
                {tab} <span className={cn("ml-2 px-1.5 py-0.5 rounded-md text-[9px] font-bold", isActive ? "bg-navy-900 text-white" : "bg-gray-100 text-gray-500")}>{count}</span>
              </button>
            )
          })}
        </div>

        {/* Table Area */}
        <div className="table-datagrid-container flex-1">
          <div className="p-4 border-b border-gray-100 bg-white/50 flex justify-between items-center">
            <h3 className="font-bold text-navy-900 text-sm uppercase tracking-wider">Trading Blotter</h3>
            <TableToolbar
              searchValue={search}
              onSearchChange={setSearch}
              onRefresh={() => { }}
              exportData={exportData}
              exportFilename="trades"
              density={density}
              onDensityChange={setDensity}
            />
          </div>
          <div className="overflow-x-auto flex-1">
            <table className={cn("table-datagrid", `density-${density}`)}>
              <thead>
                <tr>
                  <th className="w-12 text-center text-[10px] text-gray-300">#</th>
                  <th className="w-28">ID</th>
                  <th className="w-28">Date</th>
                  <th>Security</th>
                  <th>Portfolio</th>
                  <th className="w-24">Side</th>
                  <th className="text-right w-28">Qty</th>
                  <th className="text-right w-32">Price</th>
                  <th className="text-right w-36">Value</th>
                  <th className="w-32">Status</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((trade, idx) => (
                  <tr
                    key={trade.id}
                    onClick={() => setSelectedTrade(trade)}
                    className={cn(
                      "hover:bg-gray-50/50 transition-colors cursor-pointer",
                      selectedTrade?.id === trade.id && "bg-navy-50/30"
                    )}
                  >
                    <td className="text-center">{(page - 1) * pageSize + idx + 1}</td>
                    <td>{trade.id}</td>
                    <td>{trade.tradeDate}</td>
                    <td>{trade.ticker}</td>
                    <td>{trade.portfolioId}</td>
                    <td>
                      <span className={cn(
                        "px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider",
                        trade.side === 'Buy' ? "bg-success-bg text-success" : "bg-danger-bg text-danger"
                      )}>
                        {trade.side}
                      </span>
                    </td>
                    <td className="text-right">{trade.quantity.toLocaleString()}</td>
                    <td className="text-right">{trade.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    <td className="text-right">₦{trade.grossValue.toLocaleString()}</td>
                    <td><StatusBadge status={trade.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <TablePagination currentPage={page} totalItems={totalItems} pageSize={pageSize} onPageChange={setPage} />
        </div>

        {/* Modal for New Trade */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-navy-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h3 className="text-lg font-bold text-navy-900">New Trade Entry</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 font-bold">&times;</button>
              </div>
              <div className="p-6 overflow-y-auto flex-1">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio *</label>
                    <select value={selectedPortfolio} onChange={e => setSelectedPortfolio(e.target.value)} className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none">
                      <option value="">Select Portfolio...</option>
                      {mockPortfolios.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Security *</label>
                    <select value={selectedSecurity} onChange={e => { setSelectedSecurity(e.target.value); const sec = mockSecurities.find(s => s.id === e.target.value); if (sec) setTradePrice(sec.price.toString()); }} className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none">
                      <option value="">Select Security...</option>
                      {mockSecurities.map(s => <option key={s.id} value={s.id}>{s.ticker} - {s.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Side *</label>
                    <div className="flex rounded border border-gray-300 overflow-hidden">
                      <button onClick={() => setTradeSide('Buy')} className={cn("flex-1 py-2 text-sm font-medium transition-colors", tradeSide === 'Buy' ? "bg-navy-900 text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100")}>Buy</button>
                      <button onClick={() => setTradeSide('Sell')} className={cn("flex-1 py-2 text-sm font-medium transition-colors", tradeSide === 'Sell' ? "bg-danger text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100")}>Sell</button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                    <input type="number" value={tradeQty} onChange={e => setTradeQty(e.target.value)} className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none" placeholder="0" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (₦)</label>
                    <input type="number" value={tradePrice} onChange={e => setTradePrice(e.target.value)} className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none" placeholder="0.00" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gross Value (₦)</label>
                    <div className="w-full border border-gray-300 rounded p-2 text-sm bg-gray-50 text-navy-900 font-bold">{grossValue > 0 ? `₦${grossValue.toLocaleString()}` : '—'}</div>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded text-gray-700 text-sm font-medium hover:bg-gray-100">Cancel</button>
                <button onClick={handleSubmitTrade} className="px-4 py-2 bg-navy-900 text-white rounded text-sm font-medium shadow hover:bg-navy-800">Submit for Approval</button>
              </div>
            </div>
          </div>
        )}

        {/* Side Panel for Trade Details */}
        {selectedTrade && (
          <div className="fixed inset-y-0 right-0 w-[500px] bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.1)] border-l border-gray-200 z-40 transform transition-transform duration-300 flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 bg-navy-900 text-white flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">{selectedTrade.ticker} {selectedTrade.side}</h3>
                <p className="text-xs text-gold-400">{selectedTrade.id}</p>
              </div>
              <button onClick={() => setSelectedTrade(null)} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              <div className="mb-8">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Lifecycle Status</h4>
                <div className="flex items-center justify-between">
                  {['Draft', 'Submitted', 'Approved', 'Executed', 'Settled'].map((step, i, arr) => {
                    const statusIndex = arr.indexOf(selectedTrade.status === 'Failed' ? 'Settled' : selectedTrade.status);
                    const isCompleted = i <= statusIndex;
                    const isCurrent = i === statusIndex;
                    const isFailed = selectedTrade.status === 'Failed' && step === 'Settled';

                    return (
                      <div key={step} className="flex flex-col items-center relative flex-1">
                        <div className={cn(
                          "w-4 h-4 rounded-full z-10 mb-2 border-2",
                          isFailed ? "bg-danger border-danger" :
                            isCurrent ? "bg-gold-500 border-gold-500" :
                              isCompleted ? "bg-navy-900 border-navy-900" : "bg-white border-gray-300"
                        )}></div>
                        <span className={cn("text-[10px] font-bold uppercase text-center", isCurrent ? "text-navy-900" : "text-gray-400")}>{step}</span>
                        {i < arr.length - 1 && (
                          <div className={cn(
                            "absolute top-2 left-1/2 w-full h-[2px] -z-0",
                            isCompleted ? "bg-navy-900" : "bg-gray-200"
                          )}></div>
                        )}
                      </div>
                    )
                  })}
                </div>
                {selectedTrade.status === 'Failed' && (
                  <div className="mt-4 p-3 bg-danger-bg border border-danger/20 rounded-md flex items-start">
                    <AlertIcon className="w-4 h-4 text-danger mr-2 mt-0.5 shrink-0" />
                    <span className="text-xs text-danger font-medium">{selectedTrade.failureReason}</span>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider border-b pb-2 mb-3">Trade Details</h4>
                  <div className="grid grid-cols-2 gap-y-4 text-sm">
                    <div><p className="text-gray-500 text-xs mb-1">Portfolio</p><p className="font-medium text-navy-900">{selectedTrade.portfolioId}</p></div>
                    <div><p className="text-gray-500 text-xs mb-1">Trade Date</p><p className="font-medium text-navy-900">{selectedTrade.tradeDate}</p></div>
                    <div><p className="text-gray-500 text-xs mb-1">Quantity</p><p className="font-medium text-navy-900">{selectedTrade.quantity.toLocaleString()}</p></div>
                    <div><p className="text-gray-500 text-xs mb-1">Price</p><p className="font-medium text-navy-900">₦{selectedTrade.price.toFixed(2)}</p></div>
                    <div><p className="text-gray-500 text-xs mb-1">Gross Value</p><p className="font-medium text-navy-900">₦{selectedTrade.grossValue.toLocaleString()}</p></div>
                    <div><p className="text-gray-500 text-xs mb-1">Net Value</p><p className="font-bold text-navy-900">₦{selectedTrade.netValue.toLocaleString()}</p></div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider border-b pb-2 mb-3">Parties & Settlement</h4>
                  <div className="grid grid-cols-2 gap-y-4 text-sm">
                    <div><p className="text-gray-500 text-xs mb-1">Broker</p><p className="font-medium text-navy-900">{selectedTrade.broker}</p></div>
                    <div><p className="text-gray-500 text-xs mb-1">Settlement Date</p><p className="font-medium text-navy-900">{selectedTrade.settlementDate}</p></div>
                    <div><p className="text-gray-500 text-xs mb-1">Trader</p><p className="font-medium text-navy-900">{selectedTrade.trader}</p></div>
                    <div><p className="text-gray-500 text-xs mb-1">Approver</p><p className="font-medium text-navy-900">{selectedTrade.approver || '--'}</p></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50 flex gap-3">
              {selectedTrade.status === 'Submitted' && (
                <>
                  <button className="flex-1 bg-success text-white py-2 rounded shadow font-medium hover:bg-success/90 transition-colors">Approve</button>
                  <button className="flex-1 bg-white border border-danger text-danger py-2 rounded shadow-sm font-medium hover:bg-danger-bg transition-colors">Reject</button>
                </>
              )}
              {selectedTrade.status === 'Failed' && (
                <button className="flex-1 bg-navy-900 text-white py-2 rounded shadow font-medium hover:bg-navy-800 transition-colors">Resubmit</button>
              )}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
