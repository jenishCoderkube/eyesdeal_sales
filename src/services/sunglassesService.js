import api from "./api"; // Adjust the path as needed

// Sunglasses endpoints
const SUNGLASSES_ENDPOINTS = {
  GET_ALL_SUNGLASSES: () => `/saleProduct/getAllSunGlasses`,
  GET_SUNGLASS_BY_ID: (id) => `/saleProduct/getSunGlassByid/${id}`,
};

// Sunglasses service functions
export const SunGlassesService = {
  getAllSunGlasses: async (filters = {}) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        return {
          success: false,
          message: "No access token found. Please log in.",
        };
      }

      // Construct query parameters
      const params = new URLSearchParams();
      if (filters.frameType) params.append("frameType", filters.frameType);
      if (filters.brand) params.append("brand", filters.brand);
      if (filters.frameMaterial)
        params.append("frameMaterial", filters.frameMaterial);
      if (filters.search) params.append("search", filters.search);
      if (filters.page) params.append("page", filters.page);
      if (filters.limit) params.append("limit", filters.limit);

      const response = await api.get(
        `${SUNGLASSES_ENDPOINTS.GET_ALL_SUNGLASSES()}?${params.toString()}`,
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
        message: error.response?.data?.message || "Error fetching sunglasses",
      };
    }
  },

  getSunGlassById: async (id) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        return {
          success: false,
          message: "No access token found. Please log in.",
        };
      }

      const response = await api.get(
        SUNGLASSES_ENDPOINTS.GET_SUNGLASS_BY_ID(id),
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
        message:
          error.response?.data?.message || "Error fetching sunglass details",
      };
    }
  },
};
