import api from "./api"; // Adjust the path as needed

// Frame endpoints
const FRAME_ENDPOINTS = {
  GET_ALL_FRAMES: (params) => `/saleProduct/getAllFrames?${params}`,
};

// Frame service functions
export const frameService = {
  getAllFrames: async (frameType, brand, frameMaterial) => {
    try {
      // Retrieve the accessToken from localStorage
      const accessToken = localStorage.getItem("accessToken");

      // If no token is found, return an error
      if (!accessToken) {
        return {
          success: false,
          message: "No access token found. Please log in.",
        };
      }

      // Construct query parameters
      const params = new URLSearchParams({
        frameType: frameType || "",
        brand: brand || "",
        frameMaterial: frameMaterial || "",
      }).toString();

      // Make the API call with the Bearer token in the Authorization header
      const response = await api.get(FRAME_ENDPOINTS.GET_ALL_FRAMES(params), {
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
        message: error.response?.data?.message || "Error fetching frames",
      };
    }
  },
};