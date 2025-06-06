import React, { useState, useEffect } from "react";
import { FiSearch, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { masterDataService } from "../../services/masterDataService"; // Adjust the path as needed
import { useNavigate } from "react-router-dom";

const TopBarSunglasses = () => {
  const navigate = useNavigate();
  const [isFrameTypeOpen, setIsFrameTypeOpen] = useState(false);
  const [isMaterialOpen, setIsMaterialOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [frameTypes, setFrameTypes] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch frame types
  useEffect(() => {
    if (isFrameTypeOpen) {
      const fetchFrameTypes = async () => {
        setLoading(true);
        try {
          const response = await masterDataService.getFrameTypes();
          if (response.success) {
            const frameTypeData = Array.isArray(response.data?.data)
              ? response.data.data
              : [];
            setFrameTypes(frameTypeData);
          } else {
            setError(response.message);
            if (response.message.includes("access token") || response.message.includes("Unauthorized")) {
              navigate("/login");
            }
          }
        } catch (error) {
          const errorMessage = error.response?.data?.message || "Error fetching frame types";
          setError(errorMessage);
          if (errorMessage.includes("Unauthorized") || error.response?.status === 401) {
            navigate("/login");
          }
        } finally {
          setLoading(false);
        }
      };
      fetchFrameTypes();
    }
  }, [isFrameTypeOpen, navigate]);

  // Fetch materials
  useEffect(() => {
    if (isMaterialOpen) {
      const fetchMaterials = async () => {
        setLoading(true);
        try {
          const response = await masterDataService.getMaterials();
          if (response.success) {
            const materialData = Array.isArray(response.data?.data)
              ? response.data.data
              : [];
            setMaterials(materialData);
          } else {
            setError(response.message);
            if (response.message.includes("access token") || response.message.includes("Unauthorized")) {
              navigate("/login");
            }
          }
        } catch (error) {
          const errorMessage = error.response?.data?.message || "Error fetching materials";
          setError(errorMessage);
          if (errorMessage.includes("Unauthorized") || error.response?.status === 401) {
            navigate("/login");
          }
        } finally {
          setLoading(false);
        }
      };
      fetchMaterials();
    }
  }, [isMaterialOpen, navigate]);

  // Fetch brands
  useEffect(() => {
    if (isBrandOpen) {
      const fetchBrands = async () => {
        setLoading(true);
        try {
          const response = await masterDataService.getBrands();
          if (response.success) {
            const brandData = Array.isArray(response.data?.data)
              ? response.data.data
              : [];
            setBrands(brandData);
          } else {
            setError(response.message);
            if (response.message.includes("access token") || response.message.includes("Unauthorized")) {
              navigate("/login");
            }
          }
        } catch (error) {
          const errorMessage = error.response?.data?.message || "Error fetching brands";
          setError(errorMessage);
          if (errorMessage.includes("Unauthorized") || error.response?.status === 401) {
            navigate("/login");
          }
        } finally {
          setLoading(false);
        }
      };
      fetchBrands();
    }
  }, [isBrandOpen, navigate]);

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
          className="w-full pl-10 pr-4 py-2 rounded-lg md:border-none border border-gray-300 focus:outline-none md:ring-0 focus:ring-2 focus:ring-blue-500 font-poppins font-normal text-[18px] leading-[24px] text-[#667085]"
        />
      </div>

      {/* Dropdowns */}
      <div className="flex sm:flex-nowrap flex-wrap gap-y-3 items-center sm:gap-x-0 gap-x-2 w-full md:space-x-4 ml-[900px]">

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
            <div className="absolute z-10 mt-0 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
              {loading ? (
                <div className="px-4 py-2 text-sm text-gray-700">Loading...</div>
              ) : error ? (
                <div className="px-4 py-2 text-sm text-red-500">{error}</div>
              ) : frameTypes.length === 0 ? (
                <div className="px-4 py-2 text-sm text-gray-700">No frame types available</div>
              ) : (
                frameTypes.map((type) => (
                  <a
                    key={type._id}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {type.name}
                  </a>
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
            <div className="absolute z-10 mt-0 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
              {loading ? (
                <div className="px-4 py-2 text-sm text-gray-700">Loading...</div>
              ) : error ? (
                <div className="px-4 py-2 text-sm text-red-500">{error}</div>
              ) : materials.length === 0 ? (
                <div className="px-4 py-2 text-sm text-gray-700">No materials available</div>
              ) : (
                materials.map((material) => (
                  <a
                    key={material._id}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {material.name}
                  </a>
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
            <div
              className="absolute z-10 mt-0 w-40 bg-white border border-gray-200 rounded-lg shadow-lg max-h-[300px] overflow-y-auto"
              onWheel={(e) => e.stopPropagation()} // Prevents scroll bubbling to the page
            >
              {loading ? (
                <div className="px-4 py-2 text-sm text-gray-700">Loading...</div>
              ) : error ? (
                <div className="px-4 py-2 text-sm text-red-500">{error}</div>
              ) : brands.length === 0 ? (
                <div className="px-4 py-2 text-sm text-gray-700">No brands available</div>
              ) : (
                brands.map((brand) => (
                  <a
                    key={brand._id}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {brand.name}
                  </a>
                ))
              )}
            </div>
          )}


        </div>
      </div>
    </div>
  );
};

export default TopBarSunglasses;