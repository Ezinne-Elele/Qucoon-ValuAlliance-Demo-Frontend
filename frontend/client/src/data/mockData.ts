// ============================================================
// VALUALLIANCE MOCK DATA SOURCE — COMPLETE
// ============================================================

export const mockUsers = [
  { id: "U001", name: "Adaeze Okonkwo", email: "adaeze.okonkwo@valualliance.com.ng", role: "Portfolio Manager", department: "Investments", status: "Active", lastLogin: "2026-02-23 08:42", mfaEnabled: true, initials: "AO" },
  { id: "U002", name: "Emeka Nwachukwu", email: "emeka.nwachukwu@valualliance.com.ng", role: "Chief Investment Officer", department: "Investments", status: "Active", lastLogin: "2026-02-23 07:55", mfaEnabled: true, initials: "EN" },
  { id: "U003", name: "Fatima Abubakar", email: "fatima.abubakar@valualliance.com.ng", role: "Compliance Officer", department: "Compliance", status: "Active", lastLogin: "2026-02-22 16:30", mfaEnabled: true, initials: "FA" },
  { id: "U004", name: "Babatunde Adeyemi", email: "b.adeyemi@valualliance.com.ng", role: "Fund Accountant", department: "Finance", status: "Active", lastLogin: "2026-02-23 09:10", mfaEnabled: true, initials: "BA" },
  { id: "U005", name: "Ngozi Eze", email: "ngozi.eze@valualliance.com.ng", role: "Operations Manager", department: "Operations", status: "Active", lastLogin: "2026-02-23 08:15", mfaEnabled: true, initials: "NE" },
  { id: "U006", name: "Chukwuemeka Obi", email: "c.obi@valualliance.com.ng", role: "Risk Analyst", department: "Risk", status: "Active", lastLogin: "2026-02-21 14:20", mfaEnabled: false, initials: "CO" },
  { id: "U007", name: "Aisha Mohammed", email: "a.mohammed@valualliance.com.ng", role: "Client Relationship Manager", department: "Business Dev", status: "Active", lastLogin: "2026-02-23 10:05", mfaEnabled: true, initials: "AM" },
  { id: "U008", name: "Oluwaseun Adegoke", email: "s.adegoke@valualliance.com.ng", role: "System Administrator", department: "IT", status: "Active", lastLogin: "2026-02-23 07:00", mfaEnabled: true, initials: "OA" },
];

export const mockClients = [
  { id: "C001", name: "ARM Pension Managers Ltd", type: "Institutional", category: "Pension Fund Administrator", aum: 18200000000, relationship: "Active", riskRating: "Low", kyc: "Verified", contactPerson: "Tunde Olanrewaju", email: "tolanrewaju@arm.com.ng", phone: "+234 1 462 3400", city: "Lagos", state: "Lagos", portfolios: ["P001", "P002"], onboardedDate: "2019-03-15" },
  { id: "C002", name: "Stanbic IBTC Asset Management Ltd", type: "Institutional", category: "Asset Manager", aum: 22400000000, relationship: "Active", riskRating: "Low", kyc: "Verified", contactPerson: "Chinwe Okoro", email: "c.okoro@stanbicibtc.com", phone: "+234 1 422 3003", city: "Lagos", state: "Lagos", portfolios: ["P003"], onboardedDate: "2018-07-22" },
  { id: "C003", name: "NLPC Pension Fund Administrators", type: "Institutional", category: "Pension Fund Administrator", aum: 12500000000, relationship: "Active", riskRating: "Low", kyc: "Verified", contactPerson: "Dr Emeka Eze", email: "emeka.eze@nlpcpension.com.ng", phone: "+234 1 280 0500", city: "Abuja", state: "FCT", portfolios: ["P004", "P005"], onboardedDate: "2020-01-10" },
  { id: "C004", name: "Zenith Life Assurance Ltd", type: "Institutional", category: "Insurance", aum: 9800000000, relationship: "Active", riskRating: "Low-Medium", kyc: "Verified", contactPerson: "Mrs Bola Adenike", email: "b.adenike@zenithlife.com.ng", phone: "+234 1 292 5800", city: "Lagos", state: "Lagos", portfolios: ["P006"], onboardedDate: "2021-04-05" },
  { id: "C005", name: "FBNQuest Trustees Ltd", type: "Institutional", category: "Trust & Fiduciary", aum: 8900000000, relationship: "Active", riskRating: "Low", kyc: "Verified", contactPerson: "Chidi Anyanwu", email: "canyanwu@fbnquest.com", phone: "+234 1 285 9800", city: "Lagos", state: "Lagos", portfolios: ["P007"], onboardedDate: "2019-11-20" },
  { id: "C006", name: "Coronation Asset Management Ltd", type: "Institutional", category: "Asset Manager", aum: 5300000000, relationship: "Active", riskRating: "Low-Medium", kyc: "Verified", contactPerson: "Kemi Lawal", email: "k.lawal@coronationam.com", phone: "+234 1 631 4000", city: "Lagos", state: "Lagos", portfolios: ["P008"], onboardedDate: "2022-06-01" },
  { id: "C007", name: "Alhaji Musa Dangiwa", type: "Individual", category: "High Net Worth Individual", aum: 850000000, relationship: "Active", riskRating: "Medium", kyc: "Verified", contactPerson: "Alhaji Musa Dangiwa", email: "m.dangiwa@privatemail.com", phone: "+234 803 456 7890", city: "Kano", state: "Kano", portfolios: ["P009"], onboardedDate: "2021-09-14" },
  { id: "C008", name: "Dr. Ngozi Iweala-Obi", type: "Individual", category: "High Net Worth Individual", aum: 1200000000, relationship: "Active", riskRating: "Low-Medium", kyc: "Verified", contactPerson: "Dr. Ngozi Iweala-Obi", email: "n.ob@privatemail.com", phone: "+234 805 234 5678", city: "Lagos", state: "Lagos", portfolios: ["P010"], onboardedDate: "2020-03-28" },
  { id: "C009", name: "Channels Media Group Pension", type: "Corporate", category: "Corporate Pension", aum: 2100000000, relationship: "Active", riskRating: "Medium", kyc: "Verified", contactPerson: "Biodun Oladele", email: "b.oladele@channelstv.com", phone: "+234 1 261 0905", city: "Lagos", state: "Lagos", portfolios: ["P011"], onboardedDate: "2023-02-15" },
  { id: "C010", name: "Heritage Bank Retirees Fund", type: "Institutional", category: "Defined Benefit Fund", aum: 4150000000, relationship: "Active", riskRating: "Low", kyc: "Verified", contactPerson: "Amaka Ofoegbu", email: "a.ofoegbu@heritagefund.ng", phone: "+234 1 279 4000", city: "Lagos", state: "Lagos", portfolios: ["P012"], onboardedDate: "2020-08-30" },
];

export const mockPortfolios = [
  { id: "P001", name: "ARM Pensions — Equity Mandate", clientId: "C001", fundId: "F001", currency: "NGN", aum: 10500000000, benchmark: "NSE All-Share Index", status: "Active", assetClass: "Equity", ytdReturn: 19.2, inceptionDate: "2019-03-15", manager: "Adaeze Okonkwo", allocation: { equities: 75, fixedIncome: 15, moneyMarket: 8, cash: 2 } },
  { id: "P002", name: "ARM Pensions — Fixed Income Mandate", clientId: "C001", fundId: "F002", currency: "NGN", aum: 7700000000, benchmark: "FMDQ Bond Index", status: "Active", assetClass: "Fixed Income", ytdReturn: 5.1, inceptionDate: "2019-06-01", manager: "Emeka Nwachukwu", allocation: { equities: 0, fixedIncome: 82, moneyMarket: 12, cash: 6 } },
  { id: "P003", name: "Stanbic — Growth Portfolio", clientId: "C002", fundId: "F001", currency: "NGN", aum: 22400000000, benchmark: "NSE All-Share Index", status: "Active", assetClass: "Mixed", ytdReturn: 17.8, inceptionDate: "2018-07-22", manager: "Adaeze Okonkwo", allocation: { equities: 65, fixedIncome: 25, moneyMarket: 7, cash: 3 } },
  { id: "P004", name: "NLPC — Conservative Mandate", clientId: "C003", fundId: "F002", currency: "NGN", aum: 8200000000, benchmark: "FMDQ Bond Index", status: "Active", assetClass: "Fixed Income", ytdReturn: 4.6, inceptionDate: "2020-01-10", manager: "Emeka Nwachukwu", allocation: { equities: 5, fixedIncome: 80, moneyMarket: 12, cash: 3 } },
  { id: "P005", name: "NLPC — Money Market Mandate", clientId: "C003", fundId: "F003", currency: "NGN", aum: 4300000000, benchmark: "CBN Overnight Rate", status: "Active", assetClass: "Money Market", ytdReturn: 2.9, inceptionDate: "2021-03-01", manager: "Adaeze Okonkwo", allocation: { equities: 0, fixedIncome: 0, moneyMarket: 95, cash: 5 } },
];

export const mockFunds = [
  { id: "F001", name: "ValuAlliance Growth Fund", type: "Equity", currency: "NGN", nav: 125.48, navDate: "2026-02-21", aum: 32400000000, units: 258250000, totalUnitsOutstanding: 680512345.67, totalUnitsOutstandingAsOf: "2026-02-21T16:00:00Z", benchmark: "NSE All-Share Index", inceptionDate: "2015-01-05", ytdReturn: 18.42, oneYearReturn: 31.85, managementFee: 1.5, performanceFee: 20, status: "Active" },
  { id: "F002", name: "ValuAlliance Fixed Income Fund", type: "Fixed Income", currency: "NGN", nav: 108.74, navDate: "2026-02-21", aum: 28700000000, units: 263940000, totalUnitsOutstanding: 263940000.00, totalUnitsOutstandingAsOf: "2026-02-21T16:00:00Z", benchmark: "FMDQ Bond Index", inceptionDate: "2016-06-12", ytdReturn: 4.82, oneYearReturn: 14.93, managementFee: 1.0, performanceFee: 0, status: "Active" },
  { id: "F003", name: "ValuAlliance Money Market Fund", type: "Money Market", currency: "NGN", nav: 100.00, navDate: "2026-02-21", aum: 14600000000, units: 146000000, totalUnitsOutstanding: 146000000.00, totalUnitsOutstandingAsOf: "2026-02-21T16:00:00Z", benchmark: "CBN Overnight Rate", inceptionDate: "2017-03-20", ytdReturn: 2.85, oneYearReturn: 22.40, managementFee: 0.5, performanceFee: 0, status: "Active" },
  { id: "F004", name: "ValuAlliance Balanced Fund", type: "Balanced", currency: "NGN", nav: 115.22, navDate: "2026-02-21", aum: 9700000000, units: 84190000, totalUnitsOutstanding: 84190000.00, totalUnitsOutstandingAsOf: "2026-02-21T16:00:00Z", benchmark: "Composite (60% NSE / 40% FMDQ)", inceptionDate: "2018-10-01", ytdReturn: 11.64, oneYearReturn: 24.18, managementFee: 1.25, performanceFee: 15, status: "Active" },
];

export const mockUnitHistory: Record<string, any[]> = {
  F001: [
    { date: "2026-02-21", type: "Subscription", units: 1540250.25, netChange: 1540250.25, newTotal: 680512345.67, approvedBy: "Emeka Nwachukwu" },
    { date: "2026-02-20", type: "Redemption", units: 420500.00, netChange: -420500.00, newTotal: 678972095.42, approvedBy: "Adaeze Okonkwo" },
    { date: "2026-02-19", type: "Subscription", units: 850000.00, netChange: 850000.00, newTotal: 679392595.42, approvedBy: "Emeka Nwachukwu" },
  ]
};

export const mockSecurities: any[] = [
  { id: "S001", ticker: "DANGCEM", name: "Dangote Cement PLC", exchange: "NGX", assetClass: "Equity", sector: "Materials", price: 510.00, priceDate: "2026-02-21", currency: "NGN", change: 12.50, changePct: 2.51, volume: 4820000 },
  { id: "S002", ticker: "GTCO", name: "Guaranty Trust Holding Co. PLC", exchange: "NGX", assetClass: "Equity", sector: "Financial Services", price: 48.50, priceDate: "2026-02-21", currency: "NGN", change: -0.30, changePct: -0.61, volume: 18350000 },
  { id: "S003", ticker: "ZENITHBANK", name: "Zenith Bank PLC", exchange: "NGX", assetClass: "Equity", sector: "Financial Services", price: 37.20, priceDate: "2026-02-21", currency: "NGN", change: 0.70, changePct: 1.92, volume: 22100000 },
  { id: "S004", ticker: "MTNN", name: "MTN Nigeria Communications PLC", exchange: "NGX", assetClass: "Equity", sector: "Telecommunications", price: 198.00, priceDate: "2026-02-21", currency: "NGN", change: 3.00, changePct: 1.54, volume: 3200000 },
  { id: "S005", ticker: "AIRTELAFRI", name: "Airtel Africa PLC", exchange: "NGX", assetClass: "Equity", sector: "Telecommunications", price: 1890.00, priceDate: "2026-02-21", currency: "NGN", change: -20.00, changePct: -1.05, volume: 450000 },
  { id: "S006", ticker: "BUACEMENT", name: "BUA Cement PLC", exchange: "NGX", assetClass: "Equity", sector: "Materials", price: 95.00, priceDate: "2026-02-21", currency: "NGN", change: 1.50, changePct: 1.60, volume: 2870000 },
  { id: "S007", ticker: "SEPLAT", name: "Seplat Energy PLC", exchange: "NGX", assetClass: "Equity", sector: "Energy", price: 4250.00, priceDate: "2026-02-21", currency: "NGN", change: 150.00, changePct: 3.66, volume: 185000 },
  { id: "S008", ticker: "ACCESSCORP", name: "Access Holdings PLC", exchange: "NGX", assetClass: "Equity", sector: "Financial Services", price: 21.80, priceDate: "2026-02-21", currency: "NGN", change: 0.30, changePct: 1.40, volume: 35200000 },
  { id: "S009", ticker: "UBA", name: "United Bank for Africa PLC", exchange: "NGX", assetClass: "Equity", sector: "Financial Services", price: 23.50, priceDate: "2026-02-21", currency: "NGN", change: -0.10, changePct: -0.42, volume: 28400000 },
  { id: "S010", ticker: "FBNH", name: "FBN Holdings PLC", exchange: "NGX", assetClass: "Equity", sector: "Financial Services", price: 25.90, priceDate: "2026-02-21", currency: "NGN", change: 0.40, changePct: 1.57, volume: 19600000 },
  { id: "S011", ticker: "FGN-APR-27", name: "FGN Bond April 2027", exchange: "FMDQ", assetClass: "Government Bond", sector: "Sovereign", couponRate: 13.98, maturityDate: "2027-04-23", price: 98.45, priceDate: "2026-02-21", currency: "NGN", yieldToMaturity: 14.52, duration: 1.17 },
  { id: "S012", ticker: "FGN-FEB-29", name: "FGN Bond February 2029", exchange: "FMDQ", assetClass: "Government Bond", sector: "Sovereign", couponRate: 14.55, maturityDate: "2029-02-14", price: 97.20, priceDate: "2026-02-21", currency: "NGN", yieldToMaturity: 15.18, duration: 2.75 },
  { id: "S013", ticker: "FGN-JUN-32", name: "FGN Bond June 2032", exchange: "FMDQ", assetClass: "Government Bond", sector: "Sovereign", couponRate: 16.25, maturityDate: "2032-06-18", price: 102.50, priceDate: "2026-02-21", currency: "NGN", yieldToMaturity: 15.89, duration: 5.12 },
  { id: "S014", ticker: "FGN-MAR-35", name: "FGN Bond March 2035", exchange: "FMDQ", assetClass: "Government Bond", sector: "Sovereign", couponRate: 17.00, maturityDate: "2035-03-26", price: 101.80, priceDate: "2026-02-21", currency: "NGN", yieldToMaturity: 16.72, duration: 7.44 },
  { id: "S015", ticker: "CBN-TB-91", name: "CBN T-Bill 91-Day", exchange: "CBN", assetClass: "T-Bill", sector: "Government", discountRate: 22.50, maturityDate: "2026-05-20", price: 94.36, priceDate: "2026-02-21", currency: "NGN" },
  { id: "S016", ticker: "CBN-TB-182", name: "CBN T-Bill 182-Day", exchange: "CBN", assetClass: "T-Bill", sector: "Government", discountRate: 23.10, maturityDate: "2026-08-20", price: 88.45, priceDate: "2026-02-21", currency: "NGN" },
  { id: "S017", ticker: "CBN-TB-364", name: "CBN T-Bill 364-Day", exchange: "CBN", assetClass: "T-Bill", sector: "Government", discountRate: 23.75, maturityDate: "2027-02-19", price: 76.25, priceDate: "2026-02-21", currency: "NGN" },
  { id: "S018", ticker: "DANGSUGAR-CP-26", name: "Dangote Sugar CP Jun 2026", exchange: "FMDQ", assetClass: "Commercial Paper", sector: "Consumer", discountRate: 24.50, maturityDate: "2026-06-30", price: 87.80, priceDate: "2026-02-21", currency: "NGN" },
];

export const mockTrades: any[] = [
  { id: "TRD-2026-0248", portfolioId: "P001", clientId: "C001", securityId: "S001", ticker: "DANGCEM", side: "Buy", quantity: 50000, price: 510.00, grossValue: 25500000, brokerFee: 127500, settlementFee: 51000, netValue: 25678500, tradeDate: "2026-02-21", settlementDate: "2026-02-24", status: "Settled", broker: "Meristem Securities Ltd", trader: "Adaeze Okonkwo", approver: "Emeka Nwachukwu", fundId: "F001" },
  { id: "TRD-2026-0247", portfolioId: "P002", clientId: "C001", securityId: "S011", ticker: "FGN-APR-27", side: "Buy", quantity: 500000000, price: 98.45, grossValue: 492250000, brokerFee: 246125, settlementFee: 0, netValue: 492496125, tradeDate: "2026-02-20", settlementDate: "2026-02-22", status: "Approved", broker: "Chapel Hill Denham", trader: "Emeka Nwachukwu", approver: null, fundId: "F002" },
  { id: "TRD-2026-0246", portfolioId: "P003", clientId: "C002", securityId: "S002", ticker: "GTCO", side: "Sell", quantity: 200000, price: 48.50, grossValue: 9700000, brokerFee: 48500, settlementFee: 19400, netValue: 9632100, tradeDate: "2026-02-20", settlementDate: "2026-02-24", status: "Executed", broker: "CardinalStone Securities", trader: "Adaeze Okonkwo", approver: "Emeka Nwachukwu", fundId: "F001" },
  { id: "TRD-2026-0245", portfolioId: "P005", clientId: "C003", securityId: "S015", ticker: "CBN-TB-91", side: "Buy", quantity: 1000000000, price: 94.36, grossValue: 943600000, brokerFee: 0, settlementFee: 0, netValue: 943600000, tradeDate: "2026-02-19", settlementDate: "2026-02-20", status: "Settled", broker: "Direct (CBN Primary Market)", trader: "Emeka Nwachukwu", approver: "Adaeze Okonkwo", fundId: "F003" },
  { id: "TRD-2026-0244", portfolioId: "P003", clientId: "C002", securityId: "S003", ticker: "ZENITHBANK", side: "Buy", quantity: 300000, price: 37.20, grossValue: 11160000, brokerFee: 55800, settlementFee: 22320, netValue: 11238120, tradeDate: "2026-02-19", settlementDate: "2026-02-23", status: "Submitted", broker: "Stanbic IBTC Stockbrokers", trader: "Adaeze Okonkwo", approver: null, fundId: "F001" },
  { id: "TRD-2026-0243", portfolioId: "P001", clientId: "C001", securityId: "S007", ticker: "SEPLAT", side: "Buy", quantity: 5000, price: 4250.00, grossValue: 21250000, brokerFee: 106250, settlementFee: 42500, netValue: 21398750, tradeDate: "2026-02-18", settlementDate: "2026-02-22", status: "Settled", broker: "Meristem Securities Ltd", trader: "Adaeze Okonkwo", approver: "Emeka Nwachukwu", fundId: "F001" },
  { id: "TRD-2026-0242", portfolioId: "P002", clientId: "C001", securityId: "S013", ticker: "FGN-JUN-32", side: "Buy", quantity: 250000000, price: 102.50, grossValue: 256250000, brokerFee: 128125, settlementFee: 0, netValue: 256378125, tradeDate: "2026-02-18", settlementDate: "2026-02-20", status: "Failed", broker: "Chapel Hill Denham", trader: "Emeka Nwachukwu", approver: "Adaeze Okonkwo", failureReason: "CSCS settlement rejection — insufficient bond allocation", fundId: "F002" },
  { id: "TRD-2026-0241", portfolioId: "P004", clientId: "C003", securityId: "S012", ticker: "FGN-FEB-29", side: "Buy", quantity: 300000000, price: 97.20, grossValue: 291600000, brokerFee: 145800, settlementFee: 0, netValue: 291745800, tradeDate: "2026-02-17", settlementDate: "2026-02-19", status: "Settled", broker: "ARM Securities Ltd", trader: "Emeka Nwachukwu", approver: "Adaeze Okonkwo", fundId: "F002" },
  { id: "TRD-2026-0240", portfolioId: "P003", clientId: "C002", securityId: "S004", ticker: "MTNN", side: "Sell", quantity: 10000, price: 198.00, grossValue: 1980000, brokerFee: 9900, settlementFee: 3960, netValue: 1966140, tradeDate: "2026-02-17", settlementDate: "2026-02-21", status: "Settled", broker: "CardinalStone Securities", trader: "Adaeze Okonkwo", approver: "Emeka Nwachukwu", fundId: "F001" },
  { id: "TRD-2026-0239", portfolioId: "P001", clientId: "C001", securityId: "S006", ticker: "BUACEMENT", side: "Buy", quantity: 100000, price: 95.00, grossValue: 9500000, brokerFee: 47500, settlementFee: 19000, netValue: 9566500, tradeDate: "2026-02-14", settlementDate: "2026-02-18", status: "Settled", broker: "Meristem Securities Ltd", trader: "Adaeze Okonkwo", approver: "Emeka Nwachukwu", fundId: "F001" },
];

export const mockSettlements = [
  { id: "SET-2026-0248", tradeId: "TRD-2026-0248", ticker: "DANGCEM", portfolioId: "P001", clientName: "ARM Pension Managers Ltd", side: "Buy", quantity: 50000, netValue: 25678500, settlementDate: "2026-02-24", status: "Settled", custodian: "CSCS", dvpStatus: "Matched", settledDate: "2026-02-24" },
  { id: "SET-2026-0247", tradeId: "TRD-2026-0247", ticker: "FGN-APR-27", portfolioId: "P002", clientName: "ARM Pension Managers Ltd", side: "Buy", quantity: 500000000, netValue: 492496125, settlementDate: "2026-02-22", status: "Pending", custodian: "CSCS", dvpStatus: "Awaiting Match", settledDate: null },
  { id: "SET-2026-0246", tradeId: "TRD-2026-0246", ticker: "GTCO", portfolioId: "P003", clientName: "Stanbic IBTC AM Ltd", side: "Sell", quantity: 200000, netValue: 9632100, settlementDate: "2026-02-24", status: "Pending", custodian: "CSCS", dvpStatus: "Awaiting Match", settledDate: null },
  { id: "SET-2026-0242", tradeId: "TRD-2026-0242", ticker: "FGN-JUN-32", portfolioId: "P002", clientName: "ARM Pension Managers Ltd", side: "Buy", quantity: 250000000, netValue: 256378125, settlementDate: "2026-02-20", status: "Failed", custodian: "CSCS", dvpStatus: "Rejected", failureReason: "Insufficient bond allocation at CSCS", settledDate: null },
];

export const mockPositions = [
  { id: "POS001", portfolioId: "P001", securityId: "S001", ticker: "DANGCEM", quantity: 150000, avgCost: 485.50, currentPrice: 510.00, marketValue: 76500000, unrealisedPnL: 3675000, unrealisedPnLPct: 5.05, weight: 7.29 },
  { id: "POS002", portfolioId: "P001", securityId: "S004", ticker: "MTNN", quantity: 200000, avgCost: 188.00, currentPrice: 198.00, marketValue: 39600000, unrealisedPnL: 2000000, unrealisedPnLPct: 5.32, weight: 3.77 },
  { id: "POS003", portfolioId: "P001", securityId: "S007", ticker: "SEPLAT", quantity: 15000, avgCost: 4100.00, currentPrice: 4250.00, marketValue: 63750000, unrealisedPnL: 2250000, unrealisedPnLPct: 3.66, weight: 6.07 },
  { id: "POS004", portfolioId: "P001", securityId: "S002", ticker: "GTCO", quantity: 500000, avgCost: 44.20, currentPrice: 48.50, marketValue: 24250000, unrealisedPnL: 2150000, unrealisedPnLPct: 9.73, weight: 2.31 },
  { id: "POS005", portfolioId: "P002", securityId: "S011", ticker: "FGN-APR-27", faceValue: 1500000000, avgCost: 97.80, currentPrice: 98.45, marketValue: 1476750000, unrealisedPnL: 9750000, unrealisedPnLPct: 0.67, weight: 19.18 },
  { id: "POS006", portfolioId: "P002", securityId: "S012", ticker: "FGN-FEB-29", faceValue: 2000000000, avgCost: 96.40, currentPrice: 97.20, marketValue: 1944000000, unrealisedPnL: 16000000, unrealisedPnLPct: 0.83, weight: 25.25 },
  { id: "POS007", portfolioId: "P005", securityId: "S015", ticker: "CBN-TB-91", faceValue: 3000000000, avgCost: 94.36, currentPrice: 94.36, marketValue: 2830800000, unrealisedPnL: 0, unrealisedPnLPct: 0, weight: 65.83 },
];

export const mockAumTrend = [
  { month: "Aug 25", aum: 71.2, inflow: 2.1, outflow: 0.8 },
  { month: "Sep 25", aum: 74.5, inflow: 3.8, outflow: 0.5 },
  { month: "Oct 25", aum: 76.8, inflow: 2.9, outflow: 0.6 },
  { month: "Nov 25", aum: 79.2, inflow: 3.1, outflow: 0.7 },
  { month: "Dec 25", aum: 77.4, inflow: 1.2, outflow: 3.0 },
  { month: "Jan 26", aum: 82.1, inflow: 5.8, outflow: 1.1 },
  { month: "Feb 26", aum: 85.4, inflow: 4.2, outflow: 0.9 },
];

export const mockNavHistory: Record<string, { date: string; nav: number }[]> = {
  F001: [
    { date: "Aug 25", nav: 98.42 }, { date: "Sep 25", nav: 103.15 }, { date: "Oct 25", nav: 108.72 },
    { date: "Nov 25", nav: 112.48 }, { date: "Dec 25", nav: 106.04 }, { date: "Jan 26", nav: 119.82 },
    { date: "Feb 26", nav: 125.48 },
  ],
  F002: [
    { date: "Aug 25", nav: 101.20 }, { date: "Sep 25", nav: 102.45 }, { date: "Oct 25", nav: 103.80 },
    { date: "Nov 25", nav: 105.10 }, { date: "Dec 25", nav: 104.30 }, { date: "Jan 26", nav: 106.82 },
    { date: "Feb 26", nav: 108.74 },
  ],
  F003: [
    { date: "Aug 25", nav: 100.00 }, { date: "Sep 25", nav: 100.00 }, { date: "Oct 25", nav: 100.00 },
    { date: "Nov 25", nav: 100.00 }, { date: "Dec 25", nav: 100.00 }, { date: "Jan 26", nav: 100.00 },
    { date: "Feb 26", nav: 100.00 },
  ],
  F004: [
    { date: "Aug 25", nav: 101.50 }, { date: "Sep 25", nav: 104.20 }, { date: "Oct 25", nav: 107.30 },
    { date: "Nov 25", nav: 109.80 }, { date: "Dec 25", nav: 105.40 }, { date: "Jan 26", nav: 112.10 },
    { date: "Feb 26", nav: 115.22 },
  ],
};

export const mockDashboardMetrics = {
  totalAum: 85400000000,
  aumGrowthMtd: 3300000000,
  aumGrowthPct: 4.02,
  totalClients: 10,
  activePortfolios: 12,
  totalFunds: 4,
  ytdRevenue: 486250000,
  pendingTrades: 3,
  failedSettlements: 1,
  openReconciliationBreaks: 3,
  openComplianceBreaches: 2,
  regulatoryDeadlinesThisMonth: 1,
};

export const mockReconciliationBreaks = [
  { id: "RCN-2026-0041", date: "2026-02-21", portfolioId: "P002", type: "Position Break", security: "FGN-FEB-29", internalQty: 2000000000, custodianQty: 1950000000, difference: 50000000, breakType: "Quantity", status: "Open", assignedTo: "Ngozi Eze", ageDays: 2, priority: "High" },
  { id: "RCN-2026-0040", date: "2026-02-21", portfolioId: "P003", type: "Cash Break", security: "Cash — NGN", internalAmt: 85240000, custodianAmt: 85000000, difference: 240000, breakType: "Cash", status: "Under Investigation", assignedTo: "Ngozi Eze", ageDays: 1, priority: "Medium" },
  { id: "RCN-2026-0039", date: "2026-02-20", portfolioId: "P001", type: "Price Break", security: "DANGCEM", internalPrice: 510.00, custodianPrice: 508.50, difference: 1.50, breakType: "Price", status: "Open", assignedTo: "Babatunde Adeyemi", ageDays: 3, priority: "Low" },
  { id: "RCN-2026-0038", date: "2026-02-19", portfolioId: "P001", type: "Position Break", security: "SEPLAT", internalQty: 15000, custodianQty: 15000, difference: 0, breakType: "Timing", status: "Resolved", assignedTo: "Ngozi Eze", ageDays: 0, priority: "Low" },
];

export const mockComplianceEvents = [
  { id: "CMP-2026-0018", date: "2026-02-21", portfolioId: "P001", type: "Pre-Trade Breach", ticker: "DANGCEM", rule: "Issuer Concentration Limit", limit: 10.00, actual: 11.20, severity: "High", status: "Escalated", raisedBy: "System", assignedTo: "Fatima Abubakar" },
  { id: "CMP-2026-0017", date: "2026-02-20", portfolioId: "P003", type: "Post-Trade Breach", ticker: "GTCO", rule: "Sector Concentration — Financial Services", limit: 40.00, actual: 42.30, severity: "Medium", status: "Under Review", raisedBy: "System", assignedTo: "Fatima Abubakar" },
  { id: "CMP-2026-0016", date: "2026-02-18", type: "AML Alert", clientId: "C007", clientName: "Alhaji Musa Dangiwa", rule: "Large Redemption — Threshold Exceeded", transactionAmt: 125000000, threshold: 100000000, severity: "High", status: "Reported to NFIU", raisedBy: "System", assignedTo: "Fatima Abubakar" },
  { id: "CMP-2026-0015", date: "2026-02-15", type: "Regulatory Deadline", rule: "SEC Q4 2025 Returns", dueDate: "2026-02-28", status: "In Progress", severity: "High", assignedTo: "Fatima Abubakar" },
];

export const mockRegulatorySubmissions = [
  { id: "REG-2026-001", name: "SEC Quarterly Return — Q4 2025", regulator: "SEC Nigeria", dueDate: "2026-02-28", submittedDate: null, status: "In Progress", preparedBy: "Fatima Abubakar", period: "Q4 2025", type: "Quarterly Return" },
  { id: "REG-2025-004", name: "SEC Quarterly Return — Q3 2025", regulator: "SEC Nigeria", dueDate: "2025-11-30", submittedDate: "2025-11-28", status: "Submitted", preparedBy: "Fatima Abubakar", period: "Q3 2025", type: "Quarterly Return" },
  { id: "REG-2025-AML-02", name: "NFIU AML/CFT Report — H2 2025", regulator: "NFIU", dueDate: "2026-01-31", submittedDate: "2026-01-29", status: "Submitted", preparedBy: "Fatima Abubakar", period: "H2 2025", type: "AML/CFT Report" },
  { id: "REG-2026-NDPR", name: "NDPR Compliance Log — 2025 Annual", regulator: "NITDA", dueDate: "2026-03-31", submittedDate: null, status: "Not Started", preparedBy: null, period: "FY 2025", type: "NDPR Compliance" },
];

export const mockFees = [
  { id: "FEE-2026-0021", fundId: "F001", fundName: "ValuAlliance Growth Fund", clientId: "C001", clientName: "ARM Pension Managers Ltd", feeType: "Management Fee", period: "January 2026", aum: 10500000000, rate: 1.5, annualFee: 157500000, monthlyFee: 13125000, accrued: 13125000, invoiceDate: "2026-02-01", status: "Invoiced", invoiceNo: "INV-2026-0021" },
  { id: "FEE-2026-0020", fundId: "F001", fundName: "ValuAlliance Growth Fund", clientId: "C002", clientName: "Stanbic IBTC AM Ltd", feeType: "Management Fee", period: "January 2026", aum: 22400000000, rate: 1.5, annualFee: 336000000, monthlyFee: 28000000, accrued: 28000000, invoiceDate: "2026-02-01", status: "Paid", invoiceNo: "INV-2026-0020" },
  { id: "FEE-2026-0019", fundId: "F001", fundName: "ValuAlliance Growth Fund", clientId: "C001", clientName: "ARM Pension Managers Ltd", feeType: "Performance Fee", period: "Q4 2025", aum: 10500000000, rate: 20, hurdle: 15.00, actualReturn: 31.85, feeAmount: 35175000, accrued: 35175000, invoiceDate: "2026-01-15", status: "Paid", invoiceNo: "INV-2026-0019" },
];

export const mockPerformance = [
  { portfolioId: "P001", portfolioName: "ARM Pensions — Equity", benchmark: "NSE All-Share Index", returns: { mtd: { portfolio: 4.82, benchmark: 3.94 }, qtd: { portfolio: 8.40, benchmark: 7.10 }, ytd: { portfolio: 19.20, benchmark: 15.70 }, oneYear: { portfolio: 31.85, benchmark: 26.40 }, threeYear: { portfolio: 18.25, benchmark: 14.80 } }, attribution: { allocation: 2.10, selection: 3.25, interaction: 0.30 } },
  { portfolioId: "P002", portfolioName: "ARM Pensions — Fixed Income", benchmark: "FMDQ Bond Index", returns: { mtd: { portfolio: 1.20, benchmark: 1.05 }, qtd: { portfolio: 3.60, benchmark: 3.10 }, ytd: { portfolio: 5.10, benchmark: 4.30 }, oneYear: { portfolio: 14.93, benchmark: 13.20 }, threeYear: { portfolio: 12.40, benchmark: 11.10 } }, attribution: { allocation: 0.50, selection: 1.13, interaction: 0.00 } },
];

export const mockNotifications = [
  { id: "N001", timestamp: "2026-02-23 09:15", type: "Compliance Alert", title: "Pre-Trade Breach: DANGCEM Concentration Limit", message: "Portfolio P001 (ARM Equity) breached issuer concentration limit at 11.20% vs 10.00% limit. Trade TRD-2026-0248 flagged for review.", severity: "High", read: false, link: "/risk-compliance" },
  { id: "N002", timestamp: "2026-02-23 08:42", type: "Settlement", title: "Trade Settled: TRD-2026-0248 (DANGCEM Buy)", message: "50,000 units DANGCEM settled successfully via CSCS. Net value: ₦25,678,500.", severity: "Info", read: false, link: "/settlement" },
  { id: "N003", timestamp: "2026-02-23 08:30", type: "Reconciliation", title: "Position Break: FGN-FEB-29 (₦50M difference)", message: "Reconciliation break identified for FGN-FEB-29 in Portfolio P002. Internal position: ₦2.0B face value. CSCS: ₦1.95B. Difference: ₦50M. Assigned to Ngozi Eze.", severity: "High", read: false, link: "/reconciliation" },
  { id: "N004", timestamp: "2026-02-22 16:10", type: "Regulatory", title: "Regulatory Deadline Reminder: SEC Q4 2025 Return", message: "SEC Q4 2025 Quarterly Return is due on 28 February 2026 (5 days remaining). Submission status: In Progress.", severity: "High", read: true, link: "/regulatory-returns" },
  { id: "N005", timestamp: "2026-02-22 14:25", type: "Trade", title: "Trade Approval Required: TRD-2026-0244 (ZENITHBANK Buy)", message: "Trade TRD-2026-0244 awaiting approval. Buy 300,000 ZENITHBANK @ ₦37.20. Submitted by Adaeze Okonkwo.", severity: "Medium", read: true, link: "/trades" },
  { id: "N006", timestamp: "2026-02-21 17:00", type: "Trade", title: "Trade Failed: TRD-2026-0242 (FGN-JUN-32)", message: "Settlement failed for TRD-2026-0242. Reason: CSCS rejection — insufficient bond allocation. ₦256,378,125 — requires reprocessing.", severity: "High", read: true, link: "/trades" },
];

export const mockAuditLogs = [
  { id: "AUD-2026-18402", timestamp: "2026-02-23 09:15:42", userId: "U003", userName: "Fatima Abubakar", role: "Compliance Officer", ipAddress: "10.0.2.45", module: "Risk & Compliance", action: "Compliance Alert Escalated", entity: "TRD-2026-0248", before: "Status: Open", after: "Status: Escalated", outcome: "Success" },
  { id: "AUD-2026-18401", timestamp: "2026-02-23 08:42:10", userId: "U001", userName: "Adaeze Okonkwo", role: "Portfolio Manager", ipAddress: "10.0.2.31", module: "Trade Capture", action: "Trade Submitted", entity: "TRD-2026-0248", before: "Status: Draft", after: "Status: Submitted", outcome: "Success" },
  { id: "AUD-2026-18400", timestamp: "2026-02-23 08:30:55", userId: "U002", userName: "Emeka Nwachukwu", role: "Chief Investment Officer", ipAddress: "10.0.2.28", module: "Trade Capture", action: "Trade Approved", entity: "TRD-2026-0248", before: "Status: Submitted", after: "Status: Approved", outcome: "Success" },
  { id: "AUD-2026-18399", timestamp: "2026-02-23 08:15:30", userId: "U005", userName: "Ngozi Eze", role: "Operations Manager", ipAddress: "10.0.2.52", module: "Reconciliation", action: "Break Assigned", entity: "RCN-2026-0041", before: "Assigned: Unassigned", after: "Assigned: Ngozi Eze", outcome: "Success" },
  { id: "AUD-2026-18398", timestamp: "2026-02-22 17:45:12", userId: "U001", userName: "Adaeze Okonkwo", role: "Portfolio Manager", ipAddress: "10.0.2.31", module: "Valuation", action: "NAV Approved for Publication", entity: "F001 — 2026-02-21", before: "Status: Pending Approval", after: "Status: Published", outcome: "Success" },
];

export const mockDocuments = [
  { id: "DOC-001", name: "ARM Pensions — Investment Management Agreement", type: "Mandate", clientId: "C001", clientName: "ARM Pension Managers Ltd", uploadedBy: "Aisha Mohammed", uploadedDate: "2024-01-10", version: "v3.1", fileSize: "2.4 MB", format: "PDF", status: "Active" },
  { id: "DOC-002", name: "ValuAlliance Growth Fund — Q4 2025 Client Statement", type: "Client Statement", clientId: "C001", uploadedBy: "Babatunde Adeyemi", uploadedDate: "2026-01-15", version: "v1.0", fileSize: "1.1 MB", format: "PDF", status: "Distributed" },
  { id: "DOC-003", name: "SEC Q3 2025 Quarterly Return — Submission Receipt", type: "Regulatory Filing", regulator: "SEC Nigeria", uploadedBy: "Fatima Abubakar", uploadedDate: "2025-11-28", version: "v1.0", fileSize: "845 KB", format: "PDF", status: "Archived" },
  { id: "DOC-004", name: "DANGCEM — Trade Confirmation TRD-2026-0248", type: "Trade Confirmation", tradeId: "TRD-2026-0248", uploadedBy: "System", uploadedDate: "2026-02-21", version: "v1.0", fileSize: "220 KB", format: "PDF", status: "Active" },
];

export const mockCorporateActions = [
  { id: "CA-2026-007", ticker: "DANGCEM", securityId: "S001", type: "Final Dividend", exDate: "2026-02-28", payDate: "2026-03-14", amount: 20.00, currency: "NGN", perUnit: "₦20.00 per share", status: "Upcoming", affectedPortfolios: ["P001", "P003"] },
  { id: "CA-2026-006", ticker: "GTCO", securityId: "S002", type: "Interim Dividend", exDate: "2026-02-10", payDate: "2026-02-20", amount: 3.00, currency: "NGN", perUnit: "₦3.00 per share", status: "Processed", affectedPortfolios: ["P003"] },
  { id: "CA-2026-005", ticker: "MTNN", securityId: "S004", type: "Bonus Issue", exDate: "2026-01-20", payDate: "2026-01-20", ratio: "1 for 10", currency: "NGN", status: "Processed", affectedPortfolios: ["P001", "P003"] },
  { id: "CA-2026-004", ticker: "FGN-APR-27", securityId: "S011", type: "Coupon Payment", couponDate: "2026-04-23", payDate: "2026-04-23", rate: 13.98, currency: "NGN", status: "Upcoming", affectedPortfolios: ["P002"] },
];

export const mockJournalEntries = [
  { id: "JE-2026-0501", date: "2026-02-21", fund: "Growth Fund", description: "Trade Settlement — DANGCEM Buy 50,000 units", drAccount: "Securities at Cost", crAccount: "Cash — NGN", amount: 25678500, sourceModule: "Trade Capture", postedBy: "System", status: "Posted", type: "Trade Purchase" },
  { id: "JE-2026-0500", date: "2026-02-21", fund: "Growth Fund", description: "Broker Fee — TRD-2026-0248", drAccount: "Brokerage Expense", crAccount: "Cash — NGN", amount: 127500, sourceModule: "Trade Capture", postedBy: "System", status: "Posted", type: "Adjustment" },
  { id: "JE-2026-0499", date: "2026-02-21", fund: "Growth Fund", description: "Management Fee Accrual — February 2026", drAccount: "Management Fee Expense", crAccount: "Fee Payable — Management", amount: 1350000, sourceModule: "Fee Calculation", postedBy: "System", status: "Posted", type: "Fee Accrual" },
  { id: "JE-2026-0498", date: "2026-02-20", fund: "Fixed Income Fund", description: "Bond Coupon Income — FGN-APR-27", drAccount: "Cash — NGN", crAccount: "Interest Income", amount: 20970000, sourceModule: "Corporate Actions", postedBy: "System", status: "Posted", type: "Coupon Receipt" },
  { id: "JE-2026-0497", date: "2026-02-20", fund: "Growth Fund", description: "Dividend Income — GTCO Interim Div", drAccount: "Cash — NGN", crAccount: "Dividend Income", amount: 600000, sourceModule: "Corporate Actions", postedBy: "System", status: "Posted", type: "Dividend Receipt" },
  { id: "JE-2026-0496", date: "2026-02-21", fund: "Growth Fund", description: "MTM Adjustment — Equities", drAccount: "Unrealised Gain on Investments", crAccount: "Securities Revaluation Reserve", amount: 10075000, sourceModule: "Valuation", postedBy: "System", status: "Posted", type: "Adjustment" },
  { id: "JE-2026-0495", date: "2026-02-19", fund: "Money Market Fund", description: "T-Bill Settlement — CBN-TB-91", drAccount: "Short-Term Investments", crAccount: "Cash — NGN", amount: 943600000, sourceModule: "Trade Capture", postedBy: "System", status: "Posted", type: "Trade Purchase" },
  { id: "JE-2026-0494", date: "2026-02-18", fund: "Growth Fund", description: "Trade Settlement — SEPLAT Buy 5,000", drAccount: "Securities at Cost", crAccount: "Cash — NGN", amount: 21398750, sourceModule: "Trade Capture", postedBy: "System", status: "Posted", type: "Trade Purchase" },
  { id: "JE-2026-0493", date: "2026-02-18", fund: "Fixed Income Fund", description: "Bond Interest Accrual — Daily", drAccount: "Accrued Interest Receivable", crAccount: "Interest Income Accrued", amount: 4850000, sourceModule: "Fund Accounting", postedBy: "System", status: "Posted", type: "Fee Accrual" },
  { id: "JE-2026-0492", date: "2026-02-17", fund: "Fixed Income Fund", description: "Trade Settlement — FGN-FEB-29 Buy", drAccount: "Government Bonds at Cost", crAccount: "Cash — NGN", amount: 291745800, sourceModule: "Trade Capture", postedBy: "System", status: "Posted", type: "Trade Purchase" },
  { id: "JE-2026-0491", date: "2026-02-25", fund: "Growth Fund", description: "Manual Adjustment — Correction of Fee Calculation", drAccount: "Retained Earnings", crAccount: "Accrued Expenses", amount: 450000, sourceModule: "Manual", postedBy: "Babatunde Adeyemi", status: "Pending Approval", type: "Adjustment" },
  { id: "JE-2026-0490", date: "2026-02-25", fund: "Value Fund", description: "Subscription Entry — Corporate Client A", drAccount: "Subscriptions Receivable", crAccount: "Unitholders Capital", amount: 15000000, sourceModule: "Manual", postedBy: "Abioro Adeyemi", status: "Pending Approval", type: "Manual" },
  { id: "JE-2026-0489", date: "2026-02-24", fund: "Money Market Fund", description: "Redemption Payment — Institutional Investor B", drAccount: "Unitholders Capital", crAccount: "Cash — NGN", amount: 8500000, sourceModule: "Manual", postedBy: "Abioro Adeyemi", status: "Pending Approval", type: "Manual" },
  { id: "JE-2026-0488", date: "2026-02-24", fund: "Growth Fund", description: "Bank Charges — Feb 2026", drAccount: "Other Operating Expenses", crAccount: "Cash — NGN", amount: 12500, sourceModule: "Manual", postedBy: "Babatunde Adeyemi", status: "Pending Approval", type: "Manual" },
  { id: "JE-2026-0487", date: "2026-02-23", fund: "Fixed Income Fund", description: "Interest Income Reversal — Error Correction", drAccount: "Interest Income", crAccount: "Accrued Interest Receivable", amount: 215000, sourceModule: "Manual", postedBy: "Babatunde Adeyemi", status: "Draft", type: "Manual" },
];

export const mockTrialBalance = [
  { account: "Cash — NGN", group: "Assets", debit: 4250000000, credit: 0 },
  { account: "Securities at Cost — Equities", group: "Assets", debit: 22800000000, credit: 0 },
  { account: "Government Bonds at Cost", group: "Assets", debit: 18500000000, credit: 0 },
  { account: "Short-Term Investments (T-Bills)", group: "Assets", debit: 8200000000, credit: 0 },
  { account: "Accrued Interest Receivable", group: "Assets", debit: 325000000, credit: 0 },
  { account: "Unrealised Gain on Investments", group: "Assets", debit: 1850000000, credit: 0 },
  { account: "Fee Payable — Management", group: "Liabilities", debit: 0, credit: 486250000 },
  { account: "Accrued Expenses", group: "Liabilities", debit: 0, credit: 125000000 },
  { account: "Dividend Payable", group: "Liabilities", debit: 0, credit: 280000000 },
  { account: "Unitholders Capital", group: "Liabilities", debit: 0, credit: 48500000000 },
  { account: "Retained Earnings", group: "Liabilities", debit: 0, credit: 4200000000 },
  { account: "Securities Revaluation Reserve", group: "Liabilities", debit: 0, credit: 1850000000 },
  { account: "Management Fee Income", group: "Income", debit: 0, credit: 486250000 },
  { account: "Interest Income", group: "Income", debit: 0, credit: 625000000 },
  { account: "Dividend Income", group: "Income", debit: 0, credit: 185000000 },
  { account: "Brokerage Expense", group: "Expenses", debit: 42500000, credit: 0 },
  { account: "Custody Fees", group: "Expenses", debit: 18000000, credit: 0 },
  { account: "Audit & Professional Fees", group: "Expenses", debit: 15000000, credit: 0 },
  { account: "Other Operating Expenses", group: "Expenses", debit: 8500000, credit: 0 },
];

export const mockReconSummary = [
  { date: "17 Feb", matched: 46, open: 4, resolved: 2 },
  { date: "18 Feb", matched: 47, open: 3, resolved: 1 },
  { date: "19 Feb", matched: 45, open: 5, resolved: 3 },
  { date: "20 Feb", matched: 48, open: 2, resolved: 2 },
  { date: "21 Feb", matched: 44, open: 4, resolved: 1 },
  { date: "22 Feb", matched: 46, open: 3, resolved: 2 },
  { date: "23 Feb", matched: 45, open: 3, resolved: 1 },
];

// ============================================================
// CLIENT DETAIL DATA
// ============================================================

export const mockClientContacts: Record<string, { name: string; role: string; email: string; phone: string; primary: boolean }[]> = {
  C001: [
    { name: "Tunde Olanrewaju", role: "Head of Investments", email: "tolanrewaju@arm.com.ng", phone: "+234 1 462 3400", primary: true },
    { name: "Bukola Adedeji", role: "Portfolio Analyst", email: "badedeji@arm.com.ng", phone: "+234 1 462 3421", primary: false },
    { name: "Segun Adeniyi", role: "Compliance Manager", email: "sadeniyi@arm.com.ng", phone: "+234 1 462 3450", primary: false },
  ],
  C002: [
    { name: "Chinwe Okoro", role: "Chief Investment Officer", email: "c.okoro@stanbicibtc.com", phone: "+234 1 422 3003", primary: true },
    { name: "Femi Olarewaju", role: "Fund Manager", email: "f.olarewaju@stanbicibtc.com", phone: "+234 1 422 3010", primary: false },
  ],
  C003: [
    { name: "Dr Emeka Eze", role: "Managing Director", email: "emeka.eze@nlpcpension.com.ng", phone: "+234 1 280 0500", primary: true },
    { name: "Halima Bello", role: "Investment Analyst", email: "h.bello@nlpcpension.com.ng", phone: "+234 1 280 0520", primary: false },
  ],
  C004: [
    { name: "Mrs Bola Adenike", role: "Head of Investment Operations", email: "b.adenike@zenithlife.com.ng", phone: "+234 1 292 5800", primary: true },
  ],
  C005: [
    { name: "Chidi Anyanwu", role: "Head Trustee Services", email: "canyanwu@fbnquest.com", phone: "+234 1 285 9800", primary: true },
  ],
  C006: [
    { name: "Kemi Lawal", role: "Director, Investment Management", email: "k.lawal@coronationam.com", phone: "+234 1 631 4000", primary: true },
  ],
  C007: [
    { name: "Alhaji Musa Dangiwa", role: "Account Holder", email: "m.dangiwa@privatemail.com", phone: "+234 803 456 7890", primary: true },
  ],
  C008: [
    { name: "Dr. Ngozi Iweala-Obi", role: "Account Holder", email: "n.ob@privatemail.com", phone: "+234 805 234 5678", primary: true },
  ],
  C009: [
    { name: "Biodun Oladele", role: "HR Director", email: "b.oladele@channelstv.com", phone: "+234 1 261 0905", primary: true },
    { name: "Tayo Akindele", role: "Finance Manager", email: "t.akindele@channelstv.com", phone: "+234 1 261 0910", primary: false },
  ],
  C010: [
    { name: "Amaka Ofoegbu", role: "Fund Administrator", email: "a.ofoegbu@heritagefund.ng", phone: "+234 1 279 4000", primary: true },
  ],
};

export const mockClientMandates: Record<string, { id: string; name: string; assetClass: string; benchmark: string; restrictions: string; inceptionDate: string; managementFee: string; performanceFee: string }[]> = {
  C001: [
    { id: "MAN-001", name: "Equity Growth Mandate", assetClass: "Equity", benchmark: "NSE All-Share Index", restrictions: "Max 10% single issuer, max 40% sector", inceptionDate: "2019-03-15", managementFee: "1.50%", performanceFee: "20% above hurdle" },
    { id: "MAN-002", name: "Fixed Income Conservative", assetClass: "Fixed Income", benchmark: "FMDQ Bond Index", restrictions: "Min 60% FGN bonds, max 20% corporate", inceptionDate: "2019-06-01", managementFee: "1.00%", performanceFee: "None" },
  ],
  C002: [
    { id: "MAN-003", name: "Multi-Asset Growth", assetClass: "Mixed", benchmark: "NSE All-Share Index", restrictions: "Max 70% equities, min 20% fixed income", inceptionDate: "2018-07-22", managementFee: "1.50%", performanceFee: "20% above hurdle" },
  ],
  C003: [
    { id: "MAN-004", name: "Conservative Fixed Income", assetClass: "Fixed Income", benchmark: "FMDQ Bond Index", restrictions: "Max 10% equities, min 70% FGN bonds", inceptionDate: "2020-01-10", managementFee: "1.00%", performanceFee: "None" },
    { id: "MAN-005", name: "Short-Term Liquidity", assetClass: "Money Market", benchmark: "CBN Overnight Rate", restrictions: "T-Bills and money market only", inceptionDate: "2021-03-01", managementFee: "0.50%", performanceFee: "None" },
  ],
};

export const mockClientAumHistory: Record<string, { month: string; aum: number }[]> = {
  C001: [
    { month: "Aug 25", aum: 16.2 }, { month: "Sep 25", aum: 16.8 }, { month: "Oct 25", aum: 17.1 },
    { month: "Nov 25", aum: 17.5 }, { month: "Dec 25", aum: 17.0 }, { month: "Jan 26", aum: 17.8 }, { month: "Feb 26", aum: 18.2 },
  ],
  C002: [
    { month: "Aug 25", aum: 19.5 }, { month: "Sep 25", aum: 20.1 }, { month: "Oct 25", aum: 20.8 },
    { month: "Nov 25", aum: 21.2 }, { month: "Dec 25", aum: 20.5 }, { month: "Jan 26", aum: 21.8 }, { month: "Feb 26", aum: 22.4 },
  ],
  C003: [
    { month: "Aug 25", aum: 10.8 }, { month: "Sep 25", aum: 11.2 }, { month: "Oct 25", aum: 11.5 },
    { month: "Nov 25", aum: 11.8 }, { month: "Dec 25", aum: 11.4 }, { month: "Jan 26", aum: 12.1 }, { month: "Feb 26", aum: 12.5 },
  ],
};

// Utility functions for client lookups
export function getClientPortfolios(clientId: string) {
  return mockPortfolios.filter(p => p.clientId === clientId);
}
export function getClientTrades(clientId: string) {
  return mockTrades.filter(t => t.clientId === clientId);
}
export function getClientPositions(clientId: string) {
  const portfolioIds = mockPortfolios.filter(p => p.clientId === clientId).map(p => p.id);
  return mockPositions.filter(p => portfolioIds.includes(p.portfolioId));
}
export function getClientFees(clientId: string) {
  return mockFees.filter(f => f.clientId === clientId);
}
export function getClientDocuments(clientId: string) {
  return mockDocuments.filter(d => d.clientId === clientId);
}

// ============================================================
// FUND DETAIL DATA — HOLDINGS, UNIT HOLDERS, TRANSACTIONS, NAV
// ============================================================

export const mockFundHoldings: Record<string, any[]> = {
  F001: [
    { id: "FH-001", fundId: "F001", securityId: "S001", ticker: "DANGCEM", name: "Dangote Cement PLC", assetClass: "Equity", sector: "Materials", quantity: 450000, avgCost: 485.50, currentPrice: 510.00, costBasis: 218475000, marketValue: 229500000, unrealisedPnL: 11025000, unrealisedPnLPct: 5.05, percentOfNav: 7.08, priceSource: "NGX" },
    { id: "FH-002", fundId: "F001", securityId: "S004", ticker: "MTNN", name: "MTN Nigeria Communications PLC", assetClass: "Equity", sector: "Telecommunications", quantity: 600000, avgCost: 188.00, currentPrice: 198.00, costBasis: 112800000, marketValue: 118800000, unrealisedPnL: 6000000, unrealisedPnLPct: 5.32, percentOfNav: 3.67, priceSource: "NGX" },
    { id: "FH-003", fundId: "F001", securityId: "S007", ticker: "SEPLAT", name: "Seplat Energy PLC", assetClass: "Equity", sector: "Energy", quantity: 45000, avgCost: 4100.00, currentPrice: 4250.00, costBasis: 184500000, marketValue: 191250000, unrealisedPnL: 6750000, unrealisedPnLPct: 3.66, percentOfNav: 5.90, priceSource: "NGX" },
    { id: "FH-004", fundId: "F001", securityId: "S002", ticker: "GTCO", name: "Guaranty Trust Holding Co. PLC", assetClass: "Equity", sector: "Financial Services", quantity: 1500000, avgCost: 44.20, currentPrice: 48.50, costBasis: 66300000, marketValue: 72750000, unrealisedPnL: 6450000, unrealisedPnLPct: 9.73, percentOfNav: 2.25, priceSource: "NGX" },
    { id: "FH-005", fundId: "F001", securityId: "S003", ticker: "ZENITHBANK", name: "Zenith Bank PLC", assetClass: "Equity", sector: "Financial Services", quantity: 2500000, avgCost: 34.50, currentPrice: 37.20, costBasis: 86250000, marketValue: 93000000, unrealisedPnL: 6750000, unrealisedPnLPct: 7.83, percentOfNav: 2.87, priceSource: "NGX" },
    { id: "FH-006", fundId: "F001", securityId: "S005", ticker: "AIRTELAFRI", name: "Airtel Africa PLC", assetClass: "Equity", sector: "Telecommunications", quantity: 80000, avgCost: 1920.00, currentPrice: 1890.00, costBasis: 153600000, marketValue: 151200000, unrealisedPnL: -2400000, unrealisedPnLPct: -1.56, percentOfNav: 4.67, priceSource: "NGX" },
    { id: "FH-007", fundId: "F001", securityId: "S006", ticker: "BUACEMENT", name: "BUA Cement PLC", assetClass: "Equity", sector: "Materials", quantity: 350000, avgCost: 90.00, currentPrice: 95.00, costBasis: 31500000, marketValue: 33250000, unrealisedPnL: 1750000, unrealisedPnLPct: 5.56, percentOfNav: 1.03, priceSource: "NGX" },
    { id: "FH-008", fundId: "F001", securityId: "S008", ticker: "ACCESSCORP", name: "Access Holdings PLC", assetClass: "Equity", sector: "Financial Services", quantity: 4000000, avgCost: 20.50, currentPrice: 21.80, costBasis: 82000000, marketValue: 87200000, unrealisedPnL: 5200000, unrealisedPnLPct: 6.34, percentOfNav: 2.69, priceSource: "NGX" },
    { id: "FH-009", fundId: "F001", securityId: "S009", ticker: "UBA", name: "United Bank for Africa PLC", assetClass: "Equity", sector: "Financial Services", quantity: 3500000, avgCost: 22.00, currentPrice: 23.50, costBasis: 77000000, marketValue: 82250000, unrealisedPnL: 5250000, unrealisedPnLPct: 6.82, percentOfNav: 2.54, priceSource: "NGX" },
    { id: "FH-010", fundId: "F001", securityId: "S010", ticker: "FBNH", name: "FBN Holdings PLC", assetClass: "Equity", sector: "Financial Services", quantity: 3000000, avgCost: 24.00, currentPrice: 25.90, costBasis: 72000000, marketValue: 77700000, unrealisedPnL: 5700000, unrealisedPnLPct: 7.92, percentOfNav: 2.40, priceSource: "NGX" },
    { id: "FH-011", fundId: "F001", securityId: "S011", ticker: "FGN-APR-27", name: "FGN Bond April 2027", assetClass: "Government Bond", sector: "Sovereign", faceValue: 3000000000, avgCost: 97.80, currentPrice: 98.45, costBasis: 2934000000, marketValue: 2953500000, unrealisedPnL: 19500000, unrealisedPnLPct: 0.66, percentOfNav: 9.11, priceSource: "FMDQ", creditRating: "B-", maturityDate: "2027-04-23", duration: 1.17 },
    { id: "FH-012", fundId: "F001", securityId: "S015", ticker: "CBN-TB-91", name: "CBN T-Bill 91-Day", assetClass: "T-Bill", sector: "Government", faceValue: 2000000000, avgCost: 94.36, currentPrice: 94.36, costBasis: 1887200000, marketValue: 1887200000, unrealisedPnL: 0, unrealisedPnLPct: 0, percentOfNav: 5.82, priceSource: "CBN", maturityDate: "2026-05-20" },
  ],
  F002: [
    { id: "FH-020", fundId: "F002", securityId: "S011", ticker: "FGN-APR-27", name: "FGN Bond April 2027", assetClass: "Government Bond", sector: "Sovereign", faceValue: 5000000000, avgCost: 97.80, currentPrice: 98.45, costBasis: 4890000000, marketValue: 4922500000, unrealisedPnL: 32500000, unrealisedPnLPct: 0.66, percentOfNav: 17.15, priceSource: "FMDQ", creditRating: "B-", maturityDate: "2027-04-23", duration: 1.17 },
    { id: "FH-021", fundId: "F002", securityId: "S012", ticker: "FGN-FEB-29", name: "FGN Bond February 2029", assetClass: "Government Bond", sector: "Sovereign", faceValue: 6000000000, avgCost: 96.40, currentPrice: 97.20, costBasis: 5784000000, marketValue: 5832000000, unrealisedPnL: 48000000, unrealisedPnLPct: 0.83, percentOfNav: 20.32, priceSource: "FMDQ", creditRating: "B-", maturityDate: "2029-02-14", duration: 2.75 },
    { id: "FH-022", fundId: "F002", securityId: "S013", ticker: "FGN-JUN-32", name: "FGN Bond June 2032", assetClass: "Government Bond", sector: "Sovereign", faceValue: 4000000000, avgCost: 101.50, currentPrice: 102.50, costBasis: 4060000000, marketValue: 4100000000, unrealisedPnL: 40000000, unrealisedPnLPct: 0.99, percentOfNav: 14.29, priceSource: "FMDQ", creditRating: "B-", maturityDate: "2032-06-18", duration: 5.12 },
    { id: "FH-023", fundId: "F002", securityId: "S014", ticker: "FGN-MAR-35", name: "FGN Bond March 2035", assetClass: "Government Bond", sector: "Sovereign", faceValue: 3000000000, avgCost: 100.80, currentPrice: 101.80, costBasis: 3024000000, marketValue: 3054000000, unrealisedPnL: 30000000, unrealisedPnLPct: 0.99, percentOfNav: 10.64, priceSource: "FMDQ", creditRating: "B-", maturityDate: "2035-03-26", duration: 7.44 },
    { id: "FH-024", fundId: "F002", securityId: "S016", ticker: "CBN-TB-182", name: "CBN T-Bill 182-Day", assetClass: "T-Bill", sector: "Government", faceValue: 4000000000, avgCost: 88.45, currentPrice: 88.45, costBasis: 3538000000, marketValue: 3538000000, unrealisedPnL: 0, unrealisedPnLPct: 0, percentOfNav: 12.33, priceSource: "CBN", maturityDate: "2026-08-20" },
    { id: "FH-025", fundId: "F002", securityId: "S018", ticker: "DANGSUGAR-CP-26", name: "Dangote Sugar CP Jun 2026", assetClass: "Commercial Paper", sector: "Consumer", faceValue: 2000000000, avgCost: 87.80, currentPrice: 87.80, costBasis: 1756000000, marketValue: 1756000000, unrealisedPnL: 0, unrealisedPnLPct: 0, percentOfNav: 6.12, priceSource: "FMDQ", creditRating: "A-", maturityDate: "2026-06-30" },
  ],
  F003: [
    { id: "FH-030", fundId: "F003", securityId: "S015", ticker: "CBN-TB-91", name: "CBN T-Bill 91-Day", assetClass: "T-Bill", sector: "Government", faceValue: 5000000000, avgCost: 94.36, currentPrice: 94.36, costBasis: 4718000000, marketValue: 4718000000, unrealisedPnL: 0, unrealisedPnLPct: 0, percentOfNav: 32.32, priceSource: "CBN", maturityDate: "2026-05-20" },
    { id: "FH-031", fundId: "F003", securityId: "S016", ticker: "CBN-TB-182", name: "CBN T-Bill 182-Day", assetClass: "T-Bill", sector: "Government", faceValue: 4000000000, avgCost: 88.45, currentPrice: 88.45, costBasis: 3538000000, marketValue: 3538000000, unrealisedPnL: 0, unrealisedPnLPct: 0, percentOfNav: 24.23, priceSource: "CBN", maturityDate: "2026-08-20" },
    { id: "FH-032", fundId: "F003", securityId: "S017", ticker: "CBN-TB-364", name: "CBN T-Bill 364-Day", assetClass: "T-Bill", sector: "Government", faceValue: 3000000000, avgCost: 76.25, currentPrice: 76.25, costBasis: 2287500000, marketValue: 2287500000, unrealisedPnL: 0, unrealisedPnLPct: 0, percentOfNav: 15.67, priceSource: "CBN", maturityDate: "2027-02-19" },
    { id: "FH-033", fundId: "F003", securityId: "S018", ticker: "DANGSUGAR-CP-26", name: "Dangote Sugar CP Jun 2026", assetClass: "Commercial Paper", sector: "Consumer", faceValue: 1500000000, avgCost: 87.80, currentPrice: 87.80, costBasis: 1317000000, marketValue: 1317000000, unrealisedPnL: 0, unrealisedPnLPct: 0, percentOfNav: 9.02, priceSource: "FMDQ", creditRating: "A-", maturityDate: "2026-06-30" },
  ],
  F004: [
    { id: "FH-040", fundId: "F004", securityId: "S001", ticker: "DANGCEM", name: "Dangote Cement PLC", assetClass: "Equity", sector: "Materials", quantity: 120000, avgCost: 490.00, currentPrice: 510.00, costBasis: 58800000, marketValue: 61200000, unrealisedPnL: 2400000, unrealisedPnLPct: 4.08, percentOfNav: 6.31, priceSource: "NGX" },
    { id: "FH-041", fundId: "F004", securityId: "S002", ticker: "GTCO", name: "Guaranty Trust Holding Co. PLC", assetClass: "Equity", sector: "Financial Services", quantity: 800000, avgCost: 45.00, currentPrice: 48.50, costBasis: 36000000, marketValue: 38800000, unrealisedPnL: 2800000, unrealisedPnLPct: 7.78, percentOfNav: 4.00, priceSource: "NGX" },
    { id: "FH-042", fundId: "F004", securityId: "S004", ticker: "MTNN", name: "MTN Nigeria Communications PLC", assetClass: "Equity", sector: "Telecommunications", quantity: 200000, avgCost: 190.00, currentPrice: 198.00, costBasis: 38000000, marketValue: 39600000, unrealisedPnL: 1600000, unrealisedPnLPct: 4.21, percentOfNav: 4.08, priceSource: "NGX" },
    { id: "FH-043", fundId: "F004", securityId: "S011", ticker: "FGN-APR-27", name: "FGN Bond April 2027", assetClass: "Government Bond", sector: "Sovereign", faceValue: 2000000000, avgCost: 97.80, currentPrice: 98.45, costBasis: 1956000000, marketValue: 1969000000, unrealisedPnL: 13000000, unrealisedPnLPct: 0.66, percentOfNav: 20.30, priceSource: "FMDQ", creditRating: "B-", maturityDate: "2027-04-23", duration: 1.17 },
    { id: "FH-044", fundId: "F004", securityId: "S012", ticker: "FGN-FEB-29", name: "FGN Bond February 2029", assetClass: "Government Bond", sector: "Sovereign", faceValue: 2000000000, avgCost: 96.40, currentPrice: 97.20, costBasis: 1928000000, marketValue: 1944000000, unrealisedPnL: 16000000, unrealisedPnLPct: 0.83, percentOfNav: 20.04, priceSource: "FMDQ", creditRating: "B-", maturityDate: "2029-02-14", duration: 2.75 },
    { id: "FH-045", fundId: "F004", securityId: "S015", ticker: "CBN-TB-91", name: "CBN T-Bill 91-Day", assetClass: "T-Bill", sector: "Government", faceValue: 1500000000, avgCost: 94.36, currentPrice: 94.36, costBasis: 1415400000, marketValue: 1415400000, unrealisedPnL: 0, unrealisedPnLPct: 0, percentOfNav: 14.59, priceSource: "CBN", maturityDate: "2026-05-20" },
  ],
};

export const mockUnitHolders: Record<string, any[]> = {
  F001: [
    { id: "UH-001", fundId: "F001", name: "ARM Pension Managers Ltd", type: "Pension Fund", kycStatus: "Verified", unitsHeld: 84200000, holdingValue: 10566960000, percentOfFund: 32.60, avgHoldingPeriodMonths: 72, lastTransactionDate: "2026-02-15", taxResidency: "Nigeria", email: "operations@arm.com.ng", phone: "+234 1 462 3400", isBeneficialOwner: false, isLargeHolder: true },
    { id: "UH-002", fundId: "F001", name: "Stanbic IBTC AM Ltd", type: "Corporate", kycStatus: "Verified", unitsHeld: 65400000, holdingValue: 8205720000, percentOfFund: 25.32, avgHoldingPeriodMonths: 60, lastTransactionDate: "2026-02-10", taxResidency: "Nigeria", email: "am@stanbicibtc.com", phone: "+234 1 422 3000", isBeneficialOwner: false, isLargeHolder: true },
    { id: "UH-003", fundId: "F001", name: "NLPC Retirement Fund", type: "Pension Fund", kycStatus: "Verified", unitsHeld: 42000000, holdingValue: 5270160000, percentOfFund: 16.26, avgHoldingPeriodMonths: 48, lastTransactionDate: "2026-01-28", taxResidency: "Nigeria", email: "investments@nlpc.com.ng", phone: "+234 1 280 0500", isBeneficialOwner: false, isLargeHolder: true },
    { id: "UH-004", fundId: "F001", name: "Zenith Life Insurance", type: "Corporate", kycStatus: "Verified", unitsHeld: 18500000, holdingValue: 2321380000, percentOfFund: 7.16, avgHoldingPeriodMonths: 36, lastTransactionDate: "2026-02-05", taxResidency: "Nigeria", email: "b.adenike@zenithlife.com.ng", phone: "+234 1 292 5800", isBeneficialOwner: false, isLargeHolder: true },
    { id: "UH-005", fundId: "F001", name: "Coronation Asset Management", type: "Corporate", kycStatus: "Verified", unitsHeld: 12200000, holdingValue: 1530856000, percentOfFund: 4.72, avgHoldingPeriodMonths: 24, lastTransactionDate: "2026-02-18", taxResidency: "Nigeria", email: "k.lawal@coronationam.com", phone: "+234 1 631 4000", isBeneficialOwner: false, isLargeHolder: false },
    { id: "UH-006", fundId: "F001", name: "Alhaji Musa Dangiwa", type: "HNW", kycStatus: "Verified", unitsHeld: 8500000, holdingValue: 1066580000, percentOfFund: 3.29, avgHoldingPeriodMonths: 30, lastTransactionDate: "2026-01-20", taxResidency: "Nigeria", email: "m.dangiwa@privatemail.com", phone: "+234 803 456 7890", isBeneficialOwner: false, isLargeHolder: false },
    { id: "UH-007", fundId: "F001", name: "Dr. Ngozi Iweala-Obi", type: "HNW", kycStatus: "Verified", unitsHeld: 5200000, holdingValue: 652496000, percentOfFund: 2.01, avgHoldingPeriodMonths: 18, lastTransactionDate: "2026-02-12", taxResidency: "Nigeria", email: "n.ob@privatemail.com", phone: "+234 805 234 5678", isBeneficialOwner: false, isLargeHolder: false },
    { id: "UH-008", fundId: "F001", name: "Channels TV Staff Fund", type: "Corporate", kycStatus: "Verified", unitsHeld: 4800000, holdingValue: 602304000, percentOfFund: 1.86, avgHoldingPeriodMonths: 12, lastTransactionDate: "2026-01-05", taxResidency: "Nigeria", email: "b.oladele@channelstv.com", phone: "+234 1 261 0905", isBeneficialOwner: false, isLargeHolder: false },
    { id: "UH-009", fundId: "F001", name: "Heritage Bank Retirees Fund", type: "Pension Fund", kycStatus: "Verified", unitsHeld: 6200000, holdingValue: 777976000, percentOfFund: 2.40, avgHoldingPeriodMonths: 42, lastTransactionDate: "2025-12-20", taxResidency: "Nigeria", email: "a.ofoegbu@heritagefund.ng", phone: "+234 1 279 4000", isBeneficialOwner: false, isLargeHolder: false },
    { id: "UH-010", fundId: "F001", name: "FBNQuest Trustees Ltd", type: "Corporate", kycStatus: "Verified", unitsHeld: 3450000, holdingValue: 432906000, percentOfFund: 1.34, avgHoldingPeriodMonths: 20, lastTransactionDate: "2026-02-01", taxResidency: "Nigeria", email: "canyanwu@fbnquest.com", phone: "+234 1 285 9800", isBeneficialOwner: false, isLargeHolder: false },
    { id: "UH-011", fundId: "F001", name: "Adebayo Fashola", type: "Individual", kycStatus: "Verified", unitsHeld: 2800000, holdingValue: 351344000, percentOfFund: 1.08, avgHoldingPeriodMonths: 14, lastTransactionDate: "2026-01-10", taxResidency: "Nigeria", email: "a.fashola@gmail.com", phone: "+234 701 234 5678", isBeneficialOwner: false, isLargeHolder: false },
    { id: "UH-012", fundId: "F001", name: "Olamide Johnson", type: "Individual", kycStatus: "Pending", unitsHeld: 1500000, holdingValue: 188220000, percentOfFund: 0.58, avgHoldingPeriodMonths: 6, lastTransactionDate: "2026-02-20", taxResidency: "Nigeria", email: "ojohnson@email.com", phone: "+234 802 345 6789", isBeneficialOwner: false, isLargeHolder: false },
    { id: "UH-013", fundId: "F001", name: "Chidinma Eze", type: "Individual", kycStatus: "Verified", unitsHeld: 1200000, holdingValue: 150576000, percentOfFund: 0.46, avgHoldingPeriodMonths: 9, lastTransactionDate: "2026-01-30", taxResidency: "Nigeria", email: "c.eze@yahoo.com", phone: "+234 803 987 6543", isBeneficialOwner: false, isLargeHolder: false },
    { id: "UH-014", fundId: "F001", name: "Taiwo Adeyemo", type: "Individual", kycStatus: "Verified", unitsHeld: 900000, holdingValue: 112932000, percentOfFund: 0.35, avgHoldingPeriodMonths: 4, lastTransactionDate: "2026-02-22", taxResidency: "Nigeria", email: "taiwo.a@gmail.com", phone: "+234 805 111 2222", isBeneficialOwner: false, isLargeHolder: false },
    { id: "UH-015", fundId: "F001", name: "Khadija Abubakar", type: "Individual", kycStatus: "Expired", unitsHeld: 400000, holdingValue: 50192000, percentOfFund: 0.15, avgHoldingPeriodMonths: 3, lastTransactionDate: "2026-02-24", taxResidency: "Nigeria", email: "khadija.a@outlook.com", phone: "+234 806 333 4444", isBeneficialOwner: false, isLargeHolder: false },
  ],
  F002: [
    { id: "UH-020", fundId: "F002", name: "ARM Pension Managers Ltd", type: "Pension Fund", kycStatus: "Verified", unitsHeld: 98000000, holdingValue: 10656520000, percentOfFund: 37.13, avgHoldingPeriodMonths: 60, lastTransactionDate: "2026-02-10", taxResidency: "Nigeria", email: "operations@arm.com.ng", phone: "+234 1 462 3400", isBeneficialOwner: false, isLargeHolder: true },
    { id: "UH-021", fundId: "F002", name: "NLPC Retirement Fund", type: "Pension Fund", kycStatus: "Verified", unitsHeld: 72000000, holdingValue: 7829280000, percentOfFund: 27.28, avgHoldingPeriodMonths: 48, lastTransactionDate: "2026-01-25", taxResidency: "Nigeria", email: "investments@nlpc.com.ng", phone: "+234 1 280 0500", isBeneficialOwner: false, isLargeHolder: true },
    { id: "UH-022", fundId: "F002", name: "Stanbic IBTC AM Ltd", type: "Corporate", kycStatus: "Verified", unitsHeld: 45000000, holdingValue: 4893300000, percentOfFund: 17.05, avgHoldingPeriodMonths: 42, lastTransactionDate: "2026-02-18", taxResidency: "Nigeria", email: "am@stanbicibtc.com", phone: "+234 1 422 3000", isBeneficialOwner: false, isLargeHolder: true },
    { id: "UH-023", fundId: "F002", name: "Heritage Bank Retirees Fund", type: "Pension Fund", kycStatus: "Verified", unitsHeld: 28000000, holdingValue: 3044720000, percentOfFund: 10.61, avgHoldingPeriodMonths: 36, lastTransactionDate: "2026-01-15", taxResidency: "Nigeria", email: "a.ofoegbu@heritagefund.ng", phone: "+234 1 279 4000", isBeneficialOwner: false, isLargeHolder: true },
    { id: "UH-024", fundId: "F002", name: "Zenith Life Insurance", type: "Corporate", kycStatus: "Verified", unitsHeld: 12940000, holdingValue: 1407115600, percentOfFund: 4.90, avgHoldingPeriodMonths: 24, lastTransactionDate: "2026-02-08", taxResidency: "Nigeria", email: "b.adenike@zenithlife.com.ng", phone: "+234 1 292 5800", isBeneficialOwner: false, isLargeHolder: false },
    { id: "UH-025", fundId: "F002", name: "Coronation Asset Management", type: "Corporate", kycStatus: "Verified", unitsHeld: 8000000, holdingValue: 869920000, percentOfFund: 3.03, avgHoldingPeriodMonths: 18, lastTransactionDate: "2026-02-20", taxResidency: "Nigeria", email: "k.lawal@coronationam.com", phone: "+234 1 631 4000", isBeneficialOwner: false, isLargeHolder: false },
  ],
  F003: [
    { id: "UH-030", fundId: "F003", name: "ARM Pension Managers Ltd", type: "Pension Fund", kycStatus: "Verified", unitsHeld: 52000000, holdingValue: 5200000000, percentOfFund: 35.62, avgHoldingPeriodMonths: 36, lastTransactionDate: "2026-02-12", taxResidency: "Nigeria", email: "operations@arm.com.ng", phone: "+234 1 462 3400", isBeneficialOwner: false, isLargeHolder: true },
    { id: "UH-031", fundId: "F003", name: "NLPC Retirement Fund", type: "Pension Fund", kycStatus: "Verified", unitsHeld: 38000000, holdingValue: 3800000000, percentOfFund: 26.03, avgHoldingPeriodMonths: 30, lastTransactionDate: "2026-01-20", taxResidency: "Nigeria", email: "investments@nlpc.com.ng", phone: "+234 1 280 0500", isBeneficialOwner: false, isLargeHolder: true },
    { id: "UH-032", fundId: "F003", name: "Coronation Asset Management", type: "Corporate", kycStatus: "Verified", unitsHeld: 22000000, holdingValue: 2200000000, percentOfFund: 15.07, avgHoldingPeriodMonths: 24, lastTransactionDate: "2026-02-05", taxResidency: "Nigeria", email: "k.lawal@coronationam.com", phone: "+234 1 631 4000", isBeneficialOwner: false, isLargeHolder: true },
    { id: "UH-033", fundId: "F003", name: "Stanbic IBTC AM Ltd", type: "Corporate", kycStatus: "Verified", unitsHeld: 18000000, holdingValue: 1800000000, percentOfFund: 12.33, avgHoldingPeriodMonths: 18, lastTransactionDate: "2026-02-18", taxResidency: "Nigeria", email: "am@stanbicibtc.com", phone: "+234 1 422 3000", isBeneficialOwner: false, isLargeHolder: true },
    { id: "UH-034", fundId: "F003", name: "Zenith Life Insurance", type: "Corporate", kycStatus: "Verified", unitsHeld: 16000000, holdingValue: 1600000000, percentOfFund: 10.96, avgHoldingPeriodMonths: 12, lastTransactionDate: "2026-02-22", taxResidency: "Nigeria", email: "b.adenike@zenithlife.com.ng", phone: "+234 1 292 5800", isBeneficialOwner: false, isLargeHolder: true },
  ],
  F004: [
    { id: "UH-040", fundId: "F004", name: "Stanbic IBTC AM Ltd", type: "Corporate", kycStatus: "Verified", unitsHeld: 28000000, holdingValue: 3226160000, percentOfFund: 33.26, avgHoldingPeriodMonths: 48, lastTransactionDate: "2026-02-14", taxResidency: "Nigeria", email: "am@stanbicibtc.com", phone: "+234 1 422 3000", isBeneficialOwner: false, isLargeHolder: true },
    { id: "UH-041", fundId: "F004", name: "Coronation Asset Management", type: "Corporate", kycStatus: "Verified", unitsHeld: 22000000, holdingValue: 2534840000, percentOfFund: 26.13, avgHoldingPeriodMonths: 36, lastTransactionDate: "2026-02-08", taxResidency: "Nigeria", email: "k.lawal@coronationam.com", phone: "+234 1 631 4000", isBeneficialOwner: false, isLargeHolder: true },
    { id: "UH-042", fundId: "F004", name: "Alhaji Musa Dangiwa", type: "HNW", kycStatus: "Verified", unitsHeld: 12000000, holdingValue: 1382640000, percentOfFund: 14.25, avgHoldingPeriodMonths: 24, lastTransactionDate: "2026-01-28", taxResidency: "Nigeria", email: "m.dangiwa@privatemail.com", phone: "+234 803 456 7890", isBeneficialOwner: false, isLargeHolder: true },
    { id: "UH-043", fundId: "F004", name: "Dr. Ngozi Iweala-Obi", type: "HNW", kycStatus: "Verified", unitsHeld: 8500000, holdingValue: 979370000, percentOfFund: 10.10, avgHoldingPeriodMonths: 18, lastTransactionDate: "2026-02-20", taxResidency: "Nigeria", email: "n.ob@privatemail.com", phone: "+234 805 234 5678", isBeneficialOwner: false, isLargeHolder: true },
    { id: "UH-044", fundId: "F004", name: "FBNQuest Trustees Ltd", type: "Corporate", kycStatus: "Verified", unitsHeld: 13690000, holdingValue: 1577441800, percentOfFund: 16.26, avgHoldingPeriodMonths: 20, lastTransactionDate: "2026-02-01", taxResidency: "Nigeria", email: "canyanwu@fbnquest.com", phone: "+234 1 285 9800", isBeneficialOwner: false, isLargeHolder: true },
  ],
};

export const mockFundTransactions: Record<string, any[]> = {
  F001: [
    { id: "FTX-001", fundId: "F001", holderId: "UH-014", holderName: "Taiwo Adeyemo", type: "Subscription", units: 900000, navPerUnit: 125.48, amount: 112932000, date: "2026-02-22", status: "Completed" },
    { id: "FTX-002", fundId: "F001", holderId: "UH-015", holderName: "Khadija Abubakar", type: "Subscription", units: 400000, navPerUnit: 125.48, amount: 50192000, date: "2026-02-24", status: "Pending" },
    { id: "FTX-003", fundId: "F001", holderId: "UH-012", holderName: "Olamide Johnson", type: "Subscription", units: 1500000, navPerUnit: 119.82, amount: 179730000, date: "2026-02-20", status: "Completed" },
    { id: "FTX-004", fundId: "F001", holderId: "UH-001", holderName: "ARM Pension Managers Ltd", type: "Subscription", units: 5000000, navPerUnit: 119.82, amount: 599100000, date: "2026-02-15", status: "Completed" },
    { id: "FTX-005", fundId: "F001", holderId: "UH-005", holderName: "Coronation Asset Management", type: "Subscription", units: 2000000, navPerUnit: 119.82, amount: 239640000, date: "2026-02-18", status: "Completed" },
    { id: "FTX-006", fundId: "F001", holderId: "UH-007", holderName: "Dr. Ngozi Iweala-Obi", type: "Subscription", units: 800000, navPerUnit: 119.82, amount: 95856000, date: "2026-02-12", status: "Completed" },
    { id: "FTX-007", fundId: "F001", holderId: "UH-002", holderName: "Stanbic IBTC AM Ltd", type: "Redemption", units: 2000000, navPerUnit: 119.82, amount: 239640000, date: "2026-02-10", status: "Completed" },
    { id: "FTX-008", fundId: "F001", holderId: "UH-010", holderName: "FBNQuest Trustees Ltd", type: "Subscription", units: 450000, navPerUnit: 119.82, amount: 53919000, date: "2026-02-01", status: "Completed" },
    { id: "FTX-009", fundId: "F001", holderId: "UH-006", holderName: "Alhaji Musa Dangiwa", type: "Redemption", units: 500000, navPerUnit: 112.48, amount: 56240000, date: "2026-01-20", status: "Completed" },
    { id: "FTX-010", fundId: "F001", holderId: "UH-011", holderName: "Adebayo Fashola", type: "Subscription", units: 800000, navPerUnit: 112.48, amount: 89984000, date: "2026-01-10", status: "Completed" },
    { id: "FTX-011", fundId: "F001", holderId: "UH-008", holderName: "Channels TV Staff Fund", type: "Subscription", units: 1200000, navPerUnit: 106.04, amount: 127248000, date: "2026-01-05", status: "Completed" },
    { id: "FTX-012", fundId: "F001", holderId: "UH-003", holderName: "NLPC Retirement Fund", type: "Distribution", units: 0, navPerUnit: 119.82, amount: 42000000, date: "2026-01-28", status: "Completed" },
  ],
  F002: [
    { id: "FTX-020", fundId: "F002", holderId: "UH-025", holderName: "Coronation Asset Management", type: "Subscription", units: 3000000, navPerUnit: 108.74, amount: 326220000, date: "2026-02-20", status: "Completed" },
    { id: "FTX-021", fundId: "F002", holderId: "UH-022", holderName: "Stanbic IBTC AM Ltd", type: "Subscription", units: 5000000, navPerUnit: 108.74, amount: 543700000, date: "2026-02-18", status: "Completed" },
    { id: "FTX-022", fundId: "F002", holderId: "UH-020", holderName: "ARM Pension Managers Ltd", type: "Subscription", units: 8000000, navPerUnit: 106.82, amount: 854560000, date: "2026-02-10", status: "Completed" },
    { id: "FTX-023", fundId: "F002", holderId: "UH-024", holderName: "Zenith Life Insurance", type: "Subscription", units: 2000000, navPerUnit: 106.82, amount: 213640000, date: "2026-02-08", status: "Completed" },
    { id: "FTX-024", fundId: "F002", holderId: "UH-023", holderName: "Heritage Bank Retirees Fund", type: "Redemption", units: 1500000, navPerUnit: 104.30, amount: 156450000, date: "2026-01-15", status: "Completed" },
  ],
  F003: [
    { id: "FTX-030", fundId: "F003", holderId: "UH-034", holderName: "Zenith Life Insurance", type: "Subscription", units: 5000000, navPerUnit: 100.00, amount: 500000000, date: "2026-02-22", status: "Completed" },
    { id: "FTX-031", fundId: "F003", holderId: "UH-032", holderName: "Coronation Asset Management", type: "Subscription", units: 3000000, navPerUnit: 100.00, amount: 300000000, date: "2026-02-05", status: "Completed" },
    { id: "FTX-032", fundId: "F003", holderId: "UH-033", holderName: "Stanbic IBTC AM Ltd", type: "Subscription", units: 4000000, navPerUnit: 100.00, amount: 400000000, date: "2026-02-18", status: "Completed" },
    { id: "FTX-033", fundId: "F003", holderId: "UH-030", holderName: "ARM Pension Managers Ltd", type: "Subscription", units: 6000000, navPerUnit: 100.00, amount: 600000000, date: "2026-02-12", status: "Completed" },
  ],
  F004: [
    { id: "FTX-040", fundId: "F004", holderId: "UH-043", holderName: "Dr. Ngozi Iweala-Obi", type: "Subscription", units: 2000000, navPerUnit: 115.22, amount: 230440000, date: "2026-02-20", status: "Completed" },
    { id: "FTX-041", fundId: "F004", holderId: "UH-040", holderName: "Stanbic IBTC AM Ltd", type: "Subscription", units: 3000000, navPerUnit: 112.10, amount: 336300000, date: "2026-02-14", status: "Completed" },
    { id: "FTX-042", fundId: "F004", holderId: "UH-041", holderName: "Coronation Asset Management", type: "Subscription", units: 2500000, navPerUnit: 112.10, amount: 280250000, date: "2026-02-08", status: "Completed" },
    { id: "FTX-043", fundId: "F004", holderId: "UH-042", holderName: "Alhaji Musa Dangiwa", type: "Redemption", units: 1000000, navPerUnit: 109.80, amount: 109800000, date: "2026-01-28", status: "Completed" },
  ],
};

export const mockNavComputations: Record<string, any[]> = {
  F001: [
    { id: "NAV-F001-0221", fundId: "F001", date: "2026-02-21", totalAssets: 32464800000, totalLiabilities: 64800000, totalNav: 32400000000, unitsOutstanding: 258250000, navPerUnit: 125.48, previousNav: 124.92, navChange: 0.56, navChangePct: 0.45, status: "Published", computedBy: "Babatunde Adeyemi", approvedBy: "Emeka Nwachukwu", approvalComment: "NAV within tolerance. All prices verified.", approvalDate: "2026-02-21T17:45:00", assetBreakdown: { Equity: 24300000000, "Government Bond": 2953500000, "T-Bill": 1887200000, "Cash & Equivalents": 3259100000, "Accrued Income": 65000000 }, liabilityBreakdown: { "Accrued Management Fee": 40125000, "Accrued Trustee Fee": 4012500, "Other Payables": 16200000, "Redemptions Payable": 4462500 }, toleranceFlags: [] },
    { id: "NAV-F001-0220", fundId: "F001", date: "2026-02-20", totalAssets: 32332000000, totalLiabilities: 64200000, totalNav: 32267800000, unitsOutstanding: 258250000, navPerUnit: 124.92, previousNav: 124.38, navChange: 0.54, navChangePct: 0.43, status: "Published", computedBy: "Babatunde Adeyemi", approvedBy: "Adaeze Okonkwo", approvalComment: "Approved. Minor AIRTELAFRI price decline noted.", approvalDate: "2026-02-20T17:30:00", assetBreakdown: { Equity: 24180000000, "Government Bond": 2950000000, "T-Bill": 1887200000, "Cash & Equivalents": 3249800000, "Accrued Income": 65000000 }, liabilityBreakdown: { "Accrued Management Fee": 39900000, "Accrued Trustee Fee": 3990000, "Other Payables": 16100000, "Redemptions Payable": 4210000 }, toleranceFlags: [] },
    { id: "NAV-F001-0219", fundId: "F001", date: "2026-02-19", totalAssets: 32200000000, totalLiabilities: 63800000, totalNav: 32136200000, unitsOutstanding: 258250000, navPerUnit: 124.38, previousNav: 123.85, navChange: 0.53, navChangePct: 0.43, status: "Published", computedBy: "System", approvedBy: "Emeka Nwachukwu", approvalComment: "Auto-computed. All within tolerance.", approvalDate: "2026-02-19T17:15:00", assetBreakdown: {}, liabilityBreakdown: {}, toleranceFlags: [] },
    { id: "NAV-F001-0218", fundId: "F001", date: "2026-02-18", totalAssets: 32068000000, totalLiabilities: 63500000, totalNav: 32004500000, unitsOutstanding: 258250000, navPerUnit: 123.85, previousNav: 123.20, navChange: 0.65, navChangePct: 0.53, status: "Published", computedBy: "System", approvedBy: "Adaeze Okonkwo", approvalComment: "SEPLAT +3.66% flagged but within sector threshold.", approvalDate: "2026-02-18T17:40:00", assetBreakdown: {}, liabilityBreakdown: {}, toleranceFlags: ["SEPLAT: +3.66% daily change noted"] },
  ],
  F002: [
    { id: "NAV-F002-0221", fundId: "F002", date: "2026-02-21", totalAssets: 28738200000, totalLiabilities: 38200000, totalNav: 28700000000, unitsOutstanding: 263940000, navPerUnit: 108.74, previousNav: 108.42, navChange: 0.32, navChangePct: 0.30, status: "Published", computedBy: "Babatunde Adeyemi", approvedBy: "Emeka Nwachukwu", approvalComment: "Fixed income valuations confirmed with FMDQ.", approvalDate: "2026-02-21T17:50:00", assetBreakdown: { "Government Bond": 17908500000, "T-Bill": 3538000000, "Commercial Paper": 1756000000, "Cash & Equivalents": 5478200000, "Accrued Income": 57500000 }, liabilityBreakdown: { "Accrued Management Fee": 23917000, "Accrued Trustee Fee": 2391700, "Other Payables": 11891300 }, toleranceFlags: [] },
    { id: "NAV-F002-0220", fundId: "F002", date: "2026-02-20", totalAssets: 28680000000, totalLiabilities: 38000000, totalNav: 28642000000, unitsOutstanding: 263940000, navPerUnit: 108.42, previousNav: 108.15, navChange: 0.27, navChangePct: 0.25, status: "Published", computedBy: "System", approvedBy: "Adaeze Okonkwo", approvalComment: "Approved.", approvalDate: "2026-02-20T17:35:00", assetBreakdown: {}, liabilityBreakdown: {}, toleranceFlags: [] },
  ],
  F003: [
    { id: "NAV-F003-0221", fundId: "F003", date: "2026-02-21", totalAssets: 14607300000, totalLiabilities: 7300000, totalNav: 14600000000, unitsOutstanding: 146000000, navPerUnit: 100.00, previousNav: 100.00, navChange: 0, navChangePct: 0, status: "Published", computedBy: "System", approvedBy: "Emeka Nwachukwu", approvalComment: "Money market fund — NAV stable at 100.", approvalDate: "2026-02-21T17:20:00", assetBreakdown: { "T-Bill": 10543500000, "Commercial Paper": 1317000000, "Cash & Equivalents": 2717800000, "Accrued Income": 29000000 }, liabilityBreakdown: { "Accrued Management Fee": 6083000, "Accrued Trustee Fee": 608300, "Other Payables": 608700 }, toleranceFlags: [] },
  ],
  F004: [
    { id: "NAV-F004-0221", fundId: "F004", date: "2026-02-21", totalAssets: 9712150000, totalLiabilities: 12150000, totalNav: 9700000000, unitsOutstanding: 84190000, navPerUnit: 115.22, previousNav: 114.85, navChange: 0.37, navChangePct: 0.32, status: "Published", computedBy: "Babatunde Adeyemi", approvedBy: "Adaeze Okonkwo", approvalComment: "Balanced fund within tolerance.", approvalDate: "2026-02-21T17:55:00", assetBreakdown: { Equity: 139600000, "Government Bond": 3913000000, "T-Bill": 1415400000, "Cash & Equivalents": 4234150000, "Accrued Income": 10000000 }, liabilityBreakdown: { "Accrued Management Fee": 10104200, "Accrued Trustee Fee": 1010420, "Other Payables": 1035380 }, toleranceFlags: [] },
  ],
};

// Utility functions for fund lookups
export function getFundHoldings(fundId: string) {
  return mockFundHoldings[fundId] || [];
}
export function getFundUnitHolders(fundId: string) {
  return mockUnitHolders[fundId] || [];
}
export function getFundTransactions(fundId: string) {
  return mockFundTransactions[fundId] || [];
}
export function getFundNavComputations(fundId: string) {
  return mockNavComputations[fundId] || [];
}
