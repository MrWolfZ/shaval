import { Parser, recursive } from '@shaval/parsing'
import { expectType } from 'tsd'

/* eslint-disable @typescript-eslint/no-non-null-assertion */

// @ts-expect-error test
recursive([])

// @ts-expect-error test
recursive([''])

// @ts-expect-error test
recursive([string])

const stringParser: Parser<string> = undefined!

interface RecursiveObject {
  s: string
  recArr: RecursiveObject[]
}

expectType<Parser<RecursiveObject>>(
  recursive<RecursiveObject>((self) => ({ s: stringParser, recArr: [self] })),
)
