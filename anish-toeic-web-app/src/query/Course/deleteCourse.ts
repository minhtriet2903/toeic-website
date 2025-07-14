import axiosInstance from "../../config/axiosInstance";
import { deleteCourseUrl } from "./apis";

export function deleteCourse(id: string) {
  return axiosInstance.delete(deleteCourseUrl.replace(":id", id));
}
