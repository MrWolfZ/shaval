// this file contains a end-to-end tests for the public API

import { isSuccess } from '@shaval/core'
import {
  array,
  boolean,
  number,
  object,
  optional,
  parser,
  readonlyArray,
  record,
  string,
  tuple,
  union,
} from '@shaval/parsing'

describe(`@shaval/core`, () => {
  interface Todo {
    readonly id: string
    readonly description: string
    readonly isDone?: boolean
    readonly remarks: readonly string[]
    readonly details: {
      readonly author: string
    }
    readonly metadata: Readonly<Record<string, string>>
    readonly numberOrString: string | number
    readonly numberStringTuple: [string, number]
  }

  const todo: Todo = {
    id: '1',
    description: 'groceries',
    remarks: ['too lazy'],
    details: {
      author: 'me',
    },
    metadata: {
      a: 'b',
    },
    numberOrString: 'a',
    numberStringTuple: ['a', 1],
  }

  it('works', () => {
    const todoParser = parser<Todo>({
      id: string,
      description: string,
      isDone: optional(boolean),
      remarks: [string],
      details: {
        author: string,
      },
      metadata: record(string, string),
      numberOrString: union(string, number),
      numberStringTuple: tuple(string, number),
    })

    const todoParserWithoutShorthands = parser<Todo>({
      id: string,
      description: string,
      isDone: optional(boolean),
      remarks: readonlyArray(string),
      details: object({
        author: string,
      }),
      metadata: record(string, string),
      numberOrString: union(string, number),
      numberStringTuple: tuple(string, number),
    })

    expect(todoParser(todo)).toEqual(todo)
    expect(todoParserWithoutShorthands(todo)).toEqual(todo)

    expect(isSuccess(todoParser(undefined))).toBe(false)
    expect(isSuccess(todoParser({}))).toBe(false)
    expect(isSuccess(todoParser({ id: '1' }))).toBe(false)
    expect(isSuccess(todoParser({ ...todo, remarks: [1] }))).toBe(false)
    expect(isSuccess(todoParser({ ...todo, details: {} }))).toBe(false)
    expect(isSuccess(todoParser({ ...todo, metadata: [1] }))).toBe(false)

    const remarks = todo.remarks
    expect(array(string)(remarks)).toEqual(remarks)
  })
})
