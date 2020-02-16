import { pipe } from './pipe';
import { range } from './range';
import { toArray } from './toArray';
import { partition } from './partition';

it('should partition the data into 2 streams based on the predicate', () => {
  const program = pipe(
    range(1, 4),
    partition((x: number) => x % 2 !== 0),
    toArray()
  );

  expect(program()).toEqual([
    [1, 3],
    [2, 4],
  ]);
});
