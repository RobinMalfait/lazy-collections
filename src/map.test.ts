import { pipe, map, toArray, delay } from './'

it('should be possible to map data from A to B', () => {
  let program = pipe(
    map((x: number) => x * 2), // Double
    toArray()
  )

  expect(program([1, 2, 3])).toEqual([2, 4, 6])
  expect(program([1, 2, 3])).toEqual([2, 4, 6])
})

it('should return undefined when no stream is passing through it', () => {
  let program = pipe(
    map((x: number) => x * 2), // Double
    toArray()
  )

  expect(program()).toEqual(undefined)
  expect(program()).toEqual(undefined)
})

it('should be possible to map data from A to B (async)', async () => {
  let program = pipe(
    delay(0),
    map((x: number) => x * 2), // Double
    toArray()
  )

  expect(await program([1, 2, 3])).toEqual([2, 4, 6])
  expect(await program([1, 2, 3])).toEqual([2, 4, 6])
})

it('should be possible to map data from A to B (Promise async)', async () => {
  let program = pipe(
    delay(0),
    map((x: number) => x * 2), // Double
    toArray()
  )

  expect(await program(Promise.resolve([1, 2, 3]))).toEqual([2, 4, 6])
  expect(await program(Promise.resolve([1, 2, 3]))).toEqual([2, 4, 6])
})

it('should take the index as second argument', () => {
  let program = pipe(
    map((_x: number, i) => i),
    toArray()
  )

  expect(program([1, 2, 3])).toEqual([0, 1, 2])
  expect(program([1, 2, 3])).toEqual([0, 1, 2])
})
