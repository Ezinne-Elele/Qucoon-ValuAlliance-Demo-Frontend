/**
 * Mock API Endpoints
 * 
 * These simulate external market data, regulatory, and custodian integrations
 * that would normally come from real third-party services (NGX, FMDQ, CSCS, CBN, SEC).
 * Used for demo purposes to show how the system would interact with external systems.
 */
import { Router, Request, Response } from "express";

const router = Router();

// ── NGX Market Data (mock) ──
router.get("/ngx/market-data", (_req: Request, res: Response) => {
    res.json({
        source: "NGX (Mock)",
        asOf: "2026-02-23 16:00:00 WAT",
        indexName: "All-Share Index",
        indexValue: 107245.82,
        indexChange: 1245.30,
        indexChangePct: 1.18,
        marketCap: "62,480,000,000,000",
        volume: 485200000,
        value: 12850000000,
        advancers: 32,
        decliners: 18,
        unchanged: 12,
        topGainers: [
            { ticker: "SEPLAT", price: 4250.00, change: 150.00, changePct: 3.66 },
            { ticker: "DANGCEM", price: 510.00, change: 12.50, changePct: 2.51 },
            { ticker: "ZENITHBANK", price: 37.20, change: 0.70, changePct: 1.92 },
        ],
        topLosers: [
            { ticker: "AIRTELAFRI", price: 1890.00, change: -20.00, changePct: -1.05 },
            { ticker: "GTCO", price: 48.50, change: -0.30, changePct: -0.61 },
            { ticker: "UBA", price: 23.50, change: -0.10, changePct: -0.42 },
        ]
    });
});

// ── NGX Stock Quote (mock) ──
router.get("/ngx/quote/:ticker", (req: Request, res: Response) => {
    const quotes: Record<string, any> = {
        DANGCEM: { ticker: "DANGCEM", name: "Dangote Cement PLC", open: 497.50, high: 512.00, low: 496.20, close: 510.00, prevClose: 497.50, volume: 4820000, vwap: 505.40, trades: 342 },
        GTCO: { ticker: "GTCO", name: "Guaranty Trust Holding Co.", open: 48.80, high: 49.20, low: 48.10, close: 48.50, prevClose: 48.80, volume: 18350000, vwap: 48.65, trades: 1284 },
        ZENITHBANK: { ticker: "ZENITHBANK", name: "Zenith Bank PLC", open: 36.50, high: 37.50, low: 36.30, close: 37.20, prevClose: 36.50, volume: 22100000, vwap: 36.90, trades: 1567 },
        MTNN: { ticker: "MTNN", name: "MTN Nigeria", open: 195.00, high: 199.50, low: 194.50, close: 198.00, prevClose: 195.00, volume: 3200000, vwap: 197.20, trades: 425 },
        SEPLAT: { ticker: "SEPLAT", name: "Seplat Energy PLC", open: 4100.00, high: 4280.00, low: 4080.00, close: 4250.00, prevClose: 4100.00, volume: 185000, vwap: 4200.00, trades: 89 },
    };
    const q = quotes[req.params.ticker.toUpperCase()];
    if (!q) { res.status(404).json({ message: `Ticker ${req.params.ticker} not found` }); return; }
    res.json({ source: "NGX (Mock)", asOf: "2026-02-23 16:00:00 WAT", ...q });
});

// ── FMDQ Bond Pricing (mock) ──
router.get("/fmdq/bond-prices", (_req: Request, res: Response) => {
    res.json({
        source: "FMDQ (Mock)",
        asOf: "2026-02-23 15:00:00 WAT",
        bonds: [
            { isin: "NGFGN2704A7", ticker: "FGN-APR-27", coupon: 13.98, maturity: "2027-04-23", bidPrice: 98.30, askPrice: 98.60, midPrice: 98.45, yieldBid: 14.60, yieldAsk: 14.44, duration: 1.17 },
            { isin: "NGFGN2902A9", ticker: "FGN-FEB-29", coupon: 14.55, maturity: "2029-02-14", bidPrice: 97.05, askPrice: 97.35, midPrice: 97.20, yieldBid: 15.25, yieldAsk: 15.11, duration: 2.75 },
            { isin: "NGFGN3206B2", ticker: "FGN-JUN-32", coupon: 16.25, maturity: "2032-06-18", bidPrice: 102.30, askPrice: 102.70, midPrice: 102.50, yieldBid: 15.95, yieldAsk: 15.83, duration: 5.12 },
            { isin: "NGFGN3503C5", ticker: "FGN-MAR-35", coupon: 17.00, maturity: "2035-03-26", bidPrice: 101.60, askPrice: 102.00, midPrice: 101.80, yieldBid: 16.78, yieldAsk: 16.66, duration: 7.44 },
        ]
    });
});

// ── CBN T-Bill Rates (mock) ──
router.get("/cbn/tbill-rates", (_req: Request, res: Response) => {
    res.json({
        source: "CBN (Mock)",
        asOf: "2026-02-20",
        auctionDate: "2026-02-19",
        results: [
            { tenor: "91-day", stopRate: 22.50, amountOffered: 100000000000, amountAllotted: 89500000000, bidToOffer: 2.45 },
            { tenor: "182-day", stopRate: 23.10, amountOffered: 100000000000, amountAllotted: 92100000000, bidToOffer: 2.78 },
            { tenor: "364-day", stopRate: 23.75, amountOffered: 100000000000, amountAllotted: 95400000000, bidToOffer: 3.12 },
        ],
        mprRate: 27.50,
        cashReserveRatio: 50.00,
        inflationRate: 33.20,
        exchangeRate: { usdNgn: 1580.00, source: "CBN Official" },
    });
});

// ── CSCS Settlement Status (mock) ──
router.get("/cscs/settlement-status/:tradeRef", (req: Request, res: Response) => {
    const statuses: Record<string, any> = {
        "TRD-2026-0248": { tradeRef: "TRD-2026-0248", cscsRef: "CSCS-2026-88412", status: "Settled", dvpStatus: "Matched", settledDate: "2026-02-24", shares: 50000, consideration: 25678500, custodianBank: "Stanbic IBTC" },
        "TRD-2026-0247": { tradeRef: "TRD-2026-0247", cscsRef: "CSCS-2026-88415", status: "Pending", dvpStatus: "Awaiting Match", settledDate: null, shares: 500000000, consideration: 492496125, custodianBank: "HSBC Nigeria" },
        "TRD-2026-0242": { tradeRef: "TRD-2026-0242", cscsRef: "CSCS-2026-88390", status: "Failed", dvpStatus: "Rejected", settledDate: null, failureReason: "Insufficient bond allocation", shares: 250000000, consideration: 256378125 },
    };
    const s = statuses[req.params.tradeRef];
    if (!s) { res.json({ tradeRef: req.params.tradeRef, status: "Not Found at CSCS" }); return; }
    res.json({ source: "CSCS (Mock)", asOf: new Date().toISOString(), ...s });
});

// ── SEC Regulatory Calendar (mock) ──
router.get("/sec/regulatory-calendar", (_req: Request, res: Response) => {
    res.json({
        source: "SEC Nigeria (Mock)",
        calendar: [
            { returnType: "Quarterly Return", period: "Q4 2025", dueDate: "2026-02-28", status: "Due", filingGuide: "SEC Form QR-2025", penaltyForLate: "₦500,000 per day" },
            { returnType: "Annual Return", period: "FY 2025", dueDate: "2026-06-30", status: "Upcoming", filingGuide: "SEC Form AR-2025", penaltyForLate: "₦1,000,000 per day" },
            { returnType: "AML/CFT Compliance Report", period: "H1 2026", dueDate: "2026-07-31", status: "Upcoming", filingGuide: "NFIU Form AML-H1" },
        ],
        notices: [
            { date: "2026-02-15", title: "Circular on Updated Capital Adequacy Requirements", refNo: "SEC/CDIR/01/2026" },
            { date: "2026-02-10", title: "Guidelines on ESG Reporting for Fund Managers", refNo: "SEC/CDIR/02/2026" },
        ]
    });
});

// ── NFIU STR Check (mock Suspicious Transaction Report) ──
router.post("/nfiu/str-check", (req: Request, res: Response) => {
    const { transactionAmt, clientName } = req.body;
    const flagged = transactionAmt > 100000000;
    res.json({
        source: "NFIU (Mock)",
        clientName,
        transactionAmt,
        threshold: 100000000,
        flagged,
        recommendation: flagged
            ? "Suspicious Transaction — File STR with NFIU within 72 hours"
            : "Transaction within normal parameters — no STR required",
        referenceId: `NFIU-CHK-${Date.now()}`,
    });
});

// ── FX Rates (mock) ──
router.get("/fx/rates", (_req: Request, res: Response) => {
    res.json({
        source: "CBN / Reuters (Mock)",
        asOf: "2026-02-23 15:30:00 WAT",
        rates: [
            { pair: "USD/NGN", bid: 1578.50, ask: 1581.50, mid: 1580.00, source: "CBN Official" },
            { pair: "EUR/NGN", bid: 1710.20, ask: 1714.80, mid: 1712.50, source: "Interbank" },
            { pair: "GBP/NGN", bid: 2005.40, ask: 2010.60, mid: 2008.00, source: "Interbank" },
        ]
    });
});

export default router;
