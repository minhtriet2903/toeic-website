import axiosInstance from "../../config/axiosInstance";
import { deleteQuestionUrl } from "./apis";

export function deleteQuestion(id: string) {
  return axiosInstance.delete(deleteQuestionUrl.replace(":id", id));
}
