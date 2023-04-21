import { pipe, sum, range, delay } from './'

it('should be possible to sum an array', () => {
  let program = pipe(sum())

  expect(program([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual(55)
  expect(program([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual(55)
})

it('should be possible to sum an iterator', () => {
  let program = pipe(sum())

  expect(program(range(0, 10))).toEqual(55)
  expect(program(range(0, 10))).toEqual(55)
})

it('should be possible to sum an array (async)', async () => {
  let program = pipe(delay(0), sum())

  expect(await program([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual(55)
  expect(await program([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual(55)
})

it('should be possible to sum an iterator (async)', async () => {
  let program = pipe(delay(0), sum())

  expect(await program(range(0, 10))).toEqual(55)
  expect(await program(range(0, 10))).toEqual(55)
})

it('should be possible to sum an array (Promise async)', async () => {
  let program = pipe(sum())

  expect(await program(Promise.resolve([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))).toEqual(55)
  expect(await program(Promise.resolve([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))).toEqual(55)
})

it('should be possible to sum an iterator (Promise async)', async () => {
  let program = pipe(sum())

  expect(await program(Promise.resolve(range(0, 10)))).toEqual(55)
  expect(await program(Promise.resolve(range(0, 10)))).toEqual(55)
})
