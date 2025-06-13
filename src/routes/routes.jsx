import Frame from "../components/Frame/Frame";
import FrameDetails from "../components/Frame/FrameDetails";
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
  {
    title: "SalesPackageFrame",
    path: "/sales-panel/frame",
    element: (
      <PrivateRoute>
        <PackagePanel />
      </PrivateRoute>
    ),
  },
  {
    title: "SalesPackageLens",
    path: "/sales-panel/lens",
    element: (
      <PrivateRoute>
        <PackagePanel />
      </PrivateRoute>
    ),
  },
  {
    title: "SalesPackageSunglasses",
    path: "/sales-panel/sunglasses",
    element: (
      <PrivateRoute>
        <PackagePanel />
      </PrivateRoute>
    ),
  },
  {
    title: "FrameDetails",
    path: "/frame/details/:id",
    element: (
      <PrivateRoute>
        <PackagePanel />
      </PrivateRoute>
    ),
  },
  {
    title: "ReadingGlassDetails",
    path: "/reading-glass/details/:id",
    element: (
      <PrivateRoute>
        <PackagePanel />
      </PrivateRoute>
    ),
  },
  {
    title: "ContactLensDetails",
    path: "/contact-lens/details/:id",
    element: (
      <PrivateRoute>
        <PackagePanel />
      </PrivateRoute>
    ),
  },
  {
    title: "sunglassesDetails",
    path: "/sunglasses/details/:id",
    element: (
      <PrivateRoute>
        <PackagePanel />
      </PrivateRoute>
    ),
  },
  {
    title: "LensDetails",
    path: "/sales-panel/lens/:id",
    element: (
      <PrivateRoute>
        <PackagePanel />
      </PrivateRoute>
    ),
  },
  {
    title: "LensDetails",
    path: "/sales-panel/readingGlasses",
    element: (
      <PrivateRoute>
        <PackagePanel />
      </PrivateRoute>
    ),
  },
  {
    title: "LensDetails",
    path: "/sales-panel/readingGlasses/:id",
    element: (
      <PrivateRoute>
        <PackagePanel />
      </PrivateRoute>
    ),
  },
  {
    title: "ContactLenses",
    path: "/sales-panel/contactLenses",
    element: (
      <PrivateRoute>
        <PackagePanel />
      </PrivateRoute>
    ),
  },
  {
    title: "ContactLenses",
    path: "/sales-panel/contactLenses/:id",
    element: (
      <PrivateRoute>
        <PackagePanel />
      </PrivateRoute>
    ),
  },
  {
    title: "Cart",
    path: "/sales-panel/cart",
    element: (
      <PrivateRoute>
        <PackagePanel />
      </PrivateRoute>
    ),
  },
];

export default routes;
