import type { Failure, Result } from '@shaval/core'
import type { AndValidatorShorthand } from './combinators/and.js'
import type { ObjectValidatorShorthand } from './validators/object.js'

/**
 * @public
 */
export type Validator<T> = (value: T | Failure) => Result<T>

/**
 * @public
 */
export type ValidatorOrShorthand<T> = Validator<T> | AndValidatorShorthand<T> | ObjectValidatorShorthand<T>
