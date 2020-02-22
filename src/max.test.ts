import { pipe } from './pipe';
import { range } from './range';
import { max } from './max';
import { delay } from './delay';

it('should find the max value of the iterator', () => {
  const program = pipe(range(5, 10), max());

  expect(program()).toEqual(10);
});

it('should find the max value of the iterator (async)', async () => {
  const program = pipe(range(5, 10), delay(0), max());

  expect(await program()).toEqual(10);
});
