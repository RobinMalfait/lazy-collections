import { pipe } from './pipe';
import { range } from './range';
import { chunk } from './chunk';
import { toArray } from './toArray';
import { delay } from './delay';

it('should create chunked items', () => {
  const program = pipe(chunk(3), toArray());

  expect(program(range(0, 10))).toEqual([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10],
  ]);
  expect(program(range(0, 10))).toEqual([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10],
  ]);
});

it('should create chunked items (async)', async () => {
  const program = pipe(delay(0), chunk(3), toArray());

  expect(await program(range(0, 10))).toEqual([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10],
  ]);
  expect(await program(range(0, 10))).toEqual([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10],
  ]);
});
