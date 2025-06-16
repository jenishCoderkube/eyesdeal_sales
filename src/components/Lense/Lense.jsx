import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { lensService } from "../../services/lensService";
import LenseCard from "./LenseCard";
import { FiSearch } from "react-icons/fi";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import debounce from "lodash.debounce";
import { Pagination, PaginationItem } from "@mui/material";

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
  const [lenses, setLenses] = useState(null); // Initialize as null
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PAGE_LIMIT = 10; // Number of lenses per page

  // Fetch lenses function
  const fetchLenses = useCallback(
    async (searchQuery = "", page = 1) => {
      setIsLoading(true);
      setError(null);
      setLenses(null); // Reset lenses during fetch
      try {
        const params = {
          page,
          limit: PAGE_LIMIT,
        };
        if (activeTab !== "All") params.prescriptionType = activeTab;
        if (selectedBrand) params.brand = selectedBrand._id;
        if (searchQuery.trim()) params.search = searchQuery;

        const lensesResponse = await lensService.getAllLenses(params);
        if (lensesResponse.success) {
          setLenses(
            Array.isArray(lensesResponse.data.message.data)
              ? lensesResponse.data.message.data
              : lensesResponse.data.message.data
              ? [lensesResponse.data.message.data]
              : []
          );
          setTotalPages(lensesResponse.data.message.totalPages || 1);
        } else {
          throw new Error(lensesResponse.message || "Error fetching lenses");
        }
      } catch (err) {
        setError(err.message || "Error fetching lenses");
        setLenses([]);
      } finally {
        setIsLoading(false);
      }
    },
    [activeTab, selectedBrand]
  );

  // Debounced search function
  const debouncedFetchLenses = useCallback(
    debounce((query) => {
      fetchLenses(query, 1); // Reset to page 1 on search
      setCurrentPage(1);
    }, 500),
    [fetchLenses]
  );

  // Effect to handle search changes
  useEffect(() => {
    debouncedFetchLenses(search);
    return () => {
      debouncedFetchLenses.cancel();
    };
  }, [search, debouncedFetchLenses]);

  // Effect to fetch lenses when activeTab, selectedBrand, or currentPage changes
  useEffect(() => {
    fetchLenses(search, currentPage);
  }, [activeTab, selectedBrand, currentPage, fetchLenses]);

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

  const handlePageChange = (event, value) => {
    setCurrentPage(value); // Material-UI Pagination uses 1-based index
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 overflow-y-auto mt-1">
        <div className="flex flex-col w-full">
          {/* Search and Tabs for screens 768px and above */}
          {!isBelow768 && (
            <div className="flex flex-col sm:flex-row items-center mb-4 w-full">
              <div className="flex flex-col sm:flex-row w-full items-center bg-white border rounded-lg px-3 py-2 gap-2 sm:gap-4 h-[44px]">
                <div className="relative flex items-center w-full sm:w-[40%] lg:w-[30%]">
                  <FiSearch
                    size={24}
                    className="absolute lg:left-2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search barcode..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border-none border border-gray-300 focus:outline-none lg:ring-0 focus:ring-2 focus:ring-blue-500 font-poppins font-normal text-[18px] leading-[24px] text-[#667085]"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                {/* Tabs with Horizontal Scroll */}
                <div className="relative w-full sm:w-[60%] lg:w-[70%] mt-2 sm:mt-0 sm:ml-auto">
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
          ) : error ? (
            <div className="h-[80vh] flex justify-center items-center">
              <h5 className="text-[18px] font-poppins font-medium text-red-600">
                {error}
              </h5>
            </div>
          ) : lenses && lenses.length === 0 ? (
            <div className="h-[80vh] flex justify-center items-center">
              <h5 className="text-[18px] font-poppins font-medium">
                No Lenses Found.
              </h5>
            </div>
          ) : lenses && lenses.length > 0 ? (
            <>
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {lenses.map((lens) => (
                  <LenseCard
                    key={lens._id}
                    lens={lens}
                    onSelectLens={handleLensSelect}
                  />
                ))}
              </div>
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-8">
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    renderItem={(item) => (
                      <PaginationItem
                        {...item}
                        sx={{
                          "&.Mui-selected": {
                            backgroundColor: "#1976d2",
                            color: "white",
                            border: "1px solid #bbdefb",
                            fontWeight: 500,
                          },
                          "&:hover": {
                            backgroundColor: "#f5f5f5",
                            border: "1px solid #bdbdbd",
                          },
                          border: "1px solid #e0e0e0",
                          borderRadius: "4px",
                          margin: "0 4px",
                          padding: "8px 12px",
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: "14px",
                          color: "#424242",
                          transition: "all 0.2s",
                          "&.Mui-disabled": {
                            opacity: 0.5,
                            cursor: "not-allowed",
                          },
                        }}
                      />
                    )}
                  />
                </div>
              )}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Lense;
