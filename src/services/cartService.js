import api from "./api";

// Cart endpoints
const CART_ENDPOINTS = {
  ADD_TO_CART: () => `/saleCart`,
};

// Cart service functions
export const cartService = {
  addToCart: async (cartItems) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        return {
          success: false,
          message: "No access token found. Please log in.",
        };
      }

      const response = await api.post(
        CART_ENDPOINTS.ADD_TO_CART(),
        {
          cart_item: cartItems,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Error adding to cart",
      };
    }
  },
};
