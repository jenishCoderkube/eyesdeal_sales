import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from "react-router-dom";
import TopTabBar from "../Sidebar/TopTabBar";
import Sunglasses from "./Sunglasses";
import SunglassesDetails from "./SunglassesDetails";
import { masterDataService } from "../../services/masterDataService";
import { SunGlassesService } from "../../services/sunglassesService";
import TopBarGlasses from "../Frame/TopBarGlasses";

const SunglassesPanel = ({ activeTopTab, setActiveTopTab }) => {
  const [frameTypes, setFrameTypes] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sunglasses, setSunglasses] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    frameType: "",
    frameMaterial: "",
    brand: "",
    search: "",
  });
  const PAGE_LIMIT = 10; // Number of sunglasses per page

  const location = useLocation();
  const navigate = useNavigate();
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
    setCurrentPage(1); // Reset to page 1 on filter change
    setSunglasses(null); // Reset sunglasses during fetch
  };

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setSunglasses(null); // Reset sunglasses during fetch
      try {
        const results = await Promise.all([
          masterDataService.getFrameTypes(),
          masterDataService.getMaterials(),
          masterDataService.getBrands(),
          SunGlassesService.getAllSunGlasses({
            ...filters,
            page: currentPage,
            limit: PAGE_LIMIT,
          }),
        ]);

        const [frameTypeResult, materialResult, brandResult, sunglassesResult] =
          results;

        // Process frame types
        if (frameTypeResult.success) {
          setFrameTypes(
            Array.isArray(frameTypeResult.data?.data)
              ? frameTypeResult.data.data
              : []
          );
        } else {
          throw new Error(
            frameTypeResult.message || "Failed to fetch frame types"
          );
        }

        // Process materials
        if (materialResult.success) {
          setMaterials(
            Array.isArray(materialResult.data?.data)
              ? materialResult.data.data
              : []
          );
        } else {
          throw new Error(
            materialResult.message || "Failed to fetch materials"
          );
        }

        // Process brands
        if (brandResult.success) {
          setBrands(
            Array.isArray(brandResult.data?.data) ? brandResult.data.data : []
          );
        } else {
          throw new Error(brandResult.message || "Failed to fetch brands");
        }

        // Process sunglasses
        if (sunglassesResult.success) {
          setSunglasses(
            Array.isArray(sunglassesResult.data?.message?.data)
              ? sunglassesResult.data.message.data
              : sunglassesResult.data?.message?.data
              ? [sunglassesResult.data.message.data]
              : []
          );
          setTotalPages(sunglassesResult.data?.message?.totalPages || 1);
        } else {
          throw new Error(
            sunglassesResult.message || "Failed to fetch sunglasses"
          );
        }
      } catch (error) {
        const errorMessage = error.message || "Unexpected error occurred";
        setError(errorMessage);
        setSunglasses([]);
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

    fetchData();
  }, [filters, currentPage, navigate]);

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
          <TopBarGlasses
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
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          )}
        </>
      ) : (
        <div className="flex-1 flex flex-col mx-4 mt-1 border border-gray-200 rounded-xl">
          <TopBarGlasses
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
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SunglassesPanel;
