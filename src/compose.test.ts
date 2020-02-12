import { compose } from './compose';
import { generate } from './generate';
import { take } from './take';
import { range } from './range';

it('should be possible to compose multiple functions', () => {
  const program = compose(
    (a: string) => `fn1(${a})`,
    (a: string) => `fn2(${a})`,
    (a: number, b: number) => `fn3(${a}, ${b})`
  );

  expect(program(2, 3)).toEqual('fn1(fn2(fn3(2, 3)))');
});

it('should be possible to pass a generator as first argument', () => {
  const program = compose(Array.from, take(10), generate(Math.random));
  const result = program();
  expect(result).toHaveLength(10);
});

it('should be possible to pass a generator as only argument', () => {
  const program = compose(range(0, 10));
  const result = program();
  expect(Array.from(result)).toHaveLength(11);
});
