# ValuAlliance Asset Management Portal — Demo Guide

> **Prepared for:** Internal Demo Walkthrough
> **Application URL:** http://localhost:5000
> **Login:** admin@valualliance.com / password

---

## Table of Contents

1. [What This Application Is](#1-what-this-application-is)
2. [How It Maps to the Proposal](#2-how-it-maps-to-the-proposal)
3. [Module-by-Module Walkthrough](#3-module-by-module-walkthrough)
4. [Cross-Cutting Features](#4-cross-cutting-features)
5. [Demo Script (Suggested Flow)](#5-demo-script-suggested-flow)
6. [Financial Concepts Glossary](#6-financial-concepts-glossary)

---

## 1. What This Application Is

ValuAlliance Asset Management Limited currently manages investments using **spreadsheets and disconnected tools**. This creates problems — manual errors in trades, difficulty filing SEC returns, no audit trail, and no single source of truth.

This application is a **purpose-built Asset Management Portal** that replaces all those spreadsheets with one integrated platform covering:

- **Investment operations** — managing portfolios, entering trades, settling transactions
- **Financial management** — accounting, fee calculation, reconciliation
- **Valuation** — pricing securities and computing NAV (Net Asset Value) for funds
- **Compliance** — SEC quarterly returns, AML/CFT monitoring, audit trails
- **Client analytics** — performance reports, AUM tracking, client profiles
- **Governance** — maker-checker approval workflows, role-based access control

The proposal describes **18 modules** (12 core + 6 cross-cutting). This demo showcases **all 18** in a functional frontend.

---

## 2. How It Maps to the Proposal

The proposal (Section 5) defines 12 Core Business Modules and 6 Cross-Cutting Components. Here's exactly where each one lives in the demo:

| # | Proposal Module | Demo Page | Sidebar Location |
|---|----------------|-----------|-----------------|
| 1 | Portfolio Management | **Portfolio** | OPERATIONS → Portfolio |
| 2 | Trade Capture & Lifecycle | **Trades** | OPERATIONS → Trades |
| 3 | Settlement Processing | **Settlement** | OPERATIONS → Settlement |
| 4 | Valuation & Pricing Engine | **Valuation** | OPERATIONS → Valuation |
| 5 | Fund Accounting & Financial Mgmt | **Fund Accounting** | FINANCE → Fund Accounting |
| 6 | Fee Calculation & Billing | **Fees & Billing** | FINANCE → Fees & Billing |
| 7 | Reconciliation Engine | **Reconciliation** | FINANCE → Reconciliation |
| 8 | Risk & Compliance | **Risk & Compliance** | COMPLIANCE → Risk & Compliance |
| 9 | Performance Measurement | **Performance** | ANALYTICS → Performance |
| 10 | Client Reporting & Analytics | **Client Management** | ANALYTICS → Client Management |
| 11 | Regulatory Returns | **Regulatory Returns** | COMPLIANCE → Regulatory Returns |
| 12 | Management Dashboards | **Dashboard** | OPERATIONS → Dashboard |

**Cross-Cutting Components:**

| # | Component | Where It Appears |
|---|----------|-----------------|
| 1 | User Management & RBAC | **User Management** page (sidebar) + RBAC matrix modal |
| 2 | Audit & Logging | **Audit Log** page showing every system action with timestamps |
| 3 | Notification Engine | **Notifications** bell icon (top bar) |
| 4 | Document Management | **Documents** page with upload, versioning, tagging |
| 5 | Global Search | Search bar in top navigation |
| 6 | Corporate Actions | **Corporate Actions** page (dividends, stock splits, etc.) |

**Additional Governance Feature:**

| Feature | Demo Page |
|---------|-----------|
| Maker-Checker Workflow | **Authorization Queue** (COMPLIANCE → Authorization Queue) |

---

## 3. Module-by-Module Walkthrough

### 🏠 Dashboard (Module 12: Management Dashboards)

**What you see:** The landing page after login. It provides a bird's-eye view of the entire firm.

**Key elements:**
- **Total AUM card** — ₦85.4B (the total market value of everything ValuAlliance manages for all clients combined)
- **Active Portfolios** — 8 portfolios being actively managed across different clients and mandates
- **Pending Trades** — Number of trades waiting for settlement
- **Asset Allocation pie chart** — Shows how the total AUM is spread across asset classes (equities, bonds, money market, etc.)
- **AUM Trend chart** — Monthly trend showing how AUM has grown over time
- **Recent Trades table** — Quick view of the latest trading activity
- **Top Portfolio Holdings table** — The largest positions across all portfolios

**Proposal tie-in:** Section 5, Module 12 — *"Executive dashboard: Total AUM, growth trends, revenue, net inflows/outflows, fund count, client count"*

**Financial concept — AUM (Assets Under Management):** This is the single most important metric for an asset manager. It's the total market value of all the money they manage. ValuAlliance earns fees as a percentage of AUM, so higher AUM = more revenue.

---

### 📁 Portfolio (Module 1: Portfolio Management)

**What you see:** A table of all invest portfolios with their details.

**Key elements:**
- **Portfolio list** with client name, fund, asset class, benchmark, AUM, and YTD return
- **Status filters** — Filter by Active/Inactive
- **Asset Class filters** — Filter by Equity, Fixed Income, Money Market, Balanced
- **Add Portfolio modal** — Create a new portfolio with client, fund, currency, benchmark, and document upload

**Proposal tie-in:** Section 5, Module 1 — *"Portfolio Setup: Create/configure portfolios by client, fund, or mandate; define investment policy, benchmark, asset class limits, currency"*

**Financial concept — Portfolio:** Think of a portfolio as a "basket" of investments. Each client may have one or more portfolios. For example, ARM Pension might have an "Equity Mandate" portfolio (invested in stocks) and a "Fixed Income Mandate" portfolio (invested in bonds).

**Financial concept — Benchmark:** A benchmark is the "yardstick" a portfolio is measured against. For example, if a Nigerian equity portfolio returns 15% but the NSE All-Share Index returned 20%, the portfolio manager underperformed. The benchmark tells you whether the manager added value.

---

### 📈 Trades (Module 2: Trade Capture & Lifecycle)

**What you see:** The trade blotter — a record of every buy/sell transaction.

**Key elements:**
- **Tabbed status filters** — All, Settled, Pending, Executed (with counts per tab)
- **Trade details** — Trade ID, portfolio, ticker, side (Buy/Sell), quantity, price, gross value, broker fee, settlement fee, net value
- **Trade lifecycle timeline** — Visual timeline showing Draft → Submitted → Approved → Executed → Settled
- **New Trade Entry modal** — Enter a new trade with ticker auto-pricing, automatic gross value calculation, and broker/settlement fee computation

**Proposal tie-in:** Section 5, Module 2 — *"Trade Entry: Structured forms with field validation for buy, sell, switch, subscription, and redemption orders"* and *"Trade Lifecycle: Every trade follows defined lifecycle with each transition logged"*

**Financial concept — Trade Lifecycle:** When you buy or sell a security, it doesn't happen instantly. Here's the journey:
1. **Draft** — Someone types in the trade details
2. **Submitted** — It's sent for approval
3. **Approved** — A second person (checker) approves it (maker-checker)
4. **Executed** — The trade is placed on the stock exchange
5. **Settled** — Money and securities actually change hands (typically T+2, meaning 2 business days after the trade)

**Financial concept — Settlement Fees:** When you trade on the Nigerian Stock Exchange, you pay:
- **Broker fee** — Commission to your stockbroker (typically 0.5% of trade value)
- **Settlement fee** — Fee to CSCS (Central Securities Clearing System) for processing the settlement (typically 0.2%)

---

### 🏦 Settlement (Module 3: Settlement Processing)

**What you see:** Tracks the settlement status of executed trades.

**Key elements:**
- **Status filters** — Filter by Settled, Pending, Failed
- **Settlement details** — Trade ID, security, counterparty, settlement date, amount, status
- **CSD reference** — Reference number from the Central Securities Depository (CSCS)

**Proposal tie-in:** Section 5, Module 3 — *"CSD Integration: Settlement integration with CSCS for trade confirmation and delivery-versus-payment (DvP)"*

**Financial concept — Settlement (DvP):** Delivery-versus-Payment means securities and cash are exchanged simultaneously. The buyer's money and the seller's securities change hands at the same time through CSCS, eliminating the risk that one side delivers but the other doesn't pay.

---

### 💰 Valuation & Pricing Engine (Module 4)

**What you see:** The engine that prices all securities and computes fund NAV values.

**Key elements:**
- **NAV Summary Cards** — Shows each fund's current NAV per unit (e.g., Growth Fund: ₦125.48) and total AUM
- **Securities Pricing Table** — Current market prices of all securities with source (NGX, FMDQ, CBN), change %, and tolerance status
- **NAV History Chart** — 6-month line chart showing how each fund's NAV has moved over time
- **"Run Pricing" button** → Opens modal to:
  - Set pricing date
  - Choose price source (All Sources, NGX Only, FMDQ Only, CBN Only, Manual Override)
  - Select which funds to price
  - Set tolerance threshold (%) — prices moving more than this are flagged
- **"Approve NAV" button** → Opens modal showing all funds with their NAV values and AUM, checkboxes to select which funds to approve, and approval comment field
- **"Export" button** → Export valuation data in Excel/CSV/PDF format

**Proposal tie-in:** Section 5, Module 4 — *"Automated Price Feeds: Ingest from NSE, FMDQ. Tolerance Checks: Price movements exceeding configurable threshold trigger review. NAV Computation: Daily NAV for pooled funds; per-unit NAV; NAVs require approval prior to publication"*

**Financial concept — NAV (Net Asset Value):** NAV is the "price per share" of a fund. If a fund has ₦10 billion in assets and 100 million units outstanding, the NAV = ₦100 per unit. This is computed daily by:
1. Getting the latest market prices for every security in the fund
2. Multiplying each position (number of shares) by its price
3. Adding up all position values + cash
4. Subtracting liabilities (fees owed, etc.)
5. Dividing by total units outstanding

**Financial concept — Tolerance Check:** If a stock's price suddenly jumps 50% in one day, something might be wrong (bad data, corporate action, etc.). The tolerance check flags unusual price movements for manual review before they're used to compute NAV. This prevents bad data from corrupting fund valuations.

---

### 📊 Fund Accounting (Module 5)

**What you see:** The investment book of record — all financial entries that result from investment activity.

**Key elements:**
- **Journal Entries table** — Every financial event generates a journal entry (debit and credit). Shows fund, entry type, debit amount, credit amount, and posting status
- **Fund Summary table** — NAV, total assets, total liabilities, and net assets per fund
- **"Post Journal" button** — Create a manual journal entry with debit and credit accounts
- **"Period Close" button** — Close an accounting period (e.g., end of month) so no more entries can be posted to it
- **"Generate Statements" button** — Generate financial statements (trial balance, income statement, balance sheet)

**Proposal tie-in:** Section 5, Module 5 — *"GL Integration: Automated journal entries for all investment events. Period Management: Configurable accounting periods with period-end close workflows"*

**Financial concept — Double-Entry Accounting:** Every financial event is recorded as two entries — a debit and a credit — that must balance. For example, when a fund buys ₦25M of Dangote Cement stock:
- **Debit** Equity Investments ₦25M (assets go up)
- **Credit** Cash ₦25M (cash goes down)

**Financial concept — Period Close:** At the end of each month, the accounting department "closes" the period. This means no more transactions can be posted to that month. It ensures financial statements are final and consistent. If you discover an error after close, it must be adjusted in the next period.

---

### 💵 Fees & Billing (Module 6)

**What you see:** How ValuAlliance charges clients for investment management services.

**Key elements:**
- **Fee schedule table** — Shows each client/fund, fee type (Management, Performance, Custody), rate, billing cycle, and accrued amount
- **Status filters** — Filter by Accrued, Invoiced, Paid, Overdue
- **"Generate Invoice" button** — Create an invoice for a client based on their fee schedule

**Proposal tie-in:** Section 5, Module 6 — *"Configurable Fee Structures: Management fees (% of AUM), performance fees (hurdle rate, high-water mark), custody fees"*

**Financial concept — Management Fee:** This is a recurring fee charged as a percentage of AUM. If AUM = ₦10B and the fee rate = 1.5% per year, the annual management fee = ₦150M. It's accrued daily (₦150M ÷ 365 = ~₦411K per day) and typically billed quarterly.

**Financial concept — Performance Fee:** An extra fee charged when the portfolio manager beats the benchmark. Often structured as "20% of returns above the benchmark." So if the fund returns 25% and the benchmark returned 15%, the performance fee is 20% × 10% = 2% of AUM.

**Financial concept — High Water Mark:** Prevents double-charging. If a fund drops in value, the manager can't charge performance fees again until the fund exceeds its previous peak. This protects clients from paying fees on recovery.

---

### 🔄 Reconciliation (Module 7)

**What you see:** Automated matching between ValuAlliance's internal records and external records (custodian, bank).

**Key elements:**
- **Reconciliation Summary chart** — Line chart showing matched vs. open vs. resolved items over time
- **Break Items table** — Unreconciled items with type (Cash Break, Position Break), source, counterparty, difference amount, assigned person, age in days, and priority level

**Proposal tie-in:** Section 5, Module 7 — *"Cash Reconciliation: Automated daily matching of cash balances. Position Reconciliation: Automated daily matching of security positions. Break Classification: Automatically classify unreconciled items"*

**Financial concept — Reconciliation Break:** A "break" occurs when ValuAlliance's records don't match the custodian's records. For example, ValuAlliance's system says they hold 50,000 shares of DANGCEM, but CSCS says 49,500. That 500-share difference is a "position break" that needs investigation. Breaks can happen due to unsettled trades, corporate actions, or errors.

---

### 🛡️ Risk & Compliance (Module 8)

**What you see:** Three tabs monitoring investment risk and regulatory compliance.

**Key elements:**
- **Compliance Alerts tab** — Active breaches of investment policy (e.g., "Issuer concentration exceeded for DANGCEM Equity — 32% vs 30% limit")
- **Limit Monitoring tab** — Pre-set limits for each portfolio with current utilisation percentage and visual bars
- **AML Alerts tab** — Anti-money laundering suspicious transaction monitoring

**Proposal tie-in:** Section 5, Module 8 — *"Pre-Trade Compliance: Enforce investment policy limits. Post-Trade Monitoring: Continuous monitoring with real-time breach alerts. AML/CFT Controls: Client risk scoring, suspicious transaction monitoring"*

**Financial concept — Investment Policy Limits:** Clients set rules about how their money can be invested. For example: "No single stock can be more than 30% of the portfolio" (concentration limit), or "At least 60% must be in equities" (asset class limit). The system monitors these in real-time and alerts when a limit is breached.

**Financial concept — AML/CFT:** Anti-Money Laundering / Combating the Financing of Terrorism. Nigerian financial institutions must monitor for suspicious transactions (like unusually large cash movements) and report them to the NFIU (Nigerian Financial Intelligence Unit). This is a legal requirement.

---

### 📋 Regulatory Returns (Module 11)

**What you see:** Management of mandatory reports submitted to regulators.

**Key elements:**
- **Deadline Banner** — Red alert showing the most urgent upcoming submission (e.g., "SEC Q4 2025 Return — Due 28 Feb 2026 — 5 days remaining")
- **Summary cards** — Count of In Progress, Submitted, and Not Started returns
- **Submissions table** — Return ID, report name, regulator (SEC NG, NFIU, NITDA), period, due date, submission date, prepared by, status
- **"New Submission" button** → Modal to create a new return with regulator, type, period, due date, and assignee
- **"Export" button** → Export regulatory data in Excel/CSV/PDF
- **"View Submission" button** → Side panel showing:
  - Full submission details
  - Compliance checklist with checkboxes
  - Completion progress bar
  - Notes field
  - Contextual action buttons (Submit for Review / Start Preparation / Already Submitted)
- **Eye icon per row** → Opens the same detail panel for any submission

**Proposal tie-in:** Section 5, Module 11 — *"SEC Quarterly Returns: Portfolio composition, AUM, performance, client count, transaction volume. AML/CFT Reports: STRs, CTRs submitted to NFIU. NDPR Compliance Log: Data processing logs, consent records"*

**Financial concept — SEC Quarterly Return:** Every quarter, asset managers in Nigeria must submit a report to the Securities & Exchange Commission (SEC) showing: what securities they hold, how much AUM they manage, how their funds performed, how many clients they have, and how many transactions they processed. Missing the deadline can result in sanctions.

---

### 🔐 Authorization Queue (Maker-Checker Workflow)

**What you see:** Every sensitive action across the platform requires approval from a second person.

**Key elements:**
- **Summary cards** — Pending Approval (5), Approved This Week (2), Rejected (1) — with **large icons** inside the cards
- **Tabbed filters** — All / Pending Approval / Approved / Rejected (with counts)
- **Queue table** — Request ID, Type (Trade Entry, Portfolio Creation, Journal Posting, Fee Invoice, User Creation), Module, Description, Submitted By, Date, Amount, Priority, Status
- **Priority badges** — Flat rounded: High (red), Medium (amber), Low (gray)
- **Action buttons** — View details (eye icon), Approve (green), Reject (red outlined)
- **Side panel** — Full request details with request info, priority, description, status
- **Approve modal** — Confirm approval with optional comment
- **Reject modal** — Confirm rejection with mandatory reason

**Proposal tie-in:** Proposal Section 4E — *"Maker-checker enforced on ALL critical operations."* Also Component 1 — *"Maker-Checker Controls: Enforced for user creation, role assignment, status changes"*

**Financial concept — Maker-Checker (Segregation of Duties):** This is a fundamental internal control in financial services. The person who *creates* a transaction (the "maker") cannot be the same person who *approves* it (the "checker"). This prevents:
- Fraud (one person entering fake trades for personal gain)
- Errors (mistakes are caught by a second pair of eyes)
- It's a regulatory requirement for SEC-licensed firms

---

### 📈 Performance (Module 9)

**What you see:** How each portfolio has performed over time.

**Key elements:**
- **Performance table** — Portfolio, fund, 1-month, 3-month, 6-month, and YTD returns compared against benchmark returns
- **Relative performance** — Shows whether the manager beat or trailed the benchmark

**Proposal tie-in:** Section 5, Module 9 — *"Return Calculation: Time-weighted (TWR) and money-weighted (MWR) return calculations. Benchmark Comparison: Configurable benchmarks per portfolio"*

**Financial concept — Time-Weighted Return (TWR):** This measures how well the portfolio manager invested, regardless of when cash came in and out. If a client deposited ₦5B at the worst time (right before a dip), TWR removes that bad-timing effect and measures pure investment skill.

---

### 👥 Client Management (Module 10: Client Reporting & Analytics)

**What you see:** A comprehensive 360° view of every client relationship.

**Key elements:**
- **Summary cards** — Total Clients (10), Total AUM (₦85.4B), Reports Generated (24)
- **AUM Trend chart** — Total AUM growth over the last 6 months
- **Client Directory** — Searchable/filterable table with:
  - Avatar initials, name, contact person
  - Type (Institutional/Corporate/Individual) — colour-coded badges
  - Category (Pension Fund Administrator, Asset Manager, Insurance, etc.)
  - AUM — the total assets this client has with ValuAlliance
  - KYC status (Verified/Pending)
  - Location
  - Relationship status (Active)
- **Filter tabs** — All, Institutional, Corporate, Individual
- **Action buttons** — "Generate Reports" and "Batch Export"

**When you click a client (eye icon), you get a detailed profile with 6 tabs:**

| Tab | What It Shows |
|-----|--------------|
| **Overview** | Client info card (contact person, email, phone, city, onboarded date), AUM history chart, allocation pie chart, mandates table, top 5 holdings |
| **Portfolios & Holdings** | All portfolios for this client with AUM and YTD return, plus a full securities holdings table |
| **Trade History** | Every trade ever made for this client with ticker, side, quantity, price, value, and status |
| **Fees & Billing** | Fee history showing fee type, period, AUM base, rate, billable amount, and payment status |
| **Contacts** | All contact persons for this client with role, email, phone, and primary flag |
| **Documents** | Client-related documents (mandate, KYC, compliance reports) |

**Proposal tie-in:** Section 5, Module 10 — *"Periodic Client Statements: Automated monthly/quarterly statements showing holdings, transactions, performance, and fee summaries. AUM Tracking: AUM tracking with trend analysis, net inflow/outflow tracking, and growth metrics"*

**Financial concept — KYC (Know Your Customer):** Before accepting a client, asset managers must verify their identity, source of funds, and risk profile. This is a legal requirement under Nigerian AML/CFT regulations. "Verified" means the client has passed all checks.

---

### 📄 Corporate Actions (Component 6)

**What you see:** Events that affect securities in the portfolio.

**Key elements:**
- **Tabbed filters** — All, Upcoming, Processed
- **Corporate actions table** — Security, type (Dividend, Stock Split, Rights Issue, Bonus Issue), ex-date, record date, payment date, ratio/rate, status

**Proposal tie-in:** Component 6 — *"Dividend Processing: Capture and process cash/stock dividends with automatic position and cash updates. Stock Splits & Rights Issues: Handle splits, rights issues, bonus shares with automatic position updates"*

**Financial concept — Corporate Actions:** These are events initiated by a company that affect its shareholders:
- **Dividend:** Company pays cash to shareholders. If you hold 50,000 shares of DANGCEM and they pay ₦15 per share, you receive ₦750,000
- **Stock Split:** Company divides existing shares (e.g., 2-for-1 split doubles the number of shares but halves the price)
- **Rights Issue:** Company offers existing shareholders the right to buy new shares at a discount
- **Bonus Issue:** Company gives existing shareholders free additional shares (e.g., 1-for-10 means you get 1 free share for every 10 you hold)

---

### 📑 Documents (Component 4)

**What you see:** Document management system for all investment-related documents.

**Key elements:**
- **Tabbed filters** — All, Mandate, KYC, Trade Confirmation, Report
- **Document table** — Title, type, linked portfolio/client, uploaded by, upload date, size
- **Upload Document modal** — Upload with name, type classification, linked portfolio

**Proposal tie-in:** Component 4 — *"Upload & Storage: Secure storage of trade confirmations, mandates, regulatory correspondence. Versioning: Full version history"*

---

### 👤 User Management (Component 1)

**What you see:** Manage platform users and their access permissions.

**Key elements:**
- **User table** — Name with avatar, email, role, department, status, last login
- **Role filters** — All, Admin, Portfolio Manager, Operations, Compliance, Analyst, Finance
- **"Add User" modal** — Create user with full name, email, role, department, and an interactive **RBAC Matrix** showing granular permissions (view/create/edit/approve/delete) per module

**Proposal tie-in:** Component 1 — *"Role-Based Access Control: Granular permissions per module and action (view, create, edit, approve, delete)"*

**Financial concept — RBAC:** Different people need different access. A Portfolio Manager should see performance data but shouldn't be able to post journal entries. A Compliance Officer needs to see everything but shouldn't be able to enter trades. RBAC ensures everyone can only see and do what their role allows.

---

### 📜 Audit Log (Component 2)

**What you see:** An immutable record of every action taken in the system.

**Key elements:**
- **Module filters** — Filter by specific module (Trades, Portfolio, etc.)
- **Audit table** — Timestamp, user, module, action type, description, IP address

**Proposal tie-in:** Component 2 — *"Comprehensive Logging: All system actions logged with: timestamp, user, role, IP address, before/after values. Immutability: Append-only audit logs. Retention: Minimum 7-year retention"*

---

## 4. Cross-Cutting Features

These features appear consistently across all pages:

### Consistent Design System
- **ValuAlliance branding** — Dark green (#0E4535) and gold (#DFA223) colour palette throughout
- **Standardised status badges** — All status indicators use flat, rounded badges (not pills) for a clean, professional look
- **S/N columns** — Every table has a sequential number column for easy reference
- **Monospace fonts** — All financial figures use monospace (JetBrains Mono) for easy number alignment

### Global Navigation
- **Sidebar** — Organised into 4 sections: OPERATIONS, FINANCE, COMPLIANCE, ANALYTICS
- **Header** — Global search bar + current date display
- **User profile** — Bottom of sidebar shows logged-in user (Adaeze Okonkwo, Portfolio Manager)

---

## 5. Demo Script (Suggested Flow)

A recommended 15–20 minute demo path:

### Opening (2 min)
1. **Login page** — Show the branded login with ValuAlliance logo
2. **Dashboard** — "This is the executive view. AUM of ₦85.4B across 10 clients, 8 active portfolios. The chart shows healthy AUM growth."

### Operations Flow (5 min)
3. **Portfolio** → "These are our investment portfolios. Each client has one or more mandates — equity, fixed income, balanced."
4. **Trades** → "This is the trade blotter. Show the lifecycle timeline. Click 'New Trade Entry' — notice how it auto-prices the selected security and calculates fees automatically."
5. **Settlement** → "After a trade is executed, we track settlement here. Integration with CSCS ensures DvP settlement."

### Valuation (3 min)
6. **Valuation** → "This is the pricing engine. Current NAV per fund. Securities pricing from NGX."
   - Click **Run Pricing** → "We can run pricing for any date, from any data source, with tolerance checking."
   - Click **Approve NAV** → "NAV requires maker-checker approval before publication."
   - Click **Export** → "Data can be exported in Excel, CSV, or PDF."

### Finance (2 min)
7. **Fund Accounting** → "Every investment event generates journal entries. We can close periods and generate financial statements."
8. **Fees & Billing** → "Fee schedules are configurable per client. Management fees, performance fees, custody fees — all accrued daily."
9. **Reconciliation** → "Daily automated matching against custodian records. Any breaks are flagged and assigned for resolution."

### Compliance (3 min)
10. **Risk & Compliance** → "Real-time monitoring of investment policy limits. Show the limit utilisation bars and AML alerts tab."
11. **Regulatory Returns** → "SEC quarterly returns, NFIU reports, NDPR compliance."
    - Show the **deadline banner**
    - Click **New Submission** → Show the workflow
    - Click the **View Submission** eye icon → Show the detail panel with checklist and progress bar
12. **Authorization Queue** → "Every sensitive action goes through maker-checker. Show that large icons highlight urgency."
    - Show the **Approve** and **Reject** flows

### Client Deep Dive (3 min)
13. **Client Management** → "360-degree view of all clients. Total AUM, client directory."
    - Click a client → "Full client profile with 6 tabs:"
    - Show **Overview** (AUM chart, allocation, mandates)
    - Show **Trade History** (every trade for this client)
    - Show **Fees & Billing** (fee history)

### Governance (2 min)
14. **User Management** → "RBAC with granular permissions. Click Add User to show the permission matrix."
15. **Audit Log** → "Every action is logged immutably. SEC requires 7-year retention."

---

## 6. Financial Concepts Glossary

| Term | Simple Explanation |
|------|-------------------|
| **AUM** | Assets Under Management — the total value of everything ValuAlliance manages for clients |
| **NAV** | Net Asset Value — the "price per unit" of a fund, computed daily |
| **Portfolio** | A "basket" of investments managed under a specific mandate for a client |
| **Benchmark** | The yardstick a portfolio is measured against (e.g., NSE All-Share Index) |
| **Trade Lifecycle** | The journey of a trade: Draft → Submitted → Approved → Executed → Settled |
| **Settlement (T+2)** | Securities trades settle 2 business days after the trade date |
| **DvP** | Delivery vs. Payment — simultaneous exchange of securities and cash |
| **Maker-Checker** | Two-person approval for every sensitive action (prevents fraud/errors) |
| **CSCS** | Central Securities Clearing System — Nigeria's securities depository |
| **FMDQ** | FMDQ Securities Exchange — Nigeria's fixed income and derivatives exchange |
| **NGX** | Nigerian Exchange Group — Nigeria's stock exchange |
| **SEC** | Securities and Exchange Commission — Nigeria's capital market regulator |
| **NFIU** | Nigerian Financial Intelligence Unit — handles AML/CFT reporting |
| **NDPR** | Nigeria Data Protection Regulation — data privacy compliance |
| **KYC** | Know Your Customer — identity verification before accepting clients |
| **AML/CFT** | Anti-Money Laundering / Combating Financing of Terrorism |
| **Management Fee** | Annual fee charged as % of AUM (e.g., 1.5% per year, accrued daily) |
| **Performance Fee** | Extra fee when portfolio beats the benchmark (e.g., 20% of excess return) |
| **High Water Mark** | Prevents double-charging: no performance fees until fund exceeds previous peak |
| **RBAC** | Role-Based Access Control — different permissions for different user roles |
| **Tolerance Check** | Flags unusual price movements for manual review before NAV computation |
| **Reconciliation Break** | A mismatch between internal records and external records (custodian/bank) |
| **Corporate Action** | Company event affecting shareholders (dividend, stock split, rights issue) |
| **Journal Entry** | Double-entry accounting record (every debit must have a matching credit) |
| **Period Close** | Locking a financial period so no more entries can be posted to it |
| **TWR** | Time-Weighted Return — measures investment skill regardless of cash flow timing |
| **Accrual** | Recording income or expense when it's *earned/incurred*, not when cash moves |
| **GL** | General Ledger — the master accounting record of all financial transactions |

---

## Quick Reference: All Interactive Buttons

| Page | Button | What It Does |
|------|--------|-------------|
| Portfolio | Add Portfolio | Modal: Create new portfolio with document upload |
| Trades | New Trade Entry | Modal: Enter a buy/sell trade with auto-pricing |
| Valuation | Run Pricing | Modal: Refresh security prices and compute NAV |
| Valuation | Approve NAV | Modal: Select funds and approve NAV for publication |
| Valuation | Export | Modal: Export valuation data (Excel/CSV/PDF) |
| Fund Accounting | Post Journal | Modal: Create manual journal entry |
| Fund Accounting | Period Close | Modal: Close accounting period |
| Fund Accounting | Generate Statements | Modal: Trial balance, income statement, balance sheet |
| Fees & Billing | Generate Invoice | Modal: Create fee invoice |
| Fees & Billing | Export | Modal: Export fee data |
| Regulatory Returns | New Submission | Modal: Create new regulatory return |
| Regulatory Returns | Export | Modal: Export regulatory data |
| Regulatory Returns | View Submission | Side panel: Full submission detail with checklist |
| Authorization Queue | Approve | Modal: Approve a request with comment |
| Authorization Queue | Reject | Modal: Reject a request with reason |
| User Management | Add User | Modal: Create user with RBAC permission matrix |
| Documents | Upload Document | Modal: Upload and classify document |
| Client Management | View Details (👁) | Full-page client profile with 6 tabs |

---

*Document generated: 24 February 2026*
*Application Version: Demo v1.0*
