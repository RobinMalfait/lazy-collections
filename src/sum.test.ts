import { pipe } from './pipe';
import { sum } from './sum';
import { range } from './range';

it('should be possible to sum an array', () => {
  const program = pipe(sum());

  expect(program([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual(55);
  expect(program([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual(55);
});

it('should be possible to sum an iterator', () => {
  const program = pipe(sum());

  expect(program(range(0, 10))).toEqual(55);
  expect(program(range(0, 10))).toEqual(55);
});
