import { pipe, range, toArray, take, reverse, delay } from './'

it('should be possible to reverse an iterator', () => {
  let program = pipe(range(0, 100), reverse(), take(5), toArray())

  expect(program()).toEqual([100, 100 - 1, 100 - 2, 100 - 3, 100 - 4])
})

it('should be possible to reverse an iterator (async)', async () => {
  let program = pipe(range(0, 100), delay(0), reverse(), take(5), toArray())

  expect(await program()).toEqual([100, 100 - 1, 100 - 2, 100 - 3, 100 - 4])
})

it('should be possible to reverse an iterator (Promise async)', async () => {
  let program = pipe(Promise.resolve(range(0, 100)), reverse(), take(5), toArray())

  expect(await program()).toEqual([100, 100 - 1, 100 - 2, 100 - 3, 100 - 4])
})
