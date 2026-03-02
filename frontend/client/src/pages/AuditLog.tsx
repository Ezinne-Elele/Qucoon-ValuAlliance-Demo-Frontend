import React from 'react';
import { AppShell } from '../components/layout/AppShell';
import { StatusBadge } from '../components/ui/StatusBadge';
import { mockAuditLogs } from '../data/mockData';
import { cn } from '../components/icons/Icons';
import { TableToolbar, TablePagination, useTableControls } from '../components/ui/TableControls';

export default function AuditLog() {
    const [filterModule, setFilterModule] = React.useState('All');
    const modules = ['All', ...Array.from(new Set(mockAuditLogs.map(l => l.module)))];
    const baseFiltered = filterModule === 'All' ? mockAuditLogs : mockAuditLogs.filter(l => l.module === filterModule);

    const { search, setSearch, page, setPage, paged, totalItems, pageSize } = useTableControls(baseFiltered, 10);

    const exportData = baseFiltered.map(l => ({
        'Log ID': l.id, Timestamp: l.timestamp, User: l.userName, Role: l.role,
        'IP Address': l.ipAddress, Module: l.module, Action: l.action,
        Entity: l.entity, Before: l.before, After: l.after, Outcome: l.outcome,
    }));

    return (
        <AppShell>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-navy-900">Audit & Logging</h1>
                        <p className="text-sm text-gray-500 mt-1">Immutable audit trail — 7-year retention | AWS S3 Object Lock</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                        <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="font-semibold text-navy-900 text-sm">Audit Trail</h3>
                            <div className="flex space-x-1 overflow-x-auto">
                                {modules.map(m => (
                                    <button key={m} onClick={() => setFilterModule(m)} className={cn("px-3 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap", filterModule === m ? "bg-navy-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200")}>{m}</button>
                                ))}
                            </div>
                        </div>
                        <TableToolbar searchValue={search} onSearchChange={setSearch} onRefresh={() => { }} exportData={exportData} exportFilename="audit_log" />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                                <tr>
                                    <th className="p-4 font-medium w-12">S/N</th>
                                    <th className="p-4 font-medium">Log ID</th>
                                    <th className="p-4 font-medium">Timestamp</th>
                                    <th className="p-4 font-medium">User</th>
                                    <th className="p-4 font-medium">Role</th>
                                    <th className="p-4 font-medium">IP Address</th>
                                    <th className="p-4 font-medium">Module</th>
                                    <th className="p-4 font-medium">Action</th>
                                    <th className="p-4 font-medium">Entity</th>
                                    <th className="p-4 font-medium">Before</th>
                                    <th className="p-4 font-medium">After</th>
                                    <th className="p-4 font-medium">Outcome</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {paged.map((log, idx) => (
                                    <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 text-gray-400 text-xs text-center">{(page - 1) * pageSize + idx + 1}</td>
                                        <td className="p-4 text-xs font-semibold text-navy-700">{log.id}</td>
                                        <td className="p-4 text-xs text-gray-600 whitespace-nowrap">{log.timestamp}</td>
                                        <td className="p-4 font-medium text-navy-900 whitespace-nowrap">{log.userName}</td>
                                        <td className="p-4 text-xs text-gray-600">{log.role}</td>
                                        <td className="p-4 text-xs text-gray-500">{log.ipAddress}</td>
                                        <td className="p-4"><span className="bg-navy-100 text-navy-700 text-xs font-medium px-2 py-0.5 rounded">{log.module}</span></td>
                                        <td className="p-4 text-gray-700 whitespace-nowrap">{log.action}</td>
                                        <td className="p-4 text-xs text-navy-700">{log.entity}</td>
                                        <td className="p-4 text-xs text-gray-500">{log.before}</td>
                                        <td className="p-4 text-xs text-gray-700 font-medium">{log.after}</td>
                                        <td className="p-4"><StatusBadge status={log.outcome} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <TablePagination currentPage={page} totalItems={totalItems} pageSize={pageSize} onPageChange={setPage} />
                </div>
            </div>
        </AppShell>
    );
}
