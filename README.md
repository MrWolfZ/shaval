# shaval - simple unobtrusive object parsing and validation for TypeScript

**shaval** (short for **sha**pe **val**idation) is object parsing and validation as it should be: simple to use, no boilerplate, unobtrusive, lightning-fast and type-safe but not verbose.

[![npm version](https://badge.fury.io/js/%40shaval%2Fcore.svg)](https://www.npmjs.com/org/shaval)
[![Build Status](https://github.com/MrWolfZ/shaval/actions/workflows/main.yaml/badge.svg?branch=main)](https://github.com/MrWolfZ/shaval/actions/workflows/main.yaml?branch=main)
[![codecov](https://codecov.io/gh/MrWolfZ/shaval/branch/main/graph/badge.svg)](https://codecov.io/gh/MrWolfZ/shaval)
[![license](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Quickstart

```sh
npm i @shaval/parsing @shaval/validation -S
```

```ts
// TODO
```

## Motivation

TODO

## Prior Art

TODO

## Open points

### entry

- create entry package `shaval` that simply exports everything from `core`, `parsing`, and `validation`

### core

- write e2e tests
- add comments for all public exports

### parsing

- add `enum` parser
- add `tuple` parser
- add `date` parser
- write e2e tests
- add comments for all public exports
- run performance tests

- export two objects `parsers` and `p` that contain all parsers are properties
- add `intersection` parser
- add `promise` parser
- add `function` parser
- add `stringToDate` parser
- add `stringToNumber` parser
- in `object` support symbol properties
- support for async parsers
- omit certain error messages for production builds
- in type tests remove generics from `expectError` where possible and replace all `// @ts-expect-error` with `expectError`

### validation

- rename `custom` to `customValidator`
- add `tupleValidator`
- add `recordValidator`
- add most common validators
- write e2e tests
- add comments for all public exports
- run performance tests

- export two objects `validators` and `v` that contain all validators are properties
- in `objectValidator` support symbol properties
- support for async validators
- omit certain error messages for production builds
- in type tests remove generics from `expectError` where possible and replace all `// @ts-expect-error` with `expectError`

### localization

- create package for localizing (and humanizing) error messages

### express

- create package with express middleware for parsing and validating incoming requests

### recipes

- write quickstart
- write proper recipes for all features
- write recipe for writing custom validators
- write recipe for validating unions (i.e. just a custom validator with a type check)
- write recipe to show express integration
- mention intersections, unions, and enums

### docs

- write proper recipes for all features
- create list of parsers and validators

## Contributing

If you want to help with the development of this library please have a look at the [contributing guidelines](CONTRIBUTING.md).

## License

Everything in this repository is [licensed under the MIT License](LICENSE) unless otherwise specified.

Copyright (c) 2021-present Jonathan Ziller
