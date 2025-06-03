import React, { useState } from "react";

const brands = [
  { name: "All", logo: null },
  { name: "Aqualens", logo: "/logo1.png" },
  { name: "SofLens", logo: "/logo2.png" },
  { name: "Air Optix", logo: "/logo3.png" },
  { name: "Freshlook", logo: "/logo4.png" },
];

const lensTabs = ["Single Vision", "Bifocal", "Progressive"];

const lenses = [
  {
    id: 1,
    brand: "Aqualens",
    type: "Single Vision",
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
    type: "Single Vision",
    name: "Blue-Cut Progressive",
    price: 1200,
    img: "/lens3.png",
  },
  {
    id: 4,
    brand: "SofLens",
    type: "Bifocal",
    name: "Hard Coat Progressive",
    price: 1200,
    img: "/lens2.png",
  },
  {
    id: 5,
    brand: "Air Optix",
    type: "Single Vision",
    name: "Hard Coat Progressive",
    price: 1200,
    img: "/lens3.png",
  },
  {
    id: 6,
    brand: "Freshlook",
    type: "Progressive",
    name: "Hard Coat Progressive",
    price: 1200,
    img: "/lens1.png",
  },
];

const Lense = () => {
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [activeTab, setActiveTab] = useState("Single Vision");
  const [search, setSearch] = useState("");

  const filteredLenses = lenses.filter(
    (lens) =>
      (selectedBrand === "All" || lens.brand === selectedBrand) &&
      lens.type === activeTab &&
      lens.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-full">
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Heading */}
        <h2 className="text-xl font-semibold mb-6">Select Lenses</h2>
        {/* Row: Brand column + search/tabs */}
        <div className="flex items-start mb-6">
          {/* Select Brand Column */}
          <div className="flex flex-col items-start mr-8">
            <span className="inline-flex items-center justify-center bg-gray-300 text-gray-600 font-semibold rounded px-7 mb-2 h-[42px] cursor-not-allowed select-none opacity-60">
              Select Brand
            </span>

            <button
              className={`mb-2 rounded-lg border flex flex-col items-center justify-center mt-3 ${
                selectedBrand === "All" ? "border-2 border-orange-400" : ""
              }`}
              style={{ height: 83, width: 151 }}
              onClick={() => setSelectedBrand("All")}
            >
              All
            </button>
            {brands.slice(1).map((brand) => (
              <button
                key={brand.name}
                className={`mb-2 rounded-lg border flex flex-col items-center justify-center ${
                  selectedBrand === brand.name
                    ? "border-2 border-orange-400"
                    : ""
                }`}
                style={{ height: 83, width: 151 }}
                onClick={() => setSelectedBrand(brand.name)}
              >
                {brand.logo && (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-99 h-99 object-contain"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                )}
                {/* <span className="text-xs">{brand.name}</span> */}
              </button>
            ))}
          </div>
          {/* Search and Tabs */}
          <div className="flex flex-col flex-1 ">
            <div className="flex items-center mb-4">
              <div className="flex w-full items-center bg-white border rounded-lg px-3 py-2">
                <input
                  type="text"
                  placeholder="Search barcode..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 outline-none bg-transparent text-gray-700 placeholder-gray-400"
                  style={{ minWidth: 0 }}
                />
                <div className="flex ml-4 h-full items-end">
                  {lensTabs.map((tab) => (
                    <button
                      key={tab}
                      className={`relative px-6 h-[20px] flex items-center text-sm font-medium focus:outline-none transition-colors duration-150 ${
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
              className="grid w-full justify-items-start mt-1"
              style={{
                gridTemplateColumns: "repeat(4, 264px)",
                gap: "20px",
                rowGap: "10px",
                columnGap: "10px",
                justifyContent: "start",
              }}
            >
              {filteredLenses.map((lens) => (
                <div
                  key={lens.id}
                  className="bg-white rounded-xl shadow p-3 flex flex-col justify-between relative"
                  style={{ width: 264, height: 177 }}
                >
                  {/* View button at top right */}
                  <button
                    className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded"
                    style={{ zIndex: 1 }}
                  >
                    View
                  </button>
                  {/* Lens image centered vertically and horizontally */}
                  <div className="flex-1 flex justify-center items-center">
                    <img
                      src={lens.img}
                      alt={lens.name}
                      className="h-14 w-14 rounded-full object-cover"
                    />
                  </div>
                  {/* Bottom row: name left, price right */}
                  <div className="flex items-center justify-between w-full mt-2">
                    <div className="text-md font-lg text-gray-800">
                      {lens.name}
                    </div>
                    <span className="bg-gray-100 px-2 py-1 rounded text-md font-medium ml-2">
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
