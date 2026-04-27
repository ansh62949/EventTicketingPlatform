import API from "./api";

/**
 * Service module for authentication and user management.
 */
export const authService = {
  /**
   * Validates credentials and returns a secure JWT.
   */
  login: async (credentials) => {
    try {
      const response = await API.post("/api/v1/auth/login", credentials);
      return response.data;
    } catch (error) {
      console.error("Auth Service Error (Login):", error);
      throw error;
    }
  },

  /**
   * Initializes a new user account in the system.
   */
  signup: async (userData) => {
    try {
      const response = await API.post("/api/v1/auth/register", userData);
      return response.data;
    } catch (error) {
      console.error("Auth Service Error (Signup):", error);
      throw error;
    }
  }
};
