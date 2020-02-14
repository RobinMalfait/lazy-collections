import { pipe } from './pipe';
import { range } from './range';
import { findIndex } from './findIndex';
import { map } from './map';

it('should find the index based on the predicate', () => {
  const program = pipe(
    range(0, 25),
    map((x: number) => String.fromCharCode(x + 65)),
    findIndex(x => x === 'T')
  );

  expect(program()).toEqual('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf('T'));
});

it('should return -1 when the index is not found', () => {
  const program = pipe(
    range(0, 100),
    findIndex(x => x === 101)
  );

  expect(program()).toEqual(-1);
});
