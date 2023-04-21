import { pipe, filter, toArray, delay } from './'

it('should be possible to filter data', () => {
  let program = pipe(
    filter((x: number) => x % 2 === 0), // Is even
    toArray()
  )

  expect(program([1, 2, 3])).toEqual([2])
  expect(program([1, 2, 3])).toEqual([2])
})

it('should be possible to filter data (async)', async () => {
  let program = pipe(
    delay(0),
    filter((x: number) => x % 2 === 0), // Is even
    toArray()
  )

  expect(await program([1, 2, 3])).toEqual([2])
  expect(await program([1, 2, 3])).toEqual([2])
})

it('should be possible to filter data (Promise async)', async () => {
  let program = pipe(
    filter((x: number) => x % 2 === 0), // Is even
    toArray()
  )

  expect(await program(Promise.resolve([1, 2, 3]))).toEqual([2])
  expect(await program(Promise.resolve([1, 2, 3]))).toEqual([2])
})

it('should take the index as second argument', async () => {
  let program = pipe(
    filter((_x: number, i) => i % 2 === 0), // Is even
    toArray()
  )

  expect(await program(Promise.resolve([1, 2, 3]))).toEqual([1, 3])
  expect(await program(Promise.resolve([1, 2, 3]))).toEqual([1, 3])
})
