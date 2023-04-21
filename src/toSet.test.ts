import { pipe, range, flatMap, toSet, delay } from './'

it('should convert an iterator to an array', () => {
  let program = pipe(range(0, 10), toSet())

  expect(program()).toEqual(new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
})

it('should remove duplicate items (default Set behaviour)', () => {
  let program = pipe(
    range(0, 10),
    flatMap<number, number[]>((value) => [value, value, value + 1]),
    toSet()
  )

  expect(program()).toEqual(new Set([0, 1, 10, 11, 2, 3, 4, 5, 6, 7, 8, 9]))
})

it('should convert an iterator to an array (async)', async () => {
  let program = pipe(range(0, 10), delay(0), toSet())

  expect(await program()).toEqual(new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
})

it('should convert an iterator to an array (Promise async)', async () => {
  let program = pipe(Promise.resolve(range(0, 10)), toSet())

  expect(await program()).toEqual(new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
})
