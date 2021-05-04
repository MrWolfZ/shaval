import { array, boolean, nullable, number, optional, Parser, string, union } from '@shaval/parsing'
import { expectError, expectType } from 'tsd'

// @ts-expect-error test
union()

// @ts-expect-error test
union(string)

expectType<Parser<string | number>>(union(string, number))
expectType<Parser<string | number>>(union(number, string))
expectError<Parser<string | number>>(union(string, string))
expectError<Parser<string | number>>(union(number, number))
expectType<Parser<string | number | undefined>>(optional(union(string, number)))
expectError<Parser<string | number | undefined>>(nullable(union(string, number)))
expectType<Parser<string | number | null>>(nullable(union(string, number)))
expectError<Parser<string | number | null>>(optional(union(string, number)))
expectType<Parser<string | number | null | undefined>>(optional(nullable(union(string, number))))
expectType<Parser<string | number | null | undefined>>(nullable(optional(union(string, number))))

expectType<Parser<string | number | boolean>>(union(string, number, boolean))
expectType<Parser<string | number | boolean>>(union(string, boolean, number))
expectError<Parser<string | number | boolean>>(union(string, number))
expectType<Parser<string | number | boolean | undefined>>(optional(union(string, number, boolean)))
expectError<Parser<string | number | boolean | undefined>>(nullable(union(string, number, boolean)))
expectType<Parser<string | number | boolean | null>>(nullable(union(string, number, boolean)))
expectError<Parser<string | number | boolean | null>>(optional(union(string, number, boolean)))
expectType<Parser<string | number | boolean | null | undefined>>(optional(nullable(union(string, number, boolean))))
expectType<Parser<string | number | boolean | null | undefined>>(nullable(optional(union(string, number, boolean))))

expectType<Parser<string | number | boolean | string[]>>(union(string, number, boolean, array(string)))
