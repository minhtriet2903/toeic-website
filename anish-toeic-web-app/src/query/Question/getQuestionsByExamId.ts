import axiosInstance from "../../config/axiosInstance";
import { getQuestionsByExamIdUrl } from "./apis";
import { Question } from "./types";

export async function getQuestionsByExamId(
  examId: string
): Promise<Question[]> {
  const response = await axiosInstance.get<Question[]>(
    getQuestionsByExamIdUrl.replace(":examId", examId)
  );
  return response.data;
}
