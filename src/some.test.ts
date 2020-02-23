import { pipe } from './pipe';
import { range } from './range';
import { some } from './some';
import { delay } from './delay';

it('should return true when some value matches the predicate', () => {
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

it('should return true when some value matches the predicate (async)', async () => {
  const program = pipe(
    delay(0),
    some(x => x === 12)
  );

  expect(await program(range(0, 25))).toEqual(true);
  expect(await program(range(0, 25))).toEqual(true);
});

it('should return false when non of the values match the predicate (async)', async () => {
  const program = pipe(
    delay(0),
    some((x: number) => x > 100)
  );

  expect(await program(range(0, 100))).toEqual(false);
  expect(await program(range(0, 100))).toEqual(false);
});

it('should return true when some value matches the predicate (Promise async)', async () => {
  const program = pipe(some(x => x === 12));

  expect(await program(Promise.resolve(range(0, 25)))).toEqual(true);
  expect(await program(Promise.resolve(range(0, 25)))).toEqual(true);
});

it('should return false when non of the values match the predicate (Promise async)', async () => {
  const program = pipe(some((x: number) => x > 100));

  expect(await program(Promise.resolve(range(0, 100)))).toEqual(false);
  expect(await program(Promise.resolve(range(0, 100)))).toEqual(false);
});
