import { pipe, range, map, toArray, where, delay } from './'

it('should be possible to get the items containing certain properties', () => {
  let program = pipe(
    range(0, 10),
    map((x: number) => ({ x, y: x + 1 })),
    where({ x: 3, y: 4 }),
    toArray()
  )

  expect(program()).toEqual([{ x: 3, y: 4 }])
})

it('should not crash on values that it does not understand', () => {
  let program = pipe(where({ include: true }), toArray())

  expect(
    program([
      0,
      null,
      true,
      false,
      'hello',
      Object.assign(function () {}, { include: false }),
      { include: true, name: 'winner' },
    ])
  ).toEqual([{ include: true, name: 'winner' }])
})

it('should be possible to get the items containing certain magic properties like array lengths', () => {
  let program = pipe(
    range(0, 3),
    map((x: number) => [x, x]),
    where({ length: 2 }),
    toArray()
  )

  expect(program()).toEqual([
    [0, 0],
    [1, 1],
    [2, 2],
    [3, 3],
  ])
})

it('should be possible to get the items containing certain properties (async)', async () => {
  let program = pipe(
    range(0, 10),
    delay(0),
    map((x: number) => ({ x, y: x + 1 })),
    where({ x: 3, y: 4 }),
    toArray()
  )

  expect(await program()).toEqual([{ x: 3, y: 4 }])
})

it('should be possible to get the items containing certain magic properties like array lengths (async)', async () => {
  let program = pipe(
    range(0, 3),
    delay(0),
    map((x: number) => [x, x]),
    where({ length: 2 }),
    toArray()
  )

  expect(await program()).toEqual([
    [0, 0],
    [1, 1],
    [2, 2],
    [3, 3],
  ])
})

it('should be possible to get the items containing certain properties (Promise async)', async () => {
  let program = pipe(
    Promise.resolve(range(0, 10)),
    map((x: number) => ({ x, y: x + 1 })),
    where({ x: 3, y: 4 }),
    toArray()
  )

  expect(await program()).toEqual([{ x: 3, y: 4 }])
})

it('should be possible to get the items containing certain magic properties like array lengths (Promise async)', async () => {
  let program = pipe(
    Promise.resolve(range(0, 3)),
    map((x: number) => [x, x]),
    where({ length: 2 }),
    toArray()
  )

  expect(await program()).toEqual([
    [0, 0],
    [1, 1],
    [2, 2],
    [3, 3],
  ])
})
