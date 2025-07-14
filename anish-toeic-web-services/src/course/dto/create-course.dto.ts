import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string = '';

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  price: number = 0;

  @IsString()
  @IsOptional()
  imageUrl: string = '';

  @IsString()
  @IsNotEmpty()
  createdUser: string;
}
