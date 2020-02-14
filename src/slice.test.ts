import { pipe } from './pipe';
import { range } from './range';
import { slice } from './slice';
import { toArray } from './toArray';

it.each([
  [0, 10, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
  [4, 6, [4, 5, 6]],
])('should be to slice from %p until %p', (start, end, expected) => {
  const program = pipe(slice(start, end), toArray());

  expect(program(range(0, 1_000_000_000))).toEqual(expected);
});
