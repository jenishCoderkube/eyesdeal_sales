import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import ReadingGlassesCard from "./ReadingGlassesCard";
import ReactPaginate from "react-paginate";

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

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1); // ReactPaginate uses 0-based index
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
            <ReactPaginate
              previousLabel={
                <div className="flex items-center justify-center space-x-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <span>Previous</span>
                </div>
              }
              nextLabel={
                <div className="flex items-center justify-center space-x-1">
                  <span>Next</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              }
              breakLabel="..."
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageChange}
              containerClassName="flex items-center space-x-2"
              pageLinkClassName="flex items-center justify-center px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-colors duration-200 font-poppins text-sm cursor-pointer shadow-sm w-full h-full"
              activeLinkClassName="border-[1px] border-blue-200 bg-blue-700 text-white font-medium"
              previousLinkClassName={`flex items-center justify-center px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 transition-colors duration-200 shadow-sm w-full h-full ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100 hover:border-gray-400"
              }`}
              nextLinkClassName={`flex items-center justify-center px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 transition-colors duration-200 shadow-sm w-full h-full ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100 hover:border-gray-400"
              }`}
              breakClassName="flex items-center justify-center px-4 py-2 text-gray-700 font-poppins text-sm"
              disabledClassName="opacity-50 cursor-not-allowed"
              forcePage={currentPage - 1} // Adjust for 0-based index
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
