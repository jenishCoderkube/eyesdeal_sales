import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { lensService } from "../../services/lensService";
import { masterDataService } from "../../services/masterDataService";
import ContactLensCard from "./ContactLensCard";
import { FiSearch } from "react-icons/fi";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Loader from "../Loader/Loader";
import { contactLensService } from "../../services/contactLensService";

const ContactLens = ({ onSelectLens, selectedBrand }) => {
  const navigate = useNavigate();
  const [lenses, setLenses] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [prescriptionTypes, setPrescriptionTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [_, prescriptionTypeResponse] = await Promise.all([
          masterDataService.getBrands(),
          lensService.getAllprescriptionType(),
        ]);

        if (prescriptionTypeResponse.success) {
          setPrescriptionTypes(prescriptionTypeResponse.data.data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchLenses = async () => {
      setIsLoading(true);
      try {
        const params = {};
        if (activeTab !== "All") params.prescriptionType = activeTab;
        if (selectedBrand) params.brand = selectedBrand._id;

        const lensesResponse = await contactLensService.getAllContactLenses(
          params
        );
        if (lensesResponse.success) {
          setLenses(lensesResponse.data.message.data);
        }
      } catch (err) {
        console.error("Error fetching lenses:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLenses();
  }, [activeTab, selectedBrand]);

  const scrollTabs = (direction) => {
    const container = document.getElementById("tabsContainer");
    if (!container) return;
    const scrollAmount = 100;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleLensSelect = (lens) => {
    navigate(`/sales-panel/contact-lens/${lens._id}`);
    if (onSelectLens) onSelectLens(lens);
  };

  const filteredLenses = lenses.filter((lens) =>
    lens.displayName.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="px-5 py-5">
      <div className="">
        <div className="relative flex items-center w-full">
          <FiSearch size={24} className="absolute left-2 text-gray-400" />
          <input
            type="text"
            placeholder="Search barcode..."
            className="w-full pl-10 pr-4 py-2 rounded-lg md:border-none border border-gray-300 focus:outline-none md:ring-0 focus:ring-2 focus:ring-blue-500 font-poppins font-normal text-[18px] leading-[24px] text-[#667085]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Prescription Type Tabs */}
      <div className="relative mt-4">
        <div className="flex items-center">
          <button
            onClick={() => scrollTabs("left")}
            className="absolute left-0 z-10 bg-white p-2 rounded-full shadow-md"
          >
            <ChevronLeft size={20} />
          </button>
          <div
            id="tabsContainer"
            className="flex overflow-x-auto scrollbar-hide px-8"
          >
            <button
              className={`px-4 py-2 whitespace-nowrap ${
                activeTab === "All"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("All")}
            >
              All
            </button>
            {prescriptionTypes.map((type) => (
              <button
                key={type._id}
                className={`px-4 py-2 whitespace-nowrap ${
                  activeTab === type._id
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab(type._id)}
              >
                {type.name}
              </button>
            ))}
          </div>
          <button
            onClick={() => scrollTabs("right")}
            className="absolute right-0 z-10 bg-white p-2 rounded-full shadow-md"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="mt-4">
        <h1 className="font-poppins font-medium text-[24px] leading-[24px] tracking-[0] text-black w-fit pt-5">
          Select Contact Lenses
        </h1>
        <div className="grid gap-4 mt-5 [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))]">
          {filteredLenses.map((lens) => (
            <ContactLensCard
              key={lens._id}
              title={lens.sku}
              price={`${lens.sellPrice} ₹`}
              imageUrl={lens.photos && lens.photos.length > 0 && lens.photos[0]}
              active={true}
              onClick={() => handleLensSelect(lens)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactLens;
