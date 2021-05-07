import { failure, isFailure, isSuccess } from '@shaval/core'
import type { Parser } from '../parser.js'
import { recursive } from './recursive.js'

describe(recursive.name, () => {
  const stringParser: Parser<string> = (value) => (value === 'a' || value === 'b' ? value : failure(value, 'string'))

  interface RecursiveObject {
    s: string
    recArr: RecursiveObject[]
  }

  const parser = recursive<RecursiveObject>((self) => ({
    s: stringParser,
    recArr: [self],
  }))

  it('succeeds for object of correct shape', () => {
    const value: RecursiveObject = { s: 'a', recArr: [{ s: 'b', recArr: [] }] }
    expect(parser(value)).toEqual(value)
  })

  it('fails for object with missing property', () => {
    const value: Partial<RecursiveObject> = { s: 'a' }
    expect(isSuccess(parser(value))).toBe(false)
  })

  it('fails for nested object with missing property', () => {
    const value: RecursiveObject = { s: 'a', recArr: [{ s: 'b' } as RecursiveObject] }
    expect(isSuccess(parser(value))).toBe(false)
  })

  it('fails for object with multiple missing properties', () => {
    const value: Partial<RecursiveObject> = {}
    expect(isSuccess(parser(value))).toBe(false)
  })

  it('fails for object with invalid property', () => {
    const value: RecursiveObject = { s: 'c', recArr: [{ s: 'b', recArr: [] }] }
    expect(isSuccess(parser(value))).toBe(false)
  })

  it('fails for nested object with invalid property', () => {
    const value: RecursiveObject = { s: 'a', recArr: [{ s: 'c', recArr: [] }] }
    expect(isSuccess(parser(value))).toBe(false)
  })

  it('aggregates errors from all properties', () => {
    const value: RecursiveObject = { s: 'c', recArr: [{ s: 'c', recArr: [] }] }
    const result = parser(value)

    if (!isFailure(result)) {
      return fail('result was not an error')
    }

    expect(result.errors).toHaveLength(2)
  })

  it('adds the property name to path for errors', () => {
    const value: RecursiveObject = { s: 'c', recArr: [{ s: 'c', recArr: [] }] }
    const result = parser(value)

    if (!isFailure(result)) {
      return fail('result was not an error')
    }

    expect(result.errors).toHaveLength(2)
    expect(result.errors[0]?.path).toEqual(['s'])
    expect(result.errors[1]?.path).toEqual(['recArr', '0', 's'])
  })
})
