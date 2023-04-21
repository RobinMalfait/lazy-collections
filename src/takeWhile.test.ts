import { pipe, takeWhile, range, toArray, delay } from './'

it('should be possible to take values as long as they meet a certain condition', () => {
  let program = pipe(
    takeWhile((x: number) => x < 5),
    toArray()
  )

  expect(program(range(0, 1_000))).toEqual([0, 1, 2, 3, 4])
})

it('should be possible to take values as long as they meet a certain condition (async)', async () => {
  let program = pipe(
    delay(0),
    takeWhile((x: number) => x < 5),
    toArray()
  )

  expect(await program(range(0, 1_000))).toEqual([0, 1, 2, 3, 4])
})

it('should be possible to take values as long as they meet a certain condition (Promise async)', async () => {
  let program = pipe(
    takeWhile((x: number) => x < 5),
    toArray()
  )

  expect(await program(Promise.resolve(range(0, 1_000)))).toEqual([0, 1, 2, 3, 4])
})

it('should take the index as second argument', async () => {
  let program = pipe(
    takeWhile((_x: number, i) => i < 5),
    toArray()
  )

  expect(await program(Promise.resolve(range(0, 1_000)))).toEqual([0, 1, 2, 3, 4])
})
