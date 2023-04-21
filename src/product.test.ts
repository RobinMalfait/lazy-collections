import { pipe, product, range, delay } from './'

it('should be possible to multiply an array', () => {
  let program = pipe(product())

  expect(program([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual(3628800)
  expect(program([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual(3628800)
})

it('should be possible to multiply an iterator', () => {
  let program = pipe(product())

  expect(program(range(1, 10))).toEqual(3628800)
  expect(program(range(1, 10))).toEqual(3628800)
})

it('should be possible to multiply an array (async)', async () => {
  let program = pipe(delay(0), product())

  expect(await program([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual(3628800)
  expect(await program([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual(3628800)
})

it('should be possible to multiply an iterator (async)', async () => {
  let program = pipe(delay(0), product())

  expect(await program(range(1, 10))).toEqual(3628800)
  expect(await program(range(1, 10))).toEqual(3628800)
})

it('should be possible to multiply an array (Promise async)', async () => {
  let program = pipe(product())

  expect(await program(Promise.resolve([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))).toEqual(3628800)
  expect(await program(Promise.resolve([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))).toEqual(3628800)
})

it('should be possible to multiply an iterator (Promise async)', async () => {
  let program = pipe(product())

  expect(await program(Promise.resolve(range(1, 10)))).toEqual(3628800)
  expect(await program(Promise.resolve(range(1, 10)))).toEqual(3628800)
})
