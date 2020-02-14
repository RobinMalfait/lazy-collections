import { pipe } from './pipe';
import { concat } from './concat';
import { range } from './range';
import { toArray } from './toArray';

it('should concat arrays', () => {
  const program = pipe(
    concat([0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10]),
    toArray()
  );

  expect(program()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

it('should concat iterators', () => {
  const program = pipe(
    concat(range(0, 3), range(4, 7), range(8, 10)),
    toArray()
  );

  expect(program()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
