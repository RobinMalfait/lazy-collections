import { pipe } from './pipe';
import { takeWhile } from './takeWhile';
import { range } from './range';
import { toArray } from './toArray';

it('should be possible to take values as long as they meet a certain condition', () => {
  const program = pipe(
    takeWhile((x: number) => x < 5),
    toArray()
  );

  expect(program(range(0, 1_000))).toEqual([0, 1, 2, 3, 4]);
});
