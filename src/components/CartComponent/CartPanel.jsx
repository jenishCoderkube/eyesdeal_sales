import React from "react";
import CartCards from "./CartCard";

const CartPanel = () => {
  return (
    <div className="w-full flex flex-row gap-4 bg-white">
      <CartCards />
      <div className="w-[200px]  text-center sm:w-64 bg-gray-50 rounded-lg p-4 space-y-3">
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
            className="w-full py-2 px-3 bg-white  rounded  text-xs sm:text-sm font-medium"
          >
            {label}
          </div>
        ))}
        <button className="bg-[#007569] hover:bg-emerald-800 text-[16px] text-white font-normal font-poppins py-2 px-4 rounded-lg w-full">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CartPanel;
