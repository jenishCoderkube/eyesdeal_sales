import React from "react";

const Brand = ({ selectedBrand, onSelectBrand, brands = [] }) => {
  return (
    <div className="flex flex-col items-start w-full md:w-auto mt-6 ml-3 md:ml-8">
      <span className="inline-flex w-full max-w-[150px] text-nowrap truncate items-center justify-center bg-gray-300 text-gray-600 font-semibold rounded px-4 sm:px-7 mb-2 h-10 sm:h-[42px] select-none opacity-60">
        {selectedBrand ? selectedBrand.name : "Select Brand"}
      </span>

      <div className="w-[188px] max-h-[695px] overflow-y-auto scrollbar-hide mt-3">
        <div className="sm:grid-cols- md:grid-cols-1 gap-2 sm:gap-3 pr-2">
          {/* Clear Brand Button */}
          <button
            className={`relative rounded-lg border flex flex-col items-center justify-center bg-white ${
              !selectedBrand ? "border-2 border-orange-400" : ""
            }`}
            style={{ height: 83, width: "133%", maxWidth: 151 }}
            onClick={() => onSelectBrand(null)}
          >
            <span className="text-gray-800">All</span>
            {!selectedBrand && (
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

          {brands && brands.length > 0 ? (
            brands.map((brand) => (
              <button
                key={brand._id}
                className={`relative rounded-lg border flex flex-col items-center justify-center bg-white ${
                  selectedBrand?._id === brand._id
                    ? "border-2 border-orange-400"
                    : ""
                }`}
                style={{ height: 83, width: "133%", maxWidth: 151 }}
                onClick={() => onSelectBrand(brand)}
              >
                {brand.logo ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="object-contain"
                      style={{
                        maxWidth: "90%",
                        maxHeight: "90%",
                        padding: "5px",
                      }}
                    />
                  </div>
                ) : (
                  <span className="text-gray-800">{brand.name}</span>
                )}
                {selectedBrand?._id === brand._id && (
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
            ))
          ) : (
            <div className="text-gray-500">No brands available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Brand;
