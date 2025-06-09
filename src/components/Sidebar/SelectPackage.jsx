import React, { useEffect, useState } from "react";
import Select from "react-select";
import { FaEye, FaTimes } from "react-icons/fa";

const SelectPackage = () => {
  const [selectedPairs, setSelectedPairs] = useState(2);
  const useIsMobile = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(
      () => window.innerWidth <= breakpoint
    );

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= breakpoint);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [breakpoint]);

    return isMobile;
  };
  const isMobile = useIsMobile(); // returns true on small screens

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
      fontSize: isMobile ? "16px" : "18px",
      lineHeight: "24px",

      height: "50px",
      padding: "0 5px",
    }),
    menu: (provided) => ({
      ...provided,
      fontFamily: "Poppins",
      fontWeight: 400,
      fontSize: isMobile ? "16px" : "18px",
      lineHeight: "24px",
    }),
  };

  return (
    <div>
      <h1 class="font-medium w-fit px-5 pt-5 text-[24px] leading-[24px] tracking-[0] text-black font-poppins">
        Select Package
      </h1>

      <div className="flex flex-col  md:flex-row gap-5 p-5 w-full mx-auto">
        {/* Left Section */}

        <div className="flex-1 md:w-1/2 w-full">
          <div className="flex flex-nowrap gap-3 mb-5">
            <button
              className={`font-poppins font-normal text-[18px] leading-[24px] text-nowrap w-[245px] md:w-[255px] h-[50px] rounded-[8px] flex items-center justify-center relative ${
                selectedPairs === 1
                  ? "bg-[#007569] text-white"
                  : "bg-white border border-[#000000] text-black"
              }`}
              onClick={() => setSelectedPairs(1)}
            >
              <span className="text-center">Add 1-Pair</span>
              {selectedPairs === 1 && (
                <img
                  src="/success_icon.png"
                  alt="Success Icon"
                  className="w-[21px] h-[21px] absolute right-6"
                />
              )}
            </button>
            <button
              className={`font-poppins font-normal text-[18px] leading-[24px] text-nowrap w-[245px] md:w-[255px] h-[50px] rounded-[8px] flex items-center justify-center relative ${
                selectedPairs === 2
                  ? "bg-[#007569] text-white"
                  : "bg-white border border-[#000000] text-black"
              }`}
              onClick={() => setSelectedPairs(2)}
            >
              <span className="text-center">Add 2-Pair</span>
              {selectedPairs === 2 && (
                <img
                  src="/success_icon.png"
                  alt="Success Icon"
                  className="w-[21px] h-[21px] absolute right-6"
                />
              )}
            </button>
          </div>

          {/* First Package */}
          <div className=" p-5 mb-5">
            <div className="flex items-center sm:flex-nowrap flex-wrap gap-3 mb-3">
              <button className="font-poppins text-nowrap font-normal text-[18px] leading-[24px] border border-[#000000] rounded-[8px] px-3 py-2">
                + Add Frame Barcode
              </button>
              <span className="text-[18px]">=</span>
              <button
                className="custom-button text-n  flex justify-center  w-fit px-3  gap-2 font-poppins font-normal text-[13px] leading-[24px] py-2"
                style={{
                  borderRadius: "8px",
                  border: "2px dashed #8D8D8D",

                  color: "#000",
                }}
              >
                <div className="w-fit flex items-center text-nowrap justify-center bg-[#E8ECEF] px-3">
                  <span>I-GOG Frames</span>
                  <FaTimes className="ml-2" size={12} />
                </div>
              </button>
            </div>
            <div className="flex sm:flex-nowrap  flex-wrap w-full items-center gap-3">
              <Select
                options={lensOptions}
                styles={customStyles}
                placeholder="Select Lens"
                className="md:pr-0 pr-4  md:w-[455px] sm:w-[400px] w-[300px]"
              />
              <button
                className={`font-poppins font-normal md:text-[18px] text-[12px] leading-[24px] w-fit md:px-6 px-5 h-[50px] rounded-[8px] flex items-center justify-center text-nowrap gap-2 bg-[#007569] text-white "bg-white `}
                onClick={() => setSelectedPairs(1)}
              >
                <img
                  src="/eyes_icons.png"
                  alt="Success Icon"
                  className="w-auto h-auto object-cover"
                />
                View Lens
              </button>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <h6 className="font-poppins font-normal text-[18px] leading-[24px]">
                Price
              </h6>
              =
              <span className="font-poppins font-normal text-nowrap text-[18px] leading-[24px] bg-[#E77817] text-white rounded-[8px] px-3 py-2">
                800 ₹
              </span>
            </div>
          </div>

          {selectedPairs === 2 && (
            <div className="text-center text-[24px] mb-5">+</div>
          )}
          {/* second Package */}
          {selectedPairs === 2 && (
            <div className=" p-5 mb-5">
              <div className="flex items-center sm:flex-nowrap flex-wrap gap-3 mb-3">
                <button className="font-poppins text-nowrap font-normal text-[18px] leading-[24px] border border-[#000000] rounded-[8px] px-3 py-2">
                  + Add Frame Barcode
                </button>
                <span className="text-[18px]">=</span>
                <button
                  className="custom-button text-n  flex justify-center  w-fit px-3  gap-2 font-poppins font-normal text-[13px] leading-[24px] py-2"
                  style={{
                    borderRadius: "8px",
                    border: "2px dashed #8D8D8D",

                    color: "#000",
                  }}
                >
                  <div className="w-fit flex items-center justify-center bg-[#E8ECEF] px-3">
                    <span>I-GOG Frames</span>
                    <FaTimes className="ml-2" size={12} />
                  </div>
                </button>
              </div>
              <div className="flex sm:flex-nowrap  flex-wrap w-full items-center gap-3">
                <Select
                  options={lensOptions}
                  styles={customStyles}
                  placeholder="Select Lens "
                  className="md:pr-0 pr-4  md:w-[455px] sm:w-[400px] w-[300px]"
                />
                <button
                  className={`font-poppins font-normal md:text-[18px] text-[12px] leading-[24px] w-fit md:px-6 px-5 h-[50px] rounded-[8px] flex items-center justify-center text-nowrap gap-2 bg-[#007569] text-white "bg-white `}
                  onClick={() => setSelectedPairs(1)}
                >
                  <img
                    src="/eyes_icons.png"
                    alt="Success Icon"
                    className="w-auto h-auto object-cover"
                  />
                  View Lens
                </button>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <h6 className="font-poppins font-normal text-[18px] leading-[24px]">
                  Price
                </h6>{" "}
                =
                <span className="font-poppins font-normal text-nowrap text-[18px] leading-[24px] bg-[#E77817] text-white rounded-[8px] px-3 py-2">
                  1300 ₹
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 w-full md:mt-20 mt-5 ">
          <div className="border border-[#DDDDDD] rounded-[15px] p-5">
            <div className="font-poppins font-normal text-[16px] border-b pb-2 leading-[16px] flex justify-between mt-3">
              <span>Package Price</span>
              <span>1300 ₹</span>
            </div>
            <div className="font-poppins font-normal text-[16px] leading-[16px] border-b pb-2  flex justify-between mt-3">
              <span>Pre-fix Discount</span>
              <span>0 ₹</span>
            </div>
            <div className="font-poppins font-normal text-[16px] leading-[16px] border-b pb-2  flex justify-between mt-3">
              <span>Pre-fix Charges</span>
              <span>200 ₹</span>
            </div>
            <div className="font-poppins font-normal text-[16px] leading-[16px] flex justify-between mt-3">
              <span>Net Amt</span>
              <span>1500 ₹</span>
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button className="flex-1 font-poppins font-normal text-[18px] leading-[24px] bg-[#007569] text-white rounded-[8px] py-2">
              Add Another Package
            </button>
            <button className="flex-1 font-poppins font-normal text-[18px] leading-[24px] bg-[#007569] text-white rounded-[8px] py-2">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectPackage;
