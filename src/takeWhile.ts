import { isAsyncIterable } from './utils/iterator'
import { LazyIterable } from './shared-types'

type Fn<T> = (datum: T, index: number) => boolean

export function takeWhile<T>(fn: Fn<T>) {
  return function takeWhileFn(data: LazyIterable<T>) {
    if (isAsyncIterable(data) || data instanceof Promise) {
      return {
        async *[Symbol.asyncIterator]() {
          const stream = data instanceof Promise ? await data : data
          let i = 0

          for await (let datum of stream) {
            if (!fn(datum, i++)) return
            yield datum
          }
        },
      }
    }

    return {
      *[Symbol.iterator]() {
        let i = 0
        for (let datum of data) {
          if (!fn(datum, i++)) return
          yield datum
        }
      },
    }
  }
}
