import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Result extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, required: true, ref: 'Exam' })
  examId: Types.ObjectId;

  @Prop({ required: true })
  score: number;

  @Prop({ required: true })
  correctAnswers: number;

  @Prop({ required: true })
  totalQuestions: number;

  @Prop({
    type: [
      {
        questionId: {
          type: MongooseSchema.Types.ObjectId,
          required: true,
          ref: 'Question',
        },
        selectedAnswer: { type: String },
        isCorrect: { type: Boolean, required: true },
      },
    ],
  })
  answers: {
    questionId: Types.ObjectId;
    selectedAnswer: string;
    isCorrect: boolean;
  }[];

  @Prop({ default: 1 })
  attempt: number;
}

export const ResultSchema = SchemaFactory.createForClass(Result);
ResultSchema.index({ userId: 1, examId: 1, createdAt: -1 });
