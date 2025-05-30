import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import LeftSidebar from "../../components/Sidebar/LeftSidebar";
import TopTabBar from "../../components/Sidebar/TopTabBar";
import CustomerTabRow from "../../components/Sidebar/CustomerTabRow";
import SelectPackage from "../../components/Sidebar/SelectPackage";

const PackagePanel = () => {
  const [activeLeftTab, setActiveLeftTab] = useState("Package");
  const [activeTopTab, setActiveTopTab] = useState("BOGO Package");

  // Media query to detect tablet screens (≤1024px)
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  // Placeholder for center content based on active tabs
  const renderCenterContent = () => {
    return (
      <div className="">
        <SelectPackage />
      </div>
    );
  };

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
              <div className=" rounded-lg mx-4 mt-4">
                <TopTabBar
                  activeTab={activeTopTab}
                  setActiveTab={setActiveTopTab}
                />
              </div>
              {renderCenterContent()}
            </>
          ) : (
            <div className="flex-1 flex flex-col mx-4 mt-1 border border-gray-200 rounded-xl">
              <div className="">
                <TopTabBar
                  activeTab={activeTopTab}
                  setActiveTab={setActiveTopTab}
                />
              </div>
              {renderCenterContent()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PackagePanel;
