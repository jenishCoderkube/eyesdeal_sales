import React, { useState, useEffect } from "react";
import CartCard from "./CartCard";
import { cartService } from "../../services/cartService"; // Adjust path as needed
import Loader from "../Loader/Loader"; // Adjust path as needed
import { Pagination, PaginationItem } from "@mui/material";

const CartPanel = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PAGE_LIMIT = 10;

  // Fetch cart items
  const fetchCartItems = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await cartService.getCartItems(currentPage, PAGE_LIMIT);
      if (response.success) {
        setCartItems(response.data.message.data || []);
        setTotalPages(response.data.message.totalPages || 1);
      } else {
        setError(response.message || "Failed to fetch cart items");
        setCartItems([]);
      }
    } catch (err) {
      setError("An error occurred while fetching cart items");
      setCartItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [currentPage]);

  // Handle remove item
  const handleRemoveItem = async (cartItemId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await cartService.removeCartItems([cartItemId]);
      if (response.success) {
        await fetchCartItems();
      } else {
        setError(response.message || "Failed to remove item");
      }
    } catch (err) {
      setError("An error occurred while removing the item");
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate summary fields
  const calculateSummary = () => {
    let totalQty = 0;
    let totalAmt = 0;
    let totalDisc = 0;
    let uniqueItems = 0;

    cartItems.forEach((item) => {
      // Count unique items (frames or lenses)
      if (item.product || item.lens) {
        uniqueItems += 1;
      }

      // Calculate for frame (product)
      if (item.product) {
        totalQty += 1; // Each frame counts as 1 item
        const sellPrice = Number(item.product.sellPrice) || 0;
        const discount = Number(item.product.discount) || 0; // Assuming flat discount
        totalAmt += sellPrice;
        totalDisc += discount;
      }

      // Calculate for lens
      if (item.lens) {
        totalQty += 1; // Each lens counts as 1 item
        const sellPrice = Number(item.lens.sellPrice) || 0;
        const discount = Number(item.lens.discount) || 0; // Assuming flat discount
        totalAmt += sellPrice;
        totalDisc += discount;
      }
    });

    // Placeholder values
    const flatDisc = 0;
    const otherCharges = 0;
    const netAmount = totalAmt - totalDisc + otherCharges - flatDisc;
    const coupon = "None";
    const salesRep = uniqueItems;
    const location = "Default Store";

    return {
      location,
      totalQty,
      totalAmt: totalAmt.toFixed(2),
      totalDisc: totalDisc.toFixed(2),
      flatDisc: flatDisc.toFixed(2),
      otherCharges: otherCharges.toFixed(2),
      netAmount: Math.max(0, netAmount).toFixed(2),
      coupon,
      salesRep,
    };
  };

  const summary = calculateSummary();

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="font-poppins text-sm text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full lg:max-w-[1400px]">
      <div className="w-full flex flex-col sm:flex-row gap-4 bg-white">
        <CartCard cartItems={cartItems} onRemove={handleRemoveItem} />
        <div className="w-full sm:w-64 bg-gray-50 rounded-lg p-4 space-y-3">
          {[
            { label: "Location", value: summary.location },
            { label: "Total Quantity", value: summary.totalQty },
            { label: "Total Amount", value: `₹${summary.totalAmt}` },
            { label: "Total Discount", value: `₹${summary.totalDisc}` },
            { label: "Flat Discount", value: `₹${summary.flatDisc}` },
            { label: "Other Charges", value: `₹${summary.otherCharges}` },
            { label: "Net Amount", value: `₹${summary.netAmount}` },
            { label: "Coupon Applied", value: summary.coupon },
            { label: "Items Count", value: summary.salesRep },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="w-full py-2 px-3 bg-white rounded text-xs sm:text-sm font-medium flex justify-between"
            >
              <span>{label}</span>
              <span>{value}</span>
            </div>
          ))}
          <button className="bg-[#007569] hover:bg-emerald-800 text-[16px] text-white font-normal font-poppins py-2 px-4 rounded-lg w-full">
            Place Order
          </button>
        </div>
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 w-full">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            renderItem={(item) => (
              <PaginationItem
                {...item}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "#1976d2",
                    color: "white",
                    border: "1px solid #bbdefb",
                    fontWeight: 500,
                  },
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    border: "1px solid #bdbdbd",
                  },
                  border: "1px solid #e0e0e0",
                  borderRadius: "4px",
                  margin: "0 4px",
                  padding: "8px 12px",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "14px",
                  color: "#424242",
                  transition: "all 0.2s",
                  "&.Mui-disabled": {
                    opacity: 0.5,
                    cursor: "not-allowed",
                  },
                }}
              />
            )}
          />
        </div>
      )}
    </div>
  );
};

export default CartPanel;
