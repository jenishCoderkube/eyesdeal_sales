import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const brands = [
  { name: "All", logo: null },
  { name: "Aqualens", logo: "/logo1.png" },
  { name: "SofLens", logo: "/logo2.png" },
  { name: "Air Optix", logo: "/logo3.png" },
  { name: "Freshlook", logo: "/logo4.png" },
];

const lensTabs = ["Single Vision", "Bifocal", "Progressive", "Power Sunglasses"];


const lenses = [
  {
    id: 1,
    brand: "Aqualens",
    type: "Progressive",
    name: "Hard Coat Progressive",
    price: 1200,
    img: "/lens1.png",
  },
  {
    id: 2,
    brand: "Aqualens",
    type: "Progressive",
    name: "ARC Progressive",
    price: 1200,
    img: "/lens2.png",
  },
  {
    id: 3,
    brand: "SofLens",
    type: "Progressive",
    name: "Blue-Cut Progressive",
    price: 1200,
    img: "/lens3.png",
  },
  {
    id: 4,
    brand: "SofLens",
    type: "Progressive",
    name: "Hard Coat Progressive",
    price: 1200,
    img: "/lens2.png",
  },
  {
    id: 5,
    brand: "Air Optix",
    type: "Progressive",
    name: "Hard Coat Progressive",
    price: 1200,
    img: "/lens3.png",
  },
  {
    id: 6,
    brand: "Air Optix",
    type: "Progressive",
    name: "Hard Coat Progressive",
    price: 1200,
    img: "/lens1.png",
  },
  {
    id: 7,
    brand: "Freshlook",
    type: "Progressive",
    name: "Blue-Cut Progressive",
    price: 1200,
    img: "/lens3.png",
  },
  {
    id: 8,
    brand: "Freshlook",
    type: "Progressive",
    name: "Hard Coat Progressive",
    price: 1200,
    img: "/lens1.png",
  },
];

const Lense = () => {
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [activeTab, setActiveTab] = useState("Progressive");
  const [search, setSearch] = useState("");


const navigate = useNavigate();


  const filteredLenses = lenses.filter(
    (lens) =>
      (selectedBrand === "All" || lens.brand === selectedBrand) &&
      lens.type === activeTab &&
      lens.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row h-full w-full">
      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6">
        {/* Heading */}
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Select Lenses</h2>
        {/* Row: Brand column + search/tabs */}
        <div className="flex flex-col md:flex-row items-start gap-4 sm:gap-6">
          {/* Select Brand Column */}
          <div className="flex flex-col items-start w-full md:w-auto md:mr-6">
            <span className="inline-flex items-center justify-center bg-gray-300 text-gray-600 font-semibold rounded px-4 sm:px-7 mb-2 h-10 sm:h-[42px] select-none opacity-60">
              Select Brand
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-2 sm:gap-3 w-full md:w-auto mt-3">
              <button
                className={`rounded-lg border flex flex-col items-center justify-center bg-white ${
                  selectedBrand === "All" ? "border-2 border-orange-400" : ""
                }`}
                style={{ height: 83, width: "133%", maxWidth: 151 }}
                onClick={() => setSelectedBrand("All")}
              >
                All
              </button>
              {brands.slice(1).map((brand) => (
                <button
                  key={brand.name}
                  className={`relative rounded-lg border flex flex-col items-center justify-center bg-white ${
                    selectedBrand === brand.name ? "border-2 border-orange-400" : ""
                  }`}
                  style={{ height: 83, width: "133%", maxWidth: 151 }}
                  onClick={() => setSelectedBrand(brand.name)}
                >
                  {brand.logo ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="object-contain"
                        style={{ maxWidth: "90%", maxHeight: "90%", padding: "5px" }}
                      />
                    </div>
                  ) : (
                    <span className="text-gray-800">{brand.name}</span>
                  )}
                  {selectedBrand === brand.name && (
                    <div
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center"
                      style={{ marginRight: "-20px" }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          width: "8px",
                          height: "8px",
                          borderTop: "2px solid #fb923c",
                          borderRight: "2px solid #fb923c",
                          transform: "rotate(45deg)",
                          marginRight: "2px",
                        }}
                      />
                      <span
                        style={{
                          display: "inline-block",
                          width: "8px",
                          height: "8px",
                          borderTop: "2px solid #fb923c",
                          borderRight: "2px solid #fb923c",
                          transform: "rotate(45deg)",
                        }}
                      />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
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
                  {lensTabs.map((tab) => (
                    <button
                      key={tab}
                      className={`relative px-3 sm:px-6 py-1 flex items-center text-xs sm:text-sm font-medium focus:outline-none transition-colors duration-150 ${
                        activeTab === tab ? "text-black" : "text-gray-500"
                      }`}
                      style={{ background: "none" }}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                      {activeTab === tab && (
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
            <div
              className="grid w-full justify-items-start mt-1 gap-3 sm:gap-5 lg:gap-2"
              style={{
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(220px, 1fr))",
              }}
            >
              {filteredLenses.map((lens) => (
                <div
                  key={lens.id}
                  className="bg-white rounded-xl shadow p-3 flex flex-col justify-between relative"
                  style={{ minWidth: 220, maxWidth: 264, height: 177 }}
                >
                  <button
                    className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded"
                    style={{ zIndex: 1 }}
                    onClick={() =>
                    {
                        // console.log(`lens`, lens);

                       navigate(`/lens/details/${lens.id}`, { state: { lens } })
                    }
                    }
                  >
                    View
                  </button>
                  <div className="flex-1 flex justify-center items-center">
                    <img
                      src={lens.img}
                      alt={lens.name}
                      className="h-14 w-14 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between w-full mt-2">
                    <div className="text-sm sm:text-md font-medium text-gray-800">
                      {lens.name}
                    </div>
                    <span className="bg-gray-100 px-2 py-1 rounded text-sm sm:text-md font-medium">
                      {lens.price} ₹
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lense;