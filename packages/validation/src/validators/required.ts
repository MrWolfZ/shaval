import { failure, Result } from '@shaval/core'

/**
 * A validator that requires the value to be non-`undefined` and non-`null`.
 *
 * @param value - the value to validate
 * @returns the value if validation is successful, otherwise an error
 *
 * @public
 */
export function required<T>(value: T): Result<T> {
  if (value !== undefined && value !== null) {
    return value
  }

  return failure(value, 'value must be defined and not null')
}
