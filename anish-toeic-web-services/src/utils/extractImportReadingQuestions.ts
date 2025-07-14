import { CreateQuestionDto } from 'src/exam/question/dto/create-question.dto';
import { createQuestion, removeEscapeSequences } from './helpers';

export function extractImportReadingQuestions(
  examId: string,
  text: string,
): CreateQuestionDto[] {
  const lines = text.split('\n').filter((line) => line.trim() !== '');

  const parsedQuestions: CreateQuestionDto[] = [];
  let part = 1;
  let section = 1;
  let currentQuestion: CreateQuestionDto | null = null;
  let questionIndex = 0;
  let answerKeyIndex = 0;
  let groupQuestionOffset = -1;
  let groupQuestionLength = 0;
  let isBeginGroupQuestion = false;
  let groupQuestionContent = '';
  let answerExplanation = '';

  const extractGroupQuestionOffset = (line: string) => {
    const questionRange = line.split(' ')[1]?.trim();
    if (questionRange) {
      const [start, end] = questionRange.split('-').map(Number);
      if (!isNaN(start) && !isNaN(end)) {
        groupQuestionLength = end - start;
      }
    }
  };

  const handleCreateNewQuestion = (index: number) => {
    if (isBeginGroupQuestion) {
      groupQuestionOffset = 0;
      isBeginGroupQuestion = false;
    }

    currentQuestion = createQuestion(
      examId,
      lines[index + 1].trim(),
      groupQuestionOffset === 0 ? groupQuestionContent : '',
      questionIndex,
      groupQuestionOffset > 0 ? questionIndex - groupQuestionOffset : -1,
      section,
    );
    parsedQuestions.push(currentQuestion);

    if (groupQuestionOffset >= 0 && groupQuestionOffset <= groupQuestionLength)
      groupQuestionOffset += 1;
    else {
      groupQuestionOffset = -1;
    }
  };

  function handleQuestionsPart(line: string, index: number) {
    if (index > 0 && lines[index - 1].includes('Câu')) return;

    if (line.includes('Câu')) {
      handleCreateNewQuestion(index);
    } else if (line.includes('refer to')) {
      extractGroupQuestionOffset(line);
      isBeginGroupQuestion = true;
      groupQuestionContent = '';
      groupQuestionContent += line;
    } else if (isBeginGroupQuestion && !currentQuestion) {
      groupQuestionContent += '\n' + line;
    } else if (currentQuestion) {
      currentQuestion.answers.push({
        text: line,
        isCorrect: false,
      });
      if (
        lines[index + 1].includes('Câu') ||
        currentQuestion.answers.length === 4
      ) {
        questionIndex += 1;
        if (questionIndex === 30) section = 2;
        if (questionIndex === 46) section = 3;
        currentQuestion = null;
      }
    }
  }

  function markCorrectAnswer(line: string, question: CreateQuestionDto) {
    const correctOption = line.split('Đáp án đúng:')[1].trim();
    question.answers.forEach((answer) => {
      if (answer.text.includes(correctOption + '.')) {
        answer.isCorrect = true;
      }
    });
  }

  function handleAnswerAndExplanationPart(line: string, index: number) {
    if (!parsedQuestions[answerKeyIndex]) return;

    if (
      (line.trim().startsWith('Câu') && answerKeyIndex > 0) ||
      index === lines.length - 1
    ) {
      parsedQuestions[answerKeyIndex - 1].explanation = answerExplanation;
    }

    if (line.includes('Đáp án đúng:')) {
      answerExplanation = '';
      answerKeyIndex += 1;
      markCorrectAnswer(line, parsedQuestions[answerKeyIndex - 1]);
    } else if (!line.trim().startsWith('Câu')) {
      answerExplanation += line + '\n';
    }
  }

  lines.forEach((line, index) => {
    if (line.includes('HƯỚNG DẪN GIẢI CHI TIẾT')) {
      part = 2;
      return;
    }

    if (part === 1) {
      handleQuestionsPart(removeEscapeSequences(line), index);
    } else {
      handleAnswerAndExplanationPart(removeEscapeSequences(line), index);
    }
  });

  return parsedQuestions;
}
