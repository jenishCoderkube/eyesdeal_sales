import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";

// Custom arrow components
const CustomPrevArrow = ({ className, onClick }) => (
  <button
    className={`${className} mt-5 ms-2 sm:ms-5}`}
    onClick={onClick}
    aria-label="Previous Slide"
  >
    <IoIosArrowRoundBack size={30} className="mt-5 text-black" />
  </button>
);

const CustomNextArrow = ({ className, onClick }) => (
  <button
    className={`${className} me-2 sm:me-3}`}
    onClick={onClick}
    aria-label="Next Slide"
  >
    <IoIosArrowRoundForward size={30} className="mt-5 text-black" />
  </button>
);

const LenseSlider = ({ lens, onClose }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/sales-panel/lens");
    onClose();
  };

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
          slidesToShow: 2,
          centerPadding: "10px",
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerPadding: "20px",
          centerMode: false,
        },
      },
    ],
  };

  // Use photos from lens object or fallback to empty array
  const slides =
    lens?.photos?.map((photo) => ({
      image: photo,
      title: lens.sku,
    })) || [];

  return (
    <div className="mx-auto w-full max-w-[700px] lg:max-w-[1190px] py-4 sm:py-8">
      <button
        className="text-gray-600 flex items-center mb-4 sm:mb-6 hover:text-gray-800 transition-colors"
        onClick={handleBack}
        aria-label="Go Back"
      >
        <svg
          className="w-4 h-4 mr-2"
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
        Back
      </button>
      <div className="relative">
        {slides.length > 0 ? (
          <Slider {...settings}>
            {slides.map((slide, index) => (
              <div key={index} className="px-2 outline-none">
                <div className="slick-center-title font-poppins text-base sm:text-lg md:text-xl lg:text-[32px] text-[#242424] text-center text-lg font-medium pb-3 sm:pb-5 opacity-0 transition-opacity duration-300">
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
                    className="w-full h-32 sm:h-48 md:h-64 lg:h-80 object-cover rounded-lg"
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
            width: 30px;
            height: 30px;
            bottom: -40px;
            top: auto;
          }
          .slick-prev {
            left: calc(50% - 50px);
          }
          .slick-next {
            right: calc(50% - 50px);
          }
          .slick-prev:before,
          .slick-next:before {
            content: none;
          }
          @media (min-width: 640px) {
            .slick-prev,
            .slick-next {
              width: 40px;
              height: 40px;
              bottom: -50px;
            }
            .slick-prev {
              left: calc(50% - 60px);
            }
            .slick-next {
              right: calc(50% - 60px);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default LenseSlider;
