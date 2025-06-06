import React, { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { masterDataService } from "../../services/masterDataService"; // Adjust the path as needed
import { useNavigate } from "react-router-dom";

const TopBarLense = () => {
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
    <div className="flex flex-col space-y-4 p-2 border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">Lenses</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search lenses..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-poppins font-normal text-[18px] leading-[24px] text-[#667085]"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="h-5 w-5 text-gray-600" />
            <span>Filter</span>
          </button>
        </div>
      </div>
      <div className="flex flex-wrap md:flex-nowrap gap-y-3 items-center justify-between w-full">
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            All Lenses
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            Single Vision
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            Progressive
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            Bifocal
          </button>
        </div>
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
    </div>
  );
};

export default TopBarLense;