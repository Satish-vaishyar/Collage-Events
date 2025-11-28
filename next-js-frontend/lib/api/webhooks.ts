import { PollData, ApiResponse } from "@/types/event";

const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_WEBHOOK_URL || "http://localhost:3001/webhook";

export const webhooksApi = {
  // Send Telegram poll
  sendPoll: async (pollData: PollData): Promise<ApiResponse<{ pollId: string }>> => {
    const response = await fetch(`${WEBHOOK_URL}/poll`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pollData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to send poll");
    }
    return response.json();
  },
};
