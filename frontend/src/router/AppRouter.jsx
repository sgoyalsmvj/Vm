import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import PageLoader from "../components/PageLoader";

const auth = JSON.parse(localStorage.getItem("auth"));
const permissions = auth ? auth.permissions : null;

const Dashboard = lazy(() =>
  import(/*webpackChunkName:'DashboardPage'*/ "../pages/Dashboard")
);
const Admin = lazy(() =>
  import(/*webpackChunkName:'AdminPage'*/ "../pages/Admin")
);

const Customer = lazy(() =>
  import(/*webpackChunkName:'CustomerPage'*/ "../pages/Customer")
);

const SelectCustomer = lazy(() =>
  import(/*webpackChunkName:'SelectCustomerPage'*/ "../pages/SelectCustomer")
);

const Lead = lazy(() => import(/*webpackChunkName:'LeadPage'*/ "../pages/Jobs"));
const Role = lazy(() => import(/*webpackChunkName:'LeadPage'*/ "../pages/Role"));
const Product = lazy(() =>
  import(/*webpackChunkName:'ProductPage'*/ "../pages/Product")
);

const Report = lazy(() => import(/*webpackChunkName:'ReportPage'*/ "../pages/Report"))

const Logout = lazy(() =>
  import(/*webpackChunkName:'LogoutPage'*/ "../pages/Logout")
);
const NotFound = lazy(() =>
  import(/*webpackChunkName:'NotFoundPage'*/ "../pages/NotFound")
);

export default function AppRouter() {
  const location = useLocation();
  const superadmin = permissions == 'superadmin';

  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <PrivateRoute path="/" component={Dashboard} exact />
          {
            (
              superadmin ||
              [...permissions['view'], ...permissions['update'], ...permissions['delete'], ...permissions['create']].includes('vendor')
            ) &&
            (<PrivateRoute component={Customer} path="/vendor" exact />)
          }
          <PrivateRoute component={SelectCustomer} path="/selectcustomer" exact />
          {
            (
              superadmin ||
              [...permissions['view'], ...permissions['update'], ...permissions['delete'], ...permissions['create']].includes('job')
            ) &&
            (<PrivateRoute component={Lead} path="/lead" exact />)
          }
          {
            (
              superadmin ||
              [...permissions['view'], ...permissions['update'], ...permissions['delete'], ...permissions['create']].includes('role')
            ) &&
            (<PrivateRoute component={Role} path="/role" exact />)
          }
          {
            (
              superadmin ||
              [...permissions['view'], ...permissions['update'], ...permissions['delete'], ...permissions['create']].includes('service')
            ) &&
            (<PrivateRoute component={Product} path="/product" exact />)
          }
          {
            (
              superadmin ||
              [...permissions['view'], ...permissions['update'], ...permissions['delete'], ...permissions['create']].includes('admin')
            ) &&
            (<PrivateRoute component={Admin} path="/admin" exact />)
          }

          {
            superadmin
            && (<PrivateRoute component={Report} path="/report" exact />)
          }
          <PrivateRoute component={Logout} path="/logout" exact />
          <PublicRoute path="/login" render={() => <Navigate to="/" />} />
          <Route path="*" component={NotFound} render={() => <Navigate to="/notfound" />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}
