import axiosInstance from "../../config/axiosInstance";
import { getEnrollmentsByUserUrl } from "./apis";

export function getEnrollmentsByUser(id: string) {
  return axiosInstance.get(getEnrollmentsByUserUrl.replace(":id", id));
}
