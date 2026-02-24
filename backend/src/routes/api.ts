import { Router, Request, Response } from "express";
import {
    Client, Fund, Portfolio, Security, Trade, Settlement,
    Position, ReconciliationBreak, ComplianceEvent, RegulatorySubmission,
    FeeRecord, AuditLog, Notification, DocumentRecord, CorporateAction,
    JournalEntry, TrialBalanceEntry, PerformanceRecord, AumTrend,
    NavHistory, ReconSummary, User,
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

export default router;
