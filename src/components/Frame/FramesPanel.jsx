import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from "react-router-dom";
import TopTabBar from "../Sidebar/TopTabBar";
import TopBarGlasses from "../Frame/TopBarGlasses";
import Frame from "../Frame/Frame";
import FrameDetails from "../Frame/FrameDetails";
import { masterDataService } from "../../services/masterDataService"; // Adjust path as needed
import { frameService } from "../../services/frameService"; // Adjust path as needed

const FramesPanel = ({ activeTopTab, setActiveTopTab }) => {
  const [frameTypes, setFrameTypes] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [brands, setBrands] = useState([]);
  const [frames, setFrames] = useState(null); // Initialize as null to differentiate from empty data
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

  const location = useLocation();
  const navigate = useNavigate();
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isFrameDetails = location.pathname.startsWith("/frame/details");

  // Handle filter changes
  const handleFilterChange = (newFilter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilter,
    }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Fetch master data (frame types, materials, brands)
  useEffect(() => {
    const fetchMasterData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [frameTypeResult, materialResult, brandResult] =
          await Promise.all([
            masterDataService.getFrameTypes(),
            masterDataService.getMaterials(),
            masterDataService.getBrands(),
          ]);

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
      } catch (err) {
        const errorMessage = err.message || "Unexpected error fetching data";
        setError(errorMessage);
        if (
          errorMessage.includes("Unauthorized") ||
          err.response?.status === 401
        ) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMasterData();
  }, [navigate]);

  // Fetch frames based on filters and page
  useEffect(() => {
    const getAllFrames = async () => {
      setLoading(true);
      setError(null);
      try {
        const frameResult = await frameService.getAllFrames({
          ...filters,
          page: currentPage,
        });

        if (frameResult.success) {
          setFrames(
            Array.isArray(frameResult.data?.message?.data)
              ? frameResult.data.message.data
              : frameResult.data?.message?.data
              ? [frameResult.data.message.data]
              : []
          );
          setTotalPages(frameResult.data?.message?.totalPages || 1);
        } else {
          throw new Error(frameResult.message || "Error fetching frames");
        }
      } catch (err) {
        const errorMessage = err.message || "Error fetching frames";
        setError(errorMessage);
        setFrames([]); // Set frames to empty array on error
        if (
          errorMessage.includes("Unauthorized") ||
          err.response?.status === 401
        ) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    getAllFrames();
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
          {isFrameDetails ? (
            <FrameDetails />
          ) : (
            <Frame
              frames={frames}
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
          {isFrameDetails ? (
            <FrameDetails />
          ) : (
            <Frame
              frames={frames}
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

export default FramesPanel;
