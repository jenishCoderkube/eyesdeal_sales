import React from "react";
import { FiSearch, FiPlus } from "react-icons/fi";

const CustomerTabRow = () => {
  return (
    <div className="w-full h-auto px-2 flex flex-col gap-[15px] items-center justify-center md:hidden">
      {/* Top Row: Search, Name, Mobile, Add New Customer */}
      <div className="w-full flex flex-row sm:flex-nowrap flex-wrap sm:gap-[15px] gap-2 items-center justify-between">
        <div className="relative w-full sm:max-w-[200px]">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-[46px] pl-10 pr-4 font-poppins font-normal text-[14px] leading-[24px] tracking-[0%] border border-[#E9E9E9]  rounded-lg focus:outline-none"
          />
        </div>
        <div className="xs:w-[30%] w-[45%] sm:max-w-[144px] h-[46px] flex items-center justify-center font-poppins font-normal text-[14px] leading-[24px] tracking-[0%] border border-[#E9E9E9]  rounded-lg">
          Name
        </div>
        <div className="xs:w-[30%] w-[45%] sm:max-w-[139px] h-[46px] flex items-center justify-center font-poppins font-normal text-[14px] leading-[24px] tracking-[0%] border border-[#E9E9E9]  rounded-lg">
          Mobile
        </div>
        <button className="xs:w-[30%] w-full sm:max-w-[200px] h-[46px] flex items-center justify-center gap-2 font-poppins font-normal text-[14px] leading-[24px] tracking-[0%] border border-[#E9E9E9]  rounded-lg hover:bg-gray-100">
          <FiPlus className="text-gray-600" />
          Add New Customer
        </button>
      </div>
      {/* Bottom Row: Action Buttons */}
      <div className="w-full flex flex-row flex-wrap gap-[15px]">
        <button className="flex-1 h-[46px] font-poppins font-normal text-[14px] leading-[24px] tracking-[0%] border border-[#E2E2E2] rounded-[46px] hover:bg-gray-100">
          View Pres
        </button>
        <button className="flex-1 h-[46px] font-poppins font-normal text-[14px] leading-[24px] tracking-[0%] border border-[#E2E2E2] rounded-[46px] hover:bg-gray-100">
          View Order
        </button>
        <button className="flex-1 h-[46px] font-poppins font-normal text-[14px] leading-[24px] tracking-[0%] border border-[#E2E2E2] rounded-[46px] hover:bg-gray-100">
          Add Power
        </button>
      </div>
    </div>
  );
};

export default CustomerTabRow;
