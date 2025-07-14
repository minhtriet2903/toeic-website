import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class SubmitAnswerDto {
  @IsString()
  questionId: string;

  @IsString()
  answer: string;
}

export class AnswerDto {
  @IsString()
  questionId: string;

  @IsString()
  @IsOptional()
  selectedAnswer: string = '';

  @IsNumber()
  isCorrect: boolean;
}

export class CreateResultDto {
  @IsString()
  userId: string;

  @IsString()
  examId: string;

  @IsNumber()
  score: number;

  @IsNumber()
  correctAnswers: number;

  @IsNumber()
  totalQuestions: number;

  @IsArray()
  answers: AnswerDto[];
}
