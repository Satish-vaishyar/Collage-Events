import {
  Ticket,
  TicketReplyData,
  UpdateTicketStatusData,
  ApiResponse,
} from "@/types/event";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const ticketsApi = {
  // Get tickets for an event
  getTickets: async (eventCode: string): Promise<Ticket[]> => {
    const response = await fetch(`${API_URL}/tickets/${eventCode}`);
    if (!response.ok) {
      throw new Error("Failed to fetch tickets");
    }
    const data = await response.json();
    return data.tickets || data;
  },

  // Reply to a ticket
  replyToTicket: async ({
    ticketId,
    answer,
  }: TicketReplyData): Promise<ApiResponse<{ ticket: Ticket }>> => {
    const response = await fetch(`${API_URL}/tickets/${ticketId}/reply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answer }),
    });
    if (!response.ok) {
      throw new Error("Failed to reply to ticket");
    }
    return response.json();
  },

  // Update ticket status
  updateTicketStatus: async ({
    ticketId,
    status,
  }: UpdateTicketStatusData): Promise<ApiResponse<{ ticket: Ticket }>> => {
    const response = await fetch(`${API_URL}/tickets/${ticketId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      throw new Error("Failed to update ticket status");
    }
    return response.json();
  },
};
