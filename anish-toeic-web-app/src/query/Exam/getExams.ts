import axiosInstance from "../../config/axiosInstance";
import { getExamsUrl } from "./apis";

export function getExams() {
  return axiosInstance.get(getExamsUrl);
}
