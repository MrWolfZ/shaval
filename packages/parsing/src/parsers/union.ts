import type { Parser } from '../parser.js'

/**
 * @public
 */
export function union<T1, T2>(valueParser1: Parser<T1>, valueParser2: Parser<T2>): Parser<T1 | T2>

/**
 * @public
 */
export function union<T1, T2, T3>(
  valueParser1: Parser<T1>,
  valueParser2: Parser<T2>,
  valueParser3: Parser<T3>,
): Parser<T1 | T2 | T3>

export function union(...valueParsers: Parser<unknown>[]): Parser<unknown> {
  valueParsers

  return (value: unknown) => {
    // TODO
    return {
      success: true,
      parsedValue: value,
    }
  }
}
