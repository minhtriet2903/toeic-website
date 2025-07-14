import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Payment extends Document {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
    ref: 'Enrollment',
  })
  enrollmentId: Types.ObjectId;

  @Prop({ type: String, required: true })
  paymentMethod: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ default: 'completed' })
  status: string; // completed, pending, failed

  @Prop({ default: Date.now })
  paidAt: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
PaymentSchema.index({ enrollmentId: 1, paidAt: -1 });
