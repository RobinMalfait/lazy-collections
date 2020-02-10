import { compose } from './compose';

it('should be possible to compose multiple functions', () => {
  const program = compose(
    (a: string) => `fn1(${a})`,
    (a: string) => `fn2(${a})`,
    (a: number, b: number) => `fn3(${a}, ${b})`
  );

  expect(program(2, 3)).toEqual('fn1(fn2(fn3(2, 3)))');
});
