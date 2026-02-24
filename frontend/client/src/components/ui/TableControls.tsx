import React, { useState, useRef, useEffect } from 'react';
import { SearchIcon, RefreshIcon, DownloadIcon, cn } from '../icons/Icons';

/* ───────────────────────────────────────────────
   TableToolbar — search, refresh, export
   ─────────────────────────────────────────────── */
interface TableToolbarProps {
    searchValue: string;
    onSearchChange: (v: string) => void;
    onRefresh: () => void;
    /** Data rows to export (array of objects) */
    exportData: Record<string, any>[];
    /** Filename without extension */
    exportFilename?: string;
    /** Optional slot for extra left-side content */
    children?: React.ReactNode;
}

export function TableToolbar({ searchValue, onSearchChange, onRefresh, exportData, exportFilename = 'export', children }: TableToolbarProps) {
    const [spinning, setSpinning] = useState(false);
    const [exportOpen, setExportOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setExportOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleRefresh = () => {
        setSpinning(true);
        onRefresh();
        setTimeout(() => setSpinning(false), 800);
    };

    /* ── CSV export ── */
    const exportCSV = () => {
        if (!exportData.length) return;
        const headers = Object.keys(exportData[0]);
        const csvRows = [headers.join(',')];
        exportData.forEach(row => {
            csvRows.push(headers.map(h => {
                const val = row[h] ?? '';
                const str = typeof val === 'object' ? JSON.stringify(val) : String(val);
                return `"${str.replace(/"/g, '""')}"`;
            }).join(','));
        });
        download(csvRows.join('\n'), `${exportFilename}.csv`, 'text/csv');
        setExportOpen(false);
    };

    /* ── XLSX export (simple XML spreadsheet) ── */
    const exportXLSX = () => {
        if (!exportData.length) return;
        const headers = Object.keys(exportData[0]);
        let xml = '<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?>';
        xml += '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">';
        xml += '<Worksheet ss:Name="Sheet1"><Table>';
        // Header row
        xml += '<Row>' + headers.map(h => `<Cell><Data ss:Type="String">${escXml(h)}</Data></Cell>`).join('') + '</Row>';
        // Data rows
        exportData.forEach(row => {
            xml += '<Row>' + headers.map(h => {
                const val = row[h] ?? '';
                const isNum = typeof val === 'number';
                return `<Cell><Data ss:Type="${isNum ? 'Number' : 'String'}">${escXml(String(val))}</Data></Cell>`;
            }).join('') + '</Row>';
        });
        xml += '</Table></Worksheet></Workbook>';
        download(xml, `${exportFilename}.xlsx`, 'application/vnd.ms-excel');
        setExportOpen(false);
    };

    /* ── PDF export (simple printable HTML) ── */
    const exportPDF = () => {
        if (!exportData.length) return;
        const headers = Object.keys(exportData[0]);
        let html = `<html><head><title>${exportFilename}</title>
        <style>body{font-family:Arial,sans-serif;padding:20px;font-size:11px}
        table{width:100%;border-collapse:collapse}
        th,td{border:1px solid #ccc;padding:6px 8px;text-align:left}
        th{background:#0E4535;color:#fff;font-weight:600}
        tr:nth-child(even){background:#f9f9f9}
        h2{color:#0E4535;margin-bottom:4px}
        .meta{color:#666;font-size:10px;margin-bottom:16px}
        </style></head><body>
        <h2>${exportFilename.replace(/_/g, ' ')}</h2>
        <p class="meta">Generated: ${new Date().toLocaleString()} • ${exportData.length} records</p>
        <table><thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>`;
        exportData.forEach(row => {
            html += '<tr>' + headers.map(h => {
                const val = row[h] ?? '';
                return `<td>${typeof val === 'object' ? JSON.stringify(val) : val}</td>`;
            }).join('') + '</tr>';
        });
        html += '</tbody></table></body></html>';
        const win = window.open('', '_blank');
        if (win) {
            win.document.write(html);
            win.document.close();
            setTimeout(() => { win.print(); }, 400);
        }
        setExportOpen(false);
    };

    return (
        <div className="flex items-center gap-2 flex-wrap">
            {children}
            {/* Search */}
            <div className="relative flex-1 min-w-[180px] max-w-xs">
                <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                    type="text"
                    value={searchValue}
                    onChange={e => onSearchChange(e.target.value)}
                    placeholder="Search…"
                    className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded bg-white focus:outline-none focus:ring-1 focus:ring-navy-500 focus:border-navy-500 transition-shadow placeholder-gray-400"
                />
                {searchValue && (
                    <button onClick={() => onSearchChange('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs">✕</button>
                )}
            </div>

            {/* Refresh */}
            <button
                onClick={handleRefresh}
                title="Refresh"
                className="p-1.5 rounded border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-navy-700 transition-colors"
            >
                <RefreshIcon className={cn("w-3.5 h-3.5 transition-transform", spinning && "animate-spin")} />
            </button>

            {/* Export dropdown */}
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setExportOpen(!exportOpen)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium border border-gray-200 rounded bg-white text-gray-600 hover:bg-gray-50 transition-colors"
                >
                    <DownloadIcon className="w-3.5 h-3.5" /> Export
                    <svg className={cn("w-3 h-3 transition-transform", exportOpen && "rotate-180")} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
                </button>
                {exportOpen && (
                    <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1 animate-in fade-in slide-in-from-top-1 duration-150">
                        <button onClick={exportCSV} className="w-full px-3 py-2 text-left text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                            <span className="w-5 h-5 rounded bg-green-100 text-green-700 flex items-center justify-center text-[10px] font-bold">CSV</span>
                            Export as CSV
                        </button>
                        <button onClick={exportXLSX} className="w-full px-3 py-2 text-left text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                            <span className="w-5 h-5 rounded bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold">XLS</span>
                            Export as Excel
                        </button>
                        <button onClick={exportPDF} className="w-full px-3 py-2 text-left text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                            <span className="w-5 h-5 rounded bg-red-100 text-red-700 flex items-center justify-center text-[10px] font-bold">PDF</span>
                            Export as PDF
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ───────────────────────────────────────────────
   TablePagination
   ─────────────────────────────────────────────── */
interface TablePaginationProps {
    currentPage: number;
    totalItems: number;
    pageSize: number;
    onPageChange: (page: number) => void;
}

export function TablePagination({ currentPage, totalItems, pageSize, onPageChange }: TablePaginationProps) {
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalItems);

    // Generate page numbers with ellipsis
    const getPages = () => {
        const pages: (number | '...')[] = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push('...');
            for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) pages.push(i);
            if (currentPage < totalPages - 2) pages.push('...');
            pages.push(totalPages);
        }
        return pages;
    };

    if (totalItems === 0) return null;

    return (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50/50">
            <span className="text-xs text-gray-500">
                Showing <span className="font-medium text-gray-700">{start}</span>–<span className="font-medium text-gray-700">{end}</span> of <span className="font-medium text-gray-700">{totalItems}</span>
            </span>
            <div className="flex items-center gap-1">
                <button
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className="px-2 py-1 text-xs rounded border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                    ‹ Prev
                </button>
                {getPages().map((p, i) =>
                    p === '...' ? (
                        <span key={`e${i}`} className="px-1 text-xs text-gray-400">…</span>
                    ) : (
                        <button
                            key={p}
                            onClick={() => onPageChange(p as number)}
                            className={cn(
                                "w-7 h-7 text-xs rounded border transition-colors",
                                currentPage === p
                                    ? "bg-navy-900 text-white border-navy-900"
                                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                            )}
                        >
                            {p}
                        </button>
                    )
                )}
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    className="px-2 py-1 text-xs rounded border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                    Next ›
                </button>
            </div>
        </div>
    );
}

/* ── Helpers ── */
function escXml(s: string) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

function download(content: string, filename: string, mime: string) {
    const blob = new Blob([content], { type: mime + ';charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

/* ── Hook for table search + pagination ── */
export function useTableControls<T extends Record<string, any>>(
    data: T[],
    pageSize = 10,
    searchableFields?: (keyof T)[]
) {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const filtered = search.trim()
        ? data.filter(row => {
            const q = search.toLowerCase();
            const fields = searchableFields || (Object.keys(row) as (keyof T)[]);
            return fields.some(f => {
                const v = row[f];
                if (v == null) return false;
                return String(v).toLowerCase().includes(q);
            });
        })
        : data;

    // Reset to page 1 when search changes
    const handleSearch = (v: string) => { setSearch(v); setPage(1); };

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const safePage = Math.min(page, totalPages);
    const paged = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

    return {
        search,
        setSearch: handleSearch,
        page: safePage,
        setPage,
        filtered,
        paged,
        totalItems: filtered.length,
        pageSize,
    };
}
