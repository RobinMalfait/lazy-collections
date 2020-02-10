import { reduce } from './reduce';

it('should be possible to sum numbers (via reduce)', () => {
  const program = reduce((total, current) => total + current, 0);
  expect(program([1, 2, 3])).toEqual(6);
});
