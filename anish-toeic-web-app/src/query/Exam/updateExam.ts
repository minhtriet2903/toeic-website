import axiosInstance from "../../config/axiosInstance";
import { updateExamUrl } from "./apis";
import { EditExamPayload } from "./types";

export function updateExam(body: EditExamPayload) {
  return axiosInstance.put(updateExamUrl.replace(":id", body._id), {
    ...body,
  });
}
