import { pipe, flatMap, toArray, delay } from './'

it('should be possible to flatMap data from A to B', () => {
  let program = pipe(
    flatMap((x: number) => [x * 1, x * 2, x * 4]),
    toArray()
  )

  expect(program([1, 2, 3])).toEqual([1, 2, 4, 2, 4, 8, 3, 6, 12])
  expect(program([1, 2, 3])).toEqual([1, 2, 4, 2, 4, 8, 3, 6, 12])
})

it('should return undefined when no stream is passing through it', () => {
  let program = pipe(
    flatMap((x: number) => [x * 1, x * 2, x * 4]),
    toArray()
  )

  expect(program()).toEqual(undefined)
  expect(program()).toEqual(undefined)
})

it('should be possible to flatMap data from A to B (async)', async () => {
  let program = pipe(
    delay(0),
    flatMap((x: number) => [x * 1, x * 2, x * 4]),
    toArray()
  )

  expect(await program([1, 2, 3])).toEqual([1, 2, 4, 2, 4, 8, 3, 6, 12])
  expect(await program([1, 2, 3])).toEqual([1, 2, 4, 2, 4, 8, 3, 6, 12])
})

it('should be possible to flatMap data from A to B (Promise async)', async () => {
  let program = pipe(
    delay(0),
    flatMap((x: number) => [x * 1, x * 2, x * 4]),
    toArray()
  )

  expect(await program(Promise.resolve([1, 2, 3]))).toEqual([1, 2, 4, 2, 4, 8, 3, 6, 12])
  expect(await program(Promise.resolve([1, 2, 3]))).toEqual([1, 2, 4, 2, 4, 8, 3, 6, 12])
})

it('should take the index as second argument', () => {
  let program = pipe(
    flatMap((_x: number, i) => i),
    toArray()
  )

  expect(program([1, 2, 3])).toEqual([0, 1, 2])
  expect(program([1, 2, 3])).toEqual([0, 1, 2])
})
