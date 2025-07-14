import axiosInstance from "../../config/axiosInstance";
import { QueryParams } from "../../utils";
import { getCoursesUrl } from "./apis";

export function getCourses(params: QueryParams = {}) {
  return axiosInstance.get(getCoursesUrl, {
    params,
  });
}
