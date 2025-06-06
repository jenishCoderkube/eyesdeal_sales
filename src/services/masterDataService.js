import api from "./api"; // Adjust the path as needed

// Master data endpoints
const MASTER_ENDPOINTS = {
  GET_FRAME_TYPES: () => `/saleProduct/master/frameType`,
  GET_MATERIALS: () => `/saleProduct/master/material`,
  GET_BRANDS: () => `/saleProduct/master/brand`,
};

// Master data service functions
export const masterDataService = {
  getFrameTypes: async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        return {
          success: false,
          message: "No access token found. Please log in.",
        };
      }

      const response = await api.get(MASTER_ENDPOINTS.GET_FRAME_TYPES(), {
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
        message: error.response?.data?.message || "Error fetching frame types",
      };
    }
  },

  getMaterials: async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        return {
          success: false,
          message: "No access token found. Please log in.",
        };
      }

      const response = await api.get(MASTER_ENDPOINTS.GET_MATERIALS(), {
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
        message: error.response?.data?.message || "Error fetching materials",
      };
    }
  },

  getBrands: async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        return {
          success: false,
          message: "No access token found. Please log in.",
        };
      }

      const response = await api.get(MASTER_ENDPOINTS.GET_BRANDS(), {
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
        message: error.response?.data?.message || "Error fetching brands",
      };
    }
  },
};