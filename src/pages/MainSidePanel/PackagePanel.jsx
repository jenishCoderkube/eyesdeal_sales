import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Frame from "../../components/Frame/Frame";
import FrameDetails from "../../components/Frame/FrameDetails";
import CustomerTabRow from "../../components/Sidebar/CustomerTabRow";
import LeftSidebar from "../../components/Sidebar/LeftSidebar";
import SelectPackage from "../../components/Sidebar/SelectPackage";
import TopTabBar from "../../components/Sidebar/TopTabBar";
import TopBarGlasses from "../../components/Frame/TopBarGlasses";
import Lense from "../../components/Lense/Lense";
import LenseDetails from "../../components/Lense/LenseDetails";
import TopBarSunglasses from "../../components/Sunglasses/TopBarSunglasses";
import SunglassesDetails from "../../components/Sunglasses/SunglassesDetails";
import Sunglasses from "../../components/Sunglasses/Sunglasses";
import { masterDataService } from "../../services/masterDataService"; // Adjust path as needed
import { frameService } from "../../services/frameService"; // Adjust path as needed

const PackagePanel = () => {
  const [activeLeftTab, setActiveLeftTab] = useState("Frame");
  const [activeTopTab, setActiveTopTab] = useState("BOGO Package");
  const [frameTypes, setFrameTypes] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [brands, setBrands] = useState([]);
  const [frames, setFrames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  // Media query to detect tablet screens (≤1024px)
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  // Check if the current route is a details route
  const isFrameDetails = location.pathname.startsWith("/frame/details");
  const isLenseDetails = location.pathname.startsWith("/lens/details");
  const isSunglassesDetails = location.pathname.startsWith(
    "/sunglasses/details"
  );

  // Fetch all required data when activeLeftTab changes to "Frame"
  useEffect(() => {
    if (activeLeftTab === "Frame") {
      const fetchAllData = async () => {
        setLoading(true);
        setError(null);
        try {
          // Execute all API calls concurrently
          const results = await Promise.allSettled([
            masterDataService.getFrameTypes(),
            masterDataService.getMaterials(),
            masterDataService.getBrands(),
            frameService.getAllFrames(),
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
          } else if (
            frameTypeResult.status === "rejected" ||
            !frameTypeResult.value?.success
          ) {
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
          } else if (
            materialResult.status === "rejected" ||
            !materialResult.value?.success
          ) {
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
          } else if (
            brandResult.status === "rejected" ||
            !brandResult.value?.success
          ) {
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
          } else if (
            frameResult.status === "rejected" ||
            !frameResult.value?.success
          ) {
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
      fetchAllData();
    }
  }, [activeLeftTab, navigate]);

  console.log(brands, "brands");

  // Handle logout
  if (activeLeftTab === "Logout") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/login");
    return null;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <div>
        <CustomerTabRow />
      </div>
      <LeftSidebar activeTab={activeLeftTab} setActiveTab={setActiveLeftTab} />

      {activeLeftTab === "Package" && (
        <div className="flex-1 flex flex-col">
          {isTablet ? (
            <>
              <div className="rounded-lg mx-4 mt-4">
                <TopTabBar
                  activeTab={activeTopTab}
                  setActiveTab={setActiveTopTab}
                />
              </div>
              <SelectPackage />
            </>
          ) : (
            <div className="flex-1 flex flex-col mx-4 mt-1 border border-gray-200 rounded-xl">
              <div>
                <TopTabBar
                  activeTab={activeTopTab}
                  setActiveTab={setActiveTopTab}
                />
              </div>
              <SelectPackage />
            </div>
          )}
        </div>
      )}
      {activeLeftTab === "Frame" && (
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
              />
              {isFrameDetails ? (
                <FrameDetails />
              ) : (
                <Frame frames={frames} loading={loading} error={error} />
              )}
            </div>
          )}
        </div>
      )}
      {activeLeftTab === "Lenses" && (
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
              />
              {isLenseDetails ? <LenseDetails /> : <Lense />}
            </>
          ) : (
            <div className="flex-1 flex flex-col mx-4 mt-1 border border-gray-200 rounded-xl">
              {isLenseDetails ? <LenseDetails /> : <Lense />}
            </div>
          )}
        </div>
      )}
      {activeLeftTab === "Sunglasses" && (
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
              />
              {isSunglassesDetails ? <SunglassesDetails /> : <Sunglasses />}
            </>
          ) : (
            <div className="flex-1 flex-col mx-4 mt-1 border border-gray-200 rounded-xl">
              <TopBarGlasses
                frameTypes={frameTypes}
                materials={materials}
                brands={brands}
                loading={loading}
                error={error}
              />
              {isSunglassesDetails ? <SunglassesDetails /> : <Sunglasses />}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PackagePanel;
