import { pipe } from './pipe';
import { map } from './map';
import { toArray } from './toArray';

it('should be possible to map data from A to B', () => {
  const program = pipe(
    map((x: number) => x * 2), // Double
    toArray()
  );

  expect(program([1, 2, 3])).toEqual([2, 4, 6]);
});
