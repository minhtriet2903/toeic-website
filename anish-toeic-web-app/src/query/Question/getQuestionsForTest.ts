import axiosInstance from "../../config/axiosInstance";
import { getQuestionsForTestUrl } from "./apis";
import { Question } from "./types";

export async function getQuestionsForTest(examId: string): Promise<Question[]> {
  const response = await axiosInstance.get<Question[]>(
    getQuestionsForTestUrl.replace(":examId", examId)
  );
  return response.data;
}
