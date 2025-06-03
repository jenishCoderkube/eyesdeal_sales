import React from "react";
import { Search, Filter } from "lucide-react";

const TopBarLense = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">Lenses</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search lenses..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="h-5 w-5 text-gray-600" />
            <span>Filter</span>
          </button>
        </div>
      </div>
      <div className="flex space-x-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          All Lenses
        </button>
        <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          Single Vision
        </button>
        <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          Progressive
        </button>
        <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          Bifocal
        </button>
      </div>
    </div>
  );
};

export default TopBarLense;
