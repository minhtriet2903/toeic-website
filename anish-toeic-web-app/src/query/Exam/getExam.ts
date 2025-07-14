import axiosInstance from "../../config/axiosInstance";
import { getExamUrl } from "./apis";
import { Exam } from "./types";

export async function getExam(id: string): Promise<Exam> {
  const response = await axiosInstance.get<Exam>(getExamUrl.replace(":id", id));
  return response.data;
}
