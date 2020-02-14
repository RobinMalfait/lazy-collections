import { pipe } from './pipe';
import { range } from './range';
import { head, first } from './head';

it('should return the first element of the iterator', () => {
  const program = pipe(range(20, 25), head());

  expect(program()).toEqual(20);
});

it('should return the first element of the iterator (using an alias)', () => {
  const program = pipe(range(20, 25), first());

  expect(program()).toEqual(20);
});

it('should return undefined when there is no data', () => {
  const program = pipe(first());

  expect(program()).toEqual(undefined);
});

it('should return undefined when there is an empty array', () => {
  const program = pipe(first());

  expect(program([])).toEqual(undefined);
});
