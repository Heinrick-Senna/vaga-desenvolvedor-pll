import { IsString, Matches, MinLength, Validate } from "class-validator";
import { IsDocumentValidConstraint } from "src/lib/constants";

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  @Validate(IsDocumentValidConstraint)
  document: string;

  @IsString()
  @MinLength(8, { message: "Password must have at least 8 characters." })
  @Matches(/.*[0-9].*/, { message: "Password must contain at least one number." })
  password: string;
}