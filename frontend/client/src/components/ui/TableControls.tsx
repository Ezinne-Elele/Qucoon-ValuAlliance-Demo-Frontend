import React, { useState, useRef, useEffect } from 'react';
import {
    SearchIcon, RefreshIcon, DownloadIcon, FilterIcon,
    ArrowUpDownIcon, ColumnsIcon, MaximizeIcon, cn
} from '../icons/Icons';

/* ───────────────────────────────────────────────
   TableToolbar — search, refresh, export, filters
   ─────────────────────────────────────────────── */
interface TableToolbarProps {
    searchValue: string;
    onSearchChange: (v: string) => void;
    onRefresh: () => void;
    /** Data rows to export (array of objects) */
    exportData: Record<string, any>[];
    /** Filename without extension */
    exportFilename?: string;
    /** Density state */
    density?: 'compact' | 'default' | 'tall';
    onDensityChange?: (d: 'compact' | 'default' | 'tall') => void;
    /** Optional slot for extra left-side content */
    children?: React.ReactNode;
}

export function TableToolbar({
    searchValue, onSearchChange, onRefresh, exportData,
    exportFilename = 'export', density = 'default', onDensityChange, children
}: TableToolbarProps) {
    const [spinning, setSpinning] = useState(false);
    const [exportOpen, setExportOpen] = useState(false);
    const [densityOpen, setDensityOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const densityRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setExportOpen(false);
            if (densityRef.current && !densityRef.current.contains(e.target as Node)) setDensityOpen(false);
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
        xml += '<Row>' + headers.map(h => `<Cell><Data ss:Type="String">${escXml(h)}</Data></Cell>`).join('') + '</Row>';
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
        let html = `<html><head><title>${exportFilename}</title><style>body{font-family:Arial,sans-serif;padding:20px;font-size:11px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ccc;padding:6px 8px;text-align:left}th{background:#0E4535;color:#fff;font-weight:600}tr:nth-child(even){background:#f9f9f9}h2{color:#0E4535;margin-bottom:4px}.meta{color:#666;font-size:10px;margin-bottom:16px}</style></head><body><h2>${exportFilename.replace(/_/g, ' ')}</h2><p class="meta">Generated: ${new Date().toLocaleString()} • ${exportData.length} records</p><table><thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>`;
        exportData.forEach(row => {
            html += '<tr>' + headers.map(h => {
                const val = row[h] ?? '';
                return `<td>${typeof val === 'object' ? JSON.stringify(val) : val}</td>`;
            }).join('') + '</tr>';
        });
        html += '</tbody></table></body></html>';
        const win = window.open('', '_blank');
        if (win) { win.document.write(html); win.document.close(); setTimeout(() => { win.print(); }, 400); }
        setExportOpen(false);
    };

    return (
        <div className="flex items-center gap-2 flex-wrap">
            {children}

            {/* Search — Refined to look like tablecn */}
            <div className="relative flex-1 min-w-[200px] max-w-xs group">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 group-focus-within:text-navy-900 transition-colors" />
                <input
                    type="text"
                    value={searchValue}
                    onChange={e => onSearchChange(e.target.value)}
                    placeholder="Filter records..."
                    className="w-full pl-9 pr-8 py-2 text-[13px] border border-gray-100 rounded-lg bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-900/5 focus:border-navy-900 transition-all placeholder:text-gray-400 font-medium"
                />
                {searchValue && (
                    <button onClick={() => onSearchChange('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                )}
            </div>

            {/* Functional Triggers (Grouped) */}
            <div className="flex bg-white border border-gray-100 p-0.5 rounded-lg shadow-sm">
                <button title="Filter" className="p-2 text-gray-400 hover:text-navy-900 hover:bg-gray-50 rounded-md transition-all">
                    <FilterIcon className="w-3.5 h-3.5" />
                </button>
                <button title="Sort" className="p-2 text-gray-400 hover:text-navy-900 hover:bg-gray-50 rounded-md transition-all">
                    <ArrowUpDownIcon className="w-3.5 h-3.5" />
                </button>
                <button title="Columns" className="p-2 text-gray-400 hover:text-navy-900 hover:bg-gray-50 rounded-md transition-all">
                    <ColumnsIcon className="w-3.5 h-3.5" />
                </button>

                {/* Density Toggle */}
                <div className="relative" ref={densityRef}>
                    <button
                        onClick={() => setDensityOpen(!densityOpen)}
                        title="Density"
                        className={cn(
                            "p-2 rounded-md transition-all",
                            densityOpen ? "bg-navy-900 text-white shadow-md scale-105" : "text-gray-400 hover:text-navy-900 hover:bg-gray-50"
                        )}
                    >
                        <MaximizeIcon className="w-3.5 h-3.5" />
                    </button>
                    {densityOpen && (
                        <div className="absolute right-0 top-full mt-2 w-32 bg-white border border-gray-100 rounded-xl shadow-xl z-50 py-1.5 animate-in slide-in-from-top-1 duration-200">
                            {(['compact', 'default', 'tall'] as const).map(d => (
                                <button
                                    key={d}
                                    onClick={() => { onDensityChange?.(d); setDensityOpen(false); }}
                                    className={cn(
                                        "w-full px-3 py-1.5 text-left text-[11px] font-bold uppercase tracking-widest hover:bg-gray-50",
                                        density === d ? "text-gold-600" : "text-gray-500"
                                    )}
                                >
                                    {d}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Export & Actions */}
            <div className="flex items-center space-x-1.5 ml-2">
                <button
                    onClick={handleRefresh}
                    title="Refresh"
                    className="p-2.5 rounded-lg border border-gray-100 bg-white text-gray-400 hover:text-navy-900 shadow-sm transition-all active:scale-95"
                >
                    <RefreshIcon className={cn("w-3.5 h-3.5 transition-transform", spinning && "animate-spin")} />
                </button>

                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setExportOpen(!exportOpen)}
                        className="flex items-center gap-2 px-4 py-2 text-[13px] font-bold border border-gray-100 rounded-lg bg-navy-900 text-white shadow-lg shadow-navy-900/10 hover:shadow-xl hover:translate-y-[-1px] transition-all"
                    >
                        <DownloadIcon className="w-3.5 h-3.5" /> Export
                    </button>
                    {exportOpen && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 py-1.5 animate-in zoom-in-95 duration-200 origin-top-right">
                            <button onClick={exportCSV} className="w-full px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:bg-gray-50 flex items-center gap-3">
                                <span className="w-6 h-6 rounded bg-green-50 text-green-600 flex items-center justify-center">CSV</span> Export as CSV
                            </button>
                            <button onClick={exportXLSX} className="w-full px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:bg-gray-50 flex items-center gap-3">
                                <span className="w-6 h-6 rounded bg-blue-50 text-blue-600 flex items-center justify-center">XLS</span> Excel Spreadsheet
                            </button>
                            <button onClick={exportPDF} className="w-full px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:bg-gray-50 flex items-center gap-3">
                                <span className="w-6 h-6 rounded bg-red-50 text-red-600 flex items-center justify-center">PDF</span> Portable Document
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ───────────────────────────────────────────────
   TablePagination
   ─────────────────────────────────────────────── */
export function TablePagination({ currentPage, totalItems, pageSize, onPageChange }: any) {
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalItems);

    // Generate page numbers with ellipsis
    const getPages = () => {
        const pages: (number | '...')[] = [];
        if (totalPages <= 7) { for (let i = 1; i <= totalPages; i++) pages.push(i); }
        else {
            pages.push(1); if (currentPage > 3) pages.push('...');
            for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) pages.push(i);
            if (currentPage < totalPages - 2) pages.push('...'); pages.push(totalPages);
        }
        return pages;
    };

    if (totalItems === 0) return null;

    return (
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/30 backdrop-blur-sm shrink-0">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                Showing <span className="text-navy-900">{start}</span>–<span className="text-navy-900">{end}</span> of <span className="text-navy-900">{totalItems}</span>
            </span>
            <div className="flex items-center gap-1.5 focus-within:ring-0">
                <button
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className="p-2 text-[10px] font-bold uppercase border border-gray-100 bg-white rounded-lg hover:bg-gray-50 disabled:opacity-30 transition-all shrink-0"
                >
                    ‹ Prev
                </button>
                {getPages().map((p, i) =>
                    p === '...' ? (
                        <span key={i} className="text-gray-300 px-1">…</span>
                    ) : (
                        <button
                            key={p}
                            onClick={() => onPageChange(p as number)}
                            className={cn("w-8 h-8 text-[11px] font-bold rounded-lg transition-all", currentPage === p ? "bg-navy-900 text-white shadow-lg" : "bg-white text-gray-500 border border-gray-100 hover:border-navy-900/20")}
                        >
                            {p}
                        </button>
                    )
                )}
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    className="p-2 text-[10px] font-bold uppercase border border-gray-100 bg-white rounded-lg hover:bg-gray-50 disabled:opacity-30 transition-all shrink-0"
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
    const a = document.createElement('a'); a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url);
}

/* ── Hook for table search + pagination ── */
export function useTableControls<T extends Record<string, any>>(
    data: T[],
    pageSize = 10,
    searchableFields?: (keyof T)[]
) {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [density, setDensity] = useState<'compact' | 'default' | 'tall'>('default');

    const filtered = search.trim()
        ? data.filter(row => {
            const q = search.toLowerCase();
            const fields = searchableFields || (Object.keys(row) as (keyof T)[]);
            return fields.some(f => String(row[f] ?? '').toLowerCase().includes(q));
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
        density,
        setDensity,
        filtered,
        paged,
        totalItems: filtered.length,
        pageSize,
    };
}
