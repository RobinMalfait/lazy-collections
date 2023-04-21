import { pipe, range, toArray, partition, delay } from './'

it('should partition the data into 2 streams based on the predicate', () => {
  let program = pipe(
    range(1, 4),
    partition((x: number) => x % 2 !== 0),
    toArray()
  )

  expect(program()).toEqual([
    [1, 3],
    [2, 4],
  ])
})

it('should return undefined when no stream is passing through it', () => {
  let program = pipe(
    partition((x: number) => x % 2 !== 0),
    toArray()
  )

  expect(program()).toEqual(undefined)
})

it('should partition the data into 2 streams based on the predicate (async)', async () => {
  let program = pipe(
    range(1, 4),
    delay(0),
    partition((x: number) => x % 2 !== 0),
    toArray()
  )

  expect(await program()).toEqual([
    [1, 3],
    [2, 4],
  ])
})

it('should partition the data into 2 streams based on the predicate (Promise async)', async () => {
  let program = pipe(
    Promise.resolve(range(1, 4)),
    partition((x: number) => x % 2 !== 0),
    toArray()
  )

  expect(await program()).toEqual([
    [1, 3],
    [2, 4],
  ])
})

it('should take the index as second argument', async () => {
  let program = pipe(
    Promise.resolve(range(1, 4)),
    partition((_x: number, i) => i % 2 !== 0),
    toArray()
  )

  expect(await program()).toEqual([
    [2, 4],
    [1, 3],
  ])
})
