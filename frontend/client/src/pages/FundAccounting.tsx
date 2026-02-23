import React, { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { mockJournalEntries, mockTrialBalance } from '../data/mockData';
import { cn } from '../components/icons/Icons';

export default function FundAccounting() {
    const [activeTab, setActiveTab] = useState('Journal Entries');
    const tabs = ['Journal Entries', 'Trial Balance', 'Income Statement', 'Cash Flow'];

    const totalDebit = mockTrialBalance.reduce((s, r) => s + r.debit, 0);
    const totalCredit = mockTrialBalance.reduce((s, r) => s + r.credit, 0);

    return (
        <AppShell>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-navy-900">Fund Accounting & Financial Management</h1>
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-navy-900 text-white rounded text-sm font-medium hover:bg-navy-800 shadow-sm">Post Journal</button>
                        <button className="px-4 py-2 bg-white border border-gray-200 rounded text-gray-600 text-sm font-medium hover:bg-gray-50 shadow-sm">Period Close</button>
                        <button className="px-4 py-2 bg-white border border-gray-200 rounded text-gray-600 text-sm font-medium hover:bg-gray-50 shadow-sm">Generate Statements</button>
                    </div>
                </div>

                <div className="flex space-x-6 border-b border-gray-200">
                    {tabs.map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={cn("pb-3 text-sm font-semibold transition-colors border-b-2", activeTab === tab ? "border-gold-500 text-navy-900" : "border-transparent text-gray-500 hover:text-navy-700")}>{tab}</button>
                    ))}
                </div>

                {activeTab === 'Journal Entries' && (
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                                    <tr>
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
                                    {mockJournalEntries.map(je => (
                                        <tr key={je.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4 font-mono text-xs font-semibold text-navy-700">{je.id}</td>
                                            <td className="p-4 font-mono text-gray-600">{je.date}</td>
                                            <td className="p-4 text-gray-700">{je.fund}</td>
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
                    </div>
                )}

                {activeTab === 'Trial Balance' && (
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                            <h3 className="font-semibold text-navy-900 text-sm">Trial Balance — All Funds — 21 Feb 2026</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                                    <tr>
                                        <th className="p-4 font-medium">Account</th>
                                        <th className="p-4 font-medium">Group</th>
                                        <th className="p-4 font-medium text-right">Debit (₦)</th>
                                        <th className="p-4 font-medium text-right">Credit (₦)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {mockTrialBalance.map((row, i) => (
                                        <tr key={i} className="hover:bg-gray-50 transition-colors">
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
                                        <td className="p-4 font-bold" colSpan={2}>TOTALS</td>
                                        <td className="p-4 text-right font-mono font-bold">{totalDebit.toLocaleString()}</td>
                                        <td className="p-4 text-right font-mono font-bold">{totalCredit.toLocaleString()}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
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
        </AppShell>
    );
}
