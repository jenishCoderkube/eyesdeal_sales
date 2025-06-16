import api from "./api";

// Cart endpoints
const CART_ENDPOINTS = {
  ADD_TO_CART: () => `/saleCart`,
  GET_CART: () => `/saleCart`,
  REMOVE_CART_ITEMS: () => `/saleCart`,
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

  getCartItems: async (page = 1, limit = 10) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        return {
          success: false,
          message: "No access token found. Please log in.",
        };
      }

      const response = await api.get(CART_ENDPOINTS.GET_CART(), {
        params: { page, limit },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Error fetching cart items",
      };
    }
  },

  removeCartItems: async (cartItemIds) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        return {
          success: false,
          message: "No access token found. Please log in.",
        };
      }

      const response = await api.patch(
        CART_ENDPOINTS.REMOVE_CART_ITEMS(),
        {
          cartItemId: cartItemIds,
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
        message: response.data.message || "Cart items removed successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Error removing cart items",
      };
    }
  },
};
