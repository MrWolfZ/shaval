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

- add comments for all public exports

### parsing

- add comments for all public exports
- add `literal` parser
- add `record` parser
- add `enum` parser
- add `tuple` parser
- add `promise` parser
- add `symbol` parser
- add `function` parser
- add `intersection` parser
- omit certain error messages for production builds
- improve error messages

### validation

- refactor `Validator` to accept `T | ShavalResult<T>` as a parameter for composability
- rename `validateArray` to `arrayValidator`
- in `arrayValidator` if array element is object allow passing object validation config instead of validator
- rename `validateObject` to `objectValidator`
- add comments for all public exports
- omit certain error messages for production builds
- improve error messages

### recipes

- write quickstart
- write proper recipes for all features
- write recipe to show express integration

### docs

- write proper recipes for all features
- create list of parsers and validators

## Contributing

If you want to help with the development of this library please have a look at the [contributing guidelines](CONTRIBUTING.md).

## License

Everything in this repository is [licensed under the MIT License](LICENSE) unless otherwise specified.

Copyright (c) 2021-present Jonathan Ziller
