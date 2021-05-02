// this file contains a end-to-end tests for the public API

import type { ShavalResult } from '@shaval/core'

describe(`@shaval/core`, () => {
  interface Todo {
    readonly id: string
    readonly description: string
    readonly isDone: boolean
  }

  const todo: Todo = {
    id: 'todo1',
    description: 'groceries',
    isDone: false,
  }

  it('works', () => {
    const result: ShavalResult<Todo> = todo

    expect(result).toBeDefined()
  })
})
