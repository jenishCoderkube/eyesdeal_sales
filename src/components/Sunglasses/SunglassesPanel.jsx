import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";
import TopTabBar from "../Sidebar/TopTabBar";
import TopBarSunglasses from "./TopBarSunglasses";
import Sunglasses from "./Sunglasses";
import SunglassesDetails from "./SunglassesDetails";
import { masterDataService } from "../../services/masterDataService";
import { SunGlassesService } from "../../services/sunglassesService";

const SunglassesPanel = ({ activeTopTab, setActiveTopTab }) => {
  const [frameTypes, setFrameTypes] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sunglasses, setSunglasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    frameType: "",
    frameMaterial: "",
    brand: "",
    search: "",
  });

  const location = useLocation();
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isSunglassesDetails = location.pathname.startsWith(
    "/sunglasses/details"
  );

  // Handle filter changes
  const handleFilterChange = (newFilter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilter,
    }));
  };

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await Promise.allSettled([
          masterDataService.getFrameTypes(),
          masterDataService.getMaterials(),
          masterDataService.getBrands(),
          SunGlassesService.getAllSunGlasses(filters),
        ]);

        const [frameTypeResult, materialResult, brandResult, sunglassesResult] =
          results;

        // Process frame types
        if (
          frameTypeResult.status === "fulfilled" &&
          frameTypeResult.value?.success
        ) {
          setFrameTypes(
            Array.isArray(frameTypeResult.value.data?.data)
              ? frameTypeResult.value.data.data
              : []
          );
        } else {
          setError(
            (prev) =>
              prev ||
              frameTypeResult.reason?.response?.data?.message ||
              "Failed to fetch frame types"
          );
        }

        // Process materials
        if (
          materialResult.status === "fulfilled" &&
          materialResult.value?.success
        ) {
          setMaterials(
            Array.isArray(materialResult.value.data?.data)
              ? materialResult.value.data.data
              : []
          );
        } else {
          setError(
            (prev) =>
              prev ||
              materialResult.reason?.response?.data?.message ||
              "Failed to fetch materials"
          );
        }

        // Process brands
        if (brandResult.status === "fulfilled" && brandResult.value?.success) {
          setBrands(
            Array.isArray(brandResult.value.data?.data)
              ? brandResult.value.data.data
              : []
          );
        } else {
          setError(
            (prev) =>
              prev ||
              brandResult.reason?.response?.data?.message ||
              "Failed to fetch brands"
          );
        }

        // Process sunglasses
        if (
          sunglassesResult.status === "fulfilled" &&
          sunglassesResult.value?.success
        ) {
          setSunglasses(
            Array.isArray(sunglassesResult.value.data?.message?.data)
              ? sunglassesResult.value.data.message.data
              : sunglassesResult.value.data?.message?.data
              ? [sunglassesResult.value.data.message.data]
              : []
          );
        } else {
          setError(
            (prev) =>
              prev ||
              sunglassesResult.reason?.response?.data?.message ||
              "Failed to fetch sunglasses"
          );
        }
      } catch (error) {
        setError(
          (prev) =>
            prev || error.response?.data?.message || "Unexpected error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

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
          <TopBarSunglasses
            frameTypes={frameTypes}
            materials={materials}
            brands={brands}
            loading={loading}
            error={error}
            onFilterChange={handleFilterChange}
          />
          {isSunglassesDetails ? (
            <SunglassesDetails />
          ) : (
            <Sunglasses
              sunglasses={sunglasses}
              loading={loading}
              error={error}
            />
          )}
        </>
      ) : (
        <div className="flex-1 flex flex-col mx-4 mt-1 border border-gray-200 rounded-xl">
          <TopBarSunglasses
            frameTypes={frameTypes}
            materials={materials}
            brands={brands}
            loading={loading}
            error={error}
            onFilterChange={handleFilterChange}
          />
          {isSunglassesDetails ? (
            <SunglassesDetails />
          ) : (
            <Sunglasses
              sunglasses={sunglasses}
              loading={loading}
              error={error}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SunglassesPanel;
