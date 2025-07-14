import axiosInstance from "../../config/axiosInstance";
import { QueryParams } from "../../utils";
import { getLessonsUrl } from "./apis";

export function getLessons(params: QueryParams = {}) {
  return axiosInstance.get(getLessonsUrl, {
    params,
  });
}
