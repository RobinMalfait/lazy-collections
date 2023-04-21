import { pipe, range, find, delay } from './'

it('should find a value in the stream', () => {
  let program = pipe(find((x) => x === 2))

  expect(program(range(0, 100))).toEqual(2)
  expect(program(range(0, 100))).toEqual(2)
})

it('should return undefined when the value is not found', () => {
  let program = pipe(find((x) => x === 101))

  expect(program(range(0, 100))).toEqual(undefined)
  expect(program(range(0, 100))).toEqual(undefined)
})

it('should find a value in the stream (async)', async () => {
  let program = pipe(
    delay(0),
    find((x) => x === 2)
  )

  expect(await program(range(0, 100))).toEqual(2)
  expect(await program(range(0, 100))).toEqual(2)
})

it('should return undefined when the value is not found (async)', async () => {
  let program = pipe(
    delay(0),
    find((x) => x === 101)
  )

  expect(await program(range(0, 100))).toEqual(undefined)
  expect(await program(range(0, 100))).toEqual(undefined)
})

it('should find a value in the stream (Promise async)', async () => {
  let program = pipe(find((x) => x === 2))

  expect(await program(Promise.resolve(range(0, 100)))).toEqual(2)
  expect(await program(Promise.resolve(range(0, 100)))).toEqual(2)
})

it('should return undefined when the value is not found (Promise async)', async () => {
  let program = pipe(find((x) => x === 101))

  expect(await program(Promise.resolve(range(0, 100)))).toEqual(undefined)
  expect(await program(Promise.resolve(range(0, 100)))).toEqual(undefined)
})

it('should take the index as second argument', async () => {
  let program = pipe(find((_x: number, i) => i === 50))

  expect(await program(Promise.resolve(range(0, 100)))).toEqual(50)
  expect(await program(Promise.resolve(range(0, 100)))).toEqual(50)
})
