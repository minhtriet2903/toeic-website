import axiosInstance from "../../config/axiosInstance";
import { getEnrollmentUrl } from "./apis";

export function getEnrollment(id: string) {
  return axiosInstance.get(getEnrollmentUrl.replace(":id", id));
}
