import type { Result } from '@shaval/core'
import { _failure, _isFailure } from '../result.js'

/**
 * A validator that requires the value to be non-`undefined` and non-`null`.
 *
 * @param value - the value to validate
 * @returns the value if validation is successful, otherwise an error
 *
 * @public
 */
export function required<T>(value: T): Result<T> {
  if ((value !== undefined && value !== null) || _isFailure(value)) {
    return value
  }

  return _failure(value, 'value must be defined and not null')
}
