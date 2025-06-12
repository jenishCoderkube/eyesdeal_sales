import api from "./api";

// Lens endpoints
const LENS_ENDPOINTS = {
  GET_ALL_LENSES: (params) => {
    const queryParams = new URLSearchParams();
    if (params?.brand) queryParams.append("brand", params.brand);
    if (params?.prescriptionType)
      queryParams.append("prescriptionType", params.prescriptionType);
    if (params?.search) queryParams.append("search", params.search); // Added search parameter
    return `/saleProduct/getAllLenses${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;
  },
  GET_ALL_PRESCRIPTIONTYPE: () => `saleProduct/master/prescriptionType`,
  GET_LENS_BY_ID: (id) => `/saleProduct/getLensById/${id}`,
};

export const lensService = {
  getAllLenses: async (params = {}) => {
    try {
      const response = await api.get(LENS_ENDPOINTS.GET_ALL_LENSES(params));

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

  getAllprescriptionType: async () => {
    try {
      const response = await api.get(LENS_ENDPOINTS.GET_ALL_PRESCRIPTIONTYPE());

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

  getLensById: async (id) => {
    try {
      const response = await api.get(LENS_ENDPOINTS.GET_LENS_BY_ID(id));

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Error fetching lens by ID",
      };
    }
  },
};
