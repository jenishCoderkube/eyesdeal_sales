import React, { useState } from "react";
import Select from "react-select";
import { FaEye } from "react-icons/fa";

const SelectPackage = () => {
  const [selectedPairs, setSelectedPairs] = useState(2);

  const frameOptions = [
    { value: "I-GOG Frames", label: "I-GOG Frames" },
    { value: "I-DOG Frames", label: "I-DOG Frames" },
  ];

  const lensOptions = [
    { value: "Lens 1", label: "Lens 1" },
    { value: "Lens 2", label: "Lens 2" },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "1px solid #000000",
      borderRadius: "8px",
      fontFamily: "Poppins",
      fontWeight: 400,
      fontSize: "18px",
      lineHeight: "24px",
      width: "255px",
      height: "50px",
      padding: "0 10px",
    }),
    menu: (provided) => ({
      ...provided,
      fontFamily: "Poppins",
      fontWeight: 400,
      fontSize: "18px",
      lineHeight: "24px",
    }),
  };

  return (
    <div className="flex flex-col md:flex-row gap-5 p-5 w-full mx-auto">
      {/* Left Section */}
      <div className="flex-1 w-1/2">
        <div className="flex gap-3 mb-5">
          <button
            className={`font-poppins font-normal text-[18px] leading-[24px] w-full max-w-[255px] h-[50px] border border-[#000000] rounded-[8px] ${
              selectedPairs === 1
                ? "bg-[#007569] text-white"
                : "bg-white text-black"
            }`}
            onClick={() => setSelectedPairs(1)}
          >
            Add 1-Pair
          </button>
          <button
            className={`font-poppins font-normal text-[18px] leading-[24px] w-[255px] h-[50px] border border-[#000000] rounded-[8px]  ${
              selectedPairs === 2
                ? "bg-[#007569] text-white"
                : "bg-white text-black"
            }`}
            onClick={() => setSelectedPairs(2)}
          >
            Add 2-Pair
          </button>
        </div>

        {/* First Package */}
        <div className="border border-[#DDDDDD] rounded-[15px] p-5 mb-5">
          <div className="flex items-center gap-3 mb-3">
            <button className="font-poppins font-normal text-[18px] leading-[24px] border border-[#000000] rounded-[8px] px-3 py-2">
              + Add Frame Barcode
            </button>
            <span className="text-[18px]">=</span>
            <Select
              options={frameOptions}
              defaultValue={frameOptions[0]}
              styles={customStyles}
            />
            <button className="flex items-center gap-2 font-poppins font-normal text-[18px] leading-[24px] border border-[#000000] rounded-[8px] px-3 py-2">
              <FaEye /> View Lens
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-poppins font-normal text-[18px] leading-[24px]">
              Select Lens
            </span>
            <Select
              options={lensOptions}
              defaultValue={lensOptions[0]}
              styles={customStyles}
            />
            <span className="font-poppins font-normal text-[18px] leading-[24px] bg-[#E77817] text-white rounded-[8px] px-3 py-2">
              Price = 800 ₹
            </span>
          </div>
        </div>

        <div className="text-center text-[24px] mb-5">+</div>

        {/* Second Package */}
        <div className="border border-[#DDDDDD] rounded-[15px] p-5">
          <div className="flex items-center gap-3 mb-3">
            <button className="font-poppins font-normal text-[18px] leading-[24px] border border-[#000000] rounded-[8px] px-3 py-2">
              + Add Frame Barcode
            </button>
            <span className="text-[18px]">=</span>
            <Select
              options={frameOptions}
              defaultValue={frameOptions[1]}
              styles={customStyles}
            />
            <button className="flex items-center gap-2 font-poppins font-normal text-[18px] leading-[24px] border border-[#000000] rounded-[8px] px-3 py-2">
              <FaEye /> View Lens
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-poppins font-normal text-[18px] leading-[24px]">
              Select Lens
            </span>
            <Select
              options={lensOptions}
              defaultValue={lensOptions[1]}
              styles={customStyles}
            />
            <span className="font-poppins font-normal text-[18px] leading-[24px] bg-[#E77817] text-white rounded-[8px] px-3 py-2">
              Price = 1300 ₹
            </span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 border border-[#DDDDDD] rounded-[15px] p-5">
        <div className="font-poppins font-normal text-[16px] leading-[16px] flex justify-between mb-3">
          <span>Package Price</span>
          <span>1300 ₹</span>
        </div>
        <div className="font-poppins font-normal text-[16px] leading-[16px] flex justify-between mb-3">
          <span>Pre-fix Discount</span>
          <span>0 ₹</span>
        </div>
        <div className="font-poppins font-normal text-[16px] leading-[16px] flex justify-between mb-3">
          <span>Pre-fix Charges</span>
          <span>200 ₹</span>
        </div>
        <div className="font-poppins font-normal text-[16px] leading-[16px] flex justify-between mb-5">
          <span>Net Amt</span>
          <span>1500 ₹</span>
        </div>
        <div className="flex gap-3">
          <button className="flex-1 font-poppins font-normal text-[18px] leading-[24px] bg-[#007569] text-white rounded-[8px] py-2">
            Add Another Package
          </button>
          <button className="flex-1 font-poppins font-normal text-[18px] leading-[24px] bg-[#007569] text-white rounded-[8px] py-2">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectPackage;
