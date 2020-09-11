import { pipe } from './pipe'
import { range } from './range'
import { head, first } from './head'
import { delay } from './delay'

it('should return the first element of the iterator', () => {
  const program = pipe(range(20, 25), head())

  expect(program()).toEqual(20)
})

it('should return the first element of the iterator (using an alias)', () => {
  const program = pipe(range(20, 25), first())

  expect(program()).toEqual(20)
})

it('should return undefined when there is no data', () => {
  const program = pipe(first())

  expect(program()).toEqual(undefined)
})

it('should return undefined when there is an empty array', () => {
  const program = pipe(first())

  expect(program([])).toEqual(undefined)
})

it('should return the first element of the iterator (async)', async () => {
  const program = pipe(range(20, 25), delay(0), head())

  expect(await program()).toEqual(20)
})

it('should return the first element of the iterator (using an alias) (async)', async () => {
  const program = pipe(range(20, 25), delay(0), first())

  expect(await program()).toEqual(20)
})

it('should return undefined when there is no data (async)', async () => {
  const program = pipe(delay(0), first())

  expect(await program()).toEqual(undefined)
})

it('should return undefined when there is an empty array (async)', async () => {
  const program = pipe(delay(0), first())

  expect(await program([])).toEqual(undefined)
})
