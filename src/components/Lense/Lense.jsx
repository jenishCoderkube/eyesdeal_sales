import React, { useState, useEffect } from "react";
import Brand from "../Brand/Brand";
import { lensService } from "../../services/lensService";
import { masterDataService } from "../../services/masterDataService";
import LenseCard from "./LenseCard";

const Lense = () => {
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [lenses, setLenses] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [prescriptionType, setprescriptionType] = useState([]);

  const fetchLenses = async (brandId = null, prescriptionTypeId = null) => {
    try {
      setLoading(true);
      const params = {};
      if (brandId && brandId !== "All") params.brand = brandId;
      if (prescriptionTypeId && prescriptionTypeId !== "All")
        params.prescriptionType = prescriptionTypeId;

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [brandsResponse, prescriptionTypeResponse] = await Promise.all([
          masterDataService.getBrands(),
          lensService.getAllprescriptionType(),
        ]);

        if (prescriptionTypeResponse.success) {
          setprescriptionType(prescriptionTypeResponse.data.data);
        } else {
          setError(
            prescriptionTypeResponse.message ||
              "Failed to fetch prescription types"
          );
        }

        if (brandsResponse.success) {
          const brandsData = Array.isArray(brandsResponse.data?.data)
            ? brandsResponse.data.data
            : [];
          setBrands([{ name: "All", logo: null }, ...brandsData]);
        } else {
          setError(brandsResponse.message || "Failed to fetch brands");
        }

        // Initial fetch of all lenses
        await fetchLenses();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Effect to refetch lenses when brand or prescription type changes
  useEffect(() => {
    const brandId =
      selectedBrand === "All"
        ? null
        : brands.find((b) => b.name === selectedBrand)?._id;
    const prescriptionTypeId = activeTab === "All" ? null : activeTab;
    fetchLenses(brandId, prescriptionTypeId);
  }, [selectedBrand, activeTab]);

  console.log(prescriptionType, "prescriptionType");

  // const filteredLenses = lenses.filter(
  //   (lens) =>
  //     (selectedBrand === "All" ||
  //       (lens.brand && lens.brand.name === selectedBrand)) &&
  //     lens.prescriptionType.name === activeTab &&
  //     lens.displayName.toLowerCase().includes(search.toLowerCase())
  // );

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-full">Loading...</div>
  //   );
  // }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-full w-full">
      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6">
        {/* Heading */}
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
          Select Lenses
        </h2>
        {/* Row: Brand column + search/tabs */}
        <div className="flex flex-col md:flex-row items-start">
          {/* Select Brand Column */}
          <Brand
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            brands={brands}
          />

          {/* Search and Tabs */}
          <div className="flex flex-col flex-1 w-full">
            <div className="flex flex-col sm:flex-row items-center mb-4 w-full">
              <div className="flex flex-col sm:flex-row w-full items-center bg-white border rounded-lg px-3 py-2">
                <input
                  type="text"
                  placeholder="Search barcode..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 outline-none bg-transparent text-gray-700 placeholder-gray-400 w-full sm:w-auto"
                />
                <div className="flex flex-wrap justify-center sm:justify-end mt-2 sm:mt-0 sm:ml-4 w-full sm:w-auto">
                  <button
                    className={`relative px-3 sm:px-6 py-1 flex items-center text-xs sm:text-sm font-medium focus:outline-none transition-colors duration-150 ${
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
                          pointerEvents: "none",
                        }}
                      />
                    )}
                  </button>
                  {prescriptionType.map((tab) => (
                    <button
                      key={tab._id}
                      className={`relative px-3 sm:px-6 py-1 flex items-center text-xs sm:text-sm font-medium focus:outline-none transition-colors duration-150 ${
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
                            pointerEvents: "none",
                          }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Lenses Grid */}
            {loading ? (
              <h1>Loading...</h1>
            ) : (
              <div
                className="grid w-full justify-items-start mt-1 gap-3 sm:gap-5 lg:gap-2 overflow-y-auto max-h-[px] scrollbar-hidden"
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                }}
              >
                {lenses.map((lens) => (
                  <LenseCard
                    key={lens._id}
                    lens={lens}
                    imageUrl={
                      lens.photos && lens.photos.length > 0
                        ? lens.photos[0]
                        : null
                    }
                  />
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
