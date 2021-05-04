import { Errors, failure, isFailure, _ReadonlyObject } from '@shaval/core'
import type { Validator } from '../validator.js'
import { _combine } from './combine.js'

/**
 * @public
 */
export type _SelfOrArray<T> = T | readonly T[]

/**
 * @public
 */
export type _ArrayAsReadonly<T> = T extends readonly (infer U)[] ? readonly U[] : T

/**
 * @public
 */
export type ObjectPropertyValidator<TProperty, TValidator, TTuple> = TProperty extends unknown[]
  ? _SelfOrArray<TValidator>
  : TProperty extends _ReadonlyObject
  ? [null] extends TTuple
    ? never
    : _SelfOrArray<ObjectPropertyValidators<TProperty> | TValidator>
  : _SelfOrArray<TValidator>

/**
 * @public
 */
export type ObjectPropertyValidators<T extends _ReadonlyObject> = {
  readonly [prop in keyof T]?: ObjectPropertyValidator<
    Exclude<T[prop], undefined>,
    Validator<_ArrayAsReadonly<Exclude<T[prop], undefined>>>,
    [Exclude<T[prop], undefined>]
  >
}

// interface Nested {
//   n: number
// }

// type T = ObjectPropertyValidator<Nested | null, Validator<Nested | null>, [Nested | null]>

/**
 * @public
 */
export function validateObject<T>(propertyValidators: ObjectPropertyValidators<T>): Validator<T> {
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
    const errors: Errors[] = []

    for (const key of Object.keys(value)) {
      const propValue = value[key as keyof T]
      const validator = propertyValidators[key as keyof T]

      if (!validator) {
        continue
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const propValidator = getPropertyValidator(validator!)
      const result = propValidator(propValue)

      if (isFailure(result)) {
        errors.push(...result.errors.map((err) => prependKeyToPath(err, key)))
      }
    }

    return errors.length > 0 ? failure(errors) : value
  }
}

function getPropertyValidator(
  propValidator: ObjectPropertyValidator<unknown, Validator<unknown>, [unknown]>,
): Validator<unknown> {
  const validators: Validator<unknown>[] = []

  if (typeof propValidator === 'function') {
    validators.push(propValidator)
  } else if (Array.isArray(propValidator)) {
    validators.push(...propValidator)
  } else {
    validators.push(validateObject(propValidator) as Validator<unknown>)
  }

  return _combine(...validators)
}

function prependKeyToPath(error: Errors, key: string): Errors {
  return {
    ...error,
    path: [key, ...error.path],
  }
}
