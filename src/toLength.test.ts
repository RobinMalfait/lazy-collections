import { pipe } from './pipe'
import { range } from './range'
import { toLength } from './toLength'
import { delay } from './delay'

it('should return the length of the iterable', () => {
  let program = pipe(toLength())

  expect(program(range(0, 25))).toBe(26)
  expect(program(range(0, 25))).toBe(26)
})

it('should return the length of the iterable (async)', async () => {
  let program = pipe(delay(0), toLength())

  expect(await program(range(0, 25))).toBe(26)
  expect(await program(range(0, 25))).toBe(26)
})

it('should return the length of the iterable (Promise async)', async () => {
  let program = pipe(toLength())

  expect(await program(Promise.resolve(range(0, 25)))).toBe(26)
  expect(await program(Promise.resolve(range(0, 25)))).toBe(26)
})
