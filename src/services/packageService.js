import api from "./api";

// Package endpoints
const PACKAGE_ENDPOINTS = {
  GET_ALL_LENSES: () => `/saleProduct/getAllLenses`,
  GET_ALL_FRAMES: () => `/saleProduct/getAllFrames`,
  CREATE_PACKAGE: () => `/salePackage`,
  GET_LENS_BY_ID: (id) => `/saleProduct/getLensById/${id}`, // <-- NEW
};

export const packageService = {
  getAllLenses: async () => {
    try {
      const response = await api.get(PACKAGE_ENDPOINTS.GET_ALL_LENSES());
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
      const response = await api.get(PACKAGE_ENDPOINTS.GET_LENS_BY_ID(id));

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
  getAllFrames: async () => {
    try {
      const response = await api.get(PACKAGE_ENDPOINTS.GET_ALL_FRAMES());
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
  createPackage: async (payload) => {
    try {
      const response = await api.post(
        PACKAGE_ENDPOINTS.CREATE_PACKAGE(),
        payload
      );
      return {
        success: true,
        data: response.data,
        message: response.data.message || "Package created successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Error creating package",
      };
    }
  },
};
