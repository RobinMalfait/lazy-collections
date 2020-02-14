import { pipe } from './pipe';
import { range } from './range';
import { some } from './some';

it('should return true when some value matches the predicete', () => {
  const program = pipe(
    range(0, 25),
    some(x => x === 12)
  );

  expect(program()).toEqual(true);
});

it('should return false when non of the values match the predicate', () => {
  const program = pipe(
    range(0, 100),
    some((x: number) => x > 100)
  );

  expect(program()).toEqual(false);
});
