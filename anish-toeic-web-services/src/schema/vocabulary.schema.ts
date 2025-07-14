import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type VocabularyDocument = Vocabulary & Document;

@Schema({ timestamps: true })
export class Vocabulary {
  @Prop()
  word: string;

  @Prop()
  pronunciation: string;

  @Prop()
  explanation: string;

  @Prop()
  meaning: string;

  @Prop()
  example: string;

  @Prop()
  audioUrl: string;

  @Prop()
  imageUrl: string;
}

export const VocabularySchema = SchemaFactory.createForClass(Vocabulary);
