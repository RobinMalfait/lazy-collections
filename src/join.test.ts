import { pipe } from './pipe'
import { join } from './join'
import { delay } from './delay'
import { concat } from './concat'

it('should be possible to join an array', () => {
  let program = pipe(join())

  expect(program(['l', 'a', 'z', 'y'])).toEqual('lazy')
  expect(program(['l', 'a', 'z', 'y'])).toEqual('lazy')
})

it('should be possible to join an iterator', () => {
  let program = pipe(join())

  expect(program(concat(['l', 'a', 'z', 'y']))).toEqual('lazy')
  expect(program(concat(['l', 'a', 'z', 'y']))).toEqual('lazy')
})

it('should be possible to join an array (async)', async () => {
  let program = pipe(delay(0), join())

  expect(await program(['l', 'a', 'z', 'y'])).toEqual('lazy')
  expect(await program(['l', 'a', 'z', 'y'])).toEqual('lazy')
})

it('should be possible to join an iterator (async)', async () => {
  let program = pipe(delay(0), join())

  expect(await program(concat(['l', 'a', 'z', 'y']))).toEqual('lazy')
  expect(await program(concat(['l', 'a', 'z', 'y']))).toEqual('lazy')
})

it('should be possible to join an array (Promise async)', async () => {
  let program = pipe(join())

  expect(await program(Promise.resolve(['l', 'a', 'z', 'y']))).toEqual('lazy')
  expect(await program(Promise.resolve(['l', 'a', 'z', 'y']))).toEqual('lazy')
})

it('should be possible to join an iterator (Promise async)', async () => {
  let program = pipe(join())

  expect(await program(Promise.resolve(concat(['l', 'a', 'z', 'y'])))).toEqual('lazy')
  expect(await program(Promise.resolve(concat(['l', 'a', 'z', 'y'])))).toEqual('lazy')
})

it('should be possible to join an array with a separator', () => {
  let program = pipe(join(' '))

  expect(program(['l', 'a', 'z', 'y'])).toEqual('l a z y')
  expect(program(['l', 'a', 'z', 'y'])).toEqual('l a z y')
})
