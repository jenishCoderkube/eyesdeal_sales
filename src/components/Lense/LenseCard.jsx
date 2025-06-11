// LenseCard.jsx
import React from "react";

const LenseCard = ({ lens, onSelectLens }) => {
  return (
    <div
      className="bg-white rounded-xl shadow p-3 flex flex-col justify-between relative"
      style={{ minWidth: 220, maxWidth: 264, height: 177 }}
    >
      <button
        className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded"
        style={{ zIndex: 1 }}
        onClick={() => onSelectLens(lens)}
      >
        View
      </button>
      <div className="flex-1 flex justify-center items-center">
        <img
          src={lens.photos?.[0] || lens.img || "/default-lens.png"}
          alt={lens.displayName}
          className="h-14 w-14 rounded-full object-cover"
        />
      </div>
      <div className="flex items-center justify-between w-full mt-2">
        <div className="text-sm sm:text-md font-medium text-gray-800">
          {lens.oldBarcode}
        </div>
        <span className="font-poppins font-normal text-[16px] bg-[#EBEBEB] px-[10px] py-[2px] rounded-md leading-[24px] tracking-[0%]">
          {lens.sellPrice} ₹
        </span>
      </div>
    </div>
  );
};

export default LenseCard;
