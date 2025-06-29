import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SunGlassesService } from "../../services/sunglassesService"; // Adjust the path as needed
import { cartService } from "../../services/cartService";
import {
  AiOutlineHeart,
  AiOutlineSafetyCertificate,
  AiOutlineUser,
} from "react-icons/ai";
import { IoIosArrowDropleft } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { FaShippingFast } from "react-icons/fa";
import { toast } from "react-toastify";
import "./Frames.css"; // Adjust the path as needed
import Loader from "../Loader/Loader";

const SunglassesDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sunglass, setSunglass] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(
    "/images/placeholder-sunglasses.jpg"
  );
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    const fetchSunglassById = async () => {
      setLoading(true);
      try {
        const response = await SunGlassesService.getSunGlassById(id);
        // console.log("Sunglass by ID Response:", response);

        if (response.success) {
          const sunglassData =
            response.data?.message?.data || response.data?.message;
          if (sunglassData) {
            setSunglass(sunglassData);
            setActiveImage(
              sunglassData.photos && sunglassData.photos.length > 0
                ? sunglassData.photos[0]
                : "/images/placeholder-sunglasses.jpg"
            );
            console.log(sunglassData, "sunglass by id response");
          } else {
            setError("No sunglass data found");
          }
        } else {
          setError(response.message);
          console.error("Error from getSunGlassById:", response.message);
          if (
            response.message.includes("access token") ||
            response.message.includes("Unauthorized")
          ) {
            navigate("/login");
          }
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Error fetching sunglass details";
        setError(errorMessage);
        console.error("Fetch Sunglass by ID Error:", errorMessage);
        if (
          errorMessage.includes("Unauthorized") ||
          error.response?.status === 401
        ) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSunglassById();
  }, [id, navigate]);

  const handleAddToCart = async () => {
    try {
      setIsAddingToCart(true);
      const cartItems = [
        {
          product: id,
        },
      ];

      const response = await cartService.addToCart(cartItems);

      if (response.success) {
        toast.success("Added to cart successfully!");
        navigate("/sales-panel/accessories");
      } else {
        // Handle specific error cases
        if (response.message === "Items already in the cart") {
          toast.warning("This sunglass is already in your cart");
        } else {
          toast.error(response.message || "Failed to add to cart");
        }
      }
    } catch (error) {
      // Handle network or other errors
      if (error.response?.status === 401) {
        toast.error("Please login to continue");
        navigate("/login");
      } else if (error.response?.status === 403) {
        toast.error("You don't have permission to perform this action");
      } else {
        toast.error("Error adding to cart. Please try again later.");
      }
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader />;
      </div>
    );
  }

  if (error || !sunglass) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#18181B]">
        <h1 className="font-['Poppins'] font-medium text-[24px] text-white">
          {error || "Sunglasses Not Found"}
        </h1>
        <button
          className="mt-4 font-['Poppins'] font-normal text-[16px] text-white bg-[#242424] px-4 py-2 rounded-md hover:bg-[#3a3a3a]"
          onClick={() => navigate("/sales-panel/sunglasses")}
        >
          Back to Sunglasses
        </button>
      </div>
    );
  }

  const images =
    sunglass.photos && sunglass.photos.length > 0
      ? sunglass.photos
      : ["/images/placeholder-sunglasses.jpg"];

  const ThumbnailImages = () => (
    <div className="flex flex-row sm:flex-col gap-2">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Thumbnail ${index + 1}`}
          className={`w-[129.85px] object-contain h-[94px] rounded-[5px] cursor-pointer ${
            activeImage === img ? "border-2 border-[#E77817]" : "border-none"
          }`}
          onClick={() => setActiveImage(img)}
          onError={(e) => (e.target.src = "/images/placeholder-sunglasses.jpg")}
        />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen px-5 py-5 bg-[#F9FAFB]">
      <button
        className="self-start mb-4 flex items-center font-['Poppins'] font-medium text-[24px] text-[#18181B]"
        onClick={() => navigate("/sales-panel/sunglasses")}
      >
        <IoIosArrowDropleft size={24} className="mr-[4px] mt-[-3px]" /> Back
      </button>

      <div className="flex sm:flex-row flex-col md:gap-x-10 gap-x-3">
        <div className="flex gap-x-5">
          <div className="md:flex hidden h-screen flex-col overflow-y-scroll gap-2 scrollbar-hidden">
            {(sunglass.photos?.length > 0 ? sunglass.photos : frameImages).map(
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
              alt={sunglass.sku}
              className="md:w-[559px] w-full sm:w-[327px] h-full sm:max-h-[290px] md:h-[494px] object-contain rounded-lg"
              onError={(e) =>
                (e.target.src = "/images/placeholder-sunglasses.jpg")
              }
            />
            <div className="mt-4">
              <button className="w-full font-['Poppins'] font-normal text-[16px] leading-[24px] capitalize text-[#242424] border border-[#AAAAAA] px-4 py-2 rounded-md">
                Add Power Sunglasses
              </button>
              <div className="flex sm:flex-nowrap flex-wrap mt-3 gap-2">
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="flex-1 font-['Poppins'] font-normal text-[16px] leading-[24px] capitalize text-[#242424] border border-[#AAAAAA] px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAddingToCart ? "Adding to Cart..." : "Buy Sunglasses"}
                </button>
                <button className="flex-1 font-['Poppins'] text-nowrap font-normal text-[16px] leading-[24px] capitalize text-[#242424] border border-[#AAAAAA] px-2 py-2 rounded-md">
                  Add To Combo
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:mt-0 mt-36 w-full sm:max-w-[300px] md:max-w-[400px]">
          <h1 className="font-poppins font-bold text-[28px] leading-[38px] mb-1">
            {sunglass.displayName}
          </h1>
          <p className="font-['Poppins'] font-medium w-fit py-1 px-[10px] rounded text-[14px] bg-[#EBEBEB] mt-[15px]">
            {sunglass.sku}
          </p>
          <div className="flex flex-col mt-[15px] gap-2 mb-4">
            <span className="font-['Plus_Jakarta_Sans'] flex items-center font-bold text-[38px] leading-[38px] text-[#18181B]">
              {sunglass.sellPrice} ₹
              <span className="text-[#5A5A5A] md:hidden block text-[20px] ml-3">
                [ MRP-{sunglass.MRP} ]
              </span>
            </span>
            <div className="flex items-center gap-x-5">
              <span className="text-yellow-400">★★★★★</span>
              <span className="font-poppins font-medium text-[14px] leading-5 text-[#52525B]">
                157 Reviews
              </span>
            </div>
          </div>
          <div className="sm:hidden flex mb-4">
            <ThumbnailImages />
          </div>
          <h2 className="font-['Poppins'] font-bold text-[16px] leading-[24px] mb-2 text-[#18181B]">
            Features:
          </h2>
          <ul className="list-disc pl-5 mb-4">
            {sunglass.features && sunglass.features.length > 0 ? (
              sunglass.features.map((feature, index) => (
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
            Store Color Available
          </h3>
          <div className="flex gap-3 mb-4">
            <div
              className="w-[30px] h-[30px] rounded-[4px]"
              style={{
                backgroundColor: sunglass.frameColor?.name || "#334155",
              }}
              title={sunglass.frameColor?.name || "Default Color"}
            ></div>
          </div>
          <div className="flex items-center w-full justify-start gap-x-2">
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="flex justify-center items-center w-full md:w-[336px] text-center bg-[#007569] text-white font-poppins font-normal text-[16px] leading-[24px] capitalize px-4 py-[15px] rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAddingToCart ? "Adding to Cart..." : "Add To Cart"}
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

export default SunglassesDetails;
