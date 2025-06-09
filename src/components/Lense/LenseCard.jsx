import React from "react";
import { useNavigate } from "react-router-dom";

const LenseCard = ({ lens, imageUrl }) => {
  const navigate = useNavigate();
  const baseUrl =
    "https://s3.ap-south-1.amazonaws.com/eyesdeal.blinklinksolutions.com/";
  const fullImageUrl = imageUrl
    ? `${baseUrl}${imageUrl}`
    : "/images/placeholder-sunglasses.jpg";

  const random = Math.floor(Math.random() * 5) + 1;
  console.log("random", random);
  return (
    <div
      className="bg-white rounded-xl shadow p-3 flex flex-col justify-between relative"
      style={{ minWidth: 220, maxWidth: 264, height: 177 }}
    >
      <button
        className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded"
        style={{ zIndex: 1 }}
        onClick={() => {
          navigate(`/lens/details/${lens._id}`, { state: { lens } });
        }}
      >
        View
      </button>
      <div className="flex-1 flex justify-center items-center">
        {imageUrl ? (
          <img
            // src={fullImageUrl}
            src={fullImageUrl}
            className="max-w-[190px] max-h-[100px] object-contain rounded-[4px]"
            onError={(e) => {
              e.target.style.display = "none";
              const fallback = e.target.nextSibling;
              if (fallback) fallback.style.display = "flex";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white rounded-[4px]">
            <p className="text-gray-400">Image not found</p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between w-full mt-2">
        <div className="text-sm sm:text-md font-medium text-gray-800">
          {lens.HSNCode}
        </div>
        <span className="font-poppins font-normal text-[16px] bg-[#EBEBEB] px-[10px] py-[2px] rounded-md leading-[24px] tracking-[0%]">
          {lens.sellPrice} ₹
        </span>
      </div>
    </div>
  );
};

export default LenseCard;
