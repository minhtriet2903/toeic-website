import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExamService } from 'src/exam/exam.service';
import { QuestionService } from 'src/exam/question/question.service';
import { ExamSchema } from 'src/schema/exam.schema';
import { LessonSchema } from 'src/schema/lesson.schema';
import { QuestionSchema } from 'src/schema/question.schema';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Lesson', schema: LessonSchema },
      { name: 'Exam', schema: ExamSchema },
      { name: 'Question', schema: QuestionSchema },
    ]),
  ],
  controllers: [LessonController],
  providers: [LessonService, ExamService, QuestionService],
})
export class LessonModule {}
