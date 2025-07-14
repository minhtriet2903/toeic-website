import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateAnswerDto } from './create-answer.dto';

export class CreateQuestionDto {
  @IsString()
  @IsOptional()
  title: string = '';

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsOptional()
  explanation: string = '';

  @IsOptional()
  note: string = '';

  @IsOptional()
  content: string = '';

  @IsOptional()
  imageUrl: string = '';

  @IsOptional()
  audioUrl: string = '';

  @IsNumber()
  @IsOptional()
  section: number = 1;

  @IsNumber()
  @IsOptional()
  parentId: number = -1;

  @IsString()
  @IsNotEmpty()
  examId: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  answers: CreateAnswerDto[];

  @IsNumber()
  index: number;
}

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
  @IsString()
  _id: string;
}
