import { Question } from "../Question";

interface Exam {
  _id: string;
  title: string;
  description: string;
  duration: number;
  questions: Question[];
  lessonId: string;
}

interface CreateExamPayload {
  title: string;
  duration?: number;
  description?: string;
  lessonId: string;
}

interface EditExamPayload {
  _id: string;
  title?: string;
  description?: string;
  duration?: number;
}

interface ExamAnswer {
  questionId: string;
  answer?: string;
}

interface SubmitExamPayload {
  examId: string;
  userId: string;
  answers: ExamAnswer[];
}

export type { CreateExamPayload, EditExamPayload, Exam, SubmitExamPayload };
