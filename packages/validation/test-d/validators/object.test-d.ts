import { validateObject, Validator } from '@shaval/validation'
import { expectAssignable, expectError } from 'tsd'

/* eslint-disable @typescript-eslint/no-non-null-assertion */

const stringValidator: Validator<string> = undefined!
const numberValidator: Validator<number> = undefined!

interface SimpleObject {
  s: string
  n: number
  b: boolean
}

expectAssignable<Validator<SimpleObject>>(validateObject<SimpleObject>({}))

expectAssignable<Validator<SimpleObject>>(
  validateObject<SimpleObject>({
    s: stringValidator,
    n: numberValidator,
  }),
)

expectAssignable<Validator<SimpleObject>>(
  validateObject<SimpleObject>({
    n: [numberValidator, numberValidator],
  }),
)

expectError<Validator<SimpleObject>>(
  validateObject<SimpleObject>({
    s: numberValidator,
  }),
)

expectError<Validator<SimpleObject>>(
  validateObject<SimpleObject>({
    s: [stringValidator, numberValidator],
  }),
)

interface ObjectWithOptionalProperty {
  n?: number
}

expectAssignable<Validator<ObjectWithOptionalProperty>>(validateObject<ObjectWithOptionalProperty>({}))

expectAssignable<Validator<ObjectWithOptionalProperty>>(
  validateObject<ObjectWithOptionalProperty>({
    n: numberValidator,
  }),
)

expectAssignable<Validator<ObjectWithOptionalProperty>>(
  validateObject<ObjectWithOptionalProperty>({
    n: [numberValidator, numberValidator],
  }),
)

expectError<Validator<ObjectWithOptionalProperty>>(
  validateObject<ObjectWithOptionalProperty>({
    n: stringValidator,
  }),
)

expectError<Validator<ObjectWithOptionalProperty>>(
  validateObject<ObjectWithOptionalProperty>({
    n: [stringValidator, numberValidator],
  }),
)

interface ObjectWithNullableProperty {
  n: number | null
}

const nullOrNumberValidator: Validator<number | null> = undefined!

expectAssignable<Validator<ObjectWithNullableProperty>>(validateObject<ObjectWithNullableProperty>({}))

expectAssignable<Validator<ObjectWithNullableProperty>>(
  validateObject<ObjectWithNullableProperty>({
    n: nullOrNumberValidator,
  }),
)

expectAssignable<Validator<ObjectWithNullableProperty>>(
  validateObject<ObjectWithNullableProperty>({
    n: [nullOrNumberValidator, nullOrNumberValidator],
  }),
)

expectError<Validator<ObjectWithNullableProperty>>(
  validateObject<ObjectWithNullableProperty>({
    n: numberValidator,
  }),
)

validateObject<ObjectWithNullableProperty>({
  // @ts-expect-error test
  n: [numberValidator, numberValidator],
})

expectError<Validator<ObjectWithNullableProperty>>(
  validateObject<ObjectWithNullableProperty>({
    n: stringValidator,
  }),
)

validateObject<ObjectWithNullableProperty>({
  // @ts-expect-error test
  n: [stringValidator, numberValidator],
})

interface ObjectWithNullableOptionalProperty {
  n?: number | null
}

expectAssignable<Validator<ObjectWithNullableOptionalProperty>>(validateObject<ObjectWithNullableOptionalProperty>({}))

expectAssignable<Validator<ObjectWithNullableOptionalProperty>>(
  validateObject<ObjectWithNullableOptionalProperty>({
    n: nullOrNumberValidator,
  }),
)

expectAssignable<Validator<ObjectWithNullableOptionalProperty>>(
  validateObject<ObjectWithNullableOptionalProperty>({
    n: [nullOrNumberValidator, nullOrNumberValidator],
  }),
)

expectError<Validator<ObjectWithNullableOptionalProperty>>(
  validateObject<ObjectWithNullableOptionalProperty>({
    n: numberValidator,
  }),
)

validateObject<ObjectWithNullableOptionalProperty>({
  // @ts-expect-error test
  n: [numberValidator, numberValidator],
})

expectError<Validator<ObjectWithNullableOptionalProperty>>(
  validateObject<ObjectWithNullableOptionalProperty>({
    n: stringValidator,
  }),
)

validateObject<ObjectWithNullableOptionalProperty>({
  // @ts-expect-error test
  n: [stringValidator, numberValidator],
})

const arrayValidator: Validator<readonly number[]> = undefined!

interface ObjectWithArrayProperty {
  arr: number[]
}

expectAssignable<Validator<ObjectWithArrayProperty>>(validateObject<ObjectWithArrayProperty>({}))

expectAssignable<Validator<ObjectWithArrayProperty>>(
  validateObject<ObjectWithArrayProperty>({
    arr: arrayValidator,
  }),
)

expectAssignable<Validator<ObjectWithArrayProperty>>(
  validateObject<ObjectWithArrayProperty>({
    arr: [arrayValidator, arrayValidator],
  }),
)

expectError<Validator<ObjectWithArrayProperty>>(
  validateObject<ObjectWithArrayProperty>({
    arr: stringValidator,
  }),
)

expectError<Validator<ObjectWithArrayProperty>>(
  validateObject<ObjectWithArrayProperty>({
    arr: [stringValidator, arrayValidator],
  }),
)

interface ObjectWithOptionalArrayProperty {
  arr?: number[]
}

expectAssignable<Validator<ObjectWithOptionalArrayProperty>>(validateObject<ObjectWithOptionalArrayProperty>({}))

expectAssignable<Validator<ObjectWithOptionalArrayProperty>>(
  validateObject<ObjectWithOptionalArrayProperty>({
    arr: arrayValidator,
  }),
)

expectAssignable<Validator<ObjectWithOptionalArrayProperty>>(
  validateObject<ObjectWithOptionalArrayProperty>({
    arr: [arrayValidator, arrayValidator],
  }),
)

expectError<Validator<ObjectWithOptionalArrayProperty>>(
  validateObject<ObjectWithOptionalArrayProperty>({
    arr: stringValidator,
  }),
)

expectError<Validator<ObjectWithOptionalArrayProperty>>(
  validateObject<ObjectWithOptionalArrayProperty>({
    arr: [stringValidator, arrayValidator],
  }),
)

const nullOrArrayValidator: Validator<readonly number[] | null> = undefined!

interface ObjectWithNullableArrayProperty {
  arr: number[] | null
}

expectAssignable<Validator<ObjectWithNullableArrayProperty>>(validateObject<ObjectWithNullableArrayProperty>({}))

expectAssignable<Validator<ObjectWithNullableArrayProperty>>(
  validateObject<ObjectWithNullableArrayProperty>({
    arr: nullOrArrayValidator,
  }),
)

expectAssignable<Validator<ObjectWithNullableArrayProperty>>(
  validateObject<ObjectWithNullableArrayProperty>({
    arr: [nullOrArrayValidator, nullOrArrayValidator],
  }),
)

expectError<Validator<ObjectWithNullableArrayProperty>>(
  validateObject<ObjectWithNullableArrayProperty>({
    arr: arrayValidator,
  }),
)

validateObject<ObjectWithNullableArrayProperty>({
  // @ts-expect-error test
  arr: [arrayValidator, arrayValidator],
})

expectError<Validator<ObjectWithNullableArrayProperty>>(
  validateObject<ObjectWithNullableArrayProperty>({
    arr: stringValidator,
  }),
)

validateObject<ObjectWithNullableArrayProperty>({
  // @ts-expect-error test
  arr: [stringValidator, arrayValidator],
})

const nestedObjectValidator: Validator<{ n: number }> = undefined!

interface ObjectWithObjectProperty {
  obj: {
    n: number
  }
}

expectAssignable<Validator<ObjectWithObjectProperty>>(validateObject<ObjectWithObjectProperty>({}))

expectAssignable<Validator<ObjectWithObjectProperty>>(
  validateObject<ObjectWithObjectProperty>({
    obj: nestedObjectValidator,
  }),
)

expectAssignable<Validator<ObjectWithObjectProperty>>(
  validateObject<ObjectWithObjectProperty>({
    obj: [nestedObjectValidator, nestedObjectValidator],
  }),
)

expectAssignable<Validator<ObjectWithObjectProperty>>(
  validateObject<ObjectWithObjectProperty>({
    obj: validateObject<ObjectWithObjectProperty['obj']>({ n: numberValidator }),
  }),
)

expectAssignable<Validator<ObjectWithObjectProperty>>(
  validateObject<ObjectWithObjectProperty>({
    obj: { n: numberValidator },
  }),
)

expectAssignable<Validator<ObjectWithObjectProperty>>(
  validateObject<ObjectWithObjectProperty>({
    obj: [{ n: numberValidator }, { n: numberValidator }],
  }),
)

expectAssignable<Validator<ObjectWithObjectProperty>>(
  validateObject<ObjectWithObjectProperty>({
    obj: [nestedObjectValidator, { n: numberValidator }],
  }),
)

expectError<Validator<ObjectWithObjectProperty>>(
  validateObject<ObjectWithObjectProperty>({
    obj: stringValidator,
  }),
)

expectError<Validator<ObjectWithObjectProperty>>(
  validateObject<ObjectWithObjectProperty>({
    obj: [stringValidator, nestedObjectValidator],
  }),
)

interface ObjectWithOptionalObjectProperty {
  obj?: {
    n: number
  }
}

expectAssignable<Validator<ObjectWithOptionalObjectProperty>>(validateObject<ObjectWithOptionalObjectProperty>({}))

expectAssignable<Validator<ObjectWithOptionalObjectProperty>>(
  validateObject<ObjectWithOptionalObjectProperty>({
    obj: nestedObjectValidator,
  }),
)

expectAssignable<Validator<ObjectWithOptionalObjectProperty>>(
  validateObject<ObjectWithOptionalObjectProperty>({
    obj: [nestedObjectValidator, nestedObjectValidator],
  }),
)

expectAssignable<Validator<ObjectWithOptionalObjectProperty>>(
  validateObject<ObjectWithOptionalObjectProperty>({
    obj: validateObject<NonNullable<ObjectWithOptionalObjectProperty['obj']>>({ n: numberValidator }),
  }),
)

expectAssignable<Validator<ObjectWithOptionalObjectProperty>>(
  validateObject<ObjectWithOptionalObjectProperty>({
    obj: { n: numberValidator },
  }),
)

expectAssignable<Validator<ObjectWithOptionalObjectProperty>>(
  validateObject<ObjectWithOptionalObjectProperty>({
    obj: [{ n: numberValidator }, { n: numberValidator }],
  }),
)

expectAssignable<Validator<ObjectWithOptionalObjectProperty>>(
  validateObject<ObjectWithOptionalObjectProperty>({
    obj: [nestedObjectValidator, { n: numberValidator }],
  }),
)

expectError<Validator<ObjectWithOptionalObjectProperty>>(
  validateObject<ObjectWithOptionalObjectProperty>({
    obj: stringValidator,
  }),
)

expectError<Validator<ObjectWithOptionalObjectProperty>>(
  validateObject<ObjectWithOptionalObjectProperty>({
    obj: [stringValidator, nestedObjectValidator],
  }),
)

const nullOrNestedObjectValidator: Validator<{ n: number } | null> = undefined!

interface ObjectWithNullableObjectProperty {
  obj: {
    n: number
  } | null
}

expectAssignable<Validator<ObjectWithNullableObjectProperty>>(validateObject<ObjectWithNullableObjectProperty>({}))

expectAssignable<Validator<ObjectWithNullableObjectProperty>>(
  validateObject<ObjectWithNullableObjectProperty>({
    obj: nullOrNestedObjectValidator,
  }),
)

expectAssignable<Validator<ObjectWithNullableObjectProperty>>(
  validateObject<ObjectWithNullableObjectProperty>({
    obj: [nullOrNestedObjectValidator, nullOrNestedObjectValidator],
  }),
)

expectError<Validator<ObjectWithNullableObjectProperty>>(
  validateObject<ObjectWithNullableObjectProperty>({
    obj: nestedObjectValidator,
  }),
)

validateObject<ObjectWithNullableObjectProperty>({
  // @ts-expect-error test
  obj: [nestedObjectValidator, nestedObjectValidator],
})

expectError<Validator<ObjectWithNullableObjectProperty>>(
  validateObject<ObjectWithNullableObjectProperty>({
    obj: validateObject<NonNullable<ObjectWithNullableObjectProperty['obj']>>({ n: numberValidator }),
  }),
)

expectError<Validator<ObjectWithNullableObjectProperty>>(
  validateObject<ObjectWithNullableObjectProperty>({
    obj: { n: numberValidator },
  }),
)

validateObject<ObjectWithNullableObjectProperty>({
  // @ts-expect-error test
  obj: [{ n: numberValidator }, { n: numberValidator }],
})

validateObject<ObjectWithNullableObjectProperty>({
  // @ts-expect-error test
  obj: [nestedObjectValidator, { n: numberValidator }],
})

expectError<Validator<ObjectWithNullableObjectProperty>>(
  validateObject<ObjectWithNullableObjectProperty>({
    obj: stringValidator,
  }),
)

validateObject<ObjectWithNullableObjectProperty>({
  // @ts-expect-error test
  obj: [stringValidator, nestedObjectValidator],
})
