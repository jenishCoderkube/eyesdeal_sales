import api from "./api";

// Reading Glass endpoints
const READING_GLASS_ENDPOINTS = {
  GET_ALL_READING_GLASSES: () => `/saleProduct/getAllReadingGlasses`,
  GET_READING_GLASS_BY_ID: (id) => `/saleProduct/getReadingGlassById/${id}`,
};

// Reading Glass service functions
export const readingGlassService = {
  getAllReadingGlasses: async (filters = {}) => {
    try {
      // Construct query parameters
      const params = new URLSearchParams();
      if (filters.frameType) params.append("frameType", filters.frameType);
      if (filters.brand) params.append("brand", filters.brand);
      if (filters.frameMaterial)
        params.append("frameMaterial", filters.frameMaterial);
      if (filters.search) params.append("search", filters.search);

      const url = `${READING_GLASS_ENDPOINTS.GET_ALL_READING_GLASSES()}?${params.toString()}`;
      console.log("Request URL:", url);
      console.log("Request Headers:", {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      });

      // Make the API call
      const response = await api.get(url);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Reading Glasses API Error:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
      });

      return {
        success: false,
        message:
          error.response?.data?.message || "Error fetching reading glasses",
      };
    }
  },

  getReadingGlassById: async (id) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        return {
          success: false,
          message: "No access token found. Please log in.",
        };
      }

      const url = READING_GLASS_ENDPOINTS.GET_READING_GLASS_BY_ID(id);
      console.log("Request URL:", url);
      console.log("Request Headers:", {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      });

      const response = await api.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Reading Glass Details API Error:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
      });

      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Error fetching reading glass details",
      };
    }
  },
};
