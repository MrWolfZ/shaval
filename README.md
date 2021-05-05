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

### core

- write e2e tests
- add comments for all public exports

### parsing

- add `literal` parser
- add `record` parser
- add `enum` parser
- add `tuple` parser
- add `promise` parser
- add `symbol` parser
- add `function` parser
- add `intersection` parser
- omit certain error messages for production builds
- write e2e tests
- add comments for all public exports
- run performance tests

- add `date` parser
- add `stringToNumber` parser
- support for async parsers

### validation

- add `tupleValidator`
- add `recordValidator`
- add most common validators
- check if `Validator<string | number>` should be assignable to `Validator<string>`
- omit certain error messages for production builds
- write e2e tests
- add comments for all public exports
- run performance tests

- support for async validators

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
