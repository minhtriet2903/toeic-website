import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type ExamDocument = Exam & Document;

@Schema({ timestamps: true })
export class Exam {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  duration: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, required: true, ref: 'Lesson' })
  lessonId: Types.ObjectId;
}

export const ExamSchema = SchemaFactory.createForClass(Exam);
