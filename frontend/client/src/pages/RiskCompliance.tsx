import React, { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { StatusBadge } from '../components/ui/StatusBadge';
import { mockComplianceEvents } from '../data/mockData';
import { AlertIcon, cn } from '../components/icons/Icons';
import { TableToolbar, TablePagination, useTableControls } from '../components/ui/TableControls';

export default function RiskCompliance() {
    const [activeTab, setActiveTab] = useState('Compliance Breaches');
    const tabs = ['Compliance Breaches', 'AML Alerts', 'Regulatory Calendar', 'Policy Limits'];

    const breaches = mockComplianceEvents.filter(e => e.type.includes('Breach'));
    const amlAlerts = mockComplianceEvents.filter(e => e.type === 'AML Alert');
    const deadlines = mockComplianceEvents.filter(e => e.type === 'Regulatory Deadline');

    const breachCtrl = useTableControls(breaches, 10);
    const breachExport = breaches.map(b => ({
        ID: b.id, Date: b.date, Portfolio: b.portfolioId, Security: b.ticker,
        Rule: b.rule, 'Limit (%)': b.limit, 'Actual (%)': b.actual,
        Severity: b.severity, Status: b.status,
    }));

    const policyLimits = [
        { rule: 'Single Issuer Concentration', scope: 'All Portfolios', limit: '10.00%', current: '8.20%', util: 82, status: 'Within Limit' },
        { rule: 'Sector Concentration — Financial Services', scope: 'Growth Fund', limit: '40.00%', current: '38.50%', util: 96, status: 'Warning' },
        { rule: 'Single Counterparty Exposure', scope: 'All Funds', limit: '15.00%', current: '11.40%', util: 76, status: 'Within Limit' },
        { rule: 'Cash Floor', scope: 'All Funds', limit: '2.00%', current: '4.80%', util: 42, status: 'Within Limit' },
        { rule: 'Government Bond Minimum', scope: 'Fixed Income Fund', limit: '60.00%', current: '72.00%', util: 83, status: 'Within Limit' },
    ];
    const limitsCtrl = useTableControls(policyLimits, 10);
    const limitsExport = policyLimits.map(r => ({
        Rule: r.rule, Scope: r.scope, Limit: r.limit, Current: r.current,
        'Utilisation (%)': r.util, Status: r.status,
    }));

    return (
        <AppShell>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-navy-900">Risk & Compliance</h1>
                        <p className="text-sm text-gray-500 mt-1">SEC-compliant monitoring with real-time breach detection</p>
                    </div>
                    <button className="px-4 py-2 bg-danger text-white rounded text-sm font-medium hover:bg-red-700 flex items-center shadow-sm">
                        <AlertIcon className="w-4 h-4 mr-2" /> 2 Active Breaches
                    </button>
                </div>

                <div className="flex space-x-6 border-b border-gray-200">
                    {tabs.map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={cn("pb-3 text-sm font-semibold transition-colors border-b-2", activeTab === tab ? "border-gold-500 text-navy-900" : "border-transparent text-gray-500 hover:text-navy-700")}>{tab}</button>
                    ))}
                </div>

                {activeTab === 'Compliance Breaches' && (
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                            <h3 className="font-semibold text-navy-900 text-sm">Compliance Breaches</h3>
                            <TableToolbar searchValue={breachCtrl.search} onSearchChange={breachCtrl.setSearch} onRefresh={() => { }} exportData={breachExport} exportFilename="compliance_breaches" />
                        </div>
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                                <tr>
                                    <th className="p-4 font-medium w-12">S/N</th>
                                    <th className="p-4 font-medium">ID</th>
                                    <th className="p-4 font-medium">Date</th>
                                    <th className="p-4 font-medium">Portfolio</th>
                                    <th className="p-4 font-medium">Security</th>
                                    <th className="p-4 font-medium">Rule Breached</th>
                                    <th className="p-4 font-medium text-right">Limit</th>
                                    <th className="p-4 font-medium text-right">Actual</th>
                                    <th className="p-4 font-medium">Severity</th>
                                    <th className="p-4 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {breachCtrl.paged.map((b, idx) => (
                                    <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 text-gray-400 text-xs font-mono">{(breachCtrl.page - 1) * breachCtrl.pageSize + idx + 1}</td>
                                        <td className="p-4 font-mono text-xs font-semibold text-navy-700">{b.id}</td>
                                        <td className="p-4 font-mono text-gray-600">{b.date}</td>
                                        <td className="p-4 text-gray-700">{b.portfolioId}</td>
                                        <td className="p-4 font-medium text-navy-900">{b.ticker}</td>
                                        <td className="p-4 text-gray-700">{b.rule}</td>
                                        <td className="p-4 text-right font-mono">{b.limit}%</td>
                                        <td className="p-4 text-right font-mono font-medium text-danger">{b.actual}%</td>
                                        <td className="p-4"><StatusBadge status={b.severity} /></td>
                                        <td className="p-4"><StatusBadge status={b.status} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <TablePagination currentPage={breachCtrl.page} totalItems={breachCtrl.totalItems} pageSize={breachCtrl.pageSize} onPageChange={breachCtrl.setPage} />
                    </div>
                )}

                {activeTab === 'AML Alerts' && (
                    <div className="space-y-4">
                        {amlAlerts.length > 0 ? amlAlerts.map((alert, idx) => (
                            <div key={alert.id} className="bg-white rounded-lg border border-danger/20 shadow-sm p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center">
                                        <span className="text-xs font-mono text-gray-400 mr-3">{idx + 1}.</span>
                                        <div className="w-10 h-10 bg-danger-bg rounded-full flex items-center justify-center mr-4">
                                            <AlertIcon className="w-5 h-5 text-danger" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-navy-900">{alert.rule}</h3>
                                            <p className="text-sm text-gray-500">{alert.clientName} — {alert.date}</p>
                                        </div>
                                    </div>
                                    <StatusBadge status={alert.status} />
                                </div>
                                <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded">
                                    <div><p className="text-xs text-gray-500">Transaction Amount</p><p className="font-mono font-bold text-navy-900">₦{(alert.transactionAmt || 0).toLocaleString()}</p></div>
                                    <div><p className="text-xs text-gray-500">Threshold</p><p className="font-mono font-bold text-danger">₦{(alert.threshold || 0).toLocaleString()}</p></div>
                                    <div><p className="text-xs text-gray-500">Assigned To</p><p className="font-medium text-navy-900">{alert.assignedTo}</p></div>
                                </div>
                            </div>
                        )) : <p className="text-gray-500 text-sm p-4">No AML alerts at this time.</p>}
                    </div>
                )}

                {activeTab === 'Regulatory Calendar' && (
                    <div className="space-y-4">
                        {deadlines.map((d, idx) => (
                            <div key={d.id} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 flex items-center justify-between">
                                <div className="flex items-center">
                                    <span className="text-xs font-mono text-gray-400 mr-3">{idx + 1}.</span>
                                    <div className="w-14 h-14 bg-danger text-white rounded flex flex-col items-center justify-center mr-4 shrink-0">
                                        <span className="text-lg font-bold leading-none">{d.dueDate?.split('-')[2]}</span>
                                        <span className="text-[10px] uppercase">FEB</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-navy-900">{d.rule}</h3>
                                        <p className="text-sm text-gray-500">Due: {d.dueDate}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <StatusBadge status={d.status} />
                                    <span className="text-xs text-danger font-bold">5 days remaining</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'Policy Limits' && (
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                            <h3 className="font-semibold text-navy-900 text-sm">Policy Limits</h3>
                            <TableToolbar searchValue={limitsCtrl.search} onSearchChange={limitsCtrl.setSearch} onRefresh={() => { }} exportData={limitsExport} exportFilename="policy_limits" />
                        </div>
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                                <tr>
                                    <th className="p-4 font-medium w-12">S/N</th>
                                    <th className="p-4 font-medium">Rule</th>
                                    <th className="p-4 font-medium">Scope</th>
                                    <th className="p-4 font-medium text-right">Limit</th>
                                    <th className="p-4 font-medium text-right">Current</th>
                                    <th className="p-4 font-medium text-right">Utilisation</th>
                                    <th className="p-4 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {limitsCtrl.paged.map((r, i) => (
                                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 text-gray-400 text-xs font-mono">{(limitsCtrl.page - 1) * limitsCtrl.pageSize + i + 1}</td>
                                        <td className="p-4 font-medium text-navy-900">{r.rule}</td>
                                        <td className="p-4 text-gray-600">{r.scope}</td>
                                        <td className="p-4 text-right font-mono">{r.limit}</td>
                                        <td className="p-4 text-right font-mono font-medium">{r.current}</td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                    <div className={cn("h-full rounded-full", r.util > 90 ? 'bg-danger' : r.util > 75 ? 'bg-warning' : 'bg-success')} style={{ width: `${r.util}%` }}></div>
                                                </div>
                                                <span className="font-mono text-xs text-gray-500">{r.util}%</span>
                                            </div>
                                        </td>
                                        <td className="p-4"><StatusBadge status={r.status} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <TablePagination currentPage={limitsCtrl.page} totalItems={limitsCtrl.totalItems} pageSize={limitsCtrl.pageSize} onPageChange={limitsCtrl.setPage} />
                    </div>
                )}
            </div>
        </AppShell>
    );
}
