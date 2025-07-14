import { Exam } from "../Exam";
import { Question } from "../Question";
import { User } from "../User";

interface QuestionResult {
  questionId: Question;
  selectedAnswer: string;
  isCorrect: boolean;
}

interface ExamResult {
  _id: string;
  examId: Exam;
  userId: User;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  answers: QuestionResult[];
  createdAt: Date;
  updatedAt: Date;
}

export type { ExamResult, QuestionResult };
