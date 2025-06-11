// Lense.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { lensService } from "../../services/lensService";
import { masterDataService } from "../../services/masterDataService";
import LenseCard from "./LenseCard";
import { FiSearch } from "react-icons/fi";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Lense = ({ onSelectLens, selectedBrand }) => {
  const navigate = useNavigate();
  const [lenses, setLenses] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [prescriptionTypes, setPrescriptionTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [_, prescriptionTypeResponse] = await Promise.all([
          masterDataService.getBrands(),
          lensService.getAllprescriptionType(),
        ]);

        if (prescriptionTypeResponse.success) {
          setPrescriptionTypes(prescriptionTypeResponse.data.data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchLenses = async () => {
      try {
        const params = {};
        if (activeTab !== "All") params.prescriptionType = activeTab;
        if (selectedBrand) params.brand = selectedBrand._id;

        const lensesResponse = await lensService.getAllLenses(params);
        if (lensesResponse.success) {
          setLenses(lensesResponse.data.message.data);
        }
      } catch (err) {
        console.error("Error fetching lenses:", err);
      }
    };

    fetchLenses();
  }, [activeTab, selectedBrand]);

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

  const filteredLenses = lenses.filter((lens) =>
    lens.displayName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 overflow-y-auto mt-1">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Select Lenses</h2>
        <div className="w-full flex flex-col md:flex-row items-start gap-4 sm:gap-1">
          <div className="flex flex-col flex-1 w-full">
            <div className="flex flex-col sm:flex-row items-center mb-4 w-full">
              <div className="flex flex-col sm:flex-row w-full items-center bg-white border rounded-lg px-3 py-2 gap-2 sm:gap-4 h-[44px]">
                <div className="relative flex items-center w-full sm:w-[30%]">
                  <FiSearch
                    size={24}
                    className="absolute left-2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search barcode..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg md:border-none border border-gray-300 focus:outline-none md:ring-0 focus:ring-2 focus:ring-blue-500 font-poppins font-normal text-[18px] leading-[24px] text-[#667085]"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

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
            </div>

            <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))]">
              {filteredLenses.map((lens) => (
                <LenseCard
                  key={lens._id}
                  lens={lens}
                  onSelectLens={handleLensSelect}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lense;
