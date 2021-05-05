import { Parser, ParserOrShorthand, ParserResult, resolveParserOrShorthand } from '../parser.js'
import type { ArrayParserShorthand } from './array.js'
import type { ObjectParserShorthand } from './object.js'

/**
 * @public
 */
export function nullable<T>(valueParser: Parser<T>): Parser<T | null>

/**
 * @public
 */
export function nullable<T>(valueParser: ArrayParserShorthand<T>): Parser<T[] | null>

/**
 * @public
 */
export function nullable<T>(valueParser: ObjectParserShorthand<T>): Parser<T | null>

/**
 * @public
 */
export function nullable<T>(valueParser: ParserOrShorthand<T>): Parser<T | null> {
  const resolvedParser = resolveParserOrShorthand(valueParser)

  return (value) => {
    if (value === null) {
      return (value as unknown) as ParserResult<T | null>
    }

    return resolvedParser(value) as ParserResult<T | null>
  }
}
