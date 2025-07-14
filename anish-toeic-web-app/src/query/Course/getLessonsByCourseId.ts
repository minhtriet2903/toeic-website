import axiosInstance from "../../config/axiosInstance";
import { getLessonsByCourseIdUrl } from "./apis";

export function getLessonsByCourseId(id: string) {
  return axiosInstance.get(getLessonsByCourseIdUrl.replace(":id", id));
}
