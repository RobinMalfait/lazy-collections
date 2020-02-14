import { pipe } from './pipe';
import { range } from './range';
import { toArray } from './toArray';
import { skip } from './skip';
import { take } from './take';

it('should skip x values', () => {
  const program = pipe(skip(5), toArray());

  expect(program(range(0, 10))).toEqual([5, 6, 7, 8, 9, 10]);
});

it('should skip x values and take y values', () => {
  const program = pipe(skip(5), take(3), toArray());

  expect(program(range(0, 10))).toEqual([5, 6, 7]);
});
