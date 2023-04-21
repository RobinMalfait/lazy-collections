import { reduce, pipe, delay } from './'

it('should be possible to sum numbers (via reduce)', () => {
  let program = reduce((total, current) => total + current, 0)
  expect(program([1, 2, 3])).toEqual(6)
  expect(program([1, 2, 3])).toEqual(6)
})

it('should be possible to sum numbers (via reduce) (async)', async () => {
  let program = pipe(
    delay(0),
    reduce((total, current) => total + current, 0)
  )
  expect(await program([1, 2, 3])).toEqual(6)
  expect(await program([1, 2, 3])).toEqual(6)
})

it('should be possible to sum numbers (via reduce) (Promise async)', async () => {
  let program = pipe(reduce((total, current) => total + current, 0))

  expect(await program(Promise.resolve([1, 2, 3]))).toEqual(6)
  expect(await program(Promise.resolve([1, 2, 3]))).toEqual(6)
})

it('should take the index as second argument', async () => {
  let program = pipe(reduce((total, current, i) => total + current + i, 0))

  expect(await program(Promise.resolve([1, 2, 3]))).toEqual(9)
  expect(await program(Promise.resolve([1, 2, 3]))).toEqual(9)
})
