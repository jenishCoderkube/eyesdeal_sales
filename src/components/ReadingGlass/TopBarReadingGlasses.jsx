import React, { useState, useCallback } from "react";
import { FiSearch, FiCheck } from "react-icons/fi";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { debounce } from "lodash";

const TopBarReadingGlasses = ({
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
  const [selectedFrameType, setSelectedFrameType] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Create a debounced search function
  const debouncedSearch = useCallback(
    debounce((value) => {
      onFilterChange({ search: value });
    }, 500),
    [onFilterChange]
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  // Handle frame type selection/unselection
  const handleFrameTypeSelect = (id) => {
    if (selectedFrameType === id) {
      setSelectedFrameType(null);
      onFilterChange({ frameType: null });
    } else {
      setSelectedFrameType(id);
      onFilterChange({ frameType: id });
    }
    setIsFrameTypeOpen(false);
  };

  // Handle material selection/unselection
  const handleMaterialSelect = (id) => {
    if (selectedMaterial === id) {
      setSelectedMaterial(null);
      onFilterChange({ frameMaterial: null });
    } else {
      setSelectedMaterial(id);
      onFilterChange({ frameMaterial: id });
    }
    setIsMaterialOpen(false);
  };

  // Handle brand selection/unselection
  const handleBrandSelect = (id) => {
    if (selectedBrand === id) {
      setSelectedBrand(null);
      onFilterChange({ brand: null });
    } else {
      setSelectedBrand(id);
      onFilterChange({ brand: id });
    }
    setIsBrandOpen(false);
  };

  // Optional: Handle clear selection
  const handleClearFrameType = () => {
    setSelectedFrameType(null);
    onFilterChange({ frameType: null });
    setIsFrameTypeOpen(false);
  };

  return (
    <div className="flex md:flex-nowrap md:gap-y-0 gap-y-3 flex-wrap items-center justify-between w-full p-2 border-b border-gray-200 bg-white">
      {/* Search Bar */}
      <div className="relative flex items-center lg:px-0 px-2 w-full xl:w-1/4 lg:w-1/2">
        <FiSearch
          size={24}
          className="absolute top-[8px] lg:left-2 left-4 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search barcode..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2 rounded-lg md:border-none border border-gray-300 focus:outline-none md:ring-0 focus:ring-2 focus:ring-blue-500 font-poppins font-normal text-[18px] leading-[24px] text-[#667085]"
        />
      </div>

      {/* Dropdowns */}
       <div className="flex sm:flex-nowrap flex-wrap gap-y-3 lg:px-0 px-2 items-center xl:justify-end lg:justify-between  gap-x-2 w-full lg:space-x-4">
        {/* Frame Type Dropdown */}
       
      <div className="relative">
        <button
          onClick={() => setIsFrameTypeOpen(!isFrameTypeOpen)}
          className="flex items-center gap-2 lg:px-0 px-4 py-2 border lg:border-none rounded-3xl lg:rounded-lg hover:bg-gray-50"
        >
          <span>Frame Type</span>
          {isFrameTypeOpen ? (
            <IoMdArrowDropup className="text-gray-500 lg:w-[25px] w-[20px] lg:h-[25px] h-[20px]"/>
          ) : (
            <IoMdArrowDropdown className="text-gray-500 lg:w-[25px] w-[20px] lg:h-[25px] h-[20px]" />
          )}
        </button>
        {isFrameTypeOpen && (
          <div className="absolute z-10 mt-0 w-40 bg-white border  rounded-lg shadow-lg max-h-[300px] overflow-y-auto">
            {loading ? (
              <div className="px-4 py-2 text-sm text-gray-700">Loading...</div>
            ) : error ? (
              <div className="px-4 py-2 text-sm text-red-500">{error}</div>
            ) : frameTypes.length === 0 ? (
              <div className="px-4 py-2 text-sm text-gray-700">
                No frame types available
              </div>
            ) : (
              <>
                {selectedFrameType && (
                  <button
                    onClick={handleClearFrameType}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Clear
                  </button>
                )}
                {frameTypes.map((type) => (
                  <button
                    key={type._id}
                    onClick={() => handleFrameTypeSelect(type._id)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    {selectedFrameType === type._id && (
                      <FiCheck className="mr-2 text-blue-500" />
                    )}
                    {type.name}
                  </button>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {/* Material Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsMaterialOpen(!isMaterialOpen)}
          className="flex items-center gap-2 lg:px-0 px-4 py-2 border lg:border-none rounded-3xl border-gray-300 lg:rounded-lg hover:bg-gray-50"
        >
          <span>Material</span>
          {isMaterialOpen ? (
            <IoMdArrowDropup className="text-gray-500 lg:w-[25px] w-[20px] lg:h-[25px] h-[20px]" />
          ) : (
            <IoMdArrowDropdown className="text-gray-500 lg:w-[25px] w-[20px] lg:h-[25px] h-[20px]" />
          )}
        </button>
        {isMaterialOpen && (
          <div className="absolute z-10 mt-0 w-40 bg-white border border-gray-200 rounded-lg shadow-lg max-h-[300px] overflow-y-auto">
            {loading ? (
              <div className="px-4 py-2 text-sm text-gray-700">Loading...</div>
            ) : error ? (
              <div className="px-4 py-2 text-sm text-red-500">{error}</div>
            ) : materials.length === 0 ? (
              <div className="px-4 py-2 text-sm text-gray-700">
                No materials available
              </div>
            ) : (
              <>
                {selectedMaterial && (
                  <button
                    onClick={() => {
                      setSelectedMaterial(null);
                      onFilterChange({ frameMaterial: null });
                      setIsMaterialOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Clear
                  </button>
                )}
                {materials.map((material) => (
                  <button
                    key={material._id}
                    onClick={() => handleMaterialSelect(material._id)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    {selectedMaterial === material._id && (
                      <FiCheck className="mr-2 text-blue-500" />
                    )}
                    {material.name}
                  </button>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {/* Brand Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsBrandOpen(!isBrandOpen)}
          className="flex items-center gap-2 lg:px-0 px-4 py-2 border lg:border-none border-gray-300 rounded-3xl lg:rounded-lg hover:bg-gray-50"
        >
          <span>Brand</span>
          {isBrandOpen ? (
            <IoMdArrowDropup className="text-gray-500 lg:w-[25px] w-[20px] lg:h-[25px] h-[20px]" />
          ) : (
            <IoMdArrowDropdown className="text-gray-500 lg:w-[25px] w-[20px] lg:h-[25px] h-[20px]" />
          )}
        </button>
        {isBrandOpen && (
          <div className="absolute z-10 mt-0 w-40 bg-white border border-gray-200 rounded-lg shadow-lg max-h-[300px] overflow-y-auto">
            {loading ? (
              <div className="px-4 py-2 text-sm text-gray-700">Loading...</div>
            ) : error ? (
              <div className="px-4 py-2 text-sm text-red-500">{error}</div>
            ) : brands.length === 0 ? (
              <div className="px-4 py-2 text-sm text-gray-700">
                No brands available
              </div>
            ) : (
              <>
                {selectedBrand && (
                  <button
                    onClick={() => {
                      setSelectedBrand(null);
                      onFilterChange({ brand: null });
                      setIsBrandOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Clear
                  </button>
                )}
                {brands.map((brand) => (
                  <button
                    key={brand._id}
                    onClick={() => handleBrandSelect(brand._id)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    {selectedBrand === brand._id && (
                      <FiCheck className="mr-2 text-blue-500" />
                    )}
                    {brand.name}
                  </button>
                ))}
              </>
            )}
          </div>
        )}
      </div>
        </div>
    </div>
  );
};

export default TopBarReadingGlasses;
