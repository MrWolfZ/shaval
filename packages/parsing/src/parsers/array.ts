import type { Parser } from '../parser.js'

/**
 * @public
 */
export function array<T>(valueParser: Parser<T>): Parser<T[]> {
  valueParser

  return (value: unknown) => {
    // TODO
    return value as T[]
  }
}
