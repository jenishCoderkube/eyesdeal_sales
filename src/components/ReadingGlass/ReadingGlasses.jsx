import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import ReadingGlassesCard from "./ReadingGlassesCard";
import { Pagination, PaginationItem } from "@mui/material";

const ReadingGlasses = ({
  readingGlasses,
  loading,
  error,
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  const navigate = useNavigate();

  const handleCardClick = async (glassId, glassData) => {
    navigate(`/reading-glass/details/${glassId}`, {
      state: { glass: glassData },
    });
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value); // Material-UI Pagination uses 1-based index
  };

  // Render loading state
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="px-3 sm:px-4 md:px-5 py-4 md:py-5 text-center">
        <p className="font-poppins font-normal text-[14px] sm:text-[16px] text-red-600">
          {error || "An error occurred while fetching reading glasses."}
        </p>
      </div>
    );
  }

  // Render no reading glasses only if loading is complete and readingGlasses is an empty array
  if (readingGlasses && readingGlasses.length === 0) {
    return (
      <div className="px-3 sm:px-4 md:px-5 py-4 md:py-5 text-center">
        <p className="font-poppins font-normal text-[14px] sm:text-[16px] text-gray-600">
          No Reading Glasses available.
        </p>
      </div>
    );
  }

  // Render reading glasses data only if readingGlasses exists and has data
  if (readingGlasses && readingGlasses.length > 0) {
    return (
      <div className="px-3 sm:px-4 md:px-5 py-4 md:py-5">
        <div>
          <h1 className="font-poppins font-medium text-[20px] sm:text-[22px] md:text-[24px] leading-[22px] sm:leading-[24px] md:leading-[26px] tracking-[0] text-black w-fit pt-4 md:pt-5">
            Select Reading Glasses
          </h1>
          <div className="grid gap-3 sm:gap-4 md:gap-5 mt-4 md:mt-5 [grid-template-columns:repeat(auto-fit,minmax(160px,1fr))] sm:[grid-template-columns:repeat(auto-fit,minmax(200px,1fr))] md:[grid-template-columns:repeat(auto-fit,minmax(250px,1fr))]">
            {readingGlasses.map((glass) => (
              <ReadingGlassesCard
                key={glass._id}
                title={glass.sku}
                price={`${glass.sellPrice} ₹`}
                imageUrl={
                  glass.photos && glass.photos.length > 0
                    ? glass.photos[0]
                    : "/placeholder-image.jpg" // Fallback image
                }
                active={true}
                onClick={() => handleCardClick(glass._id, glass)}
              />
            ))}
          </div>
        </div>
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              renderItem={(item) => (
                <PaginationItem
                  {...item}
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "#1976d2",
                      color: "white",
                      border: "1px solid #bbdefb",
                      fontWeight: 500,
                    },
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                      border: "1px solid #bdbdbd",
                    },
                    border: "1px solid #e0e0e0",
                    borderRadius: "4px",
                    margin: "0 4px",
                    padding: "8px 12px",
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "14px",
                    color: "#424242",
                    transition: "all 0.2s",
                    "&.Mui-disabled": {
                      opacity: 0.5,
                      cursor: "not-allowed",
                    },
                  }}
                />
              )}
            />
          </div>
        )}
      </div>
    );
  }

  // Default case: render nothing until readingGlasses is defined
  return null;
};

export default ReadingGlasses;
