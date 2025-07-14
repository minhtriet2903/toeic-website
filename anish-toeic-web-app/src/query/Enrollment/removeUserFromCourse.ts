import axiosInstance from "../../config/axiosInstance";
import { removeUserFromCourseUrl } from "./apis";

export function removeUserFromCourse(id: string) {
  return axiosInstance.delete(removeUserFromCourseUrl.replace(":id", id));
}
