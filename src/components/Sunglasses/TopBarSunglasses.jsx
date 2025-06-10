import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const TopBarSunglasses = ({
  frameTypes,
  materials,

  brands,
  loading,
  error,
  onFilterChange,
}) => {
  const [isFrameTypeOpen, setIsFrameTypeOpen] = useState(false);
  const [isMaterialOpen, setIsMaterialOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // console.log("TopBarSunglasses rendered with frameTypes:", frameTypes);

  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onFilterChange({ search: query }); // Trigger filter change for search
  };

  // Handle dropdown item clicks
  const handleFrameTypeSelect = (id, name) => {
    setIsFrameTypeOpen(false);
    onFilterChange({ frameType: id });
  };

  const handleMaterialSelect = (id, name) => {
    setIsMaterialOpen(false);
    onFilterChange({ frameMaterial: id });
  };

  const handleBrandSelect = (id, name) => {
    setIsBrandOpen(false);
    onFilterChange({ brand: id });
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setIsFrameTypeOpen(false);
    setIsMaterialOpen(false);
    setIsBrandOpen(false);
    onFilterChange({
      frameType: "",
      frameMaterial: "",
      brand: "",
      search: "",
    });
  };

  return (
    <div className="flex md:flex-nowrap md:gap-y-0 gap-y-3 flex-wrap items-center justify-between w-full p-2 border-b border-gray-200 bg-white">
      {/* Search Bar */}
      <div className="relative flex items-center w-full md:w-1/4 lg:w-1/2">
        <FiSearch
          size={24}
          className="absolute top-[10px] left-3 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search barcode..."
          className="w-full pl-10 pr-4 py-2 rounded-lg md:border-none border border-gray-300 focus:outline-none md:ring-0 focus:ring-2 focus:ring-blue-500 font-poppins font-normal text-[18px] leading-[24px] text-[#667085]"
        />
      </div>
      {/* Dropdowns */}
      <div className="flex sm:flex-nowrap flex-wrap gap-y-3 items-center md:justify-end sm:justify-between sm:gap-x-0 gap-x-2 w-full md:space-x-4">
        {/* Frame Type Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setIsFrameTypeOpen(true)}
          onMouseLeave={() => setIsFrameTypeOpen(false)}
        >
          <button className="flex text-nowrap md:border-none border border-[#E2E2E2] rounded-3xl md:px-0 px-2 items-center font-poppins font-normal md:text-[18px] text-[15px] leading-[24px] text-[#242424] py-2">
            Frame Type
            {isFrameTypeOpen ? (
              <IoMdArrowDropup className="ml-[3px] w-5 h-5" />
            ) : (
              <IoMdArrowDropdown className="ml-[3px] w-5 h-5" />
            )}
          </button>
          {isFrameTypeOpen && (
            <div className="absolute z-10 mt-0 w-40 bg-white border border-gray-200 rounded-lg shadow-lg max-h-[300px] overflow-y-auto">
              {loading ? (
                <div className="px-4 py-2 text-sm text-gray-700">
                  Loading...
                </div>
              ) : error ? (
                <div className="px-4 py-2 text-sm text-red-500">{error}</div>
              ) : frameTypes.length === 0 ? (
                <div className="px-4 py-2 text-sm text-gray-700">
                  No frame types available
                </div>
              ) : (
                frameTypes.map((type) => (
                  <button
                    key={type._id}
                    onClick={() => handleFrameTypeSelect(type._id, type.name)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {type.name}
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* Material Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setIsMaterialOpen(true)}
          onMouseLeave={() => setIsMaterialOpen(false)}
        >
          <button className="flex md:border-none border border-[#E2E2E2] rounded-3xl md:px-0 px-2 items-center font-poppins font-normal md:text-[18px] text-[15px] leading-[24px] text-[#242424] py-2">
            Material
            {isMaterialOpen ? (
              <IoMdArrowDropup className="ml-[3px] w-5 h-5" />
            ) : (
              <IoMdArrowDropdown className="ml-[3px] w-5 h-5" />
            )}
          </button>
          {isMaterialOpen && (
            <div className="absolute z-10 mt-0 w-40 bg-white border border-gray-200 rounded-lg shadow-lg max-h-[300px] overflow-y-auto">
              {loading ? (
                <div className="px-4 py-2 text-sm text-gray-700">
                  Loading...
                </div>
              ) : error ? (
                <div className="px-4 py-2 text-sm text-red-500">{error}</div>
              ) : materials.length === 0 ? (
                <div className="px-4 py-2 text-sm text-gray-700">
                  No materials available
                </div>
              ) : (
                materials.map((material) => (
                  <button
                    key={material._id}
                    onClick={() =>
                      handleMaterialSelect(material._id, material.name)
                    }
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {material.name}
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* Brand Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setIsBrandOpen(true)}
          onMouseLeave={() => setIsBrandOpen(false)}
        >
          <button className="flex md:border-none border border-[#E2E2E2] rounded-3xl md:px-0 px-2 items-center font-poppins font-normal md:text-[18px] text-[15px] leading-[24px] text-[#242424] py-2">
            Brand
            {isBrandOpen ? (
              <IoMdArrowDropup className="ml-[3px] w-5 h-5" />
            ) : (
              <IoMdArrowDropdown className="ml-[3px] w-5 h-5" />
            )}
          </button>
          {isBrandOpen && (
            <div className="absolute z-10 mt-0 w-40 bg-white border border-gray-200 rounded-lg shadow-lg max-h-[300px] overflow-y-auto">
              {loading ? (
                <div className="px-4 py-2 text-sm text-gray-700">
                  Loading...
                </div>
              ) : error ? (
                <div className="px-4 py-2 text-sm text-red-500">{error}</div>
              ) : brands.length === 0 ? (
                <div className="px-4 py-2 text-sm text-gray-700">
                  No brands available
                </div>
              ) : (
                brands.map((brand) => (
                  <button
                    key={brand._id}
                    onClick={() => handleBrandSelect(brand._id, brand.name)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {brand.name}
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* Super Package Button */}
        <button className="font-poppins text-nowrap md:border-none border border-[#E2E2E2] rounded-3xl md:px-0 px-2 font-normal md:text-[18px] text-[15px] leading-[24px] text-[#242424] py-2 hover:text-blue-600">
          Super Package
        </button>

        {/* Premium Package Button */}
        <button className="font-poppins text-nowrap md:border-none border border-[#E2E2E2] rounded-3xl md:px-0 px-2 font-normal md:text-[18px] text-[15px] leading-[24px] text-[#242424] py-2 hover:text-blue-600">
          Premium fluctuating
        </button>
      </div>
    </div>
  );
};

export default TopBarSunglasses;
