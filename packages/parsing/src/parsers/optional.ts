import type { Result } from '@shaval/core'
import type { Parser } from '../parser.js'

/**
 * @public
 */
export function optional<T>(valueParser: Parser<T>): Parser<T | undefined> {
  return (value) => {
    if (value === undefined) {
      return value
    }

    return valueParser(value) as Result<T | undefined>
  }
}
