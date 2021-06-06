import { pipe } from './pipe'
import { range } from './range'
import { toArray } from './toArray'
import { skip } from './skip'
import { take } from './take'
import { delay } from './delay'

it('should skip x values', () => {
  let program = pipe(skip(5), toArray())

  expect(program(range(0, 10))).toEqual([5, 6, 7, 8, 9, 10])
})

it('should skip x values and take y values', () => {
  let program = pipe(skip(5), take(3), toArray())

  expect(program(range(0, 10))).toEqual([5, 6, 7])
})

it('should skip x values (async)', async () => {
  let program = pipe(delay(0), skip(5), toArray())

  expect(await program(range(0, 10))).toEqual([5, 6, 7, 8, 9, 10])
})

it('should skip x values and take y values (async)', async () => {
  let program = pipe(delay(0), skip(5), take(3), toArray())

  expect(await program(range(0, 10))).toEqual([5, 6, 7])
})

it('should skip x values and take y values (Promise async)', async () => {
  let program = pipe(skip(5), take(3), toArray())

  expect(await program(Promise.resolve(range(0, 10)))).toEqual([5, 6, 7])
})
