import { MaybePromise, LazyIterable } from './shared-types'
import { isAsyncIterable } from './utils/iterator'

type Fn<T> = (input: T, index: number) => boolean

export function partition<T>(predicate: Fn<T>) {
  return function partitionFn(
    data: LazyIterable<T>
  ): MaybePromise<[T[], T[]]> | undefined {
    if (data == null) {
      return
    }

    if (isAsyncIterable(data) || data instanceof Promise) {
      return (async () => {
        const stream = data instanceof Promise ? await data : data

        let a: T[] = []
        let b: T[] = []

        let i = 0
        for await (let datum of stream) {
          if (predicate(datum, i++)) {
            a.push(datum)
          } else {
            b.push(datum)
          }
        }

        return [a, b] as [T[], T[]]
      })()
    }

    let a = []
    let b = []

    let i = 0
    for (let datum of data) {
      if (predicate(datum, i++)) {
        a.push(datum)
      } else {
        b.push(datum)
      }
    }

    return [a, b]
  }
}
