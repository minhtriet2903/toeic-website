import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateFolderDto {
  @IsString()
  name: string;

  @IsMongoId()
  ownerId: string;

  @IsOptional()
  @IsMongoId()
  parentId?: string;
}
