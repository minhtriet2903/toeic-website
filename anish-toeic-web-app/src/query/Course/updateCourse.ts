import axiosInstance from "../../config/axiosInstance";
import { updateCourseUrl } from "./apis";
import { UpdateCoursePayload } from "./types";

export function updateCourse(body: UpdateCoursePayload) {
  return axiosInstance.put(updateCourseUrl.replace(":id", body._id), {
    ...body,
  });
}
