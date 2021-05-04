import { Errors, failure, isFailure } from '@shaval/core'
import type { Parser, ParserResult } from '../parser.js'

/**
 * @public
 */
export type UnionParsers<T> = { [K in keyof T]: Parser<T[K]> }

/**
 * @public
 */
export function union<T1, T2, TRest extends readonly unknown[]>(
  parser1: Parser<T1>,
  parser2: Parser<T2>,
  ...restParsers: UnionParsers<TRest>
): Parser<T1 | T2 | TRest[number]> {
  const allParsers = [parser1, parser2, ...restParsers]

  return (value): ParserResult<T1 | T2 | TRest[number]> => {
    const errors: Errors[] = []

    for (const parser of allParsers) {
      const result = parser(value)

      if (isFailure(result)) {
        errors.push(...result.errors)
      } else {
        return value as ParserResult<T1 | T2 | TRest[number]>
      }
    }

    return failure(errors)
  }
}
