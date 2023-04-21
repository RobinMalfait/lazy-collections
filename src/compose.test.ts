import { compose, generate, take, range, toArray } from './'

it('should be possible to compose multiple functions', () => {
  let program = compose(
    (a: string) => `fn1(${a})`,
    (a: string) => `fn2(${a})`,
    (a: number, b: number) => `fn3(${a}, ${b})`
  )

  expect(program(2, 3)).toEqual('fn1(fn2(fn3(2, 3)))')
})

it('should be possible to pass a generator as first argument', () => {
  let program = compose(toArray(), take(10), generate(Math.random))
  let result = program()
  expect(result).toHaveLength(10)
})

it('should be possible to pass a generator as only argument', () => {
  let program = compose(range(0, 10))
  let result = program()
  expect(Array.from(result)).toHaveLength(11)
})
