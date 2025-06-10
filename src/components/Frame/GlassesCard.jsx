import React from "react";

const GlassesCard = ({
  title = "I-GOG Frames",
  price = "800 ₹",
  imageUrl = null,
  onClick,
}) => {
  const random = Math.floor(Math.random() * 4) + 1;
  console.log("random", random);

  return (
    <div
      className="w-full md:max-w-[269.4px] h-[173px] rounded-[15px] bg-white px-3 py-2 flex flex-col justify-between cursor-pointer hover:border hover:border-[#E77817] transition-all duration-300 ease-in-out"
      onClick={onClick}
    >
      <div className="w-full h-[100px] rounded-[4px] relative bg-white overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            // src={`/glass_${random}.png `}
            className="w-full h-full object-cover rounded-[4px]"
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
      <div className="flex justify-between items-center">
        <span className="font-poppins font-normal text-[16px] leading-[24px] tracking-[0%]">
          {title}
        </span>
        <span className="font-poppins text-nowrap font-normal text-[16px] bg-[#EBEBEB] px-[10px] py-[2px] rounded-md leading-[24px] tracking-[0%]">
          {price}
        </span>
      </div>
    </div>
  );
};

export default GlassesCard;
