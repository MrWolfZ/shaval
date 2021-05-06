import { Errors, failure, isFailure } from '@shaval/core'
import { Parser, ParserOrShorthand, _resolveParserOrShorthand } from '../parser.js'
import type { ArrayParserShorthand } from './array.js'

// all the overloads below are required to support array shorthands properly
// since we cannot properly type the return value otherwise

/**
 * @public
 */
export type _UnionRestParsers<T> = { [K in keyof T]: ParserOrShorthand<T[K]> }

/**
 * Note that beyond the third parser shorthands do not work and
 * parsers need to be declared explicitly.
 *
 * @public
 */
export function union<T1, T2, T3, TRest extends readonly unknown[]>(
  parser1: ArrayParserShorthand<T1>,
  parser2: ArrayParserShorthand<T2>,
  parser3: ArrayParserShorthand<T3>,
  ...otherParsers: _UnionRestParsers<TRest>
): Parser<T1[] | T2[] | T3[] | TRest[number]>

/**
 * Note that beyond the third parser shorthands do not work and
 * parsers need to be declared explicitly.
 *
 * @public
 */
export function union<T1, T2, T3, TRest extends readonly unknown[]>(
  parser1: ArrayParserShorthand<T1>,
  parser2: ArrayParserShorthand<T2>,
  parser3: ParserOrShorthand<T3>,
  ...otherParsers: _UnionRestParsers<TRest>
): Parser<T1[] | T2[] | T3 | TRest[number]>

/**
 * Note that beyond the third parser shorthands do not work and
 * parsers need to be declared explicitly.
 *
 * @public
 */
export function union<T1, T2, T3, TRest extends readonly unknown[]>(
  parser1: ArrayParserShorthand<T1>,
  parser2: ParserOrShorthand<T2>,
  parser3: ArrayParserShorthand<T3>,
  ...otherParsers: _UnionRestParsers<TRest>
): Parser<T1[] | T2 | T3[] | TRest[number]>

/**
 * Note that beyond the third parser shorthands do not work and
 * parsers need to be declared explicitly.
 *
 * @public
 */
export function union<T1, T2, T3, TRest extends readonly unknown[]>(
  parser1: ParserOrShorthand<T1>,
  parser2: ArrayParserShorthand<T2>,
  parser3: ArrayParserShorthand<T3>,
  ...otherParsers: _UnionRestParsers<TRest>
): Parser<T1 | T2[] | T3[] | TRest[number]>

/**
 * Note that beyond the third parser shorthands do not work and
 * parsers need to be declared explicitly.
 *
 * @public
 */
export function union<T1, T2, T3, TRest extends readonly unknown[]>(
  parser1: ArrayParserShorthand<T1>,
  parser2: ParserOrShorthand<T2>,
  parser3: ParserOrShorthand<T3>,
  ...otherParsers: _UnionRestParsers<TRest>
): Parser<T1[] | T2 | T3 | TRest[number]>

/**
 * Note that beyond the third parser shorthands do not work and
 * parsers need to be declared explicitly.
 *
 * @public
 */
export function union<T1, T2, T3, TRest extends readonly unknown[]>(
  parser1: ParserOrShorthand<T1>,
  parser2: ArrayParserShorthand<T2>,
  parser3: ParserOrShorthand<T3>,
  ...otherParsers: _UnionRestParsers<TRest>
): Parser<T1 | T2[] | T3 | TRest[number]>

/**
 * Note that beyond the third parser shorthands do not work and
 * parsers need to be declared explicitly.
 *
 * @public
 */
export function union<T1, T2, T3, TRest extends readonly unknown[]>(
  parser1: ParserOrShorthand<T1>,
  parser2: ParserOrShorthand<T2>,
  parser3: ArrayParserShorthand<T3>,
  ...otherParsers: _UnionRestParsers<TRest>
): Parser<T1 | T2 | T3[] | TRest[number]>

/**
 * Note that beyond the third parser shorthands do not work and
 * parsers need to be declared explicitly.
 *
 * @public
 */
export function union<T1, T2, T3, TRest extends readonly unknown[]>(
  parser1: ParserOrShorthand<T1>,
  parser2: ParserOrShorthand<T2>,
  parser3: ParserOrShorthand<T3>,
  ...otherParsers: _UnionRestParsers<TRest>
): Parser<T1 | T2 | T3 | TRest[number]>

/**
 * @public
 */
export function union<T1, T2, TRest extends readonly unknown[]>(
  parser1: ArrayParserShorthand<T1>,
  parser2: ArrayParserShorthand<T2>,
  ...otherParsers: _UnionRestParsers<TRest>
): Parser<T1[] | T2[] | TRest[number]>

/**
 * @public
 */
export function union<T1, T2, TRest extends readonly unknown[]>(
  parser1: ArrayParserShorthand<T1>,
  parser2: ParserOrShorthand<T2>,
  ...otherParsers: _UnionRestParsers<TRest>
): Parser<T1[] | T2 | TRest[number]>

/**
 * @public
 */
export function union<T1, T2, TRest extends readonly unknown[]>(
  parser1: ParserOrShorthand<T1>,
  parser2: ArrayParserShorthand<T2>,
  ...otherParsers: _UnionRestParsers<TRest>
): Parser<T1 | T2[] | TRest[number]>

/**
 * @public
 */
export function union<T1, T2, TRest extends readonly unknown[]>(
  parser1: ParserOrShorthand<T1>,
  parser2: ParserOrShorthand<T2>,
  ...otherParsers: _UnionRestParsers<TRest>
): Parser<T1 | T2 | TRest[number]>

/**
 * @public
 */
export function union<T>(
  parser1: ParserOrShorthand<T>,
  parser2: ParserOrShorthand<T>,
  ...otherParsers: ParserOrShorthand<T>[]
): Parser<T>

/**
 * @public
 */
export function union(...restParsers: ParserOrShorthand<unknown>[]): Parser<unknown> {
  const resolvedParsers = restParsers.map(_resolveParserOrShorthand)

  return (value) => {
    const errors: Errors[] = []

    for (const parser of resolvedParsers) {
      const result = parser(value)

      if (isFailure(result)) {
        errors.push(...result.errors)
      } else {
        return value
      }
    }

    return failure(errors)
  }
}
