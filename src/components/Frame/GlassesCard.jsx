import React from "react";

const GlassesCard = ({
  title = "I-GOG Frames",
  price = "800 ₹",
  imageUrl = null,
  onClick,
}) => {
  const random = Math.floor(Math.random() * 4) + 1;

  return (
    <div
      className="w-full max-w-[300px] sm:max-w-[269.4px] md:max-w-[280px] lg:max-w-[269.4px] h-[160px] sm:h-[173px] md:h-[180px] lg:h-[173px] rounded-[12px] sm:rounded-[15px] bg-white px-2 sm:px-3 py-1 sm:py-2 flex flex-col justify-between cursor-pointer hover:border hover:border-[#E77817] transition-all duration-300 ease-in-out"
      onClick={onClick}
    >
      <div className="w-full h-[90px] sm:h-[100px] md:h-[105px] lg:h-[100px] rounded-[4px] relative bg-white overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            className="w-full h-full object-cover rounded-[4px]"
            onError={(e) => {
              e.target.style.display = "none";
              const fallback = e.target.nextSibling;
              if (fallback) fallback.style.display = "flex";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white rounded-[4px]">
            <p className="text-gray-400 text-[12px] sm:text-[14px] font-poppins">
              Image not found
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center">
        <span className="font-poppins font-normal text-[14px] sm:text-[15px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[24px] tracking-[0%]">
          {title}
        </span>
        <span className="font-poppins text-nowrap font-normal text-[14px] sm:text-[15px] md:text-[16px] bg-[#EBEBEB] px-[8px] sm:px-[10px] py-[2px] rounded-md leading-[20px] sm:leading-[22px] md:leading-[24px] tracking-[0%]">
          {price}
        </span>
      </div>
    </div>
  );
};

export default GlassesCard;
