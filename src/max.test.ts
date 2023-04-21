import { pipe, range, max, delay } from './'

it('should find the max value of the iterator', () => {
  let program = pipe(range(5, 10), max())

  expect(program()).toEqual(10)
})

it('should find the max value of the iterator (async)', async () => {
  let program = pipe(range(5, 10), delay(0), max())

  expect(await program()).toEqual(10)
})
