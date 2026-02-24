import React, { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { StatusBadge } from '../components/ui/StatusBadge';
import { MetricCard } from '../components/ui/MetricCard';
import { mockRegulatorySubmissions } from '../data/mockData';
import { RegulatoryIcon, AlertIcon, CheckCircleIcon, DownloadIcon, SECLogo, EyeIcon, cn } from '../components/icons/Icons';
import { TableToolbar, TablePagination, useTableControls } from '../components/ui/TableControls';

export default function RegulatoryReturns() {
    const [showNewSubmission, setShowNewSubmission] = useState(false);
    const [showExport, setShowExport] = useState(false);
    const [showViewSubmission, setShowViewSubmission] = useState<typeof mockRegulatorySubmissions[0] | null>(null);
    const [newRegulator, setNewRegulator] = useState('SEC Nigeria');
    const [newReturnType, setNewReturnType] = useState('Quarterly Return');
    const [newPeriod, setNewPeriod] = useState('Q4 2025');
    const [exportFormat, setExportFormat] = useState('Excel');

    const inProgress = mockRegulatorySubmissions.filter(s => s.status === 'In Progress').length;
    const submitted = mockRegulatorySubmissions.filter(s => s.status === 'Submitted').length;
    const notStarted = mockRegulatorySubmissions.filter(s => s.status === 'Not Started').length;

    // For View Submission — default to first in-progress item
    const urgentSubmission = mockRegulatorySubmissions.find(s => s.status === 'In Progress');

    const { search, setSearch, page, setPage, paged, totalItems, pageSize } = useTableControls(mockRegulatorySubmissions, 10);
    const exportData = mockRegulatorySubmissions.map(rs => ({
        'Return ID': rs.id, 'Report Name': rs.name, Regulator: rs.regulator,
        Period: rs.period, 'Due Date': rs.dueDate, Submitted: rs.submittedDate || '',
        'Prepared By': rs.preparedBy || '', Status: rs.status,
    }));

    return (
        <AppShell>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-navy-900">Regulatory Returns</h1>
                    <div className="flex space-x-3">
                        <button onClick={() => setShowNewSubmission(true)} className="px-4 py-2 bg-navy-900 text-white rounded text-sm font-medium hover:bg-navy-800 shadow-sm">New Submission</button>
                        <button onClick={() => setShowExport(true)} className="px-3 py-2 bg-white border border-gray-200 rounded text-gray-600 hover:bg-gray-50 flex items-center text-sm shadow-sm">
                            <DownloadIcon className="w-4 h-4 mr-2" /> Export
                        </button>
                    </div>
                </div>

                {/* Deadline Banner */}
                <div className="bg-danger-bg border-l-4 border-danger p-4 rounded shadow-sm flex items-center justify-between">
                    <div className="flex items-center">
                        <AlertIcon className="w-5 h-5 text-danger mr-3" />
                        <div>
                            <p className="font-semibold text-danger text-sm">Upcoming Deadline: SEC Q4 2025 Return</p>
                            <p className="text-xs text-gray-600 mt-0.5">Due: 28 February 2026 — 5 days remaining</p>
                        </div>
                    </div>
                    <button onClick={() => setShowViewSubmission(urgentSubmission || null)} className="px-4 py-2 bg-danger text-white rounded text-sm font-medium hover:bg-red-700 shadow-sm">View Submission</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MetricCard label="In Progress" value={inProgress.toString()} trend="Requires completion" trendPositive={false} icon={<RegulatoryIcon />} iconBg="bg-warning-bg" />
                    <MetricCard label="Submitted" value={submitted.toString()} trend="On time" icon={<CheckCircleIcon />} iconBg="bg-success-bg" />
                    <MetricCard label="Not Started" value={notStarted.toString()} trend="Schedule pending" trendPositive={false} icon={<AlertIcon />} iconBg="bg-danger-bg" />
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                        <h3 className="font-semibold text-navy-900 text-sm">Regulatory Submissions</h3>
                        <TableToolbar searchValue={search} onSearchChange={setSearch} onRefresh={() => { }} exportData={exportData} exportFilename="regulatory_returns" />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                                <tr>
                                    <th className="p-4 font-medium w-12">S/N</th>
                                    <th className="p-4 font-medium">Return ID</th>
                                    <th className="p-4 font-medium">Report Name</th>
                                    <th className="p-4 font-medium">Regulator</th>
                                    <th className="p-4 font-medium">Period</th>
                                    <th className="p-4 font-medium">Due Date</th>
                                    <th className="p-4 font-medium">Submitted</th>
                                    <th className="p-4 font-medium">Prepared By</th>
                                    <th className="p-4 font-medium">Status</th>
                                    <th className="p-4 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {paged.map((rs, idx) => (
                                    <tr key={rs.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 text-gray-400 text-xs font-mono">{(page - 1) * pageSize + idx + 1}</td>
                                        <td className="p-4 font-mono text-xs font-semibold text-navy-700">{rs.id}</td>
                                        <td className="p-4 font-medium text-navy-900">{rs.name}</td>
                                        <td className="p-4">
                                            {rs.regulator === 'SEC Nigeria' && <SECLogo />}
                                            {rs.regulator === 'NFIU' && <span className="bg-[#8B0000] text-white px-2 py-0.5 font-bold text-[10px] tracking-wider rounded-sm inline-flex items-center">NFIU</span>}
                                            {rs.regulator === 'NITDA' && <span className="bg-[#2E8B57] text-white px-2 py-0.5 font-bold text-[10px] tracking-wider rounded-sm inline-flex items-center">NITDA</span>}
                                        </td>
                                        <td className="p-4 text-gray-600">{rs.period}</td>
                                        <td className="p-4 font-mono text-gray-600">{rs.dueDate}</td>
                                        <td className="p-4 font-mono text-gray-600">{rs.submittedDate || '—'}</td>
                                        <td className="p-4 text-gray-600">{rs.preparedBy || '—'}</td>
                                        <td className="p-4"><StatusBadge status={rs.status} /></td>
                                        <td className="p-4">
                                            <button onClick={() => setShowViewSubmission(rs)} className="p-1.5 bg-gray-100 rounded hover:bg-gray-200 transition-colors" title="View Details">
                                                <EyeIcon className="w-3.5 h-3.5 text-gray-600" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <TablePagination currentPage={page} totalItems={totalItems} pageSize={pageSize} onPageChange={setPage} />
                </div>
            </div>

            {/* New Submission Modal */}
            {showNewSubmission && (
                <div className="fixed inset-0 bg-navy-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-navy-900">New Regulatory Submission</h3>
                            <button onClick={() => setShowNewSubmission(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
                        </div>
                        <div className="p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Regulator</label>
                                <select value={newRegulator} onChange={e => setNewRegulator(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none">
                                    <option>SEC Nigeria</option>
                                    <option>NFIU</option>
                                    <option>NITDA</option>
                                    <option>CBN</option>
                                    <option>PENCOM</option>
                                    <option>NAICOM</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Return Type</label>
                                <select value={newReturnType} onChange={e => setNewReturnType(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none">
                                    <option>Quarterly Return</option>
                                    <option>Annual Return</option>
                                    <option>AML/CFT Report</option>
                                    <option>NDPR Compliance</option>
                                    <option>Ad-hoc Report</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Reporting Period</label>
                                <select value={newPeriod} onChange={e => setNewPeriod(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none">
                                    <option>Q4 2025</option>
                                    <option>Q1 2026</option>
                                    <option>H2 2025</option>
                                    <option>FY 2025</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                                <input type="date" defaultValue="2026-03-31" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none font-mono" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Assign To</label>
                                <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none">
                                    <option>Fatima Abubakar</option>
                                    <option>Adaeze Okonkwo</option>
                                    <option>Emeka Nwachukwu</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                                <textarea className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none" rows={2} placeholder="Add submission notes..." />
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl flex justify-end gap-3">
                            <button onClick={() => setShowNewSubmission(false)} className="px-4 py-2 border border-gray-300 rounded text-gray-700 text-sm font-medium hover:bg-gray-100">Cancel</button>
                            <button onClick={() => { setShowNewSubmission(false); alert('New ' + newReturnType + ' submission created for ' + newRegulator + ' (' + newPeriod + ')'); }} className="px-4 py-2 bg-navy-900 text-white rounded text-sm font-medium shadow hover:bg-navy-800">Create Submission</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Export Modal */}
            {showExport && (
                <div className="fixed inset-0 bg-navy-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-navy-900">Export Regulatory Data</h3>
                            <button onClick={() => setShowExport(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
                        </div>
                        <div className="p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['Excel', 'CSV', 'PDF'].map(fmt => (
                                        <button key={fmt} onClick={() => setExportFormat(fmt)} className={cn("py-2 px-3 rounded text-sm font-medium border transition-colors", exportFormat === fmt ? "bg-navy-900 text-white border-navy-900" : "border-gray-200 text-gray-600 hover:border-gray-300")}>{fmt}</button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Scope</label>
                                <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none">
                                    <option>All Submissions</option>
                                    <option>Pending Only</option>
                                    <option>Submitted Only</option>
                                    <option>Current Year</option>
                                </select>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <input type="checkbox" defaultChecked className="h-4 w-4 text-gold-500 focus:ring-gold-500 border-gray-300 rounded mr-3" />
                                Include submission receipts and attachments
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl flex justify-end gap-3">
                            <button onClick={() => setShowExport(false)} className="px-4 py-2 border border-gray-300 rounded text-gray-700 text-sm font-medium hover:bg-gray-100">Cancel</button>
                            <button onClick={() => { setShowExport(false); alert('Exporting regulatory data as ' + exportFormat + '...'); }} className="px-4 py-2 bg-navy-900 text-white rounded text-sm font-medium shadow hover:bg-navy-800">
                                <DownloadIcon className="w-4 h-4 mr-2 inline" /> Export
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* View Submission Side Panel */}
            {showViewSubmission && (
                <div className="fixed inset-y-0 right-0 w-[520px] bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.1)] border-l border-gray-200 z-40 flex flex-col">
                    <div className="px-6 py-4 border-b border-gray-200 bg-navy-900 text-white flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-bold">{showViewSubmission.type}</h3>
                            <p className="text-xs text-gold-400 font-mono">{showViewSubmission.id} · {showViewSubmission.period}</p>
                        </div>
                        <button onClick={() => setShowViewSubmission(null)} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
                    </div>
                    <div className="p-6 flex-1 overflow-y-auto space-y-6">
                        {/* Status */}
                        <div className="flex items-center justify-between">
                            <StatusBadge status={showViewSubmission.status} />
                            {showViewSubmission.status === 'In Progress' && (
                                <span className="text-xs text-danger font-medium">Due: {showViewSubmission.dueDate}</span>
                            )}
                        </div>

                        {/* Details Grid */}
                        <div>
                            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Submission Details</h4>
                            <div className="grid grid-cols-2 gap-y-4 text-sm">
                                <div><p className="text-gray-500 text-xs mb-1">Report Name</p><p className="font-medium text-navy-900">{showViewSubmission.name}</p></div>
                                <div><p className="text-gray-500 text-xs mb-1">Regulator</p><p className="font-medium text-navy-900">{showViewSubmission.regulator}</p></div>
                                <div><p className="text-gray-500 text-xs mb-1">Reporting Period</p><p className="font-medium text-navy-900">{showViewSubmission.period}</p></div>
                                <div><p className="text-gray-500 text-xs mb-1">Return Type</p><p className="font-medium text-navy-900">{showViewSubmission.type}</p></div>
                                <div><p className="text-gray-500 text-xs mb-1">Due Date</p><p className="font-mono font-medium text-navy-900">{showViewSubmission.dueDate}</p></div>
                                <div><p className="text-gray-500 text-xs mb-1">Submitted Date</p><p className="font-mono text-navy-900">{showViewSubmission.submittedDate || '—'}</p></div>
                                <div><p className="text-gray-500 text-xs mb-1">Prepared By</p><p className="font-medium text-navy-900">{showViewSubmission.preparedBy || 'Unassigned'}</p></div>
                            </div>
                        </div>

                        {/* Checklist */}
                        <div>
                            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Compliance Checklist</h4>
                            <div className="space-y-2">
                                {[
                                    { label: 'AUM & Fund Data compiled', done: true },
                                    { label: 'Portfolio composition verified', done: showViewSubmission.status === 'Submitted' },
                                    { label: 'Fee schedules attached', done: showViewSubmission.status === 'Submitted' },
                                    { label: 'Risk disclosures updated', done: false },
                                    { label: 'Internal review completed', done: showViewSubmission.status === 'Submitted' },
                                    { label: 'Final approval obtained', done: showViewSubmission.status === 'Submitted' },
                                ].map((item, i) => (
                                    <label key={i} className="flex items-center text-sm text-gray-700">
                                        <input type="checkbox" checked={item.done} readOnly className="h-4 w-4 text-gold-500 focus:ring-gold-500 border-gray-300 rounded mr-3" />
                                        <span className={item.done ? 'text-gray-700' : 'text-gray-400'}>{item.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div>
                            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Completion Progress</h4>
                            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                <div className={cn("h-full rounded-full transition-all", showViewSubmission.status === 'Submitted' ? "bg-success w-full" : showViewSubmission.status === 'In Progress' ? "bg-warning w-1/3" : "bg-gray-300 w-0")} />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                {showViewSubmission.status === 'Submitted' ? '100% — Submitted' : showViewSubmission.status === 'In Progress' ? '33% — In Progress' : '0% — Not Started'}
                            </p>
                        </div>

                        {/* Notes */}
                        <div>
                            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Notes</h4>
                            <textarea className="w-full border border-gray-300 rounded p-3 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none" rows={3} placeholder="Add submission notes..." defaultValue={showViewSubmission.status === 'Submitted' ? 'Submitted on time. Confirmation receipt obtained.' : ''} />
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-4 border-t border-gray-200 bg-gray-50 flex gap-3">
                        {showViewSubmission.status === 'In Progress' && (
                            <button onClick={() => { setShowViewSubmission(null); alert('Submission marked as ready for review.'); }} className="flex-1 bg-navy-900 text-white py-2 rounded shadow font-medium hover:bg-navy-800 transition-colors text-sm">Submit for Review</button>
                        )}
                        {showViewSubmission.status === 'Not Started' && (
                            <button onClick={() => { setShowViewSubmission(null); alert('Submission started. Assigned to Fatima Abubakar.'); }} className="flex-1 bg-navy-900 text-white py-2 rounded shadow font-medium hover:bg-navy-800 transition-colors text-sm">Start Preparation</button>
                        )}
                        {showViewSubmission.status === 'Submitted' && (
                            <button className="flex-1 bg-gray-100 text-gray-500 py-2 rounded font-medium text-sm cursor-not-allowed" disabled>Already Submitted</button>
                        )}
                        <button onClick={() => setShowViewSubmission(null)} className="px-4 py-2 border border-gray-300 rounded text-gray-700 text-sm font-medium hover:bg-gray-100">Close</button>
                    </div>
                </div>
            )}
        </AppShell>
    );
}
