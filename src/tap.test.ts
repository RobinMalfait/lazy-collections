import { pipe, toArray, range, delay, tap } from './'

it('should be possible to tap into the current sequence', () => {
  let fn = jest.fn()
  let program = pipe(
    range(0, 5),
    tap((value) => {
      fn(value)
    }),
    toArray()
  )

  expect(program()).toEqual([0, 1, 2, 3, 4, 5])
  expect(fn).toHaveBeenCalledTimes(6)
})

it('should be possible to tap into the current sequence (async)', async () => {
  let fn = jest.fn()
  let program = pipe(
    range(0, 5),
    delay(0),
    tap((value) => {
      fn(value)
    }),
    toArray()
  )

  expect(await program()).toEqual([0, 1, 2, 3, 4, 5])
  expect(fn).toHaveBeenCalledTimes(6)
})

it('should be possible to tap into the current sequence (Promise async)', async () => {
  let fn = jest.fn()
  let program = pipe(
    Promise.resolve(range(0, 5)),
    tap((value) => {
      fn(value)
    }),
    toArray()
  )

  expect(await program()).toEqual([0, 1, 2, 3, 4, 5])
  expect(fn).toHaveBeenCalledTimes(6)
})

it('should take the index as second argument', async () => {
  let fn = jest.fn()
  let program = pipe(
    Promise.resolve(range(0, 5)),
    tap((_value, index) => {
      fn(index)
    }),
    toArray()
  )

  expect(await program()).toEqual([0, 1, 2, 3, 4, 5])
  expect(fn).toHaveBeenCalledTimes(6)
})
