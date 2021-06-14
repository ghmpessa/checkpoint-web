import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class PasswordValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (input: object): Error {
    const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_!@#$%^&*-])(?=.{8,})/
    return (!input[this.field] || passwordRegex.test(input[this.field])) ? null : new InvalidFieldError()
  }
}
