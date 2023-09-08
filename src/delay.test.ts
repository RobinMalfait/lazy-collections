import { pipe, range, delay, map, every, tap } from './'

it('should delay each value by 50ms', async () => {
  let DELAY = 50
  let counter = jest.fn()

  let first: number | null = null

  let program = pipe(
    // Create a range of 6 values.
    range(0, 5),

    // Delay each value with 100ms.
    delay(DELAY),

    // Map each value to the current date.
    map(() => {
      if (first === null) {
        first = Date.now()
      }

      return Date.now() - first
    }),

    // Call the counter, just to be sure that we actually saw 6 values.
    tap(() => counter()),

    // Ensure that each item took at least DELAY ms to be processed, and can't exceed DELAY * 2.
    // This also ensures that they are truly handled sequentially.
    every((current: number, i) => current >= DELAY * i && current <= DELAY * (i + 1))
  )

  let result = await program()

  expect(result).toBe(true)
  expect(counter).toHaveBeenCalledTimes(6)
})
