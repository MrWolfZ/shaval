import { Errors, failure, isFailure } from '@shaval/core'
import { _and } from '../combinators/and.js'
import type { Validator } from '../validator.js'

/**
 * @public
 */
export function arrayValidator<T>(
  itemValidator: Validator<T>,
  ...itemValidators: readonly Validator<T>[]
): Validator<readonly T[]> {
  const combinedValidator = _and(itemValidator, ...itemValidators)

  return (array) => {
    const errors: Errors[] = []

    for (const [i, item] of array.entries()) {
      const result = combinedValidator(item)

      if (isFailure(result)) {
        errors.push(...result.errors.map((err) => prependIndexToPath(err, i)))
      }
    }

    return errors.length > 0 ? failure(errors) : array
  }
}

function prependIndexToPath(error: Errors, index: number): Errors {
  return {
    ...error,
    path: [`${index}`, ...error.path],
  }
}
