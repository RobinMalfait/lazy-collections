import { pipe } from './pipe';
import { generate } from './generate';
import { take } from './take';

it('should be possible to pipe multiple functions', () => {
  const program = pipe(
    (a: number, b: number) => `fn1(${a}, ${b})`,
    (a: string) => `fn2(${a})`,
    (a: string) => `fn3(${a})`
  );

  expect(program(2, 3)).toEqual('fn3(fn2(fn1(2, 3)))');
});

it('should be possible to pass a generator as first argument', () => {
  const program = pipe(generate(Math.random), take(10), Array.from);
  const result = program();
  expect(result).toHaveLength(10);
});
