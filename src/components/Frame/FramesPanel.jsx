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
  const [frames, setFrames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    frameType: "",
    frameMaterial: "",
    brand: "",
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
  };

  // Fetch frame data
  useEffect(() => {
    const fetchFrameData = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await Promise.allSettled([
          masterDataService.getFrameTypes(),
          masterDataService.getMaterials(),
          masterDataService.getBrands(),
          frameService.getAllFrames(filters),
        ]);

        const [frameTypeResult, materialResult, brandResult, frameResult] =
          results;

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

        // Process frames
        if (frameResult.status === "fulfilled" && frameResult.value.success) {
          setFrames(
            Array.isArray(frameResult.value.data?.message?.data)
              ? frameResult.value.data.message.data
              : frameResult.value.data?.message?.data
              ? [frameResult.value.data.message.data]
              : []
          );
        } else {
          const errorMessage =
            frameResult.value?.message ||
            frameResult.reason?.response?.data?.message ||
            "Error fetching frames";
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

    fetchFrameData();
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
            <Frame frames={frames} loading={loading} error={error} />
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
            <Frame frames={frames} loading={loading} error={error} />
          )}
        </div>
      )}
    </div>
  );
};

export default FramesPanel;
