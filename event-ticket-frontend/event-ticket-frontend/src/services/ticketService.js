import API from "./api";

/**
 * Service module for digital asset (ticket) management and verification.
 */
export const ticketService = {
  /**
   * Retrieves all verified assets belonging to the authenticated user.
   */
  getMyTickets: async () => {
    try {
      const response = await API.get("/api/v1/tickets/my-tickets");
      return response.data.content || response.data;
    } catch (error) {
      console.error("Ticket Service Error (Fetch My Tickets):", error);
      throw error;
    }
  },

  /**
   * Initializes a ticket purchase for a specific experience.
   */
  bookTicket: async (bookingPayload) => {
    try {
      const response = await API.post("/api/v1/tickets", bookingPayload);
      return response.data;
    } catch (error) {
      console.error("Ticket Service Error (Booking):", error);
      throw error;
    }
  },

  /**
   * Fetches the secure QR verification blob for a specific ticket.
   */
  getQRCode: async (ticketId) => {
    try {
      const response = await API.get(`/api/v1/tickets/${ticketId}/qr-codes`, {
        responseType: 'blob'
      });
      return URL.createObjectURL(response.data);
    } catch (error) {
      console.error("Ticket Service Error (QR Fetch):", error);
      throw error;
    }
  }
};
