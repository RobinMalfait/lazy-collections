import { isAsyncIterable } from './utils/iterator'
import { pipe } from './pipe'
import { toArray } from './toArray'
import { LazyIterable } from './shared-types'

export function toLength() {
  return function toLengthFn(data: LazyIterable<any>) {
    if (isAsyncIterable(data) || data instanceof Promise) {
      return (async () => {
        let stream = data instanceof Promise ? await data : data

        let program = pipe(toArray())
        let array = await program(stream)

        return array.length
      })()
    }

    return Array.from(data).length
  }
}
