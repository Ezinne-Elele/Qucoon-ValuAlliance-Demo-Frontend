import { Switch, Route, Redirect } from "wouter";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Trades from "./pages/Trades";
import Portfolio from "./pages/Portfolio";
import PortfolioDetail from "./pages/PortfolioDetail";
import Settlement from "./pages/Settlement";
import Valuation from "./pages/Valuation";
import FundAccounting from "./pages/FundAccounting";
import FundDetail from "./pages/FundDetail";
import Fees from "./pages/Fees";
import Reconciliation from "./pages/Reconciliation";
import RiskCompliance from "./pages/RiskCompliance";
import RegulatoryReturns from "./pages/RegulatoryReturns";
import Performance from "./pages/Performance";
import ClientManagement from "./pages/ClientManagement";
import ClientDetail from "./pages/ClientDetail";
import UserManagement from "./pages/UserManagement";
import AuditLog from "./pages/AuditLog";
import Notifications from "./pages/Notifications";
import Documents from "./pages/Documents";
import CorporateActions from "./pages/CorporateActions";
import AuthorizationQueue from "./pages/AuthorizationQueue";
import { Toaster } from "@/components/ui/toaster";

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <Redirect to="/login" />} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/portfolio/:id" component={PortfolioDetail} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/fund/:id" component={FundDetail} />
      <Route path="/trades" component={Trades} />
      <Route path="/settlement" component={Settlement} />
      <Route path="/valuation" component={Valuation} />
      <Route path="/fund-accounting" component={FundAccounting} />
      <Route path="/fees" component={Fees} />
      <Route path="/reconciliation" component={Reconciliation} />
      <Route path="/risk-compliance" component={RiskCompliance} />
      <Route path="/regulatory-returns" component={RegulatoryReturns} />
      <Route path="/performance" component={Performance} />
      <Route path="/client-management/:id" component={ClientDetail} />
      <Route path="/client-management" component={ClientManagement} />
      <Route path="/client-reports" component={() => <Redirect to="/client-management" />} />
      <Route path="/users" component={UserManagement} />
      <Route path="/audit-log" component={AuditLog} />
      <Route path="/notifications" component={Notifications} />
      <Route path="/documents" component={Documents} />
      <Route path="/corporate-actions" component={CorporateActions} />
      <Route path="/authorization-queue" component={AuthorizationQueue} />

      {/* Fallback */}
      <Route>
        <div className="flex h-screen items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-navy-900 mb-2">404</h1>
            <p className="text-gray-500 mb-4">Module not found</p>
            <a href="/dashboard" className="text-gold-600 hover:underline">Return to Dashboard</a>
          </div>
        </div>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <>
      <Toaster />
      <Router />
    </>
  );
}

export default App;
