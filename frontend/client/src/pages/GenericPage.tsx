import React from 'react';
import { AppShell } from '../components/layout/AppShell';
import { useLocation } from 'wouter';

export default function GenericPage() {
  const [location] = useLocation();
  const pageName = location.replace('/', '').replace('-', ' ');

  return (
    <AppShell>
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-navy-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-navy-900 mb-2 capitalize">{pageName} Module</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          This module is part of the ValuAlliance Enterprise suite. Features and data views for this section are designed based on user roles and permissions.
        </p>
      </div>
    </AppShell>
  );
}
