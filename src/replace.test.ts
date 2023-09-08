import { pipe } from './pipe'
import { replace } from './replace'
import { range } from './range'
import { toArray } from './toArray'
import { delay } from './delay'

it('should replace the item at the given index with the new value', () => {
  let program = pipe(replace(2, 42), toArray())

  expect(program(range(0, 2))).toEqual([0, 1, 42])
  expect(program(range(0, 2))).toEqual([0, 1, 42])
})

it('should replace the item at the given index with the new value (async)', async () => {
  let program = pipe(delay(0), replace(2, 42), toArray())

  expect(await program(range(0, 2))).toEqual([0, 1, 42])
  expect(await program(range(0, 2))).toEqual([0, 1, 42])
})

it('should replace the item at the given index with the new value (Promise async)', async () => {
  let program = pipe(replace(2, 42), toArray())

  expect(await program(Promise.resolve(range(0, 2)))).toEqual([0, 1, 42])
  expect(await program(Promise.resolve(range(0, 2)))).toEqual([0, 1, 42])
})
