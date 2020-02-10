import { pipe } from './pipe';
import { takeWhile } from './takeWhile';
import { range } from './range';

it('should be possible to take values as long as they meet a certain condition', () => {
  const program = pipe(
    takeWhile((x: number) => x < 5),
    Array.from
  );

  expect(program(range(0, 1_000))).toEqual([0, 1, 2, 3, 4]);
});
