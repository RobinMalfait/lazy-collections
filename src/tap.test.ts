import { pipe } from './pipe';
import { toArray } from './toArray';
import { range } from './range';
import { tap } from './tap';

it('should be possible to tap into the current sequence', () => {
  const fn = jest.fn();
  const program = pipe(
    range(0, 5),
    tap(value => {
      fn(value);
    }),
    toArray()
  );

  expect(program()).toEqual([0, 1, 2, 3, 4, 5]);
  expect(fn).toHaveBeenCalledTimes(6);
});
