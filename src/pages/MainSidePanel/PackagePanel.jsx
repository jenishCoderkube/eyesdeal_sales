import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import CustomerTabRow from "../../components/Sidebar/CustomerTabRow";
import LeftSidebar from "../../components/Sidebar/LeftSidebar";
import SelectPackage from "../../components/Sidebar/SelectPackage";
import TopTabBar from "../../components/Sidebar/TopTabBar";
import FramesPanel from "../../components/Frame/FramesPanel"; // New component
import LensesPanel from "../../components/Lense/LensesPanel";
import TopBarSunglasses from "../../components/Sunglasses/TopBarSunglasses";
import SunglassesDetails from "../../components/Sunglasses/SunglassesDetails";
import Sunglasses from "../../components/Sunglasses/Sunglasses";
import TopBarGlasses from "../../components/Frame/TopBarGlasses";
import SunglassesPanel from "../../components/Sunglasses/SunglassesPanel"; // New component

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
    } else if (path.includes("/sales-panel")) {
      setActiveLeftTab("Package");
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
        <div className="flex-1 flex flex-col">
          {isTablet ? (
            <>
              <div className="rounded-lg mx-4 mt-4">
                <TopTabBar
                  activeTab={activeTopTab}
                  setActiveTab={setActiveTopTab}
                />
              </div>
              <SelectPackage />
            </>
          ) : (
            <div className="flex-1 flex flex-col mx-4 mt-1 border border-gray-200 rounded-xl">
              <div>
                <TopTabBar
                  activeTab={activeTopTab}
                  setActiveTab={setActiveTopTab}
                />
              </div>
              <SelectPackage />
            </div>
          )}
        </div>
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
        // <div className="flex-1 flex flex-col">
        //   {isTablet ? (
        //     <>
        //       <div className="rounded-lg mx-4 mt-4">
        //         <TopTabBar
        //           activeTab={activeTopTab}
        //           setActiveTab={setActiveTopTab}
        //         />
        //       </div>
        //       <TopBarSunglasses />
        //       {isSunglassesDetails ? <SunglassesDetails /> : <Sunglasses />}
        //     </>
        //   ) : (
        //     <div className="flex-1 flex flex-col">
        //       <TopBarSunglasses />
        //       {isSunglassesDetails ? <SunglassesDetails /> : <Sunglasses />}
        //     </div>
        //   )}
        // </div>
        <SunglassesPanel
          activeTopTab={activeTopTab}
          setActiveTopTab={setActiveTopTab}
        />
      )}
    </div>
  );
};

export default PackagePanel;
