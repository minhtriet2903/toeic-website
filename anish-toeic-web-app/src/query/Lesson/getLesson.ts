import axiosInstance from "../../config/axiosInstance";
import { getLessonUrl } from "./apis";

export function getLesson(id: string) {
  return axiosInstance.get(getLessonUrl.replace(":id", id));
}
