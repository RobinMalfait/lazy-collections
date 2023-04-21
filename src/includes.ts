import { findIndex } from './'

import { isAsyncIterable } from './utils/iterator'
import { LazyIterable } from './shared-types'

export function includes<T>(searchElement: T, fromIndex = 0) {
  function predicate(element: T, index: number) {
    if (index < fromIndex) return false
    return Object.is(element, searchElement)
  }

  return function includesFn(data: LazyIterable<T>) {
    if (isAsyncIterable(data) || data instanceof Promise) {
      return (async () => {
        let index = await findIndex(predicate)(data)
        return index !== -1
      })()
    }

    let index = findIndex(predicate)(data)
    return index !== -1
  }
}
