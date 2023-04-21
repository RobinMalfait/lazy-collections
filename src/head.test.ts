import { pipe, range, head, first, delay } from './'

it('should return the first element of the iterator', () => {
  let program = pipe(range(20, 25), head())

  expect(program()).toEqual(20)
})

it('should return the first element of the iterator (using an alias)', () => {
  let program = pipe(range(20, 25), first())

  expect(program()).toEqual(20)
})

it('should return undefined when there is no data', () => {
  let program = pipe(first())

  expect(program()).toEqual(undefined)
})

it('should return undefined when there is an empty array', () => {
  let program = pipe(first())

  expect(program([])).toEqual(undefined)
})

it('should return the first element of the iterator (async)', async () => {
  let program = pipe(range(20, 25), delay(0), head())

  expect(await program()).toEqual(20)
})

it('should return the first element of the iterator (using an alias) (async)', async () => {
  let program = pipe(range(20, 25), delay(0), first())

  expect(await program()).toEqual(20)
})

it('should return undefined when there is no data (async)', async () => {
  let program = pipe(delay(0), first())

  expect(await program()).toEqual(undefined)
})

it('should return undefined when there is an empty array (async)', async () => {
  let program = pipe(delay(0), first())

  expect(await program([])).toEqual(undefined)
})
