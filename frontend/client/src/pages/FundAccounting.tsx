import React, { useState, useEffect } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { StatusBadge } from '../components/ui/StatusBadge';
import { ModuleHeader } from '../components/layout/ModuleHeader';
import { mockJournalEntries, mockTrialBalance, mockFunds } from '../data/mockData';
import {
    PlusIcon, DownloadIcon, CheckCircleIcon, CalendarIcon,
    FilterIcon, SearchIcon, FileTextIcon, AlertIcon,
    RefreshIcon, ChevronRightIcon, ArrowRightIcon, BarChartIcon,
    PieChartIcon, TrendingUpIcon, cn
} from '../components/icons/Icons';
import { TableToolbar, TablePagination, useTableControls } from '../components/ui/TableControls';
import { useLocation } from 'wouter';

export default function FundAccounting() {
    const [, navigate] = useLocation();
    const [activeTab, setActiveTab] = useState('Journal Entries');
    const [isPostJournalOpen, setIsPostJournalOpen] = useState(false);
    const [isPeriodCloseOpen, setIsPeriodCloseOpen] = useState(false);
    const [isGenStatementsOpen, setIsGenStatementsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [pendingCount, setPendingCount] = useState(5);
    const [entries, setEntries] = useState(mockJournalEntries);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const tabs = ['Journal Entries', 'Trial Balance', 'Income Statement', 'Balance Sheet', 'Cash Flow'];

    const totalDebit = mockTrialBalance.reduce((s, r) => s + r.debit, 0);
    const totalCredit = mockTrialBalance.reduce((s, r) => s + r.credit, 0);

    const jeCtrl = useTableControls(entries, 10, ['description', 'id', 'fund']);
    const jeExport = entries.map(je => ({
        'Journal ID': je.id, Date: je.date, Fund: je.fund, Description: je.description,
        'Dr Account': je.drAccount, 'Cr Account': je.crAccount, 'Amount (₦)': je.amount, Source: je.sourceModule,
    }));

    const tbCtrl = useTableControls(mockTrialBalance, 15);
    const tbExport = mockTrialBalance.map(r => ({
        Account: r.account, Group: r.group, 'Debit (₦)': r.debit, 'Credit (₦)': r.credit,
    }));

    const handleApprove = (id: string) => {
        setEntries(prev => prev.map(je => je.id === id ? { ...je, status: 'Posted' } : je));
        setPendingCount(prev => Math.max(0, prev - 1));
        alert(`Journal ${id} approved and posted to General Ledger.`);
    };

    return (
        <AppShell>
            <div className="space-y-6 pb-12">
                <ModuleHeader
                    title="Fund Accounting"
                    description="General Ledger control, automated accruals, and financial period management."
                    metrics={[
                        { label: 'Total Funds', value: '8', trend: 'Active', isPositive: true },
                        { label: 'Net Assets', value: '₦85.4B', trend: '+1.2%', isPositive: true },
                        { label: 'Open Period', value: 'FEB 26', trend: 'Current', isPositive: true },
                        { label: 'Pending Auth', value: pendingCount.toString(), trend: 'Maker-Checker', isPositive: false },
                    ]}
                />

                <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex space-x-1">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "px-6 py-2.5 text-[12px] font-bold uppercase tracking-widest transition-all border-b-2 whitespace-nowrap",
                                    activeTab === tab
                                        ? "border-navy-900 text-navy-900 bg-navy-50/30"
                                        : "border-transparent text-gray-400 hover:text-navy-700 hover:bg-gray-50"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="flex space-x-3">
                        <button
                            onClick={() => setIsPostJournalOpen(true)}
                            className="px-4 py-2 bg-navy-900 text-white rounded-lg text-[12px] font-bold hover:bg-navy-800 shadow-sm transition-all flex items-center"
                        >
                            <PlusIcon className="w-4 h-4 mr-2" /> Post Journal
                        </button>
                        <button
                            onClick={() => setIsPeriodCloseOpen(true)}
                            className="px-4 py-2 bg-white border border-gray-200 text-navy-900 rounded-lg text-[12px] font-bold hover:bg-gray-50 shadow-sm transition-all"
                        >
                            Period Close
                        </button>
                        <button
                            onClick={() => setIsGenStatementsOpen(true)}
                            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-[12px] font-bold hover:bg-gray-50 flex items-center shadow-sm text-gray-500 transition-all"
                        >
                            <FileTextIcon className="w-4 h-4 mr-2" /> Reports
                        </button>
                    </div>
                </div>

                <div className="min-h-[500px]">
                    {isLoading ? (
                        <div className="p-20 flex flex-col items-center justify-center space-y-4">
                            <div className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Loading Ledger Data...</p>
                        </div>
                    ) : (
                        <>
                            {activeTab === 'Journal Entries' && (
                                <div className="table-datagrid-container">
                                    <div className="p-5 border-b border-gray-100 bg-white/50 flex justify-between items-center">
                                        <div>
                                            <h3 className="font-bold text-navy-900 text-sm uppercase tracking-wider">General Ledger Register</h3>
                                            <p className="text-[11px] text-gray-400 font-medium mt-0.5">Full transaction history and audit trail for all accounts</p>
                                        </div>
                                        <TableToolbar
                                            searchValue={jeCtrl.search}
                                            onSearchChange={jeCtrl.setSearch}
                                            onRefresh={() => { }}
                                            exportData={jeExport}
                                            exportFilename="journal_entries"
                                        />
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="table-datagrid">
                                            <thead>
                                                <tr>
                                                    <th className="w-12 text-center text-[10px] text-gray-300">#</th>
                                                    <th>Date & ID</th>
                                                    <th>Fund/Entity</th>
                                                    <th>Type</th>
                                                    <th className="w-[300px]">Description</th>
                                                    <th>Dr Account</th>
                                                    <th>Cr Account</th>
                                                    <th className="text-right">Amount (₦)</th>
                                                    <th className="text-center">Status</th>
                                                    <th className="text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {jeCtrl.paged.map((je, idx) => (
                                                    <tr key={je.id} className="hover:bg-gray-50/50 transition-colors">
                                                        <td className="text-center text-[10px] font-mono text-gray-400">{(jeCtrl.page - 1) * jeCtrl.pageSize + idx + 1}</td>
                                                        <td>
                                                            <div className="font-mono text-[11px] font-bold text-navy-900">{je.date}</div>
                                                            <div className="text-[9px] text-gray-400 font-medium">{je.id}</div>
                                                        </td>
                                                        <td className="font-bold text-navy-900 text-[12px]">{je.fund}</td>
                                                        <td>
                                                            <span className="text-[9px] bg-gray-100 text-gray-600 font-bold px-1.5 py-0.5 rounded uppercase">
                                                                {je.type || 'Automated'}
                                                            </span>
                                                        </td>
                                                        <td className="text-[11px] text-gray-600 font-medium leading-relaxed">{je.description}</td>
                                                        <td className="text-[11px] text-navy-700 font-bold">{je.drAccount}</td>
                                                        <td className="text-[11px] text-navy-700 font-bold">{je.crAccount}</td>
                                                        <td className="text-right font-mono font-bold text-navy-900 text-[12px]">
                                                            {je.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                                        </td>
                                                        <td className="text-center">
                                                            <StatusBadge status={je.status || 'Posted'} />
                                                        </td>
                                                        <td className="text-right">
                                                            <div className="flex justify-end space-x-2">
                                                                {je.status === 'Pending Approval' ? (
                                                                    <>
                                                                        <button
                                                                            onClick={() => handleApprove(je.id)}
                                                                            className="p-1 px-2 bg-success/10 text-success rounded text-[10px] font-bold hover:bg-success hover:text-white transition-all"
                                                                        >
                                                                            Approve
                                                                        </button>
                                                                        <button className="p-1 px-2 bg-danger/10 text-danger rounded text-[10px] font-bold hover:bg-danger hover:text-white transition-all">
                                                                            Reject
                                                                        </button>
                                                                    </>
                                                                ) : (
                                                                    <button className="text-navy-900 hover:text-gold-600 transition-colors">
                                                                        <ChevronRightIcon className="w-4 h-4" />
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <TablePagination currentPage={jeCtrl.page} totalItems={jeCtrl.totalItems} pageSize={jeCtrl.pageSize} onPageChange={jeCtrl.setPage} />
                                </div>
                            )}

                            {activeTab === 'Trial Balance' && (
                                <div className="table-datagrid-container">
                                    <div className="p-5 border-b border-gray-100 bg-white/50 flex justify-between items-center">
                                        <div>
                                            <h3 className="font-bold text-navy-900 text-sm uppercase tracking-wider">Trial Balance Report</h3>
                                            <p className="text-[11px] text-gray-400 font-medium mt-0.5">Aggregated GL balances as at 21 Feb 2026</p>
                                        </div>
                                        <TableToolbar searchValue={tbCtrl.search} onSearchChange={tbCtrl.setSearch} onRefresh={() => { }} exportData={tbExport} exportFilename="trial_balance" />
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="table-datagrid">
                                            <thead>
                                                <tr>
                                                    <th className="w-12 text-center text-[10px] text-gray-300">#</th>
                                                    <th>Ledger Account</th>
                                                    <th>Classification</th>
                                                    <th className="text-right">Debit (₦)</th>
                                                    <th className="text-right">Credit (₦)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tbCtrl.paged.map((row, i) => (
                                                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                                        <td className="text-center text-[10px] font-mono text-gray-400">{(tbCtrl.page - 1) * tbCtrl.pageSize + i + 1}</td>
                                                        <td className="font-bold text-navy-900 text-[12px] uppercase">{row.account}</td>
                                                        <td>
                                                            <span className={cn(
                                                                "text-[9px] font-bold px-2 py-0.5 rounded uppercase",
                                                                row.group === 'Assets' ? 'bg-navy-100 text-navy-700' :
                                                                    row.group === 'Liabilities' ? 'bg-warning-bg text-warning' :
                                                                        row.group === 'Income' ? 'bg-success-bg text-success' : 'bg-danger-bg text-danger'
                                                            )}>
                                                                {row.group}
                                                            </span>
                                                        </td>
                                                        <td className="text-right font-mono font-bold text-navy-900">{row.debit > 0 ? row.debit.toLocaleString(undefined, { minimumFractionDigits: 2 }) : '—'}</td>
                                                        <td className="text-right font-mono font-bold text-navy-900">{row.credit > 0 ? row.credit.toLocaleString(undefined, { minimumFractionDigits: 2 }) : '—'}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            <tfoot className="bg-navy-900 text-white font-mono">
                                                <tr>
                                                    <td className="p-4 font-bold uppercase text-[12px]" colSpan={3}>Consolidated Totals</td>
                                                    <td className="p-4 text-right font-bold text-lg">₦{totalDebit.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                                    <td className="p-4 text-right font-bold text-lg">₦{totalCredit.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <TablePagination currentPage={tbCtrl.page} totalItems={tbCtrl.totalItems} pageSize={tbCtrl.pageSize} onPageChange={tbCtrl.setPage} />
                                </div>
                            )}

                            {activeTab === 'Income Statement' && (
                                <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
                                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                                        <div className="p-8 border-b border-gray-50 bg-gray-50/30 text-center">
                                            <h3 className="text-xl font-bold text-navy-900 uppercase tracking-tight">Statement of Comprehensive Income</h3>
                                            <p className="text-[12px] text-gray-500 font-medium uppercase mt-1 tracking-widest">For the Period Ended 21 Feb 2026</p>
                                        </div>
                                        <div className="p-8 space-y-10">
                                            <div>
                                                <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 border-b border-gray-50 pb-2">Revenue Streams</h4>
                                                <div className="space-y-4">
                                                    {[{ label: 'Management Fee Income', amount: 486250000 }, { label: 'Interest Income', amount: 625000000 }, { label: 'Dividend Income', amount: 185000000 }].map(item => (
                                                        <div key={item.label} className="flex justify-between items-center group">
                                                            <span className="text-[13px] text-gray-600 font-bold">{item.label}</span>
                                                            <span className="font-mono font-bold text-navy-900 text-[14px]">₦{item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                                        </div>
                                                    ))}
                                                    <div className="flex justify-between items-center font-bold border-t border-gray-100 pt-4 mt-4">
                                                        <span className="text-navy-900 text-[13px] uppercase">Gross Revenue</span>
                                                        <span className="font-mono text-navy-900 text-lg">₦{(1296250000).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="text-[11px] font-bold text-danger/50 uppercase tracking-[0.2em] mb-4 border-b border-gray-50 pb-2">Operational Expenses</h4>
                                                <div className="space-y-4">
                                                    {[{ label: 'Brokerage Expense', amount: 42500000 }, { label: 'Custody Fees', amount: 18000000 }, { label: 'Audit & Professional', amount: 15000000 }, { label: 'Other Operating', amount: 8500000 }].map(item => (
                                                        <div key={item.label} className="flex justify-between items-center group">
                                                            <span className="text-[13px] text-gray-500 font-medium">{item.label}</span>
                                                            <span className="font-mono font-bold text-danger/70 text-[14px]">(₦{item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })})</span>
                                                        </div>
                                                    ))}
                                                    <div className="flex justify-between items-center font-bold border-t border-gray-100 pt-4 mt-4">
                                                        <span className="text-danger text-[13px] uppercase">Total Operating Expenses</span>
                                                        <span className="font-mono text-danger text-lg">₦{(84000000).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-navy-900 rounded-xl p-6 text-white flex justify-between items-center shadow-lg shadow-navy-900/10">
                                                <div>
                                                    <p className="text-[10px] font-bold text-gold-500 uppercase tracking-[0.2em] mb-1">Functional Net Profit</p>
                                                    <h4 className="text-xl font-bold uppercase tracking-tight">Period Net Income</h4>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-mono font-bold text-3xl text-success tracking-tighter">₦{(1212250000).toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center">
                                        <button onClick={() => setIsGenStatementsOpen(true)} className="flex items-center text-[12px] font-bold text-gold-600 hover:text-gold-500 transition-colors uppercase tracking-widest">
                                            <DownloadIcon className="w-4 h-4 mr-2" /> Download Full Performance Report
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'Balance Sheet' && (
                                <div className="p-20 text-center flex flex-col items-center">
                                    <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                        <FileTextIcon className="w-6 h-6 text-gray-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-navy-900 uppercase tracking-tight mb-2">Statement of Financial Position</h3>
                                    <p className="text-[13px] text-gray-500 font-medium max-w-sm mx-auto leading-relaxed">
                                        Consolidated balance sheet is currently under review for the FEB-26 close.
                                        Detailed account splits available in Trial Balance.
                                    </p>
                                    <button onClick={() => setActiveTab('Trial Balance')} className="mt-8 px-6 py-2.5 bg-navy-900 text-white rounded-lg text-[12px] font-bold uppercase tracking-widest hover:bg-navy-800 shadow-sm transition-all">
                                        View Trial Balance Instead
                                    </button>
                                </div>
                            )}

                            {activeTab === 'Cash Flow' && (
                                <div className="p-20 text-center flex flex-col items-center">
                                    <div className="w-14 h-14 bg-gold-50 rounded-full flex items-center justify-center mb-6">
                                        <TrendingUpIcon className="w-6 h-6 text-gold-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-navy-900 uppercase tracking-tight mb-2">Statement of Cash Flows</h3>
                                    <p className="text-[13px] text-gray-500 font-medium max-w-sm mx-auto leading-relaxed">
                                        Real-time tracking of uninvested capital movements and redemptions.
                                        Historical period comparison available post-close.
                                    </p>
                                    <button onClick={() => setIsGenStatementsOpen(true)} className="mt-8 px-6 py-2.5 bg-white border border-gray-100 text-navy-900 rounded-lg text-[12px] font-bold uppercase tracking-widest hover:bg-gray-50 shadow-sm transition-all">
                                        Generate CF Statement
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
                    {mockFunds.map(fund => (
                        <div key={fund.id} onClick={() => navigate(`/fund/${fund.id}`)} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all cursor-pointer group">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-navy-900 transition-colors leading-none">{fund.name.replace('ValuAlliance ', '')}</h3>
                                <StatusBadge status="Active" />
                            </div>
                            <div className="space-y-2.5">
                                <div className="flex justify-between text-[11px] font-bold">
                                    <span className="text-gray-400 uppercase tracking-wider">NAV Basis</span>
                                    <span className="text-navy-900 font-mono tracking-tighter">₦{(fund.aum / 1e9).toFixed(2)}B</span>
                                </div>
                                <div className="flex justify-between text-[11px] font-bold">
                                    <span className="text-gray-400 uppercase tracking-wider">YTD Surplus</span>
                                    <span className="text-success font-mono tracking-tighter">+₦482M</span>
                                </div>
                                <div className="pt-3 border-t border-gray-50 flex items-center justify-between text-[10px] font-bold uppercase text-gold-600">
                                    <span className="tracking-widest">Drill-down</span>
                                    <ChevronRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isPostJournalOpen && <PostJournalModal onClose={() => setIsPostJournalOpen(false)} />}
            {isPeriodCloseOpen && <PeriodCloseModal onClose={() => setIsPeriodCloseOpen(false)} />}
            {isGenStatementsOpen && <GenerateStatementsModal onClose={() => setIsGenStatementsOpen(false)} />}
        </AppShell>
    );
}

// --- Modals ---

function PostJournalModal({ onClose }: any) {
    const [drAmount, setDrAmount] = useState<string>('');
    const [crAmount, setCrAmount] = useState<string>('');
    const [isBalanced, setIsBalanced] = useState(true);

    useEffect(() => {
        if (drAmount && crAmount) {
            setIsBalanced(Math.abs(Number(drAmount) - Number(crAmount)) < 0.01);
        } else {
            setIsBalanced(true);
        }
    }, [drAmount, crAmount]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isBalanced) return;
        alert('Manual journal entry submitted for approval.');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-navy-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
                <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h3 className="text-lg font-bold text-navy-900 uppercase tracking-tight">Post Manual Journal Entry</h3>
                        <p className="text-[11px] text-gray-500 font-medium uppercase mt-0.5 tracking-wider">General Ledger Adjustment Workflow</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-navy-900 text-xl font-bold transition-colors">&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="p-8 overflow-y-auto flex-1 space-y-8">
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Fund/Portfolio Account *</label>
                            <select className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-2.5 text-[13px] font-bold text-navy-900 focus:ring-2 focus:ring-navy-900/10 outline-none hover:border-gray-200 transition-all appearance-none cursor-pointer">
                                <option>Select Fund Account...</option>
                                {mockFunds.map(f => <option key={f.id}>{f.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Posting Date *</label>
                            <input type="date" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-2.5 text-[13px] font-mono font-bold text-navy-900 focus:ring-2 focus:ring-navy-900/10 outline-none transition-all hover:bg-white" defaultValue="2026-02-27" />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-5 gap-4 items-end">
                            <div className="col-span-3">
                                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Debit Account Line (Dr)</label>
                                <select className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-2.5 text-[13px] font-bold text-navy-900">
                                    <option>Select Component Account...</option>
                                    <option>Cash & Bank Balances</option><option>Equity Portfolio</option><option>Accrued Expenses</option>
                                </select>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Amount (₦)</label>
                                <input
                                    type="number"
                                    value={drAmount}
                                    onChange={e => setDrAmount(e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[13px] font-mono font-bold text-navy-900 focus:ring-2 focus:ring-navy-900/10 outline-none"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-5 gap-4 items-end">
                            <div className="col-span-3">
                                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Credit Account Line (Cr)</label>
                                <select className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-2.5 text-[13px] font-bold text-navy-900">
                                    <option>Select Component Account...</option>
                                    <option>Management Fee Income</option><option>Unitholders Capital</option><option>Bank Overdraft</option>
                                </select>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Amount (₦)</label>
                                <input
                                    type="number"
                                    value={crAmount}
                                    onChange={e => setCrAmount(e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[13px] font-mono font-bold text-navy-900 focus:ring-2 focus:ring-navy-900/10 outline-none"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>
                    </div>

                    {!isBalanced && (
                        <div className="bg-danger/5 border border-danger/10 rounded-lg p-3.5 flex items-center space-x-3">
                            <AlertIcon className="w-4 h-4 text-danger shrink-0" />
                            <p className="text-[11px] font-bold text-danger uppercase tracking-wider">Unbalanced Entry: Total Debits must equal Total Credits to post.</p>
                        </div>
                    )}

                    <div>
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Transaction Narrative/Memo *</label>
                        <textarea
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-[13px] text-gray-700 font-medium focus:ring-2 focus:ring-navy-900/10 outline-none transition-all lg:max-h-24"
                            rows={3}
                            placeholder="Detailed explanation for audit/compliance trail..."
                        />
                    </div>
                </form>
                <div className="px-8 py-6 border-t border-gray-100 bg-gray-50/50 flex justify-end space-x-4">
                    <button onClick={onClose} className="px-6 py-2.5 text-navy-900 text-[12px] font-bold uppercase tracking-widest hover:text-navy-700">Cancel</button>
                    <button
                        onClick={handleSubmit}
                        disabled={!isBalanced || !drAmount}
                        className={cn(
                            "px-8 py-2.5 rounded-lg text-[12px] font-bold uppercase tracking-widest shadow-sm transition-all",
                            isBalanced && drAmount ? "bg-navy-900 text-white hover:bg-navy-800" : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        )}
                    >
                        Submit Entry
                    </button>
                </div>
            </div>
        </div>
    );
}

function PeriodCloseModal({ onClose }: any) {
    const checklist = [
        { id: 1, label: "Daily journals posted for active period", done: true },
        { id: 2, label: "Bank statements reconciled to GL", done: true },
        { id: 3, label: "Accruals and Prepayments adjusted", done: true },
        { id: 4, label: "Balance sheet integrity verified", done: true },
        { id: 5, label: "System structural health check", done: false },
    ];

    return (
        <div className="fixed inset-0 bg-navy-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-10 flex flex-col text-center animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 bg-navy-900 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircleIcon className="w-8 h-8 text-gold-500" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 uppercase tracking-tight">Period Closing Engine</h3>
                <p className="text-[12px] text-gray-500 font-bold uppercase mt-1 tracking-widest">Phase: FEB 2026 SUBMISSION</p>

                <div className="mt-8 space-y-3.5 text-left">
                    {checklist.map(item => (
                        <div key={item.id} className="flex items-center p-3.5 bg-gray-50 rounded-lg border border-gray-100 group transition-all">
                            <div className={cn(
                                "w-5 h-5 rounded flex items-center justify-center",
                                item.done ? "bg-success text-white" : "bg-gray-200"
                            )}>
                                {item.done && <CheckCircleIcon className="w-3.5 h-3.5" />}
                            </div>
                            <span className={cn(
                                "ml-3.5 text-[12px] font-bold transition-colors",
                                item.done ? "text-navy-900" : "text-gray-400"
                            )}>{item.label}</span>
                        </div>
                    ))}
                </div>

                <div className="my-10 p-4 border border-warning/20 rounded-lg text-left flex space-x-4 bg-warning/5">
                    <AlertIcon className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                    <p className="text-[10px] font-bold text-warning-700 uppercase leading-relaxed tracking-wider">
                        Locking this period is a final action. No further entries can be made without administrator override.
                    </p>
                </div>

                <div className="flex flex-col space-y-3">
                    <button
                        onClick={() => { alert('Accounting Period February 2026 now closed.'); onClose(); }}
                        className="w-full py-3.5 bg-navy-900 text-white rounded-lg text-[12px] font-bold uppercase tracking-widest shadow-lg shadow-navy-900/10 hover:bg-navy-800 transition-all active:scale-[0.98]"
                    >
                        Secure & Finalize Period
                    </button>
                    <button onClick={onClose} className="w-full py-3 text-gray-400 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:text-navy-900">
                        Cancel Close
                    </button>
                </div>
            </div>
        </div>
    );
}

function GenerateStatementsModal({ onClose }: any) {
    const [format, setFormat] = useState('PDF');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            alert(`Statements generated in ${format} format.`);
            onClose();
        }, 1200);
    };

    return (
        <div className="fixed inset-0 bg-navy-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-10 animate-in zoom-in-95 duration-300">
                <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-6">
                    <h3 className="text-xl font-bold text-navy-900 uppercase tracking-tight">Statement Engine</h3>
                    <StatusBadge status="Ready" />
                </div>

                <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-4">
                        {['Income Statement', 'Balance Sheet', 'Cash Flow', 'Trial Balance'].map(s => (
                            <label key={s} className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100 cursor-pointer hover:border-navy-900/10 transition-all select-none">
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-navy-900 focus:ring-navy-900" defaultChecked />
                                <span className="ml-3.5 text-[12px] font-bold text-navy-900 uppercase tracking-widest leading-none">{s}</span>
                            </label>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-6 pt-2">
                        <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Reporting Period</label>
                            <select className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-2.5 text-[13px] font-bold text-navy-900 outline-none hover:bg-white cursor-pointer transition-all">
                                <option>YTD FEB 2026</option>
                                <option>Q1 2026</option>
                                <option>FY 2025</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Export Format</label>
                            <div className="flex bg-gray-100 p-1 rounded-lg">
                                {['PDF', 'EXCEL', 'CSV'].map(fmt => (
                                    <button
                                        key={fmt}
                                        onClick={() => setFormat(fmt)}
                                        className={cn(
                                            "flex-1 py-1.5 text-[10px] font-bold rounded transition-all",
                                            format === fmt ? "bg-white text-navy-900 shadow-sm" : "text-gray-500 hover:text-navy-900"
                                        )}
                                    >
                                        {fmt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-gray-100 flex space-x-4">
                        <button onClick={onClose} className="flex-1 py-3 border border-gray-200 rounded-lg text-[12px] font-bold uppercase tracking-widest text-gray-400 hover:text-navy-900 transition-all">
                            Discard
                        </button>
                        <button
                            onClick={handleGenerate}
                            className="flex-2 py-3 bg-navy-900 text-white rounded-lg text-[12px] font-bold uppercase tracking-widest shadow-lg shadow-navy-900/10 hover:bg-navy-800 flex items-center justify-center transition-all min-w-[200px]"
                        >
                            {isGenerating ? <RefreshIcon className="w-4 h-4 animate-spin mr-2" /> : <DownloadIcon className="w-4 h-4 mr-2" />}
                            {isGenerating ? 'Compiling...' : 'Generate Batch'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
