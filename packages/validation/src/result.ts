import { failure, isFailure } from '@shaval/core'

// re-export functions from core locally to improve minification
export const _failure = failure
export const _isFailure = isFailure
