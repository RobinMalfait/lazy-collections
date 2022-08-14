import { pipe } from './pipe'
import { range } from './range'
import { delay } from './delay'
import { map } from './map'
import { every } from './every'
import { tap } from './tap'

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
    every((current, i) => current >= DELAY * i && current <= DELAY * (i + 1))
  )

  let result = await program()

  expect(result).toBe(true)
  expect(counter).toHaveBeenCalledTimes(6)
})
