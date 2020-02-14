import { pipe, generate, take, toArray } from '..';

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

fibonacci(); // [ 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 ]
