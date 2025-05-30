import Dashboard from "../pages/Home/Dashboard/Dashboard";
import PackagePanel from "../pages/MainSidePanel/PackagePanel";
import PrivateRoute from "./RouteProtection";

const routes = [
  {
    title: "Dashboard",
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    title: "SalesPackage",
    path: "/sales-panel",
    element: (
      <PrivateRoute>
        <PackagePanel />
      </PrivateRoute>
    ),
  },
];

export default routes;
