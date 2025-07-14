import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVocabularyDto {
  @IsString()
  @IsNotEmpty()
  word: string;

  @IsString()
  meaning: string;

  @IsString()
  pronunciation: string;

  @IsString()
  explanation: string;

  @IsString()
  example: string;

  @IsString()
  audioUrl?: string;

  @IsString()
  imageUrl?: string;
}
