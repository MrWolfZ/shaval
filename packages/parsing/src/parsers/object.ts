import { error, isShavalError, PropertyErrors, _ReadonlyObject } from '@shaval/core'
import type { Parser } from '../parser.js'

/**
 * @public
 */
export type ObjectPropertyParsers<T extends _ReadonlyObject> = {
  readonly [prop in keyof T]: Parser<T[prop]>
}

/**
 * @public
 */
export function object<T extends _ReadonlyObject>(propertyParsers: ObjectPropertyParsers<T>): Parser<T> {
  if (propertyParsers === null || propertyParsers === undefined) {
    throw new Error(`property parsers must not be null or undefined`)
  }

  for (const key of Object.keys(propertyParsers)) {
    const parser = propertyParsers[key as keyof T]

    if (parser === null || parser === undefined) {
      throw new Error(`parsers must not be null or undefined`)
    }
  }

  return (value) => {
    if (typeof value !== 'object') {
      return error(value, 'value must be an object')
    }

    if (value === null) {
      return error(value, 'value must be a non-null object')
    }

    if (Array.isArray(value)) {
      return error(value, 'value must be an object and not an array')
    }

    const errors: (string | PropertyErrors)[] = []

    for (const key of Object.keys(propertyParsers)) {
      const propValue = value[key as keyof typeof value]
      const propertyParser = propertyParsers[key as keyof T]

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const result = propertyParser!(propValue)

      if (isShavalError(result)) {
        errors.push(...result.errors.map((err) => prependKeyToPath(err, key)))
      }
    }

    return errors.length > 0 ? error(value, ...errors) : (value as T)
  }
}

function prependKeyToPath(error: string | PropertyErrors, key: string): PropertyErrors {
  if (typeof error === 'string') {
    return {
      path: [key],
      messages: [error],
    }
  }

  return {
    path: [key, ...error.path],
    messages: error.messages,
  }
}
