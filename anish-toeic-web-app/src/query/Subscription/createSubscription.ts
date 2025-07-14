import axiosInstance from "../../config/axiosInstance";
import { createSubscriptionUrl } from "./apis";
import { CreateSubscriptionPayload } from "./types";

export function createSubscription(body: CreateSubscriptionPayload) {
  return axiosInstance.post(createSubscriptionUrl, {
    ...body,
  });
}
