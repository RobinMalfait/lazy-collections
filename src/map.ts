import { isAsyncIterable } from './utils/iterator'
import { LazyIterable } from './shared-types'

type Fn<T, R> = (datum: T, index: number) => R

export function map<T, R>(fn: Fn<T, R>) {
  return function mapFn(data: LazyIterable<T>) {
    if (data == null) return

    // Handle the async version
    if (isAsyncIterable(data) || data instanceof Promise) {
      return {
        async *[Symbol.asyncIterator]() {
          let stream = data instanceof Promise ? await data : data

          let i = 0
          for await (let datum of stream) yield fn(datum, i++)
        },
      }
    }

    // Handle the sync version
    return {
      *[Symbol.iterator]() {
        let i = 0
        for (let datum of data) yield fn(datum, i++)
      },
    }
  }
}
