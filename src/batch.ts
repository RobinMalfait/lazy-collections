import { getIterator, isAsyncIterable } from './utils/iterator'
import { LazyIterable } from './shared-types'

export function batch<T>(size: number) {
  return function batchFn(data: LazyIterable<T>) {
    if (data == null) return

    if (isAsyncIterable(data) || data instanceof Promise) {
      return {
        async *[Symbol.asyncIterator]() {
          let stream = data instanceof Promise ? await data : data
          let iterator = getIterator(stream)

          let buffer = []

          loop: while (true) {
            for (let i = 0; i < size; i++) {
              buffer.push(iterator.next())
            }

            for (let { value, done } of await Promise.all(buffer.splice(0))) {
              if (done) break loop
              yield value
            }
          }
        },
      }
    }

    return {
      *[Symbol.iterator]() {
        let buffer = []
        let iterator = data[Symbol.iterator]()

        loop: while (true) {
          for (let i = 0; i < size; i++) {
            buffer.push(iterator.next())
          }

          for (let { value, done } of buffer.splice(0)) {
            if (done) break loop
            yield value
          }
        }
      },
    }
  }
}
