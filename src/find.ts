import { isAsyncIterable } from './utils/iterator'
import { LazyIterable } from './shared-types'

type Fn<T> = (input: T, index: number) => boolean

export function find<T>(predicate: Fn<T>) {
  return function findFn(data: LazyIterable<T>): (T | undefined) | Promise<T | undefined> {
    if (isAsyncIterable(data) || data instanceof Promise) {
      return (async () => {
        const stream = data instanceof Promise ? await data : data

        let i = 0
        for await (let datum of stream) {
          if (predicate(datum, i++)) {
            return datum
          }
        }

        return undefined
      })()
    }

    let i = 0
    for (let datum of data) {
      if (predicate(datum, i++)) {
        return datum
      }
    }

    return undefined
  }
}
