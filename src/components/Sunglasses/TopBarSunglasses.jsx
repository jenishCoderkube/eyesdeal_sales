import React, { useState } from "react";
import { FiSearch, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
const TopBarSunglasses = () => {
  const [isFrameTypeOpen, setIsFrameTypeOpen] = useState(false);
  const [isMaterialOpen, setIsMaterialOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);

  const frameTypes = ["Full Rim", "Half Rim", "Rimless"];
  const materials = ["Metal", "Acetate", "Titanium"];
  const brands = ["Ray-Ban", "Oakley", "Gucci"];

  return (
    <div className="flex md:flex-nowrap md:gap-y-0 gap-y-3 flex-wrap items-center justify-between w-full p-2 border-b border-gray-200 bg-white">
      {/* Search Bar */}
      <div className="relative flex items-center w-full md:w-1/4 lg:w-1/2">
        <FiSearch
          size={20}
          className="absolute top-[10px] left-3 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search barcode..."
          className="w-full pl-10 pr-4 py-2 rounded-lg md:border-none border border-gray-300 focus:outline-none md:ring-0  focus:ring-2 focus:ring-blue-500 font-poppins font-normal text-[18px] leading-[24px] text-[#667085]"
        />
      </div>

      {/* Dropdowns */}
      <div className="flex sm:flex-nowrap flex-wrap gap-y-3 items-center md:justify-end sm:justify-between sm:gap-x-0 gap-x-2  w-full md:space-x-4">
        {/* Frame Type Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setIsFrameTypeOpen(true)}
          onMouseLeave={() => setIsFrameTypeOpen(false)}
        >
          <button className="flex text-nowrap md:border-none border border-[#E2E2E2] rounded-3xl md:px-0 px-2 items-center font-poppins font-normal md:text-[18px] text-[15px] leading-[24px]  text-[#242424]  py-2  ">
            Frame Type
            {isFrameTypeOpen ? (
              <IoMdArrowDropup className="ml-[3px] w-5 h-5" />
            ) : (
              <IoMdArrowDropdown className="ml-[3px] w-5 h-5" />
            )}
          </button>
          {isFrameTypeOpen && (
            <div className="absolute z-10 mt-0 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
              {frameTypes.map((type, index) => (
                <a
                  key={index}
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {type}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Material Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setIsMaterialOpen(true)}
          onMouseLeave={() => setIsMaterialOpen(false)}
        >
          <button className="flex  md:border-none border border-[#E2E2E2] rounded-3xl md:px-0 px-2  items-center font-poppins font-normal md:text-[18px] text-[15px] leading-[24px]  text-[#242424]  py-2  ">
            Material
            {isMaterialOpen ? (
              <IoMdArrowDropup className="ml-[3px] w-5 h-5" />
            ) : (
              <IoMdArrowDropdown className="ml-[3px] w-5 h-5" />
            )}
          </button>
          {isMaterialOpen && (
            <div className="absolute z-10 mt-0 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
              {materials.map((material, index) => (
                <a
                  key={index}
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {material}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Brand Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setIsBrandOpen(true)}
          onMouseLeave={() => setIsBrandOpen(false)}
        >
          <button className="flex  md:border-none border border-[#E2E2E2] rounded-3xl md:px-0 px-2 items-center font-poppins font-normal md:text-[18px] text-[15px] leading-[24px] text-[#242424]  py-2 ">
            Brand
            {isBrandOpen ? (
              <IoMdArrowDropup className="ml-[3px] w-5 h-5" />
            ) : (
              <IoMdArrowDropdown className="ml-[3px] w-5 h-5" />
            )}
          </button>
          {isBrandOpen && (
            <div className="absolute z-10 mt-0 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
              {brands.map((brand, index) => (
                <a
                  key={index}
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {brand}
                </a>
              ))}
            </div>
          )}
        </div>

     
      </div>
    </div>
  );
};

export default TopBarSunglasses;
