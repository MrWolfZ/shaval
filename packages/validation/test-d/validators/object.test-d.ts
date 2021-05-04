import { objectValidator, Validator } from '@shaval/validation'
import { expectAssignable, expectError } from 'tsd'

/* eslint-disable @typescript-eslint/no-non-null-assertion */

const stringValidator: Validator<string> = undefined!
const numberValidator: Validator<number> = undefined!

interface SimpleObject {
  s: string
  n: number
  b: boolean
}

expectAssignable<Validator<SimpleObject>>(objectValidator<SimpleObject>({}))

expectAssignable<Validator<SimpleObject>>(
  objectValidator<SimpleObject>({
    s: stringValidator,
    n: numberValidator,
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
    n: numberValidator,
  }),
)

expectAssignable<Validator<ObjectWithOptionalProperty>>(
  objectValidator<ObjectWithOptionalProperty>({
    n: [numberValidator, numberValidator],
  }),
)

expectError<Validator<ObjectWithOptionalProperty>>(
  objectValidator<ObjectWithOptionalProperty>({
    n: stringValidator,
  }),
)

expectError<Validator<ObjectWithOptionalProperty>>(
  objectValidator<ObjectWithOptionalProperty>({
    n: [stringValidator, numberValidator],
  }),
)

interface ObjectWithNullableProperty {
  n: number | null
}

const nullOrNumberValidator: Validator<number | null> = undefined!

expectAssignable<Validator<ObjectWithNullableProperty>>(objectValidator<ObjectWithNullableProperty>({}))

expectAssignable<Validator<ObjectWithNullableProperty>>(
  objectValidator<ObjectWithNullableProperty>({
    n: nullOrNumberValidator,
  }),
)

expectAssignable<Validator<ObjectWithNullableProperty>>(
  objectValidator<ObjectWithNullableProperty>({
    n: [nullOrNumberValidator, nullOrNumberValidator],
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
    n: nullOrNumberValidator,
  }),
)

expectAssignable<Validator<ObjectWithNullableOptionalProperty>>(
  objectValidator<ObjectWithNullableOptionalProperty>({
    n: [nullOrNumberValidator, nullOrNumberValidator],
  }),
)

expectError<Validator<ObjectWithNullableOptionalProperty>>(
  objectValidator<ObjectWithNullableOptionalProperty>({
    n: numberValidator,
  }),
)

objectValidator<ObjectWithNullableOptionalProperty>({
  // @ts-expect-error test
  n: [numberValidator, numberValidator],
})

expectError<Validator<ObjectWithNullableOptionalProperty>>(
  objectValidator<ObjectWithNullableOptionalProperty>({
    n: stringValidator,
  }),
)

objectValidator<ObjectWithNullableOptionalProperty>({
  // @ts-expect-error test
  n: [stringValidator, numberValidator],
})

const arrayValidator: Validator<readonly number[]> = undefined!

interface ObjectWithArrayProperty {
  arr: number[]
}

expectAssignable<Validator<ObjectWithArrayProperty>>(objectValidator<ObjectWithArrayProperty>({}))

expectAssignable<Validator<ObjectWithArrayProperty>>(
  objectValidator<ObjectWithArrayProperty>({
    arr: arrayValidator,
  }),
)

expectAssignable<Validator<ObjectWithArrayProperty>>(
  objectValidator<ObjectWithArrayProperty>({
    arr: [arrayValidator, arrayValidator],
  }),
)

expectError<Validator<ObjectWithArrayProperty>>(
  objectValidator<ObjectWithArrayProperty>({
    arr: stringValidator,
  }),
)

expectError<Validator<ObjectWithArrayProperty>>(
  objectValidator<ObjectWithArrayProperty>({
    arr: [stringValidator, arrayValidator],
  }),
)

interface ObjectWithOptionalArrayProperty {
  arr?: number[]
}

expectAssignable<Validator<ObjectWithOptionalArrayProperty>>(objectValidator<ObjectWithOptionalArrayProperty>({}))

expectAssignable<Validator<ObjectWithOptionalArrayProperty>>(
  objectValidator<ObjectWithOptionalArrayProperty>({
    arr: arrayValidator,
  }),
)

expectAssignable<Validator<ObjectWithOptionalArrayProperty>>(
  objectValidator<ObjectWithOptionalArrayProperty>({
    arr: [arrayValidator, arrayValidator],
  }),
)

expectError<Validator<ObjectWithOptionalArrayProperty>>(
  objectValidator<ObjectWithOptionalArrayProperty>({
    arr: stringValidator,
  }),
)

expectError<Validator<ObjectWithOptionalArrayProperty>>(
  objectValidator<ObjectWithOptionalArrayProperty>({
    arr: [stringValidator, arrayValidator],
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
    arr: arrayValidator,
  }),
)

objectValidator<ObjectWithNullableArrayProperty>({
  // @ts-expect-error test
  arr: [arrayValidator, arrayValidator],
})

expectError<Validator<ObjectWithNullableArrayProperty>>(
  objectValidator<ObjectWithNullableArrayProperty>({
    arr: stringValidator,
  }),
)

objectValidator<ObjectWithNullableArrayProperty>({
  // @ts-expect-error test
  arr: [stringValidator, arrayValidator],
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

interface ObjectWithOptionalObjectProperty {
  obj?: {
    n: number
  }
}

expectAssignable<Validator<ObjectWithOptionalObjectProperty>>(objectValidator<ObjectWithOptionalObjectProperty>({}))

expectAssignable<Validator<ObjectWithOptionalObjectProperty>>(
  objectValidator<ObjectWithOptionalObjectProperty>({
    obj: nestedObjectValidator,
  }),
)

expectAssignable<Validator<ObjectWithOptionalObjectProperty>>(
  objectValidator<ObjectWithOptionalObjectProperty>({
    obj: [nestedObjectValidator, nestedObjectValidator],
  }),
)

expectAssignable<Validator<ObjectWithOptionalObjectProperty>>(
  objectValidator<ObjectWithOptionalObjectProperty>({
    obj: objectValidator<NonNullable<ObjectWithOptionalObjectProperty['obj']>>({ n: numberValidator }),
  }),
)

expectAssignable<Validator<ObjectWithOptionalObjectProperty>>(
  objectValidator<ObjectWithOptionalObjectProperty>({
    obj: { n: numberValidator },
  }),
)

expectAssignable<Validator<ObjectWithOptionalObjectProperty>>(
  objectValidator<ObjectWithOptionalObjectProperty>({
    obj: [{ n: numberValidator }, { n: numberValidator }],
  }),
)

expectAssignable<Validator<ObjectWithOptionalObjectProperty>>(
  objectValidator<ObjectWithOptionalObjectProperty>({
    obj: [nestedObjectValidator, { n: numberValidator }],
  }),
)

expectError<Validator<ObjectWithOptionalObjectProperty>>(
  objectValidator<ObjectWithOptionalObjectProperty>({
    obj: stringValidator,
  }),
)

expectError<Validator<ObjectWithOptionalObjectProperty>>(
  objectValidator<ObjectWithOptionalObjectProperty>({
    obj: [stringValidator, nestedObjectValidator],
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

objectValidator<ObjectWithNullableObjectProperty>({
  // @ts-expect-error test
  obj: [{ n: numberValidator }, { n: numberValidator }],
})

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
