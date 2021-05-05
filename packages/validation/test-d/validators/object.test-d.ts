import { ObjectPropertyValidators, objectValidator, ObjectValidatorShorthand, Validator } from '@shaval/validation'
import { expectAssignable, expectError } from 'tsd'

/* eslint-disable @typescript-eslint/no-non-null-assertion */

const stringValidator: Validator<string> = undefined!
const numberValidator: Validator<number> = undefined!
const optionalNumberValidator: Validator<number | undefined> = undefined!
const nullableNumberValidator: Validator<number | null> = undefined!
const optionalNullableNumberValidator: Validator<number | null | undefined> = undefined!
const stringOrNumberValidator: Validator<string | number> = undefined!
const stringArrayValidator: Validator<readonly string[]> = undefined!
const numberArrayValidator: Validator<readonly number[]> = undefined!
const optionalNumberArrayValidator: Validator<readonly number[] | undefined> = undefined!

interface SimpleObject {
  s: string
  n: number
  b: boolean
  u: string | number
}

// @ts-expect-error test
objectValidator({})

expectAssignable<Validator<SimpleObject>>(objectValidator<SimpleObject>({}))

expectAssignable<Validator<SimpleObject>>(
  objectValidator<SimpleObject>({
    s: stringValidator,
    n: numberValidator,
    u: (v) => (typeof v === 'string' ? stringValidator(v) : numberValidator(v)),
  }),
)

expectAssignable<Validator<SimpleObject>>(
  objectValidator<SimpleObject>({
    n: [numberValidator, numberValidator],
  }),
)

expectError<Validator<SimpleObject>>(
  objectValidator<SimpleObject>({
    s: numberValidator,
  }),
)

expectError<Validator<SimpleObject>>(
  objectValidator<SimpleObject>({
    s: [stringValidator, numberValidator],
  }),
)

interface ObjectWithOptionalProperty {
  n?: number
}

expectAssignable<Validator<ObjectWithOptionalProperty>>(objectValidator<ObjectWithOptionalProperty>({}))

expectAssignable<Validator<ObjectWithOptionalProperty>>(
  objectValidator<ObjectWithOptionalProperty>({
    n: optionalNumberValidator,
  }),
)

expectAssignable<Validator<ObjectWithOptionalProperty>>(
  objectValidator<ObjectWithOptionalProperty>({
    n: [optionalNumberValidator, optionalNumberValidator],
  }),
)

expectError<Validator<ObjectWithOptionalProperty>>(
  objectValidator<ObjectWithOptionalProperty>({
    n: stringValidator,
  }),
)

expectError<Validator<ObjectWithOptionalProperty>>(
  objectValidator<ObjectWithOptionalProperty>({
    n: [optionalNumberValidator, stringValidator],
  }),
)

interface ObjectWithNullableProperty {
  n: number | null
}

expectAssignable<Validator<ObjectWithNullableProperty>>(objectValidator<ObjectWithNullableProperty>({}))

expectAssignable<Validator<ObjectWithNullableProperty>>(
  objectValidator<ObjectWithNullableProperty>({
    n: nullableNumberValidator,
  }),
)

expectAssignable<Validator<ObjectWithNullableProperty>>(
  objectValidator<ObjectWithNullableProperty>({
    n: [nullableNumberValidator, nullableNumberValidator],
  }),
)

expectError<Validator<ObjectWithNullableProperty>>(
  objectValidator<ObjectWithNullableProperty>({
    n: numberValidator,
  }),
)

objectValidator<ObjectWithNullableProperty>({
  // @ts-expect-error test
  n: [numberValidator, numberValidator],
})

expectError<Validator<ObjectWithNullableProperty>>(
  objectValidator<ObjectWithNullableProperty>({
    n: stringValidator,
  }),
)

objectValidator<ObjectWithNullableProperty>({
  // @ts-expect-error test
  n: [stringValidator, numberValidator],
})

interface ObjectWithNullableOptionalProperty {
  n?: number | null
}

expectAssignable<Validator<ObjectWithNullableOptionalProperty>>(objectValidator<ObjectWithNullableOptionalProperty>({}))

expectAssignable<Validator<ObjectWithNullableOptionalProperty>>(
  objectValidator<ObjectWithNullableOptionalProperty>({
    n: optionalNullableNumberValidator,
  }),
)

expectAssignable<Validator<ObjectWithNullableOptionalProperty>>(
  objectValidator<ObjectWithNullableOptionalProperty>({
    n: [optionalNullableNumberValidator, optionalNullableNumberValidator],
  }),
)

expectError<Validator<ObjectWithNullableOptionalProperty>>(
  objectValidator<ObjectWithNullableOptionalProperty>({
    n: numberValidator,
  }),
)

expectError<Validator<ObjectWithNullableOptionalProperty>>(
  objectValidator<ObjectWithNullableOptionalProperty>({
    n: [optionalNullableNumberValidator, numberValidator],
  }),
)

expectError<Validator<ObjectWithNullableOptionalProperty>>(
  objectValidator<ObjectWithNullableOptionalProperty>({
    n: stringValidator,
  }),
)

objectValidator<ObjectWithNullableOptionalProperty>({
  // @ts-expect-error test
  n: [stringValidator, numberValidator],
})

interface ObjectWithArrayProperty {
  arr: number[]
}

expectAssignable<Validator<ObjectWithArrayProperty>>(objectValidator<ObjectWithArrayProperty>({}))

expectAssignable<Validator<ObjectWithArrayProperty>>(
  objectValidator<ObjectWithArrayProperty>({
    arr: numberArrayValidator,
  }),
)

expectAssignable<Validator<ObjectWithArrayProperty>>(
  objectValidator<ObjectWithArrayProperty>({
    arr: [numberArrayValidator, numberArrayValidator],
  }),
)

expectError<Validator<ObjectWithArrayProperty>>(
  objectValidator<ObjectWithArrayProperty>({
    arr: stringValidator,
  }),
)

objectValidator<ObjectWithArrayProperty>({
  // @ts-expect-error test
  arr: [stringValidator, numberArrayValidator],
})

interface ObjectWithOptionalArrayProperty {
  arr?: number[]
}

expectAssignable<Validator<ObjectWithOptionalArrayProperty>>(objectValidator<ObjectWithOptionalArrayProperty>({}))

expectAssignable<Validator<ObjectWithOptionalArrayProperty>>(
  objectValidator<ObjectWithOptionalArrayProperty>({
    arr: optionalNumberArrayValidator,
  }),
)

expectAssignable<Validator<ObjectWithOptionalArrayProperty>>(
  objectValidator<ObjectWithOptionalArrayProperty>({
    arr: [optionalNumberArrayValidator, optionalNumberArrayValidator],
  }),
)

expectError<Validator<ObjectWithOptionalArrayProperty>>(
  objectValidator<ObjectWithOptionalArrayProperty>({
    arr: stringValidator,
  }),
)

expectError<Validator<ObjectWithOptionalArrayProperty>>(
  objectValidator<ObjectWithOptionalArrayProperty>({
    arr: numberArrayValidator,
  }),
)

expectError<Validator<ObjectWithOptionalArrayProperty>>(
  objectValidator<ObjectWithOptionalArrayProperty>({
    arr: [optionalNumberArrayValidator, numberArrayValidator],
  }),
)

const nullOrArrayValidator: Validator<readonly number[] | null> = undefined!

interface ObjectWithNullableArrayProperty {
  arr: number[] | null
}

expectAssignable<Validator<ObjectWithNullableArrayProperty>>(objectValidator<ObjectWithNullableArrayProperty>({}))

expectAssignable<Validator<ObjectWithNullableArrayProperty>>(
  objectValidator<ObjectWithNullableArrayProperty>({
    arr: nullOrArrayValidator,
  }),
)

expectAssignable<Validator<ObjectWithNullableArrayProperty>>(
  objectValidator<ObjectWithNullableArrayProperty>({
    arr: [nullOrArrayValidator, nullOrArrayValidator],
  }),
)

expectError<Validator<ObjectWithNullableArrayProperty>>(
  objectValidator<ObjectWithNullableArrayProperty>({
    arr: numberArrayValidator,
  }),
)

objectValidator<ObjectWithNullableArrayProperty>({
  // @ts-expect-error test
  arr: [numberArrayValidator, numberArrayValidator],
})

expectError<Validator<ObjectWithNullableArrayProperty>>(
  objectValidator<ObjectWithNullableArrayProperty>({
    arr: stringValidator,
  }),
)

objectValidator<ObjectWithNullableArrayProperty>({
  // @ts-expect-error test
  arr: [stringValidator, numberArrayValidator],
})

const nestedObjectValidator: Validator<{ n: number }> = undefined!

interface ObjectWithObjectProperty {
  obj: {
    n: number
  }
}

expectAssignable<Validator<ObjectWithObjectProperty>>(objectValidator<ObjectWithObjectProperty>({}))

expectAssignable<Validator<ObjectWithObjectProperty>>(
  objectValidator<ObjectWithObjectProperty>({
    obj: nestedObjectValidator,
  }),
)

expectAssignable<Validator<ObjectWithObjectProperty>>(
  objectValidator<ObjectWithObjectProperty>({
    obj: [nestedObjectValidator, nestedObjectValidator],
  }),
)

expectAssignable<Validator<ObjectWithObjectProperty>>(
  objectValidator<ObjectWithObjectProperty>({
    obj: objectValidator<ObjectWithObjectProperty['obj']>({ n: numberValidator }),
  }),
)

expectAssignable<Validator<ObjectWithObjectProperty>>(
  objectValidator<ObjectWithObjectProperty>({
    obj: { n: numberValidator },
  }),
)

expectAssignable<Validator<ObjectWithObjectProperty>>(
  objectValidator<ObjectWithObjectProperty>({
    obj: [{ n: numberValidator }, { n: numberValidator }],
  }),
)

expectAssignable<Validator<ObjectWithObjectProperty>>(
  objectValidator<ObjectWithObjectProperty>({
    obj: [nestedObjectValidator, { n: numberValidator }],
  }),
)

expectError<Validator<ObjectWithObjectProperty>>(
  objectValidator<ObjectWithObjectProperty>({
    obj: stringValidator,
  }),
)

expectError<Validator<ObjectWithObjectProperty>>(
  objectValidator<ObjectWithObjectProperty>({
    obj: [stringValidator, nestedObjectValidator],
  }),
)

interface ObjectWithMultipleObjectProperties {
  obj: {
    n: number
    s: string
  }
}

expectAssignable<Validator<ObjectWithMultipleObjectProperties>>(objectValidator<ObjectWithMultipleObjectProperties>({}))

expectAssignable<Validator<ObjectWithMultipleObjectProperties>>(
  objectValidator<ObjectWithMultipleObjectProperties>({
    obj: objectValidator<ObjectWithMultipleObjectProperties['obj']>({ n: numberValidator }),
  }),
)

expectAssignable<Validator<ObjectWithMultipleObjectProperties>>(
  objectValidator<ObjectWithMultipleObjectProperties>({
    obj: { n: numberValidator },
  }),
)

expectAssignable<Validator<ObjectWithMultipleObjectProperties>>(
  objectValidator<ObjectWithMultipleObjectProperties>({
    obj: [{ n: numberValidator }, { n: numberValidator }],
  }),
)

expectAssignable<Validator<ObjectWithMultipleObjectProperties>>(
  objectValidator<ObjectWithMultipleObjectProperties>({
    obj: [{ n: numberValidator }, { s: stringValidator }],
  }),
)

expectError<Validator<ObjectWithMultipleObjectProperties>>(
  objectValidator<ObjectWithMultipleObjectProperties>({
    obj: stringValidator,
  }),
)

expectError<Validator<ObjectWithMultipleObjectProperties>>(
  objectValidator<ObjectWithMultipleObjectProperties>({
    obj: [{ n: numberValidator }, nestedObjectValidator],
  }),
)

interface ObjectWithOptionalObjectProperty {
  obj?: {
    n: number
  }
}

const optionalNestedObjectValidator: Validator<{ n: number } | undefined> = undefined!

expectAssignable<Validator<ObjectWithOptionalObjectProperty>>(objectValidator<ObjectWithOptionalObjectProperty>({}))

expectAssignable<Validator<ObjectWithOptionalObjectProperty>>(
  objectValidator<ObjectWithOptionalObjectProperty>({
    obj: optionalNestedObjectValidator,
  }),
)

expectAssignable<Validator<ObjectWithOptionalObjectProperty>>(
  objectValidator<ObjectWithOptionalObjectProperty>({
    obj: [optionalNestedObjectValidator, optionalNestedObjectValidator],
  }),
)

expectError<Validator<ObjectWithOptionalObjectProperty>>(
  objectValidator<ObjectWithOptionalObjectProperty>({
    obj: objectValidator({ n: numberValidator }),
  }),
)

expectError<Validator<ObjectWithOptionalObjectProperty>>(
  objectValidator<ObjectWithOptionalObjectProperty>({
    obj: { n: numberValidator },
  }),
)

expectError<Validator<ObjectWithOptionalObjectProperty>>(
  objectValidator<ObjectWithOptionalObjectProperty>({
    obj: [optionalNestedObjectValidator, { n: numberValidator }],
  }),
)

expectError<Validator<ObjectWithOptionalObjectProperty>>(
  objectValidator<ObjectWithOptionalObjectProperty>({
    obj: [optionalNestedObjectValidator, { n: numberValidator }],
  }),
)

expectError<Validator<ObjectWithOptionalObjectProperty>>(
  objectValidator<ObjectWithOptionalObjectProperty>({
    obj: stringValidator,
  }),
)

expectError<Validator<ObjectWithOptionalObjectProperty>>(
  objectValidator<ObjectWithOptionalObjectProperty>({
    obj: nestedObjectValidator,
  }),
)

expectError<Validator<ObjectWithOptionalObjectProperty>>(
  objectValidator<ObjectWithOptionalObjectProperty>({
    obj: [stringValidator, optionalNestedObjectValidator],
  }),
)

const nullOrNestedObjectValidator: Validator<{ n: number } | null> = undefined!

interface ObjectWithNullableObjectProperty {
  obj: {
    n: number
  } | null
}

expectAssignable<Validator<ObjectWithNullableObjectProperty>>(objectValidator<ObjectWithNullableObjectProperty>({}))

expectAssignable<Validator<ObjectWithNullableObjectProperty>>(
  objectValidator<ObjectWithNullableObjectProperty>({
    obj: nullOrNestedObjectValidator,
  }),
)

expectAssignable<Validator<ObjectWithNullableObjectProperty>>(
  objectValidator<ObjectWithNullableObjectProperty>({
    obj: [nullOrNestedObjectValidator, nullOrNestedObjectValidator],
  }),
)

expectError<Validator<ObjectWithNullableObjectProperty>>(
  objectValidator<ObjectWithNullableObjectProperty>({
    obj: nestedObjectValidator,
  }),
)

objectValidator<ObjectWithNullableObjectProperty>({
  // @ts-expect-error test
  obj: [nestedObjectValidator, nestedObjectValidator],
})

expectError<Validator<ObjectWithNullableObjectProperty>>(
  objectValidator<ObjectWithNullableObjectProperty>({
    obj: objectValidator<NonNullable<ObjectWithNullableObjectProperty['obj']>>({ n: numberValidator }),
  }),
)

expectError<Validator<ObjectWithNullableObjectProperty>>(
  objectValidator<ObjectWithNullableObjectProperty>({
    obj: { n: numberValidator },
  }),
)

expectError<Validator<ObjectWithNullableObjectProperty>>(
  objectValidator<ObjectWithNullableObjectProperty>({
    obj: [() => null, { n: numberValidator }],
  }),
)

objectValidator<ObjectWithNullableObjectProperty>({
  // @ts-expect-error test
  obj: [nestedObjectValidator, { n: numberValidator }],
})

expectError<Validator<ObjectWithNullableObjectProperty>>(
  objectValidator<ObjectWithNullableObjectProperty>({
    obj: stringValidator,
  }),
)

objectValidator<ObjectWithNullableObjectProperty>({
  // @ts-expect-error test
  obj: [stringValidator, nestedObjectValidator],
})

expectAssignable<ObjectValidatorShorthand<{ s: string }>>({ s: stringValidator })
expectAssignable<ObjectValidatorShorthand<{ s: string }>>({ s: [stringValidator, stringValidator] })
expectAssignable<ObjectValidatorShorthand<{ s: string; n: number }>>({ s: stringValidator, n: numberValidator })
expectAssignable<ObjectValidatorShorthand<{ s: string; n: number }>>({ s: stringValidator })
expectAssignable<ObjectValidatorShorthand<{ s: string | number }>>({ s: stringOrNumberValidator })
expectAssignable<ObjectValidatorShorthand<{ s: { n: number } }>>({ s: { n: numberValidator } })
expectError<ObjectValidatorShorthand<{ s: string[] }>>({ s: [stringValidator] })
expectAssignable<ObjectValidatorShorthand<{ s: string[] }>>({ s: stringArrayValidator })
expectAssignable<ObjectValidatorShorthand<{ s: readonly string[] }>>({ s: stringArrayValidator })
expectAssignable<ObjectValidatorShorthand<{ s: string[] }>>({ s: [stringArrayValidator, stringArrayValidator] })
expectError<ObjectValidatorShorthand<{ s: string[][] }>>({ s: [stringValidator] })
expectError<ObjectValidatorShorthand<{ s: string[][] }>>({ s: [[stringValidator]] })
expectAssignable<ObjectValidatorShorthand<{ o: { s: string } }>>({ o: { s: stringValidator } })
expectError<ObjectValidatorShorthand<{ s: string | null }>>({ s: stringValidator })
expectError<ObjectValidatorShorthand<{ arr: string[] | null }>>({ arr: [stringValidator] })
expectError<ObjectValidatorShorthand<{ o: { s: string } | null }>>({ o: { s: stringValidator } })
expectError<ObjectValidatorShorthand<string[]>>([stringValidator])

expectAssignable<ObjectPropertyValidators<{ s: string }>>({ s: stringValidator })
expectError<ObjectPropertyValidators<{ s: string | null }>>({ s: stringValidator })
expectError<ObjectPropertyValidators<{ arr: string[] | null }>>({ arr: [stringValidator] })
expectError<ObjectPropertyValidators<{ o: { s: string } | null }>>({ o: { s: stringValidator } })
