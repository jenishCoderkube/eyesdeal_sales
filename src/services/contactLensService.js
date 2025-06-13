import api from "./api";

// Contact Lens endpoints
const CONTACT_LENS_ENDPOINTS = {
  GET_ALL_CONTACT_LENSES: (params) => {
    const queryParams = new URLSearchParams();
    if (params?.brand) queryParams.append("brand", params.brand);
    if (params?.disposabilityType)
      queryParams.append("disposability", params.disposabilityType);
    if (params?.search) queryParams.append("search", params.search);
    return `/saleProduct/getAllContactLens${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;
  },
  GET_CONTACT_LENS_BY_ID: (id) => `/saleProduct/getContactLensById/${id}`,
  GET_ALL_DISPOSABILITY: () => `saleProduct/master/disposability
 `,
};

// Contact Lens service functions
export const contactLensService = {
  getAllContactLenses: async (params = {}) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        return {
          success: false,
          message: "No access token found. Please log in.",
        };
      }

      const response = await api.get(
        CONTACT_LENS_ENDPOINTS.GET_ALL_CONTACT_LENSES(params),
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
          error.response?.data?.message || "Error fetching contact lenses",
      };
    }
  },

   getAllDisposability: async () => {
    try {
      const response = await api.get(CONTACT_LENS_ENDPOINTS.GET_ALL_DISPOSABILITY());

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Error fetching lenses",
      };
    }
  },

  getContactLensById: async (id) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        return {
          success: false,
          message: "No access token found. Please log in.",
        };
      }

      const url = CONTACT_LENS_ENDPOINTS.GET_CONTACT_LENS_BY_ID(id);

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
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Error fetching contact lens details",
      };
    }
  },
};
