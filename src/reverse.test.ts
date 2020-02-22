import { pipe } from './pipe';
import { range } from './range';
import { toArray } from './toArray';
import { take } from './take';
import { reverse } from './reverse';
import { delay } from './delay';

it('should be possible to reverse an iterator', () => {
  const program = pipe(range(0, 1_000), reverse(), take(5), toArray());

  expect(program()).toEqual([
    1_000,
    1_000 - 1,
    1_000 - 2,
    1_000 - 3,
    1_000 - 4,
  ]);
});

it('should be possible to reverse an iterator (async)', async () => {
  const program = pipe(
    range(0, 1_000),
    delay(0),
    reverse(),
    take(5),
    toArray()
  );

  expect(await program()).toEqual([
    1_000,
    1_000 - 1,
    1_000 - 2,
    1_000 - 3,
    1_000 - 4,
  ]);
});

it('should be possible to reverse an iterator (Promise async)', async () => {
  const program = pipe(
    Promise.resolve(range(0, 1_000)) as any,
    reverse(),
    take(5),
    toArray()
  );

  expect(await program()).toEqual([
    1_000,
    1_000 - 1,
    1_000 - 2,
    1_000 - 3,
    1_000 - 4,
  ]);
});
