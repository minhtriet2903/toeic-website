import axiosInstance from "../../config/axiosInstance";
import { addQuestionUrl } from "./apis";
import { CreateQuestionPayload } from "./types";

export function addQuestion(body: CreateQuestionPayload) {
  return axiosInstance.post(addQuestionUrl, {
    ...body,
  });
}
