import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LenseSlider from "./Slider/LenseSlider";
import { lensService } from "../../services/lensService";
import { useMediaQuery } from "react-responsive";

const LenseDetails = ({ lens, onClose }) => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [prescriptionTypes, setPrescriptionTypes] = useState([]);

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

  if (!lens) {
    return (
      <div className="flex justify-center items-center h-full text-gray-600 font-poppins text-lg">
        Lens not found
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Search and Tabs Section */}
        <div className="flex flex-col sm:flex-row items-center bg-white border border-gray-200 rounded-lg shadow-sm px-4 py-3 gap-3 sm:gap-6 mb-6">
          <div className="relative w-full sm:w-1/3">
            <FiSearch
              size={isBelow768 ? 20 : 24}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search barcode..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none font-poppins text-sm sm:text-base text-gray-700 placeholder-gray-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Tabs with Horizontal Scroll */}
          <div className="relative w-full sm:w-2/3 mt-3 sm:mt-0">
            <button
              onClick={() => scrollTabs("left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-sm hover:bg-gray-100 transition-colors"
              aria-label="Scroll tabs left"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
            <div
              id="tabsContainer"
              className="flex overflow-x-auto scrollbar-hide px-8 py-2 snap-x"
            >
              <button
                className={`flex-shrink-0 px-4 py-2 text-xs sm:text-sm font-medium whitespace-nowrap ${
                  activeTab === "All"
                    ? "text-black border-b-2 border-orange-400"
                    : "text-gray-500 hover:text-gray-700"
                } snap-start`}
                onClick={() => setActiveTab("All")}
              >
                All
              </button>
              {prescriptionTypes.map((tab) => (
                <button
                  key={tab._id}
                  className={`flex-shrink-0 px-4 py-2 text-xs sm:text-sm font-medium whitespace-nowrap ${
                    activeTab === tab._id
                      ? "text-black border-b-2 border-orange-400"
                      : "text-gray-500 hover:text-gray-700"
                  } snap-start`}
                  onClick={() => setActiveTab(tab._id)}
                >
                  {tab.name}
                </button>
              ))}
            </div>
            <button
              onClick={() => scrollTabs("right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-sm hover:bg-gray-100 transition-colors"
              aria-label="Scroll tabs right"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Lens Details Card */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8">
          <LenseSlider onClose={onClose} lens={lens} />
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
            <h6 className="font-poppins font-medium text-base sm:text-lg text-gray-800">
              Sub Total
            </h6>
            <span className="font-poppins font-semibold text-base sm:text-lg bg-orange-500 text-white rounded-lg px-4 py-2">
              {lens.sellPrice} ₹
            </span>
          </div>
          {/* Add to Cart Button */}
          <div className="flex justify-center mt-8">
            <button
              className="w-full max-w-xs sm:max-w-sm lg:max-w-md bg-teal-600 text-white font-poppins font-medium text-base sm:text-lg py-3 sm:py-4 rounded-lg hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
              onClick={() => console.log("Add to Cart clicked")} // Replace with actual cart logic
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
