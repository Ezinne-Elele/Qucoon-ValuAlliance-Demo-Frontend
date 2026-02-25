import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import {
  DashboardIcon, PortfolioIcon, TradeIcon, SettlementIcon, ValuationIcon,
  FundAccountingIcon, FeeIcon, ReconciliationIcon, RiskIcon, PerformanceIcon,
  ClientManagementIcon, RegulatoryIcon, UsersIcon, AuditIcon, DocumentIcon,
  CorporateActionsIcon, BellIcon, SearchIcon, LogoutIcon, NairaIcon,
  AuthorizationQueueIcon, ChevronDownIcon, cn, PanelLeftIcon, PanelRightIcon
} from '../icons/Icons';

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Dynamic Breadcrumbs
  const pathParts = location.split('/').filter(p => p !== '');
  const breadcrumbs = [
    { label: 'Home', path: '/dashboard' },
    ...pathParts.map((part, i) => ({
      label: part.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      path: '/' + pathParts.slice(0, i + 1).join('/')
    }))
  ];

  const navGroups: NavGroup[] = [
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
    <div className="flex h-screen bg-[#FDFDFD] overflow-hidden">
      {/* Sidebar */}
      <aside className={cn(
        "bg-navy-900 text-white flex flex-col flex-shrink-0 z-20 shadow-xl transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64"
      )}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-navy-800 shrink-0 overflow-hidden">
          {!isCollapsed && <img src="/logo.png" alt="ValuAlliance" className="h-7 brightness-0 invert" />}
          {isCollapsed && <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center font-bold text-navy-900 text-sm">V</div>}
        </div>

        <div className="flex-1 overflow-y-auto py-4 custom-scrollbar overflow-x-hidden">
          {navGroups.map((group, idx) => (
            <div key={idx} className="mb-6">
              {!isCollapsed && (
                <h2 className="px-6 text-[10px] font-bold text-gray-500 uppercase tracking-[2px] mb-3 animate-in fade-in duration-500">
                  {group.label}
                </h2>
              )}
              {isCollapsed && <div className="px-6 mb-3 border-b border-navy-800 opacity-20"></div>}
              <ul>
                {group.items.map((item) => {
                  const isActive = location === item.path;
                  return (
                    <li key={item.name} title={isCollapsed ? item.name : ""}>
                      <Link href={item.path} className={cn(
                        "flex items-center py-2.5 transition-all duration-200 border-l-[3px]",
                        isCollapsed ? "justify-center px-0" : "px-6",
                        isActive
                          ? "bg-navy-700 border-gold-500 text-white shadow-inner"
                          : "border-transparent text-gray-400 hover:bg-navy-800 hover:text-white"
                      )}>
                        <item.icon className={cn(
                          "w-4 h-4 transition-transform",
                          !isCollapsed && "mr-3",
                          isActive ? "text-gold-500 scale-110" : "text-gray-400 group-hover:scale-110"
                        )} />
                        {!isCollapsed && <span className="text-[13px] font-medium tracking-tight truncate">{item.name}</span>}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className={cn(
          "p-4 border-t border-navy-700 bg-navy-950 transition-all",
          isCollapsed ? "items-center" : ""
        )}>
          <div className={cn("flex items-center mb-6", isCollapsed ? "justify-center" : "")}>
            <div className="w-9 h-9 rounded-xl bg-gold-500 text-navy-900 flex items-center justify-center font-bold text-xs shrink-0 shadow-lg shadow-gold-500/10">
              AO
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden ml-3 animate-in slide-in-from-left-2 duration-300">
                <p className="text-[13px] font-bold text-white truncate">Adaeze Okonkwo</p>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter truncate">Portfolio Manager</p>
              </div>
            )}
          </div>

          <div className={cn(
            "flex items-center text-gray-400",
            isCollapsed ? "flex-col space-y-4" : "justify-between"
          )}>
            <Link href="/notifications" className="p-2 hover:text-white hover:bg-navy-800 rounded-lg transition-all relative group">
              <BellIcon className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-danger rounded-full border border-navy-950"></span>
            </Link>
            <button className="p-2 hover:text-white hover:bg-navy-800 rounded-lg transition-all">
              <SearchIcon className="w-4 h-4" />
            </button>
            <Link href="/login" className="p-2 hover:text-white hover:bg-navy-800 rounded-lg transition-all">
              <LogoutIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 shrink-0 z-10 sticky top-0">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 text-gray-400 hover:text-navy-900 hover:bg-gray-50 rounded-lg transition-all shadow-sm border border-gray-100/50"
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isCollapsed ? <PanelRightIcon className="w-4 h-4" /> : <PanelLeftIcon className="w-4 h-4" />}
            </button>

            {/* Breadcrumbs */}
            <nav className="flex items-center space-x-3 text-[13px] font-medium hidden md:flex">
              {breadcrumbs.map((bc, idx) => (
                <React.Fragment key={bc.path}>
                  {idx > 0 && <span className="text-gray-200 font-light">/</span>}
                  <Link
                    href={bc.path}
                    className={cn(
                      "transition-colors",
                      idx === breadcrumbs.length - 1 ? "text-navy-900 font-bold" : "text-gray-400 hover:text-navy-700"
                    )}
                  >
                    {bc.label}
                  </Link>
                </React.Fragment>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-6">
            {/* Command Palette Search */}
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                <SearchIcon className="w-3.5 h-3.5 text-gray-400 group-focus-within:text-gold-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search command (⌘K)"
                className="pl-9 pr-12 py-1.5 bg-gray-100/50 border border-transparent rounded-full text-[13px] w-64 focus:bg-white focus:border-gold-500/50 focus:ring-4 focus:ring-gold-500/5 outline-none transition-all shadow-inner"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-0.5">
                <kbd className="px-1.5 py-0.5 bg-gray-200 text-gray-500 rounded text-[9px] font-mono leading-none border border-gray-300">⌘</kbd>
                <kbd className="px-1.5 py-0.5 bg-gray-200 text-gray-500 rounded text-[9px] font-mono leading-none border border-gray-300">K</kbd>
              </div>
            </div>

            <div className="flex items-center space-x-4 border-l pl-4 border-gray-100">
              <p className="text-[12px] text-gray-400 font-mono tracking-tighter">FEB 24, 2026</p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#F9FAFB]/50">
          {children}
        </main>
      </div>
    </div>
  );
}
