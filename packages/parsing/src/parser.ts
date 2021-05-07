import type { Failure } from '@shaval/core'
import { array, ArrayParserShorthand } from './parsers/array.js'
import { object, ObjectParserShorthand } from './parsers/object.js'

/**
 * The parser result type is covariant in its type parameter,
 * which means it allows invalid assignments like assigning
 * `Parser<string>` to `Parser<string | number>`. For proper
 * type inference we need to prevent such assignments, so we
 * use this helper interface to force the type system to handle
 * these kinds of unions properly by ensuring the type parameter
 * is not covariant
 *
 * @public
 */
export interface _ResultTypeMarker<T> {
  /**
   * This property never exists at runtime.
   */
  readonly _?: unknown extends T ? unknown : never
}

/**
 * @public
 */
export type ParserResult<T> = T | (Failure & _ResultTypeMarker<T>)

/**
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ParserResultType<TParser extends Parser<any>> = TParser extends Parser<infer U> ? U : never

/**
 * @public
 */
export type Parser<T> = (value: unknown) => ParserResult<T>

/**
 * @public
 */
export type ParserOrShorthand<T> = Parser<T> | ArrayParserShorthand<T> | ObjectParserShorthand<T>

/**
 * Private version to ensure it can be properly minified for production builds.
 *
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function _resolveParserOrShorthand<T>(parserOrShorthand: ParserOrShorthand<T>): Parser<any> {
  if (parserOrShorthand === null || parserOrShorthand === undefined) {
    throw new Error(`parsers or shorthands must not be null or undefined`)
  }

  if (Array.isArray(parserOrShorthand)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return array(parserOrShorthand[0] as any)
  }

  if (typeof parserOrShorthand === 'object') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return object(parserOrShorthand as any)
  }

  return parserOrShorthand
}

/**
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parser<T>(parserOrShorthand: ParserOrShorthand<T>): Parser<any> {
  return _resolveParserOrShorthand(parserOrShorthand)
}
