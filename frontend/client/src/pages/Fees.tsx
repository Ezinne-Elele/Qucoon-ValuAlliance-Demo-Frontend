import React, { useState, useEffect } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { StatusBadge } from '../components/ui/StatusBadge';
import { ModuleHeader } from '../components/layout/ModuleHeader';
import {
    PlusIcon, DownloadIcon, FileTextIcon, HistoryIcon,
    SearchIcon, FilterIcon, RefreshIcon, ChevronRightIcon,
    AlertIcon, NairaIcon, TrendingUpIcon, EyeIcon,
    ClockIcon, ShieldCheckIcon, BriefcaseIcon, cn
} from '../components/icons/Icons';
import { TableToolbar, TablePagination, useTableControls } from '../components/ui/TableControls';
import {
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
    CartesianGrid, Tooltip, Legend, AreaChart, Area
} from 'recharts';
import { useLocation } from 'wouter';

// --- Static Mock Data ---

const mockFeeSchedule = [
    {
        id: 'FS-001',
        clientOrFund: 'ValuAlliance Value Fund',
        feeType: 'Management',
        rate: '1.50% p.a.',
        basis: 'Average AUM',
        cycle: 'Daily Accrual / Quarterly',
        accruedYTD: 125400000,
        invoicedYTD: 85200000,
        outstanding: 40200000,
        status: 'Active',
        lastInvoice: '2025-12-31',
        description: 'Standard management fee based on daily average NAV.'
    },
    {
        id: 'FS-002',
        clientOrFund: 'ValuAlliance Money Market Fund',
        feeType: 'Management',
        rate: '1.25% p.a.',
        basis: 'Average AUM',
        cycle: 'Daily Accrual / Monthly',
        accruedYTD: 85000000,
        invoicedYTD: 78000000,
        outstanding: 7000000,
        status: 'Active',
        lastInvoice: '2026-01-31',
        description: 'Monthly management fee for low-risk liquidity fund.'
    },
    {
        id: 'FS-003',
        clientOrFund: 'ARM Pension Equity Mandate',
        feeType: 'Performance',
        rate: '15.00% of Alpha',
        basis: 'Excess Return > 12% p.a.',
        cycle: 'Annual',
        accruedYTD: 45800000,
        invoicedYTD: 0,
        outstanding: 45800000,
        status: 'Active',
        lastInvoice: 'N/A',
        description: 'Incentive fee triggered when portfolio return exceeds the 12% benchmark hurdle.'
    },
    {
        id: 'FS-004',
        clientOrFund: 'High-Net-Worth Client XYZ',
        feeType: 'Management',
        rate: '0.75% p.a.',
        basis: 'Portfolio Value',
        cycle: 'Quarterly',
        accruedYTD: 12500000,
        invoicedYTD: 8200000,
        outstanding: 4300000,
        status: 'Active',
        lastInvoice: '2025-12-31',
        description: 'Bespoke wealth management fee tailored for private mandates.'
    },
    {
        id: 'FS-005',
        clientOrFund: 'Legacy Insurance Mandate',
        feeType: 'Custody',
        rate: '0.05% p.a.',
        basis: 'Assets under Custody',
        cycle: 'Monthly',
        accruedYTD: 3200000,
        invoicedYTD: 2800000,
        outstanding: 400000,
        status: 'Active',
        lastInvoice: '2026-01-31',
        description: 'Sub-custody and safekeeping fee for fixed income securities.'
    },
    {
        id: 'FS-006',
        clientOrFund: 'Blue-Chip Corporate Portfolio',
        feeType: 'Management',
        rate: '1.00% p.a.',
        basis: 'Average AUM',
        cycle: 'Quarterly',
        accruedYTD: 62000000,
        invoicedYTD: 62000000,
        outstanding: 0,
        status: 'Active',
        lastInvoice: '2025-12-31'
    },
    {
        id: 'FS-007',
        clientOrFund: 'Infrastructure Fund I',
        feeType: 'Setup',
        rate: '₦5.0M Fixed',
        basis: 'One-time',
        cycle: 'Immediate',
        accruedYTD: 5000000,
        invoicedYTD: 0,
        outstanding: 5000000,
        status: 'Pending Review',
        lastInvoice: 'N/A'
    },
    {
        id: 'FS-008',
        clientOrFund: 'Redemption Exit Portfolio',
        feeType: 'Exit Load',
        rate: '2.00%',
        basis: 'Redemption Amount',
        cycle: 'Ad-hoc',
        accruedYTD: 1200000,
        invoicedYTD: 0,
        outstanding: 1200000,
        status: 'Active',
        lastInvoice: 'N/A'
    },
];

const mockInvoices = [
    { id: 'INV-2026-001', client: 'ValuAlliance Value Fund', period: 'Q4 2025', amount: 85200000, issued: '2026-01-05', due: '2026-02-05', status: 'Paid', daysOverdue: 0 },
    { id: 'INV-2026-002', client: 'HNW Client XYZ', period: 'Q4 2025', amount: 8200000, issued: '2026-01-10', due: '2026-02-10', status: 'Paid', daysOverdue: 0 },
    { id: 'INV-2026-003', client: 'Money Market Fund', period: 'JAN 2026', amount: 12400000, issued: '2026-02-02', due: '2026-03-02', status: 'Pending', daysOverdue: 0 },
    { id: 'INV-2026-004', client: 'Insurance Mandate', period: 'JAN 2026', amount: 980000, issued: '2026-02-05', due: '2026-03-05', status: 'Pending', daysOverdue: 0 },
    { id: 'INV-2025-982', client: 'Suspended Account B', period: 'Q3 2025', amount: 45800000, issued: '2025-10-15', due: '2025-11-15', status: 'Overdue', daysOverdue: 104 },
];

const mockAccrualStats = [
    { name: 'Jan', management: 120.5, performance: 0, custody: 8.2 },
    { name: 'Feb', management: 125.8, performance: 45.8, custody: 8.5 },
    { name: 'Mar', management: 132.1, performance: 12.5, custody: 9.1 },
    { name: 'Apr', management: 128.4, performance: 0, custody: 8.8 },
    { name: 'May', management: 141.2, performance: 8.2, custody: 9.4 },
    { name: 'Jun', management: 145.5, performance: 22.1, custody: 9.8 },
];

// --- Main Component ---

export default function Fees() {
    const [, navigate] = useLocation();
    const [activeTab, setActiveTab] = useState('Fee Schedules');
    const [subFilter, setSubFilter] = useState('All');
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
    const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
    const [selectedFee, setSelectedFee] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 600);
        return () => clearTimeout(timer);
    }, []);

    const filteredSchedules = mockFeeSchedule.filter(fee => {
        if (subFilter === 'All') return true;
        if (subFilter === 'Management') return fee.feeType === 'Management';
        if (subFilter === 'Performance') return fee.feeType === 'Performance';
        if (subFilter === 'Overdue') return fee.outstanding > 0;
        if (subFilter === 'Pending') return fee.status === 'Pending Review';
        return true;
    });

    const scheduleCtrl = useTableControls(filteredSchedules, 10, ['clientOrFund', 'feeType']);
    const invoiceCtrl = useTableControls(mockInvoices, 10, ['id', 'client']);

    const handleViewDetail = (fee: any) => {
        setSelectedFee(fee);
        setIsDetailPanelOpen(true);
    };

    const handleGenerateInvoice = () => {
        setIsInvoiceModalOpen(true);
    };

    return (
        <AppShell>
            <div className="space-y-6 pb-12">
                <ModuleHeader
                    title="Fees & Billing"
                    description="Fee structure configuration, automated daily accruals, and invoice management."
                    metrics={[
                        { label: 'Total Accrued YTD', value: '₦1.25B', trend: '+12.4%', isPositive: true },
                        { label: 'Pending Invoices', value: '7', trend: '₦168.4M', isPositive: false },
                        { label: 'Overdue Amount', value: '₦45.8M', trend: 'Critical', isPositive: false },
                        { label: 'Revenue Forecast', value: '₦380M', trend: 'Q2 Est.', isPositive: true },
                        { label: 'Avg Fee Rate', value: '1.48%', trend: 'Blended', isPositive: true },
                    ]}
                />

                <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex space-x-1">
                        {['Fee Schedules', 'Invoices', 'Revenue Metrics'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "px-6 py-2.5 text-[12px] font-bold uppercase tracking-widest transition-all border-b-2",
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
                            onClick={handleGenerateInvoice}
                            className="px-4 py-2 bg-navy-900 text-white rounded-lg text-[12px] font-bold hover:bg-navy-800 shadow-sm transition-all flex items-center"
                        >
                            <PlusIcon className="w-4 h-4 mr-2" /> Generate Invoices
                        </button>
                        <button className="px-4 py-2 bg-white border border-gray-100 text-navy-900 rounded-lg text-[12px] font-bold hover:bg-gray-50 shadow-sm transition-all flex items-center">
                            <DownloadIcon className="w-4 h-4 mr-2" /> Export
                        </button>
                    </div>
                </div>

                <div className="min-h-[500px]">
                    {isLoading ? (
                        <div className="p-20 flex flex-col items-center justify-center space-y-4">
                            <div className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Loading Billing Engine...</p>
                        </div>
                    ) : (
                        <>
                            {activeTab === 'Fee Schedules' && (
                                <div className="space-y-6">
                                    <div className="flex space-x-2">
                                        {['All', 'Management', 'Performance', 'Overdue', 'Pending'].map(filter => (
                                            <button
                                                key={filter}
                                                onClick={() => setSubFilter(filter)}
                                                className={cn(
                                                    "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all",
                                                    subFilter === filter
                                                        ? "bg-navy-900 text-white border-navy-900"
                                                        : "bg-white text-gray-400 border-gray-100 hover:border-gray-300"
                                                )}
                                            >
                                                {filter}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="table-datagrid-container">
                                        <div className="p-5 border-b border-gray-100 bg-white/50 flex justify-between items-center">
                                            <div>
                                                <h3 className="font-bold text-navy-900 text-sm uppercase tracking-wider">Active Fee Schedules</h3>
                                                <p className="text-[11px] text-gray-400 font-medium mt-0.5">Configured billing rules and live accrual tracking.</p>
                                            </div>
                                            <TableToolbar searchValue={scheduleCtrl.search} onSearchChange={scheduleCtrl.setSearch} onRefresh={() => { }} exportData={mockFeeSchedule} exportFilename="fee_schedules" />
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="table-datagrid">
                                                <thead>
                                                    <tr>
                                                        <th className="w-12 text-center">#</th>
                                                        <th>Client / Fund</th>
                                                        <th>Fee Type</th>
                                                        <th>Rate & Basis</th>
                                                        <th>Billing Cycle</th>
                                                        <th className="text-right">Accrued YTD (₦)</th>
                                                        <th className="text-right">Outstanding (₦)</th>
                                                        <th className="text-center">Status</th>
                                                        <th className="text-right">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {scheduleCtrl.paged.map((fee, idx) => (
                                                        <tr key={fee.id} className="hover:bg-gray-50/50 transition-colors">
                                                            <td className="text-center text-[10px] font-mono text-gray-400">{(scheduleCtrl.page - 1) * scheduleCtrl.pageSize + idx + 1}</td>
                                                            <td>
                                                                <div className="font-bold text-navy-900 text-[12px]">{fee.clientOrFund}</div>
                                                                <div className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">{fee.id}</div>
                                                            </td>
                                                            <td>
                                                                <span className={cn(
                                                                    "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                                                                    fee.feeType === 'Management' ? 'bg-navy-50 text-navy-700' :
                                                                        fee.feeType === 'Performance' ? 'bg-gold-50 text-gold-700' : 'bg-gray-100 text-gray-600'
                                                                )}>
                                                                    {fee.feeType}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="text-[11px] font-bold text-navy-900">{fee.rate}</div>
                                                                <div className="text-[10px] text-gray-400 font-medium italic">on {fee.basis}</div>
                                                            </td>
                                                            <td>
                                                                <div className="flex items-center text-[11px] text-gray-500 font-bold">
                                                                    <ClockIcon className="w-3 h-3 mr-1 text-gold-500" />
                                                                    {fee.cycle}
                                                                </div>
                                                            </td>
                                                            <td className="text-right font-mono font-bold text-navy-900 text-[12px]">
                                                                {fee.accruedYTD.toLocaleString()}
                                                            </td>
                                                            <td className="text-right font-mono font-bold text-danger text-[12px]">
                                                                {fee.outstanding > 0 ? fee.outstanding.toLocaleString() : '—'}
                                                            </td>
                                                            <td className="text-center">
                                                                <StatusBadge status={fee.status} />
                                                            </td>
                                                            <td className="text-right">
                                                                <div className="flex justify-end space-x-2">
                                                                    <button onClick={() => handleViewDetail(fee)} className="p-1.5 text-navy-400 hover:text-navy-900 transition-colors" title="View Detail">
                                                                        <EyeIcon className="w-4 h-4" />
                                                                    </button>
                                                                    <button className="p-1.5 text-navy-400 hover:text-navy-900 transition-colors" title="Generate Invoice">
                                                                        <FileTextIcon className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <TablePagination currentPage={scheduleCtrl.page} totalItems={scheduleCtrl.totalItems} pageSize={scheduleCtrl.pageSize} onPageChange={scheduleCtrl.setPage} />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'Invoices' && (
                                <div className="space-y-6">
                                    <div className="table-datagrid-container">
                                        <div className="p-5 border-b border-gray-100 bg-white/50 flex justify-between items-center">
                                            <div>
                                                <h3 className="font-bold text-navy-900 text-sm uppercase tracking-wider">Invoice Tracking & Aging</h3>
                                                <p className="text-[11px] text-gray-400 font-medium mt-0.5">Monitor billing cycles and overdue payments.</p>
                                            </div>
                                            <TableToolbar searchValue={invoiceCtrl.search} onSearchChange={invoiceCtrl.setSearch} onRefresh={() => { }} exportData={mockInvoices} exportFilename="invoices" />
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="table-datagrid">
                                                <thead>
                                                    <tr>
                                                        <th>Invoice ID</th>
                                                        <th>Client / Fund</th>
                                                        <th>Period</th>
                                                        <th className="text-right">Amount (₦)</th>
                                                        <th>Issued</th>
                                                        <th>Due Date</th>
                                                        <th className="text-center">Status</th>
                                                        <th className="text-center">Aging</th>
                                                        <th className="text-right">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {invoiceCtrl.paged.map((inv) => (
                                                        <tr key={inv.id} className={cn("hover:bg-gray-50/50 transition-colors", inv.status === 'Overdue' && "bg-danger/5 hover:bg-danger/10")}>
                                                            <td className="font-mono text-[11px] font-bold text-navy-900">{inv.id}</td>
                                                            <td className="font-bold text-navy-900 text-[12px]">{inv.client}</td>
                                                            <td className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">{inv.period}</td>
                                                            <td className="text-right font-mono font-bold text-navy-900">{inv.amount.toLocaleString()}</td>
                                                            <td className="text-[11px] font-medium text-gray-500">{inv.issued}</td>
                                                            <td className="text-[11px] font-bold text-navy-700">{inv.due}</td>
                                                            <td className="text-center">
                                                                <StatusBadge status={inv.status} />
                                                            </td>
                                                            <td className="text-center">
                                                                {inv.daysOverdue > 0 ? (
                                                                    <span className="text-[10px] font-bold text-danger">{inv.daysOverdue} Days Overdue</span>
                                                                ) : (
                                                                    <span className="text-[10px] font-bold text-success">—</span>
                                                                )}
                                                            </td>
                                                            <td className="text-right">
                                                                <div className="flex justify-end space-x-2">
                                                                    <button className="text-[10px] font-bold text-navy-900 hover:text-gold-600 uppercase tracking-widest">Mark Paid</button>
                                                                    <button className="text-[10px] font-bold text-navy-900 hover:text-gold-600 uppercase tracking-widest">Resend</button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <TablePagination currentPage={invoiceCtrl.page} totalItems={invoiceCtrl.totalItems} pageSize={invoiceCtrl.pageSize} onPageChange={invoiceCtrl.setPage} />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'Revenue Metrics' && (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-500">
                                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                                        <div className="flex justify-between items-center mb-8">
                                            <div>
                                                <h3 className="font-bold text-navy-900 text-sm uppercase tracking-wider">Revenue Breakdown (Millions ₦)</h3>
                                                <p className="text-[11px] text-gray-400 font-bold uppercase mt-1">H1 2026 Monthly Performance</p>
                                            </div>
                                            <div className="p-2 bg-navy-50 rounded text-navy-700">
                                                <TrendingUpIcon className="w-5 h-5" />
                                            </div>
                                        </div>
                                        <div className="h-80">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={mockAccrualStats}>
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 'bold' }} />
                                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontFamily: 'JetBrains Mono' }} />
                                                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                                    <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }} />
                                                    <Bar dataKey="management" name="Management" fill="#0E4535" radius={[4, 4, 0, 0]} />
                                                    <Bar dataKey="performance" name="Performance" fill="#DFA223" radius={[4, 4, 0, 0]} />
                                                    <Bar dataKey="custody" name="Custody" fill="#22795F" radius={[4, 4, 0, 0]} />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-center flex flex-col items-center justify-center">
                                        <div className="w-16 h-16 bg-gold-50 rounded-full flex items-center justify-center mb-6">
                                            <ShieldCheckIcon className="w-8 h-8 text-gold-600" />
                                        </div>
                                        <h3 className="text-lg font-bold text-navy-900 uppercase tracking-tight mb-2">Billing Integrity Report</h3>
                                        <p className="text-[13px] text-gray-500 font-medium max-w-sm mx-auto leading-relaxed mb-8">
                                            The accrual engine has completed daily valuations for all active mandates.
                                            System integrity is 100% verified for the current active period.
                                        </p>
                                        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Accrual Points</p>
                                                <p className="text-xl font-bold text-navy-900 font-mono">15,842</p>
                                            </div>
                                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">HWM Validations</p>
                                                <p className="text-xl font-bold text-navy-900 font-mono">100%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {isInvoiceModalOpen && <GenerateInvoiceModal onClose={() => setIsInvoiceModalOpen(false)} />}
            {isDetailPanelOpen && <FeeDetailPanel fee={selectedFee} onClose={() => setIsDetailPanelOpen(false)} />}
        </AppShell>
    );
}

// --- Sub-Components ---

function FeeDetailPanel({ fee, onClose }: any) {
    return (
        <div className="fixed inset-0 bg-navy-900/40 backdrop-blur-md z-[100] flex justify-end animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-md shadow-2xl h-full flex flex-col animate-in slide-in-from-right duration-500">
                <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h3 className="text-lg font-bold text-navy-900 uppercase tracking-tight">Fee Rule Configuration</h3>
                        <p className="text-[11px] text-gray-400 font-bold uppercase mt-1">Rule ID: {fee.id}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors text-xl font-bold text-gray-400 hover:text-navy-900">&times;</button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-10">
                    <section>
                        <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 border-b border-gray-50 pb-2">Client Details</h4>
                        <div className="space-y-4">
                            <div>
                                <p className="text-[10px] font-bold text-navy-300 uppercase tracking-widest mb-0.5">Mandate Name</p>
                                <p className="text-[14px] font-bold text-navy-900">{fee.clientOrFund}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <div>
                                    <p className="text-[10px] font-bold text-navy-300 uppercase tracking-widest mb-0.5">Fee Type</p>
                                    <p className="text-[13px] font-bold text-gold-600 uppercase">{fee.feeType}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-navy-300 uppercase tracking-widest mb-0.5">Status</p>
                                    <StatusBadge status={fee.status} />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-navy-900 rounded-xl p-6 text-white relative overflow-hidden shadow-lg">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <ShieldCheckIcon className="w-16 h-16" />
                        </div>
                        <h4 className="text-[10px] font-bold text-gold-500 uppercase tracking-[0.2em] mb-4">Calculation Formula</h4>
                        <div className="space-y-4 relative z-10">
                            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                <p className="text-[14px] font-mono font-bold leading-relaxed">{fee.rate}</p>
                                <p className="text-[10px] opacity-60 mt-1 uppercase font-bold tracking-widest">Calculated on {fee.basis}</p>
                            </div>
                            <p className="text-[12px] opacity-70 font-medium leading-relaxed italic">
                                "{fee.description}"
                            </p>
                        </div>
                    </section>

                    {fee.feeType === 'Performance' && (
                        <section className="animate-in slide-in-from-bottom duration-500">
                            <h4 className="text-[11px] font-bold text-navy-900/40 uppercase tracking-[0.2em] mb-4 border-b border-gray-50 pb-2">High-Water Mark (HWM) Monitor</h4>
                            <div className="bg-gold-50/50 border border-gold-100 rounded-xl p-6 space-y-6">
                                <div className="flex justify-between items-center">
                                    <p className="text-[11px] font-bold text-gray-500 uppercase">Current Unit Price</p>
                                    <p className="text-[13px] font-mono font-bold text-navy-900">₦174.52</p>
                                </div>
                                <div className="flex justify-between items-center border-t border-gold-100 pt-4">
                                    <p className="text-[11px] font-bold text-gray-500 uppercase">Existing HWM (Peak)</p>
                                    <p className="text-[13px] font-mono font-bold text-danger">₦150.00</p>
                                </div>
                                <div className="bg-success/10 p-3 rounded-lg border border-success/20 flex items-center">
                                    <TrendingUpIcon className="w-4 h-4 text-success mr-2" />
                                    <p className="text-[10px] font-bold text-success uppercase tracking-wider">HWM Exceeded — Fee Eligible (₦24.5M Excess)</p>
                                </div>
                            </div>
                        </section>
                    )}

                    <section>
                        <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 border-b border-gray-50 pb-2">Financial History</h4>
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <span className="text-[12px] text-gray-500 font-bold uppercase tracking-widest">Accrued YTD</span>
                                <span className="text-lg font-bold text-navy-900 font-mono tracking-tighter">₦{fee.accruedYTD.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-end">
                                <span className="text-[12px] text-gray-500 font-bold uppercase tracking-widest">Invoiced YTD</span>
                                <span className="text-lg font-bold text-success font-mono tracking-tighter">₦{fee.invoicedYTD.toLocaleString()}</span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center border border-gray-100">
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Remaining Balance</p>
                                    <p className="text-sm font-bold text-navy-900 font-mono">₦{fee.outstanding.toLocaleString()}</p>
                                </div>
                                <button className="px-3 py-1.5 bg-navy-900 text-white rounded text-[10px] font-bold uppercase tracking-widest hover:bg-navy-800 transition-all">Invoice now</button>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="p-8 border-t border-gray-100 bg-gray-50/50 flex space-x-3">
                    <button className="flex-1 py-3 border border-gray-200 rounded-lg text-[12px] font-bold uppercase tracking-widest text-navy-900 hover:bg-white transition-all">Audit Trail</button>
                    <button className="flex-1 py-3 bg-navy-900 text-white rounded-lg text-[12px] font-bold uppercase tracking-widest hover:bg-navy-800 transition-all">Modify Rule</button>
                </div>
            </div>
        </div>
    );
}

function GenerateInvoiceModal({ onClose }: any) {
    const [step, setStep] = useState(1);
    const [selectedClient, setSelectedClient] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            alert('Invoice batch generated and submitted to Maker-Checker queue.');
            onClose();
        }, 1500);
    };

    return (
        <div className="fixed inset-0 bg-navy-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
                <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h3 className="text-lg font-bold text-navy-900 uppercase tracking-tight">Invoice Generator Engine</h3>
                        <p className="text-[11px] text-gray-500 font-bold uppercase mt-0.5">Step {step} of 2 — {step === 1 ? 'Configuration' : 'Review & Batch'}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-navy-900 text-xl font-bold font-mono transition-colors">&times;</button>
                </div>

                <div className="p-8 space-y-8 overflow-y-auto max-h-[60vh]">
                    {step === 1 ? (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Select Mandate/Client *</label>
                                <select
                                    className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-[13px] font-bold text-navy-900 outline-none"
                                    value={selectedClient}
                                    onChange={(e) => setSelectedClient(e.target.value)}
                                >
                                    <option value="">Select Mandate...</option>
                                    <option>ValuAlliance Value Fund</option>
                                    <option>ARM Pension Equity Mandate</option>
                                    <option>High-Net-Worth Client XYZ</option>
                                    <option>Legacy Insurance Mandate</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Billing Period *</label>
                                    <select className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-[13px] font-bold text-navy-900 outline-none">
                                        <option>Q1 2026 (Jan - Mar)</option>
                                        <option>FEB 2026</option>
                                        <option>Q4 2025 (Oct - Dec)</option>
                                        <option>Custom Date Range...</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Invoice Date</label>
                                    <input type="date" defaultValue="2026-02-27" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-[13px] font-bold font-mono text-navy-900 outline-none" />
                                </div>
                            </div>
                            <div className="bg-gold-50 border border-gold-200 p-4 rounded-lg flex items-start">
                                <AlertIcon className="w-4 h-4 text-gold-600 mr-3 mt-0.5 shrink-0" />
                                <p className="text-[11px] text-gold-800 font-bold uppercase leading-relaxed tracking-wider">
                                    Performance fees will be audited against the High-Water Mark peak price of ₦150.00 as at 31-Dec-2025.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8 animate-in slide-in-from-right duration-300">
                            <div className="bg-navy-900 rounded-xl p-8 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-6 opacity-5">
                                    <NairaIcon className="w-32 h-32" />
                                </div>
                                <h4 className="text-[10px] font-bold text-gold-500 uppercase tracking-[0.2em] mb-4">Invoice Preview Summary</h4>
                                <div className="space-y-4 relative z-10">
                                    <div className="flex justify-between items-center border-b border-white/10 pb-3">
                                        <span className="text-[13px] opacity-70">Management Fee (Q1)</span>
                                        <span className="font-mono text-sm font-bold">₦40,200,000.00</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-white/10 pb-3">
                                        <span className="text-[13px] opacity-70">Performance Incentive</span>
                                        <span className="font-mono text-sm font-bold text-success">₦45,800,500.00</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2">
                                        <span className="text-[12px] font-bold text-gold-500 uppercase tracking-widest">Total Batch Amount</span>
                                        <span className="font-mono text-2xl font-bold">₦86,000,500.00</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 border border-gray-100 p-6 rounded-xl">
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Calculation Basis & Audit Note</h4>
                                <ul className="space-y-3 text-[12px] font-medium text-gray-600 list-disc pl-4 leading-relaxed">
                                    <li>Based on daily average AUM ₦85.4B × 1.5% × 90/365.</li>
                                    <li>HWM Peak ₦150.00 respected (Current Unit Price ₦174.52).</li>
                                    <li>Custody fees excluded from this batch.</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                <div className="px-8 py-6 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center">
                    <button onClick={onClose} className="px-6 py-2.5 text-navy-400 text-[12px] font-bold uppercase tracking-widest hover:text-navy-900 transition-colors">Discard</button>
                    <div className="flex space-x-3">
                        {step === 2 && (
                            <button onClick={() => setStep(1)} className="px-6 py-2.5 border border-gray-200 rounded-lg text-[12px] font-bold uppercase tracking-widest text-navy-900 hover:bg-white transition-all">Back</button>
                        )}
                        <button
                            disabled={!selectedClient}
                            onClick={() => step === 1 ? setStep(2) : handleGenerate()}
                            className={cn(
                                "px-8 py-2.5 rounded-lg text-[12px] font-bold uppercase tracking-widest shadow-sm transition-all focus:ring-4 focus:ring-navy-900/10",
                                selectedClient ? "bg-navy-900 text-white hover:bg-navy-800" : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            )}
                        >
                            {isGenerating ? <RefreshIcon className="w-4 h-4 animate-spin mr-2 inline" /> : null}
                            {step === 1 ? 'Preview Calculation' : 'Authorize & Submit Batch'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
