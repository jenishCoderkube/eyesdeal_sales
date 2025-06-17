import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useParams, useNavigate } from "react-router-dom";
import Brand from "../Brand/Brand";
import ContactLens from "./ContactLens";
import ContactLensDetails from "./ContactLensDetails";
import { masterDataService } from "../../services/masterDataService";
import { contactLensService } from "../../services/contactLensService";
import Loader from "../Loader/Loader";
import { FiSearch } from "react-icons/fi";
import { lensService } from "../../services/lensService";

const ContactLensPanel = () => {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedLens, setSelectedLens] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [disposabilityTypes, setdisposabilityTypes] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const isBelow768 = useMediaQuery({ query: "(max-width: 1024px)" });

  // Fetch contact lens details if ID is provided in URL
  useEffect(() => {
    const fetchContactLensDetails = async () => {
      if (id) {
        try {
          setLoading(true);
          const response = await contactLensService.getContactLensById(id);
          if (response.success) {
            const lensData =
              response.data?.message?.data || response.data?.message;
            if (lensData) {
              setSelectedLens(lensData);
            } else {
              setError("No contact lens data found");
            }
          } else {
            setError(
              response.message || "Failed to fetch contact lens details"
            );
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            "Error fetching contact lens details";
          setError(errorMessage);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchContactLensDetails();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [brandsResponse, disposabilityeResponse] = await Promise.all([
          masterDataService.getBrands(),
          contactLensService.getAllDisposability(),
        ]);
        console.log("Brands Response:", disposabilityeResponse);

        if (brandsResponse.success) {
          setBrands(brandsResponse.data.data);
        }
        if (disposabilityeResponse.success) {
          setdisposabilityTypes(disposabilityeResponse.data?.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch general data if we don't have an ID (not viewing specific lens)
    if (!id) {
      fetchData();
    }
  }, [id]);

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
    // If we came from a URL with ID, navigate back to the contact lenses list
    if (id) {
      navigate("/sales-panel/contactLenses");
    }
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
      {isBelow768 && !selectedLens && (
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
              {disposabilityTypes.map((tab) => (
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

      {!selectedLens && (
        <h2 className="text-lg sm:text-xl font-semibold md:px-8 px-3 pt-5">
          Select Contact Lenses
        </h2>
      )}

      <div className="flex-1 flex flex-row h-full">
        {/* Brand Selection - Always visible when not viewing specific lens */}
        {!selectedLens && (
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
        )}

        {/* Main Content Area */}
        <div
          className={`${
            selectedLens
              ? "w-full"
              : isMobile
              ? "w-2/3"
              : isTablet
              ? "w-3/4"
              : "w-4/5"
          } flex-1 overflow-hidden`}
        >
          {selectedLens ? (
            <ContactLensDetails lens={selectedLens} onClose={handleBack} />
          ) : (
            <ContactLens
              selectedBrand={selectedBrand}
              onSelectLens={handleLensSelect}
              search={search}
              setSearch={setSearch}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              disposabilityTypes={disposabilityTypes}
              isBelow768={isBelow768}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactLensPanel;
