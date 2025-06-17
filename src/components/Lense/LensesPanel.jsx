import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import { clearFrameLens } from "../../store/FrameLens/frameLensSlice";
import { lensService } from "../../services/lensService";
import { masterDataService } from "../../services/masterDataService";
import Brand from "../Brand/Brand";
import Loader from "../Loader/Loader";
import Lense from "./Lense";
import LenseDetails from "./LenseDetails";

const LensesPanel = () => {
  const dispatch = useDispatch();
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedLens, setSelectedLens] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [prescriptionTypes, setPrescriptionTypes] = useState([]);
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const isBelow768 = useMediaQuery({ query: "(max-width: 1024px)" });

  // Clear Redux frame/lens data when accessing lenses page directly
  useEffect(() => {
    dispatch(clearFrameLens());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [brandsResponse, prescriptionTypeResponse] = await Promise.all([
          masterDataService.getBrands(),
          lensService.getAllprescriptionType(),
        ]);

        if (brandsResponse.success) {
          setBrands(brandsResponse.data.data);
        }
        if (prescriptionTypeResponse.success) {
          setPrescriptionTypes(prescriptionTypeResponse.data.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setSelectedLens(null);
  };

  const handleLensSelect = (lens) => {
    if (lens === null) {
      setSelectedBrand(null);
    } else {
      setSelectedLens(lens);
    }
  };

  const handleBack = () => {
    setSelectedLens(null);
  };

  const scrollTabs = (direction) => {
    const container = document.getElementById("tabsContainer");
    if (!container) return;
    const scrollAmount = 100;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Search and Tabs for screens below 768px */}
      {isBelow768 && (
        <div className="w-full p-4 bg-white">
          {/* Search Bar */}
          <div className="relative flex items-center w-full mb-4">
            <FiSearch size={24} className="absolute left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search barcode..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-poppins font-normal text-[18px] leading-[24px] text-[#667085]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Tabs with Horizontal Scroll */}
          <div className="relative w-full flex flex-wrap">
            <div
              id="tabsContainer"
              className="flex flex-wrap gap-3 scrollbar-hide"
            >
              <button
                className={`relative px-3 border py-1 flex items-center text-xs font-medium whitespace-nowrap ${
                  activeTab === "All"
                    ? "text-black   border-[#E77817] lg:rounded-none rounded-md"
                    : "text-gray-500 border-[#E9E9E9] rounded-md"
                }`}
                style={{ background: "none" }}
                onClick={() => setActiveTab("All")}
              >
                All
              </button>
              {prescriptionTypes.map((tab) => (
                <button
                  key={tab._id}
                  className={`relative px-3 border py-1 flex items-center text-xs font-medium whitespace-nowrap ${
                    activeTab === tab._id
                      ? "text-black   border-[#E77817] lg:rounded-none rounded-md"
                      : "text-gray-500 border-[#E9E9E9] rounded-md"
                  }`}
                  style={{ background: "none" }}
                  onClick={() => setActiveTab(tab._id)}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <h2 className="text-lg sm:text-xl font-semibold lg:px-8 md:px-4 px-3 pt-5">
        Select Lenses
      </h2>
      <div className="flex-1 flex flex-row h-full">
        {/* Brand Selection - Always visible */}
        <div
          className={`${
            isMobile ? "w-1/3" : isTablet ? "w-1/4" : "w-1/8"
          } flex-shrink-0 overflow-y-auto`}
        >
          <Brand
            brands={brands}
            selectedBrand={selectedBrand}
            onSelectBrand={handleBrandSelect}
          />
        </div>

        {/* Main Content Area */}
        <div
          className={`${
            isMobile ? "w-2/3" : isTablet ? "w-3/4" : "w-4/5"
          } flex-1 overflow-hidden`}
        >
          {selectedLens ? (
            <LenseDetails lens={selectedLens} onClose={handleBack} />
          ) : (
            <Lense
              selectedBrand={selectedBrand}
              onSelectLens={handleLensSelect}
              search={search}
              setSearch={setSearch}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              prescriptionTypes={prescriptionTypes}
              isBelow768={isBelow768}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LensesPanel;
