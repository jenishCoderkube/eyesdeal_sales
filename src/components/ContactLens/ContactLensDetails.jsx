import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LenseSlider from "./Slider/LenseSlider";
import { contactLensService } from "../../services/contactLensService";
import { cartService } from "../../services/cartService";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import {
  setContactLensId,
  clearFrameLens,
} from "../../store/FrameLens/frameLensSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ContactLensDetails = ({ lens, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const readingGlassId = useSelector((state) => state.frameLens.readingGlassId);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [disposabilityTypes, setdisposabilityTypes] = useState([]);
  const [error, setError] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Fetch contact lens data by ID
  const isBelow768 = useMediaQuery({ query: "(max-width: 767px)" });
  const isBelow1024 = useMediaQuery({ query: "(max-width: 1023px)" });

  useEffect(() => {
    const fetchdisposabilityTypes = async () => {
      try {
        const response = await contactLensService.getAllDisposability();
        if (response.success) {
          setdisposabilityTypes(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching prescription types:", err);
      }
    };

    fetchdisposabilityTypes();
  }, []);

  const scrollTabs = (direction) => {
    const container = document.getElementById("tabsContainer");
    if (!container) return;
    const scrollAmount = isBelow768 ? 80 : 100;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleAddToCart = async () => {
    if (!lens || !lens._id) return;

    try {
      setIsAddingToCart(true);
      dispatch(setContactLensId(lens._id));

      // If there's no reading glass ID in the slice, clear all data and add only the contact lens
      if (!readingGlassId) {
        dispatch(clearFrameLens());
        const cartItems = [
          {
            lens: lens._id,
          },
        ];

        const response = await cartService.addToCart(cartItems);
        console.log("response", response);

        if (response.success) {
          toast.success("Added to cart successfully!");
          navigate("/sales-panel/accessories");
        } else {
          console.log("Failed to add to cart");
          toast.error(response.message || "Failed to add to cart");
        }
      } else {
        // If there's a reading glass ID, add reading glass + contact lens combination
        const cartItems = [
          {
            product: readingGlassId,
            lens: lens._id,
          },
        ];

        const response = await cartService.addToCart(cartItems);
        console.log("response", response);

        if (response.success) {
          toast.success("Added to cart successfully!");
          navigate("/sales-panel/accessories");
        } else {
          console.log("Failed to add to cart");
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

  // Handle error or no lens found
  if (error || !lens) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="font-['Poppins'] text-black font-medium text-[24px]">
          {error || "Contact Lens Not Found"}
        </h1>
        <button
          className="mt-4 font-['Poppins'] font-normal text-[16px] text-white bg-[#242424] px-4 py-2 rounded-md hover:bg-[#3a3a3a]"
          onClick={() => navigate("/sales-panel/contact-lens")}
        >
          Back to Contact Lenses
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Search and Tabs Section */}
        <div className="flex flex-col sm:flex-row items-center bg-white border border-gray-200 rounded-lg shadow-sm px-4 py-3 gap-3 sm:gap-6 mb-6">
          <div className="relative w-full sm:w-1/3">
            <FiSearch
              size={isBelow768 ? 20 : 24}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search barcode..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none font-poppins text-sm sm:text-base text-gray-700 placeholder-gray-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Tabs Section */}
          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-2/3">
            <button
              onClick={() => scrollTabs("left")}
              className="p-1 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>

            <div
              id="tabsContainer"
              className="flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide flex-1"
            >
              <button
                onClick={() => setActiveTab("All")}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium whitespace-nowrap transition-colors ${
                  activeTab === "All"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              {disposabilityTypes.map((type) => (
                <button
                  key={type._id}
                  onClick={() => setActiveTab(type.name)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium whitespace-nowrap transition-colors ${
                    activeTab === type.name
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {type.name}
                </button>
              ))}
            </div>

            <button
              onClick={() => scrollTabs("right")}
              className="p-1 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Lens Details Card */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8">
          <LenseSlider onClose={onClose} lens={lens} />
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
            <h6 className="font-poppins font-medium text-base sm:text-lg text-gray-800">
              Sub Total
            </h6>
            <span className="font-poppins font-semibold text-base sm:text-lg bg-orange-500 text-white rounded-lg px-4 py-2">
              {lens.sellPrice} ₹
            </span>
          </div>
          {/* Add to Cart Button */}
          <div className="flex justify-center mt-8">
            <button
              className="w-full max-w-xs sm:max-w-sm lg:max-w-md bg-teal-600 text-white font-poppins font-medium text-base sm:text-lg py-3 sm:py-4 rounded-lg hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleAddToCart}
              disabled={isAddingToCart}
            >
              {isAddingToCart ? "Adding to Cart..." : "Add To Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactLensDetails;
