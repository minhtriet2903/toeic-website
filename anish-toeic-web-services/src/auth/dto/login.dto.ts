import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from 'src/schema/user.schema';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  password: string;
}

export interface AuthenticatedResponse {
  accessToken: string;
  user: User;
}
