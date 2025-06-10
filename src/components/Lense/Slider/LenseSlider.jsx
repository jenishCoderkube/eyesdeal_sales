import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";

// Custom arrow components
const CustomPrevArrow = ({ className, onClick }) => (
  <button
    className={`${className} mt-5 ms-5}`}
    onClick={onClick}
    aria-label="Previous Slide"
  >
    <IoIosArrowRoundBack size={35} className="mt-5 text-black" />
  </button>
);

const CustomNextArrow = ({ className, onClick }) => (
  <button
    className={`${className} me-3}`}
    onClick={onClick}
    aria-label="Next Slide"
  >
    <IoIosArrowRoundForward size={35} className="mt-5 text-black" />
  </button>
);

const LenseSlider = ({ lens, onClose }) => {
  const navigate = useNavigate();

  // Slider settings
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "10px",
    slidesToShow: 3,
    speed: 500,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          centerPadding: "10px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "20px",
        },
      },
    ],
  };

  // Use photos from lens object or fallback to empty array
  const slides =
    lens?.photos?.map((photo, index) => ({
      image: photo,
      title: lens.sku,
    })) || [];
  console.log(slides, "slides");

  return (
    <div className="mx-auto w-full md:max-w-[700px] lg:max-w-[1190px] py-8">
      <div className="relative">
        {slides.length > 0 ? (
          <Slider {...settings}>
            {slides.map((slide, index) => (
              <div key={index} className="px-2 outline-none">
                <div className="slick-center-title font-poppins lg:text-[32px] md:text-[20px] text-[18px] text-[#242424] text-center text-lg font-medium pb-5 opacity-0 transition-opacity duration-300">
                  {slide.title}
                </div>
                <div
                  className="transition-all duration-300 relative"
                  style={{
                    transform: "scale(0.8)",
                    opacity: 0.6,
                  }}
                >
                  <img
                    src={slide.image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-48 md:h-64 lg:h-80 object-cover rounded-lg"
                  />
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="text-center text-gray-500">No images available</div>
        )}
        {/* Override slick-center styles with Tailwind */}
        <style jsx>{`
          .slick-center div {
            transform: scale(1) !important;
            opacity: 1 !important;
          }
          .slick-center .slick-center-title {
            opacity: 1 !important;
          }
          .slick-prev,
          .slick-next {
            z-index: 10;
            width: 40px;
            height: 40px;
            bottom: -50px;
            top: auto;
          }
          .slick-prev {
            left: calc(50% - 60px);
          }
          .slick-next {
            right: calc(50% - 60px);
          }
          .slick-prev:before,
          .slick-next:before {
            content: none;
          }
        `}</style>
      </div>
    </div>
  );
};

export default LenseSlider;
