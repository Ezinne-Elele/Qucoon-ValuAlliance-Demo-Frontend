import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import {
  DashboardIcon, PortfolioIcon, TradeIcon, SettlementIcon, ValuationIcon,
  FundAccountingIcon, FeeIcon, ReconciliationIcon, RiskIcon, PerformanceIcon,
  ClientManagementIcon, RegulatoryIcon, UsersIcon, AuditIcon, DocumentIcon,
  CorporateActionsIcon, BellIcon, SearchIcon, LogoutIcon, NairaIcon,
  AuthorizationQueueIcon, cn
} from '../icons/Icons';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navGroups = [
    {
      label: "OPERATIONS",
      items: [
        { name: "Dashboard", path: "/dashboard", icon: DashboardIcon },
        { name: "Portfolio", path: "/portfolio", icon: PortfolioIcon },
        { name: "Trades", path: "/trades", icon: TradeIcon },
        { name: "Settlement", path: "/settlement", icon: SettlementIcon },
        { name: "Valuation", path: "/valuation", icon: ValuationIcon },
      ]
    },
    {
      label: "FINANCE",
      items: [
        { name: "Fund Accounting", path: "/fund-accounting", icon: FundAccountingIcon },
        { name: "Fees & Billing", path: "/fees", icon: FeeIcon },
        { name: "Reconciliation", path: "/reconciliation", icon: ReconciliationIcon },
      ]
    },
    {
      label: "COMPLIANCE",
      items: [
        { name: "Risk & Compliance", path: "/risk-compliance", icon: RiskIcon },
        { name: "Regulatory Returns", path: "/regulatory-returns", icon: RegulatoryIcon },
        { name: "Authorization Queue", path: "/authorization-queue", icon: AuthorizationQueueIcon },
      ]
    },
    {
      label: "ANALYTICS",
      items: [
        { name: "Performance", path: "/performance", icon: PerformanceIcon },
        { name: "Client Management", path: "/client-management", icon: ClientManagementIcon },
      ]
    },
    {
      label: "ADMINISTRATION",
      items: [
        { name: "User Management", path: "/users", icon: UsersIcon },
        { name: "Audit Log", path: "/audit-log", icon: AuditIcon },
        { name: "Documents", path: "/documents", icon: DocumentIcon },
        { name: "Corporate Actions", path: "/corporate-actions", icon: CorporateActionsIcon },
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-navy-900 text-white flex flex-col flex-shrink-0">
        <div className="h-16 flex items-center px-5 bg-navy-950 border-b border-gold-500/30">
          <img src="/logo.png" alt="ValuAlliance" className="h-9 mr-2 brightness-0 invert" />
        </div>

        <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          {navGroups.map((group, idx) => (
            <div key={idx} className="mb-6">
              <h2 className="px-6 text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">{group.label}</h2>
              <ul>
                {group.items.map((item) => {
                  const isActive = location === item.path;
                  return (
                    <li key={item.name}>
                      <Link href={item.path} className={cn(
                        "flex items-center px-6 py-2.5 text-[13px] font-medium transition-colors border-l-2",
                        isActive
                          ? "bg-navy-700 border-gold-500 text-white"
                          : "border-transparent text-gray-400 hover:bg-navy-800 hover:text-white"
                      )}>
                        <item.icon className={cn("mr-3 w-4 h-4", isActive ? "text-gold-500" : "text-gray-400")} />
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-navy-700 bg-navy-950">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-gold-500 text-navy-900 flex items-center justify-center font-bold text-xs mr-3 shrink-0">
              AO
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-white truncate">Adaeze Okonkwo</p>
              <p className="text-xs text-gray-400 truncate">Portfolio Manager</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-gray-400">
            <Link href="/notifications" className="p-1.5 hover:text-white hover:bg-navy-800 rounded transition-colors relative">
              <BellIcon className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
            </Link>
            <button className="p-1.5 hover:text-white hover:bg-navy-800 rounded transition-colors">
              <SearchIcon className="w-4 h-4" />
            </button>
            <Link href="/login" className="p-1.5 hover:text-white hover:bg-navy-800 rounded transition-colors">
              <LogoutIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-10">
          <h2 className="text-xl font-semibold text-navy-900 tracking-tight capitalize">
            {location.replace('/', '').replace(/-/g, ' ') || 'Dashboard'}
          </h2>

          <div className="flex items-center space-x-6">
            <div className="relative">
              <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search portfolios, clients..."
                className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm w-64 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all"
              />
            </div>

            <div className="flex items-center space-x-4 border-l pl-4 border-gray-200">
              <p className="text-[13px] text-gray-500 font-medium">Monday, 24 February 2026</p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
