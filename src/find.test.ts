import { pipe } from './pipe';
import { range } from './range';
import { find } from './find';

it('should find a value in the stream', () => {
  const program = pipe(
    range(0, 100),
    find(x => x === 2)
  );

  expect(program()).toEqual(2);
});

it('should return undefined when the value is not found', () => {
  const program = pipe(
    range(0, 100),
    find(x => x === 101)
  );

  expect(program()).toEqual(undefined);
});
