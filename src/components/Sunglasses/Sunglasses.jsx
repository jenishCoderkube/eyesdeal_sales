import React from "react";
import { useNavigate } from "react-router-dom";
import SunglassesCard from "./SunglassesCard";

const Sunglasses = ({ sunglasses, loading, error }) => {
  const navigate = useNavigate();

  const handleCardClick = (sunglassId, sunglassData) => {
    navigate(`/sunglasses/details/${sunglassId}`, {
      state: { glass: sunglassData },
    });
  };

  if (loading) {
    return <div className="px-5 py-5 text-gray-700">Loading sunglasses...</div>;
  }

  if (error) {
    return <div className="px-5 py-5 text-red-500">Error: {error}</div>;
  }

  if (!sunglasses || sunglasses.length === 0) {
    return (
      <div className="px-5 py-5 text-gray-700">
        No sunglasses found for the selected filters.
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col mx-4 mt-1 border border-gray-200 rounded-xl">
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
              onClick={() => handleCardClick(sunglass._id, sunglass)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sunglasses;
