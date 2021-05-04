import { array, boolean, nullable, number, object, optional, Parser, string, union } from '@shaval/parsing'
import { expectError, expectType } from 'tsd'

interface SimpleObject {
  s: string
  n: number
  b: boolean
}

expectType<Parser<SimpleObject>>(
  object<SimpleObject>({ s: string, n: number, b: boolean }),
)

const simpleObjectParser = object<SimpleObject>({ s: string, n: number, b: boolean })

expectType<Parser<string | SimpleObject>>(union(string, simpleObjectParser))
expectType<Parser<string | SimpleObject>>(union(simpleObjectParser, string))
expectError<Parser<string | SimpleObject>>(union(string, string))
expectError<Parser<string | SimpleObject>>(union(simpleObjectParser, simpleObjectParser))
expectType<Parser<string | SimpleObject | undefined>>(optional(union(string, simpleObjectParser)))
expectError<Parser<string | SimpleObject | undefined>>(nullable(union(string, simpleObjectParser)))
expectType<Parser<string | SimpleObject | null>>(nullable(union(string, simpleObjectParser)))
expectError<Parser<string | SimpleObject | null>>(optional(union(string, simpleObjectParser)))
expectType<Parser<string | SimpleObject | null | undefined>>(optional(nullable(union(string, simpleObjectParser))))
expectType<Parser<string | SimpleObject | null | undefined>>(nullable(optional(union(string, simpleObjectParser))))

interface ObjectWithOptionalProperty {
  s?: string
}

expectType<Parser<ObjectWithOptionalProperty>>(
  object<ObjectWithOptionalProperty>({ s: optional(string) }),
)

expectError<Parser<ObjectWithOptionalProperty>>(
  object<ObjectWithOptionalProperty>({ s: string }),
)

interface ObjectWithNullableProperty {
  s: string | null
}

expectType<Parser<ObjectWithNullableProperty>>(
  object<ObjectWithNullableProperty>({ s: nullable(string) }),
)

expectError<Parser<ObjectWithNullableProperty>>(
  object<ObjectWithNullableProperty>({ s: string }),
)

interface ObjectWithNullableOptionalProperty {
  s?: string | null
}

expectType<Parser<ObjectWithNullableOptionalProperty>>(
  object<ObjectWithNullableOptionalProperty>({ s: optional(nullable(string)) }),
)

expectError<Parser<ObjectWithNullableOptionalProperty>>(
  object<ObjectWithNullableOptionalProperty>({ s: nullable(string) }),
)

expectError<Parser<ObjectWithNullableOptionalProperty>>(
  object<ObjectWithNullableOptionalProperty>({ s: optional(string) }),
)

expectError<Parser<ObjectWithNullableOptionalProperty>>(
  object<ObjectWithNullableOptionalProperty>({ s: string }),
)

interface ObjectWithArrayProperty {
  arr: string[]
}

expectType<Parser<ObjectWithArrayProperty>>(
  object<ObjectWithArrayProperty>({ arr: array(string) }),
)

interface ObjectWithOptionalArrayProperty {
  arr?: string[]
}

expectType<Parser<ObjectWithOptionalArrayProperty>>(
  object<ObjectWithOptionalArrayProperty>({ arr: optional(array(string)) }),
)

expectError<Parser<ObjectWithOptionalArrayProperty>>(
  object<ObjectWithOptionalArrayProperty>({ arr: array(string) }),
)

expectError<Parser<ObjectWithOptionalArrayProperty>>(
  object<ObjectWithOptionalArrayProperty>({ arr: nullable(array(string)) }),
)

interface ObjectWithNullableArrayProperty {
  arr: string[] | null
}

expectType<Parser<ObjectWithNullableArrayProperty>>(
  object<ObjectWithNullableArrayProperty>({ arr: nullable(array(string)) }),
)

expectError<Parser<ObjectWithNullableArrayProperty>>(
  object<ObjectWithNullableArrayProperty>({ arr: array(string) }),
)

expectError<Parser<ObjectWithNullableArrayProperty>>(
  object<ObjectWithNullableArrayProperty>({ arr: optional(array(string)) }),
)

interface ObjectWithObjectProperty {
  obj: {
    s: string
  }
}

expectType<Parser<ObjectWithObjectProperty>>(
  object<ObjectWithObjectProperty>({ obj: object({ s: string }) }),
)

interface ObjectWithOptionalObjectProperty {
  obj?: {
    s: string
  }
}

expectType<Parser<ObjectWithOptionalObjectProperty>>(
  object<ObjectWithOptionalObjectProperty>({ obj: optional(object({ s: string })) }),
)

expectError<Parser<ObjectWithOptionalObjectProperty>>(
  object<ObjectWithOptionalObjectProperty>({ obj: object({ s: string }) }),
)
