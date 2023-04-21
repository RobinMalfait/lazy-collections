import * as fc from 'fast-check'
import { range, take, pipe, chunk } from './'

it('should create a range', () => {
  let program = pipe(take(10), chunk(2))

  fc.assert(
    fc.property(
      fc.integer(), // Lowerbound
      fc.integer(), // Upperbound
      fc.oneof(fc.integer(), fc.constant(undefined)), // Step
      (lowerbound, upperbound, step) => {
        let data = program(range(lowerbound, upperbound, step))

        // Verify that it generates an ordered list, ascending or descending
        for (let chunk of data) {
          if (chunk.length === 2) {
            let [a, b] = chunk
            if (step === undefined) {
              // We should default to a step of 1
              expect(Math.abs(a - b)).toBe(1)
            } else {
              // We should verify that 2 values next to eachother are a step away
              expect(Math.abs(a - b)).toBe(Math.abs(step))
            }
          }
        }
      }
    )
  )
})
