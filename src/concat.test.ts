import { pipe, concat, range, toArray, delay } from './'

it('should concat arrays', () => {
  let program = pipe(concat([0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10]), toArray())

  expect(program()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
})

it('should concat iterators', () => {
  let program = pipe(concat(range(0, 3), range(4, 7), range(8, 10)), toArray())

  expect(program()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
})

it('should concat iterators (async)', async () => {
  let program = pipe(concat(range(0, 3), delay(0)(range(4, 7)), range(8, 10)), toArray())

  expect(await program()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
})

it('should concat iterators (Promise async)', async () => {
  let program = pipe(concat(range(0, 3), range(4, 7), Promise.resolve(range(8, 10))), toArray())

  expect(await program()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
})
