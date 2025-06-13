import { useNavigate } from "react-router-dom";
// import GlassesCard from "./GlassesCard";
import Loader from "../Loader/Loader";
import ReadingGlassesCard from "./ReadingGlassesCard";

const ReadingGlasses = ({ readingGlasses, loading }) => {
  const navigate = useNavigate();

  const handleCardClick = async (glassId, glassData) => {
    navigate(`/reading-glass/details/${glassId}`, {
      state: { glass: glassData },
    });
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  // console.log(readingGlasses, "ugyfguvgv");

  if (!readingGlasses || readingGlasses.length === 0) {
    return <div className="px-3 sm:px-4 md:px-5 py-4 md:py-5 text-center">
       <p className="font-poppins font-normal text-[14px] sm:text-[16px] text-gray-600">
          No Reading Glasses available.
        </p>
    </div>;
  }

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
                glass.photos && glass.photos.length > 0 && glass.photos[0]
              }
              active={true}
              onClick={() => handleCardClick(glass._id, glass)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReadingGlasses;
