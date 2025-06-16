import React from "react";

const CartCard = ({ cartItems, onRemove }) => {
  return (
    <div className="flex-1 w-full space-y-4 bg-gray-100 p-4">
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600 font-poppins text-sm">
          Your cart is empty.
        </p>
      ) : (
        cartItems.map((item) => {
          const product = item.product || item.lens;
          if (!product) return null; // Skip items with no product or lens
          return (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-lg transition-shadow duration-200"
            >
              <img
                src={
                  product.photos && product.photos.length > 0
                    ? `${product.photos[0]}`
                    : "/placeholder-image.jpg"
                }
                alt={product.displayName}
                className="w-[190px] h-[60px] sm:w-[120px] sm:h-[90px] object-contain rounded-md border border-gray-200"
              />
              <div className="flex-1 space-y-1">
                <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                  {product.displayName}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  SKU: {product.sku}
                </p>
                {item.lens?.productName && (
                  <p className="text-xs sm:text-sm text-gray-500">
                    Lens SKU: {item.lens.sku}
                  </p>
                )}

                <p className="text-sm sm:text-base font-medium text-gray-900">
                  SRP: ₹{product.sellPrice}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onRemove(item._id)}
                  className="text-red-500 hover:text-red-600 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })
      )}
      <button className="bg-[#007569] hover:bg-emerald-800 text-[16px] text-white font-normal font-poppins py-2 px-4 rounded-lg w-full mt-4 transition-colors duration-200">
        Add Payment
      </button>
    </div>
  );
};

export default CartCard;
