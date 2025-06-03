import React from "react";

const LenseCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-4">
        <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg mb-4">
          {/* Lense image will go here */}
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">Lense Image</span>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Premium Lense
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          High-quality optical lens with advanced coating
        </p>
        <div className="flex justify-between items-center">
          <span className="text-blue-600 font-semibold">$99.99</span>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default LenseCard;
