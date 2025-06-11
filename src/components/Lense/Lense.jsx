// Lense.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { lensService } from "../../services/lensService";
import { masterDataService } from "../../services/masterDataService";
import LenseDetails from "./LenseDetails";
import Brand from "../Brand/Brand";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Loader from "../Loader/Loader";
import { FiSearch } from "react-icons/fi";

const Lense = () => {
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [lenses, setLenses] = useState([]);
  const [brands, setBrands] = useState([{ name: "All", logo: null }]);
  const [prescriptionTypes, setPrescriptionTypes] = useState([]);
  const [viewCard, setViewCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [brandsResponse, prescriptionTypeResponse] = await Promise.all([
          masterDataService.getBrands(),
          lensService.getAllprescriptionType(),
        ]);

        if (
          brandsResponse.success &&
          Array.isArray(brandsResponse.data?.data)
        ) {
          setBrands([{ name: "All", logo: null }, ...brandsResponse.data.data]);
        } else {
          setError(brandsResponse.message || "Failed to fetch brands");
        }

        if (prescriptionTypeResponse.success) {
          setPrescriptionTypes(prescriptionTypeResponse.data.data);
        } else {
          setError(
            prescriptionTypeResponse.message ||
              "Failed to fetch prescription types"
          );
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchLenses = async () => {
      try {
        setLoading(true);
        const params = {};
        if (selectedBrand !== "All") {
          const brand = brands.find((b) => b.name === selectedBrand);
          if (brand?._id) params.brand = brand._id;
        }
        if (activeTab !== "All") params.prescriptionType = activeTab;

        const lensesResponse = await lensService.getAllLenses(params);
        if (lensesResponse.success) {
          setLenses(lensesResponse.data.message.data);
        } else {
          setError(lensesResponse.message || "Failed to fetch lenses");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLenses();
  }, [selectedBrand, activeTab, brands]);

  const scrollTabs = (direction) => {
    const container = document.getElementById("tabsContainer");
    if (!container) return;
    const scrollAmount = 100;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const filteredLenses = lenses.filter((lens) =>
    lens.displayName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row h-full w-full">
      <div className="flex-1 p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 ">
          Select Lenses
        </h2>
        <div className="w-full flex flex-col md:flex-row items-start gap-4 sm:gap-1">
          {/* <Brand
            selectedBrand={selectedBrand}
            setSelectedBrand={(brand) => {
              setSelectedBrand(brand);
              setViewCard(null);
            }}
            brands={brands}
          /> */}
          <div className="flex flex-col flex-1 w-full">
            <div className="flex flex-col sm:flex-row items-center mb-4 w-full">
              <div className="flex flex-col sm:flex-row w-full   items-center bg-white border rounded-lg px-3 py-2">
                <div className="relative flex items-center w-full md:w-1/4 lg:w-1/2">
                  <FiSearch
                    size={24}
                    className="absolute top-[6px] left-2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search barcode..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg md:border-none border border-gray-300 focus:outline-none md:ring-0 focus:ring-2 focus:ring-blue-500 font-poppins font-normal text-[18px] leading-[24px] text-[#667085]"
                  />
                </div>

                {/* Tabs with Horizontal Scroll */}
                <div className="relative mt-2 sm:mt-0 sm:ml-4 w-full sm:w-[70%]">
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
                      onClick={() => {
                        setActiveTab("All");
                        setViewCard(null);
                      }}
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
                        onClick={() => {
                          setActiveTab(tab._id);
                          setViewCard(null);
                        }}
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

            {viewCard ? (
              <LenseDetails lens={viewCard} onClose={() => setViewCard(null)} />
            ) : loading ? (
              <div className="h-[80vh] flex justify-center items-center">
                <Loader />
              </div>
            ) : filteredLenses?.length <= 0 ? (
              <div className="h-[80vh] flex justify-center items-center">
                <h6 className=" font-poppins text-lg text-black">
                  {" "}
                  No lenses found
                </h6>
              </div>
            ) : (
              <div
                className="grid w-full justify-items-start mt-1 gap-3 sm:gap-5 lg:gap-2"
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                }}
              >
                {filteredLenses.map((lens) => (
                  <div
                    key={lens._id}
                    className="bg-white rounded-xl shadow p-3 flex flex-col justify-between relative"
                    style={{ minWidth: 220, maxWidth: 264, height: 177 }}
                  >
                    <button
                      className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded"
                      style={{ zIndex: 1 }}
                      onClick={() => {
                        // Navigate to details page with lens ID
                        navigate(`/lens/details/${lens._id}`);
                      }}
                    >
                      View
                    </button>
                    <div className="flex-1 flex justify-center items-center">
                      <img
                        src={
                          lens.photos?.[0] || lens.img || "/default-lens.png"
                        }
                        alt={lens.displayName}
                        className="h-14 w-14 rounded-full object-cover"
                      />
                    </div>
                    <div className="flex items-center justify-between w-full mt-2">
                      <div className="text-sm sm:text-md font-medium text-gray-800">
                        {lens.oldBarcode}
                      </div>
                      <span className="font-poppins text-nowrap font-normal text-[16px] bg-[#EBEBEB] px-[10px] py-[2px] rounded-md leading-[24px] tracking-[0%]">
                        {lens.sellPrice} ₹
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lense;
