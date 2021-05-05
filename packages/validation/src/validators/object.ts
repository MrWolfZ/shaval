import type { Errors, _ReadonlyObject } from '@shaval/core'
import { _and } from '../combinators/and.js'
import { _failure, _isFailure } from '../result.js'
import type { Validator, ValidatorOrShorthand } from '../validator.js'

/**
 * @public
 */
export type _ArrayAsReadonly<T> = T extends readonly (infer U)[] ? readonly U[] : T

/**
 * @public
 */
export type ObjectValidatorShorthand<T> = ObjectPropertyValidators<T>

/**
 * @public
 */
export type ObjectPropertyValidators<T extends _ReadonlyObject | null> = null extends T
  ? null
  : T extends readonly unknown[]
  ? never
  : {
      readonly [prop in keyof T]?: ValidatorOrShorthand<_ArrayAsReadonly<Exclude<T[prop], undefined>>>
    }

/**
 * @public
 */
export function objectValidator<T>(propertyValidators: ObjectPropertyValidators<T>): Validator<T> {
  if (propertyValidators === null || propertyValidators === undefined) {
    throw new Error(`property validators must not be null or undefined`)
  }

  for (const key of Object.keys(propertyValidators)) {
    const validator = propertyValidators[key as keyof T]

    if (validator === null || (validator === undefined && key in propertyValidators)) {
      throw new Error(`validators must not be null or undefined`)
    }
  }

  return (value) => {
    if (_isFailure(value)) {
      return value
    }

    const errors: Errors[] = []

    for (const key of Object.keys(value)) {
      const propValue = value[key as keyof T]
      const validator = propertyValidators[key as keyof T] as Validator<unknown>

      if (!validator) {
        continue
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const propValidator = getPropertyValidator(validator!)
      const result = propValidator(propValue)

      if (_isFailure(result)) {
        errors.push(...result.errors.map((err) => prependKeyToPath(err, key)))
      }
    }

    return errors.length > 0 ? _failure(errors) : value
  }
}

function getPropertyValidator(propValidator: ValidatorOrShorthand<unknown>): Validator<unknown> {
  const validators: Validator<unknown>[] = []

  if (typeof propValidator === 'function') {
    validators.push(propValidator as any)
  } else if (Array.isArray(propValidator)) {
    validators.push(...(propValidator as any))
  } else {
    validators.push(objectValidator(propValidator as any) as Validator<unknown>)
  }

  return _and(...validators)
}

function prependKeyToPath(error: Errors, key: string): Errors {
  return {
    ...error,
    path: [key, ...error.path],
  }
}
