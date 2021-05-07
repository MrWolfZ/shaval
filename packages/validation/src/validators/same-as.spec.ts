import { failure, isFailure } from '@shaval/core'
import { sameAs } from './same-as.js'

/* eslint-disable @typescript-eslint/no-explicit-any */

describe(sameAs.name, () => {
  it('succeeds for null', () => {
    expect(sameAs(null)(null)).toBe(null)
  })

  it('succeeds for undefined', () => {
    expect(sameAs(undefined)(undefined)).toBe(undefined)
  })

  it('succeeds for string value', () => {
    expect(sameAs('a')('a')).toBe('a')
  })

  it('succeeds for numeric value', () => {
    expect(sameAs(1)(1)).toBe(1)
  })

  it('fails if value is not the same', () => {
    const comparand = [0]
    const value = [1]
    const result = sameAs(comparand)(value)

    if (!isFailure(result)) {
      return fail('result was not an error')
    }

    expect(result.errors).toHaveLength(1)
    expect(result.errors[0]?.value).toBe(value)
    expect(Object.values(result.errors[0]?.details ?? {})).toEqual([{ comparand }])
  })

  it('fails if value is equal but not the same', () => {
    const comparand = [1]
    const value = [1]
    const result = sameAs(comparand)(value)

    if (!isFailure(result)) {
      return fail('result was not an error')
    }

    expect(result.errors).toHaveLength(1)
    expect(result.errors[0]?.value).toBe(value)
    expect(Object.values(result.errors[0]?.details ?? {})).toEqual([{ comparand }])
  })

  it('if called with failure returns failure', () => {
    const err = failure(1, 'fail')
    expect(sameAs(1)(err)).toBe(err)
  })
})
