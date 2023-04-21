import { pipe, range, toArray, delay } from './'

it('should convert an iterator to an array', () => {
  let program = pipe(range(0, 10), toArray())

  expect(program()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
})

it('should convert an iterator to an array (async)', async () => {
  let program = pipe(range(0, 10), delay(0), toArray())

  expect(await program()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
})

it('should convert an iterator to an array (Promise async)', async () => {
  let program = pipe(Promise.resolve(range(0, 10)), toArray())

  expect(await program()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
})
