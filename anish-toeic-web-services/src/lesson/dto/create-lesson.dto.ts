import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  courseId: string;
}

export class UpdateLessonDto extends PartialType(CreateLessonDto) {
  @IsString()
  _id: string;
}
