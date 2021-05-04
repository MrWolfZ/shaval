import { error, isFailure, PropertyErrors } from '@shaval/core'
import type { Validator } from '../validator.js'
import { combine } from './combine.js'

/**
 * @public
 */
export function validateArray<T>(...itemValidators: readonly Validator<T>[]): Validator<readonly T[]> {
  const combinedValidator = combine(...itemValidators)

  return (array) => {
    const errors: (string | PropertyErrors)[] = []

    for (const [i, item] of array.entries()) {
      const result = combinedValidator(item)

      if (isFailure(result)) {
        errors.push(...result.errors.map((err) => prependIndexToPath(err, i)))
      }
    }

    return errors.length > 0 ? error(array, ...errors) : array
  }
}

function prependIndexToPath(error: string | PropertyErrors, index: number): PropertyErrors {
  if (typeof error === 'string') {
    return {
      path: [index.toString()],
      messages: [error],
    }
  }

  return {
    path: [index.toString(), ...error.path],
    messages: error.messages,
  }
}
