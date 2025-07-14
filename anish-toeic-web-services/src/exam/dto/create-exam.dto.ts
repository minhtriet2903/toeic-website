import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateExamDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string = '';

  @IsNumber()
  duration: number; // in minutes

  @IsString()
  lessonId: string;
}

export class UpdateExamDto extends PartialType(CreateExamDto) {
  @IsString()
  _id: string;
}
