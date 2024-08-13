import { IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  document: string;

  @IsString()
  @MinLength(8, { message: "Password must have at least 8 characters." })
  @Matches(/.*[0-9].*/, { message: "Password must contain at least one number." })
  password: string;
}