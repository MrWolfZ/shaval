import type { Parser } from '@shaval/parsing'

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

const parser: Parser<Todo> = (value) => value as Todo

console.log(parser(todo))
