import axiosInstance from "../../config/axiosInstance";
import { updateLessonUrl } from "./apis";
import { UpdateLessonPayload } from "./types";

export function updateLesson(body: UpdateLessonPayload) {
  return axiosInstance.put(updateLessonUrl.replace(":id", body._id), {
    ...body,
  });
}
