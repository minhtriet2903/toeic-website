import { CreateQuestionDto } from 'src/exam/question/dto/create-question.dto';

export function createQuestion(
  examId: string,
  title: string,
  content: string,
  index: number,
  parentId: number,
  section: number,
): CreateQuestionDto {
  return {
    examId,
    title,
    content,
    answers: [],
    explanation: '',
    type: 'MultipleChoice',
    index,
    note: '',
    imageUrl: '',
    audioUrl: '',
    parentId,
    section,
  };
}

export const removeEscapeSequences = (input: string): string => {
  return input.replace(/\r/g, '');
};
