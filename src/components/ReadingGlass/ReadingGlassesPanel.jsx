import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from "react-router-dom";
import TopTabBar from "../Sidebar/TopTabBar";
import TopBarReadingGlasses from "./TopBarReadingGlasses";
import ReadingGlasses from "./ReadingGlasses";
import ReadingGlassDetails from "./ReadingGlassDetails";
import { masterDataService } from "../../services/masterDataService";
import { readingGlassService } from "../../services/readingGlassService";

const ReadingGlassesPanel = () => {
  const [frameTypes, setFrameTypes] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [brands, setBrands] = useState([]);
  const [readingGlasses, setReadingGlasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    frameType: "",
    frameMaterial: "",
    brand: "",
    search: "",
  });

  const location = useLocation();
  const navigate = useNavigate();
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isReadingGlassDetails = location.pathname.startsWith(
    "/reading-glass/details"
  );

  // Handle filter changes
  const handleFilterChange = (newFilter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilter,
    }));
  };

  // Fetch reading glasses data
  useEffect(() => {
    const fetchReadingGlassData = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await Promise.allSettled([
          masterDataService.getFrameTypes(),
          masterDataService.getMaterials(),
          masterDataService.getBrands(),
          readingGlassService.getAllReadingGlasses(filters),
        ]);
        console.log(results, "jyfhktghhgchgcghcghcghcgh");
        console.log();
        console.log();
        console.log();

        const [
          frameTypeResult,
          materialResult,
          brandResult,
          readingGlassResult,
        ] = results;

        // Process frame types
        if (
          frameTypeResult.status === "fulfilled" &&
          frameTypeResult.value.success
        ) {
          setFrameTypes(
            Array.isArray(frameTypeResult.value.data?.data)
              ? frameTypeResult.value.data.data
              : []
          );
        } else {
          const errorMessage =
            frameTypeResult.value?.message ||
            frameTypeResult.reason?.response?.data?.message ||
            "Error fetching frame types";
          setError((prevError) => prevError || errorMessage);
        }

        // Process materials
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

        // Process brands
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

        // Process reading glasses
        if (
          readingGlassResult.status === "fulfilled" &&
          readingGlassResult.value.success
        ) {
          setReadingGlasses(
            Array.isArray(readingGlassResult.value.data?.message?.data)
              ? readingGlassResult.value.data.message.data
              : readingGlassResult.value.data?.message?.data
              ? [readingGlassResult.value.data.message.data]
              : []
          );
        } else {
          const errorMessage =
            readingGlassResult.value?.message ||
            readingGlassResult.reason?.response?.data?.message ||
            "Error fetching reading glasses";
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

    fetchReadingGlassData();
  }, [filters, navigate]);

  return (
    <div className="flex-1 flex flex-col">
      {isTablet ? (
        <>
          {/* <div className="rounded-lg mx-4 mt-4">
            <TopTabBar
              activeTab={activeTopTab}
              setActiveTab={setActiveTopTab}
            />
          </div> */}
          <TopBarReadingGlasses
            frameTypes={frameTypes}
            materials={materials}
            brands={brands}
            loading={loading}
            error={error}
            onFilterChange={handleFilterChange}
          />
          {isReadingGlassDetails ? (
            <ReadingGlassDetails />
          ) : (
            <ReadingGlasses
              readingGlasses={readingGlasses}
              loading={loading}
              error={error}
            />
          )}
        </>
      ) : (
        <div className="flex-1 flex flex-col mx-4 mt-1 border border-gray-200 rounded-xl">
          <TopBarReadingGlasses
            frameTypes={frameTypes}
            materials={materials}
            brands={brands}
            loading={loading}
            error={error}
            onFilterChange={handleFilterChange}
          />
          {isReadingGlassDetails ? (
            <ReadingGlassDetails />
          ) : (
            <ReadingGlasses
              readingGlasses={readingGlasses}
              loading={loading}
              error={error}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ReadingGlassesPanel;
