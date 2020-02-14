import { pipe } from './pipe';
import { range } from './range';
import { every } from './every';

it('should return true when every value matches the predicete', () => {
  const program = pipe(
    range(0, 25),
    every(x => typeof x === 'number')
  );

  expect(program()).toEqual(true);
});

it("should return false when one of the values doesn't meet the predicate", () => {
  const program = pipe(
    range(0, 100),
    every((x: number) => x < 100) // 100 is not less than 100
  );

  expect(program()).toEqual(false);
});
