import api from "./api"; // Adjust the path as needed

// Sunglasses endpoints
const SUNGLASSES_ENDPOINTS = {
  GET_ALL_SUNGLASSES: () => `/saleProduct/getAllSunGlasses`,
  GET_SUNGLASS_BY_ID: (id) => `/saleProduct/getSunGlassByid/${id}`,
};

// Sunglasses service functions
export const SunGlassesService = {
  // getAllSunGlasses: async (frameType, brand, frameMaterial) => {
  getAllSunGlasses: async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        return {
          success: false,
          message: "No access token found. Please log in.",
        };
      }

      // const params = new URLSearchParams({
      //   frameType: frameType || "",
      //   brand: brand || "",
      //   frameMaterial: frameMaterial || "",
      // }).toString();

      const response = await api.get(
        // `${SUNGLASSES_ENDPOINTS.GET_ALL_SUNGLASSES()}?${params}`,
        `${SUNGLASSES_ENDPOINTS.GET_ALL_SUNGLASSES()}`,

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
