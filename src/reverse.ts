import { pipe, toArray } from './'

import { isAsyncIterable } from './utils/iterator'
import { LazyIterable } from './shared-types'

/**
 * This is pretty slow because it has to first go through the whole iterator
 * (to make it an array), then reverse the whole thing and then start
 * yielding again.
 */
export function reverse<T>() {
  return function reverseFn(data: LazyIterable<T>) {
    if (isAsyncIterable(data) || data instanceof Promise) {
      return {
        async *[Symbol.asyncIterator]() {
          let stream = data instanceof Promise ? await data : data

          let program = pipe(toArray())
          let array = await program(stream)

          for await (let datum of array.reverse()) yield datum
        },
      }
    }

    return {
      *[Symbol.iterator]() {
        /**
         * This is pretty slow because it has to first go through the whole iterator
         * (to make it an array), then reverse the whole thing and then start
         * yielding again.
         */
        for (let datum of Array.from(data).reverse()) yield datum
      },
    }
  }
}
