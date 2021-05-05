import { _isFailure } from '../result.js'
import { Validator, ValidatorOrShorthand, _resolveValidatorOrShorthand } from '../validator.js'

/**
 * @public
 */
export function allowUndefined<T>(validator: ValidatorOrShorthand<T>): Validator<T | undefined> {
  if (validator === null || validator === undefined) {
    throw new Error(`validators must not be null or undefined`)
  }

  const resolvedValidator = _resolveValidatorOrShorthand(validator)

  return (value) => {
    if (_isFailure(value) || value === undefined) {
      return value
    }

    return resolvedValidator(value)
  }
}
