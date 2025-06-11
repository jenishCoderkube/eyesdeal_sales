import React, { useEffect, useState } from "react";
import Select from "react-select";
import { FaTimes } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { packageService } from "../../services/packageService";

const SelectPackage = () => {
  const [pairs, setPairs] = useState([{ id: 1 }]);
  const [frames, setFrames] = useState([]);
  const [lenses, setLenses] = useState([]);
  const [loading, setLoading] = useState(true);

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
  const isMobile = useIsMobile();

  // Fetch frames and lenses on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [frameResponse, lensResponse] = await Promise.all([
          packageService.getAllFrames(),
          packageService.getAllLenses(),
        ]);

        if (frameResponse.success) {
          console.log("come in frameResponse", frameResponse);

          setFrames(
            frameResponse?.data?.message?.data?.map((frame) => ({
              value: frame._id,
              label: frame.displayName,
              price: frame.sellPrice,
            }))
          );
        } else {
          toast.error(frameResponse.message);
        }

        if (lensResponse.success) {
          console.log("come in frameResponse", lensResponse);
          setLenses(
            lensResponse?.data?.message?.data?.map((lens) => ({
              value: lens._id,
              label: lens.displayName,
              price: lens.sellPrice,
            }))
          );
        } else {
          toast.error(lensResponse.message);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  console.log("frames", frames);

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

  // Formik setup
  const formik = useFormik({
    initialValues: {
      pairs: [{ frame: "", lens: "" }],
    },
    validationSchema: Yup.object({
      pairs: Yup.array().of(
        Yup.object({
          frame: Yup.string().required("Frame is required"),
          lens: Yup.string().required("Lens is required"),
        })
      ),
    }),
    onSubmit: async (values) => {
      try {
        // Calculate total price
        const packagePrice = values.pairs.reduce((total, pair, index) => {
          const frame = frames.find((f) => f.value === pair.frame);
          const lens = lenses.find((l) => l.value === pair.lens);
          const pairPrice = (frame?.price || 0) + (lens?.price || 0);
          return total + pairPrice;
        }, 0);

        const payload = {
          packageType: "bogo",
          product: values.pairs.map((pair) => ({
            frames: pair.frame,
            lens: pair.lens,
          })),
          packagePrice: packagePrice.toString(),
          preFixDiscount: "200",
          preFixCharges: "",
          netAmount: (packagePrice - 200).toString(),
        };

        const response = await fetch(
          "https://devnode.coderkubes.com/eyesdeal-api/salePackage",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );

        const result = await response.json();
        if (result.success) {
          toast.success(result.message);
          // Reset form and pairs
          formik.resetForm({ values: { pairs: [{ frame: "", lens: "" }] } });
          setPairs([{ id: 1 }]);
        } else {
          toast.error(result.message || "Failed to create package");
        }
      } catch (error) {
        toast.error("Error creating package");
      }
    },
  });

  // Add a new pair
  const addNewPair = () => {
    const lastPair = formik.values.pairs[pairs.length - 1];
    if (lastPair.frame && lastPair.lens) {
      setPairs([...pairs, { id: pairs.length + 1 }]);
      formik.setFieldValue("pairs", [
        ...formik.values.pairs,
        { frame: "", lens: "" },
      ]);
    } else {
      formik.setTouched({
        pairs: formik.values.pairs.map((pair, index) =>
          index === pairs.length - 1 ? { frame: true, lens: true } : pair
        ),
      });
      toast.error("Please select frame and lens for the current pair");
    }
  };

  // Remove a pair
  const removePair = (index) => {
    if (pairs.length > 1) {
      setPairs(pairs.filter((_, i) => i !== index));
      formik.setFieldValue(
        "pairs",
        formik.values.pairs.filter((_, i) => i !== index)
      );
    }
  };

  // Calculate total price for display
  const totalPackagePrice = formik.values.pairs.reduce((total, pair) => {
    const frame = frames.find((f) => f.value === pair.frame);
    const lens = lenses.find((l) => l.value === pair.lens);
    return total + (frame?.price || 0) + (lens?.price || 0);
  }, 0);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ToastContainer />
      <h1 className="font-medium w-fit px-5 pt-5 text-[24px] leading-[24px] tracking-[0] text-black font-poppins">
        Select Package
      </h1>
      <div className="flex flex-col md:flex-row gap-5 px-5 pt-5 w-full mx-auto">
        <button
          className="font-poppins font-normal text-[18px] leading-[24px] bg-[#007569] text-white rounded-[8px] px-4 py-2"
          onClick={addNewPair}
        >
          Add Another Pair
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-5 p-5 w-full mx-auto">
        {/* Left Section */}
        <div className="flex-1 md:w-1/2 w-full">
          {pairs.map((pair, index) => (
            <div key={pair.id}>
              <div className="p-5 mb-5">
                <div className="flex items-center sm:flex-nowrap flex-wrap gap-3">
                  <button
                    className="font-poppins text-nowrap font-normal text-[18px] leading-[24px] border border-[#000000] rounded-[8px] px-3 py-2"
                    onClick={() => {
                      if (frames.length > 0) {
                        formik.setFieldValue(
                          `pairs[${index}].frame`,
                          frames[0].value
                        );
                      }
                    }}
                  >
                    + Add Frame Barcode
                  </button>
                  <span className="text-[18px]">=</span>
                  {formik.values.pairs[index].frame && (
                    <button
                      className="custom-button flex justify-center w-fit px-3 gap-2 font-poppins font-normal text-[13px] leading-[24px] py-2"
                      style={{
                        borderRadius: "8px",
                        border: "2px dashed #8D8D8D",
                        color: "#000",
                      }}
                    >
                      <div className="w-fit flex items-center text-nowrap justify-center bg-[#E8ECEF] px-3">
                        <span>
                          {
                            frames.find(
                              (f) =>
                                f.value === formik.values.pairs[index].frame
                            )?.label
                          }
                        </span>
                        <FaTimes
                          className="ml-2 cursor-pointer"
                          size={12}
                          onClick={() =>
                            formik.setFieldValue(`pairs[${index}].frame`, "")
                          }
                        />
                      </div>
                    </button>
                  )}
                  {formik.touched.pairs?.[index]?.frame &&
                    formik.errors.pairs?.[index]?.frame && (
                      <div className="text-red-500 text-[14px]">
                        {formik.errors.pairs[index].frame}
                      </div>
                    )}
                </div>

                <div className="flex sm:flex-nowrap flex-wrap mt-4 w-full items-center gap-3">
                  <Select
                    options={lenses}
                    styles={customStyles}
                    placeholder="Select Lens"
                    className="md:pr-0 pr-4 md:w-[455px] sm:w-[400px] w-[300px]"
                    value={lenses.find(
                      (option) =>
                        option.value === formik.values.pairs[index].lens
                    )}
                    onChange={(option) =>
                      formik.setFieldValue(
                        `pairs[${index}].lens`,
                        option?.value || ""
                      )
                    }
                    onBlur={() =>
                      formik.setFieldTouched(`pairs[${index}].lens`, true)
                    }
                  />
                  <button className="font-poppins font-normal md:text-[18px] text-[12px] leading-[24px] w-fit md:px-6 px-5 h-[50px] rounded-[8px] flex items-center justify-center text-nowrap gap-2 bg-[#007569] text-white">
                    <img
                      src="/eyes_icons.png"
                      alt="View Lens"
                      className="w-auto h-auto object-cover"
                    />
                    View Lens
                  </button>
                </div>
                {formik.touched.pairs?.[index]?.lens &&
                  formik.errors.pairs?.[index]?.lens && (
                    <div className="text-red-500 text-[14px]">
                      {formik.errors.pairs[index].lens}
                    </div>
                  )}

                <div className="flex items-center gap-3 mt-4">
                  <h6 className="font-poppins font-normal text-[18px] leading-[24px]">
                    Price
                  </h6>
                  =
                  <span className="font-poppins font-normal text-nowrap text-[18px] leading-[24px] bg-[#E77817] text-white rounded-[8px] px-3 py-2">
                    {(() => {
                      const frame = frames.find(
                        (f) => f.value === formik.values.pairs[index].frame
                      );
                      const lens = lenses.find(
                        (l) => l.value === formik.values.pairs[index].lens
                      );
                      const total = (frame?.price || 0) + (lens?.price || 0);
                      return total ? `${total} ₹` : "0 ₹";
                    })()}
                  </span>
                </div>
                {pairs.length > 1 && (
                  <button
                    className="mt-3 bg-red-600 rounded-3xl px-5 py-2 text-white font-poppins font-normal text-[16px]"
                    onClick={() => removePair(index)}
                  >
                    Remove Pair
                  </button>
                )}
              </div>
              {pairs.length > 1 && index !== pairs.length - 1 && (
                <div className="text-center text-[24px] mb-5">+</div>
              )}
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 w-full md:mt-20 mt-5">
          <div className="border border-[#DDDDDD] rounded-[15px] p-5">
            <div className="font-poppins font-normal text-[16px] border-b pb-2 leading-[16px] flex justify-between mt-3">
              <span>Package Price</span>
              <span>{totalPackagePrice} ₹</span>
            </div>
            <div className="font-poppins font-normal text-[16px] leading-[16px] border-b pb-2 flex justify-between mt-3">
              <span>Pre-fix Discount</span>
              <span>200 ₹</span>
            </div>
            <div className="font-poppins font-normal text-[16px] leading-[16px] border-b pb-2 flex justify-between mt-3">
              <span>Pre-fix Charges</span>
              <span>0 ₹</span>
            </div>
            <div className="font-poppins font-normal text-[16px] leading-[16px] flex justify-between mt-3">
              <span>Net Amt</span>
              <span>{totalPackagePrice - 200} ₹</span>
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button
              className="flex-1 font-poppins font-normal text-[18px] leading-[24px] bg-[#007569] text-white rounded-[8px] py-2"
              onClick={addNewPair}
            >
              Add Another Package
            </button>
            <button
              className="flex-1 font-poppins font-normal text-[18px] leading-[24px] bg-[#007569] text-white rounded-[8px] py-2"
              onClick={formik.handleSubmit}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectPackage;
