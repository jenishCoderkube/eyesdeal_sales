import React from "react";

const cartItems = [
  {
    id: 1,
    title: "I-GOG Frames",
    sku: "223344",
    srp: "600",
    image: "/glass_1.png", // sample image; replace with actual
  },
  {
    id: 2,
    title: "I-GOG Frames",
    sku: "223344",
    srp: "600",
    image: "/glass_1.png",
  },
];

const CartCard = () => {
  return (
    <div className="flex-1 space-y-4 bg-gray-100 p-4 sm:p-6 rounded-xl border border-gray-200">
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200"
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-[190px] h-[60px] sm:w-[120px] sm:h-[90px] object-contain rounded-md border border-gray-200"
          />
          <div className="flex-1 space-y-1">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800">
              {item.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">SKU: {item.sku}</p>
            <p className="text-sm sm:text-base font-medium text-gray-900">
              SRP: ${item.srp}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button className="px-2 py-1 text-gray-600 hover:bg-gray-100">
                -
              </button>
              <span className="px-3 py-1 text-sm">1</span>
              <button className="px-2 py-1 text-gray-600 hover:bg-gray-100">
                +
              </button>
            </div>
            <button className="text-red-500 hover:text-red-600 text-sm font-medium">
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* Add Payment Button */}
      <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg w-full mt-4 transition-colors duration-200">
        Add Payment
      </button>
    </div>
  );
};

export default CartCard;
