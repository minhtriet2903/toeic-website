import axiosInstance from "../../config/axiosInstance";
import { logoutUrl } from "./apis";

export function logout() {
  return axiosInstance.post(logoutUrl);
}
