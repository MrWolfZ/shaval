import { Errors, failure, isFailure, _ReadonlyObject } from '@shaval/core'
import { Parser, ParserOrShorthand, _resolveParserOrShorthand } from '../parser.js'

/**
 * @public
 */
export type ObjectParserShorthand<T extends _ReadonlyObject> = ObjectPropertyParsers<T>

/**
 * @public
 */
export type ObjectPropertyParsers<T extends _ReadonlyObject> = {
  readonly [prop in keyof T]: ParserOrShorthand<T[prop]>
}

/**
 * @public
 */
export function object<T extends _ReadonlyObject>(
  propertyParsers: Exclude<ObjectPropertyParsers<T>, readonly unknown[]>,
): Parser<T> {
  if (propertyParsers === null || propertyParsers === undefined) {
    throw new Error(`property parsers must not be null or undefined`)
  }

  const resolvedPropertyParsers: Record<string, Parser<unknown>> = {}

  for (const key of Object.keys(propertyParsers)) {
    const parser = propertyParsers[key as keyof T] as Parser<T[keyof T]>
    resolvedPropertyParsers[key] = _resolveParserOrShorthand(parser)
  }

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

    const errors: Errors[] = []
    const returnValue: Record<string, unknown> = {}

    for (const key of Object.keys(resolvedPropertyParsers)) {
      const propValue = value[key as keyof typeof value]
      const propertyParser = resolvedPropertyParsers[key]

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const result = propertyParser!(propValue)

      if (isFailure(result)) {
        errors.push(...result.errors.map((err) => prependKeyToPath(err, key)))
      } else if (errors.length === 0) {
        returnValue[key] = result
      }
    }

    return errors.length > 0 ? failure(errors) : (returnValue as T)
  }
}

function prependKeyToPath(error: Errors, key: string): Errors {
  return {
    ...error,
    path: [key, ...error.path],
  }
}
