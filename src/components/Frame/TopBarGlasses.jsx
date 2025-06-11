import React, { useState } from "react";
import { FiSearch, FiCheck } from "react-icons/fi";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const TopBarGlasses = ({
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

  // Handle frame type selection/unselection
  const handleFrameTypeSelect = (id, name) => {
    if (selectedFrameType === id) {
      // Unselect if the same item is clicked
      setSelectedFrameType(null);
      onFilterChange({ frameType: null });
    } else {
      setSelectedFrameType(id);
      onFilterChange({ frameType: id });
    }
    setIsFrameTypeOpen(false);
  };

  // Handle material selection/unselection
  const handleMaterialSelect = (id, name) => {
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
  const handleBrandSelect = (id, name) => {
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

  const handleClearMaterial = () => {
    setSelectedMaterial(null);
    onFilterChange({ frameMaterial: null });
    setIsMaterialOpen(false);
  };

  const handleClearBrand = () => {
    setSelectedBrand(null);
    onFilterChange({ brand: null });
    setIsBrandOpen(false);
  };

  return (
    <div className="flex md:flex-nowrap md:gap-y-0 gap-y-3 flex-wrap items-center justify-between w-full p-2 border-b border-gray-200 bg-white">
      {/* Search Bar */}
      <div className="relative flex items-center w-full md:w-1/4 lg:w-1/2">
        <FiSearch
          size={24}
          className="absolute top-[6px] left-2 text-gray-400"
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
            {selectedFrameType
              ? frameTypes.find((type) => type._id === selectedFrameType)
                  ?.name || "Frame Type"
              : "Frame Type"}
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
                <>
                  <button
                    onClick={handleClearFrameType}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Clear
                  </button>
                  {frameTypes.map((type) => (
                    <button
                      key={type._id}
                      onClick={() => handleFrameTypeSelect(type._id, type.name)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
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
        <div
          className="relative"
          onMouseEnter={() => setIsMaterialOpen(true)}
          onMouseLeave={() => setIsMaterialOpen(false)}
        >
          <button className="flex md:border-none border border-[#E2E2E2] rounded-3xl md:px-0 px-2 items-center font-poppins font-normal md:text-[18px] text-[15px] leading-[24px] text-[#242424] py-2">
            {selectedMaterial
              ? materials.find((mat) => mat._id === selectedMaterial)?.name ||
                "Material"
              : "Material"}
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
                <>
                  <button
                    onClick={handleClearMaterial}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Clear
                  </button>
                  {materials.map((material) => (
                    <button
                      key={material._id}
                      onClick={() =>
                        handleMaterialSelect(material._id, material.name)
                      }
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
        <div
          className="relative"
          onMouseEnter={() => setIsBrandOpen(true)}
          onMouseLeave={() => setIsBrandOpen(false)}
        >
          <button className="flex md:border-none border border-[#E2E2E2] rounded-3xl md:px-0 px-2 items-center font-poppins font-normal md:text-[18px] text-[15px] leading-[24px] text-[#242424] py-2">
            {selectedBrand
              ? brands.find((brand) => brand._id === selectedBrand)?.name ||
                "Brand"
              : "Brand"}
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
                <>
                  <button
                    onClick={handleClearBrand}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Clear
                  </button>
                  {brands.map((brand) => (
                    <button
                      key={brand._id}
                      onClick={() => handleBrandSelect(brand._id, brand.name)}
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

export default TopBarGlasses;
