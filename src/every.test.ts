import { pipe } from './pipe';
import { range } from './range';
import { every } from './every';
import { delay } from './delay';

it('should return true when every value matches the predicate', () => {
  const program = pipe(
    range(0, 25),
    every(x => typeof x === 'number')
  );

  expect(program()).toEqual(true);
});

it('should return false when no stream is passing through it', () => {
  const program = pipe(every(x => typeof x === 'number'));

  expect(program()).toEqual(false);
});

it("should return false when one of the values doesn't meet the predicate", () => {
  const program = pipe(
    range(0, 100),
    every((x: number) => x < 100) // 100 is not less than 100
  );

  expect(program()).toEqual(false);
});

it('should return true when every value matches the predicate (async)', async () => {
  const program = pipe(
    delay(0),
    every(x => typeof x === 'number')
  );

  expect(await program(range(0, 25))).toEqual(true);
  expect(await program(range(0, 25))).toEqual(true);
});

it("should return false when one of the values doesn't meet the predicate (async)", async () => {
  const program = pipe(
    delay(0),
    every((x: number) => x < 100) // 100 is not less than 100
  );

  expect(await program(range(0, 100))).toEqual(false);
  expect(await program(range(0, 100))).toEqual(false);
});

it('should return true when every value matches the predicate (Promise async)', async () => {
  const program = pipe(every(x => typeof x === 'number'));

  expect(await program(Promise.resolve(range(0, 25)))).toEqual(true);
  expect(await program(Promise.resolve(range(0, 25)))).toEqual(true);
});

it("should return false when one of the values doesn't meet the predicate (Promise async)", async () => {
  const program = pipe(
    every((x: number) => x < 100) // 100 is not less than 100
  );

  expect(await program(Promise.resolve(range(0, 100)))).toEqual(false);
  expect(await program(Promise.resolve(range(0, 100)))).toEqual(false);
});

it('should take the index as second argument', async () => {
  const program = pipe(
    every((_x: number, i) => i < 100) // 100 is not less than 100
  );

  expect(await program(Promise.resolve(range(0, 100)))).toEqual(false);
  expect(await program(Promise.resolve(range(0, 100)))).toEqual(false);
});
