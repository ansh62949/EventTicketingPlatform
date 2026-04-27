/**
 * Centralized API configuration node.
 * Dynamically resolves the base URL from the environment environment.
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
