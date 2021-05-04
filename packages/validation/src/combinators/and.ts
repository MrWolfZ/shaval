import type { Errors } from '@shaval/core'
import { _failure, _isFailure } from '../result.js'
import type { Validator } from '../validator.js'

/**
 * @public
 */
export function and<T>(
  validator1: Validator<T>,
  validator2: Validator<T>,
  ...otherValidators: Validator<T>[]
): Validator<T> {
  return _and(validator1, validator2, ...otherValidators)
}

/**
 * @internal
 */
export function _and<T>(...validators: Validator<T>[]): Validator<T> {
  if (validators.some((v) => v === null || v === undefined)) {
    throw new Error(`validators must not be null or undefined`)
  }

  if (validators.length === 1) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return validators[0]!
  }

  return (value) => {
    if (_isFailure(value)) {
      return value
    }

    const errors: Errors[] = []

    for (const validator of validators) {
      const result = validator(value)

      if (_isFailure(result)) {
        errors.push(...result.errors)
      }
    }

    return errors.length > 0 ? _failure(errors) : value
  }
}
