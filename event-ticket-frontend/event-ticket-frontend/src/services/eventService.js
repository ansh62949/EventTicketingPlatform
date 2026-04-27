import API from "./api";

/**
 * Service module for experience management and discovery telemetry.
 */
export const eventService = {
  /**
   * Retrieves all published experiences from the discovery feed.
   */
  getPublishedEvents: async () => {
    try {
      const response = await API.get("/api/v1/published-events");
      return response.data.content || response.data;
    } catch (error) {
      console.error("Event Service Error (Fetch Published):", error);
      throw error;
    }
  },

  /**
   * Fetches detailed data for a specific experience node.
   */
  getEventDetails: async (eventId) => {
    try {
      const response = await API.get(`/api/v1/events/${eventId}`);
      return response.data;
    } catch (error) {
      console.error("Event Service Error (Fetch Details):", error);
      throw error;
    }
  },

  /**
   * Deploys a new experience to the platform (Organizer only).
   */
  createEvent: async (eventPayload) => {
    try {
      const response = await API.post("/api/v1/events", eventPayload);
      return response.data;
    } catch (error) {
      console.error("Event Service Error (Create):", error);
      throw error;
    }
  },

  /**
   * Retrieves experiences managed by the authenticated organizer.
   */
  getManagedEvents: async () => {
    try {
      const response = await API.get("/api/v1/events");
      return response.data.content || response.data;
    } catch (error) {
      console.error("Event Service Error (Fetch Managed):", error);
      throw error;
    }
  }
};
