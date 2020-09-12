import { isAsyncIterable } from './utils/iterator'
import { LazyIterable } from './shared-types'

type Fn<T, R = T> = (acc: R, datum: T, index: number) => R

export function reduce<R, T = R>(fn: Fn<T, R>, initial: R) {
  return function reduceFn(data: LazyIterable<T>) {
    if (data == null) return

    let acc = initial

    if (isAsyncIterable(data) || data instanceof Promise) {
      return (async () => {
        const stream = data instanceof Promise ? await data : data
        let i = 0
        for await (let datum of stream) acc = fn(acc, datum, i++)
        return acc
      })()
    }

    let i = 0
    for (let datum of data) acc = fn(acc, datum, i++)
    return acc
  }
}
