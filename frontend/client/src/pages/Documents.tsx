import React, { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { StatusBadge } from '../components/ui/StatusBadge';
import { mockDocuments } from '../data/mockData';
import { PlusIcon, EyeIcon, DocumentIcon, DownloadIcon, cn } from '../components/icons/Icons';
import { TableToolbar, TablePagination, useTableControls } from '../components/ui/TableControls';

export default function Documents() {
    const [filter, setFilter] = useState('All');
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const types = ['All', 'Mandate', 'Client Statement', 'Regulatory Filing', 'Trade Confirmation'];
    const baseFiltered = filter === 'All' ? mockDocuments : mockDocuments.filter(d => d.type === filter);

    const { search, setSearch, page, setPage, paged, totalItems, pageSize } = useTableControls(baseFiltered, 10);

    const exportData = baseFiltered.map(d => ({
        'Document Name': d.name, Type: d.type, Version: d.version,
        Size: d.fileSize, 'Uploaded By': d.uploadedBy, Date: d.uploadedDate, Status: d.status,
    }));

    return (
        <AppShell>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-navy-900">Document Management</h1>
                    <button onClick={() => setIsUploadOpen(true)} className="px-4 py-2 bg-navy-900 text-white rounded text-sm font-medium hover:bg-navy-800 flex items-center shadow-sm">
                        <PlusIcon className="w-4 h-4 mr-2" /> Upload Document
                    </button>
                </div>

                <div className="flex space-x-1 border-b border-gray-200 overflow-x-auto">
                    {types.map(type => (
                        <button key={type} onClick={() => setFilter(type)} className={cn("px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap", filter === type ? "border-gold-500 text-navy-900" : "border-transparent text-gray-500 hover:text-navy-700")}>{type}</button>
                    ))}
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                        <h3 className="font-semibold text-navy-900 text-sm">Documents</h3>
                        <TableToolbar searchValue={search} onSearchChange={setSearch} onRefresh={() => { }} exportData={exportData} exportFilename="documents" />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                                <tr>
                                    <th className="p-4 font-medium w-12">S/N</th>
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
                                {paged.map((doc, idx) => (
                                    <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 text-gray-400 text-xs text-center">{(page - 1) * pageSize + idx + 1}</td>
                                        <td className="p-4">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-navy-100 rounded flex items-center justify-center mr-3 shrink-0">
                                                    <DocumentIcon className="w-4 h-4 text-navy-700" />
                                                </div>
                                                <span className="font-medium text-navy-900 truncate max-w-[280px]">{doc.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-4"><span className="bg-navy-100 text-navy-700 text-xs font-medium px-2 py-0.5 rounded">{doc.type}</span></td>
                                        <td className="p-4 text-xs text-gray-600">{doc.version}</td>
                                        <td className="p-4 text-xs text-gray-600">{doc.fileSize}</td>
                                        <td className="p-4 text-gray-700">{doc.uploadedBy}</td>
                                        <td className="p-4 text-xs text-gray-600">{doc.uploadedDate}</td>
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
                    <TablePagination currentPage={page} totalItems={totalItems} pageSize={pageSize} onPageChange={setPage} />
                </div>
            </div>

            {/* Upload Document Modal */}
            {isUploadOpen && (
                <div className="fixed inset-0 bg-navy-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-navy-900">Upload Document</h3>
                            <button onClick={() => setIsUploadOpen(false)} className="text-gray-400 hover:text-gray-600 font-bold">&times;</button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Document Type *</label>
                                <select className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none">
                                    <option>Select Type...</option>
                                    <option>Mandate</option><option>Client Statement</option><option>Regulatory Filing</option><option>Trade Confirmation</option><option>KYC Document</option><option>Board Resolution</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Related Module</label>
                                <select className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none">
                                    <option>Select Module...</option>
                                    <option>Portfolio</option><option>Trades</option><option>Fund Accounting</option><option>Risk & Compliance</option><option>Client Management</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <input type="text" className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none" placeholder="Document description..." />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">File *</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gold-500 transition-colors cursor-pointer">
                                    <DocumentIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-500">Drag & drop or <span className="text-gold-600 font-medium">browse</span> to upload</p>
                                    <p className="text-xs text-gray-400 mt-1">PDF, DOC, XLS, JPG up to 25MB</p>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
                            <button onClick={() => setIsUploadOpen(false)} className="px-4 py-2 border border-gray-300 rounded text-gray-700 text-sm font-medium hover:bg-gray-100">Cancel</button>
                            <button onClick={() => { setIsUploadOpen(false); alert('Document uploaded successfully!'); }} className="px-4 py-2 bg-navy-900 text-white rounded text-sm font-medium shadow hover:bg-navy-800">Upload</button>
                        </div>
                    </div>
                </div>
            )}
        </AppShell>
    );
}
