import { pipe, range, findIndex, map, delay } from './'

it('should find the index based on the predicate', () => {
  let program = pipe(
    map((x: number) => String.fromCharCode(x + 65)),
    findIndex((x) => x === 'T')
  )

  expect(program(range(0, 25))).toEqual('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf('T'))
  expect(program(range(0, 25))).toEqual('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf('T'))
})

it('should return -1 when the index is not found', () => {
  let program = pipe(findIndex((x) => x === 101))

  expect(program(range(0, 100))).toEqual(-1)
  expect(program(range(0, 100))).toEqual(-1)
})

it('should find the index based on the predicate (async)', async () => {
  let program = pipe(
    delay(0),
    map((x: number) => String.fromCharCode(x + 65)),
    findIndex((x) => x === 'T')
  )

  expect(await program(range(0, 25))).toEqual('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf('T'))
  expect(await program(range(0, 25))).toEqual('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf('T'))
})

it('should return -1 when the index is not found (async)', async () => {
  let program = pipe(
    delay(0),
    findIndex((x) => x === 101)
  )

  expect(await program(range(0, 100))).toEqual(-1)
  expect(await program(range(0, 100))).toEqual(-1)
})

it('should find the index based on the predicate (Promise async)', async () => {
  let program = pipe(
    map((x: number) => String.fromCharCode(x + 65)),
    findIndex((x) => x === 'T')
  )

  expect(await program(Promise.resolve(range(0, 25)))).toEqual(
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf('T')
  )
  expect(await program(Promise.resolve(range(0, 25)))).toEqual(
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf('T')
  )
})

it('should return -1 when the index is not found (Promise async)', async () => {
  let program = pipe(findIndex((x) => x === 101))

  expect(await program(Promise.resolve(range(0, 100)))).toEqual(-1)
  expect(await program(Promise.resolve(range(0, 100)))).toEqual(-1)
})

it('should take the index as second argument', async () => {
  let program = pipe(findIndex((_x: number, i) => i === 50))

  expect(await program(Promise.resolve(range(0, 100)))).toEqual(50)
  expect(await program(Promise.resolve(range(0, 100)))).toEqual(50)
})
