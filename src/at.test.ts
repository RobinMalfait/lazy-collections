import { pipe, range, at, map, delay } from './'

it('should return the element at the given index', () => {
  let program = pipe(
    map((x: number) => String.fromCharCode(x + 65)),
    at(25)
  )

  expect(program(range(0, 25))).toBe('Z')
  expect(program(range(0, 25))).toBe('Z')
})

it('should return undefined when the given index is out of bounds', () => {
  let program = pipe(
    map((x: number) => String.fromCharCode(x + 65)),
    at(25)
  )

  expect(program(range(0, 24))).toBeUndefined()
  expect(program(range(0, 24))).toBeUndefined()
})

it('should return the element at the given index (negative)', () => {
  let program = pipe(
    map((x: number) => String.fromCharCode(x + 65)),
    at(-1)
  )

  expect(program(range(0, 25))).toBe('Z')
  expect(program(range(0, 25))).toBe('Z')
})

it('should return the element at the given index (async)', async () => {
  let program = pipe(
    delay(0),
    map((x: number) => String.fromCharCode(x + 65)),
    at(25)
  )

  expect(await program(range(0, 25))).toBe('Z')
  expect(await program(range(0, 25))).toBe('Z')
})

it('should return undefined when the given index is out of bounds (async)', async () => {
  let program = pipe(
    delay(0),
    map((x: number) => String.fromCharCode(x + 65)),
    at(25)
  )

  expect(await program(range(0, 24))).toBeUndefined()
  expect(await program(range(0, 24))).toBeUndefined()
})

it('should return the element at the given index (negative) (async)', async () => {
  let program = pipe(
    delay(0),
    map((x: number) => String.fromCharCode(x + 65)),
    at(-1)
  )

  expect(await program(range(0, 25))).toBe('Z')
  expect(await program(range(0, 25))).toBe('Z')
})

it('should return the element at the given index (Promise async)', async () => {
  let program = pipe(
    map((x: number) => String.fromCharCode(x + 65)),
    at(25)
  )

  expect(await program(Promise.resolve(range(0, 25)))).toBe('Z')
  expect(await program(Promise.resolve(range(0, 25)))).toBe('Z')
})

it('should return undefined when the given index is out of bounds (Promise async)', async () => {
  let program = pipe(at(25))

  expect(await program(Promise.resolve(range(0, 24)))).toBeUndefined()
  expect(await program(Promise.resolve(range(0, 24)))).toBeUndefined()
})

it('should return the element at the given index (negative) (Promise async)', async () => {
  let program = pipe(
    map((x: number) => String.fromCharCode(x + 65)),
    at(-1)
  )

  expect(await program(Promise.resolve(range(0, 25)))).toBe('Z')
  expect(await program(Promise.resolve(range(0, 25)))).toBe('Z')
})
