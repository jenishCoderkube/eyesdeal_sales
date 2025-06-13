import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LenseSlider from "./Slider/LenseSlider";
import { lensService } from "../../services/lensService";
import { useMediaQuery } from "react-responsive";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

const LenseDetails = ({ lens, onClose }) => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [prescriptionTypes, setPrescriptionTypes] = useState([]);
  const [error, setError] = useState(null);

  // Media queries for responsive design
  const isBelow768 = useMediaQuery({ query: "(max-width: 767px)" });
  const isBelow1024 = useMediaQuery({ query: "(max-width: 1023px)" });

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
    const scrollAmount = isBelow768 ? 80 : 100;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (error || !lens) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="font-['Poppins'] text-black font-medium text-[24px]">
          {error || "Contact Lens Not Found"}
        </h1>
        <button
          className="mt-4 font-['Poppins'] font-normal text-[16px] text-white bg-[#242424] px-4 py-2 rounded-md hover:bg-[#3a3a3a]"
          onClick={() => navigate("/sales-panel/contact-lens")}
        >
          Back to Contact Lenses
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 bg-gray-50 min-h-screen">
      <div className="w-full">
        {/* Search and Tabs Section */}
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

        {/* Lens Details Card */}
        <div className="bg-white rounded-lg shadow-md p-4 ">
          <LenseSlider onClose={onClose} lens={lens} />
          <div className="flex flex-col sm:flex-row max-w-[85%] w-full justify-center items-center gap-4 mt-6">
            <h6 className="font-poppins font-medium text-base sm:text-lg text-gray-800">
              Sub Total
            </h6>
            <span className="font-poppins font-semibold text-base sm:text-lg bg-orange-500 text-white rounded-lg px-4 py-2">
              {lens.sellPrice} ₹
            </span>
          </div>
          {/* Add to Cart Button */}
          <div className="flex justify-center max-w-[85%] w-full mt-8">
            <button
              className="w-full max-w-xs sm:max-w-sm lg:max-w-md bg-teal-600 text-white font-poppins font-medium text-base sm:text-lg py-3 sm:py-4 rounded-lg hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
              // onClick={() => console.log("Add to Cart clicked")} // Replace with actual cart logic
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LenseDetails;
