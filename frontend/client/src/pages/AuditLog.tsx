import React from 'react';
import { AppShell } from '../components/layout/AppShell';
import { StatusBadge } from '../components/ui/StatusBadge';
import { mockAuditLogs } from '../data/mockData';
import { DownloadIcon, FilterIcon } from '../components/icons/Icons';

export default function AuditLog() {
    return (
        <AppShell>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-navy-900">Audit & Logging</h1>
                        <p className="text-sm text-gray-500 mt-1">Immutable audit trail — 7-year retention | AWS S3 Object Lock</p>
                    </div>
                    <div className="flex space-x-3">
                        <button className="px-3 py-2 bg-white border border-gray-200 rounded text-gray-600 hover:bg-gray-50 flex items-center text-sm shadow-sm">
                            <FilterIcon className="w-4 h-4 mr-2" /> Filter
                        </button>
                        <button className="px-3 py-2 bg-white border border-gray-200 rounded text-gray-600 hover:bg-gray-50 flex items-center text-sm shadow-sm">
                            <DownloadIcon className="w-4 h-4 mr-2" /> Export CSV
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                                <tr>
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
                                {mockAuditLogs.map(log => (
                                    <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 font-mono text-xs font-semibold text-navy-700">{log.id}</td>
                                        <td className="p-4 font-mono text-xs text-gray-600 whitespace-nowrap">{log.timestamp}</td>
                                        <td className="p-4 font-medium text-navy-900 whitespace-nowrap">{log.userName}</td>
                                        <td className="p-4 text-xs text-gray-600">{log.role}</td>
                                        <td className="p-4 font-mono text-xs text-gray-500">{log.ipAddress}</td>
                                        <td className="p-4"><span className="bg-navy-100 text-navy-700 text-xs font-medium px-2 py-0.5 rounded">{log.module}</span></td>
                                        <td className="p-4 text-gray-700 whitespace-nowrap">{log.action}</td>
                                        <td className="p-4 font-mono text-xs text-navy-700">{log.entity}</td>
                                        <td className="p-4 text-xs text-gray-500">{log.before}</td>
                                        <td className="p-4 text-xs text-gray-700 font-medium">{log.after}</td>
                                        <td className="p-4"><StatusBadge status={log.outcome} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}
