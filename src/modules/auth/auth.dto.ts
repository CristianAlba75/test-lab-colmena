import { IsString } from 'class-validator';

export class LoginBasicDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class LoginResponseDto {
  @IsString()
  accessToken: string;
}
