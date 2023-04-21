import { reduce, chunk, map, head, pipe } from './'

import { LazyIterable } from './shared-types'

export function average() {
  return function averageFn(data: LazyIterable<number>) {
    let program = pipe(
      reduce<[number, number], number>(
        (acc, current) => {
          acc[0] += current
          acc[1] += 1
          return acc
        },
        [0, 0]
      ),
      chunk(2),
      map(([sum, count]: [number, number]) => sum / count),
      head()
    )

    return program(data)
  }
}

// Alias
export let mean = average
