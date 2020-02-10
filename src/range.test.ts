import * as fc from 'fast-check';
import { range } from './range';
import { take } from './take';
import { pipe } from './pipe';

it('should create a range', () => {
  const program = pipe(take(1e3), Array.from);

  fc.assert(
    fc.property(
      fc.integer(), // Lowerbound
      fc.integer(), // Upperbound
      fc.oneof(fc.integer(), fc.constant(undefined)), // Step
      (lowerbound, upperbound, step) => {
        const data = program(range(lowerbound, upperbound, step));

        // Verify that it generates an ordered list, ascending or descending
        for (let idx = 1; idx < data.length; ++idx) {
          if (step === undefined) {
            if (lowerbound < upperbound) {
              expect(data[idx - 1]).toBeLessThan(data[idx]);
            } else {
              expect(data[idx - 1]).toBeGreaterThan(data[idx]);
            }
          } else {
            if (lowerbound < upperbound) {
              expect(data[idx - 1]).toBeLessThanOrEqual(data[idx]);
            } else {
              expect(data[idx - 1]).toBeGreaterThanOrEqual(data[idx]);
            }
          }
        }
      }
    )
  );
});
