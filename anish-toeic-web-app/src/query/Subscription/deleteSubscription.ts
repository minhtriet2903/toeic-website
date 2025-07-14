import axiosInstance from "../../config/axiosInstance";
import { deleteSubscriptionUrl } from "./apis";

export function deleteSubscription(id: string) {
  return axiosInstance.delete(deleteSubscriptionUrl.replace(":id", id));
}
