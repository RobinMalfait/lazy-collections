import { pipe } from './pipe'
import { range } from './range'
import { unique } from './unique'
import { map } from './map'
import { toArray } from './toArray'
import { delay } from './delay'

function snap(multitude: number, value: number) {
  return Math.ceil(value / multitude) * multitude
}

it('should be possible to create a unique stream', () => {
  let program = pipe(
    map((x: number) => snap(5, x)),
    unique,
    toArray
  )

  expect(program(range(0, 10))).toEqual([0, 5, 10])
})

it('should be possible to create a unique stream (async)', async () => {
  let program = pipe(
    delay(0),
    map((x: number) => snap(5, x)),
    unique,
    toArray
  )

  expect(await program(range(0, 10))).toEqual([0, 5, 10])
})

it('should be possible to create a unique stream (Promise async)', async () => {
  let program = pipe(unique, toArray)

  expect(await program(Promise.resolve([0, 0, 5, 5, 5, 10, 10]))).toEqual([0, 5, 10])
})
