import { IsString, Validate } from "class-validator";
import { IsDocumentValidConstraint } from "src/lib/constants";

export class LoginDto {
  @IsString()
  @Validate(IsDocumentValidConstraint)
  document: string;

  @IsString()
  password: string;
}