import React from "react";
// import "./GlassesCard.css";

const SunglassesCard = ({
  title = "I-GOG Frames",
  price = "800 ₹",
  imageUrl,
  onClick,
}) => {
  return (
    <div className="w-full  md:max-w-[269.4px] h-[173px]  rounded-[15px] px-3 py-2  flex flex-col justify-between cursor-pointer hover:border hover:border-[#E77817] transition-all duration-300 ease-in-out">
      {/* Image */}
      <div className="w-full h-[100px] rounded-[4px]">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-contain rounded-[4px]"
          onClick={onClick}
        />
      </div>

      {/* Title and Price Row */}
      <div className="flex justify-between items-center">
        <span className="font-poppins font-normal text-[16px] leading-[24px] tracking-[0%]">
          {title}
        </span>
        <span className="font-poppins font-normal text-[16px] bg-[#EBEBEB] px-[10px] py-[2px] rounded-md  leading-[24px] tracking-[0%]">
          {price}
        </span>
      </div>
    </div>
  );
};

export default SunglassesCard;
