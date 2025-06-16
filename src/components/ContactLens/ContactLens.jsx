import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { contactLensService } from "../../services/contactLensService";
import ContactLensCard from "./ContactLensCard";
import { FiSearch } from "react-icons/fi";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import debounce from "lodash.debounce";
import ReactPaginate from "react-paginate";
import Loader from "../Loader/Loader";

const ContactLens = ({
  onSelectLens,
  selectedBrand,
  search,
  setSearch,
  activeTab,
  setActiveTab,
  disposabilityTypes,
  isBelow768,
}) => {
  const navigate = useNavigate();
  const [lenses, setLenses] = useState(null); // Initialize as null
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PAGE_LIMIT = 10; // Number of lenses per page

  // Fetch contact lenses function
  const fetchContactLens = useCallback(
    async (searchQuery = "", page = 1) => {
      setIsLoading(true);
      setError(null);
      setLenses(null); // Reset lenses during fetch
      try {
        const params = {
          page,
          limit: PAGE_LIMIT,
        };
        if (activeTab !== "All") params.disposabilityType = activeTab;
        if (selectedBrand) params.brand = selectedBrand._id;
        if (searchQuery.trim()) params.search = searchQuery;

        const lensesResponse = await contactLensService.getAllContactLenses(
          params
        );
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
          throw new Error(
            lensesResponse.message || "Error fetching contact lenses"
          );
        }
      } catch (err) {
        setError(err.message || "Error fetching contact lenses");
        setLenses([]);
      } finally {
        setIsLoading(false);
      }
    },
    [activeTab, selectedBrand]
  );

  // Debounced search function
  const debouncedFetchContactLenses = useCallback(
    debounce((query) => {
      fetchContactLens(query, 1); // Reset to page 1 on search
      setCurrentPage(1);
    }, 500),
    [fetchContactLens]
  );

  // Effect to handle search changes
  useEffect(() => {
    debouncedFetchContactLenses(search);
    return () => {
      debouncedFetchContactLenses.cancel();
    };
  }, [search, debouncedFetchContactLenses]);

  // Effect to fetch lenses when activeTab, selectedBrand, or currentPage changes
  useEffect(() => {
    fetchContactLens(search, currentPage);
  }, [activeTab, selectedBrand, currentPage, fetchContactLens]);

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
    navigate(`/sales-panel/contactLenses/${lens._id}`);
    if (onSelectLens) onSelectLens(lens);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1); // ReactPaginate uses 0-based index
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
                    {disposabilityTypes.map((tab) => (
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
            <div className="h-[90vh] flex justify-center items-center">
              <Loader />
            </div>
          ) : error ? (
            <div className="h-[80vh] flex justify-center items-center">
              <h5 className="text-[18px] font-poppins font-medium text-red-600">
                {error}
              </h5>
            </div>
          ) : lenses && lenses.length === 0 ? (
            <div className="h-[80vh] flex justify-center items-center">
              <h5 className="text-[18px] font-poppins font-medium">
                No Contact Lenses Found.
              </h5>
            </div>
          ) : lenses && lenses.length > 0 ? (
            <>
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {lenses.map((lens) => (
                  <ContactLensCard
                    key={lens._id}
                    lens={lens}
                    onSelectLens={handleLensSelect}
                  />
                ))}
              </div>
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-8">
                  <ReactPaginate
                    previousLabel={
                      <div className="flex items-center justify-center space-x-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                        <span>Previous</span>
                      </div>
                    }
                    nextLabel={
                      <div className="flex items-center justify-center space-x-1">
                        <span>Next</span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    }
                    breakLabel="..."
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageChange}
                    containerClassName="flex items-center space-x-2"
                    pageLinkClassName="flex items-center justify-center px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-colors duration-200 font-poppins text-sm cursor-pointer shadow-sm w-full h-full"
                    activeLinkClassName="border-[1px] border-blue-200 bg-blue-700 text-white font-medium"
                    previousLinkClassName={`flex items-center justify-center px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 transition-colors duration-200 shadow-sm w-full h-full ${
                      currentPage === 1
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-100 hover:border-gray-400"
                    }`}
                    nextLinkClassName={`flex items-center justify-center px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 transition-colors duration-200 shadow-sm w-full h-full ${
                      currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-100 hover:border-gray-400"
                    }`}
                    breakClassName="flex items-center justify-center px-4 py-2 text-gray-700 font-poppins text-sm"
                    disabledClassName="opacity-50 cursor-not-allowed"
                    forcePage={currentPage - 1} // Adjust for 0-based index
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

export default ContactLens;
