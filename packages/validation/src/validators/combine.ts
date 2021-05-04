import { error, isFailure, PropertyErrors } from '@shaval/core'
import type { Validator } from '../validator.js'

/**
 * @public
 */
export function combine<T>(...validators: Validator<T>[]): Validator<T> {
  if (validators.some((v) => v === null || v === undefined)) {
    throw new Error(`validators must not be null or undefined`)
  }

  return (value) => {
    const errors: (string | PropertyErrors)[] = []

    for (const validator of validators) {
      const result = validator(value)

      if (isFailure(result)) {
        errors.push(...result.errors)
      }
    }

    return errors.length > 0 ? error(value, ...errors) : value
  }
}
