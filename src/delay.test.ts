import { pipe } from './pipe'
import { range } from './range'
import { delay } from './delay'
import { map } from './map'
import { every } from './every'
import { tap } from './tap'
import { chunk } from './chunk'

it('should delay each value by 100ms', async () => {
  let counter = jest.fn()

  let program = pipe(
    // Create a range of 6 values.
    range(0, 5),

    // Delay each value with 100ms.
    delay(100),

    // Map each value to the current date.
    map(() => Date.now()),

    // Call the counter, just to be sure that we actually saw 6 values.
    tap(() => counter()),

    // Group values per 2, this way we can compare the difference between them.
    chunk(2),

    // Map the chunked values to the difference between the two values.
    map(([a, b]: [number, number]) => b - a),

    // Verify that the diff is 100ms or more, this way we can validate that
    // there has been a delay of 100ms at minimum.
    every((diff: number) => diff >= 100)
  )

  let result = await program()

  expect(result).toBe(true)
  expect(counter).toHaveBeenCalledTimes(6)
})
