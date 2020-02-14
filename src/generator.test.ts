import { pipe } from './pipe';
import { generate } from './generate';
import { slice } from './slice';
import { range } from './range';
import { take } from './take';
import { toArray } from './toArray';

it('should be possible to create a stream using the generate function', () => {
  const program = pipe(slice(0, 10), toArray());

  let i = 0;
  expect(program(generate(() => i++))).toEqual(Array.from(range(0, 10)));
});

it('should be possible to create a fibonacci iterator', () => {
  const fibonacci = pipe(
    generate(
      (function() {
        let x = 1;
        let y = 1;

        return () => {
          let previous = x;
          x = y;
          y += previous;
          return previous;
        };
      })()
    ),
    take(10),
    toArray()
  );
  expect(fibonacci()).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
});
