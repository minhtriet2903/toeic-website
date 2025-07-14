import axiosInstance from "../../config/axiosInstance";
import { getCourseUrl } from "./apis";

export function getCourse(id: string) {
  return axiosInstance.get(getCourseUrl.replace(":id", id));
}
