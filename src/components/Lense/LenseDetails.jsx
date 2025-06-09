import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import LenseSlider from "./Slider/LenseSlider";

const LenseDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();

  return (
    <div>
      <div>
        <LenseSlider />
        <div className="flex justify-center items-center gap-3 mt-8">
          <h6 className="font-poppins font-normal text-[18px] leading-[24px]">
            Sub Total
          </h6>
          =
          <span className="font-poppins font-normal text-nowrap text-[18px] leading-[24px] bg-[#E77817] text-white rounded-[8px] px-3 py-2">
            800 ₹
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
