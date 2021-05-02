import type { ShavalResult } from '@shaval/core'
import type { Parser } from '../parser.js'

/**
 * @public
 */
export function nullable<T>(valueParser: Parser<T>): Parser<T | null> {
  return (value: unknown) => {
    if (value === null) {
      return value
    }

    return valueParser(value) as ShavalResult<T | null>
  }
}
