import React from "react";

const LeftSidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    "Package",
    "Frame",
    "Lenses",
    "Sunglasses",
    "Reading Glasses",
    "Contact Lenses",
    "Solution",
    "Accessories",
    "Logout",
  ];

  return (
    <div className="lg:w-[313px] lg:h-screen bg-white lg:border-r lg:border-l lg:border-gray-200 flex lg:flex-col flex-row overflow-x-auto lg:overflow-x-hidden scrollbar-custom md:rounded-xl md:mt-0 mt-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`flex-shrink-0 w-auto md:w-[200px] lg:w-full h-[60px] lg:h-[74px] flex items-center justify-center px-4 py-2 lg:px-[15px] lg:py-[25px] border-b lg:border-b border-[#E9E9E9] font-poppins font-normal text-[14px] sm:text-[16px] lg:text-[18px] leading-[20px] sm:leading-[22px] lg:leading-[24px] tracking-[0%] transition-colors duration-200 text-center ${
            activeTab === tab
              ? "bg-[#007569] text-white"
              : "text-black hover:bg-gray-100"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default LeftSidebar;
