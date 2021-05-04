import { Errors, failure, isFailure } from '@shaval/core'
import type { Validator } from '../validator.js'

/**
 * @public
 */
export function combine<T>(
  validator1: Validator<T>,
  validator2: Validator<T>,
  ...otherValidators: Validator<T>[]
): Validator<T> {
  return _combine(validator1, validator2, ...otherValidators)
}

/**
 * @internal
 */
export function _combine<T>(...validators: Validator<T>[]): Validator<T> {
  if (validators.some((v) => v === null || v === undefined)) {
    throw new Error(`validators must not be null or undefined`)
  }

  if (validators.length === 1) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return validators[0]!
  }

  return (value) => {
    const errors: Errors[] = []

    for (const validator of validators) {
      const result = validator(value)

      if (isFailure(result)) {
        errors.push(...result.errors)
      }
    }

    return errors.length > 0 ? failure(errors) : value
  }
}
