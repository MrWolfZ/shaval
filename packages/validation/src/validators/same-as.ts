import { _failure, _isFailure } from '../result.js'
import type { Validator } from '../validator.js'

/**
 * A validation function that requires the value to be the same value as
 * another value (i.e. it must be strictly equal (`true` with `===`)).
 *
 * @param comparand - the comparand to compare the value to
 * @returns a function that validates a value
 *
 * @public
 */
export function sameAs<T>(comparand: T): Validator<T> {
  return (value) => {
    if (value === comparand || _isFailure(value)) {
      return value
    }

    return _failure(value, 'value must be the same as comparand', { comparand })
  }
}
