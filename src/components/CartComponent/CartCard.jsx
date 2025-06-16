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
    <div className="flex-1 space-y-4 bg-gray-100 p-4  ">
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-lg  transition-shadow duration-200"
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
            <button className="text-red-500 hover:text-red-600 text-sm font-medium">
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* Add Payment Button */}
      <button className="bg-[#007569] hover:bg-emerald-800 text-[16px] text-white font-normal font-poppins py-2 px-4 rounded-lg w-full mt-4 transition-colors duration-200">
        Add Payment
      </button>
    </div>
  );
};

export default CartCard;
