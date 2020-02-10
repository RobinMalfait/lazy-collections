import { pipe } from './pipe';

it('should be possible to pipe multiple functions', () => {
  const program = pipe(
    (a: number, b: number) => `fn1(${a}, ${b})`,
    (a: string) => `fn2(${a})`,
    (a: string) => `fn3(${a})`,
  );

  expect(program(2, 3)).toEqual('fn3(fn2(fn1(2, 3)))');
});
