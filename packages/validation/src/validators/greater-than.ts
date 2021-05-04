import { error, Result } from '@shaval/core'

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
export function greaterThan(comparand: number) {
  // tslint:disable-next-line:strict-type-predicates (guard for users without strict type checking)
  if (comparand === null || comparand === undefined) {
    throw new Error(
      `The greaterThan validator requires the comparand parameter to be a non-null non-undefined number, got ${comparand}!`,
    )
  }

  // this function is generic to allow the compiler to properly infer the type
  // of the validator for both optional and non-optional values
  return <T extends number | null | undefined>(value: T): Result<T> => {
    if (value === null || value === undefined || typeof value !== 'number') {
      return value
    }

    if (value > comparand) {
      return value
    }

    return error(value, `value ${value} must be greater than ${comparand}, but is less than or equal to it`)
  }
}
