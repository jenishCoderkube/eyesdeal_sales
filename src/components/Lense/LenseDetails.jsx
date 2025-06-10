import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
// import LenseSlider from "./Slider/LenseSlider"
import { lensService } from "../../services/lensService";
import LenseSlider from "./Slider/LenseSlider"; // Adjust the import path as necessary
const LenseDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [lens, setLens] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLensDetails = async () => {
      console.log(lens, "hvhvhvhv");

      try {
        setLoading(true);
        const response = await lensService.getLensById(id);
        if (response.success) {
          setLens(response.data.message.data); // Adjust based on your API response structure
        } else {
          setError(response.message || "Failed to fetch lens details");
        }
      } catch (err) {
        setError(err.message || "Error fetching lens details");
        if (err.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLensDetails();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full text-red-500">
        {error}
      </div>
    );
  }

  if (!lens) {
    return (
      <div className="flex justify-center items-center h-full">
        Lens not found
      </div>
    );
  }

  return (
    <div>
      <div>
        <button
          className="text-gray-600 flex items-center"
          onClick={() => navigate(-2)}
          aria-label="Go Back"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>
        <LenseSlider lens={lens} />
        <div className="flex justify-center items-center gap-3 mt-8">
          <h6 className="font-poppins font-normal text-[18px] leading-[24px]">
            Sub Total
          </h6>
          =
          <span className="font-poppins font-normal text-nowrap text-[18px] leading-[24px] bg-[#E77817] text-white rounded-[8px] px-3 py-2">
            {lens.sellPrice} ₹
          </span>
        </div>
      </div>
      <div className="flex justify-center mt-12">
        <button className="text-white font-poppins font-normal text-[18px] bg-[#007569] rounded-lg py-4 w-full max-w-[336px]">
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default LenseDetails;
