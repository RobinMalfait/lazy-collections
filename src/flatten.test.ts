import { pipe } from './pipe';
import { flatten } from './flatten';
import { range } from './range';

it('should be possible to flatten data', () => {
  const program = pipe(flatten(), Array.from);

  expect(program([1, [2], range(3, 10)])).toEqual(Array.from(range(1, 10)));
});

it('should be possible to deep flatten data', () => {
  const program = pipe(flatten({ deep: true }), Array.from);

  expect(program([1, [2, [3, [[[4]], [5]]]]])).toEqual(Array.from(range(1, 5)));
});
