import { CreateQuestionDto } from 'src/exam/question/dto/create-question.dto';
import { removeEscapeSequences } from './helpers';

export function extractImportQuestions(
  examId: string,
  text: string,
): CreateQuestionDto[] {
  const lines = text.split('\n').filter((line) => line.trim() !== '');

  const parsedQuestions: CreateQuestionDto[] = [];
  let part = 1;
  let currentQuestion: CreateQuestionDto | null = null;
  let questionIndex = 0;
  let answerKeyIndex = 0;

  lines.forEach((line) => {
    if (line.includes('BẢNG ĐÁP ÁN')) {
      part = 2;
      return;
    } else if (line.includes('Hướng dẫn giải')) {
      part = 3;
      return;
    }

    switch (part) {
      case 1:
        handleQuestionsPart(removeEscapeSequences(line));
        break;

      case 2:
        handleAnswerPart(removeEscapeSequences(line));
        break;

      case 3:
        if (line.includes('Giải thích:') && parsedQuestions[questionIndex]) {
          const explanationText = line.split('Giải thích:')[1];
          parsedQuestions[questionIndex].explanation = removeEscapeSequences(
            explanationText.trim(),
          );
          questionIndex += 1;
        }
        break;

      default:
        break;
    }
  });

  function handleQuestionsPart(line: string) {
    // Check if the line starts with a number followed by a period and space
    if (!isNaN(Number(line.split('.')[0])) && line.split('.').length > 1) {
      const questionText = line.split('.')[1].trim();

      // New question
      currentQuestion = {
        examId: examId,
        title: questionText,
        answers: [],
        explanation: '',
        type: 'MultipleChoice',
        index: questionIndex,
        note: '',
        content: '',
        imageUrl: '',
        audioUrl: '',
        parentId: -1,
        section: 1,
      };

      questionIndex += 1;
      parsedQuestions.push(currentQuestion);
    } else if (currentQuestion) {
      currentQuestion.answers.push({
        text: line.trim(),
        isCorrect: false,
      });

      if (currentQuestion.answers.length === 4) {
        currentQuestion = null;
      }
    }
  }

  function handleAnswerPart(line: string) {
    if (!line.includes('BẢNG ĐÁP ÁN') && parsedQuestions[answerKeyIndex]) {
      const correctAnswerText = line.split('.')[1].trim();
      parsedQuestions[answerKeyIndex].answers.forEach((answer) => {
        if (answer.text.includes(correctAnswerText + '.')) {
          answer.isCorrect = true;
        }
      });
      answerKeyIndex += 1;
    }
    questionIndex = 0;
  }

  return parsedQuestions;
}
