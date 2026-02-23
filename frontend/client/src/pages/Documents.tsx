import React, { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { StatusBadge } from '../components/ui/StatusBadge';
import { mockDocuments } from '../data/mockData';
import { PlusIcon, DownloadIcon, EyeIcon, DocumentIcon, cn } from '../components/icons/Icons';

export default function Documents() {
    const [filter, setFilter] = useState('All');
    const types = ['All', 'Mandate', 'Client Statement', 'Regulatory Filing', 'Trade Confirmation'];
    const filtered = filter === 'All' ? mockDocuments : mockDocuments.filter(d => d.type === filter);

    return (
        <AppShell>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-navy-900">Document Management</h1>
                    <button className="px-4 py-2 bg-navy-900 text-white rounded text-sm font-medium hover:bg-navy-800 flex items-center shadow-sm">
                        <PlusIcon className="w-4 h-4 mr-2" /> Upload Document
                    </button>
                </div>

                <div className="flex space-x-1 border-b border-gray-200 overflow-x-auto">
                    {types.map(type => (
                        <button key={type} onClick={() => setFilter(type)} className={cn("px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap", filter === type ? "border-gold-500 text-navy-900" : "border-transparent text-gray-500 hover:text-navy-700")}>{type}</button>
                    ))}
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                                <tr>
                                    <th className="p-4 font-medium">Document Name</th>
                                    <th className="p-4 font-medium">Type</th>
                                    <th className="p-4 font-medium">Version</th>
                                    <th className="p-4 font-medium">Size</th>
                                    <th className="p-4 font-medium">Uploaded By</th>
                                    <th className="p-4 font-medium">Date</th>
                                    <th className="p-4 font-medium">Status</th>
                                    <th className="p-4 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filtered.map(doc => (
                                    <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-navy-100 rounded flex items-center justify-center mr-3 shrink-0">
                                                    <DocumentIcon className="w-4 h-4 text-navy-700" />
                                                </div>
                                                <span className="font-medium text-navy-900 truncate max-w-[280px]">{doc.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-4"><span className="bg-navy-100 text-navy-700 text-xs font-medium px-2 py-0.5 rounded">{doc.type}</span></td>
                                        <td className="p-4 font-mono text-xs text-gray-600">{doc.version}</td>
                                        <td className="p-4 font-mono text-xs text-gray-600">{doc.fileSize}</td>
                                        <td className="p-4 text-gray-700">{doc.uploadedBy}</td>
                                        <td className="p-4 font-mono text-xs text-gray-600">{doc.uploadedDate}</td>
                                        <td className="p-4"><StatusBadge status={doc.status} /></td>
                                        <td className="p-4">
                                            <div className="flex space-x-2">
                                                <button className="p-1.5 bg-gray-100 rounded hover:bg-gray-200 transition-colors" title="View">
                                                    <EyeIcon className="w-3.5 h-3.5 text-gray-600" />
                                                </button>
                                                <button className="p-1.5 bg-gray-100 rounded hover:bg-gray-200 transition-colors" title="Download">
                                                    <DownloadIcon className="w-3.5 h-3.5 text-gray-600" />
                                                </button>
                                            </div>
                                        </td>
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
