import { pipe } from './pipe';
import { range } from './range';
import { min } from './min';

it('should find the min value of the iterator', () => {
  const program = pipe(range(5, 10), min());

  expect(program()).toEqual(5);
});
