import { pipe } from './pipe';
import { range } from './range';
import { max } from './max';

it('should find the max value of the iterator', () => {
  const program = pipe(range(5, 10), max());

  expect(program()).toEqual(10);
});
