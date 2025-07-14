import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuestionDocument = Question & Document;

@Schema({ timestamps: true })
export class Question {
  @Prop()
  title: string;

  @Prop()
  explanation: string;

  @Prop()
  content?: string;

  @Prop()
  note?: string;

  @Prop()
  section: number;

  @Prop({ required: true })
  type: string;

  @Prop()
  audioUrl?: string;

  @Prop()
  imageUrl?: string;

  @Prop()
  parentId: number;

  @Prop({ type: [{ text: String, isCorrect: Boolean }], required: true })
  answers: { text: string; isCorrect?: boolean }[];

  @Prop({ required: true })
  examId: string;

  @Prop({ required: true })
  index: number; //support to sort question in exam
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
