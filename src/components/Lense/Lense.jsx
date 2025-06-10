import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { lensService } from "../../services/lensService"; // Adjust path as needed
import { masterDataService } from "../../services/masterDataService"; // Adjust path as needed
import LenseDetails from "./LenseDetails"; // Adjust path as needed
import Brand from "../Brand/Brand"; // Adjust path as needed

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

  // Fetch brands, prescription types, and lenses
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

  // Fetch lenses when brand or prescription type changes
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

  // Filter lenses client-side for search
  const filteredLenses = lenses.filter((lens) =>
    lens.displayName.toLowerCase().includes(search.toLowerCase())
  );

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
        <div className="flex flex-col md:flex-row items-start gap-4 sm:gap-6">
          {/* Select Brand Column */}
          <Brand
            selectedBrand={selectedBrand}
            setSelectedBrand={(brand) => {
              setSelectedBrand(brand);
              setViewCard(null); // Reset viewCard when changing brand
            }}
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
                    onClick={() => {
                      setActiveTab("All");
                      setViewCard(null); // Reset viewCard when changing tab
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
                          pointerEvents: "none",
                        }}
                      />
                    )}
                  </button>
                  {prescriptionTypes.map((tab) => (
                    <button
                      key={tab._id}
                      className={`relative px-3 sm:px-6 py-1 flex items-center text-xs sm:text-sm font-medium focus:outline-none transition-colors duration-150 ${
                        activeTab === tab._id ? "text-black" : "text-gray-500"
                      }`}
                      style={{ background: "none" }}
                      onClick={() => {
                        setActiveTab(tab._id);
                        setViewCard(null); // Reset viewCard when changing tab
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
                            pointerEvents: "none",
                          }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Lenses Grid or Details */}
            {viewCard ? (
              <LenseDetails lens={viewCard} onClose={() => setViewCard(null)} />
            ) : loading ? (
              <div className="flex justify-center items-center h-full">
                Loading...
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
                        setViewCard(lens);
                        // Optional: Navigate to details page
                        // navigate(`/lens/details/${lens._id}`, { state: { lens } });
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
                        {lens.displayName}
                      </div>
                      <span className="bg-gray-100 px-2 py-1 rounded text-sm sm:text-md font-medium">
                        {lens.price} ₹
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
