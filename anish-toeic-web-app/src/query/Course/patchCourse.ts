import axiosInstance from "../../config/axiosInstance";
import { updateCourseUrl } from "./apis";
import { UpdateCoursePayload } from "./types";

export function patchCourse(body: UpdateCoursePayload) {
  return axiosInstance.patch(updateCourseUrl.replace(":id", body._id), {
    ...body,
  });
}
