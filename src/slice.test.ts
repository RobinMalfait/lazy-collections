import { pipe, range, slice, toArray, delay } from './'

it.each([
  [0, 10, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
  [4, 6, [4, 5, 6]],
])('should be possible to slice from %p until %p', (start, end, expected) => {
  let program = pipe(slice(start, end), toArray())

  expect(program(range(0, 1_000_000_000))).toEqual(expected)
  expect(program(range(0, 1_000_000_000))).toEqual(expected)
})

it.each([
  [0, 10, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
  [4, 6, [4, 5, 6]],
])('should be possible to slice from %p until %p (async)', async (start, end, expected) => {
  let program = pipe(delay(0), slice(start, end), toArray())

  expect(await program(range(0, 1_000_000_000))).toEqual(expected)
  expect(await program(range(0, 1_000_000_000))).toEqual(expected)
})

it('should be possible to pass an array to slice', () => {
  let program = pipe(slice(0, 1), toArray())
  expect(program([1, 2, 3, 4])).toEqual([1, 2])
})

it('should be possible to pass an iterator to slice', () => {
  let program = pipe(slice(0, 1), toArray())
  expect(program(range(1, 4))).toEqual([1, 2])
})

it('should be possible to pass an array to slice (async)', async () => {
  let program = pipe(delay(0), slice(0, 1), toArray())
  expect(await program([1, 2, 3, 4])).toEqual([1, 2])
})

it('should be possible to pass an iterator to slice (async)', async () => {
  let program = pipe(delay(0), slice(0, 1), toArray())
  expect(await program(range(1, 4))).toEqual([1, 2])
})

it('should be possible to pass an array to slice (Promise async)', async () => {
  let program = pipe(slice(0, 1), toArray())
  expect(await program(Promise.resolve([1, 2, 3, 4]))).toEqual([1, 2])
})

it('should be possible to pass an iterator to slice (Promise async)', async () => {
  let program = pipe(slice(0, 1), toArray())
  expect(await program(Promise.resolve(range(1, 4)))).toEqual([1, 2])
})
