import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  imageUrl: string;

  @Prop({ default: false })
  isPublic: boolean;

  @Prop({ required: true })
  createdUser: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
