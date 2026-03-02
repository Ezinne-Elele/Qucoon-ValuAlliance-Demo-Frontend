import React from 'react';
import { cn } from '../icons/Icons';

interface Metric {
    label: string;
    value: string;
    trend?: string;
    isPositive?: boolean;
}

interface ModuleHeaderProps {
    title: string;
    description?: string;
    metrics?: Metric[];
    actions?: React.ReactNode;
}

export function ModuleHeader({ title, description, metrics, actions }: ModuleHeaderProps) {
    return (
        <div className="space-y-6 mb-8">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-navy-900 tracking-tight">{title}</h1>
                    {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
                </div>
                <div className="flex items-center space-x-3">
                    {actions}
                </div>
            </div>

            {metrics && metrics.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {metrics.map((metric, i) => (
                        <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                            <span className="text-label mb-2">{metric.label}</span>
                            <div className="flex items-baseline justify-between">
                                <span className="text-xl font-bold text-navy-900">{metric.value}</span>
                                {metric.trend && (
                                    <span className={cn(
                                        "text-[10px] font-bold px-1.5 py-0.5 rounded",
                                        metric.isPositive ? "bg-success-bg text-success" : "bg-danger-bg text-danger"
                                    )}>
                                        {metric.trend}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
