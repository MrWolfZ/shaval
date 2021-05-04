import { Errors, failure, isFailure } from '@shaval/core'
import type { Parser } from '../parser.js'

/**
 * @public
 */
export function array<T>(valueParser: Parser<T>): Parser<T[]> {
  valueParser

  return (value) => {
    if (!Array.isArray(value)) {
      return failure(value, 'value must be an array')
    }

    const errors: Errors[] = []

    for (const [i, item] of value.entries()) {
      const result = valueParser(item)

      if (isFailure(result)) {
        errors.push(...result.errors.map((err) => prependIndexToPath(err, i)))
      }
    }

    return errors.length > 0 ? failure(errors) : value.map((i) => i)
  }
}

function prependIndexToPath(error: Errors, index: number): Errors {
  return {
    ...error,
    path: [`${index}`, ...error.path],
  }
}
