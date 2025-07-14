import axiosInstance from "../../config/axiosInstance";
import { createExamUrl } from "./apis";
import { CreateExamPayload } from "./types";

export function createExam(body: CreateExamPayload) {
  return axiosInstance.post(createExamUrl, {
    ...body,
  });
}
