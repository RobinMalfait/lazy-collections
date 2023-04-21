import { pipe, generate, take, range, toArray } from './'

it('should be possible to pipe multiple functions', () => {
  let program = pipe(
    (a: number, b: number) => `fn1(${a}, ${b})`,
    (a: string) => `fn2(${a})`,
    (a: string) => `fn3(${a})`
  )

  expect(program(2, 3)).toEqual('fn3(fn2(fn1(2, 3)))')
})

it('should be possible to pass a generator as first argument', () => {
  let program = pipe(generate(Math.random), take(10), toArray())
  let result = program()
  expect(result).toHaveLength(10)
})

it('should be possible to pass a generator as only argument', () => {
  let program = pipe(range(0, 10))
  let result = program()
  expect(Array.from(result)).toHaveLength(11)
})
