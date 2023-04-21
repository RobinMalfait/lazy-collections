import { pipe, batch, map, wait, toArray, generate, take, chunk, average } from './'

async function bench(cb: Function) {
  let start = process.hrtime.bigint()
  await cb()
  let end = process.hrtime.bigint()
  return Number((end - start) / BigInt(1e6)) // Nanoseconds to milliseconds
}

it('should batch async operations', async () => {
  let DELAY = 50
  function fetch(resultResolver: Function) {
    return new Promise((resolve) => setTimeout(() => resolve(resultResolver()), DELAY))
  }

  let start = Date.now()
  let program = pipe(
    generate(() => null), // Generate a forever stream
    take(10), // Only take 10 items
    map<string, unknown>(() => fetch(() => Date.now())),
    batch(4), // batch in groups of 4
    wait(), // This is important, otherwise we will resolve to an array of promises
    map<number, number>((value) => value - start), // Diff compared to when we started
    chunk(4), // Group each chunk of 4 items again
    toArray()
  )

  let avg = pipe(average())

  let [a, b, c] = await program()

  // Each item of each chunk should be really close together, whereas the next group should be
  // further apart from the previous one.
  expect(avg(a)).toBeGreaterThanOrEqual(DELAY * 1)
  expect(avg(a)).toBeLessThan(DELAY * 2)

  expect(avg(b)).toBeGreaterThanOrEqual(DELAY * 2)
  expect(avg(b)).toBeLessThan(DELAY * 3)

  expect(avg(c)).toBeGreaterThanOrEqual(DELAY * 3)
  expect(avg(c)).toBeLessThan(DELAY * 4)
})

it('should be possible to batch load an API call for example (from sync -> async)', async () => {
  function fetch(path: string) {
    return new Promise((resolve) => setTimeout(resolve, 50, path))
  }

  let program = pipe(
    map((id) => `/user/${id}`),
    map<string, unknown>((path) => fetch(path)),
    batch(4),
    wait(), // This is important, otherwise we will resolve to an array of promises
    toArray()
  )

  let diff = await bench(() => {
    return expect(program([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).resolves.toEqual([
      '/user/1',
      '/user/2',
      '/user/3',
      '/user/4',
      '/user/5',
      '/user/6',
      '/user/7',
      '/user/8',
      '/user/9',
      '/user/10',
    ])
  })

  // Because we should at least wait 150ms per call, because we create batches of 4. In this case
  // that means that we create this structure basically:
  //
  // [ [ 50ms, 50ms, 50ms, 50ms ], [ 50ms, 50ms, 50ms, 50ms ], [ 50ms ] ]
  //
  // Each group will at least take 50ms, and since we end up with 3 groups we should wait at least
  // 150ms
  expect(diff).toBeGreaterThanOrEqual(150)

  // If batch() was not there, then it would take ~500ms, so to verify that we did made some
  // "parallel" calls we can check if it is way smaller than that.
  expect(diff).toBeLessThanOrEqual(200)

  let diff2 = await bench(() => {
    return expect(program([1, 2, 3, 4, 5])).resolves.toEqual([
      '/user/1',
      '/user/2',
      '/user/3',
      '/user/4',
      '/user/5',
    ])
  })

  expect(diff2).toBeGreaterThanOrEqual(100)
  expect(diff2).toBeLessThanOrEqual(150)
})
