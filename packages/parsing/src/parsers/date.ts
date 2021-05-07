import { failure } from '@shaval/core'
import type { Parser } from '../parser.js'

/**
 * @public
 */
export const date: Parser<Date> = (value) => {
  if (value instanceof Date) {
    return value
  }

  return failure(value, 'value must be a date')
}
