import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ContactLensPanel from "../../components/ContactLens/ContactLensPanel";
import FramesPanel from "../../components/Frame/FramesPanel";
import LensesPanel from "../../components/Lense/LensesPanel";
import PackageCom from "../../components/Package/PackageCom";
import CustomerTabRow from "../../components/Sidebar/CustomerTabRow";
import LeftSidebar from "../../components/Sidebar/LeftSidebar";
import SunglassesPanel from "../../components/Sunglasses/SunglassesPanel";
// import GlassPanel from "../../components/ReadingGlass/GlassPanel";
import ReadingGlassesPanel from "../../components/ReadingGlass/ReadingGlassesPanel";
import CartPanel from "../../components/CartComponent/Cartpanel";

const PackagePanel = () => {
  const [activeLeftTab, setActiveLeftTab] = useState("Package");
  const [activeTopTab, setActiveTopTab] = useState("BOGO Package");
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isSunglassesDetails = location.pathname.startsWith(
    "/sunglasses/details"
  );

  // Set initial active tab based on URL
  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/frame")) {
      setActiveLeftTab("Frame");
    } else if (path.includes("/lens")) {
      setActiveLeftTab("Lenses");
    } else if (path.includes("/sunglasses")) {
      setActiveLeftTab("Sunglasses");
    } else if (path.includes("/readingGlasses")) {
      setActiveLeftTab("Reading Glasses");
    } else if (path.includes("/contactLenses")) {
      setActiveLeftTab("Contact Lenses");
    } else if (path.includes("/sales-panel")) {
      setActiveLeftTab("Package");
    } else if (path.includes("/cart")) {
      setActiveLeftTab("cart");
    }
  }, [location.pathname]);

  // Handle tab changes
  const handleTabChange = (tab) => {
    setActiveLeftTab(tab);
    switch (tab) {
      case "Frame":
        navigate("/sales-panel/frame");
        break;
      case "Lenses":
        navigate("/sales-panel/lens");
        break;
      case "Sunglasses":
        navigate("/sales-panel/sunglasses");
        break;
      case "Package":
        navigate("/sales-panel");
        break;
      case "Reading Glasses":
        navigate("/sales-panel/readingGlasses");
        break;
      case "Contact Lenses":
        navigate("/sales-panel/contactLenses");
        break;
      case "Logout":
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        navigate("/login");
        break;
      default:
        navigate("/sales-panel");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <div>
        <CustomerTabRow />
      </div>
      <LeftSidebar activeTab={activeLeftTab} setActiveTab={handleTabChange} />

      {activeLeftTab === "Package" && (
        <PackageCom
          activeTopTab={activeTopTab}
          setActiveTopTab={setActiveTopTab}
        />
      )}
      {activeLeftTab === "Frame" && (
        <FramesPanel
          activeTopTab={activeTopTab}
          setActiveTopTab={setActiveTopTab}
        />
      )}
      {activeLeftTab === "Lenses" && (
        <LensesPanel
          activeTopTab={activeTopTab}
          setActiveTopTab={setActiveTopTab}
        />
      )}
      {activeLeftTab === "Sunglasses" && (
        <SunglassesPanel
          activeTopTab={activeTopTab}
          setActiveTopTab={setActiveTopTab}
        />
      )}
      {activeLeftTab === "Reading Glasses" && (
        <ReadingGlassesPanel
          activeTopTab={activeTopTab}
          setActiveTopTab={setActiveTopTab}
        />
      )}
      {activeLeftTab === "Contact Lenses" && (
        <ContactLensPanel
          activeTopTab={activeTopTab}
          setActiveTopTab={setActiveTopTab}
        />
      )}
      {activeLeftTab === "Accessories" && <CartPanel />}
    </div>
  );
};

export default PackagePanel;
