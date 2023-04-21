import { pipe, average, delay } from './'

it('should be possible to get an average of all the values', () => {
  let program = pipe(average())

  expect(program([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual(5)
  expect(program([10, 10, 10])).toEqual(10)
})

it('should be possible to get an average of all the values (async)', async () => {
  let program = pipe(delay(0), average())

  expect(await program([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual(5)
  expect(await program([10, 10, 10])).toEqual(10)
})

it('should be possible to get an average of all the values (Promise async)', async () => {
  let program = pipe(average())

  expect(await program(Promise.resolve([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))).toEqual(5)
  expect(await program(Promise.resolve([10, 10, 10]))).toEqual(10)
})
