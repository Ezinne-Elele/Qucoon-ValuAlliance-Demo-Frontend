# Enterprise Staff Portal — Design System Guide

> **Purpose**: This document captures every design element, pattern, and rule used in this enterprise portal. It is written as a **reusable AI prompt** — give it to any AI assistant and they can replicate this design with YOUR brand colors and logo.

---

## 0. HOW TO USE THIS GUIDE

Give this entire document to an AI assistant along with the instruction:

> "Build me an enterprise staff portal using the design system defined in this document. My brand primary color is [YOUR_PRIMARY_HEX]. My accent color is [YOUR_ACCENT_HEX]. Use the logo file `fsdh_logo.png` (or whatever your logo filename is). The application is for [YOUR_DOMAIN, e.g. 'investment banking operations']."

The AI should replace the color tokens while keeping every structural and typographic rule identical.

---

## 1. GENERAL THEME & PHILOSOPHY

### Design Identity
- **Enterprise Merchant Banking Aesthetic** — not playful fintech, not boring government.
- **Data-Dense, Sober, Professional** — designed for professionals who stare at this 8+ hours/day.
- **Light Mode Only** — clean white backgrounds with structured grays.
- **High Information Density** — maximize data visibility, minimize visual clutter.
- **Glassmorphism Accents** — subtle backdrop-blur effects on panels and overlays.
- **Micro-Animations** — smooth, restrained transitions (200-500ms) on hover/click. Never flashy.

### Design Principles
1. **Consistency over creativity** — every table, card, and badge looks the same.
2. **Data scannability** — monospace for numbers, uniform font sizes, zero visual noise.
3. **Status at a glance** — semantic colors only for status indicators (green/amber/red).
4. **Hierarchy through weight, not color** — use font-weight and size to create hierarchy, NOT random colors.

---

## 2. COLOR SYSTEM

### Architecture
The system uses a **two-color brand palette** + **neutral grays** + **semantic status colors**.

| Role                  | Token Name        | Description                                             |
|-----------------------|-------------------|---------------------------------------------------------|
| **Brand Primary**     | `primary-900`     | Sidebar background, primary buttons, headings           |
| **Brand Primary**     | `primary-800`     | Sidebar hover states                                    |
| **Brand Primary**     | `primary-700`     | Active sidebar item background, accent text              |
| **Brand Primary**     | `primary-100`     | Light primary tint backgrounds                          |
| **Brand Primary**     | `primary-50`      | Active row selection background                         |
| **Brand Accent**      | `accent-600`      | Active indicator border (sidebar), badge text            |
| **Brand Accent**      | `accent-500`      | User avatar background, goldfish accents                |
| **Brand Accent**      | `accent-400`      | Hover accent, light accent text                         |
| **Brand Accent**      | `accent-100`      | Light accent tint backgrounds                           |
| **Success**           | `success`         | Positive values, active status, buy-side                |
| **Success BG**        | `success-bg`      | Light green background for success badges               |
| **Warning**           | `warning`         | Pending status, caution indicators                      |
| **Warning BG**        | `warning-bg`      | Light amber background for warning badges               |
| **Danger**            | `danger`          | Failed status, negative values, sell-side               |
| **Danger BG**         | `danger-bg`       | Light red background for danger badges                  |
| **Gray Scale**        | `gray-50` to `gray-900` | UI structure (borders, backgrounds, text)          |

### Specific Gray Usage
| Gray Shade | Usage                                                |
|------------|------------------------------------------------------|
| `gray-50`  | Page background (`#F8F9FB`)                          |
| `gray-100` | Card/table borders, dividers (`#F1F3F5`)             |
| `gray-200` | Scrollbar track, secondary borders (`#E1E5EA`)       |
| `gray-300` | Separator pipes, subtle borders (`#CDD2DA`)          |
| `gray-400` | Table header text, secondary text, icons (`#9AA1AE`) |
| `gray-500` | Description text, muted content (`#6B7280`)          |
| `gray-700` | **Table cell body text** (THE standard data color)    |
| `gray-900` | Headings, primary dark text (`#111827`)               |

### Critical Rule: Where Each Color Goes
- **Table body text**: ALWAYS `gray-700`. Never any other color on data cells.
- **Table header text**: ALWAYS `gray-400`, 11px, bold, uppercase, tracked.
- **Headings (h1, h2)**: ALWAYS `primary-900`.
- **Section labels**: ALWAYS `gray-400`, 11px, bold, uppercase, tracked widely.
- **Numeric values in cards**: ALWAYS `primary-900` with monospace font.
- **Positive changes**: ALWAYS `success` green.
- **Negative changes**: ALWAYS `danger` red.
- **Sidebar text (inactive)**: `gray-400`. Active: `white`.
- **Sidebar active border**: 3px left border in `accent-500`.
- **Status badges**: ONLY place where semantic colors appear on top of tinted backgrounds.

---

## 3. TYPOGRAPHY

### Font Families
| Role        | Font Family      | Import                                                        |
|-------------|-----------------|---------------------------------------------------------------|
| **Sans**    | Inter            | `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700')` |
| **Mono**    | JetBrains Mono   | `@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700')` |

### Font Size Scale (Used Across the Entire System)
| Size    | Purpose                                           | Weight           |
|---------|---------------------------------------------------|------------------|
| `9px`   | Chart center labels ("TOTAL"), tag labels          | bold             |
| `10px`  | Section labels, filter buttons, density options, status badge text, tracking-widest | bold, uppercase  |
| `11px`  | Table headers, subtitle descriptions, trend badges, pagination labels | bold, uppercase  |
| `12px`  | Section headings inside cards                      | bold, uppercase  |
| `13px`  | **Table body text** (THE base size), nav items, search inputs, buttons, detail labels | medium (500)     |
| `14px`  | Not used (deliberately skipped for consistency)    | —                |
| `sm`    | Card descriptions, form labels                     | medium           |
| `lg/xl` | Card metric values                                 | bold + mono      |
| `2xl`   | Page titles (h1)                                   | bold             |

### Tracking (Letter Spacing)
| Class                   | Usage                                        |
|-------------------------|----------------------------------------------|
| `tracking-tight`        | Page titles, card metric values               |
| `tracking-wider`        | 11px section labels                           |
| `tracking-widest`       | 10px uppercase labels (section headers, buttons) |
| `tracking-[2px]`        | Sidebar nav group labels                      |

### Typography Utility Classes
```css
.text-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: wider;
  color: gray-400;
}
```

### Critical Typography Rule
> **NEVER vary font-size or color on `<td>` table cells.** Every table cell inherits `text-[13px] text-gray-700 font-medium` from the global CSS. The ONLY exceptions are:
> - `font-mono` class added to numeric columns (for alignment)
> - Semantic-colored `<span>` inside a cell for status/change values

---

## 4. TABLE DESIGN (DataGrid)

Tables are the most important UI element. They follow a strict, uniform design.

### Table Container
```
.table-datagrid-container
├── bg-white
├── rounded-xl
├── border border-gray-100
├── shadow-sm
├── overflow-hidden
└── flex flex-col
```

### Table Header Row (`<th>`)
```css
background: gray-50/50 (subtle tint, not opaque)
backdrop-filter: blur
position: sticky top-0 z-10
border-bottom: 1px solid gray-100
padding: 10px 12px (py-2.5 px-3)
font-size: 11px
font-weight: 700 (bold)
color: gray-400
text-transform: uppercase
letter-spacing: wider
```

### Table Body Cells (`<td>`)
```css
border-bottom: 1px solid gray-50 (very subtle)
padding: 8px 12px (py-2 px-3)
font-size: 13px
color: gray-700
font-weight: 500 (medium)
white-space: nowrap
overflow: hidden
text-overflow: ellipsis
```

### Table Row Hover
```css
tr:hover td {
  background: gray-50/80
}
```

### Table Row Selection
```css
tr.is-selected td {
  background: primary-50/50
}
tr.is-selected td:first-child {
  box-shadow: inset 3px 0 0 primary-700  /* left accent bar */
}
```

### Density Modes
| Density   | Cell Padding      | Font Size |
|-----------|-------------------|-----------|
| Compact   | py-1 px-2         | 12px      |
| Default   | py-2 px-3         | 13px      |
| Tall      | py-4 px-4         | 13px      |

### Column Types & Classes
| Column Type     | Extra Classes       | Example                    |
|-----------------|---------------------|----------------------------|
| Row number (#)  | `text-center`       | 1, 2, 3                   |
| Text data       | (none)              | ARM Pension Managers Ltd   |
| Monetary amount | `text-right font-mono` | ₦18.20B                |
| Percentage      | `text-right font-mono` + colored `<span>` | +19.2%  |
| Status          | None; use `<StatusBadge>` | Active, Pending        |
| Buy/Sell badge  | Colored `<span>` pill | BUY (green), SELL (red)  |

### Table Toolbar (Above Every Table)
Every table has a toolbar section:
```
┌──────────────────────────────────────────────────────────────┐
│  TABLE TITLE                    [Search] [⇅│≡│⊞│⊟] [↻] [Export] │
│  Subtitle description                                       │
└──────────────────────────────────────────────────────────────┘
```

Components:
1. **Search Input**: `pl-9 pr-8 py-2`, gray-50/50 bg, rounded-lg, search icon left
2. **Functional Buttons Group**: Grouped in white bg with border, 4 icon buttons (Filter, Sort, Columns, Density)
3. **Refresh Button**: Standalone, border, white bg, spins on click
4. **Export Button**: `bg-primary-900 text-white`, shadow-lg, dropdown with CSV/XLSX/PDF options

### Table Pagination
```
┌──────────────────────────────────────────────────────────────┐
│  SHOWING 1-10 OF 48            ‹ PREV  [1] [2] [3] ... NEXT ›  │
└──────────────────────────────────────────────────────────────┘
```
- Background: `gray-50/30 backdrop-blur`
- Text: 11px, bold, uppercase, tracking-widest, gray-400
- Active page: `primary-900 text-white rounded-lg shadow-lg`
- Inactive page: `white text-gray-500 border border-gray-100`

---

## 5. NAVIGATION STRUCTURE

### Sidebar (Left)
```
Width: 256px expanded, 80px collapsed
Background: primary-900 (your darkest brand color)
```

#### Logo Section (Top)
```
Height: 64px
Padding: px-6
Border-bottom: 1px solid primary-800
Logo: displayed with brightness-0 invert (forces white)
Collapsed: show single-letter icon in accent-500 background
```

#### Navigation Groups
```
Group Label:
  - 10px, bold, uppercase, tracking-[2px]
  - Color: gray-500
  - px-6, mb-3
  - Groups separated by mb-6

Nav Item:
  - Height: ~40px (py-2.5)
  - px-6
  - border-left: 3px
  - Font: 13px, medium (500), tracking-tight
  - Icon: 16px (w-4 h-4), margin-right 12px

  Inactive:
    - border-color: transparent
    - text: gray-400
    - hover: bg-primary-800, text-white

  Active:
    - border-color: accent-500 (gold/amber left strip)
    - background: primary-700
    - text: white
    - icon color: accent-500
    - shadow-inner
```

#### Recommended Navigation Group Names
```
OPERATIONS      → Dashboard, Portfolio, Trades, Settlement, Valuation
FINANCE         → Fund Accounting, Fees & Billing, Reconciliation
COMPLIANCE      → Risk & Compliance, Regulatory Returns, Authorization Queue
ANALYTICS       → Performance, Client Management
ADMINISTRATION  → User Management, Audit Log, Documents, Corporate Actions
```

#### User Section (Bottom)
```
Background: primary-950 (darkest shade)
Border-top: 1px solid primary-700

Avatar:
  - 36px (w-9 h-9) rounded-xl
  - Background: accent-500
  - Text: primary-900 (dark on gold)
  - Font: bold, xs

Name: 13px, bold, white
Role: 10px, bold, gray-500, uppercase, tracking-tighter

Bottom Icons Row:
  - Bell (with red dot), Search, Logout
  - Gray-400, hover: white + bg-primary-800, rounded-lg, p-2
```

### Top Bar (Header)
```
Height: 64px
Background: white/80 (semi-transparent)
Backdrop-filter: blur (frosted glass effect)
Border-bottom: 1px solid gray-100
Position: sticky top-0 z-10

Left Side:
  - Sidebar toggle button (collapse/expand icon)
  - Breadcrumbs: 13px, medium
    - Separator: "/" in gray-200
    - Last item: primary-900, bold
    - Previous items: gray-400, hover primary-700

Right Side:
  - Command palette search:
    - Rounded-full pill shape
    - gray-100/50 background
    - Placeholder: "Search command (⌘K)"
    - kbd indicators: ⌘ K badges
  - Date display: 12px, mono, gray-400
```

---

## 6. PAGE LAYOUT PATTERNS

### Module Header (Every Page Top)
```
┌─────────────────────────────────────────────────────────────────┐
│  Page Title (2xl, bold, primary-900)           [Action Buttons] │
│  Description text (sm, gray-500)                                │
│                                                                 │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌───────────┐ │
│  │ METRIC LABEL│ │ METRIC LABEL│ │ METRIC LABEL│ │METRIC LBL │ │
│  │ ₦40.2T +4.2%│ │ 1,248  +12 │ │ 184.20 +2.1%│ │ 8  action │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └───────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

#### Metric Cards
```
Container: bg-white, p-4, rounded-xl, shadow-sm, border border-gray-100
Label: .text-label (11px, bold, gray-400, uppercase, tracked)
Value: xl font-bold primary-900 font-mono
Trend Badge:
  - 10px, bold
  - Positive: bg-success-bg text-success
  - Negative: bg-danger-bg text-danger
  - Rounded px-1.5 py-0.5
Hover: shadow-md transition
```

### Detail Page Layout
When clicking a table row opens a full page:
```
[← Back to {List Page}]                            [button] [button]

Page Title (2xl, bold)
ID | Type | Status Badges

┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐
│ Metric 1   │ │ Metric 2   │ │ Metric 3   │ │ Metric 4   │
└────────────┘ └────────────┘ └────────────┘ └────────────┘

[TAB 1] [TAB 2] [TAB 3] [TAB 4]
─────────────────────────────────

{Tab Content}
```

#### Tab Styling
```css
tab (inactive):
  border-bottom: 2px solid transparent
  color: gray-400
  font-size: 11px, bold, uppercase, tracking-widest

tab (active):
  border-bottom: 2px solid primary-900
  color: primary-900
```

### Key-Value Info Grid
Used in detail pages for displaying entity metadata:
```
┌────────────────────────────────────┐
│  SECTION TITLE (12px uppercase)   │
├────────────────────────────────────┤
│  Label              Value         │
│  ─────────────────────────────    │
│  Label              Value         │
│  ─────────────────────────────    │
│  Label              Value         │
└────────────────────────────────────┘

Label: 13px, gray-500
Value: 13px, medium, primary-900
Separator: border-bottom gray-50
Container: bg-white rounded-2xl p-6 shadow-sm border border-gray-100
```

---

## 7. CHART SPECIFICATIONS

### When to Use Which Chart

| Chart Type    | Use Case                                                          |
|---------------|-------------------------------------------------------------------|
| **Area Chart** | Time-series trends (AUM growth, NAV history, monthly trends)     |
| **Donut/Pie** | Proportional distribution (asset allocation, client segments)     |
| **Bar Chart**  | Comparing discrete categories (monthly volumes, fund performance)|

### Area Chart Styling
```
Library: Recharts (AreaChart, Area)
Gradient Fill:
  - Top: primary-600 at 15% opacity (stopOffset 5%)
  - Bottom: primary-600 at 0% opacity (stopOffset 95%)
Stroke: primary-600, width 3px
Type: monotone

CartesianGrid:
  - strokeDasharray: "3 3"
  - vertical: false
  - stroke: gray-100 (#F1F3F5)

XAxis:
  - axisLine: false
  - tickLine: false
  - tick: { fontSize: 10, fill: gray-400, fontWeight: 600 }
  - dy: 10

YAxis: hidden

Tooltip:
  - borderRadius: 12px
  - border: none
  - boxShadow: 0 10px 15px -3px rgba(0,0,0,0.1)
```

### Donut/Pie Chart Styling
```
Library: Recharts (PieChart, Pie)
Inner Radius: 55-70
Outer Radius: 75-90
Padding Angle: 4-8
Colors: [primary-900, accent-500, primary-600, primary-400, primary-800]

Center Label:
  - Position: absolute, centered
  - Value: xl/2xl font-bold primary-900 font-mono
  - Subtitle: 9px, gray-400, bold, uppercase
```

### Chart Container
```
Container: bg-white rounded-2xl p-8 shadow-sm border border-gray-100
Title: 12px, bold, primary-900, tracking-widest, uppercase
Subtitle: 11px, gray-400, medium
Height: ~240-280px (h-64 to h-72)
Hover: shadow-md transition
```

### Chart Trend Badge (in header)
```
Container: bg-success/5, px-3 py-1.5, rounded-lg, border border-success/10
Icon: TrendingUp, success color, w-3.5 h-3.5
Text: xs, bold, success color
```

---

## 8. COMPONENT SPECIFICATIONS

### Status Badge
```
Default Shape: px-2 py-0.5, rounded, text-xs, font-medium, inline-flex

Color Mapping (keyword-based):
  ✅ Success (active, settled, approved, verified, matched, processed):
     bg-success-bg text-success
  ⚠️ Warning (pending, draft, submitted, progress, awaiting, calculated):
     bg-warning-bg text-warning
  ❌ Danger (failed, rejected, breach, escalated, reported):
     bg-danger-bg text-danger
  ⬜ Neutral (not started, archived, disabled, low):
     bg-gray-100 text-gray-500
  🔵 Info (executed):
     bg-primary-100 text-primary-700
```

### Buy/Sell Badge
```
Shape: px-2 py-0.5, rounded-md, 10px, bold, uppercase, tracking-wider
Buy:  bg-success-bg text-success
Sell: bg-danger-bg text-danger
```

### Action Buttons

| Variant      | Style                                                    |
|--------------|----------------------------------------------------------|
| **Primary**  | `bg-primary-900 text-white rounded-lg shadow-lg hover:shadow-xl` |
| **Secondary**| `bg-white border border-gray-100 text-gray-500 shadow-sm hover:bg-gray-50` |
| **Danger**   | `text-danger text-xs bold uppercase tracking-widest hover:underline` |
| **Small Tab**| `px-4 py-1.5 text-[10px] bold uppercase tracking-widest rounded-lg` |

### Glassmorphism Cards
```css
.glass-card {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
```

### Filter Pill Bar
Used for type/status filtering above tables:
```
Container: flex bg-gray-50 p-1 rounded-xl border border-gray-100

  Pill (inactive):
    text-gray-400
    hover: text-primary-700
    10px, bold, uppercase, tracking-widest

  Pill (active):
    bg-white text-primary-900
    shadow-sm
    border border-gray-100/50
```

---

## 9. CARDS & CONTAINERS

### Standard Card
```
bg-white rounded-xl border border-gray-100 shadow-sm p-5
hover: shadow-md transition-all
```

### Chart Card (larger)
```
bg-white rounded-2xl p-8 shadow-sm border border-gray-100
hover: shadow-md transition-shadow
```

### Dark Call-to-Action Card
```
bg-primary-900 rounded-2xl p-6 shadow-xl text-white
  Title: sm, bold, white
  Description: xs, gray-400, leading-relaxed
  CTA Button: px-4 py-2, bg-accent-500 text-primary-900, rounded-lg, xs, bold
  Background decoration: faded icon (opacity-10), absolute positioned
```

### Mandate/Quote Block
```
bg-primary-900/5 rounded-2xl p-6 border border-primary-900/10
  Label: 12px, bold, primary-900, uppercase, tracking-widest
  Quote: 13px, primary-800, leading-relaxed, italic, opacity-80
```

---

## 10. LOGIN / AUTH SCREEN

### Layout
```
Split-screen: 40% left panel (brand color) + 60% right panel (white/form)

Left Panel:
  Background: primary-900
  Text: white
  Logo: displayed inverted (white)
  Subtitle: accent-400, sm, tracking-wide, uppercase
  Divider: 40px wide bar in accent-500, rounded-full
  Feature List: checkmark icon (accent-500) + gray-200 text
  Bottom: partner/regulator logos + "Powered by" text (gray-500)

Right Panel:
  White background
  Form card: max-w-md, bg-white, rounded-xl, shadow-lg, border gray-100, p-10
  Title: 2xl, bold, primary-900
  Subtitle: sm, gray-500
  Inputs: bg-gray-50, border gray-300, rounded-md, focus: ring accent-500
  Submit: full-width, bg-primary-900, text-white, rounded-md, shadow
  Warning info box: bg-warning-bg, border warning/20, warning icon + text
  Footer: absolute bottom, xs, gray-400
```

---

## 11. SCROLLBAR STYLING

```css
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: gray-200;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: gray-400;
}
```

---

## 12. SHADOW SYSTEM

| Level  | CSS Value                                                      | Usage              |
|--------|----------------------------------------------------------------|--------------------|
| `sm`   | `0 1px 2px rgba(0,0,0,0.05)`                                  | Cards, table containers |
| `md`   | `0 4px 6px -1px rgba(0,0,0,0.04), 0 2px 4px -1px rgba(0,0,0,0.03)` | Hover states |
| `lg`   | `0 10px 15px -3px rgba(0,0,0,0.04), 0 4px 6px -2px rgba(0,0,0,0.02)` | Primary buttons |
| `xl`   | `0 20px 25px -5px rgba(0,0,0,0.05), 0 10px 10px -5px rgba(0,0,0,0.02)` | Floating panels |

> Note: These are intentionally **very soft** — almost imperceptible. Enterprise UIs should never have harsh shadows.

---

## 13. ANIMATION & TRANSITIONS

| Element                   | Transition                                | Duration |
|---------------------------|-------------------------------------------|----------|
| Card hover                | `transition-shadow` or `transition-all`   | default  |
| Button hover              | `transition-all`                          | default  |
| Sidebar collapse/expand   | `transition-all duration-300 ease-in-out` | 300ms    |
| Dropdown open             | `animate-in slide-in-from-top-1`          | 200ms    |
| Panel slide-in            | `animate-in slide-in-from-right`          | 500ms    |
| Refresh icon spin         | `animate-spin`                            | 800ms    |
| Hover glow (optional)     | `box-shadow: 0 0 20px primary-500/15`     | default  |

---

## 14. RESPONSIVE LAYOUT

### Grid System
| Viewport    | Columns                |
|-------------|------------------------|
| Mobile      | 1 column               |
| Tablet (md) | 2 columns              |
| Desktop (lg)| 3 columns (2+1 split)  |

### Standard Spacing
| Token  | Value | Usage                                    |
|--------|-------|------------------------------------------|
| gap-4  | 16px  | Metric card grids                        |
| gap-6  | 24px  | Detail page grids, form grids            |
| gap-8  | 32px  | Main layout sections, chart grids        |
| p-4    | 16px  | Metric cards, compact containers         |
| p-5    | 20px  | Standard cards                           |
| p-6    | 24px  | Detail panels, sidebar bottom            |
| p-8    | 32px  | Chart cards, main content padding        |
| mb-8   | 32px  | Module header bottom margin              |
| space-y-8 | 32px | Vertical spacing between page sections |
| space-y-12| 48px | Major page sections (charts → tables)  |

---

## 15. ICON SYSTEM

### Icon Style
- **Library**: Custom SVG icons (16px x 16px viewBox, stroke-based)
- **Stroke Width**: 2px (standard) or 1.5px (thinner for nav)
- **Fill**: none (outline icons only)
- **Standard Size**: `w-4 h-4` (16px) for navigation and toolbar icons
- **Small Size**: `w-3.5 h-3.5` for inline icons and toolbar buttons
- **Color**: Inherits from text color (uses `currentColor`)

### Icon Usage Rules
- Sidebar nav: 1 icon per item, `w-4 h-4`, `mr-3` when expanded
- Table toolbar: icon-only buttons, `w-3.5 h-3.5`, inside `p-2` buttons
- Metric cards: NO icons in metric cards (numbers speak for themselves)
- Chart headers: NO icons (clean typography only)
- Section labels: Optional icon before label, `w-3 h-3`, `mr-1.5`

---

## 16. COMPLETE PAGE STRUCTURE RECIPE

For any new module page, follow this exact pattern:

```
<AppShell>
  <ModuleHeader
    title="Module Name"
    description="One-line description of this module."
    metrics={[4 metric objects]}
    actions={<>action buttons</>}
  />

  <div className="space-y-12">
    {/* 1. Charts Section */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        {/* Primary Chart (Area chart for trends) */}
      </div>
      <div>
        {/* Secondary Chart (Pie/Donut for distribution) */}
      </div>
    </div>

    {/* 2. Data Table Section */}
    <div className="table-datagrid-container">
      {/* Toolbar header */}
      <div className="p-5 border-b border-gray-100 bg-white/50 flex justify-between">
        {/* Title + Filters on left, TableToolbar on right */}
      </div>
      {/* Table */}
      <table className="table-datagrid">
        <thead>
          <tr><th>Column 1</th><th>Column 2</th>...</tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr>
              <td>{row.text}</td>
              <td className="text-right font-mono">{row.number}</td>
              <td><StatusBadge status={row.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <TablePagination ... />
    </div>
  </div>
</AppShell>
```

---

## 17. FILE STRUCTURE

```
src/
├── index.css                    ← Global styles, CSS variables, table styles
├── App.tsx                      ← Router with all routes
├── components/
│   ├── icons/Icons.tsx          ← All SVG icons as components + cn() utility
│   ├── layout/
│   │   ├── AppShell.tsx         ← Sidebar + Top bar + Main content wrapper
│   │   └── ModuleHeader.tsx     ← Reusable page header with metrics
│   └── ui/
│       ├── StatusBadge.tsx      ← Semantic status badge
│       └── TableControls.tsx    ← TableToolbar, TablePagination, useTableControls hook
├── data/
│   └── mockData.ts              ← All mock data arrays
└── pages/
    ├── Dashboard.tsx
    ├── Portfolio.tsx
    ├── PortfolioDetail.tsx
    ├── Trades.tsx
    ├── ClientManagement.tsx
    ├── ClientDetail.tsx
    ├── Login.tsx
    └── ... (other modules)
```

---

## 18. TECH STACK

| Layer          | Technology                          |
|----------------|-------------------------------------|
| Framework      | React + TypeScript                   |
| Build          | Vite                                 |
| Styling        | TailwindCSS + custom CSS variables   |
| Routing        | Wouter                              |
| Charts         | Recharts                            |
| Animations     | tailwindcss-animate                  |
| Fonts          | Google Fonts (Inter + JetBrains Mono)|

---

*End of Design Guide*
