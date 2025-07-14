import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResultService } from 'src/result/result.service';
import { ExamSchema } from 'src/schema/exam.schema';
import { QuestionSchema } from 'src/schema/question.schema';
import { ResultSchema } from 'src/schema/result.schema';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';
import { QuestionController } from './question/question.controller';
import { QuestionService } from './question/question.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Exam', schema: ExamSchema },
      { name: 'Question', schema: QuestionSchema },
      { name: 'Result', schema: ResultSchema },
    ]),
  ],
  controllers: [ExamController, QuestionController],
  providers: [ExamService, QuestionService, ResultService],
})
export class ExamModule {}
