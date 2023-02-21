import { findIndex } from './findIndex'
import { isAsyncIterable } from './utils/iterator'
import { LazyIterable } from './shared-types'

export function includes(searchElement: any, fromIndex?: number) {
  let resolvedFromIndex = (fromIndex && fromIndex >= 0) ? fromIndex : 0
  let predicate: Parameters<typeof findIndex>[0] = (element, index) => {
    if (index < resolvedFromIndex) return false
    return element === searchElement
  }

  return function includesFn(data: LazyIterable<any>) {
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
