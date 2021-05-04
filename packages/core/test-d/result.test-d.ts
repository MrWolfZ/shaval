import { failure, Result } from '@shaval/core'
import { expectAssignable, expectError } from 'tsd'

expectAssignable<Result<string>>('')
expectAssignable<Result<string | number>>('')
expectAssignable<Result<string | number>>(0)
expectError<Result<string>>(0)
expectAssignable<Result<number>>(0)
expectAssignable<Result<boolean>>(true)
expectAssignable<Result<string[]>>([])
expectAssignable<Result<string[]>>(['a'])
expectError<Result<string[]>>([0])
expectAssignable<Result<{ s: string }>>({ s: '' })
expectError<Result<{ s: string }>>({ s: 0 })

expectAssignable<Result<string>>(failure('', ''))
expectAssignable<Result<string>>(failure(0, ''))
