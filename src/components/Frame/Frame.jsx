import { useNavigate } from "react-router-dom";
import GlassesCard from "./GlassesCard"; // Adjust the path as needed
import Loader from "../Loader/Loader";

const Frame = ({ frames, loading, error }) => {
  const navigate = useNavigate();

  const handleCardClick = async (frameId, frameData) => {
    navigate(`/frame/details/${frameId}`, {
      state: { glass: frameData },
    });
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (!frames || frames.length === 0) {
    return <div className="px-5 py-5">No frames available.</div>;
  }

  return (
    <div className="px-5 py-5">
      <div>
        <h1 className="font-poppins font-medium text-[24px] leading-[24px] tracking-[0] text-black w-fit pt-5">
          Select Frames
        </h1>
        <div className="grid gap-4 mt-5 [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))]">
          {frames.map((frame) => (
            <GlassesCard
              key={frame._id}
              title={frame.sku}
              price={`${frame.sellPrice} ₹`}
              imageUrl={
                frame.photos && frame.photos.length > 0 && frame.photos[0]
              }
              active={true}
              onClick={() => handleCardClick(frame._id, frame)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Frame;
