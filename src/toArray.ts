import { reduce } from './reduce'
import { LazyIterable } from './shared-types'

export function toArray<T>(data: LazyIterable<T>) {
    return reduce<T[], T>((acc, current) => {
      acc.push(current)
      return acc
    }, [])(data)
}
