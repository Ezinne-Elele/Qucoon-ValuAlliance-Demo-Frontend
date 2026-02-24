import React from 'react';
import { cn } from '../icons/Icons';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  let colorClass = "bg-gray-100 text-gray-600";

  const s = status.toLowerCase();
  if (s.includes('active') || s.includes('settled') || s.includes('approved') || s.includes('success') || s.includes('resolved') || s.includes('matched') || s.includes('verified') || s.includes('published') || s.includes('processed') || s.includes('within') || s.includes('distributed')) {
    colorClass = "bg-success-bg text-success";
  } else if (s.includes('pending') || s.includes('draft') || s.includes('submitted') || s.includes('progress') || s.includes('warning') || s.includes('upcoming') || s.includes('awaiting') || s.includes('invoiced') || s.includes('calculated') || s.includes('under')) {
    colorClass = "bg-warning-bg text-warning";
  } else if (s.includes('fail') || s.includes('reject') || s.includes('breach') || s.includes('danger') || s.includes('high') || s.includes('escalated') || s.includes('reported')) {
    colorClass = "bg-danger-bg text-danger";
  } else if (s.includes('not started') || s.includes('archived') || s.includes('disabled') || s.includes('low')) {
    colorClass = "bg-gray-100 text-gray-500";
  } else if (s.includes('medium')) {
    colorClass = "bg-warning-bg text-warning";
  } else if (s.includes('executed')) {
    colorClass = "bg-navy-100 text-navy-700";
  }

  return (
    <span className={cn("px-2 py-0.5 rounded text-xs font-medium inline-flex items-center whitespace-nowrap", colorClass, className)}>
      {status}
    </span>
  );
}
