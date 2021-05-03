import { error, isShavalError, PropertyErrors } from '@shaval/core'
import type { Parser } from '../parser.js'

/**
 * @public
 */
export type UnionParsers<T> = { [K in keyof T]: Parser<T[K]> }

/**
 * @public
 */
export function union<T1, T2, T extends readonly unknown[]>(
  parser1: Parser<T1>,
  parser2: Parser<T2>,
  ...restParsers: UnionParsers<T>
): Parser<T1 | T2 | T[number]> {
  const allParsers = [parser1, parser2, ...restParsers]

  return (value) => {
    const errors: (string | PropertyErrors)[] = []

    for (const parser of allParsers) {
      const result = parser(value)

      if (isShavalError(result)) {
        errors.push(...result.errors)
      } else {
        return value
      }
    }

    return errors.length > 0 ? error(value, ...errors) : value
  }
}
