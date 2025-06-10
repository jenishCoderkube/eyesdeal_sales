import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  AiOutlineHeart,
  AiOutlineSafetyCertificate,
  AiOutlineUser,
} from "react-icons/ai";
import { IoIosArrowDropleft } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { FaShippingFast } from "react-icons/fa";
import { frameService } from "../../services/frameService"; // Adjust path as needed
import "./Frames.css"; // Import your CSS file for styling
const frameImages = [
  "/glass_1.png",
  "/glass_2.png",
  "/glass_3.png",
  "/glass_4.png",
];

// Define a color map
const colorMap = {
  Blue: "#0000FF", // Updated for the API response
  "DA Brown": "#A0522D",
  "Transparent Green": "#059669",
  Black: "#000000",
  "Transparent Pink": "#FFC0CB",
  "Transparent Brown": "#A52A2A",
  "Transparent Purple": "#A020F0",
};

const FrameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [glass, setGlass] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  // Fetch frame data by ID
  useEffect(() => {
    const fetchFrame = async () => {
      try {
        setLoading(true);
        const response = await frameService.getFrameById(id);
        if (response.success) {
          const frameData = response.data.message.data;
          setGlass(frameData);
          setActiveImage(frameData.photos?.[0] || frameImages[0]);
        } else {
          setError(response.message || "Failed to fetch frame details");
        }
      } catch (err) {
        setError(err.message || "Unexpected error occurred");
        if (err.message.includes("Unauthorized")) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFrame();
  }, [id, navigate]);

  // Handle loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="font-['Poppins'] font-medium text-[24px] text-black">
          Loading...
        </h1>
      </div>
    );
  }

  // Handle error or no frame found
  if (error || !glass) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#18181B]">
        <h1 className="font-['Poppins'] font-medium text-[24px] text-white">
          {error || "Frame Not Found"}
        </h1>
        <button
          className="mt-4 font-['Poppins'] font-normal text-[16px] text-white bg-[#242424] px-4 py-2 rounded-md hover:bg-[#3a3a3a]"
          onClick={() => navigate("/sales-panel/frames")}
        >
          Back to Frames
        </button>
      </div>
    );
  }

  const frameColorName = glass?.frameColor?.name || "Unknown";
  const colorHex = colorMap[frameColorName] || "#000000"; // Default to black if color not in map

  return (
    <div className="flex flex-col min-h-screen px-5 py-5 bg-[#F9FAFB]">
      <button
        className="self-start mb-4 flex items-center font-['Poppins'] font-medium text-[24px] text-[#18181B]"
        onClick={() => navigate("/sales-panel/frame")}
      >
        <IoIosArrowDropleft size={24} className="mr-[10px]" /> Back
      </button>

      <div className="flex sm:flex-row flex-col md:gap-x-10 gap-x-3">
        <div className="flex gap-x-5">
          <div className="md:flex hidden h-screen flex-col overflow-y-scroll gap-2 scrollbar-hidden">
            {(glass.photos?.length > 0 ? glass.photos : frameImages).map(
              (img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-[129.85px] object-contain h-[94px] rounded-[5px] cursor-pointer ${
                    activeImage === img
                      ? "border-2 border-[#E77817]"
                      : "border-none"
                  }`}
                  onClick={() => setActiveImage(img)}
                  onError={(e) =>
                    (e.target.src = "/images/placeholder-frame.jpg")
                  }
                />
              )
            )}
          </div>

          <div className="flex-1">
            <img
              src={activeImage}
              alt={glass.displayName}
              className="md:w-[559px] w-full sm:w-[327px] h-full sm:max-h-[290px] md:h-[494px] object-contain rounded-lg"
              onError={(e) => (e.target.src = "/images/placeholder-frame.jpg")}
            />
            <div className="md:hidden grid grid-cols-3 flex-wrap gap-2">
              {(glass.photos?.length > 0 ? glass.photos : frameImages).map(
                (img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className={`w-[100px] object-contain   h-[50px] rounded-[5px] cursor-pointer ${
                      activeImage === img
                        ? "border-2 border-[#E77817]"
                        : "border-none"
                    }`}
                    onClick={() => setActiveImage(img)}
                    onError={(e) =>
                      (e.target.src = "/images/placeholder-frame.jpg")
                    }
                  />
                )
              )}
            </div>
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
              ₹{glass.sellPrice}
              <span className="text-[#5A5A5A] md:hidden block text-[20px] ml-3">
                [ MRP-{glass.MRP} ]
              </span>
            </span>
            <div className="flex items-center gap-x-5">
              <span className="text-yellow-400">★★★★★</span>
              <span className="font-poppins font-medium text-[14px] leading-5 text-[#52525B]">
                157 Reviews
              </span>
            </div>
          </div>

          <h2 className="font-['Poppins'] font-bold text-[16px] leading-[24px] mb-2 text-[#18181B]">
            Features:
          </h2>
          <ul className="list-disc pl-5 mb-4">
            {glass.features && glass.features.length > 0 ? (
              glass.features.map((feature, index) => (
                <li
                  key={index}
                  className="font-['Poppins'] font-medium text-[16px] leading-[29px] text-[#52525B]"
                >
                  {feature.name}
                </li>
              ))
            ) : (
              <li className="font-['Poppins'] font-medium text-[16px] leading-[29px] text-[#52525B]">
                No features available
              </li>
            )}
          </ul>

          <h3 className="font-jakarta font-bold text-[16px] leading-[24px] mb-2 text-[#18181B]">
            Color: {frameColorName}
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
