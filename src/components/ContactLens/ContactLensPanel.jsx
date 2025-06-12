import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from "react-router-dom";
import Brand from "../Brand/Brand";
import ContactLens from "./ContactLens";
import ContactLensDetails from "./ContactLensDetails";
import { masterDataService } from "../../services/masterDataService";
import { contactLensService } from "../../services/contactLensService";
import Loader from "../Loader/Loader";

const ContactLensPanel = () => {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedLens, setSelectedLens] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [brandsResponse, contactLensResponse] = await Promise.all([
          masterDataService.getBrands(),
          contactLensService.getAllContactLenses(),
        ]);
        console.log(contactLensResponse, "uyfufugfgfgfgfvfvg");

        if (brandsResponse.success) {
          setBrands(brandsResponse.data.data);
        }
        if (!contactLensResponse.success) {
          setError(contactLensResponse.message);
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
      <h2 className="text-lg sm:text-xl font-semibold md:px-8 px-3 pt-5">
        Select Contact Lenses
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
            <ContactLensDetails lens={selectedLens} onClose={handleBack} />
          ) : (
            <ContactLens
              selectedBrand={selectedBrand}
              onSelectLens={handleLensSelect}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactLensPanel;
