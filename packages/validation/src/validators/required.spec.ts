import { isFailure } from '@shaval/core'
import { required } from './required.js'

describe(required.name, () => {
  it('succeeds for empty string', () => {
    expect(required('')).toBe('')
  })

  it('succeeds for non-empty string', () => {
    expect(required('a')).toBe('a')
  })

  it('succeeds for zero', () => {
    expect(required(0)).toBe(0)
  })

  it('succeeds for non-zero number', () => {
    expect(required(1)).toBe(1)
  })

  it('succeeds for true', () => {
    expect(required(true)).toBe(true)
  })

  it('succeeds for false', () => {
    expect(required(false)).toBe(false)
  })

  it('succeeds for empty array', () => {
    const value: string[] = []
    expect(required(value)).toBe(value)
  })

  it('succeeds for non-empty array', () => {
    const value = ['a']
    expect(required(value)).toBe(value)
  })

  it('succeeds for object', () => {
    const value = { s: 'a' }
    expect(required(value)).toBe(value)
  })

  it('fails for undefined', () => {
    const result = required(undefined)

    if (!isFailure(result)) {
      return fail('result was not an error')
    }

    expect(result.errors).toHaveLength(1)
    expect(result.errors[0]?.value).toBe(undefined)
  })

  it('fails for null', () => {
    const result = required(null)

    if (!isFailure(result)) {
      return fail('result was not an error')
    }

    expect(result.errors).toHaveLength(1)
    expect(result.errors[0]?.value).toBe(null)
  })
})
