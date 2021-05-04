import { failure } from '@shaval/core'
import type { Validator } from '../validator.js'

/**
 * A validator that requires the value to be greater than a number. Considers `null`,
 * `undefined` and non-numeric values as valid. Combine this validator with the
 * `required` validator if `null` or `undefined` should be considered invalid.
 *
 * @param comparand - the comparand to compare the value to
 * @returns a function that validates a value
 *
 * @public
 */
export function greaterThan(comparand: number): Validator<number> {
  // tslint:disable-next-line:strict-type-predicates (guard for users without strict type checking)
  if (comparand === null || comparand === undefined) {
    throw new Error(
      `The greaterThan validator requires the comparand parameter to be a non-null non-undefined number, got ${comparand}!`,
    )
  }

  return (value) => {
    if (typeof value === 'number' && value > comparand) {
      return value
    }

    return failure(value, 'value must be greater than comparand', { comparand })
  }
}
