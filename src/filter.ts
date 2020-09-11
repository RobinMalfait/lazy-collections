import { isAsyncIterable } from './utils/iterator'
import { LazyIterable } from './shared-types'

type Fn<T> = (datum: T, index: number) => boolean

export function filter<T>(fn: Fn<T>) {
  return function filterFn(data: LazyIterable<T>) {
    if (isAsyncIterable(data) || data instanceof Promise) {
      return {
        async *[Symbol.asyncIterator]() {
          const stream = data instanceof Promise ? await data : data

          let i = 0
          for await (let datum of stream) {
            // Ignore values that do not meet the criteria
            if (!fn(datum, i++)) {
              continue
            }

            yield datum
          }
        },
      }
    }

    return {
      *[Symbol.iterator]() {
        let i = 0
        for (let datum of data as Iterable<T>) {
          // Ignore values that do not meet the criteria
          if (!fn(datum, i++)) {
            continue
          }

          yield datum
        }
      },
    }
  }
}
