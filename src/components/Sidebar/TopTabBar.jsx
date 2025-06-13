import React, { useRef, useEffect, useState } from "react";

const TopTabBar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    "BOGO Package",
    "Standard Package",
    "Super Package",
    "Premium Package",
  ];

  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef([]);

  useEffect(() => {
    const activeIndex = tabs.indexOf(activeTab);
    const activeTabElement = tabRefs.current[activeIndex];

    if (activeTabElement) {
      const { offsetLeft, offsetWidth } = activeTabElement;
      setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeTab]);

  return (
    <div className="w-full h-auto flex lg:gap-0  gap-3 flex-wrap  relative">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          ref={(el) => (tabRefs.current[index] = el)}
          onClick={() => setActiveTab(tab)}
          className={`flex-shrink-0 w-[48%] sm:w-[49%] lg:w-1/4 h-[54px] flex items-center justify-center px-4 py-3 font-poppins font-medium text-[14px] sm:text-[16px] lg:text-[18px] leading-[24px] tracking-[0%] transition-colors duration-200 ${
            activeTab === tab
              ? "text-black lg:border-b-0 lg:border-none border-2 lg:rounded-none rounded-xl border-[#E77817]"
              : "text-gray-500 hover:text-black lg:border-none border-2 lg:rounded-none rounded-xl border-[#E9E9E9]"
          }`}
        >
          {tab}
        </button>
      ))}
      <div
        className="absolute bottom-0 h-[2px] bg-[#E77817] transition-all duration-300 ease-in-out hidden lg:block"
        style={{
          left: `${underlineStyle.left}px`,
          width: `${underlineStyle.width}px`,
        }}
      />
    </div>
  );
};

export default TopTabBar;
