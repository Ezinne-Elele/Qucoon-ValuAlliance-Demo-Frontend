import React from 'react';
import { cn } from '../icons/Icons';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  let colorClass = "bg-gray-200 text-gray-600";
  
  const s = status.toLowerCase();
  if (s.includes('active') || s.includes('settled') || s.includes('approved') || s.includes('success')) {
    colorClass = "bg-success-bg text-success border border-success/20";
  } else if (s.includes('pending') || s.includes('draft') || s.includes('submitted') || s.includes('progress') || s.includes('warning')) {
    colorClass = "bg-warning-bg text-warning border border-warning/20";
  } else if (s.includes('fail') || s.includes('reject') || s.includes('breach') || s.includes('danger') || s.includes('high')) {
    colorClass = "bg-danger-bg text-danger border border-danger/20";
  }

  return (
    <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center whitespace-nowrap", colorClass, className)}>
      {status}
    </span>
  );
}
