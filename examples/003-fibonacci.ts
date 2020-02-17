import { pipe, generate, take, toArray } from '..';

function createFibonacciGenerator() {
  let x = 1;
  let y = 1;

  return () => {
    let previous = x;
    [x, y] = [y, x + y];
    return previous;
  };
}

function fibonacci(x: number) {
  return pipe(generate(createFibonacciGenerator()), take(x), toArray())();
}

fibonacci(10); // [ 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 ]
