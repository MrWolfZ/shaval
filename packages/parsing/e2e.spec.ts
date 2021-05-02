// this file contains a end-to-end tests for the public API

import type { Parser } from '@shaval/parsing'

describe(`@shaval/core`, () => {
  interface Todo {
    readonly id: string
    readonly description: string
    readonly isDone: boolean
  }

  it('works', () => {
    const parser: Parser<Todo> = (value) => value as Todo

    expect(parser).toBeDefined()
  })
})
