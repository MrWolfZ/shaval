import { error, isFailure, PropertyErrors } from '@shaval/core'
import type { Parser } from '../parser.js'

/**
 * @public
 */
export function array<T>(valueParser: Parser<T>): Parser<T[]> {
  valueParser

  return (value) => {
    if (!Array.isArray(value)) {
      return error(value, 'value must be an array')
    }

    const errors: (string | PropertyErrors)[] = []

    for (const [i, item] of value.entries()) {
      const result = valueParser(item)

      if (isFailure(result)) {
        errors.push(...result.errors.map((err) => prependIndexToPath(err, i)))
      }
    }

    return errors.length > 0 ? error(value, ...errors) : value.map((i) => i)
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
