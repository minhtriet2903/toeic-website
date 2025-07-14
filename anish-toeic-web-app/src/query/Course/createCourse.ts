import axiosInstance from "../../config/axiosInstance";
import { createCourseUrl } from "./apis";
import { CreateCoursePayload } from "./types";

export function createCourse(body: CreateCoursePayload) {
  return axiosInstance.post(createCourseUrl, {
    ...body,
  });
}
