import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from "react-router-dom";
import { masterDataService } from "../../services/masterDataService";
import { readingGlassService } from "../../services/readingGlassService";
import TopBarGlasses from "../Frame/TopBarGlasses";
import ReadingGlassDetails from "./ReadingGlassDetails";
import ReadingGlasses from "./ReadingGlasses";

const ReadingGlassesPanel = () => {
  const [frameTypes, setFrameTypes] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [brands, setBrands] = useState([]);
  const [readingGlasses, setReadingGlasses] = useState(null); // Initialize as null
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
  const PAGE_LIMIT = 10; // Number of reading glasses per page

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
    setCurrentPage(1); // Reset to page 1 on filter change
    setReadingGlasses(null); // Reset readingGlasses during fetch
  };

  // Fetch reading glasses data
  useEffect(() => {
    const fetchReadingGlassData = async () => {
      setLoading(true);
      setError(null);
      setReadingGlasses(null); // Reset readingGlasses during fetch
      try {
        const results = await Promise.all([
          masterDataService.getFrameTypes(),
          masterDataService.getMaterials(),
          masterDataService.getBrands(),
          readingGlassService.getAllReadingGlasses({
            ...filters,
            page: currentPage,
            limit: PAGE_LIMIT,
          }),
        ]);

        const [
          frameTypeResult,
          materialResult,
          brandResult,
          readingGlassResult,
        ] = results;

        // Process frame types
        if (frameTypeResult.success) {
          setFrameTypes(
            Array.isArray(frameTypeResult.data?.data)
              ? frameTypeResult.data.data
              : []
          );
        } else {
          throw new Error(
            frameTypeResult.message || "Error fetching frame types"
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
          throw new Error(materialResult.message || "Error fetching materials");
        }

        // Process brands
        if (brandResult.success) {
          setBrands(
            Array.isArray(brandResult.data?.data) ? brandResult.data.data : []
          );
        } else {
          throw new Error(brandResult.message || "Error fetching brands");
        }

        // Process reading glasses
        if (readingGlassResult.success) {
          setReadingGlasses(
            Array.isArray(readingGlassResult.data?.message?.data)
              ? readingGlassResult.data.message.data
              : readingGlassResult.data?.message?.data
              ? [readingGlassResult.data.message.data]
              : []
          );
          setTotalPages(readingGlassResult.data?.message?.totalPages || 1);
        } else {
          throw new Error(
            readingGlassResult.message || "Error fetching reading glasses"
          );
        }
      } catch (error) {
        const errorMessage = error.message || "Unexpected error fetching data";
        setError(errorMessage);
        setReadingGlasses([]);
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
  }, [filters, currentPage, navigate]);

  return (
    <div className="flex-1 flex flex-col">
      {isTablet ? (
        <>
          <TopBarGlasses
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
          {isReadingGlassDetails ? (
            <ReadingGlassDetails />
          ) : (
            <ReadingGlasses
              readingGlasses={readingGlasses}
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

export default ReadingGlassesPanel;
