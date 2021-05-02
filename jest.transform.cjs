'use strict'

const crypto = require('crypto')
const fs = require('fs')
const tsJest = require('ts-jest')

// unfortunately jest does not support esm imports that end with .js, therefore
// we use a custom transformer to remove the suffix from imports
function removeJs(code) {
  return code
    .split('\n')
    .map((line) => line.replace(/([}*] from '[^']+)\.js/g, '$1'))
    .join('\n')
}

exports.process = (first, ...rest) => tsJest.createTransformer().process(removeJs(first), ...rest)

exports.getCacheKey = () => crypto.createHash('sha256').update(fs.readFileSync(__filename)).digest('hex')
