import { pipe, toArray, sort, delay } from './'

it('should be possible to sort a stream of numbers', () => {
  let program = pipe(
    sort<number>((a, z) => a - z),
    toArray()
  )

  expect(program([6, 1, 4, 2, 3, 5, 9, 7, 8])).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
})

it('should be possible to sort an async stream of numbers', async () => {
  let program = pipe(
    sort<number>((a, z) => a - z),
    toArray()
  )

  expect(await program(Promise.resolve([6, 1, 4, 2, 3, 5, 9, 7, 8]))).toEqual([
    1, 2, 3, 4, 5, 6, 7, 8, 9,
  ])
})

it('should be possible to sort an async stream of numbers (2)', async () => {
  let program = pipe(
    delay(10),
    sort<number>((a, z) => a - z),
    toArray()
  )

  expect(await program([6, 1, 4, 2, 3, 5, 9, 7, 8])).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
})
