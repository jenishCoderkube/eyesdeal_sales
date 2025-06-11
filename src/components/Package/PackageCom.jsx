import React from "react";
import TopTabBar from "../Sidebar/TopTabBar";
import SelectPackage from "../Sidebar/SelectPackage";
import { useMediaQuery } from "react-responsive";

const PackageCom = ({ activeTopTab, setActiveTopTab }) => {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  return (
    <div className="flex-1 flex flex-col">
      {isTablet ? (
        <>
          <div className="rounded-lg mx-4 mt-4">
            <TopTabBar
              activeTab={activeTopTab}
              setActiveTab={setActiveTopTab}
            />
          </div>
          <SelectPackage activeTopTab={activeTopTab} />
        </>
      ) : (
        <div className="flex-1 flex flex-col mx-4 mt-1 border border-gray-200 rounded-xl">
          <div>
            <TopTabBar
              activeTab={activeTopTab}
              setActiveTab={setActiveTopTab}
            />
          </div>
          <SelectPackage activeTopTab={activeTopTab} />
        </div>
      )}
    </div>
  );
};

export default PackageCom;
