import mongoose, { Schema, Document } from "mongoose";

// ============================================================
// USER
// ============================================================
export interface IUser extends Document {
    userId: string; name: string; email: string; role: string;
    department: string; status: string; lastLogin: string;
    mfaEnabled: boolean; initials: string; passwordHash: string;
}
const UserSchema = new Schema<IUser>({
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    department: { type: String, required: true },
    status: { type: String, default: "Active" },
    lastLogin: String,
    mfaEnabled: { type: Boolean, default: false },
    initials: String,
    passwordHash: { type: String, required: true },
}, { timestamps: true });
export const User = mongoose.model<IUser>("User", UserSchema);

// ============================================================
// CLIENT
// ============================================================
export interface IClient extends Document {
    clientId: string; name: string; type: string; category: string;
    aum: number; relationship: string; riskRating: string; kyc: string;
    contactPerson: string; email: string; phone: string; city: string;
    state: string; portfolios: string[]; onboardedDate: string;
}
const ClientSchema = new Schema<IClient>({
    clientId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    category: String,
    aum: { type: Number, default: 0 },
    relationship: { type: String, default: "Active" },
    riskRating: String,
    kyc: { type: String, default: "Pending" },
    contactPerson: String, email: String, phone: String,
    city: String, state: String,
    portfolios: [String],
    onboardedDate: String,
}, { timestamps: true });
export const Client = mongoose.model<IClient>("Client", ClientSchema);

// ============================================================
// FUND
// ============================================================
export interface IFund extends Document {
    fundId: string; name: string; type: string; currency: string;
    nav: number; navDate: string; aum: number; units: number;
    benchmark: string; inceptionDate: string;
    ytdReturn: number; oneYearReturn: number;
    managementFee: number; performanceFee: number; status: string;
}
const FundSchema = new Schema<IFund>({
    fundId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    type: String, currency: { type: String, default: "NGN" },
    nav: Number, navDate: String, aum: Number, units: Number,
    benchmark: String, inceptionDate: String,
    ytdReturn: Number, oneYearReturn: Number,
    managementFee: Number, performanceFee: Number,
    status: { type: String, default: "Active" },
}, { timestamps: true });
export const Fund = mongoose.model<IFund>("Fund", FundSchema);

// ============================================================
// PORTFOLIO
// ============================================================
export interface IPortfolio extends Document {
    portfolioId: string; name: string; clientId: string; fundId: string;
    currency: string; aum: number; benchmark: string; status: string;
    assetClass: string; ytdReturn: number; inceptionDate: string;
    manager: string; allocation: Record<string, number>;
}
const PortfolioSchema = new Schema<IPortfolio>({
    portfolioId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    clientId: { type: String, required: true },
    fundId: String, currency: { type: String, default: "NGN" },
    aum: Number, benchmark: String, status: { type: String, default: "Active" },
    assetClass: String, ytdReturn: Number, inceptionDate: String,
    manager: String,
    allocation: { type: Schema.Types.Mixed, default: {} },
}, { timestamps: true });
export const Portfolio = mongoose.model<IPortfolio>("Portfolio", PortfolioSchema);

// ============================================================
// SECURITY
// ============================================================
export interface ISecurity extends Document {
    securityId: string; ticker: string; name: string; exchange: string;
    assetClass: string; sector: string; price: number; priceDate: string;
    currency: string; change?: number; changePct?: number; volume?: number;
    couponRate?: number; maturityDate?: string; yieldToMaturity?: number;
    duration?: number; discountRate?: number;
}
const SecuritySchema = new Schema<ISecurity>({
    securityId: { type: String, required: true, unique: true },
    ticker: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    exchange: String, assetClass: String, sector: String,
    price: Number, priceDate: String, currency: { type: String, default: "NGN" },
    change: Number, changePct: Number, volume: Number,
    couponRate: Number, maturityDate: String, yieldToMaturity: Number,
    duration: Number, discountRate: Number,
}, { timestamps: true });
export const Security = mongoose.model<ISecurity>("Security", SecuritySchema);

// ============================================================
// TRADE
// ============================================================
export interface ITrade extends Document {
    tradeId: string; portfolioId: string; clientId: string; securityId: string;
    ticker: string; side: string; quantity: number; price: number;
    grossValue: number; brokerFee: number; settlementFee: number;
    netValue: number; tradeDate: string; settlementDate: string;
    status: string; broker: string; trader: string; approver?: string | null;
    fundId: string; failureReason?: string;
}
const TradeSchema = new Schema<ITrade>({
    tradeId: { type: String, required: true, unique: true },
    portfolioId: String, clientId: String, securityId: String,
    ticker: String, side: String, quantity: Number, price: Number,
    grossValue: Number, brokerFee: Number, settlementFee: Number,
    netValue: Number, tradeDate: String, settlementDate: String,
    status: { type: String, default: "Draft" },
    broker: String, trader: String, approver: String,
    fundId: String, failureReason: String,
}, { timestamps: true });
export const Trade = mongoose.model<ITrade>("Trade", TradeSchema);

// ============================================================
// SETTLEMENT
// ============================================================
export interface ISettlement extends Document {
    settlementId: string; tradeId: string; ticker: string; portfolioId: string;
    clientName: string; side: string; quantity: number; netValue: number;
    settlementDate: string; status: string; custodian: string;
    dvpStatus: string; settledDate?: string | null; failureReason?: string;
}
const SettlementSchema = new Schema<ISettlement>({
    settlementId: { type: String, required: true, unique: true },
    tradeId: String, ticker: String, portfolioId: String,
    clientName: String, side: String, quantity: Number, netValue: Number,
    settlementDate: String, status: { type: String, default: "Pending" },
    custodian: String, dvpStatus: String, settledDate: String,
    failureReason: String,
}, { timestamps: true });
export const Settlement = mongoose.model<ISettlement>("Settlement", SettlementSchema);

// ============================================================
// POSITION
// ============================================================
export interface IPosition extends Document {
    positionId: string; portfolioId: string; securityId: string; ticker: string;
    quantity?: number; faceValue?: number; avgCost: number; currentPrice: number;
    marketValue: number; unrealisedPnL: number; unrealisedPnLPct: number;
    weight: number;
}
const PositionSchema = new Schema<IPosition>({
    positionId: { type: String, required: true, unique: true },
    portfolioId: String, securityId: String, ticker: String,
    quantity: Number, faceValue: Number, avgCost: Number, currentPrice: Number,
    marketValue: Number, unrealisedPnL: Number, unrealisedPnLPct: Number,
    weight: Number,
}, { timestamps: true });
export const Position = mongoose.model<IPosition>("Position", PositionSchema);

// ============================================================
// RECONCILIATION BREAK
// ============================================================
export interface IReconciliationBreak extends Document {
    breakId: string; date: string; portfolioId: string; type: string;
    security: string; breakType: string; difference: number;
    status: string; assignedTo: string; ageDays: number; priority: string;
    internalQty?: number; custodianQty?: number;
    internalAmt?: number; custodianAmt?: number;
    internalPrice?: number; custodianPrice?: number;
}
const ReconciliationBreakSchema = new Schema<IReconciliationBreak>({
    breakId: { type: String, required: true, unique: true },
    date: String, portfolioId: String, type: String,
    security: String, breakType: String, difference: Number,
    status: { type: String, default: "Open" },
    assignedTo: String, ageDays: Number, priority: String,
    internalQty: Number, custodianQty: Number,
    internalAmt: Number, custodianAmt: Number,
    internalPrice: Number, custodianPrice: Number,
}, { timestamps: true });
export const ReconciliationBreak = mongoose.model<IReconciliationBreak>("ReconciliationBreak", ReconciliationBreakSchema);

// ============================================================
// COMPLIANCE EVENT
// ============================================================
export interface IComplianceEvent extends Document {
    eventId: string; date: string; portfolioId?: string; type: string;
    ticker?: string; clientId?: string; clientName?: string;
    rule: string; limit?: number; actual?: number;
    transactionAmt?: number; threshold?: number;
    dueDate?: string; severity: string; status: string;
    raisedBy: string; assignedTo: string;
}
const ComplianceEventSchema = new Schema<IComplianceEvent>({
    eventId: { type: String, required: true, unique: true },
    date: String, portfolioId: String, type: String,
    ticker: String, clientId: String, clientName: String,
    rule: String, limit: Number, actual: Number,
    transactionAmt: Number, threshold: Number,
    dueDate: String, severity: String,
    status: { type: String, default: "Open" },
    raisedBy: String, assignedTo: String,
}, { timestamps: true });
export const ComplianceEvent = mongoose.model<IComplianceEvent>("ComplianceEvent", ComplianceEventSchema);

// ============================================================
// REGULATORY SUBMISSION
// ============================================================
export interface IRegulatorySubmission extends Document {
    submissionId: string; name: string; regulator: string;
    dueDate: string; submittedDate?: string | null; status: string;
    preparedBy?: string | null; period: string; type: string;
}
const RegulatorySubmissionSchema = new Schema<IRegulatorySubmission>({
    submissionId: { type: String, required: true, unique: true },
    name: String, regulator: String, dueDate: String,
    submittedDate: String, status: { type: String, default: "Not Started" },
    preparedBy: String, period: String, type: String,
}, { timestamps: true });
export const RegulatorySubmission = mongoose.model<IRegulatorySubmission>("RegulatorySubmission", RegulatorySubmissionSchema);

// ============================================================
// FEE RECORD
// ============================================================
export interface IFeeRecord extends Document {
    feeId: string; fundId: string; fundName: string; clientId: string;
    clientName: string; feeType: string; period: string; aum: number;
    rate: number; annualFee?: number; monthlyFee?: number;
    feeAmount?: number; accrued: number; invoiceDate: string;
    status: string; invoiceNo: string;
    hurdle?: number; actualReturn?: number;
}
const FeeRecordSchema = new Schema<IFeeRecord>({
    feeId: { type: String, required: true, unique: true },
    fundId: String, fundName: String, clientId: String, clientName: String,
    feeType: String, period: String, aum: Number, rate: Number,
    annualFee: Number, monthlyFee: Number, feeAmount: Number,
    accrued: Number, invoiceDate: String,
    status: { type: String, default: "Pending" },
    invoiceNo: String, hurdle: Number, actualReturn: Number,
}, { timestamps: true });
export const FeeRecord = mongoose.model<IFeeRecord>("FeeRecord", FeeRecordSchema);

// ============================================================
// AUDIT LOG
// ============================================================
export interface IAuditLog extends Document {
    logId: string; timestamp: string; userId: string; userName: string;
    role: string; ipAddress: string; module: string; action: string;
    entity: string; before: string; after: string; outcome: string;
}
const AuditLogSchema = new Schema<IAuditLog>({
    logId: { type: String, required: true, unique: true },
    timestamp: String, userId: String, userName: String,
    role: String, ipAddress: String, module: String, action: String,
    entity: String, before: String, after: String, outcome: String,
}, { timestamps: true });
export const AuditLog = mongoose.model<IAuditLog>("AuditLog", AuditLogSchema);

// ============================================================
// NOTIFICATION
// ============================================================
export interface INotification extends Document {
    notificationId: string; timestamp: string; type: string;
    title: string; message: string; severity: string;
    read: boolean; link: string;
}
const NotificationSchema = new Schema<INotification>({
    notificationId: { type: String, required: true, unique: true },
    timestamp: String, type: String, title: String, message: String,
    severity: String, read: { type: Boolean, default: false }, link: String,
}, { timestamps: true });
export const Notification = mongoose.model<INotification>("Notification", NotificationSchema);

// ============================================================
// DOCUMENT
// ============================================================
export interface IDocumentRecord extends Document {
    documentId: string; name: string; type: string;
    clientId?: string; clientName?: string; regulator?: string;
    tradeId?: string; uploadedBy: string; uploadedDate: string;
    version: string; fileSize: string; format: string; status: string;
}
const DocumentRecordSchema = new Schema<IDocumentRecord>({
    documentId: { type: String, required: true, unique: true },
    name: String, type: String, clientId: String, clientName: String,
    regulator: String, tradeId: String, uploadedBy: String, uploadedDate: String,
    version: String, fileSize: String, format: String,
    status: { type: String, default: "Active" },
}, { timestamps: true });
export const DocumentRecord = mongoose.model<IDocumentRecord>("DocumentRecord", DocumentRecordSchema);

// ============================================================
// CORPORATE ACTION
// ============================================================
export interface ICorporateAction extends Document {
    actionId: string; ticker: string; securityId: string; type: string;
    exDate?: string; couponDate?: string; payDate: string;
    amount?: number; currency: string; perUnit?: string; ratio?: string;
    rate?: number; status: string; affectedPortfolios: string[];
}
const CorporateActionSchema = new Schema<ICorporateAction>({
    actionId: { type: String, required: true, unique: true },
    ticker: String, securityId: String, type: String,
    exDate: String, couponDate: String, payDate: String,
    amount: Number, currency: { type: String, default: "NGN" },
    perUnit: String, ratio: String, rate: Number,
    status: { type: String, default: "Upcoming" },
    affectedPortfolios: [String],
}, { timestamps: true });
export const CorporateAction = mongoose.model<ICorporateAction>("CorporateAction", CorporateActionSchema);

// ============================================================
// JOURNAL ENTRY
// ============================================================
export interface IJournalEntry extends Document {
    entryId: string; date: string; fund: string; description: string;
    drAccount: string; crAccount: string; amount: number;
    sourceModule: string; postedBy: string;
}
const JournalEntrySchema = new Schema<IJournalEntry>({
    entryId: { type: String, required: true, unique: true },
    date: String, fund: String, description: String,
    drAccount: String, crAccount: String, amount: Number,
    sourceModule: String, postedBy: String,
}, { timestamps: true });
export const JournalEntry = mongoose.model<IJournalEntry>("JournalEntry", JournalEntrySchema);

// ============================================================
// TRIAL BALANCE ENTRY
// ============================================================
export interface ITrialBalanceEntry extends Document {
    account: string; group: string; debit: number; credit: number;
    period: string;
}
const TrialBalanceSchema = new Schema<ITrialBalanceEntry>({
    account: String, group: String, debit: Number, credit: Number,
    period: { type: String, default: "2026-02" },
}, { timestamps: true });
export const TrialBalanceEntry = mongoose.model<ITrialBalanceEntry>("TrialBalanceEntry", TrialBalanceSchema);

// ============================================================
// PERFORMANCE RECORD
// ============================================================
export interface IPerformanceRecord extends Document {
    portfolioId: string; portfolioName: string; benchmark: string;
    returns: Record<string, { portfolio: number; benchmark: number }>;
    attribution: Record<string, number>;
}
const PerformanceSchema = new Schema<IPerformanceRecord>({
    portfolioId: { type: String, required: true, unique: true },
    portfolioName: String, benchmark: String,
    returns: { type: Schema.Types.Mixed },
    attribution: { type: Schema.Types.Mixed },
}, { timestamps: true });
export const PerformanceRecord = mongoose.model<IPerformanceRecord>("PerformanceRecord", PerformanceSchema);

// ============================================================
// AUM TREND (monthly snapshot)
// ============================================================
export interface IAumTrend extends Document {
    month: string; aum: number; inflow: number; outflow: number;
}
const AumTrendSchema = new Schema<IAumTrend>({
    month: { type: String, required: true, unique: true },
    aum: Number, inflow: Number, outflow: Number,
}, { timestamps: true });
export const AumTrend = mongoose.model<IAumTrend>("AumTrend", AumTrendSchema);

// ============================================================
// NAV HISTORY
// ============================================================
export interface INavHistory extends Document {
    fundId: string; date: string; nav: number; aum?: number;
}
const NavHistorySchema = new Schema<INavHistory>({
    fundId: String, date: String, nav: Number, aum: Number,
}, { timestamps: true });
NavHistorySchema.index({ fundId: 1, date: 1 }, { unique: true });
export const NavHistory = mongoose.model<INavHistory>("NavHistory", NavHistorySchema);

// ============================================================
// RECON SUMMARY (daily snapshot)
// ============================================================
export interface IReconSummary extends Document {
    date: string; matched: number; open: number; resolved: number;
}
const ReconSummarySchema = new Schema<IReconSummary>({
    date: { type: String, required: true, unique: true },
    matched: Number, open: Number, resolved: Number,
}, { timestamps: true });
export const ReconSummary = mongoose.model<IReconSummary>("ReconSummary", ReconSummarySchema);
