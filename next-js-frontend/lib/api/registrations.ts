import {
  Registration,
  CreateRegistrationData,
  VerifyPaymentData,
  ApiResponse,
} from "@/types/event";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const registrationsApi = {
  // Get registrations for an event
  getRegistrations: async (eventCode: string): Promise<Registration[]> => {
    const response = await fetch(`${API_URL}/registrations/${eventCode}`);
    if (!response.ok) {
      throw new Error("Failed to fetch registrations");
    }
    const data = await response.json();
    return data.registrations || data;
  },

  // Create a new registration (initiates payment)
  createRegistration: async (
    registrationData: CreateRegistrationData
  ): Promise<{
    registration: Registration;
    orderId: string;
    amount: number;
    currency: string;
  }> => {
    const response = await fetch(`${API_URL}/registrations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create registration");
    }
    return response.json();
  },

  // Verify payment after Razorpay callback
  verifyPayment: async (
    paymentData: VerifyPaymentData
  ): Promise<ApiResponse<{ registration: Registration }>> => {
    const response = await fetch(`${API_URL}/registrations/verify-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Payment verification failed");
    }
    return response.json();
  },
};
