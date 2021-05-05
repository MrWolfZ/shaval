import type { Failure, Result } from '@shaval/core'
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
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function resolveValidatorOrShorthand<T>(validatorOrShorthand: ValidatorOrShorthand<T>): Validator<any> {
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
