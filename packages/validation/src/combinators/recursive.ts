import type { _ReadonlyObject } from '@shaval/core'
import { Validator, ValidatorOrShorthand, _resolveValidatorOrShorthand } from '../validator.js'

/**
 * @public
 */
export function recursiveValidator<T extends _ReadonlyObject>(
  validatorFactory: (selfValidator: Validator<T>) => ValidatorOrShorthand<T>,
): Validator<T> {
  return (value) => {
    const selfValidator = recursiveValidator(validatorFactory)
    const resolvedValidator = _resolveValidatorOrShorthand(validatorFactory(selfValidator))
    return resolvedValidator(value)
  }
}
