import { pipe } from './pipe';
import { range } from './range';
import { take } from './take';
import { toArray } from './toArray';

it('should take a only X values', () => {
  const program = pipe(take(5), toArray());

  expect(program(range(0, 1_000))).toEqual([0, 1, 2, 3, 4]);
});
