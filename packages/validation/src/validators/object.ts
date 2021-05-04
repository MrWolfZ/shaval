import { Errors, failure, isFailure, _ReadonlyObject } from '@shaval/core'
import { _and } from '../combinators/and.js'
import type { Validator } from '../validator.js'

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
export type ObjectPropertyValidator<TProperty extends unknown[], TValidator> = TProperty extends [unknown[]]
  ? _SelfOrArray<TValidator>
  : TProperty[number] extends _ReadonlyObject
  ? _SelfOrArray<ObjectPropertyValidators<TProperty[number]> | TValidator>
  : _SelfOrArray<TValidator>

/**
 * @public
 */
export type ObjectPropertyValidators<T extends _ReadonlyObject> = {
  readonly [prop in keyof T]?: ObjectPropertyValidator<
    [Exclude<T[prop], undefined>], // wrap in tuple to prevent distribution of unions
    Validator<_ArrayAsReadonly<Exclude<T[prop], undefined>>>
  >
}

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
      const validator = propertyValidators[key as keyof T] as Validator<unknown>

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
  propValidator: ObjectPropertyValidator<[unknown], Validator<unknown>>,
): Validator<unknown> {
  const validators: Validator<unknown>[] = []

  if (typeof propValidator === 'function') {
    validators.push(propValidator)
  } else if (Array.isArray(propValidator)) {
    validators.push(...propValidator)
  } else {
    validators.push(validateObject(propValidator) as Validator<unknown>)
  }

  return _and(...validators)
}

function prependKeyToPath(error: Errors, key: string): Errors {
  return {
    ...error,
    path: [key, ...error.path],
  }
}
