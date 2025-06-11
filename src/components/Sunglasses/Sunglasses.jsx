import React from "react";
import { useNavigate } from "react-router-dom";
import SunglassesCard from "./SunglassesCard";
import Loader from "../Loader/Loader";

const Sunglasses = ({ sunglasses, loading, error }) => {
  const navigate = useNavigate();

  const handleCardClick = (sunglassId, sunglassData) => {
    navigate(`/sunglasses/details/${sunglassId}`, {
      state: { glass: sunglassData },
    });
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (!sunglasses || sunglasses.length <= 0) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <h6 className=" font-poppins text-lg text-black">
          No sunglasses found
        </h6>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col mx-4 mt-1  rounded-xl">
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
