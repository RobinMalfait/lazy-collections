import { isAsyncIterable } from './utils/iterator'
import { LazyIterable } from './shared-types'

export function head<T>() {
  return function headFn(data: LazyIterable<T>): T | undefined | Promise<T | undefined> {
    if (data == null) return

    if (isAsyncIterable(data) || data instanceof Promise) {
      return (async () => {
        const stream = data instanceof Promise ? await data : data

        for await (let datum of stream) return datum
        return undefined
      })()
    }

    for (let datum of data) return datum
    return undefined
  }
}

// Alias
export const first = head
