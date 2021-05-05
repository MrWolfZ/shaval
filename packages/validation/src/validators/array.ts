import type { Errors } from '@shaval/core'
import { _and } from '../combinators/and.js'
import { _failure, _isFailure } from '../result.js'
import type { Validator, ValidatorOrShorthand } from '../validator.js'

/**
 * @public
 */
export function arrayValidator<T>(
  itemValidator: ValidatorOrShorthand<T>,
  ...itemValidators: readonly ValidatorOrShorthand<T>[]
): Validator<readonly T[]> {
  const combinedValidator = _and(itemValidator, ...itemValidators)

  return (array) => {
    if (_isFailure(array)) {
      return array
    }

    const errors: Errors[] = []

    for (const [i, item] of array.entries()) {
      const result = combinedValidator(item)

      if (_isFailure(result)) {
        errors.push(...result.errors.map((err) => prependIndexToPath(err, i)))
      }
    }

    return errors.length > 0 ? _failure(errors) : array
  }
}

function prependIndexToPath(error: Errors, index: number): Errors {
  return {
    ...error,
    path: [`${index}`, ...error.path],
  }
}
