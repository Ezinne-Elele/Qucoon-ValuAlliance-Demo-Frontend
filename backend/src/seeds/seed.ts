import dotenv from "dotenv";
import { resolve } from "path";
dotenv.config({ path: resolve(import.meta.dirname, "../../../.env") });

import connectDB from "../config/db.js";
import bcrypt from "bcryptjs";
import {
    User, Client, Fund, Portfolio, Security, Trade, Settlement,
    Position, ReconciliationBreak, ComplianceEvent, RegulatorySubmission,
    FeeRecord, AuditLog, Notification, DocumentRecord, CorporateAction,
    JournalEntry, TrialBalanceEntry, PerformanceRecord, AumTrend,
    NavHistory, ReconSummary,
} from "../models/index.js";

async function seed() {
    await connectDB();
    console.log("🌱 Seeding database...");

    // Clear all collections
    await Promise.all([
        User.deleteMany({}), Client.deleteMany({}), Fund.deleteMany({}),
        Portfolio.deleteMany({}), Security.deleteMany({}), Trade.deleteMany({}),
        Settlement.deleteMany({}), Position.deleteMany({}),
        ReconciliationBreak.deleteMany({}), ComplianceEvent.deleteMany({}),
        RegulatorySubmission.deleteMany({}), FeeRecord.deleteMany({}),
        AuditLog.deleteMany({}), Notification.deleteMany({}),
        DocumentRecord.deleteMany({}), CorporateAction.deleteMany({}),
        JournalEntry.deleteMany({}), TrialBalanceEntry.deleteMany({}),
        PerformanceRecord.deleteMany({}), AumTrend.deleteMany({}),
        NavHistory.deleteMany({}), ReconSummary.deleteMany({}),
    ]);
    console.log("  ✓ Cleared all collections");

    // ── USERS ──
    const defaultPwHash = await bcrypt.hash("ValuAlliance2026!", 10);
    await User.insertMany([
        { userId: "U001", name: "Adaeze Okonkwo", email: "adaeze.okonkwo@valualliance.com.ng", role: "Portfolio Manager", department: "Investments", status: "Active", lastLogin: "2026-02-23 08:42", mfaEnabled: true, initials: "AO", passwordHash: defaultPwHash },
        { userId: "U002", name: "Emeka Nwachukwu", email: "emeka.nwachukwu@valualliance.com.ng", role: "Chief Investment Officer", department: "Investments", status: "Active", lastLogin: "2026-02-23 07:55", mfaEnabled: true, initials: "EN", passwordHash: defaultPwHash },
        { userId: "U003", name: "Fatima Abubakar", email: "fatima.abubakar@valualliance.com.ng", role: "Compliance Officer", department: "Compliance", status: "Active", lastLogin: "2026-02-22 16:30", mfaEnabled: true, initials: "FA", passwordHash: defaultPwHash },
        { userId: "U004", name: "Babatunde Adeyemi", email: "b.adeyemi@valualliance.com.ng", role: "Fund Accountant", department: "Finance", status: "Active", lastLogin: "2026-02-23 09:10", mfaEnabled: true, initials: "BA", passwordHash: defaultPwHash },
        { userId: "U005", name: "Ngozi Eze", email: "ngozi.eze@valualliance.com.ng", role: "Operations Manager", department: "Operations", status: "Active", lastLogin: "2026-02-23 08:15", mfaEnabled: true, initials: "NE", passwordHash: defaultPwHash },
        { userId: "U006", name: "Chukwuemeka Obi", email: "c.obi@valualliance.com.ng", role: "Risk Analyst", department: "Risk", status: "Active", lastLogin: "2026-02-21 14:20", mfaEnabled: false, initials: "CO", passwordHash: defaultPwHash },
        { userId: "U007", name: "Aisha Mohammed", email: "a.mohammed@valualliance.com.ng", role: "Client Relationship Manager", department: "Business Dev", status: "Active", lastLogin: "2026-02-23 10:05", mfaEnabled: true, initials: "AM", passwordHash: defaultPwHash },
        { userId: "U008", name: "Oluwaseun Adegoke", email: "s.adegoke@valualliance.com.ng", role: "System Administrator", department: "IT", status: "Active", lastLogin: "2026-02-23 07:00", mfaEnabled: true, initials: "OA", passwordHash: defaultPwHash },
    ]);
    console.log("  ✓ Users (8)");

    // ── CLIENTS ──
    await Client.insertMany([
        { clientId: "C001", name: "ARM Pension Managers Ltd", type: "Institutional", category: "Pension Fund Administrator", aum: 18200000000, relationship: "Active", riskRating: "Low", kyc: "Verified", contactPerson: "Tunde Olanrewaju", email: "tolanrewaju@arm.com.ng", phone: "+234 1 462 3400", city: "Lagos", state: "Lagos", portfolios: ["P001", "P002"], onboardedDate: "2019-03-15" },
        { clientId: "C002", name: "Stanbic IBTC Asset Management Ltd", type: "Institutional", category: "Asset Manager", aum: 22400000000, relationship: "Active", riskRating: "Low", kyc: "Verified", contactPerson: "Chinwe Okoro", email: "c.okoro@stanbicibtc.com", phone: "+234 1 422 3003", city: "Lagos", state: "Lagos", portfolios: ["P003"], onboardedDate: "2018-07-22" },
        { clientId: "C003", name: "NLPC Pension Fund Administrators", type: "Institutional", category: "Pension Fund Administrator", aum: 12500000000, relationship: "Active", riskRating: "Low", kyc: "Verified", contactPerson: "Dr Emeka Eze", email: "emeka.eze@nlpcpension.com.ng", phone: "+234 1 280 0500", city: "Abuja", state: "FCT", portfolios: ["P004", "P005"], onboardedDate: "2020-01-10" },
        { clientId: "C004", name: "Zenith Life Assurance Ltd", type: "Institutional", category: "Insurance", aum: 9800000000, relationship: "Active", riskRating: "Low-Medium", kyc: "Verified", contactPerson: "Mrs Bola Adenike", email: "b.adenike@zenithlife.com.ng", phone: "+234 1 292 5800", city: "Lagos", state: "Lagos", portfolios: ["P006"], onboardedDate: "2021-04-05" },
        { clientId: "C005", name: "FBNQuest Trustees Ltd", type: "Institutional", category: "Trust & Fiduciary", aum: 8900000000, relationship: "Active", riskRating: "Low", kyc: "Verified", contactPerson: "Chidi Anyanwu", email: "canyanwu@fbnquest.com", phone: "+234 1 285 9800", city: "Lagos", state: "Lagos", portfolios: ["P007"], onboardedDate: "2019-11-20" },
        { clientId: "C006", name: "Coronation Asset Management Ltd", type: "Institutional", category: "Asset Manager", aum: 5300000000, relationship: "Active", riskRating: "Low-Medium", kyc: "Verified", contactPerson: "Kemi Lawal", email: "k.lawal@coronationam.com", phone: "+234 1 631 4000", city: "Lagos", state: "Lagos", portfolios: ["P008"], onboardedDate: "2022-06-01" },
        { clientId: "C007", name: "Alhaji Musa Dangiwa", type: "Individual", category: "High Net Worth Individual", aum: 850000000, relationship: "Active", riskRating: "Medium", kyc: "Verified", contactPerson: "Alhaji Musa Dangiwa", email: "m.dangiwa@privatemail.com", phone: "+234 803 456 7890", city: "Kano", state: "Kano", portfolios: ["P009"], onboardedDate: "2021-09-14" },
        { clientId: "C008", name: "Dr. Ngozi Iweala-Obi", type: "Individual", category: "High Net Worth Individual", aum: 1200000000, relationship: "Active", riskRating: "Low-Medium", kyc: "Verified", contactPerson: "Dr. Ngozi Iweala-Obi", email: "n.ob@privatemail.com", phone: "+234 805 234 5678", city: "Lagos", state: "Lagos", portfolios: ["P010"], onboardedDate: "2020-03-28" },
        { clientId: "C009", name: "Channels Media Group Pension", type: "Corporate", category: "Corporate Pension", aum: 2100000000, relationship: "Active", riskRating: "Medium", kyc: "Verified", contactPerson: "Biodun Oladele", email: "b.oladele@channelstv.com", phone: "+234 1 261 0905", city: "Lagos", state: "Lagos", portfolios: ["P011"], onboardedDate: "2023-02-15" },
        { clientId: "C010", name: "Heritage Bank Retirees Fund", type: "Institutional", category: "Defined Benefit Fund", aum: 4150000000, relationship: "Active", riskRating: "Low", kyc: "Verified", contactPerson: "Amaka Ofoegbu", email: "a.ofoegbu@heritagefund.ng", phone: "+234 1 279 4000", city: "Lagos", state: "Lagos", portfolios: ["P012"], onboardedDate: "2020-08-30" },
    ]);
    console.log("  ✓ Clients (10)");

    // ── FUNDS ──
    await Fund.insertMany([
        { fundId: "F001", name: "ValuAlliance Growth Fund", type: "Equity", currency: "NGN", nav: 125.48, navDate: "2026-02-21", aum: 32400000000, units: 258250000, benchmark: "NSE All-Share Index", inceptionDate: "2015-01-05", ytdReturn: 18.42, oneYearReturn: 31.85, managementFee: 1.5, performanceFee: 20, status: "Active" },
        { fundId: "F002", name: "ValuAlliance Fixed Income Fund", type: "Fixed Income", currency: "NGN", nav: 108.74, navDate: "2026-02-21", aum: 28700000000, units: 263940000, benchmark: "FMDQ Bond Index", inceptionDate: "2016-06-12", ytdReturn: 4.82, oneYearReturn: 14.93, managementFee: 1.0, performanceFee: 0, status: "Active" },
        { fundId: "F003", name: "ValuAlliance Money Market Fund", type: "Money Market", currency: "NGN", nav: 100.00, navDate: "2026-02-21", aum: 14600000000, units: 146000000, benchmark: "CBN Overnight Rate", inceptionDate: "2017-03-20", ytdReturn: 2.85, oneYearReturn: 22.40, managementFee: 0.5, performanceFee: 0, status: "Active" },
        { fundId: "F004", name: "ValuAlliance Balanced Fund", type: "Balanced", currency: "NGN", nav: 115.22, navDate: "2026-02-21", aum: 9700000000, units: 84190000, benchmark: "Composite (60% NSE / 40% FMDQ)", inceptionDate: "2018-10-01", ytdReturn: 11.64, oneYearReturn: 24.18, managementFee: 1.25, performanceFee: 15, status: "Active" },
    ]);
    console.log("  ✓ Funds (4)");

    // ── PORTFOLIOS ──
    await Portfolio.insertMany([
        { portfolioId: "P001", name: "ARM Pensions — Equity Mandate", clientId: "C001", fundId: "F001", currency: "NGN", aum: 10500000000, benchmark: "NSE All-Share Index", status: "Active", assetClass: "Equity", ytdReturn: 19.2, inceptionDate: "2019-03-15", manager: "Adaeze Okonkwo", allocation: { equities: 75, fixedIncome: 15, moneyMarket: 8, cash: 2 } },
        { portfolioId: "P002", name: "ARM Pensions — Fixed Income Mandate", clientId: "C001", fundId: "F002", currency: "NGN", aum: 7700000000, benchmark: "FMDQ Bond Index", status: "Active", assetClass: "Fixed Income", ytdReturn: 5.1, inceptionDate: "2019-06-01", manager: "Emeka Nwachukwu", allocation: { equities: 0, fixedIncome: 82, moneyMarket: 12, cash: 6 } },
        { portfolioId: "P003", name: "Stanbic — Growth Portfolio", clientId: "C002", fundId: "F001", currency: "NGN", aum: 22400000000, benchmark: "NSE All-Share Index", status: "Active", assetClass: "Mixed", ytdReturn: 17.8, inceptionDate: "2018-07-22", manager: "Adaeze Okonkwo", allocation: { equities: 65, fixedIncome: 25, moneyMarket: 7, cash: 3 } },
        { portfolioId: "P004", name: "NLPC — Conservative Mandate", clientId: "C003", fundId: "F002", currency: "NGN", aum: 8200000000, benchmark: "FMDQ Bond Index", status: "Active", assetClass: "Fixed Income", ytdReturn: 4.6, inceptionDate: "2020-01-10", manager: "Emeka Nwachukwu", allocation: { equities: 5, fixedIncome: 80, moneyMarket: 12, cash: 3 } },
        { portfolioId: "P005", name: "NLPC — Money Market Mandate", clientId: "C003", fundId: "F003", currency: "NGN", aum: 4300000000, benchmark: "CBN Overnight Rate", status: "Active", assetClass: "Money Market", ytdReturn: 2.9, inceptionDate: "2021-03-01", manager: "Adaeze Okonkwo", allocation: { equities: 0, fixedIncome: 0, moneyMarket: 95, cash: 5 } },
    ]);
    console.log("  ✓ Portfolios (5)");

    // ── SECURITIES ──
    await Security.insertMany([
        { securityId: "S001", ticker: "DANGCEM", name: "Dangote Cement PLC", exchange: "NGX", assetClass: "Equity", sector: "Materials", price: 510.00, priceDate: "2026-02-21", currency: "NGN", change: 12.50, changePct: 2.51, volume: 4820000 },
        { securityId: "S002", ticker: "GTCO", name: "Guaranty Trust Holding Co. PLC", exchange: "NGX", assetClass: "Equity", sector: "Financial Services", price: 48.50, priceDate: "2026-02-21", currency: "NGN", change: -0.30, changePct: -0.61, volume: 18350000 },
        { securityId: "S003", ticker: "ZENITHBANK", name: "Zenith Bank PLC", exchange: "NGX", assetClass: "Equity", sector: "Financial Services", price: 37.20, priceDate: "2026-02-21", currency: "NGN", change: 0.70, changePct: 1.92, volume: 22100000 },
        { securityId: "S004", ticker: "MTNN", name: "MTN Nigeria Communications PLC", exchange: "NGX", assetClass: "Equity", sector: "Telecommunications", price: 198.00, priceDate: "2026-02-21", currency: "NGN", change: 3.00, changePct: 1.54, volume: 3200000 },
        { securityId: "S005", ticker: "AIRTELAFRI", name: "Airtel Africa PLC", exchange: "NGX", assetClass: "Equity", sector: "Telecommunications", price: 1890.00, priceDate: "2026-02-21", currency: "NGN", change: -20.00, changePct: -1.05, volume: 450000 },
        { securityId: "S006", ticker: "BUACEMENT", name: "BUA Cement PLC", exchange: "NGX", assetClass: "Equity", sector: "Materials", price: 95.00, priceDate: "2026-02-21", currency: "NGN", change: 1.50, changePct: 1.60, volume: 2870000 },
        { securityId: "S007", ticker: "SEPLAT", name: "Seplat Energy PLC", exchange: "NGX", assetClass: "Equity", sector: "Energy", price: 4250.00, priceDate: "2026-02-21", currency: "NGN", change: 150.00, changePct: 3.66, volume: 185000 },
        { securityId: "S008", ticker: "ACCESSCORP", name: "Access Holdings PLC", exchange: "NGX", assetClass: "Equity", sector: "Financial Services", price: 21.80, priceDate: "2026-02-21", currency: "NGN", change: 0.30, changePct: 1.40, volume: 35200000 },
        { securityId: "S009", ticker: "UBA", name: "United Bank for Africa PLC", exchange: "NGX", assetClass: "Equity", sector: "Financial Services", price: 23.50, priceDate: "2026-02-21", currency: "NGN", change: -0.10, changePct: -0.42, volume: 28400000 },
        { securityId: "S010", ticker: "FBNH", name: "FBN Holdings PLC", exchange: "NGX", assetClass: "Equity", sector: "Financial Services", price: 25.90, priceDate: "2026-02-21", currency: "NGN", change: 0.40, changePct: 1.57, volume: 19600000 },
        { securityId: "S011", ticker: "FGN-APR-27", name: "FGN Bond April 2027", exchange: "FMDQ", assetClass: "Government Bond", sector: "Sovereign", couponRate: 13.98, maturityDate: "2027-04-23", price: 98.45, priceDate: "2026-02-21", currency: "NGN", yieldToMaturity: 14.52, duration: 1.17 },
        { securityId: "S012", ticker: "FGN-FEB-29", name: "FGN Bond February 2029", exchange: "FMDQ", assetClass: "Government Bond", sector: "Sovereign", couponRate: 14.55, maturityDate: "2029-02-14", price: 97.20, priceDate: "2026-02-21", currency: "NGN", yieldToMaturity: 15.18, duration: 2.75 },
        { securityId: "S013", ticker: "FGN-JUN-32", name: "FGN Bond June 2032", exchange: "FMDQ", assetClass: "Government Bond", sector: "Sovereign", couponRate: 16.25, maturityDate: "2032-06-18", price: 102.50, priceDate: "2026-02-21", currency: "NGN", yieldToMaturity: 15.89, duration: 5.12 },
        { securityId: "S014", ticker: "FGN-MAR-35", name: "FGN Bond March 2035", exchange: "FMDQ", assetClass: "Government Bond", sector: "Sovereign", couponRate: 17.00, maturityDate: "2035-03-26", price: 101.80, priceDate: "2026-02-21", currency: "NGN", yieldToMaturity: 16.72, duration: 7.44 },
        { securityId: "S015", ticker: "CBN-TB-91", name: "CBN T-Bill 91-Day", exchange: "CBN", assetClass: "T-Bill", sector: "Government", discountRate: 22.50, maturityDate: "2026-05-20", price: 94.36, priceDate: "2026-02-21", currency: "NGN" },
        { securityId: "S016", ticker: "CBN-TB-182", name: "CBN T-Bill 182-Day", exchange: "CBN", assetClass: "T-Bill", sector: "Government", discountRate: 23.10, maturityDate: "2026-08-20", price: 88.45, priceDate: "2026-02-21", currency: "NGN" },
        { securityId: "S017", ticker: "CBN-TB-364", name: "CBN T-Bill 364-Day", exchange: "CBN", assetClass: "T-Bill", sector: "Government", discountRate: 23.75, maturityDate: "2027-02-19", price: 76.25, priceDate: "2026-02-21", currency: "NGN" },
        { securityId: "S018", ticker: "DANGSUGAR-CP-26", name: "Dangote Sugar CP Jun 2026", exchange: "FMDQ", assetClass: "Commercial Paper", sector: "Consumer", discountRate: 24.50, maturityDate: "2026-06-30", price: 87.80, priceDate: "2026-02-21", currency: "NGN" },
    ]);
    console.log("  ✓ Securities (18)");

    // ── TRADES ──
    await Trade.insertMany([
        { tradeId: "TRD-2026-0248", portfolioId: "P001", clientId: "C001", securityId: "S001", ticker: "DANGCEM", side: "Buy", quantity: 50000, price: 510.00, grossValue: 25500000, brokerFee: 127500, settlementFee: 51000, netValue: 25678500, tradeDate: "2026-02-21", settlementDate: "2026-02-24", status: "Settled", broker: "Meristem Securities Ltd", trader: "Adaeze Okonkwo", approver: "Emeka Nwachukwu", fundId: "F001" },
        { tradeId: "TRD-2026-0247", portfolioId: "P002", clientId: "C001", securityId: "S011", ticker: "FGN-APR-27", side: "Buy", quantity: 500000000, price: 98.45, grossValue: 492250000, brokerFee: 246125, settlementFee: 0, netValue: 492496125, tradeDate: "2026-02-20", settlementDate: "2026-02-22", status: "Approved", broker: "Chapel Hill Denham", trader: "Emeka Nwachukwu", approver: null, fundId: "F002" },
        { tradeId: "TRD-2026-0246", portfolioId: "P003", clientId: "C002", securityId: "S002", ticker: "GTCO", side: "Sell", quantity: 200000, price: 48.50, grossValue: 9700000, brokerFee: 48500, settlementFee: 19400, netValue: 9632100, tradeDate: "2026-02-20", settlementDate: "2026-02-24", status: "Executed", broker: "CardinalStone Securities", trader: "Adaeze Okonkwo", approver: "Emeka Nwachukwu", fundId: "F001" },
        { tradeId: "TRD-2026-0245", portfolioId: "P005", clientId: "C003", securityId: "S015", ticker: "CBN-TB-91", side: "Buy", quantity: 1000000000, price: 94.36, grossValue: 943600000, brokerFee: 0, settlementFee: 0, netValue: 943600000, tradeDate: "2026-02-19", settlementDate: "2026-02-20", status: "Settled", broker: "Direct (CBN Primary Market)", trader: "Emeka Nwachukwu", approver: "Adaeze Okonkwo", fundId: "F003" },
        { tradeId: "TRD-2026-0244", portfolioId: "P003", clientId: "C002", securityId: "S003", ticker: "ZENITHBANK", side: "Buy", quantity: 300000, price: 37.20, grossValue: 11160000, brokerFee: 55800, settlementFee: 22320, netValue: 11238120, tradeDate: "2026-02-19", settlementDate: "2026-02-23", status: "Submitted", broker: "Stanbic IBTC Stockbrokers", trader: "Adaeze Okonkwo", approver: null, fundId: "F001" },
        { tradeId: "TRD-2026-0243", portfolioId: "P001", clientId: "C001", securityId: "S007", ticker: "SEPLAT", side: "Buy", quantity: 5000, price: 4250.00, grossValue: 21250000, brokerFee: 106250, settlementFee: 42500, netValue: 21398750, tradeDate: "2026-02-18", settlementDate: "2026-02-22", status: "Settled", broker: "Meristem Securities Ltd", trader: "Adaeze Okonkwo", approver: "Emeka Nwachukwu", fundId: "F001" },
        { tradeId: "TRD-2026-0242", portfolioId: "P002", clientId: "C001", securityId: "S013", ticker: "FGN-JUN-32", side: "Buy", quantity: 250000000, price: 102.50, grossValue: 256250000, brokerFee: 128125, settlementFee: 0, netValue: 256378125, tradeDate: "2026-02-18", settlementDate: "2026-02-20", status: "Failed", broker: "Chapel Hill Denham", trader: "Emeka Nwachukwu", approver: "Adaeze Okonkwo", failureReason: "CSCS settlement rejection — insufficient bond allocation", fundId: "F002" },
        { tradeId: "TRD-2026-0241", portfolioId: "P004", clientId: "C003", securityId: "S012", ticker: "FGN-FEB-29", side: "Buy", quantity: 300000000, price: 97.20, grossValue: 291600000, brokerFee: 145800, settlementFee: 0, netValue: 291745800, tradeDate: "2026-02-17", settlementDate: "2026-02-19", status: "Settled", broker: "ARM Securities Ltd", trader: "Emeka Nwachukwu", approver: "Adaeze Okonkwo", fundId: "F002" },
        { tradeId: "TRD-2026-0240", portfolioId: "P003", clientId: "C002", securityId: "S004", ticker: "MTNN", side: "Sell", quantity: 10000, price: 198.00, grossValue: 1980000, brokerFee: 9900, settlementFee: 3960, netValue: 1966140, tradeDate: "2026-02-17", settlementDate: "2026-02-21", status: "Settled", broker: "CardinalStone Securities", trader: "Adaeze Okonkwo", approver: "Emeka Nwachukwu", fundId: "F001" },
        { tradeId: "TRD-2026-0239", portfolioId: "P001", clientId: "C001", securityId: "S006", ticker: "BUACEMENT", side: "Buy", quantity: 100000, price: 95.00, grossValue: 9500000, brokerFee: 47500, settlementFee: 19000, netValue: 9566500, tradeDate: "2026-02-14", settlementDate: "2026-02-18", status: "Settled", broker: "Meristem Securities Ltd", trader: "Adaeze Okonkwo", approver: "Emeka Nwachukwu", fundId: "F001" },
    ]);
    console.log("  ✓ Trades (10)");

    // ── SETTLEMENTS ──
    await Settlement.insertMany([
        { settlementId: "SET-2026-0248", tradeId: "TRD-2026-0248", ticker: "DANGCEM", portfolioId: "P001", clientName: "ARM Pension Managers Ltd", side: "Buy", quantity: 50000, netValue: 25678500, settlementDate: "2026-02-24", status: "Settled", custodian: "CSCS", dvpStatus: "Matched", settledDate: "2026-02-24" },
        { settlementId: "SET-2026-0247", tradeId: "TRD-2026-0247", ticker: "FGN-APR-27", portfolioId: "P002", clientName: "ARM Pension Managers Ltd", side: "Buy", quantity: 500000000, netValue: 492496125, settlementDate: "2026-02-22", status: "Pending", custodian: "CSCS", dvpStatus: "Awaiting Match" },
        { settlementId: "SET-2026-0246", tradeId: "TRD-2026-0246", ticker: "GTCO", portfolioId: "P003", clientName: "Stanbic IBTC AM Ltd", side: "Sell", quantity: 200000, netValue: 9632100, settlementDate: "2026-02-24", status: "Pending", custodian: "CSCS", dvpStatus: "Awaiting Match" },
        { settlementId: "SET-2026-0242", tradeId: "TRD-2026-0242", ticker: "FGN-JUN-32", portfolioId: "P002", clientName: "ARM Pension Managers Ltd", side: "Buy", quantity: 250000000, netValue: 256378125, settlementDate: "2026-02-20", status: "Failed", custodian: "CSCS", dvpStatus: "Rejected", failureReason: "Insufficient bond allocation at CSCS" },
    ]);
    console.log("  ✓ Settlements (4)");

    // ── POSITIONS ──
    await Position.insertMany([
        { positionId: "POS001", portfolioId: "P001", securityId: "S001", ticker: "DANGCEM", quantity: 150000, avgCost: 485.50, currentPrice: 510.00, marketValue: 76500000, unrealisedPnL: 3675000, unrealisedPnLPct: 5.05, weight: 7.29 },
        { positionId: "POS002", portfolioId: "P001", securityId: "S004", ticker: "MTNN", quantity: 200000, avgCost: 188.00, currentPrice: 198.00, marketValue: 39600000, unrealisedPnL: 2000000, unrealisedPnLPct: 5.32, weight: 3.77 },
        { positionId: "POS003", portfolioId: "P001", securityId: "S007", ticker: "SEPLAT", quantity: 15000, avgCost: 4100.00, currentPrice: 4250.00, marketValue: 63750000, unrealisedPnL: 2250000, unrealisedPnLPct: 3.66, weight: 6.07 },
        { positionId: "POS004", portfolioId: "P001", securityId: "S002", ticker: "GTCO", quantity: 500000, avgCost: 44.20, currentPrice: 48.50, marketValue: 24250000, unrealisedPnL: 2150000, unrealisedPnLPct: 9.73, weight: 2.31 },
        { positionId: "POS005", portfolioId: "P002", securityId: "S011", ticker: "FGN-APR-27", faceValue: 1500000000, avgCost: 97.80, currentPrice: 98.45, marketValue: 1476750000, unrealisedPnL: 9750000, unrealisedPnLPct: 0.67, weight: 19.18 },
        { positionId: "POS006", portfolioId: "P002", securityId: "S012", ticker: "FGN-FEB-29", faceValue: 2000000000, avgCost: 96.40, currentPrice: 97.20, marketValue: 1944000000, unrealisedPnL: 16000000, unrealisedPnLPct: 0.83, weight: 25.25 },
        { positionId: "POS007", portfolioId: "P005", securityId: "S015", ticker: "CBN-TB-91", faceValue: 3000000000, avgCost: 94.36, currentPrice: 94.36, marketValue: 2830800000, unrealisedPnL: 0, unrealisedPnLPct: 0, weight: 65.83 },
    ]);
    console.log("  ✓ Positions (7)");

    // ── RECONCILIATION BREAKS ──
    await ReconciliationBreak.insertMany([
        { breakId: "RCN-2026-0041", date: "2026-02-21", portfolioId: "P002", type: "Position Break", security: "FGN-FEB-29", internalQty: 2000000000, custodianQty: 1950000000, difference: 50000000, breakType: "Quantity", status: "Open", assignedTo: "Ngozi Eze", ageDays: 2, priority: "High" },
        { breakId: "RCN-2026-0040", date: "2026-02-21", portfolioId: "P003", type: "Cash Break", security: "Cash — NGN", internalAmt: 85240000, custodianAmt: 85000000, difference: 240000, breakType: "Cash", status: "Under Investigation", assignedTo: "Ngozi Eze", ageDays: 1, priority: "Medium" },
        { breakId: "RCN-2026-0039", date: "2026-02-20", portfolioId: "P001", type: "Price Break", security: "DANGCEM", internalPrice: 510.00, custodianPrice: 508.50, difference: 1.50, breakType: "Price", status: "Open", assignedTo: "Babatunde Adeyemi", ageDays: 3, priority: "Low" },
        { breakId: "RCN-2026-0038", date: "2026-02-19", portfolioId: "P001", type: "Position Break", security: "SEPLAT", internalQty: 15000, custodianQty: 15000, difference: 0, breakType: "Timing", status: "Resolved", assignedTo: "Ngozi Eze", ageDays: 0, priority: "Low" },
    ]);
    console.log("  ✓ Reconciliation Breaks (4)");

    // ── COMPLIANCE EVENTS ──
    await ComplianceEvent.insertMany([
        { eventId: "CMP-2026-0018", date: "2026-02-21", portfolioId: "P001", type: "Pre-Trade Breach", ticker: "DANGCEM", rule: "Issuer Concentration Limit", limit: 10.00, actual: 11.20, severity: "High", status: "Escalated", raisedBy: "System", assignedTo: "Fatima Abubakar" },
        { eventId: "CMP-2026-0017", date: "2026-02-20", portfolioId: "P003", type: "Post-Trade Breach", ticker: "GTCO", rule: "Sector Concentration — Financial Services", limit: 40.00, actual: 42.30, severity: "Medium", status: "Under Review", raisedBy: "System", assignedTo: "Fatima Abubakar" },
        { eventId: "CMP-2026-0016", date: "2026-02-18", type: "AML Alert", clientId: "C007", clientName: "Alhaji Musa Dangiwa", rule: "Large Redemption — Threshold Exceeded", transactionAmt: 125000000, threshold: 100000000, severity: "High", status: "Reported to NFIU", raisedBy: "System", assignedTo: "Fatima Abubakar" },
        { eventId: "CMP-2026-0015", date: "2026-02-15", type: "Regulatory Deadline", rule: "SEC Q4 2025 Returns", dueDate: "2026-02-28", status: "In Progress", severity: "High", raisedBy: "System", assignedTo: "Fatima Abubakar" },
    ]);
    console.log("  ✓ Compliance Events (4)");

    // ── REGULATORY SUBMISSIONS ──
    await RegulatorySubmission.insertMany([
        { submissionId: "REG-2026-001", name: "SEC Quarterly Return — Q4 2025", regulator: "SEC Nigeria", dueDate: "2026-02-28", status: "In Progress", preparedBy: "Fatima Abubakar", period: "Q4 2025", type: "Quarterly Return" },
        { submissionId: "REG-2025-004", name: "SEC Quarterly Return — Q3 2025", regulator: "SEC Nigeria", dueDate: "2025-11-30", submittedDate: "2025-11-28", status: "Submitted", preparedBy: "Fatima Abubakar", period: "Q3 2025", type: "Quarterly Return" },
        { submissionId: "REG-2025-AML-02", name: "NFIU AML/CFT Report — H2 2025", regulator: "NFIU", dueDate: "2026-01-31", submittedDate: "2026-01-29", status: "Submitted", preparedBy: "Fatima Abubakar", period: "H2 2025", type: "AML/CFT Report" },
        { submissionId: "REG-2026-NDPR", name: "NDPR Compliance Log — 2025 Annual", regulator: "NITDA", dueDate: "2026-03-31", status: "Not Started", period: "FY 2025", type: "NDPR Compliance" },
    ]);
    console.log("  ✓ Regulatory Submissions (4)");

    // ── FEE RECORDS ──
    await FeeRecord.insertMany([
        { feeId: "FEE-2026-0021", fundId: "F001", fundName: "ValuAlliance Growth Fund", clientId: "C001", clientName: "ARM Pension Managers Ltd", feeType: "Management Fee", period: "January 2026", aum: 10500000000, rate: 1.5, annualFee: 157500000, monthlyFee: 13125000, accrued: 13125000, invoiceDate: "2026-02-01", status: "Invoiced", invoiceNo: "INV-2026-0021" },
        { feeId: "FEE-2026-0020", fundId: "F001", fundName: "ValuAlliance Growth Fund", clientId: "C002", clientName: "Stanbic IBTC AM Ltd", feeType: "Management Fee", period: "January 2026", aum: 22400000000, rate: 1.5, annualFee: 336000000, monthlyFee: 28000000, accrued: 28000000, invoiceDate: "2026-02-01", status: "Paid", invoiceNo: "INV-2026-0020" },
        { feeId: "FEE-2026-0019", fundId: "F001", fundName: "ValuAlliance Growth Fund", clientId: "C001", clientName: "ARM Pension Managers Ltd", feeType: "Performance Fee", period: "Q4 2025", aum: 10500000000, rate: 20, hurdle: 15.00, actualReturn: 31.85, feeAmount: 35175000, accrued: 35175000, invoiceDate: "2026-01-15", status: "Paid", invoiceNo: "INV-2026-0019" },
    ]);
    console.log("  ✓ Fee Records (3)");

    // ── REMAINING SEEDS (Audit, Notifications, Documents, Corporate Actions, Journal Entries, Trial Balance, Performance, AUM Trend, NAV History, Recon Summary) ──
    await AuditLog.insertMany([
        { logId: "AUD-2026-18402", timestamp: "2026-02-23 09:15:42", userId: "U003", userName: "Fatima Abubakar", role: "Compliance Officer", ipAddress: "10.0.2.45", module: "Risk & Compliance", action: "Compliance Alert Escalated", entity: "TRD-2026-0248", before: "Status: Open", after: "Status: Escalated", outcome: "Success" },
        { logId: "AUD-2026-18401", timestamp: "2026-02-23 08:42:10", userId: "U001", userName: "Adaeze Okonkwo", role: "Portfolio Manager", ipAddress: "10.0.2.31", module: "Trade Capture", action: "Trade Submitted", entity: "TRD-2026-0248", before: "Status: Draft", after: "Status: Submitted", outcome: "Success" },
        { logId: "AUD-2026-18400", timestamp: "2026-02-23 08:30:55", userId: "U002", userName: "Emeka Nwachukwu", role: "Chief Investment Officer", ipAddress: "10.0.2.28", module: "Trade Capture", action: "Trade Approved", entity: "TRD-2026-0248", before: "Status: Submitted", after: "Status: Approved", outcome: "Success" },
        { logId: "AUD-2026-18399", timestamp: "2026-02-23 08:15:30", userId: "U005", userName: "Ngozi Eze", role: "Operations Manager", ipAddress: "10.0.2.52", module: "Reconciliation", action: "Break Assigned", entity: "RCN-2026-0041", before: "Assigned: Unassigned", after: "Assigned: Ngozi Eze", outcome: "Success" },
        { logId: "AUD-2026-18398", timestamp: "2026-02-22 17:45:12", userId: "U001", userName: "Adaeze Okonkwo", role: "Portfolio Manager", ipAddress: "10.0.2.31", module: "Valuation", action: "NAV Approved for Publication", entity: "F001 — 2026-02-21", before: "Status: Pending Approval", after: "Status: Published", outcome: "Success" },
    ]);
    console.log("  ✓ Audit Logs (5)");

    await Notification.insertMany([
        { notificationId: "N001", timestamp: "2026-02-23 09:15", type: "Compliance Alert", title: "Pre-Trade Breach: DANGCEM Concentration Limit", message: "Portfolio P001 (ARM Equity) breached issuer concentration limit at 11.20% vs 10.00% limit.", severity: "High", read: false, link: "/risk-compliance" },
        { notificationId: "N002", timestamp: "2026-02-23 08:42", type: "Settlement", title: "Trade Settled: TRD-2026-0248 (DANGCEM Buy)", message: "50,000 units DANGCEM settled successfully via CSCS. Net value: ₦25,678,500.", severity: "Info", read: false, link: "/settlement" },
        { notificationId: "N003", timestamp: "2026-02-23 08:30", type: "Reconciliation", title: "Position Break: FGN-FEB-29 (₦50M difference)", message: "Reconciliation break identified for FGN-FEB-29 in Portfolio P002.", severity: "High", read: false, link: "/reconciliation" },
        { notificationId: "N004", timestamp: "2026-02-22 16:10", type: "Regulatory", title: "Regulatory Deadline Reminder: SEC Q4 2025 Return", message: "SEC Q4 2025 Quarterly Return is due on 28 February 2026 (5 days remaining).", severity: "High", read: true, link: "/regulatory-returns" },
        { notificationId: "N005", timestamp: "2026-02-22 14:25", type: "Trade", title: "Trade Approval Required: TRD-2026-0244", message: "Trade TRD-2026-0244 awaiting approval. Buy 300,000 ZENITHBANK @ ₦37.20.", severity: "Medium", read: true, link: "/trades" },
        { notificationId: "N006", timestamp: "2026-02-21 17:00", type: "Trade", title: "Trade Failed: TRD-2026-0242 (FGN-JUN-32)", message: "Settlement failed for TRD-2026-0242. Reason: CSCS rejection.", severity: "High", read: true, link: "/trades" },
    ]);
    console.log("  ✓ Notifications (6)");

    await DocumentRecord.insertMany([
        { documentId: "DOC-001", name: "ARM Pensions — Investment Management Agreement", type: "Mandate", clientId: "C001", clientName: "ARM Pension Managers Ltd", uploadedBy: "Aisha Mohammed", uploadedDate: "2024-01-10", version: "v3.1", fileSize: "2.4 MB", format: "PDF", status: "Active" },
        { documentId: "DOC-002", name: "ValuAlliance Growth Fund — Q4 2025 Client Statement", type: "Client Statement", clientId: "C001", uploadedBy: "Babatunde Adeyemi", uploadedDate: "2026-01-15", version: "v1.0", fileSize: "1.1 MB", format: "PDF", status: "Distributed" },
        { documentId: "DOC-003", name: "SEC Q3 2025 Quarterly Return — Submission Receipt", type: "Regulatory Filing", regulator: "SEC Nigeria", uploadedBy: "Fatima Abubakar", uploadedDate: "2025-11-28", version: "v1.0", fileSize: "845 KB", format: "PDF", status: "Archived" },
        { documentId: "DOC-004", name: "DANGCEM — Trade Confirmation TRD-2026-0248", type: "Trade Confirmation", tradeId: "TRD-2026-0248", uploadedBy: "System", uploadedDate: "2026-02-21", version: "v1.0", fileSize: "220 KB", format: "PDF", status: "Active" },
    ]);
    console.log("  ✓ Documents (4)");

    await CorporateAction.insertMany([
        { actionId: "CA-2026-007", ticker: "DANGCEM", securityId: "S001", type: "Final Dividend", exDate: "2026-02-28", payDate: "2026-03-14", amount: 20.00, currency: "NGN", perUnit: "₦20.00 per share", status: "Upcoming", affectedPortfolios: ["P001", "P003"] },
        { actionId: "CA-2026-006", ticker: "GTCO", securityId: "S002", type: "Interim Dividend", exDate: "2026-02-10", payDate: "2026-02-20", amount: 3.00, currency: "NGN", perUnit: "₦3.00 per share", status: "Processed", affectedPortfolios: ["P003"] },
        { actionId: "CA-2026-005", ticker: "MTNN", securityId: "S004", type: "Bonus Issue", exDate: "2026-01-20", payDate: "2026-01-20", currency: "NGN", ratio: "1 for 10", status: "Processed", affectedPortfolios: ["P001", "P003"] },
        { actionId: "CA-2026-004", ticker: "FGN-APR-27", securityId: "S011", type: "Coupon Payment", couponDate: "2026-04-23", payDate: "2026-04-23", rate: 13.98, currency: "NGN", status: "Upcoming", affectedPortfolios: ["P002"] },
    ]);
    console.log("  ✓ Corporate Actions (4)");

    await JournalEntry.insertMany([
        { entryId: "JE-2026-0501", date: "2026-02-21", fund: "Growth Fund", description: "Trade Settlement — DANGCEM Buy 50,000 units", drAccount: "Securities at Cost", crAccount: "Cash — NGN", amount: 25678500, sourceModule: "Trade Capture", postedBy: "System" },
        { entryId: "JE-2026-0500", date: "2026-02-21", fund: "Growth Fund", description: "Broker Fee — TRD-2026-0248", drAccount: "Brokerage Expense", crAccount: "Cash — NGN", amount: 127500, sourceModule: "Trade Capture", postedBy: "System" },
        { entryId: "JE-2026-0499", date: "2026-02-21", fund: "Growth Fund", description: "Management Fee Accrual — February 2026", drAccount: "Management Fee Expense", crAccount: "Fee Payable — Management", amount: 1350000, sourceModule: "Fee Calculation", postedBy: "System" },
        { entryId: "JE-2026-0498", date: "2026-02-20", fund: "Fixed Income Fund", description: "Bond Coupon Income — FGN-APR-27", drAccount: "Cash — NGN", crAccount: "Interest Income", amount: 20970000, sourceModule: "Corporate Actions", postedBy: "System" },
        { entryId: "JE-2026-0497", date: "2026-02-20", fund: "Growth Fund", description: "Dividend Income — GTCO Interim Div", drAccount: "Cash — NGN", crAccount: "Dividend Income", amount: 600000, sourceModule: "Corporate Actions", postedBy: "System" },
    ]);
    console.log("  ✓ Journal Entries (5)");

    await TrialBalanceEntry.insertMany([
        { account: "Cash — NGN", group: "Assets", debit: 4250000000, credit: 0 },
        { account: "Securities at Cost — Equities", group: "Assets", debit: 22800000000, credit: 0 },
        { account: "Government Bonds at Cost", group: "Assets", debit: 18500000000, credit: 0 },
        { account: "Short-Term Investments (T-Bills)", group: "Assets", debit: 8200000000, credit: 0 },
        { account: "Fee Payable — Management", group: "Liabilities", debit: 0, credit: 486250000 },
        { account: "Unitholders Capital", group: "Liabilities", debit: 0, credit: 48500000000 },
        { account: "Management Fee Income", group: "Income", debit: 0, credit: 486250000 },
        { account: "Interest Income", group: "Income", debit: 0, credit: 625000000 },
        { account: "Brokerage Expense", group: "Expenses", debit: 42500000, credit: 0 },
    ]);
    console.log("  ✓ Trial Balance (9)");

    await PerformanceRecord.insertMany([
        { portfolioId: "P001", portfolioName: "ARM Pensions — Equity", benchmark: "NSE All-Share Index", returns: { mtd: { portfolio: 4.82, benchmark: 3.94 }, qtd: { portfolio: 8.40, benchmark: 7.10 }, ytd: { portfolio: 19.20, benchmark: 15.70 }, oneYear: { portfolio: 31.85, benchmark: 26.40 }, threeYear: { portfolio: 18.25, benchmark: 14.80 } }, attribution: { allocation: 2.10, selection: 3.25, interaction: 0.30 } },
        { portfolioId: "P002", portfolioName: "ARM Pensions — Fixed Income", benchmark: "FMDQ Bond Index", returns: { mtd: { portfolio: 1.20, benchmark: 1.05 }, qtd: { portfolio: 3.60, benchmark: 3.10 }, ytd: { portfolio: 5.10, benchmark: 4.30 }, oneYear: { portfolio: 14.93, benchmark: 13.20 }, threeYear: { portfolio: 12.40, benchmark: 11.10 } }, attribution: { allocation: 0.50, selection: 1.13, interaction: 0.00 } },
    ]);
    console.log("  ✓ Performance Records (2)");

    await AumTrend.insertMany([
        { month: "Aug 25", aum: 71200000000, inflow: 2100000000, outflow: 800000000 },
        { month: "Sep 25", aum: 74500000000, inflow: 3800000000, outflow: 500000000 },
        { month: "Oct 25", aum: 76800000000, inflow: 2900000000, outflow: 600000000 },
        { month: "Nov 25", aum: 79200000000, inflow: 3100000000, outflow: 700000000 },
        { month: "Dec 25", aum: 77400000000, inflow: 1200000000, outflow: 3000000000 },
        { month: "Jan 26", aum: 82100000000, inflow: 5800000000, outflow: 1100000000 },
        { month: "Feb 26", aum: 85400000000, inflow: 4200000000, outflow: 900000000 },
    ]);
    console.log("  ✓ AUM Trend (7)");

    await NavHistory.insertMany([
        { fundId: "F001", date: "2025-08-31", nav: 98.42, aum: 26800000000 },
        { fundId: "F001", date: "2025-09-30", nav: 103.15, aum: 27500000000 },
        { fundId: "F001", date: "2025-10-31", nav: 108.72, aum: 28900000000 },
        { fundId: "F001", date: "2026-02-21", nav: 125.48, aum: 32400000000 },
        { fundId: "F002", date: "2025-08-31", nav: 101.20, aum: 25100000000 },
        { fundId: "F002", date: "2025-09-30", nav: 102.45, aum: 25800000000 },
        { fundId: "F002", date: "2026-02-21", nav: 108.74, aum: 28700000000 },
    ]);
    console.log("  ✓ NAV History (7)");

    await ReconSummary.insertMany([
        { date: "17 Feb", matched: 46, open: 4, resolved: 2 },
        { date: "18 Feb", matched: 47, open: 3, resolved: 1 },
        { date: "19 Feb", matched: 45, open: 5, resolved: 3 },
        { date: "20 Feb", matched: 48, open: 2, resolved: 2 },
        { date: "21 Feb", matched: 44, open: 4, resolved: 1 },
        { date: "22 Feb", matched: 46, open: 3, resolved: 2 },
        { date: "23 Feb", matched: 45, open: 3, resolved: 1 },
    ]);
    console.log("  ✓ Recon Summary (7)");

    console.log("\n✅ Database seeded successfully — 20 collections populated");
    process.exit(0);
}

seed().catch((err) => {
    console.error("❌ Seed error:", err);
    process.exit(1);
});
