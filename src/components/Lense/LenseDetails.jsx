import React from "react";

const LenseDetails = () => {
  return (
    <div className="flex flex-col min-h-screen px-5 py-5 bg-[#F9FAFB]">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Lense Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg mb-4">
              {/* Lense image will go here */}
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">Lense Image</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Premium Lense
              </h3>
              <p className="text-gray-600">
                High-quality optical lens with advanced coating
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-gray-700">Features</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Anti-reflective coating</li>
                <li>Blue light protection</li>
                <li>Scratch resistant</li>
                <li>UV protection</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-gray-700">Specifications</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Material</p>
                  <p className="text-gray-700">Polycarbonate</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Index</p>
                  <p className="text-gray-700">1.67</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Coating</p>
                  <p className="text-gray-700">Premium AR</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Warranty</p>
                  <p className="text-gray-700">2 Years</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">$99.99</span>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LenseDetails;
