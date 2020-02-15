import { pipe } from './pipe';
import { average } from './average';

it('should be possible to get an average of all the values', () => {
  const program = pipe(average());

  expect(program([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual(5);
});
