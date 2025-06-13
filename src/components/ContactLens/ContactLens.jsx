import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { lensService } from "../../services/lensService";
import { masterDataService } from "../../services/masterDataService";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import ContactLensCard from "./ContactLensCard";
import { FiSearch } from "react-icons/fi";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Loader from "../Loader/Loader";
import { contactLensService } from "../../services/contactLensService";
import debounce from "lodash.debounce";

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
  const [lenses, setLenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

const FetchContactLens=useCallback(
 async (searchQuery = "") => {
      setIsLoading(true);
      try {
        const params = {};
        if (activeTab !== "All") params.disposabilityType = activeTab;
        if (selectedBrand) params.brand = selectedBrand._id;
        if (searchQuery.trim()) params.search = searchQuery; // Include search param if not empty

        const lensesResponse = await contactLensService.getAllContactLenses(params);
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
  )

  const debouncedFetchContactLenses = useCallback(
    debounce((query) => {
      FetchContactLens(query);
    }, 500), // 500ms debounce delay
    [FetchContactLens]
  );

  // Effect to handle search changes
  useEffect(() => {
    debouncedFetchContactLenses(search);
    // Cleanup debounce on unmount
    return () => {
      debouncedFetchContactLenses.cancel();
    };
  }, [search, debouncedFetchContactLenses]);

  useEffect(() => {
    FetchContactLens(search);
  }, [activeTab, selectedBrand, FetchContactLens]);

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
    // console.log(lens,"jaysgcasdycjdav");
    
    navigate(`/sales-panel/contactLenses/${lens._id}`);
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
            <Loader />
          ) : lenses?.length <= 0 ? (
            <div className="h-[80vh] flex justify-center items-center">
              <h5 className="text-[18px] font-poppins font-medium">
                No Lenses Found.
              </h5>
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {lenses.map((lens) => (
                <ContactLensCard
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

export default ContactLens;
