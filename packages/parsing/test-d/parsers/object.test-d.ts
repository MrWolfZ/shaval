import { object, ObjectParserShorthand, Parser, ParserResultType, recursive } from '@shaval/parsing'
import { expectAssignable, expectError, expectType } from 'tsd'

/* eslint-disable @typescript-eslint/no-non-null-assertion */

// @ts-expect-error test
object([])

// @ts-expect-error test
object([''])

// @ts-expect-error test
object([string])

interface SimpleObject {
  s: string
  n: number
}

const stringParser: Parser<string> = undefined!
const numberParser: Parser<number> = undefined!
const optionalStringParser: Parser<string | undefined> = undefined!
const nullableStringParser: Parser<string | null> = undefined!
const optionalNullableStringParser: Parser<string | null | undefined> = undefined!
const stringOrNumberParser: Parser<string | number> = undefined!
const stringArrayParser: Parser<string[]> = undefined!
const stringNumberTupleParser: Parser<[string, number]> = undefined!
const objectParser: Parser<{ s: string }> = undefined!
const recordParser: Parser<Record<string, string>> = undefined!

expectType<Parser<SimpleObject>>(
  object<SimpleObject>({ s: stringParser, n: numberParser }),
)

expectError<Parser<SimpleObject>>(object<SimpleObject>([]))

expectError<Parser<SimpleObject>>(
  object<SimpleObject>([stringParser]),
)

interface ObjectWithUnionProperty {
  s: string | number
}

expectType<Parser<ObjectWithUnionProperty>>(
  object<ObjectWithUnionProperty>({ s: stringOrNumberParser }),
)

expectError<Parser<ObjectWithUnionProperty>>(
  object<ObjectWithUnionProperty>({ s: stringParser }),
)

interface ObjectWithOptionalProperty {
  s?: string
}

expectType<Parser<ObjectWithOptionalProperty>>(
  object<ObjectWithOptionalProperty>({ s: optionalStringParser }),
)

expectError<Parser<ObjectWithOptionalProperty>>(
  object<ObjectWithOptionalProperty>({ s: stringParser }),
)

interface ObjectWithNullableProperty {
  s: string | null
}

expectType<Parser<ObjectWithNullableProperty>>(
  object<ObjectWithNullableProperty>({ s: nullableStringParser }),
)

expectError<Parser<ObjectWithNullableProperty>>(
  object<ObjectWithNullableProperty>({ s: stringParser }),
)

interface ObjectWithNullableOptionalProperty {
  s?: string | null
}

expectType<Parser<ObjectWithNullableOptionalProperty>>(
  object<ObjectWithNullableOptionalProperty>({ s: optionalNullableStringParser }),
)

expectError<Parser<ObjectWithNullableOptionalProperty>>(
  object<ObjectWithNullableOptionalProperty>({ s: nullableStringParser }),
)

expectError<Parser<ObjectWithNullableOptionalProperty>>(
  object<ObjectWithNullableOptionalProperty>({ s: optionalStringParser }),
)

expectError<Parser<ObjectWithNullableOptionalProperty>>(
  object<ObjectWithNullableOptionalProperty>({ s: stringParser }),
)

interface ObjectWithArrayProperty {
  arr: string[]
}

expectType<Parser<ObjectWithArrayProperty>>(
  object<ObjectWithArrayProperty>({ arr: stringArrayParser }),
)

expectType<Parser<ObjectWithArrayProperty>>(
  object<ObjectWithArrayProperty>({ arr: [stringParser] }),
)

expectError<Parser<ObjectWithArrayProperty>>(
  object<ObjectWithArrayProperty>({ arr: stringParser }),
)

interface ObjectWithReadonlyArrayProperty {
  arr: readonly string[]
}

const stringReadonlyArrayParser: Parser<readonly string[]> = undefined!

expectType<Parser<ObjectWithReadonlyArrayProperty>>(
  object<ObjectWithReadonlyArrayProperty>({ arr: stringReadonlyArrayParser }),
)

expectError<Parser<ObjectWithReadonlyArrayProperty>>(
  object<ObjectWithReadonlyArrayProperty>({ arr: stringArrayParser }),
)

expectType<Parser<ObjectWithReadonlyArrayProperty>>(
  object<ObjectWithReadonlyArrayProperty>({ arr: [stringParser] }),
)

expectError<Parser<ObjectWithReadonlyArrayProperty>>(
  object<ObjectWithReadonlyArrayProperty>({ arr: stringParser }),
)

interface ObjectWithObjectProperty {
  obj: {
    s: string
  }
}

expectType<Parser<ObjectWithObjectProperty>>(
  object<ObjectWithObjectProperty>({ obj: objectParser }),
)

expectAssignable<ObjectParserShorthand<{ s: string }>>({ s: stringParser })
expectAssignable<ObjectParserShorthand<{ s: string; n: number }>>({ s: stringParser, n: numberParser })
expectError<ObjectParserShorthand<{ s: string; n: number }>>({ s: stringParser })
expectAssignable<ObjectParserShorthand<{ s: string | number }>>({ s: stringOrNumberParser })
expectAssignable<ObjectParserShorthand<{ s: { n: number } }>>({ s: { n: numberParser } })
expectAssignable<ObjectParserShorthand<{ s: string[] }>>({ s: [stringParser] })
expectError<ObjectParserShorthand<{ s: string[][] }>>({ s: [stringParser] })
expectAssignable<ObjectParserShorthand<{ s: string[][] }>>({ s: [[stringParser]] })

const testParser = object({
  s: stringParser,
  optS: optionalStringParser,
  arr: stringArrayParser,
  nested: {
    o: stringParser,
    arr: stringArrayParser,
  },
  rec: recordParser,
  stringOrNumber: stringOrNumberParser,
  stringNumberTuple: stringNumberTupleParser,
})

type InferredResultType = ParserResultType<typeof testParser>

expectType<string>(undefined! as InferredResultType['s'])
expectType<string | undefined>(undefined! as InferredResultType['optS'])
expectError<string>(undefined! as InferredResultType['optS'])
expectType<string[]>(undefined! as InferredResultType['arr'])
expectType<{ o: string; arr: string[] }>(undefined! as InferredResultType['nested'])
expectType<Record<string, string>>(undefined! as InferredResultType['rec'])
expectType<string | number>(undefined! as InferredResultType['stringOrNumber'])
expectType<[string, number]>(undefined! as InferredResultType['stringNumberTuple'])

interface RecursiveObject {
  s: string
  recArr: RecursiveObject[]
}

expectType<Parser<RecursiveObject>>(
  recursive<RecursiveObject>((self) => ({ s: stringParser, recArr: [self] })),
)
