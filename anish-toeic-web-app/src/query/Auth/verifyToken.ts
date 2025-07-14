import axiosInstance from "../../config/axiosInstance";
import { verifyTokenUrl } from "./apis";

export function verifyToken() {
  return axiosInstance.get(verifyTokenUrl);
}
