import type { Parser, ParserResult } from '../parser.js'

/**
 * @public
 */
export function optional<T>(valueParser: Parser<T>): Parser<T | undefined> {
  return (value) => {
    if (value === undefined) {
      return (value as unknown) as ParserResult<T | undefined>
    }

    return valueParser(value) as ParserResult<T | undefined>
  }
}
