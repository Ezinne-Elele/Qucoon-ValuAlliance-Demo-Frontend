import React, { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { StatusBadge } from '../components/ui/StatusBadge';
import { mockUsers } from '../data/mockData';
import { PlusIcon, cn } from '../components/icons/Icons';
import { TableToolbar, TablePagination, useTableControls } from '../components/ui/TableControls';

export default function UserManagement() {
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);
    const [isRbacOpen, setIsRbacOpen] = useState(false);
    const [filterRole, setFilterRole] = useState('All');
    const roles = ['All', ...new Set(mockUsers.map(u => u.role))];
    const baseFiltered = filterRole === 'All' ? mockUsers : mockUsers.filter(u => u.role === filterRole);

    const { search, setSearch, page, setPage, paged, totalItems, pageSize } = useTableControls(baseFiltered, 10);
    const exportData = baseFiltered.map(u => ({
        Name: u.name, Role: u.role, Department: u.department, Email: u.email,
        MFA: u.mfaEnabled ? 'Enabled' : 'Disabled', 'Last Login': u.lastLogin, Status: u.status,
    }));

    return (
        <AppShell>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-navy-900">User Management & Access Control</h1>
                    <div className="flex space-x-3">
                        <button onClick={() => setIsRbacOpen(true)} className="px-4 py-2 bg-white border border-gray-200 rounded text-sm font-medium text-gray-600 hover:bg-gray-50 shadow-sm">RBAC Matrix</button>
                        <button onClick={() => setIsAddUserOpen(true)} className="px-4 py-2 bg-navy-900 text-white rounded text-sm font-medium hover:bg-navy-800 shadow-sm flex items-center">
                            <PlusIcon className="w-4 h-4 mr-2" /> Add User
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                        <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-navy-900 text-sm">Active Users</h3>
                            <div className="flex space-x-1">
                                {roles.map(r => (
                                    <button key={r} onClick={() => setFilterRole(r)} className={cn("px-3 py-1 text-xs font-medium rounded transition-colors", filterRole === r ? "bg-navy-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200")}>{r}</button>
                                ))}
                            </div>
                        </div>
                        <TableToolbar searchValue={search} onSearchChange={setSearch} onRefresh={() => { }} exportData={exportData} exportFilename="users" />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                                <tr>
                                    <th className="p-4 font-medium w-12">S/N</th>
                                    <th className="p-4 font-medium">Name</th>
                                    <th className="p-4 font-medium">Role</th>
                                    <th className="p-4 font-medium">Department</th>
                                    <th className="p-4 font-medium">Email</th>
                                    <th className="p-4 font-medium">MFA</th>
                                    <th className="p-4 font-medium">Last Login</th>
                                    <th className="p-4 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {paged.map((user, idx) => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 text-gray-400 text-xs font-mono">{(page - 1) * pageSize + idx + 1}</td>
                                        <td className="p-4">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 rounded-full bg-navy-900 text-white flex items-center justify-center font-bold text-xs mr-3 shrink-0">
                                                    {user.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                                                </div>
                                                <p className="font-medium text-navy-900">{user.name}</p>
                                            </div>
                                        </td>
                                        <td className="p-4"><span className="bg-navy-100 text-navy-700 text-xs font-medium px-2 py-0.5 rounded">{user.role}</span></td>
                                        <td className="p-4 text-gray-600">{user.department}</td>
                                        <td className="p-4 text-gray-600 text-xs">{user.email}</td>
                                        <td className="p-4">
                                            <span className={cn("text-xs font-medium px-2 py-0.5 rounded",
                                                user.mfaEnabled ? "bg-success-bg text-success" : "bg-warning-bg text-warning"
                                            )}>{user.mfaEnabled ? 'Enabled' : 'Disabled'}</span>
                                        </td>
                                        <td className="p-4 font-mono text-xs text-gray-500">{user.lastLogin}</td>
                                        <td className="p-4"><StatusBadge status={user.status} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <TablePagination currentPage={page} totalItems={totalItems} pageSize={pageSize} onPageChange={setPage} />
                </div>
            </div>

            {/* Add User Modal */}
            {isAddUserOpen && (
                <div className="fixed inset-0 bg-navy-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-navy-900">Add New User</h3>
                            <button onClick={() => setIsAddUserOpen(false)} className="text-gray-400 hover:text-gray-600 font-bold">&times;</button>
                        </div>
                        <div className="p-6 overflow-y-auto flex-1">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                                    <input type="text" className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none" placeholder="First name" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                                    <input type="text" className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none" placeholder="Last name" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                                    <input type="email" className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none" placeholder="user@valualliance.com.ng" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input type="tel" className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none" placeholder="+234..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                                    <select className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none">
                                        <option>Select Role...</option>
                                        <option>Portfolio Manager</option><option>Risk Analyst</option><option>Fund Accountant</option><option>Compliance Officer</option><option>Operations Manager</option><option>Administrator</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                                    <select className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-gold-500 focus:border-gold-500 outline-none">
                                        <option>Select Department...</option>
                                        <option>Investment Management</option><option>Risk & Compliance</option><option>Operations</option><option>Finance</option><option>IT</option>
                                    </select>
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Module Permissions</label>
                                    <div className="grid grid-cols-3 gap-2 bg-gray-50 p-3 rounded">
                                        {['Dashboard', 'Portfolio', 'Trades', 'Settlement', 'Fund Accounting', 'Fees', 'Risk & Compliance', 'Audit Log', 'Documents'].map(mod => (
                                            <label key={mod} className="flex items-center text-xs text-gray-700"><input type="checkbox" className="mr-1.5 rounded border-gray-300 text-gold-500 focus:ring-gold-500" defaultChecked />{mod}</label>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-span-2 flex items-center">
                                    <input type="checkbox" className="mr-2 rounded border-gray-300 text-gold-500 focus:ring-gold-500" defaultChecked />
                                    <label className="text-sm text-gray-700">Require MFA on first sign-in</label>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
                            <button onClick={() => setIsAddUserOpen(false)} className="px-4 py-2 border border-gray-300 rounded text-gray-700 text-sm font-medium hover:bg-gray-100">Cancel</button>
                            <button onClick={() => { setIsAddUserOpen(false); alert('User creation submitted for approval!'); }} className="px-4 py-2 bg-navy-900 text-white rounded text-sm font-medium shadow hover:bg-navy-800">Submit for Approval</button>
                        </div>
                    </div>
                </div>
            )}

            {/* RBAC Matrix Modal */}
            {isRbacOpen && (
                <div className="fixed inset-0 bg-navy-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden max-h-[90vh] flex flex-col">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-navy-900">Role-Based Access Control Matrix</h3>
                            <button onClick={() => setIsRbacOpen(false)} className="text-gray-400 hover:text-gray-600 font-bold">&times;</button>
                        </div>
                        <div className="overflow-auto flex-1">
                            <table className="w-full text-xs text-left">
                                <thead className="bg-gray-50 text-gray-500 border-b border-gray-200 sticky top-0">
                                    <tr>
                                        <th className="p-3 font-medium">Module</th>
                                        <th className="p-3 font-medium text-center">Portfolio Manager</th>
                                        <th className="p-3 font-medium text-center">Fund Accountant</th>
                                        <th className="p-3 font-medium text-center">Risk Analyst</th>
                                        <th className="p-3 font-medium text-center">Compliance Officer</th>
                                        <th className="p-3 font-medium text-center">Operations</th>
                                        <th className="p-3 font-medium text-center">Admin</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {[
                                        { mod: 'Dashboard', pm: '✓', fa: '✓', ra: '✓', co: '✓', op: '✓', ad: '✓' },
                                        { mod: 'Portfolio', pm: '✓ R/W', fa: '✓ R', ra: '✓ R', co: '✓ R', op: '✓ R', ad: '✓ R/W' },
                                        { mod: 'Trades', pm: '✓ R/W', fa: '✓ R', ra: '✓ R', co: '✓ Approve', op: '✓ R', ad: '✓ R/W' },
                                        { mod: 'Fund Accounting', pm: '✓ R', fa: '✓ R/W', ra: '✓ R', co: '✓ R', op: '✓ R', ad: '✓ R/W' },
                                        { mod: 'Risk & Compliance', pm: '✓ R', fa: '✗', ra: '✓ R/W', co: '✓ R/W', op: '✗', ad: '✓ R/W' },
                                        { mod: 'User Management', pm: '✗', fa: '✗', ra: '✗', co: '✗', op: '✗', ad: '✓ R/W' },
                                        { mod: 'Authorization Queue', pm: '✓ R', fa: '✓ R', ra: '✓ Approve', co: '✓ Approve', op: '✓ R', ad: '✓ Approve' },
                                    ].map(row => (
                                        <tr key={row.mod} className="hover:bg-gray-50">
                                            <td className="p-3 font-medium text-navy-900">{row.mod}</td>
                                            {['pm', 'fa', 'ra', 'co', 'op', 'ad'].map(role => (
                                                <td key={role} className="p-3 text-center">
                                                    <span className={cn("font-medium", (row as any)[role].includes('✓') ? "text-success" : "text-gray-300")}>{(row as any)[role]}</span>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 flex justify-end">
                            <button onClick={() => setIsRbacOpen(false)} className="px-4 py-2 bg-navy-900 text-white rounded text-sm font-medium hover:bg-navy-800">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </AppShell>
    );
}
