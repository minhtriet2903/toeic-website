import axiosInstance from "../../config/axiosInstance";
import { createLessonsUrl } from "./apis";
import { CreateLessonPayload } from "./types";

export function createLesson(body: CreateLessonPayload) {
  return axiosInstance.post(createLessonsUrl, {
    ...body,
  });
}
