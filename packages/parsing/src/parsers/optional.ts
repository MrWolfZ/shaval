import { Parser, ParserOrShorthand, ParserResult, resolveParserOrShorthand } from '../parser.js'
import type { ArrayParserShorthand } from './array.js'
import type { ObjectParserShorthand } from './object.js'

/**
 * @public
 */
export function optional<T>(valueParser: Parser<T>): Parser<T | undefined>

/**
 * @public
 */
export function optional<T>(valueParser: ArrayParserShorthand<T>): Parser<T[] | undefined>

/**
 * @public
 */
export function optional<T>(valueParser: ObjectParserShorthand<T>): Parser<T | undefined>

/**
 * @public
 */
export function optional<T>(valueParser: ParserOrShorthand<T>): Parser<T | undefined> {
  const resolvedParser = resolveParserOrShorthand(valueParser)

  return (value) => {
    if (value === undefined) {
      return (value as unknown) as ParserResult<T | undefined>
    }

    return resolvedParser(value) as ParserResult<T | undefined>
  }
}
