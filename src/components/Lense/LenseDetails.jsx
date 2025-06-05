import React, { useState, useEffect } from "react";
import { useParams, useLocation,useNavigate } from "react-router-dom";

const LenseDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const lens = state?.lens;

  console.log(`lenssssssssss`, lens);

  // State for current image index and animation direction
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState("");

  // Sample image array (you can replace paths with your local ones)
  const images = [
    "/lens1.png",
    "/lens2.png",
    "/lens3.png",
  ];

  // Handlers for image navigation with animation direction
  const handlePrevImage = () => {
    setAnimationDirection("slide-right"); // Slide out to right, new image comes from left
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setAnimationDirection("slide-left"); // Slide out to left, new image comes from right
    setCurrentImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };
const navigate = useNavigate();
  // Reset animation direction after it plays to allow repeated animations
  useEffect(() => {
    if (animationDirection) {
      const timer = setTimeout(() => setAnimationDirection(""), 500); // Match animation duration
      return () => clearTimeout(timer);
    }
  }, [animationDirection]);

  return (
    <div className="flex flex-col min-h-screen px-5 py-5 bg-[#F9FAFB]">
      <style>
        {`
          .image-container {
            position: relative;
            width: 100%;
            max-width: 400px;
            height: 256px;
            overflow: hidden;
          }
          .main-image {
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 0.5rem;
            transition: transform 0.5s ease-in-out;
          }
          .slide-left-enter {
            transform: translateX(100%);
          }
          .slide-left-exit {
            transform: translateX(-100%);
          }
          .slide-right-enter {
            transform: translateX(-100%);
          }
          .slide-right-exit {
            transform: translateX(100%);
          }
        `}
      </style>
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Back Button */}
        <button className="text-gray-600 mb-4 flex items-center"
        onClick={() => navigate("/sales-panel")}
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

        {/* Lens Name */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          {lens?.name || "Hard Coat Progressive"}
        </h2>

        {/* Image Section */}
        <div className="flex flex-col items-center">
          {/* Thumbnails */}
          <div className="flex space-x-2 mb-4">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`w-16 h-16 object-cover rounded-lg cursor-pointer ${
                  currentImageIndex === index
                    ? "border-2 border-blue-500"
                    : "opacity-70"
                }`}
                onClick={() => {
                  if (index < currentImageIndex) {
                    setAnimationDirection("slide-right");
                  } else if (index > currentImageIndex) {
                    setAnimationDirection("slide-left");
                  }
                  setCurrentImageIndex(index);
                }}
              />
            ))}
          </div>

          {/* Main Image with Slide Animation */}
          <div className="image-container">
            <img
              src={images[currentImageIndex]}
              alt="Lens"
              className={`main-image ${
                animationDirection === "slide-left"
                  ? "slide-left-exit"
                  : animationDirection === "slide-right"
                  ? "slide-right-exit"
                  : ""
              }`}
            />
            {animationDirection && (
              <img
                src={images[currentImageIndex]}
                alt="Lens Next"
                className={`main-image ${
                  animationDirection === "slide-left"
                    ? "slide-left-enter"
                    : "slide-right-enter"
                }`}
              />
            )}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevImage}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
          >
            <svg
              className="w-6 h-6 text-gray-600"
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
          </button>
          <button
            onClick={handleNextImage}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
          >
            <svg
              className="w-6 h-6 text-gray-600"
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
          </button>
        </div>

        {/* Subtotal and Add to Cart */}
        <div className="flex flex-col items-center mt-6">
          <p className="text-xl font-semibold text-orange-500 mb-4">
            Sub Total = {lens?.price || 3200} ₹
          </p>
          <button className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default LenseDetails;