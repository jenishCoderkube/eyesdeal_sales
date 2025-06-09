import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SunGlassesService } from "../../services/sunglassesService"; // Adjust the path as needed
import SunglassesCard from "./SunglassesCard"; // Adjust the path as needed

const Sunglasses = () => {
  const [sunglasses, setSunglasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const frameType = "63888b24e890e301c3b9862b";
  const brand = "6388875fe890e301c3b98579";
  const frameMaterial = "63888f87e890e301c3b9868d";

  useEffect(() => {
    const fetchSunglasses = async () => {
      setLoading(true);
      try {
        const response = await SunGlassesService.getAllSunGlasses();
        console.log("API Response:", response);

        if (response.success) {
          const sunglassesData = Array.isArray(response.data?.message?.data)
            ? response.data.message.data
            : response.data?.message?.data
            ? [response.data.message.data]
            : [];
          console.log("Sunglasses Data:", sunglassesData);
          setSunglasses(sunglassesData);
        } else {
          setError(response.message);
          console.error("Error from SunGlassesService:", response.message);
          if (
            response.message.includes("access token") ||
            response.message.includes("Unauthorized")
          ) {
            navigate("/login");
          }
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Error fetching sunglasses";
        setError(errorMessage);
        console.error("Fetch Error:", errorMessage);
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

    fetchSunglasses();
  }, [navigate]);

  if (loading) {
    return <div className="px-5 py-5">Loading...</div>;
  }

  if (error) {
    return <div className="px-5 py-5">Error: {error}</div>;
  }

  if (!sunglasses || sunglasses.length === 0) {
    return <div className="px-5 py-5">No sunglasses available.</div>;
  }

  return (
    <div className="px-5 py-5">
      <div>
        <h1 className="font-poppins font-medium text-[24px] leading-[24px] tracking-[0] text-black w-fit pt-5">
          Select Sunglasses
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-5">
          {sunglasses.map((sunglass) => (
            <SunglassesCard
              key={sunglass._id}
              title={sunglass.sku}
              price={`${sunglass.sellPrice} ₹`}
              imageUrl={
                sunglass.photos && sunglass.photos.length > 0
                  ? sunglass.photos[0]
                  : null
              }
              active={true}
              onClick={() => navigate(`/sunglasses/details/${sunglass._id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sunglasses;
