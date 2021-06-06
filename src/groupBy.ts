import { isAsyncIterable } from './utils/iterator'
import { LazyIterable } from './shared-types'

type KeyFn<T> = (input: T, index: number) => string | number

export function groupBy<T>(keySelector: KeyFn<T>) {
  return function groupByFn(data: LazyIterable<T>) {
    if (isAsyncIterable(data) || data instanceof Promise) {
      return (async () => {
        let stream = data instanceof Promise ? await data : data
        let map: Record<ReturnType<typeof keySelector>, T[]> = {}
        let i = 0
        for await (let datum of stream) {
          let key = keySelector(datum, i++)
          if (map[key] === undefined) map[key] = []
          map[key].push(datum)
        }

        return map
      })()
    }

    let map: Record<ReturnType<typeof keySelector>, T[]> = {}
    let i = 0
    for (let datum of data) {
      let key = keySelector(datum, i++)
      if (map[key] === undefined) map[key] = []
      map[key].push(datum)
    }

    return map
  }
}
