import { pipe, toArray, zip, take, range, chunk } from './'

it('should be possible to zip data together', () => {
  let program = pipe(
    [
      [0, 1, 2, 3],
      ['A', 'B', 'C', 'D'],
    ],
    zip(),
    toArray()
  )

  expect(program()).toEqual([
    [0, 'A'],
    [1, 'B'],
    [2, 'C'],
    [3, 'D'],
  ])
})

it('should be possible to zip data together from a generator', () => {
  let program = pipe(range(0, 1_000), chunk(4), take(5), zip(), take(5), toArray())

  expect(program()).toEqual([
    [0, 4, 8, 12, 16],
    [1, 5, 9, 13, 17],
    [2, 6, 10, 14, 18],
    [3, 7, 11, 15, 19],
  ])
})

it('should drop non matchable values', () => {
  // If array A has 3 items and array B has 4 items, the last item of array B
  // will be dropped.
  let program = pipe(
    [
      [0, 1, 2, 3],
      ['A', 'B', 'C'],
    ],
    zip(),
    toArray()
  )

  expect(program()).toEqual([
    [0, 'A'],
    [1, 'B'],
    [2, 'C'],
  ])
})

it('should be chainable with a take so that only a few items are zipped', () => {
  let program = pipe(
    [
      [0, 1, 2, 3],
      ['A', 'B', 'C'],
    ],
    zip(),
    take(2),
    toArray()
  )

  expect(program()).toEqual([
    [0, 'A'],
    [1, 'B'],
  ])
})

it('should zip multiple iterators together', () => {
  let program = pipe([range(0, 999), range(999, 0)], zip(), take(5), toArray())

  expect(program()).toEqual([
    [0, 999],
    [1, 998],
    [2, 997],
    [3, 996],
    [4, 995],
  ])
})
