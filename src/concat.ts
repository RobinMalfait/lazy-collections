import { isAsyncIterable } from './utils/iterator'
import { LazyIterable } from './shared-types'

export function concat<T>(...data: LazyIterable<T>[]) {
  if (
    data.some(isAsyncIterable) ||
    data.some(datum => datum instanceof Promise)
  ) {
    return {
      async *[Symbol.asyncIterator]() {
        for await (let datum of await Promise.all(data)) {
          yield* datum
        }
      },
    }
  }

  return {
    *[Symbol.iterator]() {
      for (let datum of data as Iterable<T>[]) {
        yield* datum
      }
    },
  }
}
