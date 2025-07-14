import axiosInstance from "../../config/axiosInstance";
import { getExamsByLessonIdUrl } from "./apis";

export function getExamsByLessonId(lessonId: string) {
  return axiosInstance.get(
    getExamsByLessonIdUrl.replace(":lessonId", lessonId)
  );
}
