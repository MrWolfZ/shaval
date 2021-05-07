import { Errors, failure, isFailure } from '@shaval/core'
import { Parser, ParserOrShorthand, _resolveParserOrShorthand } from '../parser.js'
import type { ArrayParserShorthand } from './array.js'

// all the overloads below are required to support array shorthands properly
// since we cannot properly type the return value otherwise

/**
 * @public
 */
export type _TupleRestParsers<T> = { [K in keyof T]: ParserOrShorthand<T[K]> }

// the code below works only with TypeScript 4.1+, and we want to support at least
// TypeScript 3.8+, so we cannot use this for now and instead we have to manually
// list the overloads

// export function tuple<T1, T2, T3, T4, TRest extends readonly unknown[]>(
//   parser1: Parser<T1>,
//   parser2: Parser<T2>,
//   parser3: Parser<T3>,
//   parser4: Parser<T4>,
//   ...otherParsers: _TupleRestParsers<TRest>
// ): Parser<[T1, T2, T3, T4, ...TRest]>

/**
 * Note that beyond the third parser shorthands do not work and
 * parsers need to be declared explicitly.
 *
 * @public
 */
export function tuple<T1, T2, T3, T4, T5, T6, T7>(
  parser1: Parser<T1>,
  parser2: Parser<T2>,
  parser3: Parser<T3>,
  parser4: Parser<T4>,
  parser5: Parser<T5>,
  parser6: Parser<T6>,
  parser7: Parser<T7>,
): Parser<[T1, T2, T3, T4, T5, T6, T7]>

/**
 * Note that beyond the third parser shorthands do not work and
 * parsers need to be declared explicitly.
 *
 * @public
 */
export function tuple<T1, T2, T3, T4, T5, T6>(
  parser1: Parser<T1>,
  parser2: Parser<T2>,
  parser3: Parser<T3>,
  parser4: Parser<T4>,
  parser5: Parser<T5>,
  parser6: Parser<T6>,
): Parser<[T1, T2, T3, T4, T5, T6]>

/**
 * Note that beyond the third parser shorthands do not work and
 * parsers need to be declared explicitly.
 *
 * @public
 */
export function tuple<T1, T2, T3, T4, T5>(
  parser1: Parser<T1>,
  parser2: Parser<T2>,
  parser3: Parser<T3>,
  parser4: Parser<T4>,
  parser5: Parser<T5>,
): Parser<[T1, T2, T3, T4, T5]>

/**
 * Note that beyond the third parser shorthands do not work and
 * parsers need to be declared explicitly.
 *
 * @public
 */
export function tuple<T1, T2, T3, T4>(
  parser1: Parser<T1>,
  parser2: Parser<T2>,
  parser3: Parser<T3>,
  parser4: Parser<T4>,
): Parser<[T1, T2, T3, T4]>

/**
 * @public
 */
export function tuple<T1, T2, T3>(
  parser1: ArrayParserShorthand<T1>,
  parser2: ArrayParserShorthand<T2>,
  parser3: ArrayParserShorthand<T3>,
): Parser<[T1[], T2[], T3[]]>

/**
 * @public
 */
export function tuple<T1, T2, T3>(
  parser1: ArrayParserShorthand<T1>,
  parser2: ArrayParserShorthand<T2>,
  parser3: ParserOrShorthand<T3>,
): Parser<[T1[], T2[], T3]>

/**
 * @public
 */
export function tuple<T1, T2, T3>(
  parser1: ArrayParserShorthand<T1>,
  parser2: ParserOrShorthand<T2>,
  parser3: ArrayParserShorthand<T3>,
): Parser<[T1[], T2, T3[]]>

/**
 * @public
 */
export function tuple<T1, T2, T3>(
  parser1: ParserOrShorthand<T1>,
  parser2: ArrayParserShorthand<T2>,
  parser3: ArrayParserShorthand<T3>,
): Parser<[T1, T2[], T3[]]>

/**
 * @public
 */
export function tuple<T1, T2, T3>(
  parser1: ArrayParserShorthand<T1>,
  parser2: ParserOrShorthand<T2>,
  parser3: ParserOrShorthand<T3>,
): Parser<[T1[], T2, T3]>

/**
 * @public
 */
export function tuple<T1, T2, T3>(
  parser1: ParserOrShorthand<T1>,
  parser2: ArrayParserShorthand<T2>,
  parser3: ParserOrShorthand<T3>,
): Parser<[T1, T2[], T3]>

/**
 * @public
 */
export function tuple<T1, T2, T3>(
  parser1: ParserOrShorthand<T1>,
  parser2: ParserOrShorthand<T2>,
  parser3: ArrayParserShorthand<T3>,
): Parser<[T1, T2, T3[]]>

/**
 * @public
 */
export function tuple<T1, T2, T3>(
  parser1: ParserOrShorthand<T1>,
  parser2: ParserOrShorthand<T2>,
  parser3: ParserOrShorthand<T3>,
): Parser<[T1, T2, T3]>

/**
 * @public
 */
export function tuple<T1, T2>(
  parser1: ArrayParserShorthand<T1>,
  parser2: ArrayParserShorthand<T2>,
): Parser<[T1[], T2[]]>

/**
 * @public
 */
export function tuple<T1, T2>(parser1: ArrayParserShorthand<T1>, parser2: ParserOrShorthand<T2>): Parser<[T1[], T2]>

/**
 * @public
 */
export function tuple<T1, T2>(parser1: ParserOrShorthand<T1>, parser2: ArrayParserShorthand<T2>): Parser<[T1, T2[]]>

/**
 * @public
 */
export function tuple<T1, T2>(parser1: ParserOrShorthand<T1>, parser2: ParserOrShorthand<T2>): Parser<[T1, T2]>

/**
 * @public
 */
export function tuple<T>(parser: ArrayParserShorthand<T>): Parser<[T[]]>

/**
 * @public
 */
export function tuple<T>(parser: ParserOrShorthand<T>): Parser<[T]>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function tuple(...restParsers: ParserOrShorthand<unknown>[]): Parser<any> {
  const resolvedParsers = restParsers.map(_resolveParserOrShorthand)

  return (value) => {
    if (!Array.isArray(value)) {
      return failure(value, 'value must be a tuple')
    }

    const resultTuple: unknown[] = []
    const errors: Errors[] = []

    const actualLength = value.length
    const expectedLength = resolvedParsers.length
    if (actualLength !== expectedLength) {
      errors.push(...failure(value, 'tuple is of wrong length', { expectedLength, actualLength }).errors)
    }

    for (const [i, item] of value.entries()) {
      const parser = resolvedParsers[i]

      if (!parser) {
        continue
      }

      const result = parser(item)

      if (isFailure(result)) {
        errors.push(...result.errors.map((err) => prependIndexToPath(err, i)))
      } else {
        resultTuple.push(result)
      }
    }

    return errors.length > 0 ? failure(errors) : resultTuple
  }
}

function prependIndexToPath(error: Errors, index: number): Errors {
  return {
    ...error,
    path: [`${index}`, ...error.path],
  }
}
