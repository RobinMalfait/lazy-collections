import { pipe, range, includes, map, delay } from './'

it('should return true when the search element is found', () => {
  let program = pipe(
    map((x: number) => String.fromCharCode(x + 65)),
    includes('Z')
  )

  expect(program(range(0, 25))).toBe(true)
  expect(program(range(0, 25))).toBe(true)
})

it('should return true when the search element is found and the search element is an edge case (NaN)', () => {
  let program = pipe(includes(NaN))

  expect(program([1, 2, 3, NaN])).toBe(true)
  expect(program([1, 2, 3, NaN])).toBe(true)
})

it('should return false when the search element is not found', () => {
  let program = pipe(
    map((x: number) => String.fromCharCode(x + 65)),
    includes('Z')
  )

  expect(program(range(0, 24))).toBe(false)
  expect(program(range(0, 24))).toBe(false)
})

it('should return true when the search element is found, starting at a given index', () => {
  let program = pipe(
    map((x: number) => String.fromCharCode(x + 65)),
    includes('Z', 1)
  )

  expect(program(range(0, 25))).toBe(true)
  expect(program(range(0, 25))).toBe(true)
})

it('should return false when the search element is not found, starting at a given index', () => {
  let program = pipe(
    map((x: number) => String.fromCharCode(x + 65)),
    includes('A', 1)
  )

  expect(program(range(0, 25))).toBe(false)
  expect(program(range(0, 25))).toBe(false)
})

it('should return true when the search element is found (async)', async () => {
  let program = pipe(
    delay(0),
    map((x: number) => String.fromCharCode(x + 65)),
    includes('Z')
  )

  expect(await program(range(0, 25))).toBe(true)
  expect(await program(range(0, 25))).toBe(true)
})

it('should return false when the search element is not found (async)', async () => {
  let program = pipe(
    delay(0),
    map((x: number) => String.fromCharCode(x + 65)),
    includes('Z')
  )

  expect(await program(range(0, 24))).toBe(false)
  expect(await program(range(0, 24))).toBe(false)
})

it('should return true when the search element is found, starting at a given index (async)', async () => {
  let program = pipe(
    delay(0),
    map((x: number) => String.fromCharCode(x + 65)),
    includes('Z', 1)
  )

  expect(await program(range(0, 25))).toBe(true)
  expect(await program(range(0, 25))).toBe(true)
})

it('should return false when the search element is not found, starting at a given index (async)', async () => {
  let program = pipe(
    delay(0),
    map((x: number) => String.fromCharCode(x + 65)),
    includes('A', 1)
  )

  expect(await program(range(0, 25))).toBe(false)
  expect(await program(range(0, 25))).toBe(false)
})

it('should return true when the search element is found (Promise async)', async () => {
  let program = pipe(
    map((x: number) => String.fromCharCode(x + 65)),
    includes('Z')
  )

  expect(await program(Promise.resolve(range(0, 25)))).toBe(true)
  expect(await program(Promise.resolve(range(0, 25)))).toBe(true)
})

it('should return false when the search element is not found (Promise async)', async () => {
  let program = pipe(includes('Z'))

  expect(await program(Promise.resolve(range(0, 24)))).toBe(false)
  expect(await program(Promise.resolve(range(0, 24)))).toBe(false)
})

it('should return true when the search element is found, starting at a given index (Promise async)', async () => {
  let program = pipe(
    map((x: number) => String.fromCharCode(x + 65)),
    includes('Z', 1)
  )

  expect(await program(Promise.resolve(range(0, 25)))).toBe(true)
  expect(await program(Promise.resolve(range(0, 25)))).toBe(true)
})

it('should return false when the search element is not found, starting at a given index (Promise async)', async () => {
  let program = pipe(
    map((x: number) => String.fromCharCode(x + 65)),
    includes('A', 1)
  )

  expect(await program(Promise.resolve(range(0, 25)))).toBe(false)
  expect(await program(Promise.resolve(range(0, 25)))).toBe(false)
})
