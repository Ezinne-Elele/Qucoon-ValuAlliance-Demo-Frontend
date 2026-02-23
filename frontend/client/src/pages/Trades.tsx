import React, { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { StatusBadge } from '../components/ui/StatusBadge';
import { mockTrades, mockPortfolios, mockSecurities } from '../data/mockData';
import { PlusIcon, FilterIcon, DownloadIcon, AlertIcon } from '../components/icons/Icons';
import { cn } from '../components/icons/Icons';

export default function Trades() {
  const [activeTab, setActiveTab] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState<typeof mockTrades[0] | null>(null);

  const tabs = ['All', 'Draft', 'Submitted', 'Approved', 'Executed', 'Settled', 'Failed'];
  const filteredTrades = activeTab === 'All' ? mockTrades : mockTrades.filter(t => t.status === activeTab);

  return (
    <AppShell>
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-navy-900">Trade Capture & Lifecycle</h1>
          <div className="flex space-x-3">
            <button className="px-3 py-2 bg-white border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 flex items-center text-sm font-medium shadow-sm transition-all">
              <FilterIcon className="w-4 h-4 mr-2" /> Filter
            </button>
            <button className="px-3 py-2 bg-white border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 flex items-center text-sm font-medium shadow-sm transition-all">
              <DownloadIcon className="w-4 h-4 mr-2" /> Export
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-navy-900 text-white rounded-md hover:bg-navy-800 flex items-center text-sm font-medium shadow-md shadow-navy-900/20 transition-all"
            >
              <PlusIcon className="w-4 h-4 mr-2" /> New Trade
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 border-b border-gray-200 mb-6 overflow-x-auto">
          {tabs.map(tab => {
            const count = tab === 'All' ? mockTrades.length : mockTrades.filter(t => t.status === tab).length;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                  activeTab === tab 
                    ? "border-gold-500 text-navy-900" 
                    : "border-transparent text-gray-500 hover:text-navy-700 hover:border-gray-300"
                )}
              >
                {tab} <span className="ml-1.5 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">{count}</span>
              </button>
            )
          })}
        </div>

        {/* Table Area */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm flex-1 overflow-hidden flex flex-col">
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 border-b border-gray-200 sticky top-0 z-10">
                <tr>
                  <th className="p-4 font-medium">Trade ID</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Security</th>
                  <th className="p-4 font-medium">Portfolio</th>
                  <th className="p-4 font-medium">Side</th>
                  <th className="p-4 font-medium text-right">Quantity</th>
                  <th className="p-4 font-medium text-right">Price (₦)</th>
                  <th className="p-4 font-medium text-right">Gross Value (₦)</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTrades.map(trade => (
                  <tr 
                    key={trade.id} 
                    onClick={() => setSelectedTrade(trade)}
                    className="hover:bg-navy-50/50 transition-colors cursor-pointer"
                  >
                    <td className="p-4 font-mono text-xs font-semibold text-navy-700">{trade.id}</td>
                    <td className="p-4 font-mono text-gray-600">{trade.tradeDate}</td>
                    <td className="p-4 font-medium text-navy-900">{trade.ticker}</td>
                    <td className="p-4 text-gray-600">{trade.portfolioId}</td>
                    <td className="p-4">
                      <span className={cn("text-xs font-bold px-2 py-0.5 rounded", trade.side === 'Buy' ? "bg-navy-100 text-navy-700" : "bg-red-100 text-danger")}>
                        {trade.side}
                      </span>
                    </td>
                    <td className="p-4 text-right font-mono">{trade.quantity.toLocaleString()}</td>
                    <td className="p-4 text-right font-mono">{trade.price.toFixed(2)}</td>
                    <td className="p-4 text-right font-mono font-medium">{trade.grossValue.toLocaleString()}</td>
                    <td className="p-4"><StatusBadge status={trade.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Overlay for New Trade (Simplified for Demo) */}
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio</label>
                    <select className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none">
                      <option>Select Portfolio...</option>
                      {mockPortfolios.map(p => <option key={p.id}>{p.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Security</label>
                    <select className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none">
                      <option>Select Security...</option>
                      {mockSecurities.map(s => <option key={s.id}>{s.ticker} - {s.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Side</label>
                    <div className="flex rounded border border-gray-300 overflow-hidden">
                      <button className="flex-1 bg-navy-900 text-white py-2 text-sm font-medium">Buy</button>
                      <button className="flex-1 bg-gray-50 text-gray-600 py-2 text-sm font-medium hover:bg-gray-100">Sell</button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <input type="number" className="w-full border border-gray-300 rounded p-2 text-sm font-mono focus:ring-gold-500 focus:border-gold-500 outline-none" placeholder="0" />
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded text-gray-700 text-sm font-medium hover:bg-gray-100">Cancel</button>
                <button className="px-4 py-2 bg-navy-900 text-white rounded text-sm font-medium shadow hover:bg-navy-800">Submit for Approval</button>
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
                <p className="text-xs text-gold-400 font-mono">{selectedTrade.id}</p>
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
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Portfolio</p>
                      <p className="font-medium text-navy-900">{selectedTrade.portfolioId}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Trade Date</p>
                      <p className="font-mono text-navy-900">{selectedTrade.tradeDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Quantity</p>
                      <p className="font-mono text-navy-900">{selectedTrade.quantity.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Price</p>
                      <p className="font-mono text-navy-900">₦{selectedTrade.price.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Gross Value</p>
                      <p className="font-mono text-navy-900">₦{selectedTrade.grossValue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Net Value</p>
                      <p className="font-mono font-bold text-navy-900">₦{selectedTrade.netValue.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider border-b pb-2 mb-3">Parties & Settlement</h4>
                  <div className="grid grid-cols-2 gap-y-4 text-sm">
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Broker</p>
                      <p className="font-medium text-navy-900">{selectedTrade.broker}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Settlement Date</p>
                      <p className="font-mono text-navy-900">{selectedTrade.settlementDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Trader</p>
                      <p className="font-medium text-navy-900">{selectedTrade.trader}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Approver</p>
                      <p className="font-medium text-navy-900">{selectedTrade.approver || '--'}</p>
                    </div>
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
