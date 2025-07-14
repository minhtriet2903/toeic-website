interface Answer {
  text: string;
  isCorrect?: boolean;
}

interface CreateQuestionPayload {
  type: string;
  answers: Answer[];
  examId: string;
}

interface Question {
  _id: string;
  title: string;
  explanation: string;
  content?: string;
  type: string;
  index: number;
  section: number;
  note?: string;
  parentId: number;
  audioUrl?: string;
  imageUrl?: string;
  answers: Answer[];
  examId: string;
}

export type { Answer, CreateQuestionPayload, Question };
