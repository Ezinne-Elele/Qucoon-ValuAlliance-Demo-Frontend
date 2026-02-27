import React, { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { mockJournalEntries, mockTrialBalance, mockFunds } from '../data/mockData';
import { PlusIcon, DownloadIcon, cn } from '../components/icons/Icons';
import { TableToolbar, TablePagination, useTableControls } from '../components/ui/TableControls';
import { useLocation } from 'wouter';

export default function FundAccounting() {
    const [, navigate] = useLocation();
    const [activeTab, setActiveTab] = useState('Journal Entries');
    const [isPostJournalOpen, setIsPostJournalOpen] = useState(false);
    const [isPeriodCloseOpen, setIsPeriodCloseOpen] = useState(false);
    const [isGenStatementsOpen, setIsGenStatementsOpen] = useState(false);
    const tabs = ['Journal Entries', 'Trial Balance', 'Income Statement', 'Cash Flow'];

    const totalDebit = mockTrialBalance.reduce((s, r) => s + r.debit, 0);
    const totalCredit = mockTrialBalance.reduce((s, r) => s + r.credit, 0);

    const jeCtrl = useTableControls(mockJournalEntries, 10);
    const jeExport = mockJournalEntries.map(je => ({
        'Journal ID': je.id, Date: je.date, Fund: je.fund, Description: je.description,
        'Dr Account': je.drAccount, 'Cr Account': je.crAccount, 'Amount (₦)': je.amount, Source: je.sourceModule,
    }));

    const tbCtrl = useTableControls(mockTrialBalance, 15);
    const tbExport = mockTrialBalance.map(r => ({
        Account: r.account, Group: r.group, 'Debit (₦)': r.debit, 'Credit (₦)': r.credit,
    }));

    return (
        <AppShell>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-navy-900">Fund Accounting & Financial Management</h1>
                    <div className="flex space-x-3">
                        <button onClick={() => setIsPostJournalOpen(true)} className="px-4 py-2 bg-navy-900 text-white rounded text-sm font-medium hover:bg-navy-800 shadow-sm flex items-center">
                            <PlusIcon className="w-4 h-4 mr-2" /> Post Journal
                        </button>
                        <button onClick={() => setIsPeriodCloseOpen(true)} className="px-4 py-2 bg-white border border-gray-200 rounded text-gray-600 text-sm font-medium hover:bg-gray-50 shadow-sm">Period Close</button>
                        <button onClick={() => setIsGenStatementsOpen(true)} className="px-4 py-2 bg-white border border-gray-200 rounded text-gray-600 text-sm font-medium hover:bg-gray-50 shadow-sm flex items-center">
                            <DownloadIcon className="w-4 h-4 mr-2" /> Generate Statements
                        </button>
                    </div>
                </div>

                <div className="flex space-x-6 border-b border-gray-200">
                    {tabs.map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={cn("pb-3 text-sm font-semibold transition-colors border-b-2", activeTab === tab ? "border-gold-500 text-navy-900" : "border-transparent text-gray-500 hover:text-navy-700")}>{tab}</button>
                    ))}
                </div>

                {activeTab === 'Journal Entries' && (
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                            <h3 className="font-semibold text-navy-900 text-sm">Journal Entries</h3>
                            <TableToolbar searchValue={jeCtrl.search} onSearchChange={jeCtrl.setSearch} onRefresh={() => { }} exportData={jeExport} exportFilename="journal_entries" />
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                                    <tr>
                                        <th className="p-4 font-medium w-12">S/N</th>
                                        <th className="p-4 font-medium">Journal ID</th>
                                        <th className="p-4 font-medium">Date</th>
                                        <th className="p-4 font-medium">Fund</th>
                                        <th className="p-4 font-medium">Description</th>
                                        <th className="p-4 font-medium">Dr Account</th>
                                        <th className="p-4 font-medium">Cr Account</th>
                                        <th className="p-4 font-medium text-right">Amount (₦)</th>
                                        <th className="p-4 font-medium">Source</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {jeCtrl.paged.map((je, idx) => (
                                        <tr key={je.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4 text-gray-400 text-xs font-mono">{(jeCtrl.page - 1) * jeCtrl.pageSize + idx + 1}</td>
                                            <td className="p-4 font-mono text-xs font-semibold text-navy-700">{je.id}</td>
                                            <td className="p-4 font-mono text-gray-600">{je.date}</td>
                                            <td className="p-4">
                                                <button
                                                    onClick={() => {
                                                        const fundObj = mockFunds.find(f => f.name === je.fund);
                                                        if (fundObj) navigate(`/fund/${fundObj.id}`);
                                                    }}
                                                    className="text-gold-600 font-bold hover:underline"
                                                >
                                                    {je.fund}
                                                </button>
                                            </td>
                                            <td className="p-4 text-gray-700 max-w-[250px] truncate">{je.description}</td>
                                            <td className="p-4 text-xs text-navy-700 font-medium">{je.drAccount}</td>
                                            <td className="p-4 text-xs text-navy-700 font-medium">{je.crAccount}</td>
                                            <td className="p-4 text-right font-mono font-medium text-navy-900">{je.amount.toLocaleString()}</td>
                                            <td className="p-4 text-xs text-gray-500">{je.sourceModule}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <TablePagination currentPage={jeCtrl.page} totalItems={jeCtrl.totalItems} pageSize={jeCtrl.pageSize} onPageChange={jeCtrl.setPage} />
                    </div>
                )}

                {activeTab === 'Trial Balance' && (
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                            <h3 className="font-semibold text-navy-900 text-sm">Trial Balance — All Funds — 21 Feb 2026</h3>
                            <TableToolbar searchValue={tbCtrl.search} onSearchChange={tbCtrl.setSearch} onRefresh={() => { }} exportData={tbExport} exportFilename="trial_balance" />
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                                    <tr>
                                        <th className="p-4 font-medium w-12">S/N</th>
                                        <th className="p-4 font-medium">Account</th>
                                        <th className="p-4 font-medium">Group</th>
                                        <th className="p-4 font-medium text-right">Debit (₦)</th>
                                        <th className="p-4 font-medium text-right">Credit (₦)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {tbCtrl.paged.map((row, i) => (
                                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4 text-gray-400 text-xs font-mono">{(tbCtrl.page - 1) * tbCtrl.pageSize + i + 1}</td>
                                            <td className="p-4 font-medium text-navy-900">{row.account}</td>
                                            <td className="p-4"><span className={cn("text-xs font-medium px-2 py-0.5 rounded",
                                                row.group === 'Assets' ? 'bg-navy-100 text-navy-700' :
                                                    row.group === 'Liabilities' ? 'bg-warning-bg text-warning' :
                                                        row.group === 'Income' ? 'bg-success-bg text-success' :
                                                            'bg-danger-bg text-danger'
                                            )}>{row.group}</span></td>
                                            <td className="p-4 text-right font-mono font-medium text-navy-900">{row.debit > 0 ? row.debit.toLocaleString() : '—'}</td>
                                            <td className="p-4 text-right font-mono font-medium text-navy-900">{row.credit > 0 ? row.credit.toLocaleString() : '—'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="bg-navy-900 text-white">
                                    <tr>
                                        <td className="p-4 font-bold" colSpan={3}>TOTALS</td>
                                        <td className="p-4 text-right font-mono font-bold">{totalDebit.toLocaleString()}</td>
                                        <td className="p-4 text-right font-mono font-bold">{totalCredit.toLocaleString()}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <TablePagination currentPage={tbCtrl.page} totalItems={tbCtrl.totalItems} pageSize={tbCtrl.pageSize} onPageChange={tbCtrl.setPage} />
                    </div>
                )}

                {activeTab === 'Income Statement' && (
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                        <h3 className="font-semibold text-navy-900 mb-4">Income Statement — All Funds — YTD Feb 2026</h3>
                        <div className="space-y-4">
                            <div className="border-b border-gray-200 pb-4">
                                <h4 className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-3">Revenue</h4>
                                <div className="space-y-2">
                                    {[{ label: 'Management Fee Income', amount: 486250000 }, { label: 'Interest Income', amount: 625000000 }, { label: 'Dividend Income', amount: 185000000 }].map(item => (
                                        <div key={item.label} className="flex justify-between"><span className="text-sm text-gray-700">{item.label}</span><span className="font-mono font-medium text-navy-900">₦{item.amount.toLocaleString()}</span></div>
                                    ))}
                                    <div className="flex justify-between font-bold border-t border-gray-100 pt-2"><span className="text-navy-900">Total Revenue</span><span className="font-mono text-navy-900">₦{(1296250000).toLocaleString()}</span></div>
                                </div>
                            </div>
                            <div className="border-b border-gray-200 pb-4">
                                <h4 className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-3">Expenses</h4>
                                <div className="space-y-2">
                                    {[{ label: 'Brokerage Expense', amount: 42500000 }, { label: 'Custody Fees', amount: 18000000 }, { label: 'Audit & Professional', amount: 15000000 }, { label: 'Other Operating', amount: 8500000 }].map(item => (
                                        <div key={item.label} className="flex justify-between"><span className="text-sm text-gray-700">{item.label}</span><span className="font-mono font-medium text-danger">₦{item.amount.toLocaleString()}</span></div>
                                    ))}
                                    <div className="flex justify-between font-bold border-t border-gray-100 pt-2"><span className="text-navy-900">Total Expenses</span><span className="font-mono text-danger">₦{(84000000).toLocaleString()}</span></div>
                                </div>
                            </div>
                            <div className="flex justify-between text-lg font-bold bg-navy-900 text-white p-4 rounded">
                                <span>Net Income</span>
                                <span className="font-mono">₦{(1212250000).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Cash Flow' && (
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                        <h3 className="font-semibold text-navy-900 mb-4">Cash Flow Statement — All Funds — YTD Feb 2026</h3>
                        <div className="space-y-4">
                            {[
                                { section: 'Operating Activities', items: [{ label: 'Fee Income Received', amount: 486250000 }, { label: 'Interest Received', amount: 580000000 }, { label: 'Dividends Received', amount: 185000000 }, { label: 'Operating Expenses Paid', amount: -84000000 }], total: 1167250000 },
                                { section: 'Investing Activities', items: [{ label: 'Purchase of Securities', amount: -1845000000 }, { label: 'Proceeds from Sales', amount: 450000000 }, { label: 'T-Bill Maturity Proceeds', amount: 1200000000 }], total: -195000000 },
                                { section: 'Financing Activities', items: [{ label: 'Net Subscriptions', amount: 4200000000 }, { label: 'Net Redemptions', amount: -900000000 }], total: 3300000000 },
                            ].map(section => (
                                <div key={section.section} className="border-b border-gray-200 pb-4">
                                    <h4 className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-3">{section.section}</h4>
                                    <div className="space-y-2">
                                        {section.items.map(item => (
                                            <div key={item.label} className="flex justify-between"><span className="text-sm text-gray-700">{item.label}</span><span className={cn("font-mono font-medium", item.amount >= 0 ? "text-navy-900" : "text-danger")}>₦{Math.abs(item.amount).toLocaleString()}{item.amount < 0 ? ' (Out)' : ''}</span></div>
                                        ))}
                                        <div className="flex justify-between font-bold border-t border-gray-100 pt-2"><span className="text-navy-900">Net {section.section}</span><span className={cn("font-mono", section.total >= 0 ? "text-success" : "text-danger")}>₦{Math.abs(section.total).toLocaleString()}</span></div>
                                    </div>
                                </div>
                            ))}
                            <div className="flex justify-between text-lg font-bold bg-navy-900 text-white p-4 rounded">
                                <span>Net Cash Movement</span>
                                <span className="font-mono">₦{(4272250000).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Post Journal Modal */}
            {isPostJournalOpen && (
                <div className="fixed inset-0 bg-navy-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-navy-900">Post Journal Entry</h3>
                            <button onClick={() => setIsPostJournalOpen(false)} className="text-gray-400 hover:text-gray-600 font-bold">&times;</button>
                        </div>
                        <div className="p-6 overflow-y-auto flex-1">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Fund *</label>
                                    <select className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none">
                                        <option>Select Fund...</option>
                                        {mockFunds.map(f => <option key={f.id}>{f.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                                    <input type="date" className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none" defaultValue="2026-02-24" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Debit Account *</label>
                                    <select className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none">
                                        <option>Select Account...</option>
                                        <option>Cash & Bank Balances</option><option>Equity Portfolio</option><option>Fixed Income Portfolio</option><option>Accrued Income</option><option>Management Fee Receivable</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Credit Account *</label>
                                    <select className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none">
                                        <option>Select Account...</option>
                                        <option>Management Fee Income</option><option>Interest Income</option><option>Dividend Income</option><option>Subscriptions Payable</option><option>Brokerage Expense</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₦) *</label>
                                    <input type="number" className="w-full border border-gray-300 rounded p-2 text-sm font-mono focus:ring-gold-500 focus:border-gold-500 outline-none" placeholder="0.00" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Source Module</label>
                                    <select className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none">
                                        <option>Manual</option><option>Trades</option><option>Fees</option><option>Settlements</option><option>Valuation</option>
                                    </select>
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                                    <textarea className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none" rows={2} placeholder="Journal entry description..." />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload Supporting Document</label>
                                    <div className="border-2 border-dashed border-gray-300 rounded p-3 text-center hover:border-gold-500 transition-colors cursor-pointer">
                                        <p className="text-sm text-gray-500">Drag & drop or <span className="text-gold-600 font-medium">browse</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
                            <button onClick={() => setIsPostJournalOpen(false)} className="px-4 py-2 border border-gray-300 rounded text-gray-700 text-sm font-medium hover:bg-gray-100">Cancel</button>
                            <button onClick={() => { setIsPostJournalOpen(false); alert('Journal entry submitted for approval!'); }} className="px-4 py-2 bg-navy-900 text-white rounded text-sm font-medium shadow hover:bg-navy-800">Submit for Approval</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Period Close Modal */}
            {isPeriodCloseOpen && (
                <div className="fixed inset-0 bg-navy-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
                        <h3 className="text-lg font-bold text-navy-900 mb-4">Period Close</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Period *</label>
                                <select className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none">
                                    <option>February 2026</option><option>January 2026</option><option>December 2025</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Funds</label>
                                <select className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none">
                                    <option>All Funds</option>
                                    {mockFunds.map(f => <option key={f.id}>{f.name}</option>)}
                                </select>
                            </div>
                            <div className="bg-warning-bg border border-warning/20 rounded p-3 text-xs text-warning font-medium">⚠️ This will lock all transactions for the selected period. This action requires checker approval.</div>
                        </div>
                        <div className="flex justify-end space-x-3 mt-6">
                            <button onClick={() => setIsPeriodCloseOpen(false)} className="px-4 py-2 border border-gray-300 rounded text-gray-700 text-sm font-medium hover:bg-gray-100">Cancel</button>
                            <button onClick={() => { setIsPeriodCloseOpen(false); alert('Period close submitted for approval!'); }} className="px-4 py-2 bg-navy-900 text-white rounded text-sm font-medium shadow hover:bg-navy-800">Submit for Approval</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Generate Statements Modal */}
            {isGenStatementsOpen && (
                <div className="fixed inset-0 bg-navy-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
                        <h3 className="text-lg font-bold text-navy-900 mb-4">Generate Financial Statements</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Statement Type</label>
                                <div className="space-y-2">
                                    {['Income Statement', 'Balance Sheet', 'Cash Flow Statement', 'Trial Balance', 'All Statements'].map(s => (
                                        <label key={s} className="flex items-center text-sm text-gray-700"><input type="checkbox" className="mr-2 rounded border-gray-300 text-gold-500 focus:ring-gold-500" defaultChecked={s === 'All Statements'} />{s}</label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
                                <select className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none">
                                    <option>YTD Feb 2026</option><option>January 2026</option><option>Q4 2025</option><option>FY 2025</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
                                <select className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none">
                                    <option>PDF</option><option>Excel</option><option>CSV</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3 mt-6">
                            <button onClick={() => setIsGenStatementsOpen(false)} className="px-4 py-2 border border-gray-300 rounded text-gray-700 text-sm font-medium hover:bg-gray-100">Cancel</button>
                            <button onClick={() => { setIsGenStatementsOpen(false); alert('Statements generated successfully!'); }} className="px-4 py-2 bg-navy-900 text-white rounded text-sm font-medium shadow hover:bg-navy-800">Generate</button>
                        </div>
                    </div>
                </div>
            )}
        </AppShell>
    );
}
