import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowDropleft } from "react-icons/io";
import { contactLensService } from "../../services/contactLensService";
import Loader from "../Loader/Loader";

const ContactLensDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lens, setLens] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  // Fetch contact lens data by ID
  useEffect(() => {
    const fetchContactLens = async () => {
      try {
        setLoading(true);
        const response = await contactLensService.getContactLensById(id);
        if (response.success) {
          const lensData = response.data.message.data;
          setLens(lensData);
          setActiveImage(lensData.photos?.[0] || null);
        } else {
          setError(response.message || "Failed to fetch contact lens details");
        }
      } catch (err) {
        setError(err.message || "Unexpected error occurred");
        if (err.message.includes("Unauthorized")) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchContactLens();
  }, [id, navigate]);

  // Handle loading state
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  // Handle error or no lens found
  if (error || !lens) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="font-['Poppins'] text-black font-medium text-[24px]">
          {error || "Contact Lens Not Found"}
        </h1>
        <button
          className="mt-4 font-['Poppins'] font-normal text-[16px] text-white bg-[#242424] px-4 py-2 rounded-md hover:bg-[#3a3a3a]"
          onClick={() => navigate("/sales-panel/contact-lens")}
        >
          Back to Contact Lenses
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen px-5 py-5 bg-[#F9FAFB]">
      <button
        className="self-start mb-4 flex items-center font-['Poppins'] font-medium text-[24px] text-[#18181B]"
        onClick={() => navigate("/sales-panel/contact-lens")}
      >
        <IoIosArrowDropleft size={24} className="mr-[4px] mt-[-3px]" /> Back
      </button>

      <div className="flex sm:flex-row flex-col md:gap-x-10 gap-x-3">
        <div className="flex gap-x-5">
          <div className="md:flex hidden h-screen flex-col overflow-y-scroll gap-2 scrollbar-hidden">
            {lens.photos?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`w-[129.85px] object-contain h-[94px] rounded-[5px] cursor-pointer ${
                  activeImage === img
                    ? "border-2 border-[#E77817]"
                    : "border-none"
                }`}
                onClick={() => setActiveImage(img)}
                onError={(e) =>
                  (e.target.src = "/images/placeholder-frame.jpg")
                }
              />
            ))}
          </div>

          <div className="flex-1">
            <img
              src={activeImage}
              alt={lens.displayName}
              className="md:w-[559px] w-full sm:w-[327px] h-full sm:max-h-[290px] md:h-[494px] object-contain rounded-lg"
              onError={(e) => (e.target.src = "/images/placeholder-frame.jpg")}
            />
            <div className="md:hidden grid grid-cols-3 flex-wrap gap-2">
              {lens.photos?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-[100px] object-contain h-[50px] rounded-[5px] cursor-pointer ${
                    activeImage === img
                      ? "border-2 border-[#E77817]"
                      : "border-none"
                  }`}
                  onClick={() => setActiveImage(img)}
                  onError={(e) =>
                    (e.target.src = "/images/placeholder-frame.jpg")
                  }
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 mt-4 sm:mt-0">
          <h1 className="font-['Poppins'] text-[24px] font-medium text-black">
            {lens.displayName}
          </h1>
          <p className="font-['Poppins'] text-[16px] font-normal text-[#71717A] mt-2">
            {lens.description}
          </p>
          <div className="mt-4">
            <h2 className="font-['Poppins'] text-[18px] font-medium text-black">
              Specifications
            </h2>
            <div className="mt-2 space-y-2">
              <p className="font-['Poppins'] text-[16px] font-normal text-[#71717A]">
                SKU: {lens.sku}
              </p>
              <p className="font-['Poppins'] text-[16px] font-normal text-[#71717A]">
                Brand: {lens.brand?.name || "N/A"}
              </p>
              <p className="font-['Poppins'] text-[16px] font-normal text-[#71717A]">
                Type: {lens.type?.name || "N/A"}
              </p>
              <p className="font-['Poppins'] text-[16px] font-normal text-[#71717A]">
                Material: {lens.material?.name || "N/A"}
              </p>
              <p className="font-['Poppins'] text-[16px] font-normal text-[#71717A]">
                Price: ₹{lens.sellPrice}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactLensDetails;
