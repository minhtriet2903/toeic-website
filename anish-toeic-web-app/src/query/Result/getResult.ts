import axiosInstance from "../../config/axiosInstance";
import { getResultUrl } from "./apis";
import { ExamResult } from "./types";

export async function getResult(id: string): Promise<ExamResult> {
  const response = await axiosInstance.get<ExamResult>(
    getResultUrl.replace(":id", id)
  );
  return response.data;
}
