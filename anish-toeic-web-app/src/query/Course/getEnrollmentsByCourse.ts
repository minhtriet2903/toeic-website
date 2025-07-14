import axiosInstance from "../../config/axiosInstance";
import { getEnrollmentsByCourseUrl } from "./apis";

export function getEnrollmentsByCourse(id: string) {
  return axiosInstance.get(getEnrollmentsByCourseUrl.replace(":id", id));
}
