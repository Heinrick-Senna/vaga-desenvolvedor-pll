import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { cnpj, cpf } from "cpf-cnpj-validator";

@ValidatorConstraint()
export class IsDocumentValidConstraint implements ValidatorConstraintInterface {
  validate = (document: string) => cpf.isValid(document, true) || cnpj.isValid(document, true)
  defaultMessage = () => "Document must be a valid CPF or CNPJ"
}