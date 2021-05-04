import { Errors, failure, isFailure } from '@shaval/core'
import type { Validator } from '../validator.js'

/**
 * @public
 */
export function or<T>(
  validator1: Validator<T>,
  validator2: Validator<T>,
  ...restValidators: Validator<T>[]
): Validator<T> {
  return _or(validator1, validator2, ...restValidators)
}

function _or<T>(...validators: Validator<T>[]): Validator<T> {
  if (validators.some((v) => v === null || v === undefined)) {
    throw new Error(`validators must not be null or undefined`)
  }

  return (value) => {
    const errors: Errors[] = []

    for (const validator of validators) {
      const result = validator(value)

      if (isFailure(result)) {
        errors.push(...result.errors)
      } else {
        return value
      }
    }

    return errors.length > 0 ? failure(value, 'value must pass one of the validators', failure(errors).errors) : value
  }
}
