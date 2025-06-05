import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { frameService } from "../../services/frameService"; // Adjust the path as needed
import GlassesCard from "./GlassesCard"; // Adjust the path as needed

const Frame = () => {
  const navigate = useNavigate();
  const [frames, setFrames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API parameters from your provided endpoint
  const frameType = "63888b24e890e301c3b9862b";
  const brand = "643ba8ba1d47957e3de131c2";
  const frameMaterial = "63889070e890e301c3b98693";

  useEffect(() => {
    const fetchFrames = async () => {
      setLoading(true);
      try {
        const response = await frameService.getAllFrames(frameType, brand, frameMaterial);
        console.log("API Response:", response); // Debug: Log the entire API response

        if (response.success) {
          // Correctly access the nested data array
          const frameData = Array.isArray(response.data?.message?.data)
            ? response.data.message.data
            : response.data?.message?.data
            ? [response.data.message.data] // If it's a single object, wrap it in an array
            : [];
          console.log("Frame Data:", frameData); // Debug: Log the frame data
          setFrames(frameData);
        } else {
          setError(response.message);
          console.error("Error from frameService:", response.message); // Debug: Log the error
          // If the error is due to missing/invalid token, redirect to login
          if (response.message.includes("access token") || response.message.includes("Unauthorized")) {
            navigate("/login");
          }
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Error fetching frames";
        setError(errorMessage);
        console.error("Fetch Error:", errorMessage); // Debug: Log any unexpected errors
        if (errorMessage.includes("Unauthorized") || error.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFrames();
  }, [navigate]);

  console.log("Frames State:", frames); // Debug: Log the frames state before rendering

  if (loading) {
    return <div className="px-5 py-5">Loading...</div>;
  }

  if (error) {
    return <div className="px-5 py-5">Error: {error}</div>;
  }

  if (!frames || frames.length === 0) {
    return <div className="px-5 py-5">No frames available.</div>;
  }

  return (
    <div className="px-5 py-5">
      <div>
        <h1 className="font-poppins font-medium text-[24px] leading-[24px] tracking-[0] text-black w-fit pt-5">
          Select Frames
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-5">
          {frames.map((frame) => {
            // console.log("Rendering Frame:", frame); // Debug: Log each frame being rendered
            return (
              <GlassesCard
                key={frame._id} // Use _id from API response
                title={frame.displayName} // Map displayName to title
                price={`${frame.sellPrice} ₹`} // Map sellPrice to price
                imageUrl={
                  frame.photos && frame.photos.length > 0
                    ? frame.photos[0]
                    : "/images/placeholder-frame.jpg" // Fallback image if photos array is empty
                }
                active={true}
                onClick={() =>
                  navigate(`/frame/details/${frame._id}`, { state: { glass: frame } }) // Fix: Pass individual frame
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Frame;