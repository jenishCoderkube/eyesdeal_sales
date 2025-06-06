import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  AiOutlineHeart,
  AiOutlineSafetyCertificate,
  AiOutlineUser,
} from "react-icons/ai";
import { IoIosArrowDropleft } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { FaShippingFast } from "react-icons/fa";

const frameImages = [
  "/glass_1.png",
  "/glass_2.png",
  "/glass_3.png",
  "/glass_4.png",
];

// Define a color map
const colorMap = {
  "DA Brown": "#A0522D", // Adjust hex for your preferred brown
  "Transparent Green": "#059669",
  "Black": "#000000",
  "Transparent Pink": "#FFC0CB",
  "Transparent Brown": "#A52A2A",
  "Transparent Purplen": "#A020F0",

  // Add more mappings as needed
};



const FrameDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const glass = state?.glass || {
    sku: "I-GOG Frames",
    sellPrice: "₹800",
    photos: ["/glass_1.png"],
    displayName: "I-GOG Frames",

  };

  // console.log("Glass Data:", glass.frameColor.name);
  // console.log("Frame Images:", frameImages);
const frameColorName = glass?.frameColor?.name || "";
const colorHex = colorMap[frameColorName];

  if (!state?.glass) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#18181B]">
        <h1 className="font-['Poppins'] font-medium text-[24px] text-white">
          Frame Not Found
        </h1>
        <button
          className="mt-4 font-['Poppins'] font-normal text-[16px] text-white bg-[#242424] px-4 py-2 rounded-md hover:bg-[#3a3a3a]"
          onClick={() => navigate("/sales-panel")}
        >
          Back to Frames
        </button>
      </div>
    );
  }

  const [activeImage, setActiveImage] = React.useState(glass.photos?.[0] || "/glass_1.png");

  return (
    <div className="flex flex-col min-h-screen px-5 py-5 bg-[#F9FAFB]">
      <button
        className="self-start mb-4 flex items-center font-['Poppins'] font-medium text-[24px] text-[#18181B]"
        onClick={() => navigate("/sales-panel")}
      >
        <IoIosArrowDropleft size={24} className="mr-[10px]" /> Back
      </button>

      <div className="flex sm:flex-row flex-col md:gap-x-10 gap-x-3">
        <div className="flex gap-x-5">
          <div className="md:flex hidden flex-col gap-2">
            {(glass.photos || frameImages).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`w-[129.85px] object-contain h-[94px] rounded-[5px] cursor-pointer ${activeImage === img
                    ? "border-2 border-[#E77817]"
                    : "border-none"
                  }`}
                onClick={() => setActiveImage(img)}
              />
            ))}
          </div>

          <div className="flex-1">
            <img
              src={activeImage}
              alt={glass.sku}
              className="md:w-[559px] w-full sm:w-[327px] h-full sm:max-h-[290px] md:h-[494px] object-contain rounded-lg"
              onError={(e) => (e.target.src = "/images/placeholder-frame.jpg")}
            />
            <div className="mt-4">
              <button className="w-full font-['Poppins'] font-normal text-[16px] leading-[24px] capitalize text-[#242424] border border-[#AAAAAA] px-4 py-2 rounded-md">
                Select Lens
              </button>
              <div className="flex sm:flex-nowrap flex-wrap mt-3 gap-2">
                <button className="flex-1 font-['Poppins'] font-normal text-[16px] leading-[24px] capitalize text-[#242424] border border-[#AAAAAA] px-4 py-2 rounded-md">
                  Buy Frame Only
                </button>
                <button className="flex-1 font-['Poppins'] text-nowrap font-normal text-[16px] leading-[24px] capitalize text-[#242424] border border-[#AAAAAA] px-2 py-2 rounded-md">
                  Add To Package
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:mt-0 mt-36 w-full sm:max-w-[300px] md:max-w-[400px]">
          <h1 className="font-poppins font-bold text-[28px] leading-[38px] mb-1">
            {glass.displayName}
          </h1>
          <p className="font-['Poppins'] font-medium w-fit py-1 px-[10px] rounded text-[14px] bg-[#EBEBEB] mt-[15px]">
            {glass.sku}
          </p>

          <div className="flex flex-col mt-[15px] gap-2 mb-4">
            <span className="font-['Plus_Jakarta_Sans'] flex items-center font-bold text-[38px] leading-[38px] text-[#18181B]">
              {glass.sellPrice} ₹
              <span className="text-[#5A5A5A] md:hidden block text-[20px] ml-3">
                [ MRP-870 ]
              </span>
            </span>
            <div className="flex items-center gap-x-5">
              <span className="text-yellow-400">★★★★★</span>
              <span className="font-poppins font-medium text-[14px] leading-5 text-[#52525B]">
                157 Reviews
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-jakarta font-bold text-[16px] leading-[24px] mb-2 text-[#18181B]">
              {/* {glass.frameColor.name} */}
            </h3>
          </div>

          <h2 className="font-['Poppins'] font-bold text-[16px] leading-[24px] mb-2 text-[#18181B]">
            Features:
          </h2>
          <ul className="list-disc pl-5 mb-4">
            <li className="font-['Poppins'] font-medium text-[16px] leading-[29px] text-[#52525B]">
              Lightweight acetate
            </li>
            <li className="font-['Poppins'] font-medium text-[16px] leading-[29px] text-[#52525B]">
              Anti-glare, scratch-resistant
            </li>
            <li className="font-['Poppins'] font-medium text-[16px] leading-[29px] text-[#52525B]">
              Unisex, modern minimalist
            </li>
          </ul>

          <h3 className="font-jakarta font-bold text-[16px] leading-[24px] mb-2 text-[#18181B]">
            {frameColorName}
          </h3>

          {colorHex && (
            <div className="flex gap-3 mb-4">
              <div
                className="w-[30px] h-[30px] rounded-[4px]"
                style={{ backgroundColor: colorHex }}
              ></div>
            </div>
          )}


          <div className="flex items-center w-full justify-start gap-x-2">
            <button className="flex justify-center items-center w-full md:w-[336px] text-center bg-[#007569] text-white font-poppins font-normal text-[16px] leading-[24px] capitalize px-4 py-[15px] rounded-md">
              Add To Cart
            </button>
            <div className="w-[59px] h-[53px] border border-[#E5E7EB] rounded-md flex items-center justify-center cursor-pointer">
              <FaRegHeart size={20} height={16} />
            </div>
          </div>

          <div className="flex items-center mt-[15px] gap-2 mb-2">
            <FaShippingFast size={20} className="text-[#52525B]" />
            <p className="font-['Poppins'] font-medium text-[14px] leading-[21px] text-[#52525B]">
              Free shipping worldwide
            </p>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <AiOutlineSafetyCertificate size={20} className="text-[#52525B]" />
            <p className="font-['Poppins'] font-medium text-[14px] leading-[21px] text-[#52525B]">
              100% Secured Payment
            </p>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <AiOutlineUser size={20} className="text-[#52525B]" />
            <p className="font-['Poppins'] font-medium text-[14px] leading-[21px] text-[#52525B]">
              Made by the Professionals
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameDetails;