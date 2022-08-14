import { LazyIterable } from './shared-types'
import { getIterator, isAsyncIterable } from './utils/iterator'

export function sort<T>(comparator: (a: T, z: T) => number) {
  return function sortFn(data: LazyIterable<T>) {
    if (isAsyncIterable(data) || data instanceof Promise) {
      return {
        async *[Symbol.asyncIterator]() {
          let stream = data instanceof Promise ? await data : data

          let result = []
          // @ts-expect-error I'm probably doing something stupid here...
          for await (let datum of getIterator(stream)) result.push(datum)
          yield* result.sort(comparator)
        },
      }
    }

    return {
      *[Symbol.iterator]() {
        for (let datum of Array.from(data).sort(comparator)) {
          yield datum
        }
      },
    }
  }
}
