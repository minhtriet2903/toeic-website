import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SubscriptionDocument = Subscription & Document;

@Schema({ timestamps: true })
export class Subscription {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [{ type: String }] })
  interestedCourses: string[];
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
