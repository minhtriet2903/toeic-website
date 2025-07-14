import axiosInstance from "../../config/axiosInstance";
import { updateQuestionUrl } from "./apis";
import { Question } from "./types";

export function updateQuestion(body: Question) {
  return axiosInstance.put(updateQuestionUrl.replace(":id", body._id), {
    ...body,
  });
}
