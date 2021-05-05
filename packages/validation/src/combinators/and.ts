import type { Errors } from '@shaval/core'
import { _failure, _isFailure } from '../result.js'
import { Validator, ValidatorOrShorthand, _resolveValidatorOrShorthand } from '../validator.js'

/**
 * @public
 */
export type AndValidatorShorthand<T> = readonly [
  ValidatorOrShorthand<T>,
  ValidatorOrShorthand<T>,
  ...ValidatorOrShorthand<T>[]
]

/**
 * Helper type for inference of rest parameter validator types.
 *
 * @public
 */
export type _AndRestValidators<T> = { [K in keyof T]: ValidatorOrShorthand<T[K]> }

// type T = _AndRestValidators<[string, string]>

// const stringValidator: Validator<string> = (value) => value

// const x = and({ s: stringValidator }, { o: stringValidator }, { n: stringValidator })

/**
 * @public
 */
export function and<T>(
  validator1: ValidatorOrShorthand<T>,
  validator2: ValidatorOrShorthand<T>,
  ...otherValidators: ValidatorOrShorthand<T>[]
): Validator<T>

/**
 * @public
 */
export function and<T1, T2, TRest extends readonly unknown[]>(
  validator1: ValidatorOrShorthand<T1>,
  validator2: ValidatorOrShorthand<T2>,
  ...otherValidators: _AndRestValidators<TRest>
): Validator<T1 & T2 & ([] extends TRest ? unknown : TRest[number])>

/**
 * Note that beyond the third validator shorthands do not work and
 * validators need to be declared explicitly.
 *
 * @public
 */
export function and<T1, T2, T3, TRest extends readonly unknown[]>(
  validator1: ValidatorOrShorthand<T1>,
  validator2: ValidatorOrShorthand<T2>,
  validator3: ValidatorOrShorthand<T3>,
  ...otherValidators: _AndRestValidators<TRest>
): Validator<T1 & T2 & T3 & ([] extends TRest ? unknown : TRest[number])>

/**
 * @public
 */
export function and(...validators: ValidatorOrShorthand<unknown>[]): Validator<unknown> {
  return _and(...validators)
}

/**
 * Private function to optimize minification.
 *
 * @private
 */
export function _and<T>(...validators: ValidatorOrShorthand<T>[]): Validator<T> {
  if (validators.some((v) => v === null || v === undefined)) {
    throw new Error(`validators must not be null or undefined`)
  }

  if (validators.length === 1) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return _resolveValidatorOrShorthand(validators[0]!)
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
      }
    }

    return errors.length > 0 ? _failure(errors) : value
  }
}
