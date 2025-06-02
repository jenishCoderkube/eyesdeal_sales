import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation, useParams } from "react-router-dom";
import Frame from "../../components/Frame/Frame";
import FrameDetails from "../../components/Frame/FrameDetails";
import CustomerTabRow from "../../components/Sidebar/CustomerTabRow";
import LeftSidebar from "../../components/Sidebar/LeftSidebar";
import SelectPackage from "../../components/Sidebar/SelectPackage";
import TopTabBar from "../../components/Sidebar/TopTabBar";
import TopBarGlasses from "../../components/Frame/TopBarGlasses";

const PackagePanel = () => {
  const [activeLeftTab, setActiveLeftTab] = useState("Frame");
  const [activeTopTab, setActiveTopTab] = useState("BOGO Package");
  const location = useLocation();
  const { id } = useParams();

  // Media query to detect tablet screens (≤1024px)
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  // Check if the current route is a FrameDetails route
  const isFrameDetails = location.pathname.startsWith("/frame/details");

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <div>
        <CustomerTabRow />
      </div>
      <LeftSidebar activeTab={activeLeftTab} setActiveTab={setActiveLeftTab} />

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
        <div className="flex-1 flex flex-col">
          {isTablet ? (
            <>
              <div className="rounded-lg mx-4 mt-4">
                <TopTabBar
                  activeTab={activeTopTab}
                  setActiveTab={setActiveTopTab}
                />
              </div>
              <TopBarGlasses />
              {isFrameDetails ? <FrameDetails /> : <Frame />}
            </>
          ) : (
            <div className="flex-1 flex flex-col mx-4 mt-1 border border-gray-200 rounded-xl">
              <TopBarGlasses />
              {isFrameDetails ? <FrameDetails /> : <Frame />}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PackagePanel;
