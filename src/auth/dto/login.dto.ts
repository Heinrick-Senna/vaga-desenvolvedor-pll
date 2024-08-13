import { IsString } from "class-validator";

export class LoginDto {
  @IsString()
  document: string;

  @IsString()
  password: string;
}