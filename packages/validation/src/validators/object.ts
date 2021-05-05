import type { Errors, _ReadonlyObject } from '@shaval/core'
import { _failure, _isFailure } from '../result.js'
import { Validator, ValidatorOrShorthand, _resolveValidatorOrShorthand } from '../validator.js'

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
  ? never
  : undefined extends T
  ? never
  : T extends readonly unknown[]
  ? never
  : {
      readonly [prop in keyof T]?: ValidatorOrShorthand<_ArrayAsReadonly<T[prop]>>
    }

/**
 * @public
 */
export function objectValidator<T>(propertyValidators: ObjectPropertyValidators<T>): Validator<T> {
  if (propertyValidators === null || propertyValidators === undefined) {
    throw new Error(`property validators must not be null or undefined`)
  }

  const resolvedPropertyValidators: Record<string, Validator<unknown>> = {}

  for (const key of Object.keys(propertyValidators)) {
    const validator = propertyValidators[key as keyof T]

    if (validator === undefined && key in propertyValidators) {
      throw new Error(`validators must not be undefined`)
    }

    resolvedPropertyValidators[key] = _resolveValidatorOrShorthand(validator as Validator<unknown>)
  }

  return (value) => {
    if (_isFailure(value)) {
      return value
    }

    const errors: Errors[] = []

    for (const key of Object.keys(resolvedPropertyValidators)) {
      const propValue = value[key as keyof T]
      const validator = resolvedPropertyValidators[key]

      if (!validator) {
        continue
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const propValidator = _resolveValidatorOrShorthand(validator!)
      const result = propValidator(propValue)

      if (_isFailure(result)) {
        errors.push(...result.errors.map((err) => prependKeyToPath(err, key)))
      }
    }

    return errors.length > 0 ? _failure(errors) : value
  }
}

function prependKeyToPath(error: Errors, key: string): Errors {
  return {
    ...error,
    path: [key, ...error.path],
  }
}
