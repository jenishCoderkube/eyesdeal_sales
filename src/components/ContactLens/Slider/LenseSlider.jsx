import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Autoplay from "embla-carousel-autoplay";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

const LenseSlider = ({ lens, onClose }) => {
  const navigate = useNavigate();
  const isBelow1024 = useMediaQuery({ query: "(max-width: 1023px)" });

  const slides = lens?.photos?.map((photo) => ({
    image: photo,
    title: lens.sku || "Lens SKU",
  })) || [
    { image: "/placeholder1.jpg", title: "Lens 1" },
    { image: "/placeholder2.jpg", title: "Lens 2" },
    { image: "/placeholder3.jpg", title: "Lens 3" },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
      containScroll: "trimSnaps",
    },
    [Autoplay({ delay: 3000 })] // Adjust autoplay delay here
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const handleBack = () => {
    navigate("/sales-panel/contactLenses");
    onClose();
  };

  const handlePrev = () => emblaApi && emblaApi.scrollPrev();
  const handleNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <div className="w-full max-w-4xl">
      {/* Back button */}
      <button
        className="flex items-center text-gray-600 hover:text-gray-800"
        onClick={handleBack}
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
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

      {/* Slider */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => {
            const isActive = index === selectedIndex;
            return (
              <div
                key={index}
                className={`${
                  slides.length < 1
                    ? "flex-[0_0_100%]"
                    : "flex-[0_0_100%] lg:flex-[0_0_33.333%]"
                } px-2 transition-transform duration-300 ease-in-out`}
              >
                <div
                  className={`relative rounded-lg bg-gray-100 p-3 ${
                    isActive ? "scale-105" : "scale-90 opacity-60"
                  } transition-all duration-300`}
                >
                  {isActive &&
                    slides.length > 3 &&
                    !isBelow1024 &&
                    slide.title && (
                      <div className="text-center mb-3">
                        <h3 className="font-semibold text-lg text-gray-800">
                          {slide.title}
                        </h3>
                      </div>
                    )}

                  <img
                    src={slide.image}
                    alt={`Lens ${slide.title}`}
                    className="w-full h-48 sm:h-64 lg:h-80 object-contain rounded-lg"
                    onError={(e) => (e.target.src = "/placeholder-error.jpg")}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <div className="flex justify-center items-center gap-6 mt-6">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition"
            aria-label="Previous Slide"
          >
            <IoIosArrowRoundBack size={28} className="text-gray-800" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition"
            aria-label="Next Slide"
          >
            <IoIosArrowRoundForward size={28} className="text-gray-800" />
          </button>
        </div>
      )}
    </div>
  );
};

export default LenseSlider;
