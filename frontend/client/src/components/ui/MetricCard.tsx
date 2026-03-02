import React, { ReactNode } from 'react';
import { ArrowUpIcon, ArrowDownIcon, NairaIcon, cn } from '../icons/Icons';

interface MetricCardProps {
  label: string;
  value: string;
  isCurrency?: boolean;
  trend?: string;
  trendPositive?: boolean;
  icon: ReactNode;
  iconBg?: string;
  iconSize?: 'default' | 'lg';
}

export function MetricCard({ label, value, isCurrency, trend, trendPositive = true, icon, iconBg = "bg-navy-100", iconSize = 'default' }: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-gray-500 text-sm font-medium">{label}</h3>
        <div className={cn(
          "rounded-full flex items-center justify-center text-navy-700",
          iconSize === 'lg' ? "w-12 h-12 [&>svg]:w-6 [&>svg]:h-6" : "w-10 h-10",
          iconBg
        )}>
          {icon}
        </div>
      </div>
      <div className="flex items-baseline">
        {isCurrency && <NairaIcon className="w-6 h-6 mr-1 text-navy-900" />}
        <span className="text-2xl font-bold text-navy-900 tracking-tight">{value}</span>
      </div>
      {trend && (
        <div className="mt-4 flex items-center text-sm">
          <span className={cn("flex items-center font-medium", trendPositive ? "text-success" : "text-danger")}>
            {trendPositive ? <ArrowUpIcon className="w-3.5 h-3.5 mr-1" /> : <ArrowDownIcon className="w-3.5 h-3.5 mr-1" />}
            {trend}
          </span>
        </div>
      )}
    </div>
  );
}
