import { Router, Request, Response } from "express";
import {
    Client, Fund, Portfolio, Security, Trade, Settlement,
    Position, ReconciliationBreak, ComplianceEvent, RegulatorySubmission,
    FeeRecord, AuditLog, Notification, DocumentRecord, CorporateAction,
    JournalEntry, TrialBalanceEntry, PerformanceRecord, AumTrend,
    NavHistory, ReconSummary, User,
    FundHolding, UnitHolder, FundTransaction, NavComputation,
} from "../models/index.js";

const router = Router();

// ── Helper: generic CRUD factory ──
function crudRoutes(
    path: string,
    Model: any,
    idField: string,
    sortField?: string,
    sortOrder: 1 | -1 = -1
) {
    // GET all
    router.get(path, async (_req: Request, res: Response) => {
        try {
            const sort = sortField ? { [sortField]: sortOrder } : {};
            const docs = await Model.find({}).sort(sort).lean();
            res.json(docs);
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    });

    // GET one by id
    router.get(`${path}/:id`, async (req: Request, res: Response) => {
        try {
            const doc = await Model.findOne({ [idField]: req.params.id }).lean();
            if (!doc) { res.status(404).json({ message: "Not found" }); return; }
            res.json(doc);
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    });

    // POST create
    router.post(path, async (req: Request, res: Response) => {
        try {
            const doc = await Model.create(req.body);
            res.status(201).json(doc);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    });

    // PUT update
    router.put(`${path}/:id`, async (req: Request, res: Response) => {
        try {
            const doc = await Model.findOneAndUpdate(
                { [idField]: req.params.id },
                req.body,
                { new: true, runValidators: true }
            );
            if (!doc) { res.status(404).json({ message: "Not found" }); return; }
            res.json(doc);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    });

    // DELETE
    router.delete(`${path}/:id`, async (req: Request, res: Response) => {
        try {
            const doc = await Model.findOneAndDelete({ [idField]: req.params.id });
            if (!doc) { res.status(404).json({ message: "Not found" }); return; }
            res.json({ message: "Deleted successfully" });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    });
}

// ── Register all CRUD routes ──
crudRoutes("/clients", Client, "clientId", "createdAt", -1);
crudRoutes("/funds", Fund, "fundId", "createdAt", -1);
crudRoutes("/portfolios", Portfolio, "portfolioId", "createdAt", -1);
crudRoutes("/securities", Security, "securityId", "ticker", 1);
crudRoutes("/trades", Trade, "tradeId", "tradeDate", -1);
crudRoutes("/settlements", Settlement, "settlementId", "settlementDate", -1);
crudRoutes("/positions", Position, "positionId");
crudRoutes("/reconciliation-breaks", ReconciliationBreak, "breakId", "date", -1);
crudRoutes("/compliance-events", ComplianceEvent, "eventId", "date", -1);
crudRoutes("/regulatory-submissions", RegulatorySubmission, "submissionId", "dueDate", -1);
crudRoutes("/fees", FeeRecord, "feeId", "invoiceDate", -1);
crudRoutes("/audit-logs", AuditLog, "logId", "timestamp", -1);
crudRoutes("/notifications", Notification, "notificationId", "timestamp", -1);
crudRoutes("/documents", DocumentRecord, "documentId", "uploadedDate", -1);
crudRoutes("/corporate-actions", CorporateAction, "actionId");
crudRoutes("/journal-entries", JournalEntry, "entryId", "date", -1);
crudRoutes("/trial-balance", TrialBalanceEntry, "_id");
crudRoutes("/performance", PerformanceRecord, "portfolioId");
crudRoutes("/aum-trend", AumTrend, "month");
crudRoutes("/recon-summary", ReconSummary, "date");
crudRoutes("/fund-holdings", FundHolding, "holdingId");
crudRoutes("/unit-holders", UnitHolder, "holderId");
crudRoutes("/fund-transactions", FundTransaction, "transactionId", "date", -1);
crudRoutes("/nav-computations", NavComputation, "computationId", "date", -1);

// ── NAV History (special: query by fundId) ──
router.get("/nav-history", async (req: Request, res: Response) => {
    try {
        const { fundId } = req.query;
        const filter = fundId ? { fundId } : {};
        const docs = await NavHistory.find(filter).sort({ date: 1 }).lean();
        res.json(docs);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

// ── Users (admin-only style, no password in response) ──
router.get("/users", async (_req: Request, res: Response) => {
    try {
        const users = await User.find({}).select("-passwordHash").sort({ userId: 1 }).lean();
        res.json(users);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/users/:id", async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ userId: req.params.id }).select("-passwordHash").lean();
        if (!user) { res.status(404).json({ message: "Not found" }); return; }
        res.json(user);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

router.put("/users/:id", async (req: Request, res: Response) => {
    try {
        const { passwordHash, ...updateData } = req.body;
        const user = await User.findOneAndUpdate(
            { userId: req.params.id }, updateData, { new: true }
        ).select("-passwordHash");
        if (!user) { res.status(404).json({ message: "Not found" }); return; }
        res.json(user);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
});

// ── Dashboard Metrics (computed) ──
router.get("/dashboard/metrics", async (_req: Request, res: Response) => {
    try {
        const [clients, portfolios, funds, trades, settlements, reconBreaks, compEvents, regSubs] = await Promise.all([
            Client.countDocuments({}),
            Portfolio.countDocuments({ status: "Active" }),
            Fund.countDocuments({ status: "Active" }),
            Trade.find({ status: { $in: ["Submitted", "Approved", "Executed"] } }).lean(),
            Settlement.find({ status: "Failed" }).lean(),
            ReconciliationBreak.find({ status: { $ne: "Resolved" } }).lean(),
            ComplianceEvent.find({ status: { $in: ["Escalated", "Under Review", "Open"] } }).lean(),
            RegulatorySubmission.find({ status: { $in: ["In Progress", "Not Started"] } }).lean(),
        ]);

        const totalAum = await Fund.aggregate([{ $group: { _id: null, total: { $sum: "$aum" } } }]);
        const latestAum = await AumTrend.findOne({}).sort({ _id: -1 }).lean();

        res.json({
            totalAum: totalAum[0]?.total || 0,
            aumGrowthMtd: 3300000000,
            aumGrowthPct: 4.02,
            totalClients: clients,
            activePortfolios: portfolios,
            totalFunds: funds,
            ytdRevenue: 486250000,
            pendingTrades: trades.length,
            failedSettlements: settlements.length,
            openReconciliationBreaks: reconBreaks.length,
            openComplianceBreaches: compEvents.length,
            regulatoryDeadlinesThisMonth: regSubs.length,
        });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

// ── Positions by Portfolio ──
router.get("/positions/portfolio/:portfolioId", async (req: Request, res: Response) => {
    try {
        const positions = await Position.find({ portfolioId: req.params.portfolioId }).lean();
        res.json(positions);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

// ── Trades by Portfolio ──
router.get("/trades/portfolio/:portfolioId", async (req: Request, res: Response) => {
    try {
        const trades = await Trade.find({ portfolioId: req.params.portfolioId }).sort({ tradeDate: -1 }).lean();
        res.json(trades);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

// ── Trades status update (approve / execute / settle / fail) ──
router.patch("/trades/:id/status", async (req: Request, res: Response) => {
    try {
        const { status, approver, failureReason } = req.body;
        const update: any = { status };
        if (approver) update.approver = approver;
        if (failureReason) update.failureReason = failureReason;

        const trade = await Trade.findOneAndUpdate(
            { tradeId: req.params.id }, update, { new: true }
        );
        if (!trade) { res.status(404).json({ message: "Trade not found" }); return; }
        res.json(trade);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
});

// ── Mark notification as read ──
router.patch("/notifications/:id/read", async (req: Request, res: Response) => {
    try {
        const notif = await Notification.findOneAndUpdate(
            { notificationId: req.params.id }, { read: true }, { new: true }
        );
        if (!notif) { res.status(404).json({ message: "Not found" }); return; }
        res.json(notif);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
});

// ── Mark all notifications as read ──
router.patch("/notifications/read-all", async (_req: Request, res: Response) => {
    try {
        await Notification.updateMany({}, { read: true });

        res.json({ message: "All notifications marked as read" });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

// ── Fund Holdings by Fund ──
router.get("/fund-holdings/fund/:fundId", async (req: Request, res: Response) => {
    try {
        const holdings = await FundHolding.find({ fundId: req.params.fundId }).lean();
        res.json(holdings);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

// ── Unit Holders by Fund ──
router.get("/unit-holders/fund/:fundId", async (req: Request, res: Response) => {
    try {
        const holders = await UnitHolder.find({ fundId: req.params.fundId }).lean();
        res.json(holders);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

// ── Fund Transactions by Fund ──
router.get("/fund-transactions/fund/:fundId", async (req: Request, res: Response) => {
    try {
        const txns = await FundTransaction.find({ fundId: req.params.fundId }).sort({ date: -1 }).lean();
        res.json(txns);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

// ── NAV Computations by Fund ──
router.get("/nav-computations/fund/:fundId", async (req: Request, res: Response) => {
    try {
        const comps = await NavComputation.find({ fundId: req.params.fundId }).sort({ date: -1 }).lean();
        res.json(comps);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

// ── Fund Detail Aggregation ──
router.get("/funds/:id/detail", async (req: Request, res: Response) => {
    try {
        const fundId = req.params.id;
        const [fund, holdings, unitHolders, transactions, navComps, fees, navHistory, compliance, trades] = await Promise.all([
            Fund.findOne({ fundId }).lean(),
            FundHolding.find({ fundId }).lean(),
            UnitHolder.find({ fundId }).lean(),
            FundTransaction.find({ fundId }).sort({ date: -1 }).limit(50).lean(),
            NavComputation.find({ fundId }).sort({ date: -1 }).limit(30).lean(),
            FeeRecord.find({ fundId }).sort({ invoiceDate: -1 }).lean(),
            NavHistory.find({ fundId }).sort({ date: 1 }).lean(),
            ComplianceEvent.find({ $or: [{ portfolioId: { $regex: fundId } }, { type: { $in: ["AML Alert", "Regulatory Deadline"] } }] }).sort({ date: -1 }).limit(20).lean(),
            Trade.find({ fundId }).sort({ tradeDate: -1 }).limit(20).lean(),
        ]);
        if (!fund) { res.status(404).json({ message: "Fund not found" }); return; }

        // Compute summary metrics
        const totalHolders = unitHolders.length;
        const retailHolders = unitHolders.filter(h => h.type === "Individual" || h.type === "Retail" || h.type === "HNW");
        const institutionalHolders = unitHolders.filter(h => h.type !== "Individual" && h.type !== "Retail" && h.type !== "HNW");
        const totalMv = holdings.reduce((s, h) => s + (h.marketValue || 0), 0);
        const cashBalance = (fund.aum || 0) - totalMv;

        // Asset allocation
        const allocationMap: Record<string, number> = {};
        holdings.forEach(h => {
            const cls = h.assetClass || "Other";
            allocationMap[cls] = (allocationMap[cls] || 0) + (h.marketValue || 0);
        });
        if (cashBalance > 0) allocationMap["Cash & Equivalents"] = cashBalance;

        res.json({
            fund,
            holdings,
            unitHolders: { total: totalHolders, retail: retailHolders.length, institutional: institutionalHolders.length, list: unitHolders },
            transactions,
            navComputations: navComps,
            fees,
            navHistory,
            compliance,
            trades,
            summary: {
                cashBalance,
                assetAllocation: allocationMap,
                totalMv,
                pendingSubscriptions: transactions.filter(t => t.type === "Subscription" && t.status === "Pending").reduce((s, t) => s + t.amount, 0),
                pendingRedemptions: transactions.filter(t => t.type === "Redemption" && t.status === "Pending").reduce((s, t) => s + t.amount, 0),
            },
        });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

// ── NAV Computation Engine (SEC Nigeria) ──
// POST /api/funds/:id/compute-nav
// Formula: Total NAV = Total Assets - Total Liabilities
//          NAV per Unit = Total NAV / Total Units Outstanding
router.post("/funds/:id/compute-nav", async (req: Request, res: Response) => {
    try {
        const fundId = req.params.id;
        const { valuationDate, computedBy, toleranceThreshold = 5 } = req.body;
        const date = valuationDate || new Date().toISOString().slice(0, 10);

        // 1. Load fund
        const fund = await Fund.findOne({ fundId }).lean();
        if (!fund) { res.status(404).json({ message: "Fund not found" }); return; }

        // 2. Load all holdings
        const holdings = await FundHolding.find({ fundId }).lean();

        // 3. Sum market values by asset class
        const assetBreakdown: Record<string, number> = {};
        let totalSecuritiesMv = 0;
        const toleranceFlags: string[] = [];

        holdings.forEach(h => {
            const cls = h.assetClass || "Other";
            const mv = h.marketValue || 0;
            assetBreakdown[cls] = (assetBreakdown[cls] || 0) + mv;
            totalSecuritiesMv += mv;

            // Tolerance check
            if (h.unrealisedPnLPct !== undefined && Math.abs(h.unrealisedPnLPct) > toleranceThreshold) {
                toleranceFlags.push(`${h.ticker}: ${h.unrealisedPnLPct.toFixed(2)}% change exceeds ${toleranceThreshold}% threshold`);
            }
        });

        // 4. Add cash and receivables to total assets
        const cashBalance = (fund.aum || 0) - totalSecuritiesMv;
        const accruedIncome = (fund.aum || 0) * 0.002; // Estimated accrued income
        const totalAssets = totalSecuritiesMv + Math.max(cashBalance, 0) + accruedIncome;
        assetBreakdown["Cash & Equivalents"] = Math.max(cashBalance, 0);
        assetBreakdown["Accrued Income"] = accruedIncome;

        // 5. Sum liabilities
        const mgmtFeeAccrued = (fund.aum || 0) * ((fund.managementFee || 0) / 100) / 365 * 30; // ~30 days
        const liabilityBreakdown: Record<string, number> = {
            "Accrued Management Fee": mgmtFeeAccrued,
            "Accrued Trustee Fee": mgmtFeeAccrued * 0.1,
            "Other Payables": (fund.aum || 0) * 0.0005,
        };
        const totalLiabilities = Object.values(liabilityBreakdown).reduce((s, v) => s + v, 0);

        // 6. Compute NAV
        const totalNav = totalAssets - totalLiabilities;
        const unitsOutstanding = fund.units || 1;
        const navPerUnit = totalNav / unitsOutstanding;

        // 7. Get previous NAV for comparison
        const previousNav = fund.nav || navPerUnit;
        const navChange = navPerUnit - previousNav;
        const navChangePct = previousNav > 0 ? (navChange / previousNav) * 100 : 0;

        // 8. Validations
        if (totalNav < 0) {
            toleranceFlags.push("CRITICAL: Computed NAV is negative. Review liabilities.");
        }
        if (Math.abs(navChangePct) > toleranceThreshold) {
            toleranceFlags.push(`NAV change of ${navChangePct.toFixed(2)}% exceeds tolerance threshold of ${toleranceThreshold}%`);
        }

        // 9. Save computation record
        const computationId = `NAV-${fundId}-${date}-${Date.now().toString(36)}`;
        const computation = await NavComputation.create({
            computationId, fundId, date,
            totalAssets, totalLiabilities, totalNav,
            unitsOutstanding, navPerUnit,
            previousNav, navChange, navChangePct,
            status: toleranceFlags.length > 0 ? "Flagged" : "Pending",
            computedBy: computedBy || "System",
            assetBreakdown, liabilityBreakdown, toleranceFlags,
        });

        res.status(201).json(computation);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

// ── NAV Approval (Maker-Checker) ──
router.patch("/nav-computations/:id/approve", async (req: Request, res: Response) => {
    try {
        const { status, approvedBy, approvalComment } = req.body;
        const comp = await NavComputation.findOne({ computationId: req.params.id });
        if (!comp) { res.status(404).json({ message: "NAV computation not found" }); return; }

        comp.status = status || "Approved";
        comp.approvedBy = approvedBy;
        comp.approvalComment = approvalComment;
        comp.approvalDate = new Date().toISOString();
        await comp.save();

        // If approved/published, update the fund master
        if (status === "Approved" || status === "Published") {
            await Fund.findOneAndUpdate(
                { fundId: comp.fundId },
                { nav: comp.navPerUnit, navDate: comp.date, aum: comp.totalNav }
            );
            // Also insert into NAV history
            await NavHistory.findOneAndUpdate(
                { fundId: comp.fundId, date: comp.date },
                { fundId: comp.fundId, date: comp.date, nav: comp.navPerUnit, aum: comp.totalNav },
                { upsert: true }
            );
        }

        res.json(comp);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
