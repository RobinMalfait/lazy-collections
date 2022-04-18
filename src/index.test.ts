import * as lazy from '.'

it('should export all the things', () => {
  expect(lazy).toMatchSnapshot()
})

it('should be possible to create a chain of actions and combine them in a nice stream', () => {
  let program = lazy.pipe(
    // Triple
    lazy.map((x: number) => x * 3),

    // Even
    lazy.filter((x: number) => x % 2 === 0),

    // Take only the ones below 100 000
    lazy.takeWhile((x: number) => x < 100_000),

    // Take the first 10
    lazy.take(10),

    // To array
    lazy.toArray
  )

  expect(program(lazy.range(1_000, 1_000_000))).toEqual([
    3000,
    3006,
    3012,
    3018,
    3024,
    3030,
    3036,
    3042,
    3048,
    3054,
  ])
})
