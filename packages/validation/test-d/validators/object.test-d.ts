import { greaterThan, required, validateArray, validateObject, Validator } from '@shaval/validation'
import { expectAssignable, expectError } from 'tsd'

interface SimpleObject {
  s: string
  n: number
  b: boolean
}

expectAssignable<Validator<SimpleObject>>(validateObject<SimpleObject>({}))

expectAssignable<Validator<SimpleObject>>(
  validateObject<SimpleObject>({
    s: required,
    n: greaterThan(0),
  }),
)

expectAssignable<Validator<SimpleObject>>(
  validateObject<SimpleObject>({
    n: [required, greaterThan(0)],
  }),
)

expectError<Validator<SimpleObject>>(
  validateObject<SimpleObject>({
    s: greaterThan(0),
  }),
)

expectError<Validator<SimpleObject>>(
  validateObject<SimpleObject>({
    s: [required, greaterThan(0)],
  }),
)

interface ObjectWithOptionalProperty {
  n?: number
}

expectAssignable<Validator<ObjectWithOptionalProperty>>(validateObject<ObjectWithOptionalProperty>({}))

expectAssignable<Validator<ObjectWithOptionalProperty>>(
  validateObject<ObjectWithOptionalProperty>({
    n: required,
  }),
)

expectAssignable<Validator<ObjectWithOptionalProperty>>(
  validateObject<ObjectWithOptionalProperty>({
    n: [required, greaterThan(0)],
  }),
)

interface ObjectWithNullableProperty {
  n: number | null
}

expectAssignable<Validator<ObjectWithNullableProperty>>(validateObject<ObjectWithNullableProperty>({}))

expectAssignable<Validator<ObjectWithNullableProperty>>(
  validateObject<ObjectWithNullableProperty>({
    n: required,
  }),
)

expectAssignable<Validator<ObjectWithNullableProperty>>(
  validateObject<ObjectWithNullableProperty>({
    n: [required, greaterThan(0)],
  }),
)

interface ObjectWithNullableOptionalProperty {
  n?: number | null
}

expectAssignable<Validator<ObjectWithNullableOptionalProperty>>(validateObject<ObjectWithNullableOptionalProperty>({}))

expectAssignable<Validator<ObjectWithNullableOptionalProperty>>(
  validateObject<ObjectWithNullableOptionalProperty>({
    n: required,
  }),
)

expectAssignable<Validator<ObjectWithNullableOptionalProperty>>(
  validateObject<ObjectWithNullableOptionalProperty>({
    n: [required, greaterThan(0)],
  }),
)

interface ObjectWithArrayProperty {
  arr: number[]
}

expectAssignable<Validator<ObjectWithArrayProperty>>(validateObject<ObjectWithArrayProperty>({}))

expectAssignable<Validator<ObjectWithArrayProperty>>(
  validateObject<ObjectWithArrayProperty>({
    arr: required,
  }),
)

expectAssignable<Validator<ObjectWithArrayProperty>>(
  validateObject<ObjectWithArrayProperty>({
    arr: validateArray(),
  }),
)

expectAssignable<Validator<ObjectWithArrayProperty>>(
  validateObject<ObjectWithArrayProperty>({
    arr: validateArray(required),
  }),
)

expectAssignable<Validator<ObjectWithArrayProperty>>(
  validateObject<ObjectWithArrayProperty>({
    arr: [validateArray(required), validateArray(required)],
  }),
)

expectAssignable<Validator<ObjectWithArrayProperty>>(
  validateObject<ObjectWithArrayProperty>({
    arr: validateArray(required, greaterThan(0)),
  }),
)

expectError<Validator<ObjectWithArrayProperty>>(
  validateObject<ObjectWithArrayProperty>({
    arr: greaterThan(0),
  }),
)

expectError<Validator<ObjectWithArrayProperty>>(
  validateObject<ObjectWithArrayProperty>({
    arr: [required, greaterThan(0)],
  }),
)

interface ObjectWithOptionalArrayProperty {
  arr?: number[]
}

expectAssignable<Validator<ObjectWithOptionalArrayProperty>>(validateObject<ObjectWithOptionalArrayProperty>({}))

expectAssignable<Validator<ObjectWithOptionalArrayProperty>>(
  validateObject<ObjectWithOptionalArrayProperty>({
    arr: required,
  }),
)

expectAssignable<Validator<ObjectWithOptionalArrayProperty>>(
  validateObject<ObjectWithOptionalArrayProperty>({
    arr: validateArray(),
  }),
)

expectAssignable<Validator<ObjectWithOptionalArrayProperty>>(
  validateObject<ObjectWithOptionalArrayProperty>({
    arr: validateArray(required),
  }),
)

expectAssignable<Validator<ObjectWithOptionalArrayProperty>>(
  validateObject<ObjectWithOptionalArrayProperty>({
    arr: validateArray(required, greaterThan(0)),
  }),
)

expectError<Validator<ObjectWithOptionalArrayProperty>>(
  validateObject<ObjectWithOptionalArrayProperty>({
    arr: greaterThan(0),
  }),
)

expectError<Validator<ObjectWithOptionalArrayProperty>>(
  validateObject<ObjectWithOptionalArrayProperty>({
    arr: [required, greaterThan(0)],
  }),
)

interface ObjectWithNullableArrayProperty {
  arr: number[] | null
}

expectAssignable<Validator<ObjectWithNullableArrayProperty>>(validateObject<ObjectWithNullableArrayProperty>({}))

expectAssignable<Validator<ObjectWithNullableArrayProperty>>(
  validateObject<ObjectWithNullableArrayProperty>({
    arr: required,
  }),
)

expectAssignable<Validator<ObjectWithNullableArrayProperty>>(
  validateObject<ObjectWithNullableArrayProperty>({
    arr: validateArray(),
  }),
)

expectAssignable<Validator<ObjectWithNullableArrayProperty>>(
  validateObject<ObjectWithNullableArrayProperty>({
    arr: validateArray(required),
  }),
)

expectAssignable<Validator<ObjectWithNullableArrayProperty>>(
  validateObject<ObjectWithNullableArrayProperty>({
    arr: validateArray(required, greaterThan(0)),
  }),
)

expectError<Validator<ObjectWithNullableArrayProperty>>(
  validateObject<ObjectWithNullableArrayProperty>({
    arr: greaterThan(0),
  }),
)

expectError<Validator<ObjectWithNullableArrayProperty>>(
  validateObject<ObjectWithNullableArrayProperty>({
    arr: [required, greaterThan(0)],
  }),
)

interface ObjectWithObjectProperty {
  obj: {
    n: number
  }
}

expectAssignable<Validator<ObjectWithObjectProperty>>(validateObject<ObjectWithObjectProperty>({}))

expectAssignable<Validator<ObjectWithObjectProperty>>(
  validateObject<ObjectWithObjectProperty>({
    obj: required,
  }),
)

expectAssignable<Validator<ObjectWithObjectProperty>>(
  validateObject<ObjectWithObjectProperty>({
    obj: validateObject({}),
  }),
)

expectAssignable<Validator<ObjectWithObjectProperty>>(
  validateObject<ObjectWithObjectProperty>({
    obj: validateObject<ObjectWithObjectProperty['obj']>({ n: required }),
  }),
)

expectAssignable<Validator<ObjectWithObjectProperty>>(
  validateObject<ObjectWithObjectProperty>({
    obj: { n: required },
  }),
)

expectAssignable<Validator<ObjectWithObjectProperty>>(
  validateObject<ObjectWithObjectProperty>({
    obj: validateObject<ObjectWithObjectProperty['obj']>({ n: greaterThan(0) }),
  }),
)

expectAssignable<Validator<ObjectWithObjectProperty>>(
  validateObject<ObjectWithObjectProperty>({
    obj: { n: greaterThan(0) },
  }),
)

expectAssignable<Validator<ObjectWithObjectProperty>>(
  validateObject<ObjectWithObjectProperty>({
    obj: [required, { n: greaterThan(0) }],
  }),
)

expectAssignable<Validator<ObjectWithObjectProperty>>(
  validateObject<ObjectWithObjectProperty>({
    obj: [{ n: required }, { n: greaterThan(0) }],
  }),
)

expectAssignable<Validator<ObjectWithObjectProperty>>(
  validateObject<ObjectWithObjectProperty>({
    obj: validateObject({ n: [required, greaterThan(0)] }),
  }),
)

expectError<Validator<ObjectWithObjectProperty>>(
  validateObject<ObjectWithObjectProperty>({
    obj: greaterThan(0),
  }),
)

expectError<Validator<ObjectWithObjectProperty>>(
  validateObject<ObjectWithObjectProperty>({
    obj: [required, greaterThan(0)],
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
    obj: required,
  }),
)

expectAssignable<Validator<ObjectWithOptionalObjectProperty>>(
  validateObject<ObjectWithOptionalObjectProperty>({
    obj: validateObject({}),
  }),
)

expectAssignable<Validator<ObjectWithOptionalObjectProperty>>(
  validateObject<ObjectWithOptionalObjectProperty>({
    obj: validateObject<NonNullable<ObjectWithOptionalObjectProperty['obj']>>({ n: required }),
  }),
)

expectAssignable<Validator<ObjectWithOptionalObjectProperty>>(
  validateObject<ObjectWithOptionalObjectProperty>({
    obj: { n: required },
  }),
)

expectAssignable<Validator<ObjectWithOptionalObjectProperty>>(
  validateObject<ObjectWithOptionalObjectProperty>({
    obj: validateObject<NonNullable<ObjectWithOptionalObjectProperty['obj']>>({ n: greaterThan(0) }),
  }),
)

expectAssignable<Validator<ObjectWithOptionalObjectProperty>>(
  validateObject<ObjectWithOptionalObjectProperty>({
    obj: { n: greaterThan(0) },
  }),
)

expectAssignable<Validator<ObjectWithOptionalObjectProperty>>(
  validateObject<ObjectWithOptionalObjectProperty>({
    obj: [required, { n: greaterThan(0) }],
  }),
)

expectAssignable<Validator<ObjectWithOptionalObjectProperty>>(
  validateObject<ObjectWithOptionalObjectProperty>({
    obj: [{ n: required }, { n: greaterThan(0) }],
  }),
)

expectAssignable<Validator<ObjectWithOptionalObjectProperty>>(
  validateObject<ObjectWithOptionalObjectProperty>({
    obj: validateObject({ n: [required, greaterThan(0)] }),
  }),
)

expectError<Validator<ObjectWithOptionalObjectProperty>>(
  validateObject<ObjectWithOptionalObjectProperty>({
    obj: greaterThan(0),
  }),
)

expectError<Validator<ObjectWithOptionalObjectProperty>>(
  validateObject<ObjectWithOptionalObjectProperty>({
    obj: [required, greaterThan(0)],
  }),
)

interface ObjectWithNullableObjectProperty {
  obj: {
    n: number
  } | null
}

expectAssignable<Validator<ObjectWithNullableObjectProperty>>(validateObject<ObjectWithNullableObjectProperty>({}))

expectAssignable<Validator<ObjectWithNullableObjectProperty>>(
  validateObject<ObjectWithNullableObjectProperty>({
    obj: required,
  }),
)

expectAssignable<Validator<ObjectWithNullableObjectProperty>>(
  validateObject<ObjectWithNullableObjectProperty>({
    obj: validateObject({}),
  }),
)

expectAssignable<Validator<ObjectWithNullableObjectProperty>>(
  validateObject<ObjectWithNullableObjectProperty>({
    obj: validateObject<NonNullable<ObjectWithNullableObjectProperty['obj']>>({ n: required }),
  }),
)

expectAssignable<Validator<ObjectWithNullableObjectProperty>>(
  validateObject<ObjectWithNullableObjectProperty>({
    obj: { n: required },
  }),
)

expectAssignable<Validator<ObjectWithNullableObjectProperty>>(
  validateObject<ObjectWithNullableObjectProperty>({
    obj: validateObject<NonNullable<ObjectWithNullableObjectProperty['obj']>>({ n: greaterThan(0) }),
  }),
)

expectAssignable<Validator<ObjectWithNullableObjectProperty>>(
  validateObject<ObjectWithNullableObjectProperty>({
    obj: { n: greaterThan(0) },
  }),
)

expectAssignable<Validator<ObjectWithNullableObjectProperty>>(
  validateObject<ObjectWithNullableObjectProperty>({
    obj: [required, { n: greaterThan(0) }],
  }),
)

expectAssignable<Validator<ObjectWithNullableObjectProperty>>(
  validateObject<ObjectWithNullableObjectProperty>({
    obj: [{ n: required }, { n: greaterThan(0) }],
  }),
)

expectAssignable<Validator<ObjectWithNullableObjectProperty>>(
  validateObject<ObjectWithNullableObjectProperty>({
    obj: validateObject({ n: [required, greaterThan(0)] }),
  }),
)

expectError<Validator<ObjectWithNullableObjectProperty>>(
  validateObject<ObjectWithNullableObjectProperty>({
    obj: greaterThan(0),
  }),
)

expectError<Validator<ObjectWithNullableObjectProperty>>(
  validateObject<ObjectWithNullableObjectProperty>({
    obj: [required, greaterThan(0)],
  }),
)
