import { Failure, isFailure, Result } from '@shaval/core'
import { AndValidatorShorthand, _and } from './combinators/and.js'
import { objectValidator, ObjectValidatorShorthand } from './validators/object.js'

/**
 * @public
 */
export type Validator<T> = (value: T | Failure) => Result<T>

/**
 * @public
 */
export type ValidatorOrShorthand<T> = Validator<T> | AndValidatorShorthand<T> | ObjectValidatorShorthand<T>

/**
 * Private version to ensure it can be properly minified for production builds.
 *
 * @private
 */
export function _resolveValidatorOrShorthand<T>(validatorOrShorthand: ValidatorOrShorthand<T>): Validator<T> {
  if (validatorOrShorthand === null || validatorOrShorthand === undefined) {
    throw new Error(`validators or shorthands must not be null or undefined`)
  }

  if (Array.isArray(validatorOrShorthand)) {
    return _and(...validatorOrShorthand)
  }

  if (typeof validatorOrShorthand === 'object') {
    return objectValidator(validatorOrShorthand as never)
  }

  return validatorOrShorthand
}

/**
 * @public
 */
export function validator<T>(validatorOrShorthand: ValidatorOrShorthand<T>): Validator<T> {
  return _resolveValidatorOrShorthand(validatorOrShorthand)
}

/**
 * @public
 */
export function custom<T>(validationFn: (value: T) => Result<T>): Validator<T> {
  if (validationFn === null || validationFn === undefined) {
    throw new Error(`validation function must not be null or undefined`)
  }

  return (value) => (isFailure(value) ? value : validationFn(value))
}
