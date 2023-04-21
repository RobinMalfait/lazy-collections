import { pipe, flatten, range, toArray, delay } from './'

it('should be possible to flatten data (shallow)', () => {
  let program = pipe(flatten({ shallow: true }), toArray())

  expect(program([1, [2], range(3, 10)])).toEqual(Array.from(range(1, 10)))
  expect(program([1, [2], range(3, 10)])).toEqual(Array.from(range(1, 10)))
})

it('should be possible to deep flatten data', () => {
  let program = pipe(flatten(), toArray())

  expect(program([1, [2, [3, [[[4]], [5]]]]])).toEqual(Array.from(range(1, 5)))
  expect(program([1, [2, [3, [[[4]], [5]]]]])).toEqual(Array.from(range(1, 5)))
})

it('should be possible to deep flatten data (async)', async () => {
  let program = pipe(delay(0), flatten(), toArray())

  expect(await program([1, [2, [3, [[[4]], [5]]]]])).toEqual(Array.from(range(1, 5)))
  expect(await program([1, [2, [3, [[[4]], [5]]]]])).toEqual(Array.from(range(1, 5)))
})

it('should be possible to deep flatten data (Promise async)', async () => {
  let program = pipe(flatten(), toArray())

  expect(await program(Promise.resolve([1, [2, [3, [[[4]], [5]]]]]))).toEqual(
    Array.from(range(1, 5))
  )
  expect(await program(Promise.resolve([1, [2, [3, [[[4]], [5]]]]]))).toEqual(
    Array.from(range(1, 5))
  )
})
