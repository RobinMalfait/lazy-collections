import { pipe } from './pipe';
import { range } from './range';
import { toArray } from './toArray';
import { delay } from './delay';

it('should convert an iterator to an array', () => {
  const program = pipe(range(0, 10), toArray());

  expect(program()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

it('should convert an iterator to an array (async)', async () => {
  const program = pipe(range(0, 10), delay(0), toArray());

  expect(await program()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

it('should convert an iterator to an array (Promise async)', async () => {
  const program = pipe(Promise.resolve(range(0, 10)), toArray());

  expect(await program()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
