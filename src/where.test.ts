import { pipe } from './pipe';
import { range } from './range';
import { map } from './map';
import { toArray } from './toArray';
import { where } from './where';
import { delay } from './delay';

it('should be possible to get the items containing certain properties', () => {
  const program = pipe(
    range(0, 10),
    map((x: number) => ({ x, y: x + 1 })),
    where({ x: 3, y: 4 }),
    toArray()
  );

  expect(program()).toEqual([{ x: 3, y: 4 }]);
});

it('should be possible to get the items containing certain magic properties like array lengths', () => {
  const program = pipe(
    range(0, 3),
    map((x: number) => [x, x]),
    where({ length: 2 }),
    toArray()
  );

  expect(program()).toEqual([
    [0, 0],
    [1, 1],
    [2, 2],
    [3, 3],
  ]);
});

it('should be possible to get the items containing certain properties (async)', async () => {
  const program = pipe(
    range(0, 10),
    delay(0),
    map((x: number) => ({ x, y: x + 1 })),
    where({ x: 3, y: 4 }),
    toArray()
  );

  expect(await program()).toEqual([{ x: 3, y: 4 }]);
});

it('should be possible to get the items containing certain magic properties like array lengths (async)', async () => {
  const program = pipe(
    range(0, 3),
    delay(0),
    map((x: number) => [x, x]),
    where({ length: 2 }),
    toArray()
  );

  expect(await program()).toEqual([
    [0, 0],
    [1, 1],
    [2, 2],
    [3, 3],
  ]);
});

it('should be possible to get the items containing certain properties (Promise async)', async () => {
  const program = pipe(
    Promise.resolve(range(0, 10)),
    map((x: number) => ({ x, y: x + 1 })),
    where({ x: 3, y: 4 }),
    toArray()
  );

  expect(await program()).toEqual([{ x: 3, y: 4 }]);
});

it('should be possible to get the items containing certain magic properties like array lengths (Promise async)', async () => {
  const program = pipe(
    Promise.resolve(range(0, 3)),
    map((x: number) => [x, x]),
    where({ length: 2 }),
    toArray()
  );

  expect(await program()).toEqual([
    [0, 0],
    [1, 1],
    [2, 2],
    [3, 3],
  ]);
});
