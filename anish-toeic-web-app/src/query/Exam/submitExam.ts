import axiosInstance from "../../config/axiosInstance";
import { submitExamUrl } from "./apis";
import { SubmitExamPayload } from "./types";

export function submitExam(body: SubmitExamPayload) {
  return axiosInstance.post(submitExamUrl, {
    ...body,
  });
}
