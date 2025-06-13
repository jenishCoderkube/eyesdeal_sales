import React from "react";

const LenseCard = ({ lens, onSelectLens }) => {
  return (
    <div
      className="bg-white rounded-xl shadow p-3 sm:p-4 flex flex-col justify-between relative w-full max-w-[264px] mx-auto"
      style={{ minWidth: "200px", height: "auto", minHeight: "160px" }}
    >
      <button
        className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-orange-500 text-white text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded"
        style={{ zIndex: 1 }}
        onClick={() => onSelectLens(lens)}
      >
        View
      </button>
      <div className="flex-1 flex justify-center items-center mt-6 sm:mt-8">
        <img
          src={lens.photos?.[0] || lens.img || "/default-lens.png"}
          alt={lens.displayName}
          className="h-[100px] sm:h-[120px] w-full max-w-[200px] sm:max-w-[240px] rounded-full object-cover"
        />
      </div>
      <div className="flex items-center justify-between w-full mt-2 sm:mt-3">
        <div className="text-xs sm:text-sm md:text-md font-medium text-gray-800">
          {lens.oldBarcode}
        </div>
        <span className="font-poppins font-normal text-xs sm:text-sm bg-[#EBEBEB] px-2 sm:px-3 py-1 rounded-md leading-tight sm:leading-[24px] tracking-[0%]">
          {lens.sellPrice} ₹
        </span>
      </div>
    </div>
  );
};

export default LenseCard;
