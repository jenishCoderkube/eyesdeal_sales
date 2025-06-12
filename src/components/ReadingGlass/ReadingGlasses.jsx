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
  console.log(readingGlasses, "ugyfguvgv");

  if (!readingGlasses || readingGlasses.length === 0) {
    return <div className="px-5 py-5">No reading glasses available.</div>;
  }

  return (
    <div className="px-5 py-5">
      <div>
        <h1 className="font-poppins font-medium text-[24px] leading-[24px] tracking-[0] text-black w-fit pt-5">
          Select Reading Glasses
        </h1>
        <div className="grid gap-4 mt-5 [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))]">
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
