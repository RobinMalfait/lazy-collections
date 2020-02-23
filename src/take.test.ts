import { pipe } from './pipe';
import { range } from './range';
import { take } from './take';
import { toArray } from './toArray';
import { delay } from './delay';

it('should take a only X values', () => {
  const program = pipe(take(5), toArray());

  expect(program(range(0, 1_000))).toEqual([0, 1, 2, 3, 4]);
});

it('should take a only X values (async)', async () => {
  const program = pipe(delay(0), take(5), toArray());

  expect(await program(range(0, 1_000))).toEqual([0, 1, 2, 3, 4]);
});

it('should take a only X values (Promise async)', async () => {
  const program = pipe(take(5), toArray());

  expect(await program(Promise.resolve(range(0, 1_000)))).toEqual([
    0,
    1,
    2,
    3,
    4,
  ]);
});
