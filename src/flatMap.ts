import { isAsyncIterable, isIterable } from './utils/iterator'
import { LazyIterable } from './shared-types'

type Fn<T, R> = (datum: T, index: number) => R

export function flatMap<T, R>(fn: Fn<T, R>) {
  return function flatMapFn(data: LazyIterable<T>) {
    if (data == null) return

    // Handle the async version
    if (isAsyncIterable(data) || data instanceof Promise) {
      return {
        async *[Symbol.asyncIterator]() {
          let stream = data instanceof Promise ? await data : data

          let i = 0
          for await (let datum of stream) {
            let result = fn(datum, i++)
            if (isAsyncIterable(result) || result instanceof Promise) {
              let stream = (result instanceof Promise ? await result : result) as AsyncIterable<R>
              yield* stream
            } else if (isIterable(result)) {
              yield* result
            } else {
              yield result
            }
          }
        },
      }
    }

    // Handle the sync version
    return {
      *[Symbol.iterator]() {
        let i = 0
        for (let datum of data) {
          let result = fn(datum, i++)
          if (isIterable(result)) {
            yield* result
          } else {
            yield result
          }
        }
      },
    }
  }
}
