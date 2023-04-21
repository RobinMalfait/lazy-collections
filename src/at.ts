import { find, pipe, toArray } from './'

import { isAsyncIterable } from './utils/iterator'
import { LazyIterable } from './shared-types'

export function at<T>(index: number) {
  if (index >= 0) {
    return function atFn(data: LazyIterable<T>) {
      return find((_, i) => i === index)(data)
    }
  }

  /**
   * To support counting back with a negative index, the whole iteraror has to be
   * converted to an array. Then, `Array.prototype.at` can be used. This is slow,
   * but it helps deliver a consistent UX.
   */
  return function atFn(data: LazyIterable<T>) {
    if (isAsyncIterable(data) || data instanceof Promise) {
      return (async () => {
        let stream = data instanceof Promise ? await data : data

        let program = pipe(toArray())
        let array = await program(stream)

        return array.at(index)
      })()
    }

    return Array.from(data).at(index)
  }
}
