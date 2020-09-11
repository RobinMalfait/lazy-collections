import { isAsyncIterable } from './utils/iterator'
import { LazyIterable } from './shared-types'

export function slice<T>(begin = 0, end = Infinity) {
  return function sliceFn(data: LazyIterable<T>) {
    if (isAsyncIterable(data) || data instanceof Promise) {
      return {
        async *[Symbol.asyncIterator]() {
          const stream = data instanceof Promise ? await data : data
          const iterator = stream as AsyncIterableIterator<T>

          let local_begin = begin
          let local_end = end - local_begin

          // Skip the first X values
          while (local_begin-- > 0) {
            iterator.next()
          }

          // Loop through the remaining items until the end is reached
          for await (let datum of iterator) {
            yield datum

            if (--local_end < 0) {
              return
            }
          }
        },
      }
    }

    return {
      *[Symbol.iterator]() {
        const iterator = Array.isArray(data)
          ? (data[Symbol.iterator]() as IterableIterator<T>)
          : (data as IterableIterator<T>)

        let local_begin = begin
        let local_end = end - local_begin

        // Skip the first X values
        while (local_begin-- > 0) {
          iterator.next()
        }

        // Loop through the remaining items until the end is reached
        for (let datum of iterator) {
          yield datum

          if (--local_end < 0) {
            return
          }
        }
      },
    }
  }
}
