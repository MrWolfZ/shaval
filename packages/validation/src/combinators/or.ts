import type { Errors } from '@shaval/core'
import { _failure, _isFailure } from '../result.js'
import { Validator, ValidatorOrShorthand, _resolveValidatorOrShorthand } from '../validator.js'

/**
 * @public
 */
export function or<T>(
  validator1: ValidatorOrShorthand<T>,
  validator2: ValidatorOrShorthand<T>,
  ...restValidators: ValidatorOrShorthand<T>[]
): Validator<T> {
  return _or(validator1, validator2, ...restValidators)
}

function _or<T>(...validators: ValidatorOrShorthand<T>[]): Validator<T> {
  if (validators.some((v) => v === null || v === undefined)) {
    throw new Error(`validators must not be null or undefined`)
  }

  const resolvedValidators = validators.map(_resolveValidatorOrShorthand)

  return (value) => {
    if (_isFailure(value)) {
      return value
    }

    const errors: Errors[] = []

    for (const validator of resolvedValidators) {
      const result = validator(value)

      if (_isFailure(result)) {
        errors.push(...result.errors)
      } else {
        return value
      }
    }

    return errors.length > 0 ? _failure(value, 'value must pass one of the validators', _failure(errors).errors) : value
  }
}
