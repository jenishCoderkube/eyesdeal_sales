import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import { useMediaQuery } from "react-responsive";
import { useState } from "react"; // Import useState

// Custom arrow components
const CustomPrevArrow = ({ onClick }) => (
  <button
    className="absolute left-4 sm:left-8 bottom-[-50px] z-20 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
    onClick={onClick}
    aria-label="Previous Slide"
  >
    <IoIosArrowRoundBack size={24} className="text-gray-800" />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    className="absolute right-4 sm:right-8 bottom-[-50px] z-20 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
    onClick={onClick}
    aria-label="Next Slide"
  >
    <IoIosArrowRoundForward size={24} className="text-gray-800" />
  </button>
);

const LenseSlider = ({ lens, onClose }) => {
  const navigate = useNavigate();
  const isBelow1024 = useMediaQuery({ query: "(max-width: 1023px)" });
  const [currentSlide, setCurrentSlide] = useState(0); // State to track current slide

  const handleBack = () => {
    navigate("/sales-panel/contactLenses");
    onClose();
  };

  // Slider settings
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: isBelow1024 ? 1 : 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: isBelow1024 ? "0px" : "20px",
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex), // Update current slide
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          centerPadding: "0px",
          centerMode: true,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerPadding: "0px",
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
    <div className="w-full max-w-4xl mx-auto py-6 sm:py-8 px-4 sm:px-6">
      {/* Back Button */}
      <button
        className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mb-4 sm:mb-6 font-poppins text-sm sm:text-base"
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

      {/* Slider Section */}
      <div className="relative">
        {slides.length > 0 ? (
          <Slider {...settings}>
            {slides.map((slide, index) => (
              <div key={index} className="px-2 outline-none">
                {/* Conditionally render title based on currentSlide */}
                {/* {!isBelow1024 &&
                  index === currentSlide && ( // Only show title on desktop for the center slide
                    <div className="text-center mb-3">
                      <h3 className="font-semibold text-lg text-gray-800">
                        {slide.title}
                      </h3>
                    </div>
                  )} */}
                <div className="relative  rounded-lg">
                  <img
                    src={slide.image}
                    alt={`Lens ${slide.title} - ${index + 1}`}
                    className="w-full h-48 sm:h-64 lg:h-80 object-contain bg-gray-100 rounded-lg transition-transform duration-300"
                  />
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="text-center text-gray-500 font-poppins text-base sm:text-lg py-12">
            No images available
          </div>
        )}
        {/* Custom CSS for slick-center (keep if you want the scaling/opacity) */}
        <style jsx>{`
          .slick-slide {
            transition: all 0.3s ease;
            transform: scale(0.9);
            opacity: 0.6;
          }

          .slick-center {
            transform: scale(1.1) !important;
            opacity: 1 !important;
          }

          /* Remove the old slick-center-title CSS as we're handling it with React state */
          /*
          .slick-center .slick-center-title {
            opacity: 1;
            display: block;
          }

          .slick-slide .slick-center-title {
            opacity: 0;
            display: none;
          }
          */

          .slick-prev,
          .slick-next {
            z-index: 20;
          }

          .slick-prev:before,
          .slick-next:before {
            content: none;
          }

          @media (max-width: 1024px) {
            .slick-slide {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default LenseSlider;
