import { isAsyncIterable } from './utils/iterator'
import { LazyIterable } from './shared-types'

type Fn<T> = (input: T, index: number) => boolean

export function some<T>(predicate: Fn<T>) {
  return function someFn(data: LazyIterable<T>): boolean | Promise<boolean> {
    if (isAsyncIterable(data) || data instanceof Promise) {
      return (async () => {
        const stream = data instanceof Promise ? await data : data
        let i = 0

        for await (let datum of stream) {
          if (predicate(datum, i++)) {
            return true
          }
        }

        return false
      })()
    }

    let i = 0
    for (let datum of data) {
      if (predicate(datum, i++)) {
        return true
      }
    }

    return false
  }
}
