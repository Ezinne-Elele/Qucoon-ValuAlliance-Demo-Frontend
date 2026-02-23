import React, { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { mockNotifications } from '../data/mockData';
import { RiskIcon, SettlementIcon, ReconciliationIcon, AlertIcon, TradeIcon, RegulatoryIcon, cn } from '../components/icons/Icons';

export default function Notifications() {
    const [filter, setFilter] = useState('All');
    const tabs = ['All', 'Compliance', 'Settlement', 'Reconciliation', 'Regulatory', 'Trade'];
    const filtered = filter === 'All' ? mockNotifications : mockNotifications.filter(n => n.type.toLowerCase().includes(filter.toLowerCase()));

    const getIcon = (type: string) => {
        if (type.includes('Compliance')) return <RiskIcon className="w-5 h-5" />;
        if (type.includes('Settlement')) return <SettlementIcon className="w-5 h-5" />;
        if (type.includes('Reconciliation')) return <ReconciliationIcon className="w-5 h-5" />;
        if (type.includes('Regulatory')) return <RegulatoryIcon className="w-5 h-5" />;
        if (type.includes('Trade')) return <TradeIcon className="w-5 h-5" />;
        return <AlertIcon className="w-5 h-5" />;
    };

    const getSeverityColor = (severity: string) => {
        if (severity === 'High') return 'bg-danger';
        if (severity === 'Medium') return 'bg-warning';
        return 'bg-navy-900';
    };

    const getTimeAgo = (timestamp: string) => {
        const diff = Date.now() - new Date(timestamp).getTime();
        const hours = Math.floor(diff / 3600000);
        if (hours < 1) return 'Just now';
        if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        const days = Math.floor(hours / 24);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    };

    return (
        <AppShell>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-navy-900">Notification Centre</h1>
                    <button className="px-4 py-2 bg-navy-900 text-white rounded text-sm font-medium hover:bg-navy-800 shadow-sm">Mark All Read</button>
                </div>

                <div className="flex space-x-1 border-b border-gray-200 overflow-x-auto">
                    {tabs.map(tab => (
                        <button key={tab} onClick={() => setFilter(tab)} className={cn("px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap", filter === tab ? "border-gold-500 text-navy-900" : "border-transparent text-gray-500 hover:text-navy-700")}>{tab}</button>
                    ))}
                </div>

                <div className="space-y-3">
                    {filtered.map(n => (
                        <a key={n.id} href={n.link} className={cn("block bg-white rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-all", !n.read ? "border-l-4" : "border-gray-200", !n.read && n.severity === 'High' ? "border-l-danger" : !n.read && n.severity === 'Medium' ? "border-l-warning" : !n.read ? "border-l-navy-900" : "")}>
                            <div className="flex items-start p-4">
                                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center mr-4 shrink-0 text-white", getSeverityColor(n.severity))}>
                                    {getIcon(n.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <h3 className={cn("text-sm text-navy-900", !n.read ? "font-bold" : "font-medium")}>{n.title}</h3>
                                        <div className="flex items-center ml-4 shrink-0">
                                            <span className="text-xs text-gray-400">{getTimeAgo(n.timestamp)}</span>
                                            {!n.read && <div className="w-2.5 h-2.5 bg-gold-500 rounded-full ml-3"></div>}
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">{n.message}</p>
                                    <span className="text-xs text-gray-400 mt-2 inline-block">{n.type}</span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </AppShell>
    );
}
