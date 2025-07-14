import axiosInstance from "../../config/axiosInstance";
import { getFreeCoursesUrl } from "./apis";

export function getFreeCourses() {
  return axiosInstance.get(getFreeCoursesUrl);
}
