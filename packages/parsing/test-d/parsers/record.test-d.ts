import { Parser, record } from '@shaval/parsing'
import { expectAssignable, expectError } from 'tsd'

/* eslint-disable @typescript-eslint/no-non-null-assertion */

const TEST_SYMBOL = Symbol()

const stringParser: Parser<string> = undefined!
const numberParser: Parser<number> = undefined!
const optionalStringParser: Parser<string | undefined> = undefined!
const nullableStringParser: Parser<string | null> = undefined!
const stringOrNumberParser: Parser<string | number> = undefined!
const stringArrayParser: Parser<string[]> = undefined!
const objectParser: Parser<{ s: string }> = undefined!
const symbolParser: Parser<typeof TEST_SYMBOL> = undefined!

type StringToString = { [key: string]: string }
type StringToNumber = { [key: string]: number }
type NumberToString = { [key: number]: string }
type StringToStringOrNumber = { [key: string]: string | number }
type StringToStringArray = { [key: string]: string[] }
type StringToObject = { [key: string]: { s: string } }
type StringToRecord = { [key: string]: Record<string, string> }
type StringToOptionalString = { [key: string]: string | undefined }
type StringToNullableString = { [key: string]: string | null }
type SymbolToString = Record<typeof TEST_SYMBOL, string>

expectAssignable<Parser<StringToString>>(record(stringParser))
expectAssignable<Parser<StringToString>>(record(stringParser, stringParser))
expectAssignable<Parser<{ [key: string]: string }>>(record(stringParser, stringParser))
expectAssignable<Parser<{ [key: string]: string }>>(record(stringParser))
expectAssignable<Parser<{ readonly [key: string]: string }>>(record(stringParser, stringParser))
expectAssignable<Parser<{ readonly [key: string]: string }>>(record(stringParser))
expectAssignable<Parser<StringToNumber>>(record(stringParser, numberParser))
expectAssignable<Parser<StringToNumber>>(record(numberParser))
expectError<Parser<NumberToString>>(record(numberParser, stringParser))
expectAssignable<Parser<SymbolToString>>(record(symbolParser, stringParser))
expectAssignable<Parser<StringToStringOrNumber>>(record(stringParser, stringOrNumberParser))
expectAssignable<Parser<StringToStringOrNumber>>(record(stringOrNumberParser))
expectError<Parser<StringToStringOrNumber>>(record(stringParser, stringParser))
expectError<Parser<StringToStringOrNumber>>(record(stringParser))
expectError<Parser<StringToStringOrNumber>>(record(stringParser, numberParser))
expectError<Parser<StringToStringOrNumber>>(record(numberParser))
expectAssignable<Parser<StringToStringArray>>(record(stringParser, stringArrayParser))
expectAssignable<Parser<StringToStringArray>>(record(stringArrayParser))
expectAssignable<Parser<StringToObject>>(record(stringParser, objectParser))
expectAssignable<Parser<StringToObject>>(record(objectParser))
expectAssignable<Parser<StringToRecord>>(record(stringParser, record(stringParser, stringParser)))
expectAssignable<Parser<StringToRecord>>(record(record(stringParser, stringParser)))
expectError<Parser<StringToRecord>>(record(stringParser, objectParser))
expectError<Parser<StringToRecord>>(record(objectParser))
expectError(record(objectParser, stringParser))
expectAssignable<Parser<StringToOptionalString>>(record(stringParser, optionalStringParser))
expectAssignable<Parser<StringToOptionalString>>(record(optionalStringParser))
expectError<Parser<StringToOptionalString>>(record(stringParser, stringParser))
expectError<Parser<StringToOptionalString>>(record(stringParser))
expectAssignable<Parser<StringToNullableString>>(record(stringParser, nullableStringParser))
expectAssignable<Parser<StringToNullableString>>(record(nullableStringParser))
expectError<Parser<StringToNullableString>>(record(stringParser, stringParser))
expectError<Parser<StringToNullableString>>(record(stringParser))

// shorthands
expectAssignable<Parser<StringToStringArray>>(record(stringParser, [stringParser]))
expectAssignable<Parser<StringToStringArray>>(record([stringParser]))
expectAssignable<Parser<StringToObject>>(record(stringParser, { s: stringParser }))
expectAssignable<Parser<StringToObject>>(record({ s: stringParser }))
