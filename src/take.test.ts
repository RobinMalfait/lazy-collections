import { pipe, range, take, toArray, delay } from './'

it('should take a only X values', () => {
  let program = pipe(take(5), toArray())

  expect(program(range(0, 1_000))).toEqual([0, 1, 2, 3, 4])
})

it('should take a only X values (async)', async () => {
  let program = pipe(delay(0), take(5), toArray())

  expect(await program(range(0, 1_000))).toEqual([0, 1, 2, 3, 4])
})

it('should take a only X values (Promise async)', async () => {
  let program = pipe(take(5), toArray())

  expect(await program(Promise.resolve(range(0, 1_000)))).toEqual([0, 1, 2, 3, 4])
})
