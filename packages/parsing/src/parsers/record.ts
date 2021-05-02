import { Errors, failure, isFailure } from '@shaval/core'
import { Parser, ParserOrShorthand, _resolveParserOrShorthand } from '../parser.js'
import type { ArrayParserShorthand } from './array.js'
import type { ObjectParserShorthand } from './object.js'
import { string } from './string.js'

/**
 * @public
 */
export type RecordParser<TKey extends string | symbol, TValue> = Parser<Record<TKey, TValue>>

/**
 * @public
 */
export function record<TValue>(valueParser: Parser<TValue>): RecordParser<string, TValue>

/**
 * @public
 */
export function record<TKey extends string | symbol, TValue>(
  keyParser: Parser<TKey>,
  valueParser: Parser<TValue>,
): RecordParser<TKey, TValue>

/**
 * @public
 */
export function record<TValue>(valueParser: ArrayParserShorthand<TValue>): RecordParser<string, TValue[]>

/**
 * @public
 */
export function record<TKey extends string | symbol, TValue>(
  keyParser: Parser<TKey>,
  valueParser: ArrayParserShorthand<TValue>,
): RecordParser<TKey, TValue[]>

/**
 * @public
 */
export function record<TValue>(valueParser: ObjectParserShorthand<TValue>): RecordParser<string, TValue>

/**
 * @public
 */
export function record<TKey extends string | symbol, TValue>(
  keyParser: Parser<TKey>,
  valueParser: ObjectParserShorthand<TValue>,
): RecordParser<TKey, TValue>

/**
 * @public
 */
export function record<TKey extends string | symbol, TValue>(
  keyOrValueParser: Parser<TKey> | ParserOrShorthand<TValue>,
  valueParser?: ParserOrShorthand<TValue>,
): RecordParser<TKey, TValue> {
  let keyParser = (string as unknown) as Parser<TKey>

  if (keyOrValueParser === null || keyOrValueParser === undefined) {
    throw new Error(`key and value parser must not be null or undefined`)
  }

  if (valueParser === undefined) {
    valueParser = keyOrValueParser as ParserOrShorthand<TValue>
  } else {
    keyParser = keyOrValueParser as Parser<TKey>
  }

  const resolvedValueParser = _resolveParserOrShorthand(valueParser)

  return (value) => {
    if (typeof value !== 'object') {
      return failure(value, 'value must be an object')
    }

    if (value === null) {
      return failure(value, 'value must be a non-null object')
    }

    if (Array.isArray(value)) {
      return failure(value, 'value must be an object and not an array')
    }

    if (value.constructor !== Object) {
      return failure(value, 'value must be a plain object')
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const returnValue: Record<any, TValue> = {}
    const errors: Errors[] = []

    for (const key of [...Object.keys(value), ...Object.getOwnPropertySymbols(value)]) {
      const parsedKey = keyParser(key)

      if (isFailure(parsedKey)) {
        errors.push(...parsedKey.errors.map((err) => prependKeyToPath(err, key?.toString())))
        continue
      }

      const propValue = value[parsedKey as keyof typeof value]
      const result = resolvedValueParser(propValue)

      if (isFailure(result)) {
        errors.push(...result.errors.map((err) => prependKeyToPath(err, parsedKey.toString())))
      } else if (errors.length === 0) {
        returnValue[parsedKey] = result
      }
    }

    return errors.length > 0 ? failure(errors) : (returnValue as Record<TKey, TValue>)
  }
}

function prependKeyToPath(error: Errors, key: string): Errors {
  return {
    ...error,
    path: [key, ...error.path],
  }
}
