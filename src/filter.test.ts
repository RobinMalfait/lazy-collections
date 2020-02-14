import { pipe } from './pipe';
import { filter } from './filter';
import { toArray } from './toArray';

it('should be possible to filter data', () => {
  const program = pipe(
    filter((x: number) => x % 2 === 0), // Is even
    toArray()
  );

  expect(program([1, 2, 3])).toEqual([2]);
});
