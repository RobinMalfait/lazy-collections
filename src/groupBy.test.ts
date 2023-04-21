import { pipe, range, groupBy, delay } from './'

function snap(multitude: number, value: number) {
  return Math.ceil(value / multitude) * multitude
}

it('should be possible to group an iterator by something', () => {
  let program = pipe(
    range(0, 10),
    groupBy((x: number) => snap(5, x))
  )

  expect(program()).toEqual({
    0: [0],
    5: [1, 2, 3, 4, 5],
    10: [6, 7, 8, 9, 10],
  })
})

it('should be possible to group an iterator by something (async)', async () => {
  let program = pipe(
    range(0, 10),
    delay(0),
    groupBy((x: number) => snap(5, x))
  )

  expect(await program()).toEqual({
    0: [0],
    5: [1, 2, 3, 4, 5],
    10: [6, 7, 8, 9, 10],
  })
})

it('should be possible to group an iterator by something (Promise async)', async () => {
  let program = pipe(
    Promise.resolve(range(0, 10)),
    groupBy((x: number) => snap(5, x))
  )

  expect(await program()).toEqual({
    0: [0],
    5: [1, 2, 3, 4, 5],
    10: [6, 7, 8, 9, 10],
  })
})

it('should take the index as second argument', async () => {
  let program = pipe(
    Promise.resolve(range(0, 10)),
    groupBy((_x: number, i) => snap(5, i))
  )

  expect(await program()).toEqual({
    0: [0],
    5: [1, 2, 3, 4, 5],
    10: [6, 7, 8, 9, 10],
  })
})
