// LensesPanel.jsx
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from "react-router-dom";
import TopTabBar from "../Sidebar/TopTabBar";
import TopBarGlasses from "../Frame/TopBarGlasses";
import Lense from "./Lense";
import LenseDetails from "./LenseDetails";
import { masterDataService } from "../../services/masterDataService";
import { lensService } from "../../services/lensService";

const LensesPanel = ({ activeTopTab, setActiveTopTab }) => {
  const [lensTypes, setLensTypes] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [brands, setBrands] = useState([]);
  const [lenses, setLenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    lensType: "",
    lensMaterial: "",
    brand: "",
  });

  const location = useLocation();
  const navigate = useNavigate();
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isLenseDetails = location.pathname.startsWith("/lens/details");

  const handleFilterChange = (newFilter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilter,
    }));
  };

  useEffect(() => {
    const fetchLensData = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await Promise.allSettled([
          masterDataService.getLensTypes(),
          masterDataService.getMaterials(),
          masterDataService.getBrands(),
          lensService.getAllLenses(filters),
        ]);

        const [lensTypeResult, materialResult, brandResult, lensResult] =
          results;

        if (
          lensTypeResult.status === "fulfilled" &&
          lensTypeResult.value.success
        ) {
          setLensTypes(
            Array.isArray(lensTypeResult.value.data?.data)
              ? lensTypeResult.value.data.data
              : []
          );
        } else {
          const errorMessage =
            lensTypeResult.value?.message ||
            lensTypeResult.reason?.response?.data?.message ||
            "Error fetching lens types";
          setError((prevError) => prevError || errorMessage);
        }

        if (
          materialResult.status === "fulfilled" &&
          materialResult.value.success
        ) {
          setMaterials(
            Array.isArray(materialResult.value.data?.data)
              ? materialResult.value.data.data
              : []
          );
        } else {
          const errorMessage =
            materialResult.value?.message ||
            materialResult.reason?.response?.data?.message ||
            "Error fetching materials";
          setError((prevError) => prevError || errorMessage);
        }

        if (brandResult.status === "fulfilled" && brandResult.value.success) {
          setBrands(
            Array.isArray(brandResult.value.data?.data)
              ? brandResult.value.data.data
              : []
          );
        } else {
          const errorMessage =
            brandResult.value?.message ||
            brandResult.reason?.response?.data?.message ||
            "Error fetching brands";
          setError((prevError) => prevError || errorMessage);
        }

        if (lensResult.status === "fulfilled" && lensResult.value.success) {
          setLenses(
            Array.isArray(lensResult.value.data?.message?.data)
              ? lensResult.value.data.message.data
              : lensResult.value.data?.message?.data
              ? [lensResult.value.data.message.data]
              : []
          );
        } else {
          const errorMessage =
            lensResult.value?.message ||
            lensResult.reason?.response?.data?.message ||
            "Error fetching lenses";
          setError((prevError) => prevError || errorMessage);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Unexpected error fetching data";
        setError(errorMessage);
        if (
          errorMessage.includes("Unauthorized") ||
          error.response?.status === 401
        ) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLensData();
  }, [filters, navigate]);

  return (
    <div className="flex-1 flex flex-col">
      {isTablet ? (
        <>
          <div className="rounded-lg mx-4 mt-4">
            <TopTabBar
              activeTab={activeTopTab}
              setActiveTab={setActiveTopTab}
            />
          </div>
          {/* <TopBarGlasses
            frameTypes={lensTypes} // Ensure this is correct
            materials={materials}
            brands={brands}
            loading={loading}
            error={error}
            onFilterChange={handleFilterChange}
          /> */}
          {isLenseDetails ? (
            <LenseDetails />
          ) : (
            <Lense lenses={lenses} loading={loading} error={error} />
          )}
        </>
      ) : (
        <div className="flex-1 flex flex-col mx-4 mt-1 border border-gray-200 rounded-xl">
          {/* <TopBarGlasses
            frameTypes={lensTypes}
            materials={materials}
            brands={brands}
            loading={loading}
            error={error}
            onFilterChange={handleFilterChange}
          /> */}
          {isLenseDetails ? (
            <LenseDetails />
          ) : (
            <Lense lenses={lenses} loading={loading} error={error} />
          )}
        </div>
      )}
    </div>
  );
};

export default LensesPanel;
