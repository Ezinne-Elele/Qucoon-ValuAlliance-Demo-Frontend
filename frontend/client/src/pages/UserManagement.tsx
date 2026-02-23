import React, { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { StatusBadge } from '../components/ui/StatusBadge';
import { MetricCard } from '../components/ui/MetricCard';
import { mockUsers } from '../data/mockData';
import { UsersIcon, PlusIcon, CheckCircleIcon, AlertIcon, cn } from '../components/icons/Icons';

export default function UserManagement() {
    const [showRoles, setShowRoles] = useState(false);
    const activeUsers = mockUsers.filter(u => u.status === 'Active').length;
    const mfaEnabled = mockUsers.filter(u => u.mfaEnabled).length;

    const roles = [
        { role: 'System Administrator', permissions: ['Full system access', 'User management', 'Configuration', 'Audit log access'] },
        { role: 'Chief Investment Officer', permissions: ['Portfolio management', 'Trade approval', 'Performance reporting', 'Compliance oversight'] },
        { role: 'Portfolio Manager', permissions: ['Portfolio management', 'Trade entry & submission', 'Valuation review', 'Client reporting'] },
        { role: 'Compliance Officer', permissions: ['Compliance monitoring', 'AML alerts', 'Regulatory returns', 'Breach management'] },
        { role: 'Fund Accountant', permissions: ['Fund accounting', 'NAV calculation', 'Fee management', 'Reconciliation'] },
        { role: 'Operations Manager', permissions: ['Settlement processing', 'Reconciliation', 'Corporate actions', 'Document management'] },
    ];

    return (
        <AppShell>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-navy-900">User Management & RBAC</h1>
                    <div className="flex space-x-3">
                        <button onClick={() => setShowRoles(!showRoles)} className="px-3 py-2 bg-white border border-gray-200 rounded text-gray-600 hover:bg-gray-50 text-sm font-medium shadow-sm">
                            {showRoles ? 'Hide Roles' : 'View Roles'}
                        </button>
                        <button className="px-4 py-2 bg-navy-900 text-white rounded text-sm font-medium hover:bg-navy-800 flex items-center shadow-sm">
                            <PlusIcon className="w-4 h-4 mr-2" /> Add User
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MetricCard label="Active Users" value={activeUsers.toString()} trend="All departments" icon={<UsersIcon />} />
                    <MetricCard label="MFA Enabled" value={`${mfaEnabled}/${mockUsers.length}`} trend={`${Math.round(mfaEnabled / mockUsers.length * 100)}% compliance`} icon={<CheckCircleIcon />} iconBg="bg-success-bg" />
                    <MetricCard label="MFA Disabled" value={(mockUsers.length - mfaEnabled).toString()} trend="Action required" trendPositive={false} icon={<AlertIcon />} iconBg="bg-danger-bg" />
                </div>

                {showRoles && (
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                        <h3 className="font-semibold text-navy-900 mb-4 text-sm">Role-Based Access Control Matrix</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {roles.map(r => (
                                <div key={r.role} className="border border-gray-200 rounded-lg p-4 hover:border-gold-500 transition-colors">
                                    <h4 className="font-semibold text-navy-900 text-sm mb-2">{r.role}</h4>
                                    <ul className="space-y-1">
                                        {r.permissions.map(p => (
                                            <li key={p} className="text-xs text-gray-600 flex items-center">
                                                <CheckCircleIcon className="w-3 h-3 text-success mr-2 shrink-0" />{p}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                                <tr>
                                    <th className="p-4 font-medium">User</th>
                                    <th className="p-4 font-medium">Role</th>
                                    <th className="p-4 font-medium">Department</th>
                                    <th className="p-4 font-medium">Last Login</th>
                                    <th className="p-4 font-medium">MFA</th>
                                    <th className="p-4 font-medium">Status</th>
                                    <th className="p-4 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {mockUsers.map(user => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center">
                                                <div className="w-9 h-9 rounded-full bg-gold-500 text-navy-900 flex items-center justify-center font-bold text-xs mr-3 shrink-0">{user.initials}</div>
                                                <div>
                                                    <p className="font-medium text-navy-900">{user.name}</p>
                                                    <p className="text-xs text-gray-500">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-700">{user.role}</td>
                                        <td className="p-4"><span className="bg-navy-100 text-navy-700 text-xs font-medium px-2 py-0.5 rounded">{user.department}</span></td>
                                        <td className="p-4 font-mono text-xs text-gray-600">{user.lastLogin}</td>
                                        <td className="p-4">
                                            {user.mfaEnabled ?
                                                <span className="bg-success-bg text-success border border-success/20 text-xs font-medium px-2 py-0.5 rounded-full flex items-center w-fit"><CheckCircleIcon className="w-3 h-3 mr-1" />Enabled</span> :
                                                <span className="bg-danger-bg text-danger border border-danger/20 text-xs font-medium px-2 py-0.5 rounded-full flex items-center w-fit"><AlertIcon className="w-3 h-3 mr-1" />Disabled</span>
                                            }
                                        </td>
                                        <td className="p-4"><StatusBadge status={user.status} /></td>
                                        <td className="p-4">
                                            <div className="flex space-x-2">
                                                <button className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200">Edit</button>
                                                <button className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200">Reset Password</button>
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
