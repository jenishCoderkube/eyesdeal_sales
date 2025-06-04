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
import Lense from "../../components/Lense/Lense";
import LenseDetails from "../../components/Lense/LenseDetails";
import TopBarSunglasses from "../../components/Sunglasses/TopBarSunglasses";
import SunglassesDetails from "../../components/Sunglasses/SunglassesDetails";
import Sunglasses from "../../components/Sunglasses/Sunglasses";

const PackagePanel = () => {
  const [activeLeftTab, setActiveLeftTab] = useState("Frame");
  const [activeTopTab, setActiveTopTab] = useState("BOGO Package");
  const location = useLocation();
  const { id } = useParams();

  // Media query to detect tablet screens (≤1024px)
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  // Check if the current route is a FrameDetails route
  const isFrameDetails = location.pathname.startsWith("/frame/details");
  // Check if the current route is a LenseDetails route
  const isLenseDetails = location.pathname.startsWith("/lense/details");
  // Check if the current route is a SunglassesDetails route
  const isSunglassesDetails = location.pathname.startsWith("/Sunglasses/details");
  console.log(isSunglassesDetails,"true or false");
  

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
      {activeLeftTab === "Lenses" && (
        <div className="flex-1 flex flex-col">
          {isTablet ? (
            <>
              <div className="rounded-lg mx-4 mt-4">
                <TopTabBar
                  activeTab={activeTopTab}
                  setActiveTab={setActiveTopTab}
                />
              </div>
              {isLenseDetails ? <LenseDetails /> : <Lense />}
            </>
          ) : (
            <div className="flex-1 flex flex-col mx-4 mt-1 border border-gray-200 rounded-xl">
              {isLenseDetails ? <LenseDetails /> : <Lense />}
            </div>
          )}
        </div>
      )}
      {activeLeftTab === "Sunglasses" && (
        <div className="flex-1 flex flex-col">
          {isTablet ? (
            <>
              <div className="rounded-lg mx-4 mt-4">
                <TopTabBar
                  activeTab={activeTopTab}
                  setActiveTab={setActiveTopTab}
                />
              </div>
              <TopBarSunglasses />
              {isSunglassesDetails ? <SunglassesDetails /> : <Sunglasses />}
            </>
          ) : (
            <div className="flex-1 flex flex-col mx-4 mt-1 border border-gray-200 rounded-xl">
              <TopBarSunglasses />
              {isSunglassesDetails ? <SunglassesDetails /> : <Sunglasses />}
            </div>
          )}
        </div>
      )}
      
    </div>
  );
};

export default PackagePanel;
