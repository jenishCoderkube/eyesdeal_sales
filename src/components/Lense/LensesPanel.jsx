import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { masterDataService } from "../../services/masterDataService";
import Brand from "../Brand/Brand";
import Lense from "./Lense";
import LenseDetails from "./LenseDetails";
import Loader from "../Loader/Loader";

const LensesPanel = () => {
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
        const brandsResponse = await masterDataService.getBrands();

        if (brandsResponse.success) {
          setBrands(brandsResponse.data.data);
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
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LensesPanel;
