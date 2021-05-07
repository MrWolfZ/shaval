import type { _ReadonlyObject } from '@shaval/core'
import { Parser, ParserOrShorthand, _resolveParserOrShorthand } from '../parser.js'

/**
 * @public
 */
export function recursive<T extends _ReadonlyObject>(
  parserFactory: (selfParser: Parser<T>) => ParserOrShorthand<T>,
): Parser<T> {
  return (value) => {
    const selfValidator = recursive(parserFactory)
    const resolvedValidator = _resolveParserOrShorthand(parserFactory(selfValidator))
    return resolvedValidator(value)
  }
}
