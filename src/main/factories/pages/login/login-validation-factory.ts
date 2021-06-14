import { ValidationComposite, ValidationBuilder } from '@/validation/validators'

export const makeLoginValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('username').required().build(),
    ...ValidationBuilder.field('password').required().build()
  ])
}
