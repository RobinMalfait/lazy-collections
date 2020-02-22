import { pipe } from './pipe';
import { range } from './range';
import { toArray } from './toArray';
import { partition } from './partition';
import { delay } from './delay';

it('should partition the data into 2 streams based on the predicate', () => {
  const program = pipe(
    range(1, 4),
    partition((x: number) => x % 2 !== 0),
    toArray()
  );

  expect(program()).toEqual([
    [1, 3],
    [2, 4],
  ]);
});

it('should partition the data into 2 streams based on the predicate (async)', async () => {
  const program = pipe(
    range(1, 4),
    delay(0),
    partition((x: number) => x % 2 !== 0),
    toArray()
  );

  expect(await program()).toEqual([
    [1, 3],
    [2, 4],
  ]);
});

it('should partition the data into 2 streams based on the predicate (Promise async)', async () => {
  const program = pipe(
    Promise.resolve(range(1, 4)) as any,
    partition((x: number) => x % 2 !== 0),
    toArray()
  );

  expect(await program()).toEqual([
    [1, 3],
    [2, 4],
  ]);
});
