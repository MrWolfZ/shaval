import type { Errors } from '@shaval/core'
import { _failure, _isFailure } from '../result.js'
import type { Validator, ValidatorOrShorthand } from '../validator.js'

/**
 * @public
 */
export type AndValidatorShorthand<T> = readonly [
  ValidatorOrShorthand<T>,
  ValidatorOrShorthand<T>,
  ...ValidatorOrShorthand<T>[]
]

/**
 * @public
 */
export type _AndValidators<T> = { [K in keyof T]: Validator<T[K]> }

/**
 * @public
 */
export function and<T1, T2, TRest extends unknown[]>(
  validator1: Validator<T1>,
  validator2: Validator<T2>,
  ...otherValidators: _AndValidators<TRest>
): Validator<T1 & T2 & ([] extends TRest ? unknown : TRest[number])> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return _and<any>(validator1, validator2, ...otherValidators)
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
