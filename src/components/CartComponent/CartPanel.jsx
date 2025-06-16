import React from "react";
import CartCards from "./CartCard";

const CartPanel = () => {
  return (
    <div className="w-full flex flex-row gap-4 bg-white p-4 rounded-lg border shadow-sm">
      <CartCards />
      <div className="w-[200px] sm:w-64 bg-gray-50 rounded-lg p-4 space-y-3 border">
        {[
          "Location",
          "Total QTY",
          "Total AMT",
          "Total DISC",
          "Flat DISC",
          "Other Charges",
          "Net Amount",
          "Coupon Apply",
          "Sales REP",
        ].map((label) => (
          <div
            key={label}
            className="w-full py-2 px-3 bg-white border rounded shadow-sm text-xs sm:text-sm font-medium"
          >
            {label}
          </div>
        ))}
        <button className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-2 px-4 rounded w-full">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CartPanel;
