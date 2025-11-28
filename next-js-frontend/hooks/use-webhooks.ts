"use client";

import { useMutation } from "@tanstack/react-query";
import { webhooksApi } from "@/lib/api/webhooks";
import { PollData } from "@/types/event";

// Send Telegram poll
export function useSendPoll() {
  return useMutation({
    mutationFn: (data: PollData) => webhooksApi.sendPoll(data),
  });
}
