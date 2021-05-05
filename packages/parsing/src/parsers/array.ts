import { Errors, failure, isFailure } from '@shaval/core'
import { Parser, ParserOrShorthand, resolveParserOrShorthand } from '../parser.js'
import type { ObjectParserShorthand } from './object.js'

/**
 * @public
 */
export type ArrayParserShorthand<T> = [ParserOrShorthand<T>]

/**
 * @public
 */
export function array<T>(itemParser: Parser<T>): Parser<T[]>

/**
 * @public
 */
export function array<T>(itemParser: ArrayParserShorthand<T>): Parser<T[][]>

/**
 * @public
 */
export function array<T>(itemParser: ObjectParserShorthand<T>): Parser<T[]>

/**
 * @public
 */
export function array<T>(itemParser: ParserOrShorthand<T>): Parser<T[]> {
  const resolvedItemParser = resolveParserOrShorthand(itemParser)

  return (value) => {
    if (!Array.isArray(value)) {
      return failure(value, 'value must be an array')
    }

    const errors: Errors[] = []
    const returnValue: T[] = []

    for (const [i, item] of value.entries()) {
      const result = resolvedItemParser(item)

      if (isFailure(result)) {
        errors.push(...result.errors.map((err) => prependIndexToPath(err, i)))
      } else if (errors.length === 0) {
        returnValue.push(result)
      }
    }

    return errors.length > 0 ? failure(errors) : returnValue
  }
}

/**
 * @public
 */
export function readonlyArray<T>(itemParser: Parser<T>): Parser<readonly T[]>

/**
 * @public
 */
export function readonlyArray<T>(itemParser: ArrayParserShorthand<T>): Parser<readonly T[][]>

/**
 * @public
 */
export function readonlyArray<T>(itemParser: ObjectParserShorthand<T>): Parser<readonly T[]>

/**
 * @public
 */
export function readonlyArray<T>(itemParser: ParserOrShorthand<T>): Parser<readonly T[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return array(itemParser as any) as any
}

function prependIndexToPath(error: Errors, index: number): Errors {
  return {
    ...error,
    path: [`${index}`, ...error.path],
  }
}
