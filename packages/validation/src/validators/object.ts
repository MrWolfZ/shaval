import { error, isShavalError, PropertyErrors, _ReadonlyObject } from '@shaval/core'
import type { Validator } from '../validator.js'
import { combine } from './combine.js'

/**
 * @public
 */
export type _SelfOrArray<T> = T | T[]

/**
 * @public
 */
export type ObjectPropertyValidator<TProperty> = TProperty extends unknown[]
  ? Validator<TProperty> | Validator<TProperty>[]
  : TProperty extends _ReadonlyObject
  ? _SelfOrArray<ObjectPropertyValidators<TProperty> | Validator<TProperty>>
  : _SelfOrArray<Validator<TProperty>>

/**
 * @public
 */
export type ObjectPropertyValidators<T extends _ReadonlyObject> = {
  readonly [prop in keyof T]?: ObjectPropertyValidator<NonNullable<T[prop]>>
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
    const errors: (string | PropertyErrors)[] = []

    for (const key of Object.keys(propertyValidators)) {
      const propValue = value[key as keyof T]
      const validator = propertyValidators[key as keyof T]

      if (validator === null || (validator === undefined && key in propertyValidators)) {
        throw new Error(`validators must not be null or undefined`)
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const propValidator = getPropertyValidator(validator!)
      const result = propValidator(propValue)

      if (isShavalError(result)) {
        errors.push(...result.errors.map((err) => prependKeyToPath(err, key)))
      }
    }

    return errors.length > 0 ? error(value, ...errors) : value
  }
}

function getPropertyValidator(propValidator: ObjectPropertyValidator<unknown>): Validator<unknown> {
  const validators: Validator<unknown>[] = []

  if (typeof propValidator === 'function') {
    validators.push(propValidator)
  } else if (Array.isArray(propValidator)) {
    validators.push(...propValidator)
  } else {
    validators.push(validateObject(propValidator))
  }

  return combine(...validators)
}

function prependKeyToPath(error: string | PropertyErrors, key: string): PropertyErrors {
  if (typeof error === 'string') {
    return {
      path: [key],
      messages: [error],
    }
  }

  return {
    path: [key, ...error.path],
    messages: error.messages,
  }
}
