// this file contains a end-to-end tests for the public API

import { isSuccess } from '@shaval/core'
import { array, boolean, object, optional, string } from '@shaval/parsing'
import { readonlyArray } from './src/parsers/array.js'

describe(`@shaval/core`, () => {
  interface Todo {
    readonly id: string
    readonly description: string
    readonly isDone?: boolean
    readonly remarks: readonly string[]
    readonly details: {
      readonly author: string
    }
  }

  const todo: Todo = {
    id: '1',
    description: 'groceries',
    remarks: ['too lazy'],
    details: {
      author: 'me',
    },
  }

  it('works', () => {
    const todoParser = object<Todo>({
      id: string,
      description: string,
      isDone: optional(boolean),
      remarks: [string],
      details: {
        author: string,
      },
    })

    const todoParserWithoutShorthands = object<Todo>({
      id: string,
      description: string,
      isDone: optional(boolean),
      remarks: readonlyArray(string),
      details: object({
        author: string,
      }),
    })

    expect(todoParser(todo)).toEqual(todo)
    expect(todoParserWithoutShorthands(todo)).toEqual(todo)

    expect(isSuccess(todoParser(undefined))).toBe(false)
    expect(isSuccess(todoParser({}))).toBe(false)
    expect(isSuccess(todoParser({ id: '1' }))).toBe(false)
    expect(isSuccess(todoParser({ ...todo, remarks: [1] }))).toBe(false)

    const remarks = todo.remarks
    expect(array(string)(remarks)).toEqual(remarks)
  })
})
