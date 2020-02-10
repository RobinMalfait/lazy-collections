import { pipe } from './pipe';
import { filter } from './filter';

it('should be possible to filter data', () => {
  const program = pipe(
    filter((x: number) => x % 2 === 0), // Is even
    Array.from
  );

  expect(program([1, 2, 3])).toEqual([2]);
});
