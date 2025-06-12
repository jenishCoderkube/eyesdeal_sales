import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { lensService } from "../../services/lensService";
import LenseCard from "./LenseCard";
import { FiSearch } from "react-icons/fi";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import debounce from "lodash.debounce";

// Simple Loader Component
const Loader = () => (
  <div className="h-[80vh] flex justify-center items-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
  </div>
);

const Lense = ({
  onSelectLens,
  selectedBrand,
  search,
  setSearch,
  activeTab,
  setActiveTab,
  prescriptionTypes,
  isBelow768,
}) => {
  const navigate = useNavigate();
  const [lenses, setLenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch lenses function
  const fetchLenses = useCallback(
    async (searchQuery = "") => {
      setIsLoading(true);
      try {
        const params = {};
        if (activeTab !== "All") params.prescriptionType = activeTab;
        if (selectedBrand) params.brand = selectedBrand._id;
        if (searchQuery.trim()) params.search = searchQuery; // Include search param if not empty

        const lensesResponse = await lensService.getAllLenses(params);
        if (lensesResponse.success) {
          setLenses(lensesResponse.data.message.data);
        }
      } catch (err) {
        console.error("Error fetching lenses:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [activeTab, selectedBrand]
  );

  // Debounced search function
  const debouncedFetchLenses = useCallback(
    debounce((query) => {
      fetchLenses(query);
    }, 500), // 500ms debounce delay
    [fetchLenses]
  );

  // Effect to handle search changes
  useEffect(() => {
    debouncedFetchLenses(search);
    // Cleanup debounce on unmount
    return () => {
      debouncedFetchLenses.cancel();
    };
  }, [search, debouncedFetchLenses]);

  // Effect to fetch lenses when activeTab or selectedBrand changes
  useEffect(() => {
    fetchLenses(search);
  }, [activeTab, selectedBrand, fetchLenses]);

  const scrollTabs = (direction) => {
    const container = document.getElementById("tabsContainer");
    if (!container) return;
    const scrollAmount = 100;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleLensSelect = (lens) => {
    navigate(`/sales-panel/lens/${lens._id}`);
    if (onSelectLens) onSelectLens(lens);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 overflow-y-auto mt-1">
        <div className="flex flex-col w-full">
          {/* Search and Tabs for screens 768px and above */}
          {!isBelow768 && (
            <div className="flex flex-col sm:flex-row items-center mb-4 w-full">
              <div className="flex flex-col sm:flex-row w-full items-center bg-white border rounded-lg px-3 py-2 gap-2 sm:gap-4 h-[44px]">
                <div className="relative flex items-center w-full sm:w-[40%] md:w-[30%]">
                  <FiSearch
                    size={24}
                    className="absolute md:left-2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search barcode..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border-none border border-gray-300 focus:outline-none md:ring-0 focus:ring-2 focus:ring-blue-500 font-poppins font-normal text-[18px] leading-[24px] text-[#667085]"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                {/* Tabs with Horizontal Scroll */}
                <div className="relative w-full sm:w-[60%] md:w-[70%] mt-2 sm:mt-0 sm:ml-auto">
                  <button
                    onClick={() => scrollTabs("left")}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white px-2"
                  >
                    <MdKeyboardDoubleArrowLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <div
                    id="tabsContainer"
                    className="flex flex-nowrap overflow-x-auto scrollbar-hide px-6"
                  >
                    <button
                      className={`relative px-3 py-1 flex items-center text-xs sm:text-sm font-medium whitespace-nowrap ${
                        activeTab === "All"
                          ? "text-black border-b border-red-400"
                          : "text-gray-500"
                      }`}
                      style={{ background: "none" }}
                      onClick={() => setActiveTab("All")}
                    >
                      All
                      {activeTab === "All" && (
                        <span
                          className="absolute left-0 right-0"
                          style={{
                            top: "28px",
                            height: "2px",
                            background: "#fb923c",
                            borderRadius: "2px",
                            width: "100%",
                            display: "block",
                          }}
                        />
                      )}
                    </button>
                    {prescriptionTypes.map((tab) => (
                      <button
                        key={tab._id}
                        className={`relative px-3 py-1 flex items-center text-xs sm:text-sm font-medium whitespace-nowrap ${
                          activeTab === tab._id
                            ? "text-black border-b border-red-400"
                            : "text-gray-500"
                        }`}
                        style={{ background: "none" }}
                        onClick={() => setActiveTab(tab._id)}
                      >
                        {tab.name}
                        {activeTab === tab._id && (
                          <span
                            className="absolute left-0 right-0"
                            style={{
                              top: "28px",
                              height: "2px",
                              background: "#fb923c",
                              borderRadius: "2px",
                              width: "100%",
                              display: "block",
                            }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => scrollTabs("right")}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white px-2"
                  >
                    <MdKeyboardDoubleArrowRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Lenses Grid */}
          {isLoading ? (
            <Loader />
          ) : lenses?.length <= 0 ? (
            <div className="h-[80vh] flex justify-center items-center">
              <h5 className="text-[18px] font-poppins font-medium">
                No Lenses Found.
              </h5>
            </div>
          ) : (
            <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))]">
              {lenses.map((lens) => (
                <LenseCard
                  key={lens._id}
                  lens={lens}
                  onSelectLens={handleLensSelect}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lense;
