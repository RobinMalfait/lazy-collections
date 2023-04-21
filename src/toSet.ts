import { reduce } from './'

import { LazyIterable } from './shared-types'

export function toSet<T>() {
  return (data: LazyIterable<T>) => {
    return reduce<Set<T>, T>((acc, current) => {
      acc.add(current)
      return acc
    }, new Set<T>())(data)
  }
}
