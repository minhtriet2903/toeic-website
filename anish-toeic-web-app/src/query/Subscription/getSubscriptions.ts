import axiosInstance from "../../config/axiosInstance";
import { getSubscriptionsUrl } from "./apis";

export function getSubscriptions() {
  return axiosInstance.get(getSubscriptionsUrl);
}
