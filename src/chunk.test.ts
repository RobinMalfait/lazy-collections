import { pipe, range, chunk, toArray, delay } from './'

it('should create chunked items', () => {
  let program = pipe(chunk(3), toArray())

  expect(program(range(0, 10))).toEqual([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10],
  ])
  expect(program(range(0, 10))).toEqual([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10],
  ])
})

it('should create chunked items (async)', async () => {
  let program = pipe(delay(0), chunk(3), toArray())

  expect(await program(range(0, 10))).toEqual([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10],
  ])
  expect(await program(range(0, 10))).toEqual([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10],
  ])
})

it('should create chunked items (Promise async)', async () => {
  let program = pipe(chunk(3), toArray())

  expect(await program(Promise.resolve(range(0, 10)))).toEqual([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10],
  ])
  expect(await program(Promise.resolve(range(0, 10)))).toEqual([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10],
  ])
})
