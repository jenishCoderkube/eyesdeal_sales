import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LenseSlider from "./Slider/LenseSlider";
import { lensService } from "../../services/lensService";

const LenseDetails = ({ lens, onClose }) => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [prescriptionTypes, setPrescriptionTypes] = useState([]);

  useEffect(() => {
    const fetchPrescriptionTypes = async () => {
      try {
        const response = await lensService.getAllprescriptionType();
        if (response.success) {
          setPrescriptionTypes(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching prescription types:", err);
      }
    };

    fetchPrescriptionTypes();
  }, []);

  const scrollTabs = (direction) => {
    const container = document.getElementById("tabsContainer");
    if (!container) return;
    const scrollAmount = 100;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (!lens) {
    return (
      <div className="flex justify-center items-center h-full">
        Lens not found
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-8 py-4">
      <div className="max-w-7xl mx-auto mt-12">
        <div className="flex flex-col sm:flex-row w-full items-center bg-white border rounded-lg px-3 py-2 gap-2 sm:gap-4 h-[44px]">
          <div className="relative flex items-center w-full sm:w-[30%]">
            <FiSearch size={24} className="absolute left-2 text-gray-400" />
            <input
              type="text"
              placeholder="Search barcode..."
              className="w-full pl-10 pr-4 py-2 rounded-lg md:border-none border border-gray-300 focus:outline-none md:ring-0 focus:ring-2 focus:ring-blue-500 font-poppins font-normal text-[18px] leading-[24px] text-[#667085]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Brand Clear Button */}
          {/* <button
                  className="ml-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  onClick={() => {
                    onSelectLens(null);
                  }}
                >
                  Clear Brand
                </button> */}

          {/* Tabs with Horizontal Scroll */}
          <div className="relative w-full sm:w-[60%] mt-2 sm:mt-0 sm:ml-auto">
            {/* Scroll Buttons */}
            <button
              onClick={() => scrollTabs("left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white px-2"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div
              id="tabsContainer"
              className="flex flex-nowrap overflow-x-auto scrollbar-hide px-6"
            >
              {/* All Tab */}
              <button
                className={`relative px-3 py-1 flex items-center text-xs sm:text-sm font-medium whitespace-nowrap ${
                  activeTab === "All" ? "text-black" : "text-gray-500"
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

              {/* Dynamic Tabs */}
              {prescriptionTypes.map((tab) => (
                <button
                  key={tab._id}
                  className={`relative px-3 py-1 flex items-center text-xs sm:text-sm font-medium whitespace-nowrap ${
                    activeTab === tab._id ? "text-black" : "text-gray-500"
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
            {/* Scroll Button Right */}
            <button
              onClick={() => scrollTabs("right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white px-2"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mt-5">
          <LenseSlider onClose={onClose} lens={lens} />
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-6 sm:mt-8">
            <h6 className="font-poppins font-normal text-base sm:text-[18px] leading-[24px]">
              Sub Total
            </h6>
            <span className="font-poppins font-normal text-nowrap text-base sm:text-[18px] leading-[24px] bg-[#E77817] text-white rounded-[8px] px-3 py-2">
              {lens.sellPrice} ₹
            </span>
          </div>
        </div>
        <div className="flex justify-center mt-8 sm:mt-12">
          <button className="text-white font-poppins font-normal text-base sm:text-[18px] bg-[#007569] rounded-lg py-3 sm:py-4 w-full max-w-[336px] hover:bg-[#00695c] transition-colors">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default LenseDetails;
