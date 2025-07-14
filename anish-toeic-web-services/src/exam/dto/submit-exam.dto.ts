import { IsArray, IsString } from 'class-validator';
import { SubmitAnswerDto } from 'src/result/dto/create-result.dto';

export class SubmitExamDto {
  @IsString()
  examId: string;

  @IsString()
  userId: string;

  @IsArray()
  answers: SubmitAnswerDto[];
}
