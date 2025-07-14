import axiosInstance from "../../config/axiosInstance";
import { deleteExamUrl } from "./apis";

export function deleteExam(id: string) {
  return axiosInstance.delete(deleteExamUrl.replace(":id", id));
}
