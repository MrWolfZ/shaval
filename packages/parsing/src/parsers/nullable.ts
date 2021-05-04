import type { Parser, ParserResult } from '../parser.js'

/**
 * @public
 */
export function nullable<T>(valueParser: Parser<T>): Parser<T | null> {
  return (value: unknown) => {
    if (value === null) {
      return (value as unknown) as ParserResult<T | null>
    }

    return valueParser(value) as ParserResult<T | null>
  }
}
